import { NextRequest, NextResponse } from 'next/server';
import { generateTutorReply } from '@/ai/flows/tutor-chat';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = typeof body?.message === 'string' ? body.message.trim() : '';

    if (!message) {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
    }

    const result = await generateTutorReply({
      message,
      subject: typeof body?.subject === 'string' ? body.subject : undefined,
      subtopic: typeof body?.subtopic === 'string' ? body.subtopic : undefined,
      path: typeof body?.path === 'string' ? body.path : undefined,
      history: Array.isArray(body?.history)
        ? body.history
            .filter((m: unknown) => {
              if (!m || typeof m !== 'object') return false;
              const role = (m as { role?: unknown }).role;
              const content = (m as { content?: unknown }).content;
              return (role === 'user' || role === 'assistant') && typeof content === 'string';
            })
            .slice(-8) as Array<{ role: 'user' | 'assistant'; content: string }>
        : undefined,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Tutor API error:', error);
    return NextResponse.json(
      { reply: 'I hit an issue generating a response. Try asking again with the exact question text.' },
      { status: 500 }
    );
  }
}
