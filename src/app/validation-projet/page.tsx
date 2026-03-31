import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import CTA from "@/components/CTA";
import { OFFER_IDS, getDepositConfig, OFFER_DEPOSITS } from "@/config/deposits";
import type { OfferId } from "@/types/payment";
import PaymentSummaryCard from "@/components/validation-projet/PaymentSummaryCard";
import ValidateLaunchButton from "@/components/validation-projet/ValidateLaunchButton";
import { isStripeConfigured } from "@/lib/stripe/config";

export const metadata: Metadata = {
  title: "Validation du projet — Réserver le lancement",
  description:
    "Confirmez le lancement de votre projet après échange avec DevCraft. Paiement d’acompte en toute confiance. Le solde est défini selon la prestation convenue.",
};

interface PageProps {
  searchParams: Promise<{ offer?: string }>;
}

export default async function ValidationProjetPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const offerParam = params.offer?.toLowerCase();
  const offerId: OfferId | null =
    offerParam && OFFER_IDS.includes(offerParam as OfferId) ? (offerParam as OfferId) : null;

  const stripeReady = isStripeConfigured();

  return (
    <>
      <section className="bg-slate-900 px-4 py-16 text-white sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Validation du projet
          </h1>
          <p className="mt-6 text-lg text-slate-300">
            Votre projet a bien été étudié. Cette étape permet de confirmer le lancement et de réserver la création de votre site.
          </p>
          <p className="mt-4 text-slate-400">
            Le paiement demandé correspond à un acompte de démarrage. La suite du projet sera organisée avec vous selon les éléments validés ensemble.
          </p>
        </div>
      </section>

      {offerId ? (
        <Section className="bg-slate-50">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50/50 p-4 text-center">
              <p className="text-sm text-slate-700">
                Nous vous accompagnons ensuite dans la récupération des contenus, visuels et éléments nécessaires. Chaque projet étant conçu sur mesure, cette validation intervient après échange et cadrage initial.
              </p>
            </div>

            <PaymentSummaryCard
              config={getDepositConfig(offerId)}
              showAmount={getDepositConfig(offerId).amountCents != null}
            />

            <div className="mt-8 flex flex-col items-center gap-6">
              {getDepositConfig(offerId).amountCents != null && stripeReady ? (
                <>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <ValidateLaunchButton offerId={offerId} label="Valider le lancement" variant="primary" />
                    <ValidateLaunchButton offerId={offerId} label="Payer l’acompte" variant="secondary" />
                  </div>
                  <p className="text-center text-sm text-slate-500">
                    Vous serez redirigé vers notre partenaire de paiement sécurisé.
                  </p>
                </>
              ) : getDepositConfig(offerId).amountCents != null && !stripeReady ? (
                <div className="text-center">
                  <p className="text-slate-600">
                    Le paiement en ligne sera bientôt disponible. En attendant, nous vous enverrons un lien de paiement après validation du devis.
                  </p>
                  <CTA href="/formulaire" variant="primary" className="mt-4">
                    Nous contacter pour finaliser
                  </CTA>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-slate-600">
                    Pour un projet personnalisé, l’acompte est défini dans le devis que nous vous avons adressé. Nous vous enverrons un lien de paiement dédié.
                  </p>
                  <CTA href="/contact" variant="primary" className="mt-4">
                    Reprendre contact
                  </CTA>
                </div>
              )}
            </div>
          </div>
        </Section>
      ) : (
        <Section
          title="Choisir votre type de projet"
          subtitle="Sélectionnez l’offre correspondant à votre devis pour accéder au paiement de l’acompte."
        >
          <div className="mx-auto max-w-2xl space-y-4">
            {OFFER_IDS.map((id) => (
              <Link
                key={id}
                href={`/validation-projet?offer=${id}`}
                className="block rounded-xl border border-slate-200 bg-white p-4 transition hover:border-amber-300 hover:shadow-md sm:p-5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {OFFER_DEPOSITS[id].label}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {OFFER_DEPOSITS[id].shortLabel}
                    </p>
                  </div>
                  <span className="text-slate-400">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <Section
        title="Vous n’avez pas encore de devis ?"
        subtitle="Si vous n’avez pas encore échangé avec nous ou validé un devis, commencez par nous décrire votre projet. Nous vous recontactons pour définir ensemble la meilleure approche."
        className="bg-slate-50"
      >
        <div className="flex flex-wrap justify-center gap-4">
          <CTA href="/formulaire" variant="primary">
            Décrire mon projet
          </CTA>
          <CTA href="/contact" variant="outline">
            Nous contacter
          </CTA>
        </div>
      </Section>
    </>
  );
}
