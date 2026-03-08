import type { ConversationMessage } from "@/lib/personas";

type ConversationBubbleProps = {
  message: ConversationMessage;
  personaName: string;
  accent: string;
};

export function ConversationBubble({
  message,
  personaName,
  accent,
}: ConversationBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm md:max-w-[72%] ${
          isUser
            ? "rounded-br-md border border-cyan-200/20 bg-cyan-500/20 text-cyan-100"
            : "rounded-bl-md border border-white/15 bg-white/10 text-white"
        }`}
        style={
          isUser
            ? undefined
            : {
                boxShadow: `inset 0 0 0 1px ${accent}33`,
              }
        }
      >
        <p className="mb-1 text-[11px] uppercase tracking-[0.18em] text-white/60">
          {isUser ? "You" : personaName}
        </p>
        <p className="leading-relaxed">{message.content}</p>
      </div>
    </div>
  );
}
