## Système de skills

Ce dossier contient des **skills génériques** (frontend, backend, scripts, agents, templates, outils, etc.) réutilisables dans le projet.

Chaque skill est **isolé**, **documenté** et **optionnel** : rien n’est chargé automatiquement dans l’application principale.

---

## Skills installés

Actuellement, les skills suivants sont disponibles :

- `example-logging-skill` : logger minimal réutilisable (backend/scripts).
- `frontend-design` : lignes directrices pour concevoir des interfaces frontend distinctives.
- `algorithmic-art` : création d’art génératif avec p5.js et artefacts HTML interactifs.
- `canvas-design` : philosophies et méthodes pour créer des posters / pièces graphiques haut de gamme.
- `web-artifacts-builder` : toolkit pour générer des artefacts web React/Tailwind/shadcn/ui autonomes.

Pour chaque skill, voir son `README.md` dans le sous-dossier correspondant.

---

## Structure d’un skill

Un skill se trouve dans un sous-dossier :

- `skills/<nom-du-skill>/`
  - `README.md` (obligatoire) : description, objectifs, API, dépendances éventuelles.
  - `src/` ou `lib/` (obligatoire) : code du skill (TS/JS, scripts, etc.).
  - `examples/` (recommandé) : exemples d’utilisation (snippets, pages, scripts).
  - `config/` (optionnel) : configuration spécifique (JSON, YAML, TS…).
  - `agent/` (optionnel) : workflows, définitions d’agents, automation (ex. worktrees, tâches CI).

Règles :

- **Un seul concept par skill** (cohérent et limité).
- Le skill doit pouvoir être **copié-collé** dans un autre projet avec un minimum d’adaptation.
- Pas de dépendance implicite à l’app principale : si le skill en a besoin, il doit l’indiquer clairement dans son `README.md`.

---

## Conventions de nommage

- **Dossier de skill** : `kebab-case` — ex. `form-validation`, `stripe-billing`, `email-templates`.
- **Code** :
  - TypeScript recommandé (`.ts`, `.tsx`).
  - Entrée principale du skill dans `src/index.ts` ou `lib/index.ts`.
- **Config** :
  - Fichiers simples (`.json`, `.yaml`, `.ts`) avec schéma expliqué dans le `README.md` du skill.

---

## Ajouter un nouveau skill

1. **Créer le dossier** :

   - `skills/<nom-du-skill>/`

2. **Ajouter le squelette minimal** :

   - `skills/<nom-du-skill>/README.md`
   - `skills/<nom-du-skill>/src/index.ts` (ou `lib/index.ts`)

3. **Documenter le skill** dans `README.md` :

   - **Description** : à quoi il sert ?
   - **API** : fonctions / composants exposés, signatures principales.
   - **Dépendances** éventuelles à ajouter dans `package.json`.
   - **Exemples d’utilisation** (lien vers `examples/` si besoin).

4. **(Optionnel) Ajouter des exemples** :

   - `skills/<nom-du-skill>/examples/` avec :
     - Snippets TypeScript/JS.
     - Instructions pour l’intégrer dans une page Next.js ou un script Node.

5. **(Optionnel) Ajouter de la config** :

   - `skills/<nom-du-skill>/config/` pour les options et presets.

6. **(Optionnel) Ajouter un agent / workflow** :

   - `skills/<nom-du-skill>/agent/` pour automatiser :
     - Génération de fichiers.
     - Intégration avec des agents IA.
     - Utilisation de git worktrees, scripts, CI, etc.

---

## Utiliser un skill dans le projet

### 1. Import direct dans le code existant

Si le skill est écrit en TypeScript/JavaScript, il peut être importé directement :

```ts
// Exemple depuis le code applicatif (avec alias configuré)
import { createSomething } from "@/skills/mon-skill/src";

const result = createSomething({ /* options */ });
```

ou, si tu récupères le skill depuis GitHub dans un sous-dossier sans alias spécifique :

```ts
// Exemple avec chemin relatif depuis le code applicatif
import { createSomething } from "../../skills/mon-skill/src";
```

Les deux approches sont possibles ; choisis celle qui s’intègre le mieux à ta structure actuelle.

### 2. Utilisation par script Node

Pour les skills orientés scripts/outils :

```ts
// scripts/usage-mon-skill.ts
import { runWorkflow } from "../skills/mon-skill/src";

async function main() {
  await runWorkflow();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

### 3. Suivre les exemples fournis

Chaque skill peut fournir ses propres exemples dans `examples/`.  
Consultez toujours `skills/<nom-du-skill>/README.md` en premier lieu.

Pour des skills récupérés depuis GitHub :

- place le dossier du skill sous `skills/` (par ex. via `git subtree`, `git submodule` ou simple copie) ;
- conserve sa structure interne ;
- adapte uniquement les chemins d’import dans tes fichiers applicatifs ou scripts.

---

## Exemples rapides par skill externe

- **`frontend-design`** :
  - lire `skills/frontend-design/docs/SKILL.md` avant de concevoir une nouvelle page ;
  - demander à un agent de générer un layout React/Next adapté aux règles de design de ce skill.

- **`algorithmic-art`** :
  - partir de `skills/algorithmic-art/templates/viewer.html` ;
  - y intégrer un nouveau sketch p5.js basé sur une philosophie définie dans un `.md` ;
  - exposer le fichier HTML généré via un lien dans une page ou dans `public/`.

- **`canvas-design`** :
  - définir une philosophie visuelle dans un `.md` (cf. `docs/SKILL.md`) ;
  - produire un poster `.png`/`.pdf` à intégrer dans tes pages ou assets marketing.

- **`web-artifacts-builder`** :
  - utiliser les scripts dans `skills/web-artifacts-builder/scripts/` (dans un environnement bash) pour créer un mini‑frontend React autonome ;
  - bundler ce frontend en un `bundle.html` réutilisable.

---

## Conventions de développement

- **Pas d’effet de bord** : un skill ne doit pas modifier l’état global de l’application sans que ce soit explicitement documenté.
- **Interfaces claires** : exportez des fonctions/composants bien typés depuis `src/index.ts`.
- **Zéro impact par défaut** : aucun skill n’est importé automatiquement par l’app (pas de bootstrap global).
- **Dépendances minimales** :
  - Évitez d’ajouter des dépendances lourdes.
  - Si nécessaire, documentez-les dans le `README.md` du skill.

---

## Préparation pour agents & git worktrees (bonus)

Cette architecture est pensée pour être compatible avec :

- **Agents** :
  - Chaque skill peut exposer dans `agent/` :
    - Des définitions de tâches (JSON/TS).
    - Des workflows (ex. orchestrations, prompts, specs).
  - Les agents peuvent alors consommer ces définitions sans toucher au code métier de l’app.

- **Git worktrees** :
  - Les skills étant isolés, il est facile de créer une worktree dédiée à un skill :
    - développement d’un skill dans une branche/worktree séparée ;
    - tests et intégration progressive sans impacter `main`.
  - Rien dans `skills/` n’est couplé aux routes Next.js, ce qui simplifie les expérimentations.

---

## Checklist pour un nouveau skill

- [ ] Dossier `skills/<nom-du-skill>/` créé.
- [ ] `README.md` avec description claire et API.
- [ ] `src/index.ts` (ou `lib/index.ts`) avec exports propres.
- [ ] (Optionnel) `examples/` contenant au moins un cas d’usage.
- [ ] (Optionnel) `config/` si besoin de configuration.
- [ ] (Optionnel) `agent/` si automatisation/agents prévus.

