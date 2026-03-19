import type { Metadata } from "next";
import Section from "@/components/Section";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "À propos | DevCraft, agence web Île-de-France",
  description:
    "DevCraft est une agence web en Île-de-France qui crée des sites sur mesure, modernes et orientés conversion, avec un accompagnement humain de A à Z.",
};

const values = [
  {
    title: "Sérieux",
    desc: "Nous nous engageons sur des livrables clairs et des délais réalistes. Pas de promesse impossible, juste un travail soigné.",
    icon: (
      <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Écoute",
    desc: "Chaque projet commence par comprendre votre besoin, votre activité et vos objectifs. Nous posons les bonnes questions.",
    icon: (
      <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16h0" />
      </svg>
    ),
  },
  {
    title: "Personnalisation",
    desc: "Pas de site en série : chaque réalisation est adaptée à son client, à son secteur et à son image.",
    icon: (
      <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
      </svg>
    ),
  },
  {
    title: "Modernité",
    desc: "Sites responsive, performants et aux standards actuels. Votre présence en ligne doit être à la hauteur.",
    icon: (
      <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7z" />
      </svg>
    ),
  },
  {
    title: "Accompagnement humain",
    desc: "Un interlocuteur dédié, des échanges directs. Nous restons disponibles pour les ajustements et les questions.",
    icon: (
      <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 11a4 4 0 100-8 4 4 0 000 8z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 8v6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M23 11h-6" />
      </svg>
    ),
  },
  {
    title: "Souci du détail",
    desc: "Design soigné, textes clairs, expérience utilisateur travaillée. Les détails font la différence.",
    icon: (
      <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
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
];

export default function AProposPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#0a0e1a] px-4 py-16 text-white sm:px-6 sm:py-24 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.08),transparent)]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            À propos de DevCraft
          </h1>
          <p className="mt-6 text-lg text-slate-300">
            Une agence à la fois créative et technique, qui place la confiance et la personnalisation au centre de chaque projet.
          </p>
        </div>
      </section>

      {/* Fondateur */}
      <Section
        title="Fondateur"
        subtitle="Un freelance qui conçoit, développe et accompagne vos projets."
        className="bg-[#f8fafc]"
      >
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-sm ring-2 ring-amber-200/80">
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.35),transparent_60%)]" />
              <span className="relative font-display text-3xl font-bold text-[#0a0e1a]">A</span>
            </div>

            <div className="space-y-2">
              <h2 className="font-display text-2xl font-bold text-[#0a0e1a]">Aleer – Fondateur de DevCraft</h2>
              <p className="text-sm font-medium text-slate-600">Île-de-France</p>
              <p className="text-slate-700">
                Développeur web freelance passionné par la création d&apos;expériences digitales efficaces.
                <br />
                J&apos;accompagne chaque client de A à Z.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Qui suis-je ?"
        subtitle="Je conçois et développe des sites internet professionnels pour les entreprises, les indépendants et les marques qui veulent une présence en ligne crédible et efficace."
      >
        <div className="mx-auto max-w-3xl space-y-6 text-slate-600">
          <p>
            Je crois qu’un bon site ne se résume pas à un template et quelques textes. Il reflète votre activité, répond à vos objectifs et offre une expérience agréable à vos visiteurs. C’est pourquoi je prends le temps d’échanger avec vous avant toute chose : pour comprendre vos besoins, vos contenus et le rendu que vous souhaitez.
          </p>
          <p>
            Que vous ayez besoin d’un site vitrine pour démarrer, d’un site plus complet pour structurer votre offre, d’un espace membre ou d’un projet entièrement sur mesure, je m&apos;adapte. Mon objectif est de vous livrer un site dont vous serez fiers et qui vous ressemble.
          </p>
        </div>
      </Section>

      <Section
        title="Nos valeurs"
        subtitle="Ce qui guide notre façon de travailler au quotidien."
        className="bg-[#f8fafc]"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:border-amber-200 hover:shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  {v.icon}
                </div>
                <h3 className="font-display text-lg font-semibold text-[#0a0e1a]">{v.title}</h3>
              </div>
              <p className="mt-2 text-slate-600">{v.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Travaillons ensemble"
        subtitle="Vous avez un projet en tête ? Contactez-nous pour en discuter. Nous vous répondrons pour définir ensemble la meilleure approche."
        dark
      >
        <div className="flex flex-wrap justify-center gap-4">
          <CTA href="/qualification" variant="secondary" dark>
            Nous contacter
          </CTA>
          <CTA href="/services" variant="outline" dark>
            Voir nos offres
          </CTA>
        </div>
      </Section>

      {/* Ma stack */}
      <Section
        title="Ma stack"
        subtitle="Les technologies que j’utilise pour livrer des sites solides, rapides et modernes."
        className="bg-[#f8fafc]"
      >
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center">
            {["Next.js", "React", "Tailwind", "WordPress", "Figma", "Vercel"].map((tech, idx) => (
              <div key={tech} className="flex items-center gap-2">
                <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0a0e1a] shadow-sm ring-1 ring-amber-200/60">
                  {tech}
                </span>
                {idx !== 5 && <span className="text-[#0a0e1a] text-sm opacity-60">·</span>}
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
