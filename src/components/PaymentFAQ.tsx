import Section from "@/components/Section";
import CTA from "@/components/CTA";

const PAYMENT_FAQS = [
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

export default function PaymentFAQ() {
  return (
    <Section
      id="faq-paiement"
      title="FAQ Paiement"
      subtitle="Tout ce que vous devez savoir sur le paiement et l’acompte. Nous privilégions la clarté et la confiance."
      className="bg-[#f8fafc]"
    >
      <div className="mx-auto max-w-3xl space-y-4">
        {PAYMENT_FAQS.map((item) => (
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
      <div className="mt-8 text-center">
        <CTA href="/qualification" variant="outline">
          Parler de mon projet
        </CTA>
      </div>
    </Section>
  );
}
