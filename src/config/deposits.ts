import type { DepositConfig, OfferId } from "@/types/payment";

/**
 * Configuration des acomptes par type d’offre.
 * Chaque projet étant conçu sur mesure, cette validation intervient après échange et cadrage initial.
 * Montants en centimes. Mettre null pour "sur devis" (pas de paiement en ligne, rediriger vers contact).
 */
export const OFFER_DEPOSITS: Record<OfferId, DepositConfig> = {
  vitrine: {
    id: "vitrine",
    label: "Site vitrine",
    shortLabel: "Acompte site vitrine",
    description: "Acompte de démarrage pour réserver le lancement de votre site vitrine.",
    amountCents: 10000, // 100 € — à ajuster selon votre grille
    includes: [
      "Réservation du créneau de création",
      "Cadrage validé ensemble",
      "Lancement de la phase design et développement",
      "Accompagnement pour la récupération de vos contenus",
    ],
  },
  complet: {
    id: "complet",
    label: "Site complet",
    shortLabel: "Acompte site complet",
    description: "Acompte de démarrage pour réserver le lancement de votre site complet.",
    amountCents: 25000, // 250 € — à ajuster
    includes: [
      "Réservation du créneau de création",
      "Périmètre et fonctionnalités validés",
      "Lancement de la phase design et développement",
      "Suivi et échanges tout au long du projet",
    ],
  },
  abonnement: {
    id: "abonnement",
    label: "Site avec abonnement",
    shortLabel: "Acompte site abonnement",
    description: "Acompte de démarrage pour votre projet avec espace membre ou abonnement.",
    amountCents: 40000, // 400 € — à ajuster
    includes: [
      "Réservation du lancement du projet",
      "Cadrage technique et fonctionnel validé",
      "Démarrage de la conception",
      "Organisation des prochaines étapes avec vous",
    ],
  },
  personnalise: {
    id: "personnalise",
    label: "Site personnalisé",
    shortLabel: "Acompte sur devis",
    description: "Projet sur mesure : l’acompte est défini dans le devis que nous vous avons adressé.",
    amountCents: null, // Sur devis : pas de montant fixe en ligne
    includes: [
      "Validation du lancement après étude personnalisée",
      "Montant et modalités selon le devis convenu",
      "Nous contacter pour recevoir votre lien de paiement dédié",
    ],
  },
};

export const OFFER_IDS: OfferId[] = ["vitrine", "complet", "abonnement", "personnalise"];

export function getDepositConfig(offerId: OfferId): DepositConfig {
  return OFFER_DEPOSITS[offerId];
}

export function formatAmount(cents: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}
