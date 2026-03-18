"use client";

import { useState, type FormEvent } from "react";
import CTA from "@/components/CTA";

type ExchangeFormData = {
  nom: string;
  telephone: string;
  email: string;
  creneau: string;
  message: string;
};

const inputClass =
  "mt-1 block w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[#0a0e1a] shadow-sm transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none";
const labelClass = "block text-sm font-medium text-[#0a0e1a]";

const DEFAULT_DATA: ExchangeFormData = {
  nom: "",
  telephone: "",
  email: "",
  creneau: "",
  message: "",
};

export default function ExchangeForm() {
  const [form, setForm] = useState<ExchangeFormData>(DEFAULT_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const update = <K extends keyof ExchangeFormData>(field: K, value: ExchangeFormData[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (success) setSuccess(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Validation très simple : champs principaux requis
    if (!form.nom.trim() || !form.telephone.trim() || !form.email.trim()) {
      setSubmitError("Veuillez renseigner votre nom, téléphone et email.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSuccess(false);
    try {
      // Envoi serveur (email) : évite les “succès factices”
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "exchange",
          nom: form.nom,
          telephone: form.telephone,
          email: form.email,
          creneau: form.creneau,
          message: form.message,
          source: "exchange_form",
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message ?? "Envoi impossible. Réessayez ou contactez-nous.");
      }

      setForm(DEFAULT_DATA);
      setSuccess(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Une erreur est survenue lors de l'envoi.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-lg sm:p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="ex-nom" className={labelClass}>
            Nom *
          </label>
          <input
            id="ex-nom"
            type="text"
            value={form.nom}
            onChange={(e) => update("nom", e.target.value)}
            className={inputClass}
            placeholder="Votre nom"
          />
        </div>
        <div>
          <label htmlFor="ex-telephone" className={labelClass}>
            Téléphone *
          </label>
          <input
            id="ex-telephone"
            type="tel"
            value={form.telephone}
            onChange={(e) => update("telephone", e.target.value)}
            className={inputClass}
            placeholder="06 12 34 56 78"
          />
        </div>
      </div>

      <div>
        <label htmlFor="ex-email" className={labelClass}>
          Email *
        </label>
        <input
          id="ex-email"
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className={inputClass}
          placeholder="vous@exemple.fr"
        />
      </div>

      <div>
        <label htmlFor="ex-creneau" className={labelClass}>
          Créneau souhaité
        </label>
        <input
          id="ex-creneau"
          type="text"
          value={form.creneau}
          onChange={(e) => update("creneau", e.target.value)}
          className={inputClass}
          placeholder="Ex. mardi matin, après 18h, cette semaine…"
        />
      </div>

      <div>
        <label htmlFor="ex-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="ex-message"
          rows={3}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className={inputClass}
          placeholder="Quelques mots sur votre projet ou vos questions."
        />
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <CTA type="submit" variant="primary" className="min-w-[200px]" disabled={isSubmitting}>
          {isSubmitting ? "Envoi en cours…" : "Réserver mon échange"}
        </CTA>
        <p className="text-sm text-slate-500">
          Nous revenons vers vous rapidement pour vous proposer un créneau.
        </p>
      </div>

      {submitError && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">{submitError}</p>
      )}

      {success && (
        <p className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-800">
          Votre demande d’échange a bien été envoyée.
        </p>
      )}
    </form>
  );
}

