"use client";

import { useEffect, useMemo, useState, useTransition, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calculator, FlaskConical, BookOpen, History, Cpu,
  Loader2, ChevronRight, Check, GraduationCap, Brain
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { SUBJECT_GROUPS } from "@/lib/course-catalog";
import type { ReactNode } from "react";

const GROUP_ICONS: Record<string, ReactNode> = {
  Mathematics: <Calculator className="h-4 w-4" />,
  Science: <FlaskConical className="h-4 w-4" />,
  "Social Studies": <History className="h-4 w-4" />,
  Technology: <Cpu className="h-4 w-4" />,
  Languages: <BookOpen className="h-4 w-4" />
};

function QuizSetupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  
  const [selectedCourse, setSelectedCourse] = useState(searchParams.get('subject') || "Algebra 1");
  const [selectedSubtopic, setSelectedSubtopic] = useState("All Topics");
  const [difficulty, setDifficulty] = useState("Medium");
  const [questionCount, setQuestionCount] = useState("5");

  const currentCourseData = useMemo(
    () => SUBJECT_GROUPS.flatMap((g) => g.courses).find((c) => c.name === selectedCourse),
    [selectedCourse]
  );

  const availableSubtopics = currentCourseData?.subtopics ?? [];

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
          <p className="text-muted-foreground font-medium">Select a regular or AP-level course to begin your focused review.</p>
        </header>

        <Card className="border shadow-md rounded-3xl overflow-hidden bg-white">
          <CardContent className="grid grid-cols-1 lg:grid-cols-4 gap-0 p-0">
            {/* Step 1: Course Selection */}
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
                        {group.courses.map((course) => {
                          return (
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
                            <span className="flex items-center gap-2">
                              {selectedCourse === course.name && <ChevronRight className="h-4 w-4 shrink-0" />}
                            </span>
                          </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Step 2: Unit Selection */}
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
                    <span className="text-[11px] text-muted-foreground leading-relaxed">Practice across all verified units for {selectedCourse}.</span>
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
                      <span className="text-[11px] text-muted-foreground leading-relaxed">Focus strictly on {subtopic} mastery and specific logic.</span>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Step 3: Session Intensity */}
            <div className="p-8 space-y-10 bg-muted/10">
              <div className="space-y-4">
                <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">03. Target Rigor</Label>
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
                <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">04. Session Length</Label>
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

              <div className="pt-12 border-t">
                <div className="space-y-3">
                  <Button 
                    className="w-full h-16 rounded-2xl text-lg font-headline shadow-lg active:scale-[0.98] transition-all" 
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
            </div>
          </CardContent>
        </Card>
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
