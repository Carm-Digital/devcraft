"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "@/components/layout/Logo";
import CTA from "@/components/ui/CTA";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href.includes("#")) {
      const base = href.split("#")[0] || "/";
      return pathname === base;
    }
    return pathname === href;
  };

  const inactiveText = "text-slate-300 hover:text-white";

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur-md supports-[backdrop-filter]:bg-black/40"
      style={{ backgroundColor: "var(--color-nuit)" }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-18 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 shrink-0 mr-3 sm:mr-4"
          aria-label="DevCraft Accueil"
        >
          <Logo background="dark" showName={false} disableLink className="h-12 w-12 shrink-0" />
          <span className="font-display font-bold tracking-tight text-white">DevCraft</span>
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-0.5" aria-label="Navigation principale">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive(link.href) ? "text-accent bg-white/10" : inactiveText
              } ${
                isActive(link.href)
                  ? "after:absolute after:-bottom-0.5 after:left-3 after:right-3 after:h-0.5 after:rounded-full after:bg-accent"
                  : ""
              } ${!isActive(link.href) ? "hover:bg-white/5" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <CTA href="/formulaire" variant="primary">
            Démarrer un projet
          </CTA>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-300 hover:bg-white/10 hover:text-white md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label="Menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-nuit px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-0.5" aria-label="Navigation mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                  isActive(link.href) ? "bg-white/10 text-accent" : "text-slate-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/formulaire"
              onClick={() => setMobileOpen(false)}
              className="mt-4 rounded-lg bg-accent px-3 py-2.5 text-center text-sm font-semibold text-nuit shadow-sm"
            >
              Demander un devis
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

