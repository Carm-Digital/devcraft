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
      {/* Timeline verticale des 7 étapes */}
      <div className="relative mx-auto max-w-4xl">
        {/* Ligne de progression */}
        <div className="absolute left-5 top-0 bottom-0 w-px bg-slate-200" aria-hidden />

        <ul className="space-y-8 sm:space-y-10">
          {METHODE_STEPS.map((step) => (
            <li key={step.num} className="relative grid grid-cols-12 gap-4 sm:gap-6">
              {/* Colonne gauche : numéro */}
              <div className="col-span-2 sm:col-span-1">
                <div className="sticky top-24">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 text-amber-700 shadow-sm">
                      <span className="font-display text-xl font-bold">{step.num}</span>
                      <span className="absolute -bottom-3 left-1/2 h-6 w-0.5 -translate-x-1/2 bg-slate-200 sm:hidden" aria-hidden />
                    </span>
                    <span className="hidden sm:flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-slate-200/70 text-amber-600 shadow-sm">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              {/* Contenu */}
              <div className="col-span-10 sm:col-span-11">
                <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
                  <h3 className="font-display text-xl font-bold text-[#0a0e1a]">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-slate-600">{step.desc}</p>
                </div>

                {/* Encadré après l’étape 3 */}
                {step.num === 3 && (
                  <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                    <p className="text-sm font-semibold text-slate-800">
                      Vous n&apos;avez pas encore tous vos contenus ? Pas de problème — nous pouvons avancer par étapes et intégrer les éléments au fur et à mesure.
                    </p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Délais typiques */}
      <div className="mx-auto mt-14 max-w-4xl">
        <div className="rounded-2xl border border-slate-200/80 bg-[#f8fafc] p-6 sm:p-8">
          <h3 className="font-display text-xl font-semibold text-[#0a0e1a]">Délais typiques</h3>
          <p className="mt-2 text-sm text-slate-600">
            Estimations pour les projets standards. Le délai final dépend de la disponibilité des contenus et des validations.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-[#0a0e1a]">
                    Type de site
                  </th>
                  <th className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-[#0a0e1a]">
                    Délai estimé
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b border-slate-100 px-4 py-3 text-sm text-slate-700">Site vitrine</td>
                  <td className="border-b border-slate-100 px-4 py-3 text-sm text-slate-700">5 à 7 jours</td>
                </tr>
                <tr>
                  <td className="border-b border-slate-100 px-4 py-3 text-sm text-slate-700">Site complet</td>
                  <td className="border-b border-slate-100 px-4 py-3 text-sm text-slate-700">10 à 14 jours</td>
                </tr>
                <tr>
                  <td className="border-b border-slate-100 px-4 py-3 text-sm text-slate-700">Site abonnement</td>
                  <td className="border-b border-slate-100 px-4 py-3 text-sm text-slate-700">2 à 3 semaines</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-slate-700">Sur mesure</td>
                  <td className="px-4 py-3 text-sm text-slate-700">Sur devis</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
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
