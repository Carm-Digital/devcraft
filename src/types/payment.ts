/**
 * Types pour le tunnel de paiement DevCraft.
 * Paiement = validation de lancement (acompte), pas achat e-commerce.
 */

export type OfferId = "vitrine" | "complet" | "abonnement" | "personnalise";

export interface DepositConfig {
  id: OfferId;
  label: string;
  description: string;
  /** Montant en centimes (ex. 50000 = 500 €). null = sur devis, pas de paiement en ligne */
  amountCents: number | null;
  /** Intitulé court pour le récap (ex. "Acompte site vitrine") */
  shortLabel: string;
  /** Ce que comprend cette étape (liste affichée sur la page validation) */
  includes: string[];
}

export interface CreateCheckoutSessionParams {
  offerId: OfferId;
  successUrl: string;
  cancelUrl: string;
  clientReferenceId?: string;
  customerEmail?: string;
}
