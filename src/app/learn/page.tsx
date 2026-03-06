"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BookOpen, Brain, Calculator, Check, ChevronRight, Cpu, FlaskConical, History, Loader2 } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { SUBJECT_GROUPS } from "@/lib/course-catalog";

const GROUP_ICONS: Record<string, ReactNode> = {
  Mathematics: <Calculator className="h-4 w-4" />,
  Science: <FlaskConical className="h-4 w-4" />,
  "Social Studies": <History className="h-4 w-4" />,
  Technology: <Cpu className="h-4 w-4" />,
  Languages: <BookOpen className="h-4 w-4" />
};

function LearnSetupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCourse, setSelectedCourse] = useState(searchParams.get("subject") || "Algebra 1");
  const [selectedSubtopic, setSelectedSubtopic] = useState(searchParams.get("subtopic") || "All Topics");

  const selectedCourseData = useMemo(
    () => SUBJECT_GROUPS.flatMap((g) => g.courses).find((course) => course.name === selectedCourse),
    [selectedCourse]
  );

  const availableSubtopics = selectedCourseData?.subtopics ?? [];

  useEffect(() => {
    if (selectedSubtopic !== "All Topics" && !availableSubtopics.includes(selectedSubtopic)) {
      setSelectedSubtopic("All Topics");
    }
  }, [availableSubtopics, selectedSubtopic]);

  const openStudyRoom = () => {
    router.push(`/learn/active?subject=${encodeURIComponent(selectedCourse)}&subtopic=${encodeURIComponent(selectedSubtopic)}`);
  };

  return (
    <div className="min-h-screen worksheet-bg py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
            <Brain className="h-3 w-3" />
            Learn Setup
          </div>
          <h1 className="text-4xl font-headline tracking-tight">Your Study Room</h1>
          <p className="text-muted-foreground font-medium">Pick a course and unit, then open the dedicated learning workspace.</p>
        </header>

        <Card className="border shadow-md rounded-3xl overflow-hidden bg-white">
          <CardContent className="grid grid-cols-1 lg:grid-cols-4 gap-0 p-0">
            <div className="border-r bg-muted/20 p-8 space-y-6">
              <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block">01. Choose Course</Label>
              <ScrollArea className="h-[500px]">
                <div className="space-y-8 pr-4">
                  {SUBJECT_GROUPS.map((group) => (
                    <div key={group.name} className="space-y-3">
                      <h4 className="flex items-center gap-2 font-bold text-[10px] text-primary uppercase tracking-wider">
                        {GROUP_ICONS[group.name]}
                        {group.name}
                      </h4>
                      <div className="space-y-1">
                        {group.courses.map((course) => (
                          <button
                            key={course.name}
                            onClick={() => {
                              setSelectedCourse(course.name);
                              setSelectedSubtopic("All Topics");
                            }}
                            className={cn(
                              "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left",
                              selectedCourse === course.name
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "hover:bg-muted text-muted-foreground"
                            )}
                          >
                            <span className="truncate">{course.name}</span>
                            {selectedCourse === course.name && <ChevronRight className="h-4 w-4 shrink-0" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <div className="lg:col-span-2 border-r p-8 space-y-6">
              <div className="flex justify-between items-center">
                <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">02. Select Unit</Label>
                <span className="text-xs font-bold text-primary italic bg-primary/5 px-2 py-1 rounded-md">{selectedCourse}</span>
              </div>
              <ScrollArea className="h-[500px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-4">
                  <button
                    onClick={() => setSelectedSubtopic("All Topics")}
                    className={cn(
                      "flex flex-col p-5 rounded-2xl text-left transition-all border-2",
                      selectedSubtopic === "All Topics"
                        ? "bg-primary/5 border-primary/40 shadow-sm"
                        : "bg-white border-muted/60 hover:border-primary/20"
                    )}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className="font-headline text-base">Comprehensive Review</span>
                      {selectedSubtopic === "All Topics" && <Check className="h-4 w-4 text-primary" />}
                    </div>
                    <span className="text-[11px] text-muted-foreground leading-relaxed">Study all units for {selectedCourse} in one room.</span>
                  </button>
                  {availableSubtopics.map((subtopic) => (
                    <button
                      key={subtopic}
                      onClick={() => setSelectedSubtopic(subtopic)}
                      className={cn(
                        "flex flex-col p-5 rounded-2xl text-left transition-all border-2",
                        selectedSubtopic === subtopic
                          ? "bg-primary/5 border-primary/40 shadow-sm"
                          : "bg-white border-muted/60 hover:border-primary/20"
                      )}
                    >
                      <div className="flex items-center justify-between w-full mb-2">
                        <span className="font-headline text-base">{subtopic}</span>
                        {selectedSubtopic === subtopic && <Check className="h-4 w-4 text-primary" />}
                      </div>
                      <span className="text-[11px] text-muted-foreground leading-relaxed">Open a full study module for {subtopic}.</span>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <div className="p-8 space-y-10 bg-muted/10">
              <div className="space-y-4">
                <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">03. Launch</Label>
                <p className="text-sm text-muted-foreground">
                  You will enter a dedicated study workspace with concept notes, memory sheet, worked examples, and recall drills.
                </p>
              </div>

              <div className="pt-12 border-t">
                <Button className="w-full h-16 rounded-2xl text-lg font-headline shadow-lg active:scale-[0.98] transition-all" onClick={openStudyRoom}>
                  Enter Study Room
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function LearnSetupPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-[60vh] worksheet-bg">
          <Loader2 className="h-10 w-10 animate-spin text-primary/40" />
          <p className="mt-4 text-muted-foreground font-medium italic">Preparing your study setup...</p>
        </div>
      }
    >
      <LearnSetupContent />
    </Suspense>
  );
}
