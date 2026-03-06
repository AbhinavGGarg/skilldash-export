"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Bot, Loader2, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function AiTutorWidget() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "I’m your AI tutor. Ask me for hints, step-by-step help, or clearer explanations."
    }
  ]);

  const subject = useMemo(() => searchParams.get("subject") || undefined, [searchParams]);
  const subtopic = useMemo(() => searchParams.get("subtopic") || undefined, [searchParams]);
  const scrollAnchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) {
      scrollAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages, open]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const nextMessages: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          subject,
          subtopic,
          path: pathname,
          history: nextMessages.slice(-8),
        }),
      });

      const data = await response.json();
      const reply = typeof data?.reply === "string" ? data.reply : "I couldn't generate a response. Try rephrasing your question.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I hit a connection issue. Ask again and include the exact problem text." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="fixed right-5 bottom-5 z-40 rounded-full h-14 px-5 shadow-xl">
          <Bot className="h-4 w-4 mr-2" />
          AI Tutor
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[96vw] sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="border-b p-4 bg-muted/30">
          <SheetTitle className="flex items-center gap-2 text-base">
            <Sparkles className="h-4 w-4 text-primary" />
            SkillDash AI Tutor
          </SheetTitle>
          <p className="text-xs text-muted-foreground">
            {subject ? `${subject}${subtopic ? ` • ${subtopic}` : ""}` : "General help"}
          </p>
        </SheetHeader>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-3 pr-2">
            {messages.map((m, idx) => (
              <div
                key={`${m.role}-${idx}`}
                className={m.role === "user" ? "ml-8 rounded-xl bg-primary text-primary-foreground px-3 py-2 text-sm" : "mr-8 rounded-xl border bg-background px-3 py-2 text-sm"}
              >
                {m.content}
              </div>
            ))}
            <div ref={scrollAnchorRef} />
          </div>
        </ScrollArea>

        <div className="border-t p-3 space-y-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask for hints, steps, or explanation..."
            className="min-h-[88px]"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void sendMessage();
              }
            }}
          />
          <Button className="w-full" onClick={() => void sendMessage()} disabled={isLoading || !input.trim()}>
            {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
            Send
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
