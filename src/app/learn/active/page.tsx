"use client";

import { Suspense, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, BookOpenCheck, Brain, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MathText } from "@/components/ui/math-text";
import { buildLearnPacket } from "@/lib/learn-content";

function LearnActiveContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedSubject = useMemo(() => searchParams.get("subject") || "Algebra 1", [searchParams]);
  const selectedSubtopic = useMemo(() => searchParams.get("subtopic") || "All Topics", [searchParams]);

  const packet = useMemo(() => buildLearnPacket(selectedSubject, selectedSubtopic), [selectedSubject, selectedSubtopic]);

  const startPractice = () => {
    router.push(
      `/quiz/active?subject=${encodeURIComponent(selectedSubject)}&subtopic=${encodeURIComponent(selectedSubtopic)}&difficulty=Medium&count=10`
    );
  };

  return (
    <div className="min-h-screen worksheet-bg py-10 px-5">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
              <BookOpenCheck className="h-3 w-3" />
              Study Room
            </div>
            <h1 className="text-3xl md:text-4xl font-headline tracking-tight">{packet.title}</h1>
            <p className="text-muted-foreground font-medium">{packet.examUse}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="rounded-xl" asChild>
              <Link href="/learn">Change Unit</Link>
            </Button>
            <Button className="rounded-xl" onClick={startPractice}>
              Practice This Unit
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </header>

        <ScrollArea className="h-[75vh] pr-2">
          <div className="space-y-4 pb-8">
            <Card className="border bg-muted/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">How This Unit Is Tested</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{packet.overview}</CardContent>
            </Card>

            <Card className="border">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Core Ideas You Must Know</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {packet.keyIdeas.map((idea) => (
                  <p key={idea}>• {idea}</p>
                ))}
              </CardContent>
            </Card>

            <Card className="border">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Method Checklist</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {packet.keySteps.map((step) => (
                  <p key={step}>• {step}</p>
                ))}
              </CardContent>
            </Card>

            <Card className="border">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Memory Sheet (High-Value Facts)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {packet.memorySheet.map((fact) => (
                  <p key={fact}>• {fact}</p>
                ))}
              </CardContent>
            </Card>

            <Card className="border">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Common Test Traps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {packet.commonTraps.map((trap) => (
                  <p key={trap}>• {trap}</p>
                ))}
              </CardContent>
            </Card>

            <Card className="border">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Worked Examples</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {packet.workedExamples.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No solved examples were found for this unit yet. Use the memory sheet and then switch to practice mode.</p>
                ) : (
                  packet.workedExamples.map((example, index) => (
                    <div key={example.id} className="border rounded-xl p-4 bg-muted/20 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-widest text-primary">Example {index + 1}</span>
                        <span className="text-[10px] font-bold uppercase bg-white border px-2 py-1 rounded">{example.difficulty}</span>
                      </div>
                      <MathText text={example.question} className="text-sm font-medium text-foreground" />
                      <p className="text-xs text-muted-foreground">Answer target: <span className="font-semibold text-foreground">{example.answerPreview}</span></p>
                      <p className="text-sm text-muted-foreground leading-relaxed">Solution: {example.solution}</p>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            <Card className="border">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Active Recall Drills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {packet.retrievalDrills.map((drill, index) => (
                  <div key={`${drill.prompt}-${index}`} className="rounded-xl border p-4">
                    <p className="text-sm font-medium">{index + 1}. {drill.prompt}</p>
                    <p className="text-xs text-muted-foreground mt-2">Model answer: {drill.answer}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border bg-primary/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="h-4 w-4 text-primary" />
                  50-Minute Test Prep Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {packet.studyPlan.map((step) => (
                  <p key={step}>• {step}</p>
                ))}
              </CardContent>
            </Card>

            <div className="pt-2 flex flex-wrap gap-3">
              <Button className="rounded-xl" onClick={startPractice}>
                Start Practice Now
              </Button>
              <Button variant="outline" className="rounded-xl" asChild>
                <Link href="/quiz/setup">
                  Open Practice Setup
                </Link>
              </Button>
              <Button variant="outline" className="rounded-xl" asChild>
                <Link href="/learn">
                  Back to Learn Setup
                </Link>
              </Button>
            </div>

            <div className="text-xs text-muted-foreground pt-2 flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Review this page first, then switch to timed practice for better retention.
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

export default function LearnActivePage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-[60vh] worksheet-bg">
          <Loader2 className="h-10 w-10 animate-spin text-primary/40" />
          <p className="mt-4 text-muted-foreground font-medium italic">Opening study room...</p>
        </div>
      }
    >
      <LearnActiveContent />
    </Suspense>
  );
}
