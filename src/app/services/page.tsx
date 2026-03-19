import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import CTA from "@/components/CTA";
import { buildOffers } from "@/lib/offers";
import { readSiteContent, toOfferPrices } from "@/lib/siteContent";

export const metadata: Metadata = {
  title: "Nos offres web | Site vitrine, e-commerce, sur mesure | DevCraft",
  description:
    "DevCraft conçoit des sites vitrine, e-commerce, sur mesure. Tarifs clairs et devis gratuit sous 24h.",
};

const offerIds = ["vitrine", "complet", "abonnement", "personnalise"] as const;

export default async function ServicesPage() {
  const content = await readSiteContent();
  const OFFERS = buildOffers(toOfferPrices(content));
  const offers = offerIds.map((id) => OFFERS[id]);

  return (
    <>
      <section className="relative overflow-hidden bg-[#0a0e1a] px-4 py-16 text-white sm:px-6 sm:py-24 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.08),transparent)]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Nos offres
          </h1>
          <p className="mt-6 text-lg text-slate-300">
            {content.servicesText}
          </p>
          <p className="mt-4 text-slate-400">
            Choisissez l’offre qui vous correspond, envoyez-nous votre demande : nous vous recontactons pour valider le projet.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
            <CTA href="/qualification#formulaire" variant="primary" dark>
              Demander un devis
            </CTA>
            <CTA href="/qualification#formulaire" variant="secondary" dark>
              Parler de mon projet
            </CTA>
          </div>
        </div>
      </section>

      {/* Récapitulatif des tarifs */}
      <section className="border-b border-slate-200/80 bg-[#f8fafc] py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-center text-2xl font-bold text-[#0a0e1a] sm:text-3xl">
            Tarifs
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-slate-600">
            Prix affichés selon le type de site. Le projet sera validé avec vous avant lancement.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {offerIds.map((id) => {
              const info = OFFERS[id];
              return (
                <div
                  key={id}
                  className="flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:border-amber-200 hover:shadow-lg"
                >
                  <p className="font-display font-semibold text-[#0a0e1a]">{info.label}</p>
                  <p className="mt-2 font-display text-2xl font-bold tracking-tight text-amber-600">
                    {info.price}
                  </p>
                  <Link
                    href={`/qualification?offer=${id}#formulaire`}
                    className="mt-6"
                  >
                    <span className="inline-flex items-center justify-center rounded-xl bg-[#0a0e1a] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#111827] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500">
                      Choisir cette offre
                    </span>
                  </Link>
                  <p className="mt-4 text-center text-sm text-slate-600">Devis gratuit · Sans engagement</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="bg-white">
        {offers.map((offer, index) => {
          return (
            <section
              key={offer.id}
              id={offer.id}
              className={`border-b border-slate-200/80 py-16 sm:py-20 ${
                index % 2 === 1 ? "bg-[#f8fafc]" : "bg-white"
              }`}
            >
              <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">
                      Offre {index + 1}
                    </p>
                    <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#0a0e1a] sm:text-4xl">
                      {offer.label}
                    </h2>
                    <p className="mt-3 font-display text-2xl font-bold text-amber-600">
                      {offer.price}
                    </p>
                    <p className="mt-4 text-lg text-slate-600">{offer.tagline}</p>
                    <p className="mt-4 text-slate-600">{offer.description}</p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <CTA
                        href={`/qualification?offer=${offer.id}#formulaire`}
                        variant="primary"
                      >
                        Choisir cette offre
                      </CTA>
                      <CTA
                        href={`/qualification?offer=${offer.id}#formulaire`}
                        variant="outline"
                      >
                        Demander ce site
                      </CTA>
                    </div>
                  </div>
                <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm lg:p-8">
                  <h3 className="font-display font-semibold text-[#0a0e1a]">Ce que vous en retirez</h3>
                    <ul className="mt-4 space-y-3">
                      {offer.features.map((feature) => (
                        <li key={feature} className="flex gap-3 text-slate-600">
                          <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100">
                            <svg className="h-3 w-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 text-sm text-slate-600">Devis gratuit · Sans engagement</p>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <Section
        title="Un projet en tête ?"
        subtitle="Choisissez l’offre qui correspond à votre besoin. Une fois votre demande envoyée, nous vous recontactons pour valider les détails de votre projet avant lancement."
        dark
      >
        <div className="flex flex-wrap justify-center gap-4">
          <CTA href="/qualification#formulaire" variant="secondary" dark>
            Demander un devis
          </CTA>
          <CTA href="/methode" variant="outline" dark>
            Voir notre méthode
          </CTA>
        </div>
      </Section>
    </>
  );
}
