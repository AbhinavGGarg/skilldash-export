"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mic, Sparkles } from "lucide-react";
import type { Persona } from "@/lib/personas";

type PersonaCardProps = {
  persona: Persona;
  index: number;
};

export function PersonaCard({ persona, index }: PersonaCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.35 }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="group"
    >
      <Link
        href={`/persona/${persona.id}`}
        className="relative block overflow-hidden rounded-3xl border border-white/15 bg-black/45 p-5 backdrop-blur-xl transition duration-300 hover:border-white/35"
      >
        <div
          className="absolute -right-14 -top-12 h-32 w-32 rounded-full blur-3xl transition duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${persona.accent}66` }}
        />

        <div className="relative z-10 flex items-start justify-between">
          <div
            className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/20 text-sm font-bold text-white"
            style={{ boxShadow: `0 0 24px ${persona.accent}66` }}
          >
            {persona.image ? (
              <img
                src={persona.image}
                alt={persona.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              persona.avatar
            )}
          </div>
          <Sparkles className="h-4 w-4 text-white/60" />
        </div>

        <h3 className="relative z-10 mt-4 font-headline text-xl font-semibold text-white">
          {persona.name}
        </h3>
        <p className="relative z-10 text-sm text-white/70">{persona.title}</p>

        <p className="relative z-10 mt-3 text-sm leading-relaxed text-white/80">
          {persona.description}
        </p>

        <div className="relative z-10 mt-4 flex flex-wrap gap-2">
          {persona.style.canonicalThemes.slice(0, 2).map((theme) => (
            <span
              key={theme}
              className="rounded-full border border-white/15 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-white/70"
            >
              {theme}
            </span>
          ))}
        </div>

        <div className="relative z-10 mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs text-white/90">
          <Mic className="h-3.5 w-3.5" />
          Talk Now
        </div>
      </Link>
    </motion.div>
  );
}
