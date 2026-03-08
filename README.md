# PERSONA

Voice-first history learning app for hackathon demos.

PERSONA lets students talk with historical figures in real time, hear spoken replies, and explore major events through conversational context grounded in preloaded Britannica-style facts.

## What It Is

- Fast, local-first web app built with Next.js + TypeScript.
- History-focused persona conversations with distinct speaking styles.
- Designed for live demos: responsive UI, streaming-like interaction flow, and graceful fallbacks when local services are down.

Current homepage personas:

- Martin Luther King Jr.
- Rosa Parks
- Malcolm X
- Frederick Douglass
- Harriet Tubman
- W. E. B. Du Bois
- Thurgood Marshall
- Katherine Johnson

Note: older personas still exist in code for experimentation but are hidden from the main UI.

## Core Stack

- Next.js (App Router), React, TypeScript
- TailwindCSS, Framer Motion
- Node route handlers (`/api/chat`, `/api/tts`, `/api/stt`)
- Ollama (local LLM)
- Piper (local neural TTS, default)
- Browser Web Speech API (primary STT)
- Optional whisper.cpp endpoint (STT fallback)
- Optional XTTS local mode
- Optional ElevenLabs hosted TTS override

## 10-Minute Local Setup

1. Install dependencies:

```bash
npm install
cp .env.example .env.local
```

2. Start Ollama and pull a model:

```bash
ollama serve
ollama pull llama3.2:3b
# optional stronger model:
# ollama pull llama3.1:8b
```

3. Install Piper voices:

macOS:

```bash
bash scripts/setup-piper-macos.sh
```

Linux:

```bash
bash scripts/setup-piper-linux.sh
```

4. Start the app:

```bash
npm run dev
```

Open [http://localhost:9010](http://localhost:9010).

## Voice Pipeline (Provider Order)

`/api/tts` tries providers in this order:

1. ElevenLabs (only if `ELEVENLABS_API_KEY` is set)
2. XTTS (if enabled via env/flag)
3. Piper local neural TTS (default local path)
4. Browser `SpeechSynthesis` fallback in client

This means the app still speaks even if premium or local servers fail.

## STT Pipeline

- Primary: browser Web Speech API (fast partial + final transcript)
- Fallback: `/api/stt` wired to local `whisper.cpp` server

## Key Environment Variables

- `OLLAMA_BASE_URL` (default `http://localhost:11434`)
- `OLLAMA_MODEL` (default `llama3.2:3b`)
- `OLLAMA_MAX_TOKENS` (default `120`, increase for longer replies)
- `OLLAMA_TIMEOUT_MS` (default `18000`)
- `PIPER_BIN`, `PIPER_VOICES_DIR`, `PIPER_DEFAULT_VOICE_MODEL`
- `WHISPER_CPP_BASE_URL`
- `TTS_HIGH_QUALITY_MODE`, `XTTS_AUTO_MODE`, `XTTS_BASE_URL`
- `ELEVENLABS_API_KEY` (optional)

## API Smoke Tests

Chat:

```bash
curl -X POST http://localhost:9010/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "personaId":"mlk",
    "message":"Why did the March on Washington matter?",
    "history":[]
  }'
```

TTS:

```bash
curl -X POST http://localhost:9010/api/tts \
  -H "Content-Type: application/json" \
  -d '{"personaId":"douglass","text":"Literacy and freedom are deeply connected in abolition history."}' \
  --output persona-test.wav
```

## Troubleshooting

Port in use errors:

```bash
lsof -i :9010
kill -9 <PID>
```

Ollama already running (`11434 in use`) is normal: do not start a second instance.

If Piper is not found after setup, set `PIPER_BIN` in `.env.local` to the full binary path.

## Product Framing

PERSONA is built to make history more engaging for students through conversation, voice, and narrative context. It prioritizes:

- Distinct persona realism
- Fast demo reliability
- Educational clarity over generic chatbot responses
