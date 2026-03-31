## example-logging-skill

Skill d’exemple très simple pour montrer :

- comment structurer un skill ;
- comment l’importer dans le projet ;
- comment préparer un futur usage par des agents.

---

## Objectif

Fournir un **logger minimal** :

- indépendant du code existant ;
- sans dépendance externe ;
- utilisable côté backend (Node) ou dans des scripts.

---

## Structure

- `skills/example-logging-skill/`
  - `README.md` (ce fichier)
  - `src/`
    - `index.ts` : API principale du skill
    - `logger.ts` : implémentation du logger
  - `examples/`
    - `basic-usage.ts` : exemple d’utilisation
  - `agent/` (placeholder pour futur usage)
    - `spec.md` : description textuelle pour un futur agent

---

## API

Depuis `src/index.ts` :

- **`createLogger(options?: LoggerOptions)`** → `Logger`

  - `LoggerOptions` :
    - `scope?: string` : nom du module/skill/contexte.
    - `level?: "debug" | "info" | "warn" | "error"` (par défaut `"info"`).

  - `Logger` expose :
    - `debug(...args: unknown[])`
    - `info(...args: unknown[])`
    - `warn(...args: unknown[])`
    - `error(...args: unknown[])`

L’implémentation est volontairement simple et synchrone pour rester générique.

---

## Utilisation dans le projet

### 1. Import direct (TypeScript / Node)

```ts
import { createLogger } from "@/skills/example-logging-skill/src";

const logger = createLogger({ scope: "paiement" });

logger.info("Paiement validé", { amount: 100 });
logger.error("Erreur de paiement", new Error("…"));
```

> Remarque : l’alias `@/skills/...` dépend de la configuration de `tsconfig.json`. À défaut, utilisez un chemin relatif.

### 2. Utilisation dans un script

Voir `examples/basic-usage.ts` :

- peut être exécuté avec `ts-node` ou compilé en JS.

---

## Intégration future avec des agents

- Le fichier `agent/spec.md` contient une **description textuelle** du skill et de son API.
- Un futur agent pourra :
  - lire cette spec ;
  - proposer d’instrumenter du code existant avec ce logger ;
  - ou générer des scripts/outils basés sur ce skill.

Rien n’est automatiquement branché aujourd’hui : le skill est **opt-in**.

