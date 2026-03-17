# DevCraft — Site web de l'agence

Site vitrine professionnel pour l'agence **DevCraft**, orienté conversion et prise de contact.  
Next.js 16, TypeScript, Tailwind CSS.

## Lancer le projet

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Build production

```bash
npm run build
npm start
```

## Structure

- **`src/app/`** — Pages (Accueil, Services, Méthode, Réalisations, À propos, Contact, FAQ)
- **`src/components/`** — Header, Footer, Button, Section
- **Design** — Slate + amber, responsive, sticky header, formulaire de contact avec validations

## Parcours visiteur

Le site ne permet pas de commander un site en ligne. Tous les CTA mènent vers la **page Contact** ou le formulaire de qualification pour générer des leads et échanger avant tout devis ou lancement.

## Paiement Stripe (acompte)

Le tunnel de validation du projet permet de faire payer un acompte après échange et devis :

1. **Configuration** : copier `.env.local.example` vers `.env.local` et renseigner `STRIPE_SECRET_KEY` et `NEXT_PUBLIC_BASE_URL`.
2. **Offres** : les montants et libellés sont dans `src/config/deposits.ts` (vitrine, complet, abonnement, personnalisé). Mettre `amountCents: null` pour une offre « sur devis » (pas de paiement en ligne).
3. **Pages** : `/validation-projet?offer=vitrine` (ou complet, abonnement, personnalise), `/paiement-confirme`, `/paiement-annule`.
4. **API** : `POST /api/stripe/create-checkout-session` avec `{ offerId }` crée une session Stripe Checkout et renvoie l’URL de redirection.

L’architecture est prête pour ajouter plus tard Stripe Billing / abonnements (voir commentaire dans `src/lib/stripe/config.ts`).

## Évolutions possibles

- Brancher le formulaire de qualification sur une API / email
- Webhook Stripe pour confirmer le paiement côté serveur
- Abonnements récurrents (maintenance, options mensuelles)
- Remplacer les visuels des réalisations par de vrais projets
