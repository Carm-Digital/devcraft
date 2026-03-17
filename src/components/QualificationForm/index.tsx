"use client";

import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { QualificationFormData, QualificationFormErrors, TypeSite } from "@/types/qualification";
import { QUALIFICATION_FORM_DEFAULT } from "@/types/qualification";
import { validateQualificationForm } from "@/lib/validateQualification";
import { OFFER_PRICES, NOTE_FIXED_PRICE, NOTE_SUR_DEVIS } from "@/config/offers";
import { DELIVERY_DELAYS, DELIVERY_DELAY_NOTE } from "@/config/deliveryDelays";
import CTA from "@/components/CTA";

const inputClass =
  "mt-1 block w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[#0a0e1a] shadow-sm transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none";
const inputErrorClass = "border-red-500 focus:border-red-500 focus:ring-red-500/20";
const labelClass = "block text-sm font-medium text-[#0a0e1a]";

const OFFER_VALUES: TypeSite[] = ["vitrine", "complet", "abonnement", "personnalise"];

type QualificationFormProps = {
  /** Contexte d'utilisation : page de devis ou page contact */
  mode?: "qualification" | "contact";
};

const BUDGET_OPTIONS = [
  { id: "150-300", label: "150 € – 300 €" },
  { id: "300-700", label: "300 € – 700 €" },
  { id: "700-1200", label: "700 € – 1 200 €" },
  { id: "1200-plus", label: "+ 1 200 €" },
] as const;

export default function QualificationForm({ mode = "qualification" }: QualificationFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState<QualificationFormData>(QUALIFICATION_FORM_DEFAULT);
  const [errors, setErrors] = useState<QualificationFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const isContactMode = mode === "contact";

  // Pré-remplissage depuis la page services (?offer=vitrine, etc.)
  useEffect(() => {
    const offer = searchParams.get("offer") as TypeSite | null;
    if (offer && OFFER_VALUES.includes(offer)) {
      setForm((prev) => ({ ...prev, typeSite: offer }));
    }
  }, [searchParams]);

  // Pré-remplissage quand on vient de "Demander mon projet"
  useEffect(() => {
    const source = searchParams.get("source");
    if (source === "demander-mon-projet") {
      setForm((prev) =>
        prev.description
          ? prev
          : {
              ...prev,
              description: "Type de site : sélectionné automatiquement",
            },
      );
    }
  }, [searchParams]);

  const update = <K extends keyof QualificationFormData>(
    field: K,
    value: QualificationFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validateQualificationForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setIsSubmitting(true);
    setSubmitSuccess(false);
    await new Promise((r) => setTimeout(r, 600));

    if (isContactMode) {
      setSubmitSuccess(true);
      setForm(QUALIFICATION_FORM_DEFAULT);
      setErrors({});
      setIsSubmitting(false);
      return;
    }

    setForm(QUALIFICATION_FORM_DEFAULT);
    setErrors({});
    setIsSubmitting(false);
    router.push("/merci");
  };

  const selectedOffer = form.typeSite ? OFFER_PRICES[form.typeSite] : null;

  return (
    <form
      id="formulaire"
      onSubmit={handleSubmit}
      className="space-y-8 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl sm:p-8 lg:p-10"
    >
      <p className="rounded-xl border border-amber-200/80 bg-amber-50/80 px-4 py-3 text-sm text-slate-700">
        <strong>Un système simple :</strong> vous choisissez une offre, le prix fixe s’affiche. Vous envoyez votre demande, nous vous recontactons pour finaliser le projet ensemble.
      </p>

      <div className="border-b border-slate-200 pb-6">
        <h2 className="font-display text-xl font-semibold text-[#0a0e1a]">
          Parlez-nous de votre projet
        </h2>
        <p className="mt-1 text-slate-600">
          Décrivez votre besoin en quelques minutes. Plus votre demande est précise, plus notre réponse sera pertinente. Chaque projet est étudié avec attention.
        </p>
      </div>

      {/* Identité */}
      <fieldset className="space-y-6">
        <legend className="text-sm font-semibold uppercase tracking-wider text-slate-500">
          Vos coordonnées
        </legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="qf-prenom" className={labelClass}>Prénom *</label>
            <input
              id="qf-prenom"
              type="text"
              value={form.prenom}
              onChange={(e) => update("prenom", e.target.value)}
              className={errors.prenom ? `${inputClass} ${inputErrorClass}` : inputClass}
              placeholder="Jean"
              autoComplete="given-name"
            />
            {errors.prenom && <p className="mt-1 text-sm text-red-600">{errors.prenom}</p>}
          </div>
          <div>
            <label htmlFor="qf-nom" className={labelClass}>Nom *</label>
            <input
              id="qf-nom"
              type="text"
              value={form.nom}
              onChange={(e) => update("nom", e.target.value)}
              className={errors.nom ? `${inputClass} ${inputErrorClass}` : inputClass}
              placeholder="Dupont"
              autoComplete="family-name"
            />
            {errors.nom && <p className="mt-1 text-sm text-red-600">{errors.nom}</p>}
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="qf-email" className={labelClass}>Email *</label>
            <input
              id="qf-email"
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className={errors.email ? `${inputClass} ${inputErrorClass}` : inputClass}
              placeholder="jean.dupont@exemple.fr"
              autoComplete="email"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="qf-telephone" className={labelClass}>Téléphone *</label>
            <input
              id="qf-telephone"
              type="tel"
              value={form.telephone}
              onChange={(e) => update("telephone", e.target.value)}
              className={errors.telephone ? `${inputClass} ${inputErrorClass}` : inputClass}
              placeholder="06 12 34 56 78"
              autoComplete="tel"
            />
            {errors.telephone && <p className="mt-1 text-sm text-red-600">{errors.telephone}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="qf-entreprise" className={labelClass}>Entreprise / Activité</label>
          <input
            id="qf-entreprise"
            type="text"
            value={form.entreprise}
            onChange={(e) => update("entreprise", e.target.value)}
            className={inputClass}
            placeholder="Nom de votre société ou activité"
            autoComplete="organization"
          />
        </div>
      </fieldset>

      {/* Projet : type de site + tarif affiché */}
      <fieldset className="space-y-6">
        <legend className="text-sm font-semibold uppercase tracking-wider text-slate-500">
          Votre projet
        </legend>
        <div>
          <label htmlFor="qf-typeSite" className={labelClass}>Type de site souhaité *</label>
          <select
            id="qf-typeSite"
            value={form.typeSite}
            onChange={(e) => update("typeSite", e.target.value as TypeSite)}
            className={errors.typeSite ? `${inputClass} ${inputErrorClass}` : inputClass}
          >
            <option value="">— Choisir —</option>
            <option value="vitrine">Site vitrine</option>
            <option value="complet">Site complet avec achat intégré</option>
            <option value="abonnement">Site avec abonnement intégré</option>
            <option value="personnalise">Site personnalisé</option>
          </select>
          {errors.typeSite && <p className="mt-1 text-sm text-red-600">{errors.typeSite}</p>}
        </div>

        {/* Budget souhaité */}
        <div>
          <p className={labelClass}>Budget estimé *</p>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            {BUDGET_OPTIONS.map((option) => {
              const isSelected = form.budget === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => update("budget", option.id)}
                  className={`group flex w-full flex-col items-start rounded-2xl border-2 px-4 py-3 text-left text-sm transition sm:px-5 sm:py-4 ${
                    isSelected
                      ? "border-amber-500 bg-amber-50/80 shadow-md ring-2 ring-amber-500/30"
                      : "border-slate-200 bg-white hover:border-amber-200 hover:bg-slate-50/80 hover:shadow-sm"
                  }`}
                >
                  <span className={`font-display font-semibold ${isSelected ? "text-amber-800" : "text-[#0a0e1a]"}`}>
                    {option.label}
                  </span>
                  <span className="mt-1 text-xs text-slate-500">
                    Cette information reste indicative et nous permet de vous proposer la meilleure approche.
                  </span>
                </button>
              );
            })}
          </div>
          {errors.budget && <p className="mt-1 text-sm text-red-600">{errors.budget}</p>}
        </div>

        {/* Bloc tarif : visible dès qu’un type est choisi */}
        {selectedOffer && (
          <div className="rounded-2xl border-2 border-amber-200/80 bg-gradient-to-br from-amber-50/90 to-white p-6 shadow-lg sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">
              Tarif
            </p>
            <p className="mt-2 font-display text-3xl font-bold tracking-tight text-[#0a0e1a] sm:text-4xl">
              {selectedOffer.price}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {selectedOffer.isFixed ? NOTE_FIXED_PRICE : NOTE_SUR_DEVIS}
            </p>
          </div>
        )}

        {/* Délai de réalisation — cartes cliquables */}
        <div className="space-y-4">
          <p className={labelClass}>Délai de réalisation</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {DELIVERY_DELAYS.map((option) => {
              const isSelected = form.delai === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => update("delai", option.id)}
                  className={`group relative flex flex-col items-start rounded-2xl border-2 p-4 text-left transition sm:p-5 ${
                    isSelected
                      ? "border-amber-500 bg-amber-50/80 shadow-md ring-2 ring-amber-500/30"
                      : "border-slate-200 bg-white hover:border-amber-200 hover:bg-slate-50/80 hover:shadow-sm"
                  }`}
                >
                  {isSelected && (
                    <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-white">
                      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                  <span className={`font-display font-semibold ${isSelected ? "text-amber-800" : "text-[#0a0e1a]"}`}>
                    {option.name}
                  </span>
                  <span className="mt-1 text-sm text-slate-600">{option.daysLabel}</span>
                  <span className={`mt-2 text-sm font-medium ${option.supplementEur === 0 ? "text-slate-600" : "text-amber-700"}`}>
                    {option.supplementLabel}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="text-sm text-slate-500">
            {DELIVERY_DELAY_NOTE}
          </p>
        </div>
        <div>
          <label htmlFor="qf-description" className={labelClass}>Description du projet *</label>
          <textarea
            id="qf-description"
            rows={5}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            className={errors.description ? `${inputClass} ${inputErrorClass}` : inputClass}
            placeholder="Décrivez vos objectifs, votre cible, le contenu prévu et tout élément utile pour nous permettre de vous proposer une solution adaptée."
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>
        <div>
          <label htmlFor="qf-styleSouhaite" className={labelClass}>Style souhaité</label>
          <input
            id="qf-styleSouhaite"
            type="text"
            value={form.styleSouhaite}
            onChange={(e) => update("styleSouhaite", e.target.value)}
            className={inputClass}
            placeholder="Ex. moderne, épuré, coloré, corporate…"
          />
        </div>
      </fieldset>

      {/* Éléments déjà en votre possession */}
      <fieldset className="space-y-6">
        <legend className="text-sm font-semibold uppercase tracking-wider text-slate-500">
          Éléments déjà en votre possession
        </legend>
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <label htmlFor="qf-hasLogo" className={labelClass}>Logo ?</label>
            <select
              id="qf-hasLogo"
              value={form.hasLogo}
              onChange={(e) => update("hasLogo", e.target.value)}
              className={inputClass}
            >
              <option value="">—</option>
              <option value="oui">Oui</option>
              <option value="non">Non</option>
            </select>
          </div>
          <div>
            <label htmlFor="qf-hasTextes" className={labelClass}>Textes ?</label>
            <select
              id="qf-hasTextes"
              value={form.hasTextes}
              onChange={(e) => update("hasTextes", e.target.value)}
              className={inputClass}
            >
              <option value="">—</option>
              <option value="oui">Oui</option>
              <option value="non">Non</option>
            </select>
          </div>
          <div>
            <label htmlFor="qf-hasPhotos" className={labelClass}>Photos / visuels ?</label>
            <select
              id="qf-hasPhotos"
              value={form.hasPhotos}
              onChange={(e) => update("hasPhotos", e.target.value)}
              className={inputClass}
            >
              <option value="">—</option>
              <option value="oui">Oui</option>
              <option value="non">Non</option>
            </select>
          </div>
        </div>
      </fieldset>

      {/* Source */}
      <div>
        <label htmlFor="qf-commentConnu" className={labelClass}>Comment nous avez-vous connu ?</label>
        <select
          id="qf-commentConnu"
          value={form.commentConnu}
          onChange={(e) => update("commentConnu", e.target.value)}
          className={inputClass}
        >
          <option value="">— Choisir —</option>
          <option value="recherche">Recherche Google</option>
          <option value="recommandation">Recommandation</option>
          <option value="reseau">Réseaux sociaux</option>
          <option value="autre">Autre</option>
        </select>
      </div>

      {/* RGPD */}
      <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 sm:p-5">
        <div className="flex gap-3">
          <input
            id="qf-rgpd"
            type="checkbox"
            checked={form.acceptationRGPD}
            onChange={(e) => update("acceptationRGPD", e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-2 focus:ring-amber-500/20"
          />
          <div>
            <label htmlFor="qf-rgpd" className="cursor-pointer text-sm text-slate-700">
              J’accepte que mes données soient utilisées uniquement pour étudier mon projet et me recontacter. Elles ne seront pas transmises à des tiers et resteront confidentielles. *
            </label>
            {errors.acceptationRGPD && (
              <p className="mt-1 text-sm text-red-600">{errors.acceptationRGPD}</p>
            )}
          </div>
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Conformément au RGPD, vous pouvez exercer votre droit d’accès, de rectification ou d’opposition en nous contactant.
        </p>
      </div>

      <p className="text-sm text-slate-600">
        Les informations renseignées nous permettent de mieux cerner votre besoin et de vous répondre de façon personnalisée. Les prix sont clairs dès le départ ; nous échangerons avec vous pour valider les détails, vos contenus et vos attentes avant tout lancement.
      </p>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <CTA type="submit" variant="primary" className="min-w-[220px]" disabled={isSubmitting}>
          {isSubmitting ? "Envoi en cours…" : "Envoyer ma demande"}
        </CTA>
        <div className="space-y-1 text-sm text-slate-600">
          <p>* Champs obligatoires. Aucun engagement.</p>
          <p className="text-slate-500">Nous vous recontactons rapidement pour discuter de votre projet.</p>
        </div>
      </div>

      {submitSuccess && (
        <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Votre demande a bien été envoyée. Nous revenons vers vous sous 24–48 h ouvrées.
        </p>
      )}
    </form>
  );
}
