# Agent spec – example-logging-skill

Ce fichier prépare le terrain pour une intégration future avec des agents (IA, workflows, automation).

## Description du skill

- Nom : `example-logging-skill`
- Rôle : fournir un logger minimal, typé, sans dépendances, pour instrumenter du code backend ou des scripts.
- Localisation : `skills/example-logging-skill/`

## API à connaître pour un agent

- Module : `skills/example-logging-skill/src`
- Fonction principale :

  - `createLogger(options?: LoggerOptions) => Logger`

- Types :

  - `LoggerOptions` avec :
    - `scope?: string`
    - `level?: "debug" | "info" | "warn" | "error"`
  - `Logger` avec méthodes :
    - `debug(...args: unknown[])`
    - `info(...args: unknown[])`
    - `warn(...args: unknown[])`
    - `error(...args: unknown[])`

## Idées d’actions pour un agent

- Proposer d’instrumenter des fonctions critiques avec le logger.
- Générer des scripts d’audit ou de monitoring basés sur ce logger.
- Créer des exemples dans `examples/` adaptés à différents contextes (Next API route, script CLI, etc.).

Rien n’est exécuté automatiquement : l’agent doit toujours être explicite sur les fichiers qu’il modifie.

