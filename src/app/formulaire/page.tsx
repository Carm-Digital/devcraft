import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import QualificationForm from "@/components/forms/QualificationForm";
import QualificationFormLoadFallback from "@/components/forms/QualificationFormLoadFallback";
import { readSiteContent, toOfferPrices } from "@/lib/siteContent";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Demande de devis — Parlez-nous de votre projet",
  description:
    "Décrivez votre projet en quelques minutes. DevCraft analyse votre demande et vous recontacte rapidement avec une proposition adaptée.",
};

export default async function QualificationPage() {
  const content = await readSiteContent();
  const offerPrices = toOfferPrices(content);

  return (
    <>
      <PageHero
        eyebrow="Demande de devis"
        title="Dites-nous ce que vous avez en tête"
        description="Répondez à quelques questions sur votre projet. On analyse votre demande et on revient vers vous avec une proposition claire."
        secondaryDescription="Les fourchettes de budget sont indicatives — elles nous aident à mieux cadrer votre projet. Aucun engagement avant échange."
      />

      <Section id="formulaire" className="bg-[#f8fafc]">
        <div id="contact" className="mx-auto max-w-3xl">
          <p className="mb-6 text-sm text-slate-600 text-center sm:text-left">
            Plus votre demande est précise, plus notre retour sera utile.
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
