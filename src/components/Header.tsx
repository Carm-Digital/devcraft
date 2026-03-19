"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/methode", label: "Méthode" },
  { href: "/a-propos", label: "À propos" },
  { href: "/faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href.includes("#")) {
      const base = href.split("#")[0] || "/";
      return pathname === base;
    }
    return pathname === href;
  };

  const activeText = scrolled ? "text-amber-600" : "text-[#e5c158]";
  const inactiveText = scrolled ? "text-slate-700 hover:text-[#0a0e1a]" : "text-slate-300 hover:text-white";

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-200 ${
        scrolled
          ? "border-white/10 bg-white/95 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-white/85"
          : "border-white/10 bg-[#0a0e1a]/95 backdrop-blur-md supports-[backdrop-filter]:bg-[#0a0e1a]/90"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-18 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 shrink-0 mr-3 sm:mr-4"
          aria-label="DevCraft Accueil"
        >
          <Logo background="dark" showName={false} disableLink className="shrink-0" />
          <span className="font-display font-bold tracking-tight text-white">DevCraft</span>
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-0.5" aria-label="Navigation principale">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive(link.href)
                  ? `${activeText} bg-white/10`
                  : inactiveText
              } ${
                isActive(link.href)
                  ? "after:absolute after:-bottom-0.5 after:left-3 after:right-3 after:h-0.5 after:rounded-full after:bg-amber-400"
                  : ""
              } ${!isActive(link.href) ? "hover:bg-white/5" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <div className="flex items-end gap-3">
            {/* Contact rapide via email (footer phone peut être trompeur) */}
            <a
              href="mailto:devcraft.store@gmail.com"
              className={`text-xs font-medium transition ${
                scrolled ? "text-slate-600 hover:text-amber-700" : "text-slate-300 hover:text-white"
              }`}
            >
              contact rapide
            </a>
            <div className="flex flex-col items-end">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#b8962e] to-[#c9a227] px-4 py-2.5 text-sm font-semibold text-[#0a0e1a] shadow-lg shadow-amber-900/20 transition hover:from-[#c9a227] hover:to-[#d4af37] hover:shadow-amber-900/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
              >
                Recevoir mon devis gratuit
              </Link>
              <p className={`mt-1 text-[11px] ${scrolled ? "text-slate-500" : "text-slate-400"}`}>
                Réponse sous 24h
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${
            scrolled ? "text-slate-700 hover:bg-slate-100 hover:text-[#0a0e1a]" : "text-slate-300 hover:bg-white/10 hover:text-white"
          } md:hidden`}
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
        <div className="border-t border-white/10 bg-[#0f1420] px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-0.5" aria-label="Navigation mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                  isActive(link.href) ? "bg-white/10 text-amber-400" : "text-slate-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/qualification"
              onClick={() => setMobileOpen(false)}
              className="mt-4 rounded-lg bg-amber-500 px-3 py-2.5 text-center text-sm font-semibold text-[#0a0e1a] shadow-sm"
            >
              Demander un devis
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
