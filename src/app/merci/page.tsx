import type { Metadata } from "next";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Merci — Demande reçue",
  description: "Votre demande a bien été reçue. DevCraft vous recontactera pour étudier votre projet.",
};

const NEXT_STEPS = [
  "Nous étudions votre projet et vos objectifs",
  "Nous vous recontactons pour échanger sur vos besoins, vos contenus, vos visuels et les fonctionnalités attendues",
  "Nous vous adressons une proposition et un devis personnalisé",
  "Une fois validé, nous convenons des prochaines étapes (contenus, planning, éventuel acompte)",
];

export default function MerciPage() {
  return (
    <section className="min-h-[80vh] bg-gradient-to-b from-slate-50 to-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Merci pour votre demande
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Nous avons bien reçu votre message. Nous allons étudier votre projet et revenir vers vous afin d’échanger sur vos besoins, vos contenus, vos visuels et les fonctionnalités attendues.
        </p>

        <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6 text-left shadow-sm">
          <h2 className="font-semibold text-slate-900">Prochaines étapes</h2>
          <ul className="mt-4 space-y-2 text-slate-600">
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
          Réponse sous 24–48 h ouvrées. Si vous avez une question en attendant, n’hésitez pas à nous réécrire.
        </p>

        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-600">
            Si nous vous avons envoyé un lien pour régler l’acompte et confirmer le lancement de votre projet, vous pouvez y accéder ci-dessous.
          </p>
          <a
            href="/validation-projet"
            className="mt-3 inline-flex text-sm font-semibold text-[#F1E83B] hover:text-[#F1E83B]"
          >
            Accéder à la validation du projet →
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <CTA href="/" variant="primary">
            Retour à l’accueil
          </CTA>
          <CTA href="/contact" variant="outline">
            Reprendre contact
          </CTA>
        </div>
      </div>
    </section>
  );
}
