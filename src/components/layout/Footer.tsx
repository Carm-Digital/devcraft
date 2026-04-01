import Link from "next/link";
import Logo from "@/components/layout/Logo";
import { readSiteContent } from "@/lib/siteContent";

const footerLinks = {
  navigation: [
    { href: "/", label: "Accueil" },
    { href: "/formulaire", label: "Demander un devis" },
    { href: "/a-propos", label: "À propos" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
    { href: "/validation-projet", label: "Paiement acompte" },
  ],
  contact: {
    email: "devcraft.store@gmail.com",
  },
};

export default async function Footer() {
  const content = await readSiteContent();

  return (
    <footer className="border-t border-white/10 bg-[#0a0e1a]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <Logo background="dark" href="/" className="mb-4 inline-block" />
            <p className="text-sm leading-relaxed text-slate-400">
              {content.footerText}
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-12">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#F1E83B]/90">Navigation</h3>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {footerLinks.navigation.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition hover:text-[#F1E83B]/90"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#F1E83B]/90">Contact</h3>
              <div className="mt-4 text-sm text-slate-400">
                <a
                  href={`mailto:${footerLinks.contact.email}`}
                  className="inline-block font-semibold text-[#F1E83B]/90 transition hover:text-[#F1E83B]/100"
                >
                  {footerLinks.contact.email}
                </a>
                <p className="mt-1 text-sm text-slate-400">Disponible sous 24h</p>
              </div>
              <div className="mt-4 flex gap-3">
                <a
                  href="https://www.instagram.com/devcraft.store/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 transition hover:text-[#F1E83B]/90"
                  aria-label="Instagram DevCraft"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
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

