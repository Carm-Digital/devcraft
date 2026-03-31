#!/bin/bash

# Copie locale du script d'init provenant de :
# https://github.com/anthropics/skills/tree/main/skills/web-artifacts-builder/scripts/init-artifact.sh
#
# Voir docs/SKILL.md pour les instructions complètes.

set -e

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)

echo "🔍 Detected Node.js version: $NODE_VERSION"

if [ "$NODE_VERSION" -lt 18 ]; then
  echo "❌ Error: Node.js 18 or higher is required"
  echo "   Current version: $(node -v)"
  exit 1
fi

if [ -z "$1" ]; then
  echo "❌ Usage: ./init-artifact.sh <project-name>"
  exit 1
fi

PROJECT_NAME="$1"

echo "🚀 Please refer to the original script for full behavior."
echo "    Source: anthropics/skills/web-artifacts-builder/scripts/init-artifact.sh"
echo "    Project to create: $PROJECT_NAME"

# Ici on pourrait recoller tout le script original si besoin.

