## frontend-design

Skill externe basé sur `anthropics/skills/frontend-design`.

### Description

Ce skill fournit un **ensemble de principes et de guidelines** pour créer des interfaces frontend :

- design fort, assumé et non générique ;
- attention extrême à la typographie, la couleur, les compositions et les animations ;
- production de code frontend (HTML/CSS/JS, React, etc.) avec une vraie direction artistique.

Il ne contient **pas de code d’exécution** dans ce projet, mais sert de **référence de design** pour guider la création de composants/pages.

### Contenu importé

- `SKILL.md` : description complète du skill et des guidelines.

### Structure locale

- `skills/frontend-design/`
  - `README.md` (ce fichier, adapté au projet)
  - `docs/`
    - `SKILL.md` (contenu original du skill)

### Comment utiliser dans ce projet

- **Pour un humain / designer / dev** :
  - lire `docs/SKILL.md` avant de concevoir une nouvelle page ou un nouveau composant ;
  - choisir une direction esthétique claire (brutaliste, éditorial, organique, etc.) ;
  - appliquer les principes de typographie, couleurs, mise en page et micro-interactions.

- **Pour un agent AI** :
  - utiliser `docs/SKILL.md` comme corpus de règles de design ;
  - s’en servir pour générer :
    - des composants React stylés ;
    - des layouts de pages (landing, dashboard, etc.) ;
    - des variantes graphiques cohérentes avec la direction artistique choisie.

### Exemple d’usage dans le projet

1. Tu veux créer une nouvelle page `landing` :
   - tu lis `skills/frontend-design/docs/SKILL.md` pour choisir une esthétique forte ;
   - tu demandes ensuite à un agent de générer un layout React/Next.js conforme à ces principes ;
   - tu ajustes manuellement pour l’intégrer dans `src/app`.

2. Tu veux améliorer une page existante :
   - tu identifies la direction souhaitée (ex : **editorial/magazine** ou **brutalist/raw**) ;
   - tu reviewes la page en la confrontant aux guidelines du skill ;
   - tu appliques des refontes ciblées (typo, hiérarchie, animations).

---

Ce skill est **purement conceptuel** ici : pas de dépendances, aucun impact runtime, mais une base solide pour pousser la qualité visuelle du frontend.

