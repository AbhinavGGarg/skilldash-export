"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import type { ConversationMessage, PersonaId } from "@/lib/personas";

type UseConversationOptions = {
  personaId: PersonaId;
};

type ChatResponse = {
  reply?: string;
  memorySummary?: string;
  userFacts?: string[];
};

export function useConversation({ personaId }: UseConversationOptions) {
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [memorySummary, setMemorySummary] = useState("");
  const [userFacts, setUserFacts] = useState<string[]>([]);

  const messagesRef = useRef<ConversationMessage[]>([]);

  const visibleMessages = useMemo(
    () => messages.filter((msg) => msg.role !== "system"),
    [messages],
  );

  const resetConversation = useCallback(() => {
    setMessages([]);
    messagesRef.current = [];
    setError(null);
    setMemorySummary("");
    setUserFacts([]);
  }, []);

  const sendMessage = useCallback(
    async (userInput: string) => {
      const cleaned = userInput.trim();
      if (!cleaned) {
        return null;
      }

      const userMessage: ConversationMessage = {
        role: "user",
        content: cleaned,
      };

      const updatedHistory = [...messagesRef.current, userMessage];
      messagesRef.current = updatedHistory;
      setMessages(updatedHistory);
      setIsThinking(true);
      setError(null);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            personaId,
            message: cleaned,
            history: updatedHistory.slice(-14),
            memorySummary,
            userFacts,
          }),
        });

        if (!response.ok) {
          throw new Error("chat_api_error");
        }

        const data = (await response.json()) as ChatResponse;
        const reply = data.reply?.trim();
        if (!reply) {
          throw new Error("empty_model_reply");
        }

        const assistantMessage: ConversationMessage = {
          role: "assistant",
          content: reply,
        };

        setMemorySummary(data.memorySummary?.trim() ?? memorySummary);
        setUserFacts(Array.isArray(data.userFacts) ? data.userFacts : userFacts);

        setMessages((prev) => {
          const next = [...prev, assistantMessage];
          messagesRef.current = next;
          return next;
        });

        return assistantMessage;
      } catch {
        const fallback = "I hit a temporary issue. Please try speaking again.";
        const fallbackMessage: ConversationMessage = {
          role: "assistant",
          content: fallback,
        };

        setMessages((prev) => {
          const next = [...prev, fallbackMessage];
          messagesRef.current = next;
          return next;
        });

        setError(fallback);
        return fallbackMessage;
      } finally {
        setIsThinking(false);
      }
    },
    [memorySummary, personaId, userFacts],
  );

  return {
    messages: visibleMessages,
    isThinking,
    error,
    memorySummary,
    userFacts,
    sendMessage,
    resetConversation,
  };
}
