import type { Metadata } from "next";
import Section from "@/components/Section";
import QualificationForm from "@/components/QualificationForm";
import CTA from "@/components/CTA";
import QualificationFormLoadFallback from "@/components/QualificationFormLoadFallback";
import { readSiteContent, toOfferPrices } from "@/lib/siteContent";

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
      <section className="relative overflow-hidden bg-[#0a0e1a] px-4 py-16 text-white sm:px-6 sm:py-24 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.08),transparent)]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Parlez-nous de votre projet
          </h1>
          <p className="mt-6 text-lg text-slate-300">
            Les prix sont clairs dès le départ selon le type de site. Choisissez l’offre qui vous correspond ; nous échangeons avec vous pour valider les détails, vos contenus et vos attentes avant tout lancement.
          </p>
          <p className="mt-4 text-slate-400">
            Plus votre demande est précise, plus notre réponse sera pertinente. Aucun engagement avant échange.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <CTA href="#formulaire" variant="primary" dark>
              Remplir le formulaire
            </CTA>
            <CTA href="#contact" variant="secondary" dark>
              Voir la page contact
            </CTA>
          </div>
        </div>
      </section>

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
