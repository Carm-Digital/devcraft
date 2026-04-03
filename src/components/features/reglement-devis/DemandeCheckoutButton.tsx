"use client";

import { useState } from "react";

type PaymentKind = "acompte" | "solde";

type DemandeCheckoutButtonProps = {
  clientId: string;
  kind: PaymentKind;
  label: string;
  variant?: "primary" | "secondary";
};

export default function DemandeCheckoutButton({
  clientId,
  kind,
  label,
  variant = "primary",
}: DemandeCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/create-checkout-demande", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId, kind }),
      });
      const data = (await res.json().catch(() => null)) as { url?: string; error?: string } | null;
      if (!res.ok) {
        setError(data?.error ?? "Une erreur est survenue.");
        setLoading(false);
        return;
      }
      if (data?.url) {
        window.location.href = data.url;
        return;
      }
      setError("Redirection impossible.");
    } catch {
      setError("Impossible de contacter le serveur. Réessayez ou contactez-nous.");
    }
    setLoading(false);
  }

  const baseClass =
    "inline-flex w-full items-center justify-center rounded-xl font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00D4FF] disabled:opacity-50 min-h-[48px] px-5 py-2.5 text-sm sm:min-w-[220px]";
  const variantClass =
    variant === "primary"
      ? "bg-gradient-to-r from-[#00D4FF] to-[#00D4FF] text-[#0d0f14] shadow-lg shadow-[#0d0f14]/20 hover:shadow-[#0d0f14]/30"
      : "border-2 border-white/80 text-white hover:bg-white hover:text-[#0d0f14]";

  return (
    <div className="flex flex-col items-stretch gap-2 sm:items-start">
      <button
        type="button"
        onClick={() => void handleClick()}
        disabled={loading}
        className={`${baseClass} ${variantClass}`}
      >
        {loading ? "Redirection vers le paiement…" : label}
      </button>
      {error && (
        <p className="text-sm text-red-300" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
