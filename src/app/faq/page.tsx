import type { Metadata } from "next";
import Section from "@/components/Section";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "FAQ | Questions fréquentes | DevCraft",
  description:
    "Réponses aux questions fréquentes sur les délais, les offres, le contenu nécessaire, les modifications et le paiement. DevCraft vous explique tout.",
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

const paymentFaqs = [
  {
    q: "Comment se passe le paiement ?",
    a: "Les modalités sont définies dans le devis que nous vous adressons après échange : acompte éventuel, échéancier, solde à la livraison. Nous restons transparents sur les montants et les étapes. Le paiement n’est jamais une surprise.",
  },
  {
    q: "Dois-je payer avant le début du projet ?",
    a: "Un acompte peut être demandé après validation du devis et avant le démarrage des travaux. Cela sécurise l’engagement des deux parties. Les conditions exactes sont indiquées dans chaque proposition.",
  },
  {
    q: "Pourquoi payer un acompte ?",
    a: "L’acompte permet de réserver le lancement de votre projet et de valider officiellement notre collaboration. Il est adapté à l’envergure du projet et toujours précisé dans le devis. C’est une étape de validation, pas un achat anonyme.",
  },
  {
    q: "L’acompte lance-t-il directement le projet ?",
    a: "Oui. Une fois l’acompte enregistré, votre projet entre en phase de préparation. Nous revenons vers vous pour organiser la récupération de vos contenus, visuels et préférences, puis nous lançons la conception et le développement.",
  },
  {
    q: "Que se passe-t-il après le paiement ?",
    a: "Vous recevez une confirmation. Nous vous recontactons pour les prochaines étapes : récupération des contenus, planning détaillé, lancement de la phase design. Vous êtes tenu informé à chaque étape clé.",
  },
  {
    q: "Le paiement final est-il inclus ?",
    a: "Le solde ou la suite de la facturation est défini selon la prestation convenue dans le devis. Les modalités (échéancier, solde à la livraison, etc.) vous sont précisées avant tout engagement.",
  },
  {
    q: "Peut-on ajuster le projet ensuite ?",
    a: "Oui. Des allers-retours sont prévus pendant la phase de design et avant la mise en ligne. Le nombre d’itérations peut être précisé dans le devis. L’objectif est que vous soyez satisfait du rendu final.",
  },
  {
    q: "Comment fonctionne un site avec abonnement ?",
    a: "Pour un site avec espace membre ou formules récurrentes, nous définissons ensemble le modèle (tarifs, durée, fonctionnalités). Un acompte ou des frais de mise en route peuvent être demandés ; la facturation récurrente est ensuite gérée selon nos échanges.",
  },
  {
    q: "Le paiement se fait-il avant ou après échange ?",
    a: "Toujours après échange. Nous devons d’abord échanger avec vous sur vos besoins, vos contenus et vos objectifs, puis vous adresser une proposition et un devis. Aucun paiement n’est demandé avant cette validation.",
  },
];

const allFaqs = (() => {
  // Déduplication par question : on garde la version la plus “complète” (paymentFaqs vient après).
  const map = new Map<string, { q: string; a: string }>();
  [...faqs, ...paymentFaqs].forEach((item) => {
    map.set(item.q, item);
  });
  return Array.from(map.values());
})();

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
          {allFaqs.map((item) => (
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
