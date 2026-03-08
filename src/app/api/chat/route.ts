import { NextResponse } from "next/server";
import {
  PERSONA_MAP,
  type ConversationMessage,
  type Persona,
  type PersonaId,
} from "@/lib/personas";
import {
  buildDriftRepairUserPrompt,
  buildPersonaSystemPrompt,
  isLikelyPersonaDrift,
} from "@/lib/promptTemplates";

export const runtime = "nodejs";

type ChatRequest = {
  personaId?: string;
  message?: string;
  history?: ConversationMessage[];
  memorySummary?: string;
  userFacts?: string[];
};

type OllamaChatResponse = {
  message?: {
    role?: string;
    content?: string;
  };
};

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL ?? "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL ?? "llama3.2:3b";
const OLLAMA_MAX_TOKENS = Number(process.env.OLLAMA_MAX_TOKENS ?? "120");
const OLLAMA_TIMEOUT_MS = Number(process.env.OLLAMA_TIMEOUT_MS ?? "18000");

function getPersona(personaId?: string): Persona {
  if (!personaId || !(personaId in PERSONA_MAP)) {
    return PERSONA_MAP.mlk;
  }
  return PERSONA_MAP[personaId as PersonaId];
}

function cleanHistory(history: ChatRequest["history"]) {
  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .filter(
      (entry) =>
        entry &&
        (entry.role === "user" || entry.role === "assistant") &&
        typeof entry.content === "string" &&
        entry.content.trim().length > 0,
    )
    .slice(-14)
    .map((entry) => ({ role: entry.role, content: entry.content.trim() }));
}

function sanitizeFacts(facts: ChatRequest["userFacts"]) {
  if (!Array.isArray(facts)) {
    return [];
  }

  return facts
    .filter((fact) => typeof fact === "string")
    .map((fact) => fact.trim())
    .filter(Boolean)
    .slice(-10);
}

function normalizeSummary(summary?: string) {
  if (!summary) return "";
  return summary.replace(/\s+/g, " ").trim().slice(0, 600);
}

function extractUserFacts(message: string) {
  const text = message.replace(/\s+/g, " ").trim();
  if (!text) return [];

  const patterns = [
    /\b(i am|i'm)\s+([^,.!?]+)/gi,
    /\b(i work as|my role is)\s+([^,.!?]+)/gi,
    /\b(i live in)\s+([^,.!?]+)/gi,
    /\b(my goal is)\s+([^,.!?]+)/gi,
    /\b(i want to)\s+([^,.!?]+)/gi,
    /\b(i struggle with|my biggest challenge is)\s+([^,.!?]+)/gi,
  ];

  const nextFacts: string[] = [];

  for (const pattern of patterns) {
    let match = pattern.exec(text);
    while (match) {
      const raw = `${match[1]} ${match[2]}`.replace(/\s+/g, " ").trim();
      if (raw.length >= 8 && raw.length <= 100) {
        nextFacts.push(raw);
      }
      match = pattern.exec(text);
    }
  }

  return nextFacts.slice(0, 4);
}

function mergeFacts(existingFacts: string[], userMessage: string) {
  const merged = new Map<string, string>();

  for (const fact of existingFacts) {
    const key = fact.toLowerCase();
    merged.set(key, fact);
  }

  for (const fact of extractUserFacts(userMessage)) {
    const key = fact.toLowerCase();
    if (!merged.has(key)) {
      merged.set(key, fact);
    }
  }

  return Array.from(merged.values()).slice(-10);
}

function rollSummary(
  previousSummary: string,
  history: ConversationMessage[],
  userMessage: string,
  assistantReply: string,
) {
  const recentUserTopics = history
    .filter((entry) => entry.role === "user")
    .slice(-3)
    .map((entry) => entry.content)
    .join(" | ");

  const nextSummary = [
    previousSummary,
    recentUserTopics ? `Recent user topics: ${recentUserTopics}.` : "",
    `Latest user ask: ${userMessage}`,
    `Latest assistant guidance: ${assistantReply}`,
  ]
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  return nextSummary.slice(-600);
}

function fallbackReply(persona: Persona, userMessage: string) {
  const cleaned = userMessage.trim();
  if (!cleaned) {
    return "I did not catch that. Say it again in one sentence.";
  }

  if (persona.id === "einstein") {
    return "Imagine this as a thought experiment. Start with one simple model you can test today, then compare your intuition with what the result teaches you. Which part feels least intuitive right now?";
  }

  if (persona.id === "mlk") {
    return "Begin with one principle: nonviolence is not passivity, it is organized moral force. Study one campaign, identify its strategy, then ask what made it move public opinion and policy. Which event do you want to examine first?";
  }

  if (persona.id === "rosa") {
    return "History often turns on disciplined everyday courage. Look at one local action, then trace how community organizing scaled it into a movement. Which part of the Montgomery story feels most important to you?";
  }

  if (persona.id === "malcolmx") {
    return "Start by comparing ideas over time, not freezing a person at one moment. Malcolm X's public thought evolved, and that evolution is part of the lesson. Which period should we break down first?";
  }

  if (persona.id === "douglass") {
    return "Read the evidence, then test the moral argument. Douglass used narrative and oratory to force the public to confront reality. Which source do you want to unpack: speeches, autobiography, or abolitionist debates?";
  }

  if (persona.id === "tubman") {
    return "Freedom work required planning, timing, and trust. Start with one Underground Railroad route story, then identify the risks and choices at each step. Which part do you want to understand first: routes, signals, or rescue strategy?";
  }

  if (persona.id === "dubois") {
    return "Define the idea first, then test it against history. Du Bois linked analysis to action, especially around education, rights, and democracy. Do you want to begin with double consciousness or with Reconstruction politics?";
  }

  if (persona.id === "marshall") {
    return "Civil rights victories in court come from strategy, precedent, and disciplined argument. Start with the legal question in Brown, then examine how the ruling changed public schools. Which piece should we break down first?";
  }

  if (persona.id === "katherinejohnson") {
    return "Great missions depend on precise math and careful verification. Start with one trajectory problem, then see how accurate calculations changed real decisions at NASA. Want the quick intuition for orbital paths first?";
  }

  if (persona.id === "newton") {
    return "Start from a law, then test it with a simple example. If no net force acts, motion remains steady; if force acts, motion changes predictably. Which real-life motion would you like to analyze first?";
  }

  if (persona.id === "galileo") {
    return "Let observation lead you. When careful measurement contradicts old belief, evidence must win. Which claim shall we test: falling motion, or what a telescope reveals in the sky?";
  }

  if (persona.id === "curie") {
    return "Treat discovery as patient work: isolate, measure, verify, repeat. Big breakthroughs often come from disciplined small steps. Which part of radioactivity feels most confusing right now?";
  }

  if (persona.id === "tesla") {
    return "Think in systems, not single gadgets. Alternating current solved transmission at scale by design, not by accident. Do you want the short intuition for AC first, or the induction-motor mechanism?";
  }

  if (persona.id === "jobs") {
    return "Here is the move: cut everything that does not serve the core user moment. Build one delightful flow end-to-end, then demo it with absolute clarity. What single feature creates that wow in under ten seconds?";
  }

  if (persona.id === "napoleon") {
    return "Treat this as terrain. Pick one decisive objective, concentrate your resources there, and protect your tempo with daily execution checkpoints. What advantage can you secure before anyone else this week?";
  }

  if (persona.id === "washington") {
    return "Begin with duty before ambition. In difficult times, define the principle you will not compromise, then choose the action that best protects long-term stability for your team. Which decision before you most needs steadiness over speed?";
  }

  if (persona.id === "shakespeare") {
    return "Your heart seeks direction and your fear seeks delay. Choose one bold act before sunset, then let action teach what doubt cannot. What line will you cross today in the name of courage?";
  }

  if (persona.id === "companion") {
    return "You are not alone, and we can take this one small step at a time. First, pause and take five slow breaths with your shoulders relaxed. Then pick one option: drink water, sit somewhere quiet, or write one sentence about what feels hardest right now.";
  }

  return "Start by naming the one outcome that matters most this week. Then pick the smallest concrete step you can complete today to create momentum.";
}

function normalizeReply(reply: string) {
  return reply.replace(/\s+/g, " ").trim();
}

function ensureCompleteEnding(reply: string) {
  const cleaned = normalizeReply(reply);
  if (!cleaned) return "";

  if (/[.!?]["')\]]?$/.test(cleaned)) {
    return cleaned;
  }

  const lastBoundary = Math.max(
    cleaned.lastIndexOf("."),
    cleaned.lastIndexOf("!"),
    cleaned.lastIndexOf("?"),
  );

  if (lastBoundary >= 30) {
    return cleaned.slice(0, lastBoundary + 1).trim();
  }

  return `${cleaned}.`;
}

async function callOllama(messages: ConversationMessage[], temperature = 0.8) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), OLLAMA_TIMEOUT_MS);

  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        stream: false,
        messages,
        options: {
          temperature,
          top_p: 0.92,
          repeat_penalty: 1.06,
          num_predict: OLLAMA_MAX_TOKENS,
        },
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error("ollama_unavailable");
    }

    const data = (await response.json()) as OllamaChatResponse;
    const reply = data.message?.content?.trim();
    if (!reply) {
      throw new Error("empty_ollama_response");
    }

    return reply;
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatRequest;
    const persona = getPersona(body.personaId);
    const userMessage = body.message?.trim() ?? "";
    const history = cleanHistory(body.history);
    const memorySummary = normalizeSummary(body.memorySummary);
    const userFacts = sanitizeFacts(body.userFacts);

    if (!userMessage) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const mergedFacts = mergeFacts(userFacts, userMessage);
    const baseSystemPrompt = buildPersonaSystemPrompt(persona, {
      memorySummary,
      userFacts: mergedFacts,
    });

    let provider = "ollama";
    let driftGuardTriggered = false;

    let reply = "";
    try {
      reply = await callOllama([
        { role: "system", content: baseSystemPrompt },
        ...history,
        { role: "user", content: userMessage },
      ]);

      if (isLikelyPersonaDrift(persona, reply)) {
        driftGuardTriggered = true;
        const stricterPrompt = buildPersonaSystemPrompt(persona, {
          memorySummary,
          userFacts: mergedFacts,
          strictDriftGuard: true,
        });

        reply = await callOllama(
          [
            { role: "system", content: stricterPrompt },
            ...history,
            {
              role: "user",
              content: buildDriftRepairUserPrompt(userMessage, reply),
            },
          ],
          0.72,
        );
      }
    } catch {
      provider = "fallback";
      reply = fallbackReply(persona, userMessage);
    }

    reply = ensureCompleteEnding(reply);
    if (!reply) {
      reply = ensureCompleteEnding(fallbackReply(persona, userMessage));
      provider = "fallback";
    }

    const nextSummary = rollSummary(memorySummary, history, userMessage, reply);

    return NextResponse.json({
      reply,
      provider,
      model: provider === "ollama" ? OLLAMA_MODEL : "rule-based",
      memorySummary: nextSummary,
      userFacts: mergedFacts,
      driftGuardTriggered,
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to process chat request." },
      { status: 500 },
    );
  }
}
