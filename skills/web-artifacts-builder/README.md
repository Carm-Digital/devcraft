## web-artifacts-builder

Skill externe basé sur `anthropics/skills/web-artifacts-builder`.

### Description

Ce skill fournit une **boîte à outils** pour construire des artefacts web complexes :

- génération d’un projet React + TypeScript + Vite ;
- intégration Tailwind CSS + shadcn/ui ;
- bundling dans un seul fichier HTML auto‑contenu pour être intégré dans une conversation ou un outil.

Dans ce projet, on ne recopie que :

- la spec (`SKILL.md`) ;
- les scripts shell d’initialisation et de bundling.

### Structure locale

- `skills/web-artifacts-builder/`
  - `README.md` (ce fichier)
  - `docs/`
    - `SKILL.md` (contenu original)
  - `scripts/`
    - `init-artifact.sh`
    - `bundle-artifact.sh`

> Le fichier `shadcn-components.tar.gz` n’est **pas** recopié ici pour garder le repo léger. Il peut être récupéré ultérieurement depuis la source si besoin.

### Comment utiliser dans ce projet

Sur ta machine (ou dans un environnement compatible bash) :

1. Créer un artefact React :
   ```bash
   cd skills/web-artifacts-builder
   bash scripts/init-artifact.sh my-artifact
   cd my-artifact
   ```

2. Développer l’artefact :
   - éditer les composants React/Tailwind/shadcn dans le dossier généré ;
   - tester localement avec Vite (`npm run dev` dans le projet généré).

3. Bundler en un seul fichier HTML :
   ```bash
   bash ../scripts/bundle-artifact.sh
   ```

   Cela produit un `bundle.html` auto‑contenu que tu peux ensuite déplacer dans `public/` ou utiliser dans un autre contexte.

### Pour un agent AI

- Lire `docs/SKILL.md` pour comprendre les conventions et le pipeline ;
- Générer les commandes à exécuter (`init-artifact.sh`, `bundle-artifact.sh`) ;
- Proposer la structure de l’artefact (routes, composants, layout, etc.) en respectant les guidelines de design.

### Exemple d’usage dans le projet

- Tu veux un **dashboard interactif** ou un **outil interne** :
  - via ce skill, un agent peut générer un mini‑frontend React autonome ;
  - puis produire un `bundle.html` que tu peux visualiser ou intégrer ailleurs.

---

Ce skill agit comme un **toolkit de génération d’artefacts web** avancés, sans impacter le code Next.js existant.

