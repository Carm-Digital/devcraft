## Exemple de pipeline complet — Landing page client

Contexte :

- Client : Coach sportif indépendant.
- Objectif : Générer des prises de contact et réservations.
- Produit : “Machine à produire des sites” DevCraft appliquée à un cas concret.

### 1. Brief initial (orchestrator-agent)

```md
CLIENT: Coach sportif indépendant
PAGE: Landing “Coaching sportif à domicile”
OBJECTIF: Remplir l’agenda de séances 1:1
TON: pro, énergique, rassurant
DELAI: 7 jours
```

L’orchestrateur :

- valide le brief ;
- ouvre (si besoin) une branche ou worktree dédiée (`agent-frontend`, etc.) ;
- crée un fichier de suivi (ex : `workspace/agents/projects/coach-landing.md`).

### 2. growth-agent — Marketing & copy

Tâches :

- définir la promesse principale ;
- structurer la page en sections marketing ;
- rédiger un premier jet de copy.

Output simplifié :

```md
PAGE: Landing “Coaching sportif à domicile”

HERO
- Headline: “Un coach sportif qui s’adapte à votre rythme”
- Subheadline: “Séances personnalisées à domicile ou en extérieur, sans abonnement ni engagement.”
- CTA principal: “Parler de mes objectifs”

SECTIONS
1. Preuves (avis + chiffres clés)
2. Bénéfices (3 blocs orientés résultats)
3. Comment ça marche (3 étapes)
4. Offre & tarifs
5. FAQ
6. CTA final
```

### 3. design-agent — UX/UI & layout

Tâches :

- transformer la structure marketing en layout détaillé ;
- définir les composants nécessaires et la hiérarchie visuelle.

Output simplifié :

```md
STRUCTURE UX/UI

1. Hero full width
   - Background sombre avec halo coloré
   - Bloc texte centré gauche, visuel à droite (photo coach)

2. Section “Preuves”
   - Bandeau horizontal avec 3 “stats” (clients, séances, avis)

3. Section “Bénéfices”
   - 3 cartes alignées, icône + titre + phrase

4. Section “Comment ça marche”
   - 3 steps en timeline horizontale

5. Section “Offre & tarifs”
   - 2 cartes (séance unique / pack)

6. FAQ accordéon
7. Footer simplifié
```

### 4. creative-agent — Idées créatives

Tâches :

- proposer des effets visuels et éventuels artefacts.

Output simplifié :

```md
IDÉES CRÉATIVES

1. Hero background:
   - gradient animé bleu/vert très doux derrière le bloc texte.

2. Bénéfices:
   - hover léger sur les cartes (translateY + shadow + bordure accent).

3. Artefact optionnel:
   - mini visuel génératif “rythme cardiaque” (p5.js) pour illustrer l’effort,
   - basé sur `skills/algorithmic-art/templates/viewer.html`.
```

### 5. frontend-agent — Implémentation UI

Tâches :

- créer/adapter les composants React/Next (sections, cartes, timeline, FAQ).
- intégrer la copy dans la page.

Output :

- composants dans `src/components/...` ;
- nouvelle page ou variante (ex : `/realisations` ou `/landing/coach`).

### 6. builder-agent — Assemblage & templates

Tâches :

- assembler la page finale ;
- extraire un **template générique** “Landing service local”.

Output possible :

- `LandingServiceTemplate` documenté (sections, composants, slots textes/images) ;
- guide rapide pour réutiliser ce template pour un restaurant, un artisan, etc.

---

## Prompts prêts à l’emploi (Cursor)

### Orchestrator-agent

> “Tu es `orchestrator-agent` pour DevCraft. À partir du brief suivant, découpe le travail en tâches ordonnées pour `growth-agent`, `design-agent`, `creative-agent`, `frontend-agent` et `builder-agent`, en respectant la structure décrite dans `workspace/agents/orchestrator-agent/agent.md`.”

### Growth-agent

> “Tu es `growth-agent` pour DevCraft. À partir de ce brief et en respectant `workspace/agents/growth-agent/agent.md`, produis la structure marketing complète (sections) et la copy d’une landing page.”

### Design-agent

> “Tu es `design-agent` pour DevCraft. En t’appuyant sur la structure marketing fournie par `growth-agent` et sur `skills/frontend-design`, définis le layout détaillé, la hiérarchie visuelle et les composants nécessaires.”

### Creative-agent

> “Tu es `creative-agent` pour DevCraft. À partir du layout de `design-agent` et en t’appuyant sur `algorithmic-art` et `canvas-design`, propose 2–3 idées créatives réalistes (effets, animations, visuels).”

### Frontend-agent

> “Tu es `frontend-agent` pour DevCraft. Implémente dans le projet Next.js les sections décrites par `design-agent`, en réutilisant les composants existants et en respectant les guidelines de `skills/frontend-design`.”

### Builder-agent

> “Tu es `builder-agent` pour DevCraft. Assemble la landing complète à partir des composants existants, puis définis un template générique réutilisable pour d’autres clients.”

