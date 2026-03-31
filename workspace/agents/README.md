## Système multi‑agents DevCraft

Ce dossier décrit les **agents spécialisés** qui collaborent pour produire des sites web vendables (landing pages, SaaS, portfolios, etc.).

Agents prévus :

- `frontend-agent`
- `design-agent`
- `creative-agent`
- `builder-agent`
- `growth-agent`
- `orchestrator-agent`

Chaque agent a son propre dossier avec :

- `README.md` : description synthétique, rôle, objectifs.
- `agent.md` : instructions détaillées (ROLE, OBJECTIFS, RÈGLES, INPUT/OUTPUT).

Les agents doivent :

- utiliser les `skills/` en priorité ;
- produire du code et des artefacts réutilisables ;
- respecter un style global **moderne, premium et légèrement futuriste** (comme la home actuelle).

Une orchestration de pipeline est décrite dans `orchestrator-agent/agent.md`.

