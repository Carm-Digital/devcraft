import type { Metadata } from "next";
import Section from "@/components/Section";
import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";
import { readSiteContent } from "@/lib/siteContent";

export const metadata: Metadata = {
  title: "Contact | DevCraft",
  description:
    "Contactez DevCraft pour votre projet web : devis gratuit, échange sans engagement et réponse sous 24–48 h.",
};

export default async function ContactPage() {
  const content = await readSiteContent();

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Parlons de votre projet"
        description="Une même entrée pour vos questions, votre besoin ou une demande de devis."
        secondaryDescription="Réponse sous 24–48 h ouvrées. Aucun engagement avant échange et devis."
        actions={[
          { href: "/formulaire", label: "Demander un devis", variant: "primary" },
          { href: "#coordonnees", label: "Continuer sur cette page", variant: "outline" },
        ]}
      />

      <Section id="coordonnees" title="Prêt à lancer votre projet ?" subtitle={content.contactText}>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <CTA href="/formulaire" variant="primary">
            Demander un devis
          </CTA>
          <CTA href="/a-propos" variant="outline">
            En savoir plus sur nous
          </CTA>
        </div>
        <p className="mt-8 text-center text-sm text-slate-500">
          Réponse sous 24–48 h ouvrées. Aucun engagement avant échange et devis.
        </p>
      </Section>
    </>
  );
}
