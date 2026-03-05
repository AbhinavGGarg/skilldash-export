
"use client";

import { useState, useEffect, useTransition, Suspense, useMemo, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ACTIVE_QUESTION_BANK, Question } from "@/lib/questions-data";
import { Check, X, Loader2, ArrowRight, BookOpen, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { MathText } from "@/components/ui/math-text";

function ActiveQuizContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  
  // Quiz parameters from URL
  const selectedSubject = useMemo(() => searchParams.get('subject') || "Algebra 1", [searchParams]);
  const selectedSubtopic = useMemo(() => searchParams.get('subtopic') || "All Topics", [searchParams]);
  const selectedDifficulty = useMemo(() => (searchParams.get('difficulty')?.toLowerCase() || "medium") as "easy" | "medium" | "hard", [searchParams]);
  const targetCount = useMemo(() => parseInt(searchParams.get('count') || "5"), [searchParams]);

  // Selection Engine State
  const [usedQuestionIds, setUsedQuestionIds] = useState<string[]>([]);
  const [unavailable, setUnavailable] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Normalized Filtering and Selection Engine
  const getNextQuestion = useCallback((currentUsedIds: string[]) => {
    setUnavailable(false);

    function normalize(str: string) {
      return str?.trim().toLowerCase() || "";
    }

    const isAllTopics = normalize(selectedSubtopic) === "all topics";
    const normalizedSubject = normalize(selectedSubject);
    const normalizedSubtopic = normalize(selectedSubtopic);

    const subjectPool = ACTIVE_QUESTION_BANK.filter(
      (q) => normalize(q.subject) === normalizedSubject
    );

    // Step 1: Strict filtering (subject, subtopic, difficulty) - Topic removed per user request
    let filtered = subjectPool.filter(q =>
      (isAllTopics || normalize(q.subtopic) === normalizedSubtopic) &&
      normalize(q.difficulty) === normalize(selectedDifficulty)
    );

    // Step 2: Difficulty fallback (same subject + same subtopic, any difficulty)
    if (filtered.length === 0) {
      filtered = subjectPool.filter(q =>
        isAllTopics || normalize(q.subtopic) === normalizedSubtopic
      );
    }

    // Step 3: For comprehensive mode only, allow full-subject fallback.
    if (filtered.length === 0 && isAllTopics) {
      filtered = subjectPool;
    }

    // Step 4: Only show unavailable if truly empty for the selected subtopic/subject scope
    if (filtered.length === 0) {
      setUnavailable(true);
      return null;
    }

    // Step 5: Remove already-used questions
    const unused = filtered.filter(q => !currentUsedIds.includes(q.id));

    // Step 6: If all used, reset within the same filtered pool.
    const pool = unused.length > 0 ? unused : filtered;

    // Step 7: Prevent immediate back-to-back repeats when alternatives exist.
    const lastUsedId = currentUsedIds[currentUsedIds.length - 1];
    const nonImmediateRepeatPool = pool.length > 1 ? pool.filter((q) => q.id !== lastUsedId) : pool;
    const nextQ = nonImmediateRepeatPool[Math.floor(Math.random() * nonImmediateRepeatPool.length)];

    return { nextQ, usedWasReset: unused.length === 0 };
  }, [selectedSubject, selectedSubtopic, selectedDifficulty]);

  // Initial Load
  useEffect(() => {
    const result = getNextQuestion([]);
    if (result?.nextQ) {
      setCurrentQuestion(result.nextQ);
      setUsedQuestionIds([result.nextQ.id]);
    }
    setIsLoading(false);
  }, [getNextQuestion]);

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] worksheet-bg text-center space-y-4">
      <Loader2 className="h-10 w-10 animate-spin text-primary/40 mx-auto" />
      <p className="text-muted-foreground font-medium italic">Opening digital worksheet...</p>
    </div>
  );

  if (unavailable || !currentQuestion) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center worksheet-bg">
      <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
      <h2 className="text-xl font-headline mb-2">Subject Materials Unavailable</h2>
      <p className="text-muted-foreground max-w-sm mb-6">We are currently verifying high-rigor problems for "{selectedSubject} - {selectedSubtopic}".</p>
      <Button onClick={() => router.push('/quiz/setup')} variant="outline" className="rounded-xl px-8">
        Return to Course Library
      </Button>
    </div>
  );

  const progress = (currentIndex / targetCount) * 100;

  const handleOptionSelect = (idx: number) => {
    if (isSubmitted) return;
    setSelectedAnswerIndex(idx);
  };

  const handleSubmit = () => {
    if (selectedAnswerIndex === null || isSubmitted) return;
    if (selectedAnswerIndex === currentQuestion.answerIndex) setScore(s => s + 1);
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (currentIndex < targetCount - 1) {
      const result = getNextQuestion(usedQuestionIds);
      if (result?.nextQ) {
        setCurrentQuestion(result.nextQ);
        setUsedQuestionIds(prev => result.usedWasReset ? [result.nextQ.id] : [...prev, result.nextQ.id]);
        setCurrentIndex(c => c + 1);
        setSelectedAnswerIndex(null);
        setIsSubmitted(false);
      }
    } else {
      startTransition(() => {
        router.push(`/quiz/results?score=${score}&total=${targetCount}&subject=${encodeURIComponent(selectedSubject)}&difficulty=${selectedDifficulty}`);
      });
    }
  };

  return (
    <div className="min-h-screen worksheet-bg py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="flex justify-between items-center px-2">
          <div className="space-y-1 text-left">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Digital Worksheet</h4>
            <div className="flex gap-3 items-center text-sm font-medium">
              <span className="text-primary">{selectedSubject}</span>
              <span className="text-muted-foreground">/</span>
              <span className="text-muted-foreground truncate max-w-[150px]">{selectedSubtopic}</span>
              <span className="bg-muted px-2 py-0.5 rounded text-[10px] uppercase font-bold">
                {currentQuestion.difficulty}
              </span>
            </div>
          </div>
          <div className="text-right space-y-1">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">P. {currentIndex + 1} / {targetCount}</span>
            <Progress value={progress} className="h-1.5 w-24 bg-muted" />
          </div>
        </header>

        <Card className="border shadow-md rounded-2xl bg-white overflow-hidden">
          <CardHeader className="p-10 border-b bg-muted/10 text-left">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                RIGOR LEVEL {currentQuestion.rigor}
              </span>
            </div>
            <MathText 
              text={currentQuestion.question} 
              className="text-2xl md:text-3xl font-body leading-snug text-foreground/90"
            />
          </CardHeader>
          <CardContent className="p-10 space-y-8">
            <div className="grid gap-4">
              {currentQuestion.choices.map((choice, idx) => {
                const isCorrect = isSubmitted && idx === currentQuestion.answerIndex;
                const isWrong = isSubmitted && selectedAnswerIndex === idx && idx !== currentQuestion.answerIndex;
                const isSelected = selectedAnswerIndex === idx;
                
                return (
                  <button
                    key={`opt-${idx}`}
                    onClick={() => handleOptionSelect(idx)}
                    disabled={isSubmitted || isPending}
                    className={cn(
                      "w-full p-5 text-left rounded-xl border-2 transition-all flex items-center justify-between group",
                      !isSubmitted && isSelected ? "border-primary bg-primary/5 text-primary shadow-sm" : "border-muted/60 hover:border-primary/40",
                      isCorrect ? "border-primary bg-primary/5 text-primary" : "",
                      isWrong ? "border-destructive/40 bg-destructive/5 text-destructive" : "",
                      isSubmitted && idx !== currentQuestion.answerIndex && !isSelected ? "opacity-40" : "",
                      "disabled:cursor-default"
                    )}
                  >
                    <MathText text={choice} className="font-medium text-lg" />
                    {isCorrect && <Check className="h-5 w-5 text-primary" />}
                    {isWrong && <X className="h-5 w-5 text-destructive" />}
                  </button>
                );
              })}
            </div>

            {!isSubmitted ? (
              <Button 
                className="w-full h-14 text-lg rounded-xl shadow-sm mt-4 font-headline" 
                disabled={selectedAnswerIndex === null}
                onClick={handleSubmit}
              >
                Confirm Answer
              </Button>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300 text-left">
                <div className={cn(
                  "p-6 rounded-xl flex gap-4 border-2",
                  selectedAnswerIndex === currentQuestion.answerIndex ? "bg-primary/5 border-primary/20 text-primary" : "bg-destructive/5 border-destructive/10 text-destructive"
                )}>
                  {selectedAnswerIndex === currentQuestion.answerIndex ? <Check className="h-6 w-6 mt-1" /> : <X className="h-6 w-6 mt-1" />}
                  <div>
                    <h4 className="text-xl font-headline">
                      {selectedAnswerIndex === currentQuestion.answerIndex ? "Correct Analysis" : "Concept Re-analysis"}
                    </h4>
                    {selectedAnswerIndex !== currentQuestion.answerIndex && (
                      <div className="mt-1 text-sm font-medium">
                        The correct response is <MathText text={currentQuestion.choices[currentQuestion.answerIndex]} className="inline font-bold" />.
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-muted/30 p-8 rounded-xl border relative">
                  <div className="absolute -top-3 left-6 bg-white border px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <BookOpen className="h-3 w-3 text-primary" />
                    Detailed Explanation
                  </div>
                  <div className="text-base leading-relaxed text-foreground/80 italic font-medium pt-2">
                    <MathText text={currentQuestion.explanation} />
                  </div>
                </div>

                <Button className="w-full h-14 gap-2 text-lg rounded-xl shadow-sm font-headline" onClick={handleNext} disabled={isPending}>
                  {currentIndex === targetCount - 1 ? "Complete Session" : "Next Problem"}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function ActiveQuizPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-[60vh] worksheet-bg">
        <Loader2 className="h-10 w-10 animate-spin text-primary/40" />
        <p className="mt-4 text-muted-foreground font-medium italic">Opening digital worksheet...</p>
      </div>
    }>
      <ActiveQuizContent />
    </Suspense>
  );
}
