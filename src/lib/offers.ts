import type { TypeSite } from "@/types/qualification";
import { OFFER_PRICES } from "@/config/offers";

export type OfferId = Exclude<TypeSite, "">;

type Offer = {
  id: OfferId;
  label: string;
  price: string;
  isFixed: boolean;
  tagline: string;
  description: string;
  features: string[];
  badge?: {
    text: string;
  };
  featured?: boolean;
};

export const OFFERS: Record<OfferId, Offer> = {
  vitrine: {
    id: "vitrine",
    label: OFFER_PRICES.vitrine.label,
    price: OFFER_PRICES.vitrine.price,
    isFixed: OFFER_PRICES.vitrine.isFixed,
    tagline: "Votre présence en ligne, en quelques jours",
    description:
      "Idéal pour une entreprise, un commerce, un artisan ou un indépendant qui souhaite une vitrine claire et professionnelle.",
    features: [
      "Présence en ligne en moins de 7 jours",
      "Design adapté à votre secteur",
      "Formulaire de contact intégré",
      "Optimisé pour Google (SEO de base)",
      "Hébergement et nom de domaine conseillés",
    ],
  },
  complet: {
    id: "complet",
    label: OFFER_PRICES.complet.label,
    price: OFFER_PRICES.complet.price,
    isFixed: OFFER_PRICES.complet.isFixed,
    tagline: "Plus de pages, plus de conversions",
    description:
      "Pour les besoins plus poussés : contenu structuré, fonctionnalités avancées et expérience utilisateur optimisée.",
    featured: true,
    badge: { text: "Plus choisie" },
    features: [
      "Structure complète orientée conversion",
      "Pages clés + parcours de prise de contact",
      "Design sur mesure et optimisation mobile",
      "SEO basique + recommandations d'amélioration",
      "Préparation aux futures évolutions (ajouts simples)",
    ],
  },
  abonnement: {
    id: "abonnement",
    label: OFFER_PRICES.abonnement.label,
    price: OFFER_PRICES.abonnement.price,
    isFixed: OFFER_PRICES.abonnement.isFixed,
    tagline: "Un site qui reste performant dans le temps",
    description:
      "Pour une évolution continue : contenus, suivi et maintenance inclus, avec une logique d’accès récurrent.",
    features: [
      "Espace client / pages réservées aux abonnés",
      "Gestion et suivi des demandes en continu",
      "Maintenance incluse pendant l'abonnement",
      "Optimisations légères régulières (SEO & UX)",
      "Paiement et suivi simplifiés pour vos clients",
    ],
  },
  personnalise: {
    id: "personnalise",
    label: OFFER_PRICES.personnalise.label,
    price: OFFER_PRICES.personnalise.price,
    isFixed: OFFER_PRICES.personnalise.isFixed,
    tagline: "Un projet 100 % sur mesure",
    description:
      "Pour les demandes spécifiques qui sortent des cadres classiques : étude du besoin et accompagnement renforcé.",
    features: [
      "Design et fonctionnalités à la carte",
      "Étude détaillée du besoin avant devis",
      "Plan de réalisation sur mesure",
      "Accompagnement renforcé jusqu'au lancement",
      "Optimisations orientées objectifs (conversion, SEO, contenu)",
    ],
  },
};

