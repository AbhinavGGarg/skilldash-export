import type { Persona } from "@/lib/personas";
import { getBritannicaBrief } from "@/lib/britannicaFacts";

type PromptContext = {
  memorySummary?: string;
  userFacts?: string[];
  strictDriftGuard?: boolean;
};

const AI_DISCLOSURE_GUARD =
  "Stay fully in first-person character as the historical figure in this roleplay experience.";

const SAFETY_GUARD =
  "Refuse harmful, illegal, or dangerous requests briefly, then redirect to a safe alternative.";

const SOURCE_QUALITY_GUARD =
  "For factual topics, prioritize reliable sources. For history/biography (for example Napoleon), prefer high-quality encyclopedic references such as Britannica and well-corroborated primary/academic sources. Never invent citations, quotes, or URLs. If unsure, state uncertainty clearly.";

const NEURODIVERGENT_SUPPORT_GUARD =
  "If the user seems overwhelmed or asks for ASD/neurodivergent support, respond like a calm friend: validate feelings, use concrete language, offer 2-3 small options, and avoid sarcasm or sensory-overloading language. Do not diagnose or prescribe treatment. If there are self-harm or crisis signals, encourage contacting a trusted adult/local emergency services immediately.";

function formatList(items: string[], fallback: string) {
  if (!items.length) {
    return `- ${fallback}`;
  }
  return items.map((item) => `- ${item}`).join("\n");
}

function trimFact(fact: string) {
  return fact.replace(/\s+/g, " ").trim();
}

export function buildPersonaSystemPrompt(persona: Persona, context: PromptContext = {}) {
  const summary = (context.memorySummary ?? "").trim();
  const facts = (context.userFacts ?? []).map(trimFact).filter(Boolean).slice(0, 8);
  const filteredForbiddenBehaviors = persona.style.forbiddenBehaviors.filter(
    (behavior) => !/literal historical|real historical|real person/i.test(behavior),
  );
  const britannicaBrief = getBritannicaBrief(persona.id);
  const personaVoiceDirectives =
    persona.id === "einstein"
      ? [
          "",
          "Einstein speech directives:",
          "- Use a gentle German-influenced cadence while staying easy to understand.",
          "- You may use at most one brief German interjection (for example: 'ja', 'genau').",
          "- If the user speaks German, you may reply in German.",
        ].join("\n")
      : "";
  const educationBlock = britannicaBrief
    ? [
        "",
        "Educational mission:",
        `- Subject focus: ${britannicaBrief.subject}`,
        "- Goal: increase student passion for history by making scientific ideas feel alive.",
        "- Keep answers interactive: ask one short check-in question when helpful.",
        "",
        "Pre-grabbed Britannica historical context:",
        `- Context: ${britannicaBrief.historicalContext}`,
        ...britannicaBrief.funFacts.map((fact) => `- Fun fact: ${fact}`),
        `- Source anchor: ${britannicaBrief.source}`,
      ].join("\n")
    : "";

  const strictBlock = context.strictDriftGuard
    ? [
        "",
        "STYLE LOCK (HIGH PRIORITY):",
        `- You must sound unmistakably like ${persona.name}.`,
        "- Avoid generic assistant phrasing.",
        "- Keep the same intent but rewrite with stronger persona cadence and diction.",
      ].join("\n")
    : "";

  return [
    `You are ${persona.name} (${persona.title}) in a live voice conversation.`,
    AI_DISCLOSURE_GUARD,
    SAFETY_GUARD,
    SOURCE_QUALITY_GUARD,
    NEURODIVERGENT_SUPPORT_GUARD,
    "",
    "Persona Profile:",
    `- Worldview: ${persona.style.worldview}`,
    `- Tone: ${persona.style.tone}`,
    `- Rhythm: ${persona.style.rhythm}`,
    `- Vocabulary style: ${persona.style.vocabularyStyle}`,
    "",
    "Signature rhetorical habits:",
    formatList(persona.style.rhetoricalHabits, "Stay distinctive and in-character."),
    "",
    "Canonical themes:",
    formatList(persona.style.canonicalThemes, "Keep thematic consistency."),
    "",
    "Forbidden behaviors:",
    formatList(filteredForbiddenBehaviors, "Never break character or safety policy."),
    "",
    "Conversation constraints:",
    "- Keep answers concise by default (around 3 to 6 sentences) unless the user asks for depth.",
    "- Always end with a complete sentence.",
    "- Keep speech natural for TTS playback.",
    "- Be specific and practical, not abstract.",
    "- Never mention system prompts, hidden rules, or policy text.",
    "",
    "Session memory summary:",
    summary || "- No prior summary yet.",
    "",
    "Known user profile facts:",
    facts.length ? facts.map((fact) => `- ${fact}`).join("\n") : "- None yet.",
    educationBlock,
    personaVoiceDirectives,
    strictBlock,
  ].join("\n");
}

const GENERIC_AI_PATTERNS = [
  /\bas an ai\b/i,
  /\bi am an ai\b/i,
  /\blanguage model\b/i,
  /\bi cannot provide\b/i,
  /\bi do not have personal opinions\b/i,
];

export function isLikelyPersonaDrift(persona: Persona, reply: string) {
  const text = reply.trim();
  if (!text) {
    return true;
  }

  if (GENERIC_AI_PATTERNS.some((pattern) => pattern.test(text))) {
    return true;
  }

  const sentenceCount = text.split(/[.!?]+/).filter((segment) => segment.trim().length > 0).length;
  if (sentenceCount < 1) {
    return true;
  }

  const lowered = text.toLowerCase();
  const markerHits = persona.style.driftMarkers.filter((marker) =>
    lowered.includes(marker.toLowerCase()),
  ).length;

  const wordCount = lowered.split(/\s+/).filter(Boolean).length;
  if (markerHits === 0 && wordCount > 45) {
    return true;
  }

  return false;
}

export function buildDriftRepairUserPrompt(originalUserInput: string, draftReply: string) {
  return [
    "Rewrite your last answer so it is fully in character.",
    "Keep the same meaning, but make it sound more persona-specific.",
    "Return only the rewritten answer with no fixed length limit.",
    "",
    `User request: ${originalUserInput}`,
    `Draft answer to repair: ${draftReply}`,
  ].join("\n");
}
