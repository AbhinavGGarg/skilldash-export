#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if ! command -v piper >/dev/null 2>&1; then
  echo "Piper binary not found. Attempting Python install (piper-tts)..."

  if command -v pipx >/dev/null 2>&1; then
    pipx install piper-tts || pipx upgrade piper-tts || true
  fi

  if ! command -v piper >/dev/null 2>&1; then
    python3 -m pip install --user --upgrade piper-tts
  fi

  export PATH="$HOME/.local/bin:$HOME/Library/Python/3.9/bin:$HOME/Library/Python/3.10/bin:$HOME/Library/Python/3.11/bin:$HOME/Library/Python/3.12/bin:$HOME/Library/Python/3.13/bin:$PATH"

  if ! command -v piper >/dev/null 2>&1; then
    echo "Failed to find 'piper' after install."
    echo "Install manually from https://github.com/rhasspy/piper and set PIPER_BIN in .env.local"
    exit 1
  fi
fi

echo "Downloading persona voice models..."
bash "$ROOT_DIR/scripts/setup-persona-voices.sh"

echo "Piper setup complete."
