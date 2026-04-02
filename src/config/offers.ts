/**
 * Offres DevCraft : libellés et tarifs affichés sur le formulaire et la page services.
 */

import type { OfferId } from "@/types/payment";

export const OFFER_PRICES: Record<OfferId, { label: string; price: string; isFixed: boolean }> = {
  vitrine: {
    label: "Site vitrine",
    price: "300 €",
    isFixed: true,
  },
  complet: {
    label: "Site complet avec achat intégré",
    price: "900 €",
    isFixed: true,
  },
  abonnement: {
    label: "Site avec abonnement intégré",
    price: "1 300 €",
    isFixed: true,
  },
  personnalise: {
    label: "Site personnalisé",
    price: "sur devis",
    isFixed: false,
  },
};

export const NOTE_FIXED_PRICE =
  "Ce tarif correspond à l’offre de base. Le projet sera validé avec vous avant lancement selon vos besoins.";

export const NOTE_SUR_DEVIS =
  "Chaque projet personnalisé fait l’objet d’une étude sur mesure avant validation du tarif.";
