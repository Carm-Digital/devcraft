## Dashboard refonte landing & pages clés

### Contexte

- Objectif : transformer le site DevCraft en landing principale d’agence claire, moderne et orientée conversion, avec pages secondaires `À propos`, `FAQ`, `Contact`.
- Contraintes : ne pas toucher aux données sensibles (env, Stripe, admin, emails), conserver l’identité visuelle actuelle, réutiliser le code existant et les skills.

---

### Modifications appliquées (par zone)

#### Landing `/` (Home)

- **Section “Pour qui est faite DevCraft ?”**
  - Ajout d’une section après le hero (`id="pour-qui"`) qui explicite les cibles :
    - Indépendants & coachs
    - Artisans & commerces locaux
    - TPE & petites PME
  - Objectif : clarifier l’avatar client et renforcer l’adéquation offre/cible.

- **Section “Nos offres” → “Comment nous pouvons vous aider”**
  - Le titre est devenu “Comment nous pouvons vous aider”, avec un sous‑titre centré sur l’accompagnement plutôt que sur les tarifs.
  - Le bloc de prix affiche désormais :
    - `Accompagnement sur devis, adapté à votre projet` au lieu du montant chiffré.
  - Objectif : passer à une **tarification modulaire par devis** sur la landing tout en conservant la logique d’offres et les données internes.

- **FAQ en bas de page**
  - Question “Combien coûte un site web ?” :
    - Réponse réécrite pour parler de devis personnalisé après échange, sans afficher de montants précis.

#### Page `À propos`

- Structure existante conservée (fondateur, valeurs, stack) car déjà claire et cohérente avec la nouvelle landing.
- Aucun changement fonctionnel, uniquement réutilisation telle quelle comme page secondaire principale de présentation de l’agence.

#### Page `FAQ`

- Contenu déjà structuré en questions/réponses détaillées, sans montants chiffrés.
- La page est maintenue comme **FAQ longue**, la landing n’en présente qu’un extrait.

#### Page `Contact`

- Page conservée telle quelle :
  - hero “Parlons de votre projet”,
  - CTA principal vers le formulaire de qualification,
  - section coordonnées utilisant `content.contactText` (données sensibles intactes).

---

### Vérifications techniques

- Pas de modification de :
  - configuration Stripe (`src/lib/stripe`, `src/config/deposits.ts`),
  - logique d’admin contenu (`/admin`, `readSiteContent`),
  - variables d’environnement.
- Les changements sont limités aux **textes** et à l’**affichage** sur les pages publiques.

---

### Prochaines étapes possibles (pipeline agents)

- `growth-agent` :
  - peaufiner la copy de chaque section de la landing (hero, pour qui, bénéfices, process, preuves, offres, FAQ, CTA).
- `design-agent` :
  - vérifier que la hiérarchie visuelle reste cohérente après ces ajouts et ajuster éventuellement marges/typo.
- `creative-agent` :
  - proposer 1–2 micro‑interactions supplémentaires ciblées (ex. hover sur cartes “Pour qui”, petits mouvements sur halos du hero) en s’appuyant sur `skills/frontend-design`.
- `frontend-agent` :
  - factoriser certaines sections si elles doivent être réutilisées comme templates (ex. “Pour qui”, “Bénéfices”, “Process”).
- `builder-agent` :
  - extraire un template réutilisable de landing d’agence DevCraft à partir de la version actuelle.

