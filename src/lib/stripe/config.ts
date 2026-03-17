import Stripe from "stripe";

/**
 * Configuration Stripe côté serveur.
 * Utiliser uniquement dans les API routes ou server components.
 * Les clés sont lues depuis les variables d’environnement.
 *
 * Évolution abonnements : pour Stripe Billing / subscriptions, créer des
 * produits et prix dans le Dashboard, puis utiliser stripe.checkout.sessions.create
 * avec mode: 'subscription' et line_items[].price (price_id). La structure
 * des dépôts (config/deposits.ts) peut être étendue avec subscriptionPriceId.
 */

const secretKey = process.env.STRIPE_SECRET_KEY;

export function getStripeServer(): Stripe | null {
  if (!secretKey || secretKey === "sk_test_..." || secretKey.startsWith("sk_placeholder")) {
    return null;
  }
  return new Stripe(secretKey);
}

/** true si Stripe est configuré (clé secrète valide) */
export function isStripeConfigured(): boolean {
  return getStripeServer() !== null;
}

export function getBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_BASE_URL ?? process.env.VERCEL_URL;
  if (url) {
    return url.startsWith("http") ? url : `https://${url}`;
  }
  return "http://localhost:3000";
}
