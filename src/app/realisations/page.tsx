import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/ui/Section";
import CTA from "@/components/ui/CTA";
import PageHero from "@/components/layout/PageHero";
import { REALISATIONS } from "@/config/realisations";

export const metadata: Metadata = {
  title: "Réalisations — Projets et sites créés par DevCraft",
  description:
    "Découvrez des exemples de sites réalisés par DevCraft : e-commerce, vitrines, sites complets. Chaque projet est unique et adapté au client.",
};

export default function RealisationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projets DevCraft"
        title="Réalisations"
        description="Quelques projets que nous avons accompagnés. Chaque site est conçu sur mesure selon les objectifs, les contenus et le contexte du client."
      />

      <Section>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {REALISATIONS.map((project) => (
            <article
              key={project.id}
              className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition hover:shadow-lg"
            >
              <div className={`aspect-video bg-gradient-to-br ${project.image}`} />
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#F1E83B]">
                  {project.category}
                </p>
                <h2 className="mt-2 font-display text-xl font-semibold text-[#0a0e1a]">{project.name}</h2>
                <p className="mt-2 text-sm text-slate-600">{project.description}</p>
                <Link
                  href="/formulaire"
                  className="mt-4 inline-flex items-center text-sm font-medium text-slate-900 transition group-hover:text-[#F1E83B]"
                >
                  Parler de mon projet
                  <svg className="ml-1 h-4 w-4 transition group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-slate-500">
          Ces projets sont des exemples de notre travail. Chaque nouveau site est unique et adapté à votre demande.
        </p>
      </Section>

      <Section
        title="Un projet similaire ?"
        subtitle="Contactez-nous pour échanger sur votre projet. Nous étudions chaque demande avec attention."
        dark
      >
        <div className="flex justify-center">
          <CTA href="/formulaire" variant="secondary" dark>
            Parler de mon projet
          </CTA>
        </div>
      </Section>
    </>
  );
}
