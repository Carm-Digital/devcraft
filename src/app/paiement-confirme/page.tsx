import type { Metadata } from "next";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Paiement confirmé — Projet confirmé",
  description: "Votre acompte a bien été enregistré. Votre projet DevCraft peut entrer en phase de préparation.",
};

const NEXT_STEPS = [
  "Nous reviendrons vers vous pour organiser les prochaines étapes",
  "Préparez vos contenus, visuels et préférences pour accélérer le lancement",
  "Dès que nous aurons vos éléments, nous lançons la phase de conception",
  "Vous serez tenu informé à chaque étape clé du projet",
];

export default function PaiementConfirmePage() {
  return (
    <section className="min-h-[80vh] bg-gradient-to-b from-slate-50 to-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="mt-8 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Paiement confirmé
        </h1>
        <p className="mt-4 text-lg font-medium text-slate-700">
          Votre acompte a bien été enregistré
        </p>
        <p className="mt-2 text-slate-600">
          Votre projet peut désormais entrer en phase de préparation. Nous vous accompagnons pour la suite.
        </p>

        <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm">
          <h2 className="font-semibold text-slate-900">Prochaines étapes</h2>
          <ul className="mt-4 space-y-3 text-slate-600">
            {NEXT_STEPS.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-800">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-8 text-sm text-slate-500">
          Un email de confirmation vous a été envoyé. En cas de question, n’hésitez pas à nous contacter.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <CTA href="/" variant="primary">
            Retour à l’accueil
          </CTA>
          <CTA href="/#contact" variant="outline">
            Nous contacter
          </CTA>
        </div>
      </div>
    </section>
  );
}
