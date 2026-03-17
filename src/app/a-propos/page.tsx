import type { Metadata } from "next";
import Section from "@/components/Section";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "À propos — DevCraft, agence web créative et technique",
  description:
    "DevCraft est une agence web sérieuse, à l’écoute, qui crée des sites sur mesure. Personnalisation, modernité et accompagnement humain au cœur de chaque projet.",
};

const values = [
  {
    title: "Sérieux",
    desc: "Nous nous engageons sur des livrables clairs et des délais réalistes. Pas de promesse impossible, juste un travail soigné.",
  },
  {
    title: "Écoute",
    desc: "Chaque projet commence par comprendre votre besoin, votre activité et vos objectifs. Nous posons les bonnes questions.",
  },
  {
    title: "Personnalisation",
    desc: "Pas de site en série : chaque réalisation est adaptée à son client, à son secteur et à son image.",
  },
  {
    title: "Modernité",
    desc: "Sites responsive, performants et aux standards actuels. Votre présence en ligne doit être à la hauteur.",
  },
  {
    title: "Accompagnement humain",
    desc: "Un interlocuteur dédié, des échanges directs. Nous restons disponibles pour les ajustements et les questions.",
  },
  {
    title: "Souci du détail",
    desc: "Design soigné, textes clairs, expérience utilisateur travaillée. Les détails font la différence.",
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

      <Section
        title="Qui sommes-nous ?"
        subtitle="DevCraft conçoit et développe des sites internet professionnels pour les entreprises, les indépendants et les marques qui veulent une présence en ligne crédible et efficace."
      >
        <div className="mx-auto max-w-3xl space-y-6 text-slate-600">
          <p>
            Nous croyons qu’un bon site ne se résume pas à un template et quelques textes. Il reflète votre activité, répond à vos objectifs et offre une expérience agréable à vos visiteurs. C’est pourquoi nous prenons le temps d’échanger avec vous avant toute chose : pour comprendre vos besoins, vos contenus et le rendu que vous souhaitez.
          </p>
          <p>
            Que vous ayez besoin d’un site vitrine pour démarrer, d’un site plus complet pour structurer votre offre, d’un espace membre ou d’un projet entièrement sur mesure, nous nous adaptons. Notre objectif est de vous livrer un site dont vous serez fiers et qui vous ressemble.
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
              <h3 className="font-display text-lg font-semibold text-[#0a0e1a]">{v.title}</h3>
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
    </>
  );
}
