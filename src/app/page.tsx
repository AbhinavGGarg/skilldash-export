import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calculator, FlaskConical, BookOpen, Globe, Cpu, 
  ArrowRight, Book, Target, TrendingUp, GraduationCap 
} from "lucide-react";

export default function Home() {
  const categories = [
    { name: "Mathematics", icon: <Calculator className="h-5 w-5" />, color: "bg-sage-50 text-primary", subjects: ["Algebra", "Geometry", "Calculus"] },
    { name: "Science", icon: <FlaskConical className="h-5 w-5" />, color: "bg-blue-50 text-accent", subjects: ["Chemistry", "Physics", "Env Science"] },
    { name: "Humanities", icon: <Globe className="h-5 w-5" />, color: "bg-orange-50 text-orange-600", subjects: ["History", "Civics", "Economics"] },
    { name: "Technology", icon: <Cpu className="h-5 w-5" />, color: "bg-purple-50 text-purple-600", subjects: ["Computer Science"] },
  ];

  return (
    <div className="flex flex-col w-full worksheet-bg min-h-screen">
      {/* Focused Hero Section */}
      <section className="py-20 px-6 max-w-5xl mx-auto text-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border text-muted-foreground text-sm font-medium shadow-sm">
            <GraduationCap className="h-4 w-4" />
            Your Private Study Room
          </div>
          <h1 className="text-5xl md:text-7xl font-headline text-foreground leading-tight">
            Practice with <span className="text-primary italic">purpose</span>.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A focused workspace for mastering high school subjects. Short, rigorous practice sessions designed for student clarity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link href="/quiz/setup">
              <Button size="lg" className="px-8 h-14 rounded-xl text-lg shadow-sm">
                Open a Topic <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="px-8 h-14 rounded-xl text-lg bg-white/50 backdrop-blur-sm">
                Create Study Profile
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Simplified Topics Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px flex-1 bg-border" />
          <h2 className="text-2xl font-headline text-muted-foreground uppercase tracking-widest text-sm">Course Library</h2>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link href={`/quiz/setup?subject=${cat.subjects[0]}`} key={cat.name}>
              <Card className="hover:border-primary/40 transition-all cursor-pointer shadow-sm rounded-2xl group border-2">
                <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                  <div className="p-4 rounded-xl bg-muted/50 group-hover:bg-primary/10 transition-colors">
                    {cat.icon}
                  </div>
                  <h3 className="text-xl font-headline">{cat.name}</h3>
                  <div className="flex flex-wrap justify-center gap-2 opacity-70">
                    {cat.subjects.map(s => (
                      <span key={s} className="text-xs font-medium px-2 py-0.5 bg-muted rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Minimal Feature Highlights */}
      <section className="py-20 px-6 border-t bg-white/40">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="space-y-3">
            <Book className="h-6 w-6 text-primary" />
            <h4 className="text-lg font-headline">Focused Study</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">No distractions. Just clean, rigorous questions curated for your curriculum.</p>
          </div>
          <div className="space-y-3">
            <Target className="h-6 w-6 text-accent" />
            <h4 className="text-lg font-headline">Tutor Insights</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">Receive clear, step-by-step explanations for every missed concept.</p>
          </div>
          <div className="space-y-3">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h4 className="text-lg font-headline">Growth Tracking</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">Visualize your mastery across subjects with subtle, clean analytics.</p>
          </div>
        </div>
      </section>
    </div>
  );
}