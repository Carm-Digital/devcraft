import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import CTA from "@/components/ui/CTA";
import PageHero from "@/components/layout/PageHero";
import { ABOUT_VALUES } from "@/config/about";

export const metadata: Metadata = {
  title: "À propos | DevCraft, agence web Île-de-France",
  description:
    "DevCraft est une agence web en Île-de-France qui conçoit des sites sur mesure, modernes et orientés conversion, avec un accompagnement humain de A à Z.",
};

const values = [
  {
    key: "Sérieux",
    icon: (
      <svg className="h-5 w-5 text-[#F1E83B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    key: "Écoute",
    icon: (
      <svg className="h-5 w-5 text-[#F1E83B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16h0" />
      </svg>
    ),
  },
  {
    key: "Personnalisation",
    icon: (
      <svg className="h-5 w-5 text-[#F1E83B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
      </svg>
    ),
  },
  {
    key: "Modernité",
    icon: (
      <svg className="h-5 w-5 text-[#F1E83B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7z" />
      </svg>
    ),
  },
  {
    key: "Accompagnement humain",
    icon: (
      <svg className="h-5 w-5 text-[#F1E83B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 11a4 4 0 100-8 4 4 0 000 8z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 8v6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M23 11h-6" />
      </svg>
    ),
  },
  {
    key: "Souci du détail",
    icon: (
      <svg className="h-5 w-5 text-[#F1E83B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20v-2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12H4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 12h-2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.05 7.05l-1.4-1.4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.35 18.35l-1.4-1.4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.05 16.95l-1.4 1.4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.35 5.65l-1.4 1.4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16a4 4 0 100-8 4 4 0 000 8z" />
      </svg>
    ),
  },
] as const;

export default function AProposPage() {
  return (
    <>
      {/* 1. HERO */}
      <PageHero
        eyebrow="DevCraft"
        title="Ce qu&apos;on est, ce qu&apos;on fait"
        description="DevCraft conçoit des sites web sur mesure pour les entreprises qui veulent une présence en ligne claire, crédible et efficace."
      />

      {/* 2. QUI NOUS SOMMES */}
      <Section
        title="Qui nous sommes"
        subtitle="Une petite équipe, un fonctionnement simple, des sites pensés pour vos objectifs."
      >
        <div className="mx-auto max-w-3xl space-y-5 text-slate-600">
          <p>
            DevCraft est une agence web basée en Île-de-France. Nous concevons et réalisons des sites sur mesure pour
            les entreprises, indépendants et organisations qui veulent être compris au premier coup d&apos;œil.
          </p>
          <p>
            Notre travail : clarifier votre offre, structurer vos contenus et créer une expérience fluide pour vos
            visiteurs. Vous échangez toujours avec une personne qui suit votre projet de bout en bout.
          </p>
        </div>
      </Section>

      {/* 3. NOS VALEURS */}
      <Section
        title="Ce qui guide notre travail"
        subtitle="Quelques repères simples qui structurent chaque projet que nous prenons en charge."
        className="bg-slate-50"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => {
            const value = ABOUT_VALUES.find((item) => item.title === v.key)!;
            return (
              <div
                key={v.key}
                className="rounded-2xl border border-white/10 bg-[#0a0e1a] p-6 shadow-sm transition hover:border-[#F1E83B]/40 hover:shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-[#F1E83B]">
                    {v.icon}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white">{value.title}</h3>
                </div>
                <p className="mt-2 text-sm text-slate-300">{value.desc}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* 4. CTA FINAL */}
      <Section
        title="Un projet en tête ?"
        subtitle="Parlez-nous de votre contexte et de vos objectifs, nous revenons vers vous avec une première piste concrète."
        dark
      >
        <div className="flex justify-center">
          <CTA href="/formulaire" variant="primary">
            Démarrer un projet
          </CTA>
        </div>
      </Section>
    </>
  );
}
