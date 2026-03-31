## algorithmic-art

Skill externe basé sur `anthropics/skills/algorithmic-art`.

### Description

Ce skill décrit comment créer de **l’art algorithmique** avec p5.js :

- définition d’une *philosophie algorithmique* (manifeste artistique) ;
- génération d’art génératif avec p5.js, seedée et paramétrable ;
- création d’artifacts HTML interactifs pour explorer les paramètres.

Dans ce projet, on importe uniquement :

- le manifeste/description (`SKILL.md`) ;
- les templates p5.js essentiels.

### Structure locale

- `skills/algorithmic-art/`
  - `README.md` (ce fichier, adapté au projet)
  - `docs/`
    - `SKILL.md` (contenu original, instructions complètes)
  - `templates/`
    - `viewer.html` (template d’interface p5.js)
    - `generator_template.js` (structure de code p5.js)

### Comment utiliser dans ce projet

- **Pour un humain / dev créatif** :
  - lire `docs/SKILL.md` pour comprendre la démarche (philosophie → code) ;
  - partir de `templates/viewer.html` + `templates/generator_template.js` pour créer un artefact HTML autonome (génératif) ;
  - adapter le sketch p5.js selon la philosophie choisie.

- **Pour un agent AI** :
  - lire `docs/SKILL.md` pour connaître le workflow complet ;
  - générer automatiquement :
    - une philosophie (`.md`) ;
    - un fichier HTML autonome basé sur `templates/viewer.html` intégrant un nouveau sketch p5.js.

### Exemple d’usage dans le projet

- Créer une page Next.js qui expose un lien vers un artefact génératif :
  - générer un fichier `public/algorithmic-art.html` basé sur `templates/viewer.html` et un nouveau sketch p5.js ;
  - exposer un lien "Voir la galerie générative" dans une page.

- Créer un script Node qui écrit :
  - une philosophie `algorithmic-art/*.md` ;
  - un HTML artefact p5.js dans un dossier cible.

---

Ce skill est **optionnel** : il n’est pas chargé par l’app Next.js, mais peut être utilisé pour produire des artefacts créatifs autour de ton projet.

