#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VOICE_DIR="$ROOT_DIR/voices/piper"
MODEL_URL_BASE="https://huggingface.co/rhasspy/piper-voices/resolve/main"

mkdir -p "$VOICE_DIR"

# model_path | repo_subdir
MODELS=(
  "en_US-libritts-high.onnx|en/en_US/libritts/high"
  "en_US-ryan-high.onnx|en/en_US/ryan/high"
  "en_US-john-medium.onnx|en/en_US/john/medium"
  "en_GB-northern_english_male-medium.onnx|en/en_GB/northern_english_male/medium"
)

download_model() {
  local model_name="$1"
  local model_dir="$2"

  if [ ! -f "$VOICE_DIR/$model_name" ]; then
    echo "Downloading $model_name ..."
    curl -L "$MODEL_URL_BASE/$model_dir/$model_name" -o "$VOICE_DIR/$model_name"
  fi

  if [ ! -f "$VOICE_DIR/$model_name.json" ]; then
    echo "Downloading $model_name.json ..."
    curl -L "$MODEL_URL_BASE/$model_dir/$model_name.json" -o "$VOICE_DIR/$model_name.json"
  fi
}

for entry in "${MODELS[@]}"; do
  model_name="${entry%%|*}"
  model_dir="${entry##*|}"
  download_model "$model_name" "$model_dir"
done

echo "Persona voice model setup complete."
ls -lh "$VOICE_DIR"
