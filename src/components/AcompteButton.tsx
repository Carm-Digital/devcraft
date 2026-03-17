"use client";

import Link from "next/link";
import { ACOMPTE_BUTTON_ENABLED, STRIPE_ACOMPTE_URL } from "@/lib/payment";

/**
 * Bouton "Payer l’acompte" pour la validation du projet.
 * Actif uniquement après intégration Stripe (ACOMPTE_BUTTON_ENABLED + URL).
 * Pour l’instant : affiché en mode "à venir" pour expliquer le processus.
 */
export default function AcompteButton() {
  const enabled = ACOMPTE_BUTTON_ENABLED && STRIPE_ACOMPTE_URL;

  if (enabled) {
    return (
      <Link
        href={STRIPE_ACOMPTE_URL!}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
      >
        Payer l’acompte
      </Link>
    );
  }

  return (
    <div className="inline-flex flex-col items-center gap-1">
      <span
        className="inline-flex cursor-not-allowed items-center justify-center rounded-lg border-2 border-slate-300 bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-500"
        title="Le lien de paiement vous sera envoyé après validation du devis"
      >
        Payer l’acompte
      </span>
      <span className="text-xs text-slate-500">
        Lien envoyé après validation du devis
      </span>
    </div>
  );
}
