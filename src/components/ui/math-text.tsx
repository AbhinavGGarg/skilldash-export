
"use client";

import React from 'react';
import katex from 'katex';
import { cn } from '@/lib/utils';

interface MathTextProps {
  text: string;
  className?: string;
  displayMode?: boolean;
}

/**
 * A component that parses string text and renders any LaTeX content found inside $...$ using KaTeX.
 * Uses a span to prevent hydration errors when nested inside paragraphs.
 */
export function MathText({ text, className, displayMode = false }: MathTextProps) {
  if (!text) return null;

  // Split text by $ signs to find LaTeX parts
  const parts = text.split(/(\$[^\$]+\$)/g);

  // CRITICAL: Use <span> instead of <div> to avoid hydration errors inside <p> tags.
  return (
    <span className={cn(className, displayMode ? "block w-full overflow-x-auto my-2" : "inline")}>
      {parts.map((part, index) => {
        if (part.startsWith('$') && part.endsWith('$')) {
          const content = part.slice(1, -1);
          try {
            const html = katex.renderToString(content, {
              throwOnError: false,
              displayMode: displayMode,
            });
            return (
              <span
                key={`math-${index}`}
                dangerouslySetInnerHTML={{ __html: html }}
                className="inline-block px-0.5 align-middle"
              />
            );
          } catch (e) {
            return <span key={`err-${index}`}>{part}</span>;
          }
        }
        return <span key={`text-${index}`} className="whitespace-pre-wrap">{part}</span>;
      })}
    </span>
  );
}
