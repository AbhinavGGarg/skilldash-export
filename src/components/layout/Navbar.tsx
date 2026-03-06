"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookMarked, LayoutDashboard, Search, Brain } from "lucide-react";

export function Navbar() {
  return (
    <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <div className="bg-primary/10 p-2 rounded-xl">
              <BookMarked className="text-primary h-5 w-5" />
            </div>
            <span className="text-xl font-headline text-foreground tracking-tight">SkillDash</span>
          </Link>
          
          <div className="hidden md:flex space-x-2">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="font-medium text-muted-foreground hover:text-foreground">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Planner
              </Button>
            </Link>
            <Link href="/quiz/setup">
              <Button variant="ghost" size="sm" className="font-medium text-muted-foreground hover:text-foreground">
                <Search className="h-4 w-4 mr-2" />
                Course Library
              </Button>
            </Link>
            <Link href="/learn">
              <Button variant="ghost" size="sm" className="font-medium text-muted-foreground hover:text-foreground">
                <Brain className="h-4 w-4 mr-2" />
                Learn
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Log In</Button>
          </Link>
          <Link href="/register">
            <Button size="sm" className="rounded-xl px-5 font-bold text-xs uppercase tracking-widest shadow-sm">Sign Up</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
