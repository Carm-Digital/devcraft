import type { Metadata } from "next";
import Section from "@/components/Section";
import PaymentFAQ from "@/components/PaymentFAQ";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "FAQ — Questions fréquentes sur la création de site",
  description:
    "Réponses aux questions fréquentes : délais, différences entre offres, paiement, contenu nécessaire, modifications, responsive. DevCraft vous explique tout.",
};

const faqs = [
  {
    q: "Combien de temps prend la création d'un site ?",
    a: "Cela dépend du type d’offre choisi (vitrine, complet, abonnement, personnalisé) et de la disponibilité de vos contenus. Lors de notre premier échange après votre demande, nous vous indiquons un délai réaliste et nous finalisons ensemble les détails du projet.",
  },
  {
    q: "Quelle différence entre site vitrine et site complet ?",
    a: "Le site vitrine présente votre activité avec les pages essentielles (accueil, présentation, services, contact). Le site complet va plus loin : plus de pages, structure plus riche, fonctionnalités avancées (formulaires, intégrations, etc.) et une expérience utilisateur plus travaillée. Nous vous aidons à choisir selon vos objectifs.",
  },
  {
    q: "Peut-on demander un site totalement sur mesure ?",
    a: "Oui. Notre offre « Site personnalisé » est dédiée aux projets spécifiques : design et fonctionnalités entièrement à la carte, étude détaillée du besoin avant devis et accompagnement renforcé. Nous en discutons ensemble pour voir si c’est la meilleure option pour vous.",
  },
  {
    q: "Comment se passe le paiement ?",
    a: "Les modalités (acompte, échéancier, solde à la livraison) sont définies dans le devis que nous vous adressons après échange. Nous restons transparents sur les montants et les étapes. La question du paiement peut être adaptée selon l’envergure du projet.",
  },
  {
    q: "De quoi avez-vous besoin pour commencer ?",
    a: "D’abord d’un échange avec vous : vos objectifs, le type de site souhaité, les fonctionnalités, vos préférences de style. Ensuite, dans l’idéal : vos textes (ou une base), vos visuels ou photos, votre logo si vous en avez un. Si tout n’est pas prêt, nous pouvons en discuter et avancer par étapes.",
  },
  {
    q: "Puis-je fournir mes textes et mes photos plus tard ?",
    a: "Oui. Nous pouvons structurer le site et préparer les emplacements, puis intégrer vos contenus au fur et à mesure. Nous en parlons ensemble pour organiser le planning et éviter les blocages.",
  },
  {
    q: "Proposez-vous des modifications ?",
    a: "Oui. Des allers-retours sont prévus pendant la phase de design et avant la mise en ligne. Le nombre d’itérations peut être précisé dans le devis selon la complexité du projet. L’objectif est que vous soyez satisfait du rendu final.",
  },
  {
    q: "Le site sera-t-il responsive ?",
    a: "Oui. Tous nos sites sont conçus pour s’afficher correctement sur ordinateur, tablette et mobile. L’expérience utilisateur est pensée pour tous les écrans.",
  },
];

export default function FAQPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#0a0e1a] px-4 py-16 text-white sm:px-6 sm:py-24 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.08),transparent)]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Questions fréquentes
          </h1>
          <p className="mt-6 text-lg text-slate-300">
            Réponses aux questions que nos clients nous posent le plus souvent. Si la vôtre n’apparaît pas ici, n’hésitez pas à nous contacter.
          </p>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-slate-200/80 bg-white shadow-sm transition hover:border-amber-100"
            >
              <summary className="cursor-pointer list-none px-6 py-4 font-display font-medium text-[#0a0e1a] [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between">
                  {item.q}
                  <span className="ml-2 shrink-0 text-slate-400 transition group-open:rotate-180">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </span>
              </summary>
              <div className="border-t border-slate-100 px-6 py-4 text-slate-600">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </Section>

      <PaymentFAQ />

      <Section
        title="Une autre question ?"
        subtitle="Contactez-nous pour toute précision. Nous vous répondrons avec plaisir."
        dark
      >
        <div className="flex flex-wrap justify-center gap-4">
          <CTA href="/qualification" variant="secondary" dark>
            Parler de mon projet
          </CTA>
          <CTA href="/#contact" variant="outline" dark>
            Page contact
          </CTA>
        </div>
      </Section>
    </>
  );
}
