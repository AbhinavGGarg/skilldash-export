#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if ! command -v piper >/dev/null 2>&1; then
  echo "Piper binary not found in PATH."
  echo "Install Piper from: https://github.com/rhasspy/piper"
  echo "Then rerun this script."
  exit 1
fi

echo "Downloading persona voice models..."
bash "$ROOT_DIR/scripts/setup-persona-voices.sh"

echo "Piper setup complete."
