"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Bot, RotateCcw, Volume2, Waves } from "lucide-react";
import { MicrophoneButton } from "@/components/MicrophoneButton";
import { ConversationBubble } from "@/components/ConversationBubble";
import { WaveformAnimation } from "@/components/WaveformAnimation";
import { useConversation } from "@/hooks/useConversation";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import type { Persona } from "@/lib/personas";

type PersonaChatClientProps = {
  persona: Persona;
};

export function PersonaChatClient({ persona }: PersonaChatClientProps) {
  const [liveTranscript, setLiveTranscript] = useState("");
  const conversation = useConversation({ personaId: persona.id });
  const speech = useSpeechSynthesis();

  const recognition = useSpeechRecognition({
    onFinalTranscript: async (text) => {
      setLiveTranscript(text);
      const assistant = await conversation.sendMessage(text);

      if (assistant?.role === "assistant") {
        await speech.speak(assistant.content, {
          personaId: persona.id,
        });
      }
    },
  });

  const waveformVariant = useMemo<"user" | "assistant">(() => {
    if (recognition.isListening) return "user";
    return "assistant";
  }, [recognition.isListening]);

  const isWaveActive = useMemo(
    () =>
      recognition.isListening ||
      recognition.isTranscribing ||
      speech.isSpeaking ||
      conversation.isThinking,
    [
      conversation.isThinking,
      recognition.isListening,
      recognition.isTranscribing,
      speech.isSpeaking,
    ],
  );

  const toggleMic = () => {
    if (recognition.isListening) {
      recognition.stopListening();
      return;
    }

    recognition.resetTranscript();
    setLiveTranscript("");
    recognition.startListening();
  };

  const resetAll = () => {
    conversation.resetConversation();
    speech.stop();
    recognition.resetTranscript();
    setLiveTranscript("");
  };

  const statusText = recognition.isListening
    ? recognition.inputMode === "local-stt"
      ? "Recording for local STT... tap to stop and transcribe."
      : "Listening live... tap to stop."
    : recognition.isTranscribing
      ? "Transcribing audio..."
      : "Tap to speak.";

  const combinedError = recognition.error || conversation.error || speech.error;

  return (
    <div className="min-h-screen px-4 pb-10 pt-6 md:px-8">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
        <button
          type="button"
          onClick={resetAll}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          <RotateCcw className="h-4 w-4" />
          Reset Session
        </button>
      </div>

      <div className="mx-auto mt-4 max-w-6xl rounded-3xl border border-white/15 bg-black/40 p-5 backdrop-blur-xl md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/20 text-sm font-bold text-white"
              style={{ boxShadow: `0 0 36px ${persona.accent}88` }}
            >
              {persona.image ? (
                <img
                  src={persona.image}
                  alt={persona.name}
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              ) : (
                persona.avatar
              )}
            </div>
            <div>
              <h1 className="font-headline text-2xl font-semibold text-white md:text-3xl">
                {persona.name}
              </h1>
              <p className="text-sm text-white/70">{persona.title}</p>
            </div>
          </div>

          <div className="rounded-xl border border-white/15 bg-white/[0.04] px-3 py-2 text-xs text-white/75">
            {persona.legalLabel}
          </div>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_340px]">
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="h-[52vh] space-y-3 overflow-y-auto pr-1">
              {conversation.messages.length === 0 && (
                <div className="rounded-xl border border-dashed border-white/20 bg-white/5 p-4 text-sm text-white/70">
                  Start talking with {persona.name}. Try one of these:
                  <div className="mt-3 space-y-2">
                    {persona.starterPrompts.map((prompt) => (
                      <div
                        key={prompt}
                        className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-xs text-white/80"
                      >
                        {prompt}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {conversation.messages.map((message, idx) => (
                <ConversationBubble
                  key={`${message.role}-${idx}-${message.content.slice(0, 16)}`}
                  message={message}
                  personaName={persona.name}
                  accent={persona.accent}
                />
              ))}

              {conversation.isThinking && (
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70">
                  <Bot className="h-4 w-4" />
                  {persona.name} is thinking...
                </div>
              )}
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-black/45 p-3">
              <p className="text-xs uppercase tracking-[0.16em] text-white/55">Live Transcript</p>
              <p className="mt-2 min-h-6 text-sm text-white/90">
                {recognition.interimTranscript || liveTranscript || "..."}
              </p>
            </div>

            {combinedError && <p className="mt-3 text-xs text-rose-300">{combinedError}</p>}
          </section>

          <aside className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <WaveformAnimation
              active={isWaveActive}
              variant={waveformVariant}
              accent={persona.accent}
            />

            <div className="flex items-center justify-center">
              <MicrophoneButton
                isListening={recognition.isListening}
                onClick={toggleMic}
                disabled={!recognition.isSupported || recognition.isTranscribing || conversation.isThinking}
              />
            </div>

            <p className="text-center text-xs text-white/75">{statusText}</p>

            <div className="rounded-xl border border-white/10 bg-black/45 p-3 text-sm text-white/80">
              <p className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-white/55">
                <Waves className="h-3.5 w-3.5" />
                Speech Input
              </p>
              <p className="mt-2">
                {recognition.inputMode === "web-speech"
                  ? "Browser Web Speech API (primary)"
                  : recognition.inputMode === "local-stt"
                    ? "Local whisper.cpp endpoint (fallback)"
                    : "Speech input not available in this browser"}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/45 p-3 text-sm text-white/80">
              <p className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-white/55">
                <Volume2 className="h-3.5 w-3.5" />
                Voice Output
              </p>
              <p className="mt-2">{speech.statusLabel}</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
