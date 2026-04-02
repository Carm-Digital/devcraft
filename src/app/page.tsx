import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import CTA from "@/components/ui/CTA";
import {
  STACK_ITEMS,
  COMMITMENT_ITEMS,
  SERVICE_CARDS,
  PROCESS_STEPS,
} from "@/config/landing";

export const metadata: Metadata = {
  title: "DevCraft — Sites web sur-mesure",
  description:
    "DevCraft conçoit et développe des sites web sur-mesure pour les entreprises, TPE, PME, startups et e‑commerce. Un seul interlocuteur, tout est construit pour votre contexte.",
};

export default function Home() {
  return (
    <>
      {/* 1. HERO */}
      <section className="relative min-h-[80vh] overflow-hidden bg-[#0a0e1a] px-4 pt-16 pb-36 sm:px-6 sm:pt-24 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050815] via-[#0d1324] to-[#050815]" />
        <div className="hero-gradient-animated absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.18),transparent)]" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#f8fafc] rounded-t-[3rem] sm:rounded-t-[4rem]" />
        <div className="absolute top-1/3 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/5 blur-3xl" />

        <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
          <p className="animate-fade-up font-display text-base font-bold uppercase tracking-[0.35em] text-[#F1E83B]/90 sm:text-lg lg:text-xl">
            DevCraft · Agence web
          </p>
          <div className="relative mt-10 max-w-3xl">
            <div className="pointer-events-none absolute -inset-x-10 -inset-y-6 -z-10 rounded-full bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.2),transparent_60%)] blur-3xl" />
            <h1 className="animate-fade-up animate-delay-1 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Un site clair qui donne envie d&apos;avancer
            </h1>
          </div>
          <p className="animate-fade-up animate-delay-2 mt-6 max-w-2xl text-lg text-slate-300 sm:text-xl">
            Nous imaginons et réalisons votre site autour de votre activité, de vos contraintes et de vos objectifs.
            Pas de formule rigide, tout est pensé pour vous.
          </p>
          <div className="animate-fade-up animate-delay-3 mt-10 flex items-center justify-center">
            <CTA href="/formulaire" variant="primary" className="hero-cta-animated">
              Démarrer un projet
            </CTA>
          </div>
        </div>
      </section>

      {/* BLOC STACK & ENGAGEMENTS */}
      <div className="bg-slate-50 px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-8 rounded-2xl border border-white/10 bg-[#0a0e1a] p-6 shadow-sm sm:p-8 md:grid-cols-2">
          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
              Ce que nous utilisons au quotidien
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {STACK_ITEMS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
              Ce que vous pouvez attendre de nous
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {COMMITMENT_ITEMS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 3. CE QU'ON FAIT */}
      <Section
        id="services"
        title="Ce que nous faisons pour vous"
        subtitle="Trois manières d’aborder votre projet, toujours sur devis en fonction de votre situation."
      >
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
          {SERVICE_CARDS.map((item) => (
            <a
              href="/formulaire"
              key={item.title}
              className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[#0a0e1a] p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-amber-400/50 hover:shadow-lg sm:p-6 cursor-pointer"
            >
              <h3 className="font-display text-lg font-semibold text-white group-hover:text-[#F1E83B]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-slate-400">
                {item.desc}
              </p>
              <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                Toujours sur devis, jamais de formule figée
              </p>
            </a>
          ))}
        </div>
      </Section>

      {/* 4. PROCESSUS */}
      <Section
        id="processus"
        title="Comment ça se passe"
        subtitle="Un cadre simple, sans surprise."
        className="bg-[#0a0e1a]"
        dark
      >
        <div className="mx-auto grid max-w-5xl gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.num}
              className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-left sm:p-5"
            >
              <span className="font-display text-sm font-semibold tracking-[0.18em] text-[#F1E83B]">
                {step.num}
              </span>
              <h3 className="font-display text-base font-semibold text-white">
                {step.title}
              </h3>
              <p className="text-sm text-slate-400">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
