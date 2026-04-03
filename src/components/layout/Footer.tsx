import Link from "next/link";
import Logo from "@/components/layout/Logo";
import SocialNetworkIcon from "@/components/social/SocialNetworkIcon";
import { readSiteContent } from "@/lib/siteContent";
import type { SiteSocialLinks } from "@/lib/siteContent";

const FOOTER_SOCIAL: { field: keyof SiteSocialLinks; label: string }[] = [
  { field: "instagram", label: "Instagram DevCraft" },
  { field: "tiktok", label: "TikTok DevCraft" },
  { field: "twitter", label: "X (Twitter) DevCraft" },
  { field: "snapchat", label: "Snapchat DevCraft" },
];

const footerLinks = {
  navigation: [
    { href: "/", label: "Accueil" },
    { href: "/formulaire", label: "Demander un devis" },
    { href: "/a-propos", label: "À Propos" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
    { href: "/reglement-devis", label: "Règlement devis" },
  ],
  contact: {
    email: "devcraft.store@gmail.com",
  },
};

export default async function Footer() {
  const content = await readSiteContent();

  return (
    <footer className="border-t border-white/10 bg-[#0d0f14]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <Logo background="dark" href="/" className="mb-4 inline-block" nameColor="text-white" />
            <p className="text-sm leading-relaxed text-slate-400">
              {content.footerText}
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-12">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#00D4FF]/90">Navigation</h3>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {footerLinks.navigation.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition hover:text-[#00D4FF]/90"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#00D4FF]/90">Contact</h3>
              <div className="mt-4 text-sm text-slate-400">
                <a
                  href={`mailto:${footerLinks.contact.email}`}
                  className="inline-block font-semibold text-[#00D4FF]/90 transition hover:text-[#00D4FF]/100"
                >
                  {footerLinks.contact.email}
                </a>
                <p className="mt-1 text-sm text-slate-400">Disponible sous 24h</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                {FOOTER_SOCIAL.map(({ field, label }) => {
                  const href = content.socialLinks[field].trim() || "#";
                  return (
                    <a
                      key={field}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 transition hover:text-[#00D4FF]/90"
                      aria-label={label}
                    >
                      <SocialNetworkIcon field={field} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} DevCraft - Tous droits réservés
        </div>
      </div>
    </footer>
  );
}

