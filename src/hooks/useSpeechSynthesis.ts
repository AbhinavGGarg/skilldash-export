"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getPersonaVoiceConfig } from "@/lib/personaVoiceMap";
import type { PersonaId } from "@/lib/personas";

type SpeakOptions = {
  personaId: PersonaId;
  highQuality?: boolean;
};

type LocalTtsError = {
  error?: string;
  details?: string;
};

function selectBrowserVoice(voices: SpeechSynthesisVoice[], voiceHint: string) {
  const loweredHint = voiceHint.toLowerCase();

  return (
    voices.find((voice) => voice.name.toLowerCase().includes(loweredHint)) ||
    voices.find((voice) => voice.lang.toLowerCase().startsWith("en")) ||
    null
  );
}

export function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [provider, setProvider] = useState<"elevenlabs" | "piper" | "xtts" | "browser" | "none">(
    "none",
  );
  const [error, setError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const supported = "speechSynthesis" in window;
    setIsSupported(supported);

    if (!supported) {
      return;
    }

    const loadVoices = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
    };

    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
      window.speechSynthesis.cancel();
    };
  }, []);

  const cleanupAudioUrl = useCallback(() => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }

    cleanupAudioUrl();
    setIsSpeaking(false);
  }, [cleanupAudioUrl]);

  const speakWithBrowser = useCallback(
    (text: string, personaId: PersonaId) => {
      if (!isSupported || typeof window === "undefined") {
        return false;
      }

      const config = getPersonaVoiceConfig(personaId);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = config.browserRate;
      utterance.pitch = config.browserPitch;

      const voices = voicesRef.current.length
        ? voicesRef.current
        : window.speechSynthesis.getVoices();

      const voice = selectBrowserVoice(voices, config.browserVoiceHint);
      if (voice) {
        utterance.voice = voice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => {
        setIsSpeaking(false);
        setError("Browser speech synthesis failed.");
      };

      try {
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
        setProvider("browser");
        return true;
      } catch {
        setIsSpeaking(false);
        return false;
      }
    },
    [isSupported],
  );

  const speak = useCallback(
    async (text: string, options: SpeakOptions) => {
      const cleaned = text.trim();
      if (!cleaned) {
        return;
      }

      stop();
      setError(null);

      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5_000);
        const response = await fetch("/api/tts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: cleaned,
            personaId: options.personaId,
            highQuality: options.highQuality,
          }),
          signal: controller.signal,
        }).finally(() => clearTimeout(timeout));

        if (!response.ok) {
          const payload = (await response.json().catch(() => null)) as LocalTtsError | null;
          throw new Error(payload?.details || payload?.error || "Local TTS request failed.");
        }

        const contentType = response.headers.get("content-type") ?? "";
        if (!contentType.startsWith("audio/")) {
          throw new Error("Local TTS did not return audio.");
        }

        const blob = await response.blob();
        if (!blob.size) {
          throw new Error("Local TTS returned empty audio.");
        }

        const objectUrl = URL.createObjectURL(blob);
        objectUrlRef.current = objectUrl;

        const audio = new Audio(objectUrl);
        audioRef.current = audio;

        audio.onended = () => {
          setIsSpeaking(false);
          cleanupAudioUrl();
        };
        audio.onerror = () => {
          setIsSpeaking(false);
          cleanupAudioUrl();
          setError("Unable to play local TTS audio.");
        };

        setIsSpeaking(true);
        const detectedProvider = response.headers.get("x-tts-provider");
        if (
          detectedProvider === "xtts" ||
          detectedProvider === "piper" ||
          detectedProvider === "elevenlabs"
        ) {
          setProvider(detectedProvider);
        } else {
          setProvider("piper");
        }

        await audio.play();
      } catch (localError) {
        const fallbackWorked = speakWithBrowser(cleaned, options.personaId);
        if (!fallbackWorked) {
          const detail = localError instanceof Error ? localError.message : "Unknown speech error";
          setError(`Speech output unavailable: ${detail}`);
          setProvider("none");
        }
      }
    },
    [cleanupAudioUrl, speakWithBrowser, stop],
  );

  const statusLabel = useMemo(() => {
    if (provider === "elevenlabs") return "ElevenLabs";
    if (provider === "xtts") return "XTTS (local)";
    if (provider === "piper") return "Piper (local)";
    if (provider === "browser") return "Browser fallback";
    return "Idle";
  }, [provider]);

  return {
    isSupported,
    isSpeaking,
    provider,
    statusLabel,
    error,
    speak,
    stop,
  };
}
