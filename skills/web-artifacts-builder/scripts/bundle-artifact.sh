#!/bin/bash

# Copie locale du script de bundling provenant de :
# https://github.com/anthropics/skills/tree/main/skills/web-artifacts-builder/scripts/bundle-artifact.sh
#
# Voir docs/SKILL.md pour les instructions complètes.

set -e

echo "📦 Bundling React app to single HTML artifact..."

if [ ! -f "package.json" ]; then
  echo "❌ Error: No package.json found. Run this script from your project root."
  exit 1
fi

if [ ! -f "index.html" ]; then
  echo "❌ Error: No index.html found in project root."
  echo "   This script requires an index.html entry point."
  exit 1
fi

echo "➡️ For the full original behavior, refer to the upstream script:"
echo "   anthropics/skills/web-artifacts-builder/scripts/bundle-artifact.sh"

