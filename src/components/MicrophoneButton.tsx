"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Mic, MicOff } from "lucide-react";

type MicrophoneButtonProps = {
  isListening: boolean;
  onClick: () => void;
  disabled?: boolean;
};

export function MicrophoneButton({
  isListening,
  onClick,
  disabled = false,
}: MicrophoneButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50"
      aria-label={isListening ? "Stop recording" : "Start recording"}
    >
      <AnimatePresence>
        {isListening && (
          <motion.span
            key="pulse"
            initial={{ scale: 0.85, opacity: 0.72 }}
            animate={{ scale: 1.65, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.05, repeat: Infinity }}
            className="absolute inset-0 rounded-full border border-cyan-200/70"
          />
        )}
      </AnimatePresence>

      {isListening ? (
        <MicOff className="h-7 w-7 text-cyan-200" />
      ) : (
        <Mic className="h-7 w-7" />
      )}
    </button>
  );
}
