"use client";

import { FormEvent, useState } from "react";
import CTA from "@/components/ui/CTA";

export default function ClientIdAccessForm() {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const id = value.trim();
    if (!id) {
      setError("Indiquez votre identifiant client.");
      return;
    }
    setError(null);
    window.location.href = `/reglement-devis?id=${encodeURIComponent(id)}`;
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4">
      <div>
        <label htmlFor="client-id" className="block text-sm font-semibold text-[#0d0f14]">
          Identifiant client
        </label>
        <input
          id="client-id"
          type="text"
          autoComplete="off"
          placeholder="ex. DC-2025-XXXXXX"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[#0d0f14] shadow-sm focus:border-[#00D4FF] focus:outline-none focus:ring-2 focus:ring-[#00D4FF]/20"
        />
        <p className="mt-2 text-sm text-slate-600">
          Saisissez l’identifiant reçu par email (format DC-…).
        </p>
      </div>
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      <CTA type="submit" variant="primary" className="w-full justify-center sm:w-auto">
        Accéder à mon règlement
      </CTA>
    </form>
  );
}
