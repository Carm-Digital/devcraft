"use client";

import { useState } from "react";
import type { OfferId } from "@/types/payment";

interface ValidateLaunchButtonProps {
  offerId: OfferId;
  label?: string;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function ValidateLaunchButton({
  offerId,
  label = "Valider le lancement",
  variant = "primary",
  className = "",
}: ValidateLaunchButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ offerId }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Une erreur est survenue.");
        setLoading(false);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setError("Redirection impossible.");
    } catch {
      setError("Impossible de contacter le serveur. Réessayez ou contactez-nous.");
    }
    setLoading(false);
  };

  const baseClass =
    "inline-flex items-center justify-center rounded-lg font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00D4FF] disabled:opacity-50 min-w-[200px] px-5 py-2.5 text-sm";
  const variantClass =
    variant === "primary"
      ? "bg-slate-900 text-white hover:bg-slate-800"
      : "bg-[#00a8cc] text-white hover:bg-[#0099c9]";

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={`${baseClass} ${variantClass} ${className}`}
      >
        {loading ? "Redirection vers le paiement…" : label}
      </button>
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
