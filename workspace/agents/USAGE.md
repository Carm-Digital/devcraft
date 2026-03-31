## Utilisation du système multi‑agents

Ce fichier résume **comment utiliser les agents** et la structure `workspace/` avec le projet Next.js principal.

---

## Dossiers

- `src/` : code applicatif Next.js (production).
- `skills/` : compétences génériques et externes (design, artefacts, art génératif…).
- `workspace/agents/` : définitions d’agents, pipeline, exemples de projets.

Les agents **ne modifient pas directement** la structure des dossiers, ils produisent :

- du texte (briefs, specs, copy),
- des propositions de code ou de templates,
- des scripts/commandes éventuellement à exécuter manuellement.

---

## Rôles principaux

- `growth-agent` : marketing, copywriting, structure des pages orientée conversion.
- `design-agent` : UX/UI, layout, design system.
- `creative-agent` : effets visuels, art génératif, posters/visuels.
- `frontend-agent` : implémentation UI dans `src/components` et `src/app`.
- `builder-agent` : assemblage de pages complètes + templates réutilisables.
- `orchestrator-agent` : coordination, découpage des tâches, gestion du pipeline.

Chaque agent a un fichier `agent.md` décrivant :

- ROLE, OBJECTIFS, RÈGLES STRICTES, PRIORITÉS,
- INPUT / OUTPUT attendus.

---

## Pipeline type (landing page)

Voir `pipeline-landing-example.md` pour un exemple détaillé.

Résumé de l’ordre :

1. `growth-agent` → structure marketing + copy.
2. `design-agent` → structure UX/UI + composants.
3. `creative-agent` → idées créatives (effets, arts, visuels).
4. `frontend-agent` → implémentation React/Next.
5. `builder-agent` → assemblage final + template réutilisable.
6. `orchestrator-agent` → coordonne et valide.

---

## Prompts rapides (Cursor)

- **Orchestrateur**  
  > “Tu es `orchestrator-agent` pour DevCraft. À partir du brief suivant, découpe le travail en tâches ordonnées pour `growth-agent`, `design-agent`, `creative-agent`, `frontend-agent` et `builder-agent`, en respectant `workspace/agents/orchestrator-agent/agent.md`.”

- **Growth**  
  > “Tu es `growth-agent` pour DevCraft. En respectant `workspace/agents/growth-agent/agent.md`, produis la structure marketing et la copy complète pour cette page.”

- **Design**  
  > “Tu es `design-agent` pour DevCraft. À partir de la structure marketing et en utilisant `skills/frontend-design`, définis le layout détaillé, la hiérarchie visuelle et les composants nécessaires.”

- **Creative**  
  > “Tu es `creative-agent` pour DevCraft. En t’appuyant sur `algorithmic-art` et `canvas-design`, propose 2–3 idées créatives réalistes et implémentables pour cette page.”

- **Frontend**  
  > “Tu es `frontend-agent` pour DevCraft. Implémente les sections décrites par `design-agent` dans le projet Next.js (`src/components`, `src/app`), en respectant les guidelines de `skills/frontend-design`.”

- **Builder**  
  > “Tu es `builder-agent` pour DevCraft. Assemble la page complète à partir des composants existants et définis un template réutilisable documenté.”

---

## Worktrees (optionnel, avancé)

Les branches d’agent recommandées :

- `agent-frontend`, `agent-design`, `agent-creative`, `agent-builder`, `agent-growth`, `agent-orchestrator`.

Les worktrees doivent être créés **en dehors** du dossier principal du repo (voir `orchestrator-agent/agent.md` pour des exemples de commandes).

