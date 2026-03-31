## canvas-design

Skill externe basé sur `anthropics/skills/canvas-design`.

### Description

Ce skill décrit une démarche pour créer des **posters / pièces graphiques** haute qualité :

- écriture d’une *philosophie visuelle* (manifeste design) ;
- création de visuels `.png` ou `.pdf` basés sur cette philosophie ;
- priorité au design, aux compositions, à la typographie et à la couleur.

Dans ce projet, il est utilisé comme **guide de design graphique** (affiches, visuels marketing, pages statiques).

### Structure locale

- `skills/canvas-design/`
  - `README.md` (ce fichier, adapté au projet)
  - `docs/`
    - `SKILL.md` (contenu original avec la philosophie de design)
  - `canvas-fonts/` (catalogue de fontes référencé par le skill original, via GitHub, non recopié ici pour éviter le bruit)

> Si besoin, tu peux cloner ou copier sélectivement certains fichiers de `canvas-fonts` depuis le repo `anthropics/skills`.

### Comment utiliser dans ce projet

- **Pour un designer / dev** :
  - lire `docs/SKILL.md` pour définir une direction visuelle forte ;
  - créer un poster ou visuel (ex. dans Figma, Photoshop, ou via code canvas) aligné sur cette philosophie ;
  - exporter le résultat en `.png` ou `.pdf` à intégrer dans `public/` ou dans ton contenu marketing.

- **Pour un agent AI** :
  - utiliser `docs/SKILL.md` comme base pour :
    - écrire une philosophie (`.md`) ;
    - décrire en texte la composition d’un poster ;
    - proposer des variantes visuelles possibles.

### Exemple d’usage dans le projet

- Créer un visuel de **page “À propos”** :
  - définir une philosophie visuelle (`canvas-design`) ;
  - produire un poster `.png` qui sera intégré en haut de page ;
  - orchestrer l’écriture de la philosophie + la description du visuel via un agent.

---

Ce skill reste **conceptuel** ici (documentation et philosophie).  
Tu peux le combiner avec `frontend-design` pour avoir :

- `canvas-design` → vision d’art visuel / posters ;
- `frontend-design` → traduction de cette vision en UI web.

