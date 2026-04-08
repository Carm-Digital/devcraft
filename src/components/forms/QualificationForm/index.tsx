"use client";

import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { QualificationFormData, QualificationFormErrors, TypeSite } from "@/types/qualification";
import { QUALIFICATION_FORM_DEFAULT } from "@/types/qualification";
import { validateQualificationForm } from "@/lib/validateQualification";
import { OFFER_PRICES } from "@/config/offers";
import { DELIVERY_DELAYS, DELIVERY_DELAY_NOTE } from "@/config/deliveryDelays";
import CTA from "@/components/ui/CTA";

const inputClass =
  "mt-1 block w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white shadow-sm transition placeholder:text-slate-500 focus:border-[#00D4FF] focus:ring-2 focus:ring-[#00D4FF]/20 focus:outline-none";
const inputErrorClass = "border-red-500 focus:border-red-500 focus:ring-red-500/20";
const labelClass = "block text-sm font-medium text-slate-300";

const OFFER_VALUES: TypeSite[] = ["vitrine", "complet", "abonnement"];

const BUDGET_BY_TYPE = {
  vitrine: "150 € – 300 €",
  complet: "300 € – 1 000 €",
  abonnement: "+ 1 000 €",
} as const;

type QualificationFormProps = {
  /** Contexte d'utilisation : page de devis ou page contact */
  mode?: "qualification" | "contact";
  offerPrices?: typeof OFFER_PRICES;
};

export default function QualificationForm({ mode = "qualification", offerPrices = OFFER_PRICES }: QualificationFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<QualificationFormData>(QUALIFICATION_FORM_DEFAULT);
  const [errors, setErrors] = useState<QualificationFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);
  const [accompLogo, setAccompLogo] = useState(false);
  const [accompTextes, setAccompTextes] = useState(false);
  const [accompPhotos, setAccompPhotos] = useState(false);
  const [wantsMaintenance, setWantsMaintenance] = useState(false);
  const isContactMode = mode === "contact";

  // Pré-remplissage via l'URL (sans `useSearchParams` pour éviter le besoin de Suspense)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);

    // Pré-remplissage depuis la page services (?offer=vitrine, etc.)
    const offer = params.get("offer") as TypeSite | null;
    if (offer && OFFER_VALUES.includes(offer)) {
      setForm((prev) => ({ ...prev, typeSite: offer }));
    }

    // Pré-remplissage quand on vient de "Demander mon projet"
    const source = params.get("source");
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
  }, []);

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
    setSubmitError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "qualification",
          prenom: form.prenom,
          nom: form.nom,
          email: form.email,
          telephone: form.telephone,
          entreprise: form.entreprise,
          typeSite: form.typeSite,
          budget: form.typeSite
            ? BUDGET_BY_TYPE[form.typeSite as keyof typeof BUDGET_BY_TYPE] ?? ""
            : "",
          delai: form.delai,
          description: form.description,
          hasLogo: form.hasLogo,
          hasTextes: form.hasTextes,
          hasPhotos: form.hasPhotos,
          styleSouhaite: form.styleSouhaite,
          commentConnu: form.commentConnu,
          maintenanceMensuelle: wantsMaintenance,
          accompagnementLogo: accompLogo,
          accompagnementTextes: accompTextes,
          accompagnementPhotos: accompPhotos,
          acceptationRGPD: form.acceptationRGPD,
          source: "qualification_form",
        }),
      });

      const data = (await res.json().catch(() => null)) as { ok?: boolean; clientId?: string; message?: string } | null;

      if (!res.ok) {
        throw new Error(data?.message ?? "Envoi impossible. Réessayez ou contactez-nous.");
      }

      setForm(QUALIFICATION_FORM_DEFAULT);
      setErrors({});
      setAccompLogo(false);
      setAccompTextes(false);
      setAccompPhotos(false);
      setWantsMaintenance(false);

      if (isContactMode) {
        if (data?.clientId) setClientId(data.clientId);
        setSubmitSuccess(true);
        return;
      }

      if (data?.clientId) {
        setClientId(data.clientId);
        router.push(`/merci?id=${encodeURIComponent(data.clientId)}`);
        return;
      }

      router.push("/merci");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Une erreur est survenue lors de l'envoi.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      id="formulaire"
      onSubmit={handleSubmit}
      className="space-y-8 rounded-2xl border border-white/10 bg-[#0d0f14] p-6 shadow-xl sm:p-8 lg:p-10"
    >
      {/* Identité */}
      <fieldset className="space-y-6">
        <legend className="text-sm font-semibold uppercase tracking-wider text-slate-400">
          Vos coordonnées
        </legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="qf-prenom" className={labelClass}>Votre prénom *</label>
            <input
              id="qf-prenom"
              type="text"
              value={form.prenom}
              onChange={(e) => update("prenom", e.target.value)}
              className={errors.prenom ? `${inputClass} ${inputErrorClass}` : inputClass}
              placeholder="Jean"
              autoComplete="given-name"
            />
            {errors.prenom && <p className="mt-1 text-sm text-red-500">{errors.prenom}</p>}
          </div>
          <div>
            <label htmlFor="qf-nom" className={labelClass}>Votre nom *</label>
            <input
              id="qf-nom"
              type="text"
              value={form.nom}
              onChange={(e) => update("nom", e.target.value)}
              className={errors.nom ? `${inputClass} ${inputErrorClass}` : inputClass}
              placeholder="Dupont"
              autoComplete="family-name"
            />
            {errors.nom && <p className="mt-1 text-sm text-red-500">{errors.nom}</p>}
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="qf-email" className={labelClass}>Votre email *</label>
            <input
              id="qf-email"
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className={errors.email ? `${inputClass} ${inputErrorClass}` : inputClass}
              placeholder="jean.dupont@exemple.fr"
              autoComplete="email"
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="qf-telephone" className={labelClass}>Votre téléphone *</label>
            <input
              id="qf-telephone"
              type="tel"
              value={form.telephone}
              onChange={(e) => update("telephone", e.target.value)}
              className={errors.telephone ? `${inputClass} ${inputErrorClass}` : inputClass}
              placeholder="06 12 34 56 78"
              autoComplete="tel"
            />
            {errors.telephone && <p className="mt-1 text-sm text-red-500">{errors.telephone}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="qf-entreprise" className={labelClass}>Votre entreprise ou activité</label>
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

      {/* Projet : type de site */}
      <fieldset className="space-y-6">
        <legend className="text-sm font-semibold uppercase tracking-wider text-slate-400">
          Votre projet
        </legend>
        <div>
          <label htmlFor="qf-typeSite" className={labelClass}>Quel type de site vous faut-il ? *</label>
          <select
            id="qf-typeSite"
            value={form.typeSite}
            onChange={(e) => update("typeSite", e.target.value as TypeSite)}
            className={errors.typeSite ? `${inputClass} ${inputErrorClass}` : inputClass}
          >
            <option value="" className="bg-[#0d0f14] text-white">— Choisir —</option>
            <option value="vitrine" className="bg-[#0d0f14] text-white">Site vitrine</option>
            <option value="complet" className="bg-[#0d0f14] text-white">Site complet avec achat intégré</option>
            <option value="abonnement" className="bg-[#0d0f14] text-white">Site avec abonnement intégré</option>
          </select>
          {errors.typeSite && <p className="mt-1 text-sm text-red-500">{errors.typeSite}</p>}
        </div>

        {form.typeSite && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Budget indicatif
            </p>
            <p className="mt-2 font-display text-2xl font-bold text-[#00D4FF]">
              {BUDGET_BY_TYPE[form.typeSite as keyof typeof BUDGET_BY_TYPE]}
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Cette fourchette est indicative et nous aide à mieux cadrer votre projet.
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
                      ? "border-[#00D4FF] bg-white/10 shadow-md ring-2 ring-[#00D4FF]/30"
                      : "border-white/10 bg-white/5 text-white hover:border-[#00D4FF]/40 hover:bg-white/10 hover:shadow-sm"
                  }`}
                >
                  {isSelected && (
                    <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#00D4FF] text-[#0d0f14]">
                      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                  <span className={`font-display font-semibold ${isSelected ? "text-[#00D4FF]" : "text-white"}`}>
                    {option.name}
                  </span>
                  <span className="mt-1 text-sm text-slate-400">{option.daysLabel}</span>
                  <span className={`mt-2 text-sm font-medium ${option.supplementEur === 0 ? "text-slate-400" : "text-[#00D4FF]"}`}>
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
          <label htmlFor="qf-description" className={labelClass}>Décrivez votre projet *</label>
          <textarea
            id="qf-description"
            rows={5}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            className={errors.description ? `${inputClass} ${inputErrorClass}` : inputClass}
            placeholder="Votre activité, vos objectifs, votre cible, ce que vous voulez que les visiteurs fassent..."
          />
          {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
        </div>
        <div>
          <label htmlFor="qf-styleSouhaite" className={labelClass}>Style visuel souhaité</label>
          <input
            id="qf-styleSouhaite"
            type="text"
            value={form.styleSouhaite}
            onChange={(e) => update("styleSouhaite", e.target.value)}
            className={inputClass}
            placeholder="Moderne, épuré, coloré, dynamique..."
          />
        </div>
      </fieldset>

      {/* Éléments déjà en votre possession */}
      <fieldset className="space-y-6">
        <legend className="text-sm font-semibold uppercase tracking-wider text-slate-400">
          Éléments déjà en votre possession
        </legend>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="flex flex-col">
            <label htmlFor="qf-hasLogo" className={labelClass}>Logo ?</label>
            <select
              id="qf-hasLogo"
              value={form.hasLogo}
              onChange={(e) => update("hasLogo", e.target.value)}
              className={inputClass}
            >
              <option value="" className="bg-[#0d0f14] text-white">—</option>
              <option value="oui" className="bg-[#0d0f14] text-white">Oui</option>
              <option value="non" className="bg-[#0d0f14] text-white">Non</option>
            </select>
            {form.hasLogo === "non" && (
              <label className="mt-3 flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/30 accent-[#00D4FF]"
                  checked={accompLogo}
                  onChange={(e) => setAccompLogo(e.target.checked)}
                />
                <span className="text-sm text-slate-300">
                  Je souhaite être accompagné dans la création de mon logo. Ce service fera l&apos;objet d&apos;une
                  facturation complémentaire définie lors de notre échange.
                </span>
              </label>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="qf-hasTextes" className={labelClass}>Textes ?</label>
            <select
              id="qf-hasTextes"
              value={form.hasTextes}
              onChange={(e) => update("hasTextes", e.target.value)}
              className={inputClass}
            >
              <option value="" className="bg-[#0d0f14] text-white">—</option>
              <option value="oui" className="bg-[#0d0f14] text-white">Oui</option>
              <option value="non" className="bg-[#0d0f14] text-white">Non</option>
            </select>
            {form.hasTextes === "non" && (
              <label className="mt-3 flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/30 accent-[#00D4FF]"
                  checked={accompTextes}
                  onChange={(e) => setAccompTextes(e.target.checked)}
                />
                <span className="text-sm text-slate-300">
                  Je souhaite être accompagné dans la rédaction de mes contenus. Ce service fera l&apos;objet d&apos;une
                  facturation complémentaire définie lors de notre échange.
                </span>
              </label>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="qf-hasPhotos" className={labelClass}>Photos / visuels ?</label>
            <select
              id="qf-hasPhotos"
              value={form.hasPhotos}
              onChange={(e) => update("hasPhotos", e.target.value)}
              className={inputClass}
            >
              <option value="" className="bg-[#0d0f14] text-white">—</option>
              <option value="oui" className="bg-[#0d0f14] text-white">Oui</option>
              <option value="non" className="bg-[#0d0f14] text-white">Non</option>
            </select>
            {form.hasPhotos === "non" && (
              <label className="mt-3 flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/30 accent-[#00D4FF]"
                  checked={accompPhotos}
                  onChange={(e) => setAccompPhotos(e.target.checked)}
                />
                <span className="text-sm text-slate-300">
                  Je souhaite être accompagné dans la réalisation ou la sélection de mes visuels. Ce service fera
                  l&apos;objet d&apos;une facturation complémentaire définie lors de notre échange.
                </span>
              </label>
            )}
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold uppercase tracking-wider text-slate-400">
          Maintenance mensuelle
        </legend>
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/30 accent-[#00D4FF]"
            checked={wantsMaintenance}
            onChange={(e) => setWantsMaintenance(e.target.checked)}
          />
          <div>
            <p className="font-semibold text-white">Je souhaite inclure un contrat de maintenance mensuelle</p>
            <p className="mt-1 text-sm text-slate-400">
              Un forfait mensuel adapté à votre site, incluant les mises à jour techniques, la sécurité, les
              sauvegardes et un quota de modifications de contenu. La formule et le tarif sont définis ensemble après
              livraison du site.
            </p>
          </div>
        </label>

        {wantsMaintenance && (
          <div className="space-y-2 rounded-xl border border-[#00D4FF]/20 bg-[#00D4FF]/5 p-4">
            <p className="text-sm font-semibold text-[#00D4FF]">Ce que couvre la maintenance :</p>
            <ul className="space-y-1 text-sm text-slate-300">
              {[
                "Mises à jour techniques et de sécurité",
                "Sauvegardes régulières",
                "Modifications de contenu (textes, images, sections)",
                "Support prioritaire par email",
                "Suivi des performances et optimisations",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00D4FF]" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-slate-400">
              Le tarif mensuel est défini selon le type de site et la formule choisie lors de notre échange. Aucun
              engagement minimum imposé.
            </p>
          </div>
        )}
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
          <option value="" className="bg-[#0d0f14] text-white">— Choisir —</option>
          <option value="recherche" className="bg-[#0d0f14] text-white">Recherche Google</option>
          <option value="recommandation" className="bg-[#0d0f14] text-white">Recommandation</option>
          <option value="reseau" className="bg-[#0d0f14] text-white">Réseaux sociaux</option>
          <option value="autre" className="bg-[#0d0f14] text-white">Autre</option>
        </select>
      </div>

      {/* RGPD */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
        <div className="flex gap-3">
          <input
            id="qf-rgpd"
            type="checkbox"
            checked={form.acceptationRGPD}
            onChange={(e) => update("acceptationRGPD", e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-slate-300 text-[#00D4FF] focus:ring-2 focus:ring-[#00D4FF]/20"
          />
          <div>
            <label htmlFor="qf-rgpd" className="cursor-pointer text-sm text-slate-300">
              J’accepte que mes données soient utilisées uniquement pour étudier mon projet et me recontacter. Elles ne seront pas transmises à des tiers et resteront confidentielles. *
            </label>
            {errors.acceptationRGPD && (
              <p className="mt-1 text-sm text-red-500">{errors.acceptationRGPD}</p>
            )}
          </div>
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Conformément au RGPD, vous pouvez exercer votre droit d’accès, de rectification ou d’opposition en nous contactant.
        </p>
      </div>

      <p className="text-sm text-slate-400">
        Nous étudions chaque demande avec attention et revenons vers vous sous 24 heures.
      </p>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <CTA type="submit" variant="primary" className="min-w-[220px]" disabled={isSubmitting}>
          {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande →"}
        </CTA>
        <div className="space-y-1 text-sm text-slate-400">
          <p>* Champs obligatoires. Aucun engagement.</p>
          <p className="text-slate-500">Nous vous recontactons rapidement pour discuter de votre projet.</p>
        </div>
      </div>

      {submitError && (
        <p className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">{submitError}</p>
      )}

      {submitSuccess && (
        <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Votre demande a bien été envoyée. Nous revenons vers vous sous 24–48 h ouvrées.
        </p>
      )}
    </form>
  );
}
