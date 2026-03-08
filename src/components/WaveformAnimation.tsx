"use client";

import { motion } from "framer-motion";

type WaveformAnimationProps = {
  active: boolean;
  variant?: "user" | "assistant";
  bars?: number;
  accent?: string;
};

export function WaveformAnimation({
  active,
  variant = "user",
  bars = 22,
  accent,
}: WaveformAnimationProps) {
  const gradientClass =
    variant === "assistant"
      ? "from-violet-400 via-cyan-300 to-emerald-300"
      : "from-cyan-300 via-sky-400 to-blue-500";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/45 p-4">
      {accent && (
        <div
          className="pointer-events-none absolute inset-0 opacity-35 blur-2xl"
          style={{ background: `radial-gradient(circle at 50% 70%, ${accent}, transparent 65%)` }}
        />
      )}

      <div className="relative flex h-20 items-end justify-center gap-1.5">
        {Array.from({ length: bars }).map((_, idx) => (
          <motion.div
            key={idx}
            className={`w-1 rounded-full bg-gradient-to-t ${gradientClass}`}
            animate={{
              height: active ? [8, 38, 12, 30, 10] : 8,
              opacity: active ? [0.45, 1, 0.68, 1] : 0.28,
            }}
            transition={{
              duration: 0.9 + (idx % 6) * 0.11,
              repeat: Infinity,
              ease: "easeInOut",
              delay: idx * 0.02,
            }}
          />
        ))}
      </div>
    </div>
  );
}
