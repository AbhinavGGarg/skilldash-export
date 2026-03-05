'use server';
/**
 * @fileOverview High-speed pedagogical feedback generation.
 * Optimized for ultra-low latency (Target < 2s).
 *
 * - generateQuizExplanation - Generates a 3-sentence "Flash Breakdown".
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const QuizExplanationInputSchema = z.object({
  question: z.string().describe('The quiz question text.'),
  correctAnswer: z.string().describe('The correct answer option.'),
  userAnswer: z.string().optional().describe('The answer option provided by the user.'),
  isCorrect: z.boolean().describe('Whether the user answered correctly.'),
  subject: z.string().optional().describe('The subject area of the question.'),
});
export type QuizExplanationInput = z.infer<typeof QuizExplanationInputSchema>;

const QuizExplanationOutputSchema = z.object({
  explanation: z.string().describe('A high-speed pedagogical breakdown.'),
});
export type QuizExplanationOutput = z.infer<typeof QuizExplanationOutputSchema>;

export async function generateQuizExplanation(input: QuizExplanationInput): Promise<QuizExplanationOutput> {
  return quizExplanationGenerationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'quizExplanationPrompt',
  input: {schema: QuizExplanationInputSchema},
  output: {schema: QuizExplanationOutputSchema},
  prompt: `Fast academic tutor. MAX 3 SENTENCES. BE EXTREMELY BRIEF.

CONCEPT: 1 sentence on the principle.
LOGIC: 1 sentence on why "{{{correctAnswer}}}" is right. 
{{#unless isCorrect}}
ERROR: 1 sentence on the mistake.
{{else}}
TIP: 1 quick strategy tip.
{{/unless}}

CONSTRAINTS:
- Use LaTeX ($...$) for ALL math/science notation.
- No conversational filler.
- Professional but lightning-fast.`,
});

const quizExplanationGenerationFlow = ai.defineFlow(
  {
    name: 'quizExplanationGenerationFlow',
    inputSchema: QuizExplanationInputSchema,
    outputSchema: QuizExplanationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
