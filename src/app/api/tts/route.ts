import { existsSync } from "fs";
import { readFile, rm } from "fs/promises";
import path from "path";
import { tmpdir } from "os";
import { randomUUID } from "crypto";
import { spawn } from "child_process";
import { NextResponse } from "next/server";
import { PERSONA_MAP, type PersonaId } from "@/lib/personas";
import { getPersonaVoiceConfig } from "@/lib/personaVoiceMap";

export const runtime = "nodejs";

type TtsRequest = {
  text?: string;
  personaId?: string;
  highQuality?: boolean;
};

const PIPER_BIN = process.env.PIPER_BIN ?? "piper";
const PIPER_VOICES_DIR = process.env.PIPER_VOICES_DIR ?? path.join(process.cwd(), "voices", "piper");
const PIPER_DEFAULT_VOICE_MODEL = process.env.PIPER_DEFAULT_VOICE_MODEL ?? "en_US-amy-medium.onnx";
const XTTS_BASE_URL = process.env.XTTS_BASE_URL ?? "http://127.0.0.1:8020";
const XTTS_ENABLED = process.env.TTS_HIGH_QUALITY_MODE === "xtts";
const XTTS_AUTO_MODE = process.env.XTTS_AUTO_MODE === "1";
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const ELEVENLABS_MODEL = process.env.ELEVENLABS_MODEL ?? "eleven_turbo_v2_5";
const ELEVENLABS_OUTPUT_FORMAT = process.env.ELEVENLABS_OUTPUT_FORMAT ?? "mp3_44100_128";
const ELEVENLABS_BASE_URL = process.env.ELEVENLABS_BASE_URL ?? "https://api.elevenlabs.io/v1";
const XTTS_TIMEOUT_MS = Number(process.env.XTTS_TIMEOUT_MS ?? "20000");
const XTTS_COOLDOWN_MS = Number(process.env.XTTS_COOLDOWN_MS ?? "5000");
const ELEVENLABS_TIMEOUT_MS = Number(process.env.ELEVENLABS_TIMEOUT_MS ?? "4500");

let xttsCooldownUntil = 0;

function normalizePersonaId(personaId?: string): PersonaId {
  if (personaId && personaId in PERSONA_MAP) {
    return personaId as PersonaId;
  }
  return "mlk";
}

function resolveModelPath(candidate: string) {
  if (!candidate) return null;
  if (path.isAbsolute(candidate)) {
    return candidate;
  }
  return path.join(PIPER_VOICES_DIR, candidate);
}

function getPersonaModelCandidates(personaId: PersonaId) {
  const config = getPersonaVoiceConfig(personaId);
  const envKey = `PIPER_MODEL_${personaId.toUpperCase().replace(/-/g, "_")}`;
  const envCandidate = process.env[envKey];

  return [envCandidate, config.piperModel, PIPER_DEFAULT_VOICE_MODEL, "en_US-amy-medium.onnx"]
    .filter((value): value is string => Boolean(value))
    .map((value) => resolveModelPath(value))
    .filter((value): value is string => Boolean(value));
}

function pickPiperModelPath(personaId: PersonaId) {
  const candidates = getPersonaModelCandidates(personaId);
  return candidates.find((candidate) => existsSync(candidate));
}

type PiperSynthesisOptions = {
  speaker?: number;
  lengthScale?: number;
  noiseScale?: number;
  noiseWScale?: number;
  sentenceSilence?: number;
};

async function runPiper(text: string, modelPath: string, options: PiperSynthesisOptions = {}) {
  const outputPath = path.join(tmpdir(), `persona-tts-${randomUUID()}.wav`);

  return new Promise<Buffer>((resolve, reject) => {
    const args = ["--model", modelPath, "--output_file", outputPath];

    if (typeof options.speaker === "number") {
      args.push("--speaker", String(options.speaker));
    }
    if (typeof options.lengthScale === "number") {
      args.push("--length-scale", String(options.lengthScale));
    }
    if (typeof options.noiseScale === "number") {
      args.push("--noise-scale", String(options.noiseScale));
    }
    if (typeof options.noiseWScale === "number") {
      args.push("--noise-w-scale", String(options.noiseWScale));
    }
    if (typeof options.sentenceSilence === "number") {
      args.push("--sentence-silence", String(options.sentenceSilence));
    }

    const child = spawn(PIPER_BIN, args, {
      stdio: ["pipe", "ignore", "pipe"],
    });

    let stderr = "";

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", async (error) => {
      await rm(outputPath, { force: true });
      reject(error);
    });

    child.on("close", async (code) => {
      try {
        if (code !== 0) {
          throw new Error(stderr || "Piper exited with a non-zero status.");
        }

        const audio = await readFile(outputPath);
        resolve(audio);
      } catch (error) {
        reject(error);
      } finally {
        await rm(outputPath, { force: true });
      }
    });

    child.stdin.write(text);
    child.stdin.end();
  });
}

async function tryXtts(text: string, personaId: PersonaId) {
  const config = getPersonaVoiceConfig(personaId);
  const speakerDir = process.env.XTTS_SPEAKERS_DIR ?? path.join(process.cwd(), "voices", "xtts");
  const speakerId = config.xttsSpeakerId?.trim();
  const speakerWav = config.xttsSpeakerWav
    ? path.join(speakerDir, config.xttsSpeakerWav)
    : undefined;
  const hasSpeakerClone = Boolean(speakerWav && existsSync(speakerWav));

  const base = XTTS_BASE_URL.replace(/\/+$/, "");
  let lastError = "unknown_xtts_error";
  const endpoints = speakerId
    ? [
        {
          // Built-in XTTS speaker for strong, distinct voices.
          path: "/api/tts",
          contentType: "application/x-www-form-urlencoded",
          body: new URLSearchParams({
            text,
            language_id: config.xttsLanguage,
            speaker_id: speakerId,
          }).toString(),
        },
      ]
    : hasSpeakerClone
    ? [
        {
          // Force cloned persona voice when reference WAV exists.
          path: "/tts_to_audio",
          contentType: "application/json",
          body: JSON.stringify({
            text,
            language: config.xttsLanguage,
            speaker_wav: speakerWav,
          }),
        },
      ]
    : [
        {
          path: "/api/tts",
          contentType: "application/x-www-form-urlencoded",
          body: new URLSearchParams({
            text,
            language_id: config.xttsLanguage,
          }).toString(),
        },
      ];

  for (const endpoint of endpoints) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), XTTS_TIMEOUT_MS);

    let response: Response;
    try {
      response = await fetch(`${base}${endpoint.path}`, {
        method: "POST",
        headers: {
          "Content-Type": endpoint.contentType,
        },
        body: endpoint.body,
        signal: controller.signal,
      });
    } catch (error) {
      lastError = error instanceof Error ? error.message : "xtts_fetch_failed";
      continue;
    } finally {
      clearTimeout(timeout);
    }

    if (!response.ok) {
      const raw = await response.text().catch(() => "");
      lastError = `status_${response.status}${raw ? `:${raw.slice(0, 120)}` : ""}`;
      continue;
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (contentType.startsWith("audio/")) {
      const arrayBuffer = await response.arrayBuffer();
      return Buffer.from(arrayBuffer);
    }

    const json = (await response.json().catch(() => null)) as
      | { audio?: string; wav?: string }
      | null;

    const base64Audio = json?.audio ?? json?.wav;
    if (base64Audio) {
      return Buffer.from(base64Audio, "base64");
    }

    lastError = "xtts_non_audio_response";
  }

  throw new Error(`XTTS service unavailable (${lastError}).`);
}

async function tryElevenLabs(text: string, personaId: PersonaId) {
  if (!ELEVENLABS_API_KEY) {
    throw new Error("ElevenLabs API key missing.");
  }

  const config = getPersonaVoiceConfig(personaId);
  const voiceId = config.elevenLabsVoiceId;
  if (!voiceId) {
    throw new Error("No ElevenLabs voice configured for persona.");
  }

  const url = `${ELEVENLABS_BASE_URL.replace(/\/+$/, "")}/text-to-speech/${voiceId}/stream?optimize_streaming_latency=4&output_format=${encodeURIComponent(ELEVENLABS_OUTPUT_FORMAT)}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ELEVENLABS_TIMEOUT_MS);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": ELEVENLABS_API_KEY,
      Accept: "audio/mpeg",
    },
    body: JSON.stringify({
      text,
      model_id: ELEVENLABS_MODEL,
      voice_settings: {
        stability: config.elevenLabsStability ?? 0.5,
        similarity_boost: config.elevenLabsSimilarityBoost ?? 0.75,
        style: config.elevenLabsStyle ?? 0,
        use_speaker_boost: config.elevenLabsSpeakerBoost ?? true,
      },
    }),
    signal: controller.signal,
  }).finally(() => clearTimeout(timeout));

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(detail || `ElevenLabs returned ${response.status}`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("audio")) {
    throw new Error("ElevenLabs did not return audio.");
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export async function POST(request: Request) {
  try {
    const startedAt = Date.now();
    const body = (await request.json()) as TtsRequest;
    const text = body.text?.trim() ?? "";
    const personaId = normalizePersonaId(body.personaId);

    if (!text) {
      return NextResponse.json({ error: "Text is required." }, { status: 400 });
    }

    if (text.length > 900) {
      return NextResponse.json(
        { error: "Text is too long for one utterance. Keep it under 900 characters." },
        { status: 400 },
      );
    }

    if (ELEVENLABS_API_KEY) {
      try {
        const elevenLabsAudio = await tryElevenLabs(text, personaId);
        return new Response(elevenLabsAudio, {
          status: 200,
          headers: {
            "Content-Type": "audio/mpeg",
            "Cache-Control": "no-store",
            "X-TTS-Provider": "elevenlabs",
            "X-TTS-Latency-Ms": String(Date.now() - startedAt),
          },
        });
      } catch {
        // Continue to local engines fallback.
      }
    }

    const shouldTryXtts = body.highQuality === true || (XTTS_ENABLED && XTTS_AUTO_MODE);
    const xttsCoolingDown = Date.now() < xttsCooldownUntil;
    let xttsErrorDetail = "";

    if (shouldTryXtts && !xttsCoolingDown) {
      try {
        const xttsAudio = await tryXtts(text, personaId);
        return new Response(xttsAudio, {
          status: 200,
          headers: {
            "Content-Type": "audio/wav",
            "Cache-Control": "no-store",
            "X-TTS-Provider": "xtts",
            "X-TTS-Latency-Ms": String(Date.now() - startedAt),
          },
        });
      } catch (error) {
        xttsErrorDetail = error instanceof Error ? error.message : "xtts_unavailable";
        xttsCooldownUntil = Date.now() + XTTS_COOLDOWN_MS;
        // Continue to Piper fallback.
      }
    }

    const voiceConfig = getPersonaVoiceConfig(personaId);
    const modelPath = pickPiperModelPath(personaId);

    if (!modelPath) {
      return NextResponse.json(
        {
          error: "No Piper model found.",
          details:
            "Set PIPER_DEFAULT_VOICE_MODEL or persona-specific PIPER_MODEL_<PERSONA_ID>.",
          fallback: "browser-speech-synthesis",
        },
        { status: 503 },
      );
    }

    try {
      const piperAudio = await runPiper(text, modelPath, {
        speaker: voiceConfig.piperSpeaker,
        lengthScale: voiceConfig.piperLengthScale,
        noiseScale: voiceConfig.piperNoiseScale,
        noiseWScale: voiceConfig.piperNoiseWScale,
        sentenceSilence: voiceConfig.piperSentenceSilence,
      });
      return new Response(piperAudio, {
        status: 200,
        headers: {
          "Content-Type": "audio/wav",
          "Cache-Control": "no-store",
          "X-TTS-Provider": "piper",
          "X-TTS-Latency-Ms": String(Date.now() - startedAt),
          ...(xttsErrorDetail
            ? { "X-TTS-XTTS-Error": xttsErrorDetail.replace(/\s+/g, " ").slice(0, 180) }
            : {}),
        },
      });
    } catch (error) {
      const detail = error instanceof Error ? error.message : "Unknown Piper error";
      return NextResponse.json(
        {
          error: "Piper TTS unavailable.",
          details: detail,
          fallback: "browser-speech-synthesis",
        },
        { status: 503 },
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Unable to process TTS request.", fallback: "browser-speech-synthesis" },
      { status: 500 },
    );
  }
}
