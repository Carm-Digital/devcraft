import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Réalisations — Projets et sites créés par DevCraft",
  description:
    "Découvrez des exemples de sites réalisés par DevCraft : e-commerce, vitrines, sites complets. Chaque projet est unique et adapté au client.",
};

const projects = [
  {
    id: 1,
    name: "Restaurant Le Horizon",
    category: "Site restaurant",
    description:
      "Site pour restaurant avec carte en ligne, réservation, mise en avant des avis et belles photos de l’établissement.",
    image: "from-amber-100 to-amber-200",
  },
  {
    id: 2,
    name: "Move & Perform",
    category: "Site coach sportif",
    description:
      "Site pour coach sportif : présentation des offres, planning de séances, formulaire de contact et témoignages clients.",
    image: "from-blue-100 to-blue-200",
  },
  {
    id: 3,
    name: "Atelier des Créateurs",
    category: "Site artisan",
    description:
      "Site pour artisan : galerie de réalisations, mise en avant du savoir‑faire, explication des services et contact simple.",
    image: "from-slate-100 to-slate-200",
  },
  {
    id: 4,
    name: "Nova Boutique",
    category: "Boutique en ligne",
    description:
      "Site e‑commerce avec catalogue produits, panier, paiement en ligne sécurisé et pages dédiées à l’histoire de la marque.",
    image: "from-emerald-100 to-emerald-200",
  },
];

export default function RealisationsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#0a0e1a] px-4 py-16 text-white sm:px-6 sm:py-24 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.08),transparent)]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Réalisations
          </h1>
          <p className="mt-6 text-lg text-slate-300">
            Quelques projets que nous avons accompagnés. Chaque site est conçu sur mesure pour son client : objectifs, contenus et design sont adaptés à chaque contexte.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.id}
              className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition hover:shadow-lg"
            >
              <div className={`aspect-video bg-gradient-to-br ${project.image}`} />
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">
                  {project.category}
                </p>
                <h2 className="mt-2 font-display text-xl font-semibold text-[#0a0e1a]">{project.name}</h2>
                <p className="mt-2 text-sm text-slate-600">{project.description}</p>
                <Link
                  href="/qualification"
                  className="mt-4 inline-flex items-center text-sm font-medium text-slate-900 transition group-hover:text-amber-600"
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
          <CTA href="/qualification" variant="secondary" dark>
            Parler de mon projet
          </CTA>
        </div>
      </Section>
    </>
  );
}
