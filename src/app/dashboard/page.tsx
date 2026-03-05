"use client";

import { useTransition, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { BookOpen, TrendingUp, Calendar, Clock, ArrowUpRight, Loader2, Plus, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, limit } from "firebase/firestore";
import { format, startOfDay, subDays, isSameDay } from "date-fns";

const chartConfig = {
  score: {
    label: "Accuracy %",
    color: "hsl(var(--primary))",
  },
};

export default function DashboardPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { user, isUserLoading: isAuthLoading } = useUser();
  const db = useFirestore();

  const sessionsQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(
      collection(db, 'users', user.uid, 'quizSessions'),
      orderBy('startTime', 'desc'),
      limit(50)
    );
  }, [user, db]);

  const { data: sessions, isLoading: isDataLoading } = useCollection(sessionsQuery);

  const stats = useMemo(() => {
    if (!sessions || sessions.length === 0) return {
      totalSessions: 0,
      avgMastery: 0,
      streak: 0,
      performanceData: [],
      courseProgress: []
    };

    const total = sessions.length;
    const avg = Math.round(sessions.reduce((acc, s) => acc + (s.score || 0), 0) / total);

    // Calculate streak
    let streak = 0;
    const sortedDates = [...new Set(sessions.map(s => startOfDay(new Date(s.startTime)).getTime()))].sort((a, b) => b - a);
    
    let current = startOfDay(new Date());
    for (let i = 0; i < sortedDates.length; i++) {
      if (isSameDay(sortedDates[i], current)) {
        streak++;
        current = subDays(current, 1);
      } else if (isSameDay(sortedDates[i], subDays(startOfDay(new Date()), 0))) {
         // Today or yesterday skip check
         continue;
      } else {
        break;
      }
    }

    // Performance Chart Data (Last 7 days)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = subDays(new Date(), 6 - i);
      const daySessions = sessions.filter(s => isSameDay(new Date(s.startTime), d));
      const dayAvg = daySessions.length > 0 
        ? Math.round(daySessions.reduce((acc, s) => acc + (s.score || 0), 0) / daySessions.length)
        : 0;
      return {
        day: format(d, 'EEE'),
        score: dayAvg
      };
    });

    // Course Progress
    const subjects = [...new Set(sessions.map(s => s.subjectId))];
    const progress = subjects.map(sub => {
      const subSessions = sessions.filter(s => s.subjectId === sub);
      const subAvg = Math.round(subSessions.reduce((acc, s) => acc + (s.score || 0), 0) / subSessions.length);
      return { name: sub, score: subAvg };
    }).sort((a, b) => b.score - a.score);

    return { totalSessions: total, avgMastery: avg, streak, performanceData: last7Days, courseProgress: progress };
  }, [sessions]);

  const handleStartDash = (url: string = "/quiz/setup") => {
    startTransition(() => {
      router.push(url);
    });
  };

  if (isAuthLoading || isDataLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center worksheet-bg">
        <div className="text-center space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground font-medium italic">Synchronizing your study planner...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center worksheet-bg">
        <Card className="max-w-md p-8 text-center space-y-6">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto" />
          <div className="space-y-2">
            <h2 className="text-2xl font-headline">Authentication Required</h2>
            <p className="text-muted-foreground">Log in to view your personalized study progress and analytics.</p>
          </div>
          <Button onClick={() => router.push('/login')} className="w-full h-12 rounded-xl">Go to Login</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl py-12 px-6 space-y-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-headline tracking-tight">Study Planner</h1>
          <p className="text-muted-foreground font-medium">
            {format(new Date(), 'EEEE, MMM do')} • {stats.totalSessions === 0 ? "Start your first practice session today." : `You have completed ${stats.totalSessions} sessions so far.`}
          </p>
        </div>
        <Button 
          size="lg" 
          className="rounded-xl shadow-sm h-12 px-6 gap-2" 
          onClick={() => handleStartDash()}
          disabled={isPending}
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
          New Practice Session
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border shadow-sm rounded-2xl bg-white/60">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-3">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider">Sessions Completed</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-headline">{stats.totalSessions}</span>
              {stats.totalSessions > 0 && (
                <span className="text-sm text-primary font-bold flex items-center">
                  Live Data
                </span>
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="border shadow-sm rounded-2xl bg-white/60">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-3">
              <TrendingUp className="h-4 w-4 text-accent" />
              <span className="text-xs font-bold uppercase tracking-wider">Average Mastery</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-headline">{stats.avgMastery}%</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border shadow-sm rounded-2xl bg-white/60">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-3">
              <Calendar className="h-4 w-4 text-orange-400" />
              <span className="text-xs font-bold uppercase tracking-wider">Study Streak</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-headline">{stats.streak} Days</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border shadow-sm rounded-2xl overflow-hidden bg-white">
          <CardHeader className="bg-muted/30 border-b px-8 py-6">
            <CardTitle className="text-xl font-headline">Learning Momentum</CardTitle>
            <CardDescription>Visualizing your daily accuracy average.</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.performanceData}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tickMargin={10} className="text-muted-foreground" />
                  <YAxis hide domain={[0, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="var(--color-score)" 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: "var(--color-score)", strokeWidth: 0 }} 
                    activeDot={{ r: 6, strokeWidth: 0 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border shadow-sm rounded-2xl bg-white">
          <CardHeader className="bg-muted/30 border-b px-8 py-6">
            <CardTitle className="text-xl font-headline">Course Progress</CardTitle>
            <CardDescription>Mastery levels across your subjects.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            {stats.courseProgress.length === 0 ? (
              <div className="py-12 text-center space-y-4">
                <p className="text-sm text-muted-foreground italic">No course data recorded yet. Complete your first session to see progress.</p>
              </div>
            ) : (
              stats.courseProgress.map((cp) => (
                <div key={cp.name} className="space-y-3">
                  <div className="flex justify-between text-sm font-medium">
                    <span>{cp.name}</span>
                    <span className="text-primary">{cp.score}%</span>
                  </div>
                  <Progress value={cp.score} className="h-1.5 bg-muted" />
                </div>
              ))
            )}
            
            <div className="pt-8 border-t space-y-4">
              <p className="text-sm text-muted-foreground italic">"Consistency is the key to deep retention. Try one short practice session today."</p>
              <Button 
                variant="outline" 
                className="w-full rounded-xl h-12 border-2" 
                onClick={() => handleStartDash()}
                disabled={isPending}
              >
                {isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Clock className="h-4 w-4 mr-2" />}
                Quick 5m Review
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
