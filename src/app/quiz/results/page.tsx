"use client";

import { useEffect, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Trophy, RefreshCcw, Home, LayoutDashboard, Share2, Loader2, CheckCircle2 } from "lucide-react";
import { Suspense } from "react";
import { useUser, useFirestore } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";

function ResultsContent() {
  const searchParams = useSearchParams();
  const { user } = useUser();
  const db = useFirestore();
  const [isSaving, setIsSaving] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);

  const score = parseInt(searchParams.get('score') || "0");
  const total = parseInt(searchParams.get('total') || "5");
  const subject = searchParams.get('subject') || "Algebra";
  const difficulty = searchParams.get('difficulty') || "Medium";
  const percentage = Math.round((score / total) * 100);

  useEffect(() => {
    async function saveResult() {
      if (!user || hasSaved || isSaving) return;
      
      setIsSaving(true);
      const sessionId = `session_${Date.now()}`;
      const sessionRef = doc(db, 'users', user.uid, 'quizSessions', sessionId);
      
      try {
        await setDoc(sessionRef, {
          id: sessionId,
          userId: user.uid,
          subjectId: subject,
          difficultyLevel: difficulty,
          startTime: new Date().toISOString(),
          endTime: new Date().toISOString(),
          score: percentage,
          correctCount: score,
          totalQuestions: total,
          status: 'completed'
        });
        setHasSaved(true);
      } catch (e) {
        console.error("Failed to save session:", e);
      } finally {
        setIsSaving(false);
      }
    }

    saveResult();
  }, [user, db, score, total, subject, difficulty, percentage, hasSaved, isSaving]);

  let message = "Good effort! Practice makes perfect.";
  if (percentage === 100) message = "Perfect score! You're a SkillDash master.";
  else if (percentage >= 80) message = "Great job! You're on the right track.";
  else if (percentage >= 60) message = "Well done! Keep pushing yourself.";

  return (
    <div className="container max-w-2xl py-12 px-6">
      <Card className="border-2 text-center overflow-hidden rounded-3xl">
        <div className="bg-primary/5 py-12">
          <div className="mx-auto bg-primary w-24 h-24 rounded-full flex items-center justify-center text-primary-foreground mb-6 animate-bounce">
            <Trophy className="h-12 w-12" />
          </div>
          <CardTitle className="text-4xl font-headline mb-2">Quiz Complete!</CardTitle>
          <CardDescription className="text-xl text-primary font-medium">{message}</CardDescription>
        </div>
        
        <CardContent className="py-12 space-y-8">
          <div className="flex justify-center items-center gap-12">
            <div>
              <p className="text-4xl font-headline text-primary">{score} / {total}</p>
              <p className="text-muted-foreground uppercase tracking-widest text-xs font-bold">Questions Correct</p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div>
              <p className="text-4xl font-headline text-accent">{percentage}%</p>
              <p className="text-muted-foreground uppercase tracking-widest text-xs font-bold">Total Score</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground font-medium">
            {isSaving ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Saving progress...</>
            ) : hasSaved ? (
              <><CheckCircle2 className="h-4 w-4 text-primary" /> Session recorded to your planner</>
            ) : (
              "Complete a session to track progress"
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Link href="/quiz/setup" className="flex-1">
              <Button variant="outline" className="w-full h-12 gap-2 rounded-xl">
                <RefreshCcw className="h-4 w-4" /> Try Again
              </Button>
            </Link>
            <Button variant="outline" className="flex-1 h-12 gap-2 rounded-xl">
              <Share2 className="h-4 w-4" /> Share Score
            </Button>
          </div>
        </CardContent>

        <CardFooter className="bg-muted/30 border-t flex flex-col sm:flex-row gap-4 p-6">
          <Link href="/dashboard" className="w-full">
            <Button className="w-full gap-2 h-12 rounded-xl font-headline">
              <LayoutDashboard className="h-4 w-4" /> Go to Dashboard
            </Button>
          </Link>
          <Link href="/" className="w-full">
            <Button variant="ghost" className="w-full gap-2 h-12 rounded-xl">
              <Home className="h-4 w-4" /> Back Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function QuizResultsPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground font-medium">Loading results...</p>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  );
}
