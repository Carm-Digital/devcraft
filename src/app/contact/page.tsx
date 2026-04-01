import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import CTA from "@/components/ui/CTA";
import PageHero from "@/components/layout/PageHero";
import ExchangeForm from "@/components/forms/ExchangeForm";
import { SOCIAL_LINKS, type SocialIconId } from "@/config/social";

export const metadata: Metadata = {
  title: "Contact | DevCraft",
  description:
    "Contactez DevCraft pour votre projet web : échange sans engagement et réponse rapide.",
};

function SocialIcon({ icon }: { icon: SocialIconId }) {
  if (icon === "instagram") {
    return (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          className="fill-current"
        />
        <circle
          cx="12"
          cy="12"
          r="3.5"
          className="fill-[#0a0e1a]"
        />
        <circle
          cx="17"
          cy="7"
          r="1"
          className="fill-[#0a0e1a]"
        />
      </svg>
    );
  }

  if (icon === "tiktok") {
    return (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          className="fill-current"
          d="M15.5 4.5c.6 1.1 1.6 2 2.8 2.5V9c-1.3-.1-2.5-.6-3.6-1.4v6.2c0 2.7-2.1 4.9-4.9 4.9A4.9 4.9 0 015 13.8c0-2.7 2.1-4.9 4.8-4.9.4 0 .8 0 1.1.1v2.4a3 3 0 00-1.1-.2 2.5 2.5 0 102.5 2.5V3.5h3.2v1z"
        />
      </svg>
    );
  }

  if (icon === "twitter") {
    return (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          className="fill-current"
          d="M5 4h4.1l3.2 4.8L15.8 4H19l-5.2 7.4L19.5 20h-4.1l-3.5-5.1L8 20H4.5L10 12.4 5 4z"
        />
      </svg>
    );
  }

  // snapchat
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        className="fill-current"
        d="M12 3c2.1 0 3.7 1.5 3.9 3.5l.2 2.6c.1.9.6 1.6 1.4 2 .3.1.5.3.5.6 0 .4-.3.7-.7.8-1 .2-1.7.5-2.2.9.3.6.8 1 1.6 1.3.4.1.6.4.6.8 0 .5-.4.9-.9.9-.2 0-.4 0-.7-.1-.6-.2-1.2-.4-1.9-.4-.5 0-1 .1-1.6.4-.6.3-1.1.4-1.7.4s-1.1-.1-1.7-.4c-.6-.3-1.1-.4-1.6-.4-.7 0-1.3.2-1.9.4-.3.1-.5.1-.7.1a.9.9 0 01-.9-.9c0-.4.2-.7.6-.8.8-.3 1.3-.7 1.6-1.3-.5-.4-1.2-.7-2.2-.9-.4-.1-.7-.4-.7-.8 0-.3.2-.5.5-.6.8-.4 1.3-1.1 1.4-2l.2-2.6C8.3 4.5 9.9 3 12 3z"
      />
    </svg>
  );
}

export default function ContactPage() {
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
          {SOCIAL_LINKS.map((item) => (
            <a
              key={item.name}
              href={item.href}
              aria-label={item.name}
              className="group flex h-12 w-12 items-center justify-center rounded-full bg-[#0a0e1a] text-slate-100 transition hover:bg-[#F1E83B] hover:text-[#0a0e1a]"
            >
              <SocialIcon icon={item.icon} />
            </a>
          ))}
        </div>
      </Section>

      {/* 3. FORMULAIRE D'ÉCHANGE */}
      <Section
        id="echange"
        title="Réservez un échange"
        subtitle="Remplissez le formulaire, on vous propose un créneau rapidement."
        className="bg-slate-50"
      >
        <div className="mx-auto max-w-3xl">
          <ExchangeForm />
        </div>
      </Section>
    </>
  );
}
