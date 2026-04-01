import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import QualificationForm from "@/components/forms/QualificationForm";
import QualificationFormLoadFallback from "@/components/forms/QualificationFormLoadFallback";
import { readSiteContent, toOfferPrices } from "@/lib/siteContent";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Demande de devis — Parlez-nous de votre projet",
  description:
    "Choisissez votre offre (vitrine 300 €, complet 900 €, abonnement 1300 €, personnalisé sur devis). DevCraft vous recontacte pour valider les détails avant lancement.",
};

export default async function QualificationPage() {
  const content = await readSiteContent();
  const offerPrices = toOfferPrices(content);

  return (
    <>
      <PageHero
        eyebrow="Demande de devis"
        title="Parlez-nous de votre projet"
        description="Les prix sont clairs dès le départ selon le type de site. Choisissez l’offre qui vous correspond ; nous échangeons avec vous pour valider les détails avant tout lancement."
        secondaryDescription="Plus votre demande est précise, plus notre réponse sera pertinente. Aucun engagement avant échange."
      />

      <Section id="formulaire" className="bg-[#f8fafc]">
        <div id="contact" className="mx-auto max-w-3xl">
          <p className="mb-6 text-sm text-slate-600 text-center sm:text-left">
            Plus votre demande est précise, plus nous pourrons vous proposer une solution adaptée.
          </p>
          <div id="qualification-form-root">
            <QualificationForm offerPrices={offerPrices} />
          </div>

          <noscript>
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-left text-slate-700">
              Le formulaire ne se charge pas ? Écrivez-nous directement :{" "}
              <a href="mailto:devcraft.store@gmail.com" className="font-semibold text-amber-800">
                devcraft.store@gmail.com
              </a>
              .
            </div>
          </noscript>
        </div>
      </Section>

      <QualificationFormLoadFallback />
    </>
  );
}
