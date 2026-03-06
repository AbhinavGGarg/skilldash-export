"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BookOpen, Brain, Calculator, Check, ChevronRight, Cpu, FlaskConical, History, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { SUBJECT_GROUPS } from "@/lib/course-catalog";
import { buildLearnGuide } from "@/lib/learn-content";
import type { ReactNode } from "react";

const GROUP_ICONS: Record<string, ReactNode> = {
  Mathematics: <Calculator className="h-4 w-4" />,
  Science: <FlaskConical className="h-4 w-4" />,
  "Social Studies": <History className="h-4 w-4" />,
  Technology: <Cpu className="h-4 w-4" />,
  Languages: <BookOpen className="h-4 w-4" />
};

function LearnPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
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

  const guide = useMemo(
    () => buildLearnGuide(selectedCourse, selectedSubtopic),
    [selectedCourse, selectedSubtopic]
  );

  const startPractice = () => {
    router.push(
      `/quiz/active?subject=${encodeURIComponent(selectedCourse)}&subtopic=${encodeURIComponent(selectedSubtopic)}&difficulty=Medium&count=10`
    );
  };

  return (
    <div className="min-h-screen worksheet-bg py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
            <Brain className="h-3 w-3" />
            Learn Mode
          </div>
          <h1 className="text-4xl font-headline tracking-tight">Study By Topic</h1>
          <p className="text-muted-foreground font-medium">Structured notes, key mistakes, and a guided plan for every course unit.</p>
        </header>

        <Card className="border shadow-md rounded-3xl overflow-hidden bg-white">
          <CardContent className="grid grid-cols-1 lg:grid-cols-12 p-0">
            <div className="lg:col-span-3 border-r p-6 bg-muted/20">
              <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block mb-4">Course</Label>
              <ScrollArea className="h-[70vh] pr-3">
                <div className="space-y-7">
                  {SUBJECT_GROUPS.map((group) => (
                    <div key={group.name} className="space-y-2">
                      <h4 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-primary">
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
                              "w-full flex items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-all",
                              selectedCourse === course.name
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:bg-muted"
                            )}
                          >
                            <span className="truncate">{course.name}</span>
                            {selectedCourse === course.name && <ChevronRight className="h-4 w-4" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <div className="lg:col-span-3 border-r p-6">
              <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block mb-4">Unit</Label>
              <ScrollArea className="h-[70vh] pr-3">
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedSubtopic("All Topics")}
                    className={cn(
                      "w-full rounded-xl border-2 p-4 text-left transition-all",
                      selectedSubtopic === "All Topics"
                        ? "border-primary/40 bg-primary/5"
                        : "border-muted/60 hover:border-primary/20"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-headline text-sm">Comprehensive Review</span>
                      {selectedSubtopic === "All Topics" && <Check className="h-4 w-4 text-primary" />}
                    </div>
                    <p className="mt-1 text-[11px] text-muted-foreground">Cross-unit study plan for {selectedCourse}</p>
                  </button>
                  {availableSubtopics.map((subtopic) => (
                    <button
                      key={subtopic}
                      onClick={() => setSelectedSubtopic(subtopic)}
                      className={cn(
                        "w-full rounded-xl border-2 p-4 text-left transition-all",
                        selectedSubtopic === subtopic
                          ? "border-primary/40 bg-primary/5"
                          : "border-muted/60 hover:border-primary/20"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-headline text-sm">{subtopic}</span>
                        {selectedSubtopic === subtopic && <Check className="h-4 w-4 text-primary" />}
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <div className="lg:col-span-6 p-6">
              <ScrollArea className="h-[70vh] pr-2">
                <div className="space-y-4">
                  <Card className="border bg-muted/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl font-headline">{guide.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">{guide.overview}</CardContent>
                  </Card>

                  <Card className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">How To Think In This Unit</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      {guide.keyMoves.map((item) => (
                        <p key={item}>• {item}</p>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Most Common Mistakes</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      {guide.commonMistakes.map((item) => (
                        <p key={item}>• {item}</p>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">40-Minute Study Plan</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      {guide.studyPlan.map((item) => (
                        <p key={item}>• {item}</p>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Self-Check Before Practice</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      {guide.checkpoints.map((item) => (
                        <p key={item}>• {item}</p>
                      ))}
                    </CardContent>
                  </Card>

                  {guide.samplePrompts.length > 0 && (
                    <Card className="border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Representative Prompts In This Unit</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm text-muted-foreground">
                        {guide.samplePrompts.map((item) => (
                          <p key={item}>• {item}</p>
                        ))}
                      </CardContent>
                    </Card>
                  )}

                  <div className="flex flex-wrap gap-3 pt-2">
                    <Button className="rounded-xl" onClick={startPractice}>Start Practice On This Unit</Button>
                    <Link href="/quiz/setup">
                      <Button className="rounded-xl" variant="outline">Open Practice Setup</Button>
                    </Link>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function LearnPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex flex-col items-center justify-center worksheet-bg">
          <Loader2 className="h-10 w-10 animate-spin text-primary/40" />
          <p className="mt-4 text-muted-foreground">Loading study materials...</p>
        </div>
      }
    >
      <LearnPageContent />
    </Suspense>
  );
}
