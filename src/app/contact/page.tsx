import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import PageHero from "@/components/layout/PageHero";
import ExchangeForm from "@/components/forms/ExchangeForm";
import type { SiteSocialLinks } from "@/lib/siteContent";
import { readSiteContent } from "@/lib/siteContent";
import SocialNetworkIcon from "@/components/social/SocialNetworkIcon";

const CONTACT_SOCIAL_ITEMS: {
  name: string;
  field: keyof SiteSocialLinks;
}[] = [
  { name: "Instagram", field: "instagram" },
  { name: "TikTok", field: "tiktok" },
  { name: "Twitter / X", field: "twitter" },
  { name: "Snapchat", field: "snapchat" },
];

export const metadata: Metadata = {
  title: "Contact | DevCraft",
  description:
    "Contactez DevCraft pour votre projet web : échange sans engagement et réponse rapide.",
};

export default async function ContactPage() {
  const content = await readSiteContent();

  return (
    <>
      {/* 1. HERO */}
      <PageHero
        eyebrow="Contact"
        title="On est là"
        description="Une question, un projet, une idée — on vous répond sous 24 heures."
      />

      {/* 2. RÉSEAUX SOCIAUX */}
      <Section
        title="Retrouvez-nous"
        subtitle="Suivez-nous ou écrivez-nous là où c’est le plus simple pour vous."
      >
        <div className="mx-auto flex max-w-xl flex-wrap items-center justify-center gap-4">
          {CONTACT_SOCIAL_ITEMS.map((item) => {
            const itemWithHref = { ...item, href: content.socialLinks[item.field].trim() };
            if (!itemWithHref.href?.startsWith("http")) return null;
            return (
              <a
                key={item.field}
                href={itemWithHref.href}
                aria-label={item.name}
                className="group flex h-12 w-12 items-center justify-center rounded-full bg-[#0d0f14] text-slate-100 transition hover:bg-[#00D4FF] hover:text-[#0d0f14]"
              >
                <SocialNetworkIcon field={item.field} />
              </a>
            );
          })}
        </div>
      </Section>

      {/* 3. FORMULAIRE D'ÉCHANGE */}
      <Section
        id="echange"
        title="Réservez un échange"
        subtitle="Remplissez le formulaire, on vous propose un créneau rapidement."
        className="bg-[#F5F4F0]"
      >
        <div className="mx-auto max-w-3xl">
          <ExchangeForm />
        </div>
      </Section>
    </>
  );
}
