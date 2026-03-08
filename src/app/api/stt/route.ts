import { NextResponse } from "next/server";

export const runtime = "nodejs";

const WHISPER_CPP_BASE_URL = process.env.WHISPER_CPP_BASE_URL ?? "http://127.0.0.1:8080";

function normalizeText(payload: unknown) {
  if (!payload) return "";

  if (typeof payload === "string") {
    return payload.trim();
  }

  if (typeof payload === "object") {
    const data = payload as Record<string, unknown>;
    const textCandidate =
      (typeof data.text === "string" && data.text) ||
      (typeof data.transcript === "string" && data.transcript) ||
      (typeof data.result === "string" && data.result) ||
      "";

    return textCandidate.trim();
  }

  return "";
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get("audio");

    if (!(audioFile instanceof File)) {
      return NextResponse.json(
        { error: "Missing audio file. Send multipart/form-data with an 'audio' field." },
        { status: 400 },
      );
    }

    const upstreamForm = new FormData();
    upstreamForm.append("file", audioFile, audioFile.name || "speech.webm");

    const language = formData.get("language");
    if (typeof language === "string" && language.trim()) {
      upstreamForm.append("language", language.trim());
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30_000);

    try {
      const response = await fetch(`${WHISPER_CPP_BASE_URL.replace(/\/+$/, "")}/inference`, {
        method: "POST",
        body: upstreamForm,
        signal: controller.signal,
      });

      if (!response.ok) {
        const raw = await response.text().catch(() => "");
        return NextResponse.json(
          {
            error: "Local STT service unavailable.",
            details: raw || `whisper.cpp returned status ${response.status}`,
          },
          { status: 503 },
        );
      }

      const contentType = response.headers.get("content-type") ?? "";
      const payload = contentType.includes("application/json")
        ? await response.json().catch(() => null)
        : await response.text().catch(() => "");

      const text = normalizeText(payload);

      if (!text) {
        return NextResponse.json(
          { error: "No speech recognized in audio." },
          { status: 422 },
        );
      }

      return NextResponse.json({
        text,
        provider: "whisper.cpp",
      });
    } finally {
      clearTimeout(timeout);
    }
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unknown STT error";
    return NextResponse.json(
      {
        error: "Unable to process speech transcription.",
        details: detail,
      },
      { status: 500 },
    );
  }
}
