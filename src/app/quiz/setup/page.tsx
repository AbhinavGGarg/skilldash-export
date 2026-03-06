"use client";

import { useEffect, useMemo, useState, useTransition, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Calculator, FlaskConical, BookOpen, History, Cpu,
  Loader2, ChevronRight, Check, GraduationCap, Brain, Languages, FileText, PenLine, ArrowLeft, Search
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { SUBJECT_GROUPS } from "@/lib/course-catalog";
import type { ReactNode } from "react";

const GROUP_ICONS: Record<string, ReactNode> = {
  Mathematics: <Calculator className="h-4 w-4" />,
  Science: <FlaskConical className="h-4 w-4" />,
  "Social Studies": <History className="h-4 w-4" />,
  English: <PenLine className="h-4 w-4" />,
  "Foreign Language": <Languages className="h-4 w-4" />,
  Technology: <Cpu className="h-4 w-4" />,
  "SAT Prep": <FileText className="h-4 w-4" />,
  "ACT Prep": <BookOpen className="h-4 w-4" />
};

function QuizSetupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [selectedCourse, setSelectedCourse] = useState(searchParams.get("subject") || "Algebra 1");
  const [selectedSubtopic, setSelectedSubtopic] = useState("All Topics");
  const [difficulty, setDifficulty] = useState("Medium");
  const [questionCount, setQuestionCount] = useState("5");
  const [courseSearch, setCourseSearch] = useState("");
  const [step, setStep] = useState<"course" | "configure">("course");

  const currentCourseData = useMemo(
    () => SUBJECT_GROUPS.flatMap((g) => g.courses).find((c) => c.name === selectedCourse),
    [selectedCourse]
  );

  const availableSubtopics = currentCourseData?.subtopics ?? [];

  const filteredGroups = useMemo(() => {
    const query = courseSearch.trim().toLowerCase();
    if (!query) return SUBJECT_GROUPS;

    return SUBJECT_GROUPS.map((group) => ({
      ...group,
      courses: group.courses.filter((course) => course.name.toLowerCase().includes(query))
    })).filter((group) => group.courses.length > 0);
  }, [courseSearch]);

  useEffect(() => {
    if (selectedSubtopic !== "All Topics" && availableSubtopics.length > 0 && !availableSubtopics.includes(selectedSubtopic)) {
      setSelectedSubtopic("All Topics");
    }
  }, [availableSubtopics, selectedSubtopic]);

  const startQuiz = () => {
    startTransition(() => {
      const url = `/quiz/active?subject=${encodeURIComponent(selectedCourse)}&subtopic=${encodeURIComponent(selectedSubtopic)}&difficulty=${difficulty}&count=${questionCount}`;
      router.push(url);
    });
  };

  return (
    <div className="min-h-screen worksheet-bg py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
            <GraduationCap className="h-3 w-3" />
            Subject Enrollment
          </div>
          <h1 className="text-4xl font-headline tracking-tight">Your Practice Space</h1>
          <p className="text-muted-foreground font-medium">Search and choose a course first, then configure unit, difficulty, and session size.</p>
        </header>

        {step === "course" ? (
          <Card className="border shadow-md rounded-3xl overflow-hidden bg-white">
            <CardContent className="p-8 space-y-6">
              <div className="space-y-3">
                <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">01. Find Course</Label>
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={courseSearch}
                    onChange={(e) => setCourseSearch(e.target.value)}
                    placeholder="Search course name (e.g., AP Biology, SAT Math, French 2)"
                    className="pl-10 h-12 rounded-xl"
                  />
                </div>
              </div>

              <ScrollArea className="h-[520px]">
                <div className="space-y-7 pr-3">
                  {filteredGroups.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No matching course found.</p>
                  ) : (
                    filteredGroups.map((group) => (
                      <div key={group.name} className="space-y-2">
                        <h4 className="flex items-center gap-2 font-bold text-[10px] text-primary uppercase tracking-wider">
                          {GROUP_ICONS[group.name]}
                          {group.name}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {group.courses.map((course) => (
                            <button
                              key={course.name}
                              onClick={() => {
                                setSelectedCourse(course.name);
                                setSelectedSubtopic("All Topics");
                                setStep("configure");
                              }}
                              className={cn(
                                "w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium transition-all text-left border",
                                selectedCourse === course.name
                                  ? "bg-primary text-primary-foreground shadow-sm border-primary"
                                  : "hover:bg-muted text-muted-foreground border-muted"
                              )}
                            >
                              <span className="truncate">{course.name}</span>
                              <ChevronRight className="h-4 w-4 shrink-0" />
                            </button>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        ) : (
          <Card className="border shadow-md rounded-3xl overflow-hidden bg-white">
            <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-0 p-0">
              <div className="lg:col-span-2 border-r p-8 space-y-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">02. Configure Session</Label>
                    <p className="mt-2 text-sm font-semibold text-primary">{selectedCourse}</p>
                  </div>
                  <Button variant="outline" className="rounded-xl" onClick={() => setStep("course")}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Change Course
                  </Button>
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Unit</Label>
                  <ScrollArea className="h-[360px]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-2">
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
                        <span className="text-[11px] text-muted-foreground leading-relaxed">Practice across all units for {selectedCourse}.</span>
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
                          <span className="text-[11px] text-muted-foreground leading-relaxed">Focus on {subtopic}.</span>
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>

              <div className="p-8 space-y-8 bg-muted/10">
                <div className="space-y-4">
                  <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Difficulty</Label>
                  <RadioGroup value={difficulty} onValueChange={setDifficulty} className="grid grid-cols-1 gap-2">
                    {["Easy", "Medium", "Hard"].map((lvl) => (
                      <div key={lvl}>
                        <RadioGroupItem value={lvl} id={lvl} className="peer sr-only" />
                        <Label
                          htmlFor={lvl}
                          className="flex items-center justify-center rounded-xl border-2 border-muted bg-white p-4 hover:border-primary/40 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all cursor-pointer font-bold text-xs uppercase tracking-widest text-muted-foreground peer-data-[state=checked]:text-primary"
                        >
                          {lvl}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Session Length</Label>
                  <Select value={questionCount} onValueChange={setQuestionCount}>
                    <SelectTrigger className="h-14 border-2 rounded-xl bg-white shadow-none">
                      <SelectValue placeholder="Questions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 Problems (Quick)</SelectItem>
                      <SelectItem value="10">10 Problems (Standard)</SelectItem>
                      <SelectItem value="15">15 Problems (Rigorous)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-6 border-t space-y-3">
                  <Button
                    className="w-full h-14 rounded-2xl text-base font-headline shadow-lg active:scale-[0.98] transition-all"
                    onClick={startQuiz}
                    disabled={isPending}
                  >
                    {isPending ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Loading Workspace...
                      </div>
                    ) : "Enter Practice Room"}
                  </Button>
                  <Button
                    className="w-full h-12 rounded-xl text-sm font-bold uppercase tracking-widest"
                    variant="outline"
                    onClick={() =>
                      router.push(
                        `/learn/active?subject=${encodeURIComponent(selectedCourse)}&subtopic=${encodeURIComponent(selectedSubtopic)}`
                      )
                    }
                  >
                    <Brain className="h-4 w-4 mr-2" />
                    Study This Unit First
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default function QuizSetupPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-[60vh] worksheet-bg">
        <Loader2 className="h-10 w-10 animate-spin text-primary/40" />
        <p className="mt-4 text-muted-foreground font-medium italic">Preparing your academic materials...</p>
      </div>
    }>
      <QuizSetupContent />
    </Suspense>
  );
}
