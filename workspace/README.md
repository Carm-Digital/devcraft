## Workspace global

Ce dossier décrit l’architecture de travail multi‑agents autour du projet DevCraft.

- `main-project` : référence au projet Next.js principal (racine actuelle du repo).
- `skills` : réutilise le dossier `skills/` à la racine pour les capacités génériques.
- `agents` : définitions des agents spécialisés et de leur pipeline de collaboration.

L’objectif est de pouvoir brancher des **agents IA + git worktrees** sans casser la structure existante.

