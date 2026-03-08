import Link from "next/link";
import { Sparkles } from "lucide-react";
import { PersonaCard } from "@/components/PersonaCard";
import { FEATURED_PERSONAS } from "@/lib/personas";

export default function HomePage() {
  return (
    <div className="min-h-screen px-4 pb-12 pt-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-black/35 p-7 backdrop-blur-xl md:p-10">
          <div className="absolute -left-8 top-0 h-36 w-36 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute -right-4 bottom-0 h-36 w-36 rounded-full bg-fuchsia-400/20 blur-3xl" />

          <div className="relative z-10">
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-200/30 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-100">
              <Sparkles className="h-3.5 w-3.5" />
              PERSONA
            </p>
            <h1 className="font-headline mt-4 text-4xl font-semibold leading-tight text-white md:text-6xl">
              History Through
              <br />
              Live Voices
            </h1>
            <p className="mt-4 max-w-3xl text-base text-white/75 md:text-lg">
              Interactive voice lessons designed to make students care about history again.
              Talk with Black historical leaders through context-rich,
              source-grounded conversations that make key moments memorable.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/persona/mlk"
                className="inline-flex items-center rounded-full border border-cyan-200/40 bg-cyan-500/15 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/25"
              >
                Start History Lesson
              </Link>
            </div>
          </div>
        </div>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {FEATURED_PERSONAS.map((persona, index) => (
            <PersonaCard key={persona.id} persona={persona} index={index} />
          ))}
        </section>
      </div>
    </div>
  );
}
