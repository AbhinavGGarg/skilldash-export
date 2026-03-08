# PERSONA

Voice-first AI conversations with simulated personas:
- Albert Einstein
- Steve Jobs
- Napoleon
- William Shakespeare

Built for fast local hackathon demos with free/open-source tooling only.

## Tech Stack

- Next.js (App Router) + React + TypeScript
- TailwindCSS + Framer Motion
- Node route handlers
- Ollama for local LLM
- Piper for local neural TTS (primary)
- ElevenLabs hosted TTS (optional, highest quality)
- Browser Speech APIs (STT + fallback TTS)
- Optional whisper.cpp local STT fallback
- Optional Coqui XTTS local high-quality TTS mode

## Quickstart (Under 10 Minutes)

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:9010](http://localhost:9010).

## Local LLM Setup (Ollama)

```bash
ollama serve
ollama pull llama3.1:8b
# If low resources:
# ollama pull llama3.2:3b
```

Environment variables:
- `OLLAMA_BASE_URL` (default: `http://localhost:11434`)
- `OLLAMA_MODEL` (default: `llama3.2:3b`)

## Local Voice Setup (Piper, Primary TTS)

### macOS

```bash
bash scripts/setup-piper-macos.sh
```

### Linux

```bash
bash scripts/setup-piper-linux.sh
```

Both scripts install/download into `./voices/piper`.
They now pull distinct persona voice models (Einstein, Jobs, Napoleon, Shakespeare) so voices are not identical.

If you already installed Piper elsewhere, set:
- `PIPER_BIN`
- `PIPER_VOICES_DIR`
- `PIPER_DEFAULT_VOICE_MODEL`

## Optional: ElevenLabs TTS (fastest realistic voices)

Add these to `.env.local`:

```bash
ELEVENLABS_API_KEY=...
ELEVENLABS_MODEL=eleven_turbo_v2_5
ELEVENLABS_OUTPUT_FORMAT=mp3_44100_128
```

Optional persona voice IDs:

```bash
ELEVENLABS_VOICE_EINSTEIN=pNInz6obpgDQGcFmaJgB
ELEVENLABS_VOICE_JOBS=TxGEqnHWrfWFTfGW9XjX
ELEVENLABS_VOICE_NAPOLEON=VR6AewLTigWG4xSOukaG
ELEVENLABS_VOICE_SHAKESPEARE=ErXwobaYiN019PkySvjV
```

When `ELEVENLABS_API_KEY` is set, `/api/tts` tries ElevenLabs first, then falls back to XTTS/Piper/browser.

### Optional High-Quality TTS (XTTS)

Install and run the free local XTTS API:

```bash
bash scripts/setup-xtts-api.sh
bash scripts/run-xtts-server.sh
```

Then set:

```bash
TTS_HIGH_QUALITY_MODE=xtts
XTTS_AUTO_MODE=1
XTTS_BASE_URL=http://127.0.0.1:8020
```

If XTTS fails, API automatically falls back to Piper.
For low latency, keep `XTTS_AUTO_MODE=0` and only request XTTS explicitly.

## STT Modes

- Primary: browser Web Speech API (fast partial + final transcript)
- Fallback: local `/api/stt` -> whisper.cpp server (`WHISPER_CPP_BASE_URL`)

## API Smoke Tests

### Chat

```bash
curl -X POST http://localhost:9010/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "personaId":"einstein",
    "message":"Explain relativity simply",
    "history":[]
  }'
```

### TTS

```bash
curl -X POST http://localhost:9010/api/tts \
  -H "Content-Type: application/json" \
  -d '{"personaId":"jobs","text":"Focus is saying no to a thousand things."}' \
  --output persona-test.wav
```

## Deployment Notes

- Deployable as a standard Next.js app.
- Works even when Ollama/Piper are down:
  - Chat falls back to rule-based persona replies.
  - Voice falls back to browser SpeechSynthesis.

## Ethics

All personas are clearly labeled as:

"Simulated persona inspired by historical/public style. Not the real person."

The app avoids harmful/disallowed advice and does not claim real identity.
