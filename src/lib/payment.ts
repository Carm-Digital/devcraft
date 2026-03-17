/**
 * Configuration paiement / acompte Stripe.
 * Pour l’instant : pas de checkout en ligne. Après échange humain, un lien
 * de paiement peut être envoyé au client pour régler l’acompte.
 *
 * Évolution future :
 * - Remplacer STRIPE_ACOMPTE_URL par l’URL réelle du Checkout Session Stripe
 *   (générée côté backend après validation du devis).
 * - Ou utiliser l’API Stripe pour créer une session et rediriger.
 */

/** URL du lien de paiement acompte (envoyé manuellement au client pour l’instant) */
export const STRIPE_ACOMPTE_URL: string | null = null;

/** Indique si le bouton "Payer l’acompte" doit être actif (après intégration Stripe) */
export const ACOMPTE_BUTTON_ENABLED = false;
