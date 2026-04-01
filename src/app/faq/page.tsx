import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import CTA from "@/components/ui/CTA";
import PageHero from "@/components/layout/PageHero";
import { FAQ_ITEMS, PAYMENT_FAQ_ITEMS } from "@/config/faq";

export const metadata: Metadata = {
  title: "FAQ | Questions fréquentes | DevCraft",
  description:
    "Réponses aux questions fréquentes sur les délais, les offres, le contenu nécessaire, les modifications et le paiement. DevCraft vous explique tout.",
};

const allFaqs = (() => {
  // Déduplication par question : on garde la version la plus “complète” (paymentFaqs vient après).
  const map = new Map<string, { q: string; a: string }>();
  [...FAQ_ITEMS, ...PAYMENT_FAQ_ITEMS].forEach((item) => {
    map.set(item.q, item);
  });
  return Array.from(map.values());
})();

export default function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Questions fréquentes"
        description="Réponses aux questions que nos clients nous posent le plus souvent. Si la vôtre n’apparaît pas ici, n’hésitez pas à nous contacter."
      />

      <Section>
        <div className="mx-auto max-w-3xl space-y-4">
          {allFaqs.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-slate-200/80 bg-white shadow-sm transition hover:border-amber-100"
            >
              <summary className="cursor-pointer list-none px-6 py-4 font-display font-medium text-[#0a0e1a] [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between">
                  {item.q}
                  <span className="ml-2 shrink-0 text-slate-400 transition group-open:rotate-180">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </span>
              </summary>
              <div className="border-t border-slate-100 px-6 py-4 text-slate-600">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </Section>

      <Section
        title="Une autre question ?"
        subtitle="Contactez-nous pour toute précision. Nous vous répondrons avec plaisir."
        dark
      >
        <div className="flex flex-wrap justify-center gap-4">
          <CTA href="/formulaire" variant="secondary" dark>
            Parler de mon projet
          </CTA>
          <CTA href="/contact" variant="outline" dark>
            Page contact
          </CTA>
        </div>
      </Section>
    </>
  );
}
