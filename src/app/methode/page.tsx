import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import CTA from "@/components/CTA";
import MethodeSection from "@/components/MethodeSection";

export const metadata: Metadata = {
  title: "Notre méthode — Comment nous créons votre site",
  description:
    "Comment DevCraft crée votre site : prise de contact, analyse du projet, récupération des contenus, validation, lancement, création, mise en ligne. Paiement en plusieurs étapes. Transparence et accompagnement.",
};

const NEEDS = [
  "Vos informations et objectifs",
  "Vos textes (si disponibles)",
  "Vos photos / visuels",
  "Vos préférences de design",
  "Les fonctionnalités souhaitées",
  "Votre style et votre ton",
];

export default function MethodePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#0a0e1a] px-4 py-16 text-white sm:px-6 sm:py-24 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.08),transparent)]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Notre méthode
          </h1>
          <p className="mt-6 text-lg text-slate-300">
            Un processus clair, de la première prise de contact jusqu’à la mise en ligne. Nous voulons que vous sachiez exactement comment nous travaillons et ce dont nous avons besoin pour avancer.
          </p>
          <p className="mt-4 text-slate-400">
            Chaque site est créé sur mesure. L’échange avec vous précède toujours le lancement du projet.
          </p>
        </div>
      </section>

      <MethodeSection showPayment showCta id="etapes" />

      <Section
        title="De quoi avons-nous besoin pour commencer ?"
        subtitle="Pour créer un site qui vous ressemble, nous nous appuyons sur vos contenus et vos choix. Rien ne part dans le vide : tout est défini avec vous."
        className="bg-[#f8fafc]"
      >
        <div className="mx-auto max-w-2xl">
          <ul className="grid gap-3 sm:grid-cols-2">
            {NEEDS.map((need) => (
              <li
                key={need}
                className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white px-4 py-3 shadow-sm"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100">
                  <svg className="h-4 w-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                {need}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center text-slate-600">
            Pas tout sous la main ? Nous en discutons : certains éléments peuvent être fournis ou précisés au fil du projet.
          </p>
          <div className="mt-8 flex justify-center">
            <CTA href="/qualification" variant="primary">
              Nous contacter pour en parler
            </CTA>
          </div>
        </div>
      </Section>

      <Section
        title="Acompte et validation du projet"
        subtitle="Après validation du devis, un acompte peut être demandé pour lancer le projet. Si nous vous avons envoyé un lien de paiement, vous pouvez l’utiliser sur la page dédiée."
        className="bg-white"
      >
        <div className="mx-auto max-w-xl text-center">
          <Link
            href="/validation-projet"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-amber-500 bg-amber-50 px-5 py-2.5 text-sm font-semibold text-amber-800 transition hover:bg-amber-100"
          >
            Accéder à la page Paiement acompte
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </Section>

      <Section
        title="Prêt à démarrer ?"
        subtitle="La première étape est de nous contacter. Nous vous répondrons pour échanger sur votre projet et définir la suite."
        dark
      >
        <div className="flex flex-wrap justify-center gap-4">
          <CTA href="/qualification" variant="secondary" dark>
            Parler de mon projet
          </CTA>
          <CTA href="/qualification" variant="outline" dark>
            Demander un devis
          </CTA>
        </div>
      </Section>
    </>
  );
}
