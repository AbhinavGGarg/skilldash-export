"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type WebSpeechRecognition = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onresult:
    | ((event: {
        resultIndex: number;
        results: ArrayLike<{
          isFinal: boolean;
          0: { transcript: string };
        }>;
      }) => void)
    | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionFactory = new () => WebSpeechRecognition;

declare global {
  interface Window {
    webkitSpeechRecognition?: SpeechRecognitionFactory;
    SpeechRecognition?: SpeechRecognitionFactory;
  }
}

type UseSpeechRecognitionOptions = {
  lang?: string;
  onFinalTranscript?: (text: string) => void | Promise<void>;
};

type InputMode = "web-speech" | "local-stt" | "unsupported";

const SPEECH_ERROR_MAP: Record<string, string> = {
  "not-allowed":
    "Microphone permission blocked. Allow mic access and reload this tab.",
  "service-not-allowed":
    "Browser speech service is blocked. Switched to local STT fallback if available.",
  network:
    "Browser speech service is unavailable right now. Switched to local STT fallback if available.",
  "no-speech": "No speech detected. Speak closer to the mic and try again.",
  "audio-capture": "No microphone input detected. Check your system mic settings.",
};

export function useSpeechRecognition({
  lang = "en-US",
  onFinalTranscript,
}: UseSpeechRecognitionOptions = {}) {
  const recognitionRef = useRef<WebSpeechRecognition | null>(null);
  const onFinalTranscriptRef = useRef(onFinalTranscript);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const [inputMode, setInputMode] = useState<InputMode>("unsupported");
  const [isListening, setIsListening] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    onFinalTranscriptRef.current = onFinalTranscript;
  }, [onFinalTranscript]);

  const hasLocalSttFallback = useMemo(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return Boolean(window.MediaRecorder && navigator.mediaDevices?.getUserMedia);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const hasWebSpeech = Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
    if (hasWebSpeech) {
      setInputMode("web-speech");
      return;
    }

    if (hasLocalSttFallback) {
      setInputMode("local-stt");
      return;
    }

    setInputMode("unsupported");
  }, [hasLocalSttFallback]);

  useEffect(() => {
    if (inputMode !== "web-speech") {
      return;
    }

    if (recognitionRef.current) {
      return;
    }

    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      return;
    }

    const recognition = new Recognition();
    recognition.lang = lang;
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
      setTranscript("");
      setInterimTranscript("");
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      const speechError = event.error || "speech_recognition_error";
      setError(SPEECH_ERROR_MAP[speechError] ?? `Speech recognition error: ${speechError}`);
      setIsListening(false);

      if (
        (speechError === "network" || speechError === "service-not-allowed") &&
        hasLocalSttFallback
      ) {
        setInputMode("local-stt");
      }
    };

    recognition.onresult = (event) => {
      let finalText = "";
      let interimText = "";

      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const segment = event.results[i][0]?.transcript ?? "";
        if (event.results[i].isFinal) {
          finalText += segment;
        } else {
          interimText += segment;
        }
      }

      setInterimTranscript(interimText.trim());

      const cleanedFinal = finalText.trim();
      if (cleanedFinal) {
        setTranscript(cleanedFinal);
        void onFinalTranscriptRef.current?.(cleanedFinal);
      }
    };

    recognitionRef.current = recognition;
  }, [hasLocalSttFallback, inputMode, lang]);

  const cleanupStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    mediaRecorderRef.current = null;
    chunksRef.current = [];
  }, []);

  const transcribeLocalAudio = useCallback(async () => {
    if (!chunksRef.current.length) {
      setError("No speech detected. Speak and try again.");
      setInterimTranscript("");
      return;
    }

    setIsTranscribing(true);
    setInterimTranscript("Transcribing audio...");

    try {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      const formData = new FormData();
      formData.append("audio", blob, "speech.webm");
      formData.append("language", lang);

      const response = await fetch("/api/stt", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json().catch(() => null)) as
        | { text?: string; error?: string; details?: string }
        | null;

      if (!response.ok) {
        const message = payload?.error || payload?.details || "Local speech-to-text failed.";
        setError(message);
        setInterimTranscript("");
        return;
      }

      const finalText = payload?.text?.trim() ?? "";
      if (!finalText) {
        setError("No speech detected. Speak clearly and try again.");
        setInterimTranscript("");
        return;
      }

      setTranscript(finalText);
      setInterimTranscript("");
      setError(null);
      await onFinalTranscriptRef.current?.(finalText);
    } catch (sttError) {
      const detail = sttError instanceof Error ? sttError.message : "Unknown STT error";
      setError(`Local STT unavailable: ${detail}`);
      setInterimTranscript("");
    } finally {
      setIsTranscribing(false);
    }
  }, [lang]);

  const startLocalListening = useCallback(async () => {
    if (!hasLocalSttFallback) {
      setError("Speech recognition is not supported in this browser.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.onstart = () => {
        setIsListening(true);
        setError(null);
        setTranscript("");
        setInterimTranscript("Recording audio...");
      };

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onerror = () => {
        setIsListening(false);
        setError("Microphone recording failed. Check permission and retry.");
        cleanupStream();
      };

      recorder.onstop = async () => {
        setIsListening(false);
        await transcribeLocalAudio();
        cleanupStream();
      };

      recorder.start();
    } catch {
      setError("Microphone permission denied or unavailable.");
    }
  }, [cleanupStream, hasLocalSttFallback, transcribeLocalAudio]);

  const stopLocalListening = useCallback(() => {
    mediaRecorderRef.current?.stop();
  }, []);

  const startListening = useCallback(() => {
    if (inputMode === "web-speech") {
      if (!recognitionRef.current) {
        setError("Speech recognition is not ready yet.");
        return;
      }

      try {
        recognitionRef.current.start();
      } catch {
        setError("Microphone is unavailable.");
      }

      return;
    }

    if (inputMode === "local-stt") {
      void startLocalListening();
      return;
    }

    setError("Speech recognition is not supported in this browser.");
  }, [inputMode, startLocalListening]);

  const stopListening = useCallback(() => {
    if (inputMode === "web-speech") {
      recognitionRef.current?.stop();
      return;
    }

    if (inputMode === "local-stt") {
      stopLocalListening();
    }
  }, [inputMode, stopLocalListening]);

  const resetTranscript = useCallback(() => {
    setTranscript("");
    setInterimTranscript("");
  }, []);

  return {
    inputMode,
    isSupported: inputMode !== "unsupported",
    isListening,
    isTranscribing,
    transcript,
    interimTranscript,
    error,
    startListening,
    stopListening,
    resetTranscript,
  };
}
