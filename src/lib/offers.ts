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

type OfferPriceMap = typeof OFFER_PRICES;

export function buildOffers(offerPrices: OfferPriceMap = OFFER_PRICES): Record<OfferId, Offer> {
  return {
    vitrine: {
      id: "vitrine",
      label: offerPrices.vitrine.label,
      price: offerPrices.vitrine.price,
      isFixed: offerPrices.vitrine.isFixed,
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
      label: offerPrices.complet.label,
      price: offerPrices.complet.price,
      isFixed: offerPrices.complet.isFixed,
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
      label: offerPrices.abonnement.label,
      price: offerPrices.abonnement.price,
      isFixed: offerPrices.abonnement.isFixed,
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
      label: offerPrices.personnalise.label,
      price: offerPrices.personnalise.price,
      isFixed: offerPrices.personnalise.isFixed,
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
}

