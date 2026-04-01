import type { Metadata } from "next";
import CTA from "@/components/ui/CTA";
import { OFFER_IDS } from "@/config/deposits";
import type { OfferId } from "@/types/payment";

export const metadata: Metadata = {
  title: "Paiement interrompu",
  description: "Le paiement a été annulé ou interrompu. Vous pouvez reprendre quand vous le souhaitez ou nous contacter.",
};

interface PageProps {
  searchParams: Promise<{ offer?: string }>;
}

export default async function PaiementAnnulePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const offerParam = params.offer?.toLowerCase();
  const offerId: OfferId | null =
    offerParam && OFFER_IDS.includes(offerParam as OfferId) ? (offerParam as OfferId) : null;
  const retryHref = offerId ? `/validation-projet?offer=${offerId}` : "/validation-projet";

  return (
    <section className="min-h-[80vh] bg-gradient-to-b from-slate-50 to-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-500">
          <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="mt-8 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Paiement interrompu
        </h1>
        <p className="mt-4 text-slate-600">
          Vous avez annulé le paiement ou quitté la page. Aucun prélèvement n’a été effectué. Vous pouvez reprendre le paiement quand vous le souhaitez ou nous contacter pour toute question.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <CTA href={retryHref} variant="primary">
            Reprendre le paiement
          </CTA>
          <CTA href="/contact" variant="outline">
            Nous contacter
          </CTA>
          <CTA href="/" variant="ghost">
            Retour à l’accueil
          </CTA>
        </div>
      </div>
    </section>
  );
}
