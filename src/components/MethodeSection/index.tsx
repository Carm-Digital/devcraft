import Section from "@/components/Section";
import CTA from "@/components/CTA";
import { METHODE_STEPS, PAYMENT_STEPS } from "./stepsData";

interface MethodeSectionProps {
  /** Afficher le bloc paiement */
  showPayment?: boolean;
  /** Afficher le CTA final */
  showCta?: boolean;
  /** ID de la section */
  id?: string;
}

export default function MethodeSection({
  showPayment = true,
  showCta = true,
  id = "comment-ca-marche",
}: MethodeSectionProps) {
  return (
    <Section
      id={id}
      title="Comment ça marche"
      subtitle="Un processus clair et rassurant, de la première prise de contact jusqu’à la mise en ligne. Chaque étape est expliquée pour que vous sachiez exactement comment nous travaillons."
    >
      {/* Timeline des 7 étapes */}
      <div className="relative mx-auto max-w-3xl">
        {/* Ligne verticale (desktop) */}
        <div
          className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200 hidden sm:block"
          aria-hidden
        />
        <ul className="space-y-10 sm:space-y-12">
          {METHODE_STEPS.map((step) => (
            <li key={step.num} className="relative flex gap-6 sm:gap-8">
              {/* Cercle + icône */}
              <span
                className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-amber-500 bg-white text-amber-600 shadow-sm"
                aria-hidden
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                </svg>
              </span>
              {/* Contenu */}
              <div className="flex-1 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:border-amber-200 hover:shadow-lg sm:p-6">
                <span className="inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800">
                  Étape {step.num}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold text-[#0a0e1a]">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-600">{step.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Sous-section Paiement */}
      {showPayment && (
        <div className="mx-auto mt-16 max-w-3xl">
          <div className="rounded-2xl border border-slate-200/80 bg-[#f8fafc] p-6 sm:p-8">
            <h3 className="font-display text-xl font-semibold text-[#0a0e1a]">
              Comment fonctionne le paiement
            </h3>
            <p className="mt-4 text-slate-600">
              Chaque projet étant différent, le paiement se fait généralement en plusieurs étapes :
            </p>
            <ol className="mt-6 space-y-3">
              {PAYMENT_STEPS.map((label, i) => (
                <li key={label} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-800">
                    {i + 1}
                  </span>
                  <span className="text-slate-700">{label}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-slate-600">
              Ce fonctionnement sécurise le projet pour vous et pour DevCraft : le cadre est clair, les étapes sont définies ensemble, et chacun avance en confiance.
            </p>
          </div>
        </div>
      )}

      {/* CTA final */}
      {showCta && (
        <div className="mx-auto mt-16 max-w-2xl text-center">
          <p className="text-lg text-slate-600">
            Chaque projet est étudié sur mesure. Contactez-nous pour discuter de votre besoin et lancer la création de votre site.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <CTA href="/qualification" variant="primary">
              Parler de mon projet
            </CTA>
            <CTA href="/qualification" variant="outline">
              Demander un devis
            </CTA>
          </div>
        </div>
      )}
    </Section>
  );
}
