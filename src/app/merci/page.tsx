import type { Metadata } from "next";
import CTA from "@/components/ui/CTA";

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

interface PageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function MerciPage({ searchParams }: PageProps) {
  const { id } = await searchParams;
  const clientId = id?.trim() ?? "";

  return (
    <section className="min-h-[80vh] bg-[#0d0f14] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Merci pour votre demande
        </h1>
        <p className="mt-4 text-lg text-slate-300">
          Nous avons bien reçu votre message. Nous allons étudier votre projet et revenir vers vous afin d’échanger sur vos besoins, vos contenus, vos visuels et les fonctionnalités attendues.
        </p>

        {clientId ? (
          <div className="mt-8 rounded-2xl border-2 border-[#00D4FF]/30 bg-[#0d0f14] px-5 py-5 text-center shadow-md">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
              Votre identifiant client
            </p>
            <p className="mt-2 font-mono text-xl font-bold tracking-wider text-[#00D4FF] sm:text-2xl">
              {clientId}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              Votre identifiant client : <span className="font-semibold text-white">{clientId}</span> — Conservez-le, il vous sera demandé pour régler votre devis.
            </p>
          </div>
        ) : null}

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 text-left">
          <h2 className="font-semibold text-white">Prochaines étapes</h2>
          <ul className="mt-4 space-y-2 text-slate-300">
            {NEXT_STEPS.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00D4FF] text-xs font-bold text-[#0d0f14]">
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

        <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm text-slate-300">
            Si nous vous avons envoyé un lien pour régler l’acompte et confirmer le lancement de votre projet, vous pouvez y accéder ci-dessous.
          </p>
          <a
            href="/reglement-devis"
            className="mt-3 inline-flex text-sm font-semibold text-[#00D4FF] hover:text-[#00D4FF]"
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
