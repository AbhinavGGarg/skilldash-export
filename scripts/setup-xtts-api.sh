#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VENV_DIR="$ROOT_DIR/.venv-xtts"
XTTS_REF_DIR="$ROOT_DIR/voices/xtts"
PIPER_DIR="$ROOT_DIR/voices/piper"

if ! command -v python3.11 >/dev/null 2>&1; then
  echo "python3.11 is required for stable Coqui XTTS setup."
  echo "Install with: brew install python@3.11"
  exit 1
fi

if [ ! -d "$VENV_DIR" ]; then
  python3.11 -m venv "$VENV_DIR"
fi

source "$VENV_DIR/bin/activate"
python -m pip install --upgrade pip setuptools wheel
python -m pip install 'coqui-tts[server]' torch torchaudio

mkdir -p "$XTTS_REF_DIR"

PIPER_BIN="${PIPER_BIN:-piper}"
if ! command -v "$PIPER_BIN" >/dev/null 2>&1; then
  if [ -x "$HOME/Library/Python/3.13/bin/piper" ]; then
    PIPER_BIN="$HOME/Library/Python/3.13/bin/piper"
  elif [ -x "$HOME/.local/bin/piper" ]; then
    PIPER_BIN="$HOME/.local/bin/piper"
  fi
fi

make_ref() {
  local out_file="$1"
  local model="$2"
  local text="$3"
  if [ -f "$out_file" ]; then
    return 0
  fi
  if [ ! -f "$model" ]; then
    echo "Skipping $out_file (missing model $model)"
    return 0
  fi
  echo "$text" | "$PIPER_BIN" --model "$model" --output_file "$out_file"
}

# Generate starter reference clips for XTTS cloning.
# Replace these files with your own WAV clips to get stronger persona likeness.
make_ref "$XTTS_REF_DIR/einstein.wav" "$PIPER_DIR/en_US-libritts-high.onnx" "Curiosity is our compass. Let us explore this idea together."
make_ref "$XTTS_REF_DIR/jobs.wav" "$PIPER_DIR/en_US-ryan-high.onnx" "Focus means saying no to one thousand things."
make_ref "$XTTS_REF_DIR/napoleon.wav" "$PIPER_DIR/en_US-john-medium.onnx" "Strategy is the art of decisive timing and concentrated effort."
make_ref "$XTTS_REF_DIR/shakespeare.wav" "$PIPER_DIR/en_GB-northern_english_male-medium.onnx" "The stage is set, now speak with courage and purpose."

echo "XTTS setup complete."
echo "Virtualenv: $VENV_DIR"
echo "Reference clips: $XTTS_REF_DIR"
