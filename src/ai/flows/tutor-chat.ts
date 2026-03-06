'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const TutorMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});

const TutorChatInputSchema = z.object({
  message: z.string().min(1).describe('Latest student message.'),
  subject: z.string().optional().describe('Selected subject if available.'),
  subtopic: z.string().optional().describe('Selected unit/subtopic if available.'),
  path: z.string().optional().describe('Current app path.'),
  history: z.array(TutorMessageSchema).max(8).optional(),
});
export type TutorChatInput = z.infer<typeof TutorChatInputSchema>;

const TutorChatOutputSchema = z.object({
  reply: z.string().describe('Tutor response in clear student-friendly language.'),
});
export type TutorChatOutput = z.infer<typeof TutorChatOutputSchema>;

const tutorPrompt = ai.definePrompt({
  name: 'aiTutorPrompt',
  input: { schema: TutorChatInputSchema },
  output: { schema: TutorChatOutputSchema },
  prompt: `You are SkillDash AI Tutor.

GOAL:
- Help students solve problems and understand concepts clearly.
- Give concise, step-by-step guidance.
- If the student asks for "just the answer," still include reasoning.

STYLE:
- Friendly and direct.
- Keep replies under 180 words unless the user asks for more detail.
- Use bullet points for steps when helpful.
- Use LaTeX ($...$) for math notation.

CONTEXT:
- Subject: {{{subject}}}
- Unit: {{{subtopic}}}
- Path: {{{path}}}

RECENT CHAT:
{{#if history}}
{{#each history}}
- {{role}}: {{content}}
{{/each}}
{{/if}}

STUDENT MESSAGE:
{{{message}}}

RESPONSE RULES:
- If a problem is provided, first identify the concept, then walk through steps.
- If no clear problem is provided, ask one clarifying question and provide a useful mini-explanation anyway.
- Correct misconceptions explicitly.
- Never invent course facts; stay curriculum-aligned.
`,
});

const tutorChatFlow = ai.defineFlow(
  {
    name: 'tutorChatFlow',
    inputSchema: TutorChatInputSchema,
    outputSchema: TutorChatOutputSchema,
  },
  async (input) => {
    const { output } = await tutorPrompt(input);
    return output!;
  }
);

export async function generateTutorReply(input: TutorChatInput): Promise<TutorChatOutput> {
  return tutorChatFlow(input);
}
