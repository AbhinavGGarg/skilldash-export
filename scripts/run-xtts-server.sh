#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VENV_DIR="$ROOT_DIR/.venv-xtts"
PORT="${XTTS_PORT:-8020}"

if [ ! -d "$VENV_DIR" ]; then
  echo "Missing $VENV_DIR"
  echo "Run: bash scripts/setup-xtts-api.sh"
  exit 1
fi

source "$VENV_DIR/bin/activate"

exec tts-server \
  --model_name tts_models/multilingual/multi-dataset/xtts_v2 \
  --port "$PORT" \
  --device cpu \
  --language_idx en
