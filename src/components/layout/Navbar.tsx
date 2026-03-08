"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Orbit, ClipboardCheck, MailCheck, AlertTriangle } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-85">
          <div className="rounded-xl bg-cyan-100 p-2">
            <Orbit className="h-5 w-5 text-cyan-700" />
          </div>
          <span className="font-headline text-xl tracking-tight text-slate-900">DecisionOS</span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/#workspace">
            <Button variant="ghost" size="sm" className="font-medium text-slate-600 hover:text-slate-900">
              <ClipboardCheck className="mr-2 h-4 w-4" />
              Workspace
            </Button>
          </Link>
          <Link href="/#output">
            <Button variant="ghost" size="sm" className="font-medium text-slate-600 hover:text-slate-900">
              <MailCheck className="mr-2 h-4 w-4" />
              Outputs
            </Button>
          </Link>
          <Link href="/#output">
            <Button variant="ghost" size="sm" className="font-medium text-slate-600 hover:text-slate-900">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Risks
            </Button>
          </Link>
        </div>

        <Link href="/#workspace">
          <Button size="sm" className="rounded-xl bg-slate-950 px-5 text-xs font-bold uppercase tracking-wider text-white hover:bg-slate-800">
            Run Demo
          </Button>
        </Link>
      </div>
    </nav>
  );
}
