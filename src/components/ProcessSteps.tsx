import Section from "@/components/Section";
import CTA from "@/components/CTA";

/**
 * Aperçu \"Comment ça marche\" pour la page d’accueil.
 * 4 étapes simples : Contact, Analyse, Création, Mise en ligne.
 */
const STEPS = [
  {
    num: 1,
    title: "Contact",
    desc: "Vous nous expliquez votre projet, vos objectifs et votre activité.",
    icon: "M8 10h.01M12 10h.01M16 10h.01M21 10c0 4.418-4.03 8-9 8s-9-3.582-9-8a9 9 0 0118 0z",
  },
  {
    num: 2,
    title: "Analyse",
    desc: "Nous analysons votre activité et définissons la structure et les contenus clés du site.",
    icon: "M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-9 4h10a2 2 0 002-2v-7a2 2 0 00-2-2h-3l-2-3H7l-2 3H2a2 2 0 00-2 2v7a2 2 0 002 2z",
  },
  {
    num: 3,
    title: "Création",
    desc: "Nous concevons votre site avec un design professionnel, responsive et cohérent avec votre image.",
    icon: "M3 7h18M3 7a2 2 0 012-2h14a2 2 0 012 2M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7m-9 8h4",
  },
  {
    num: 4,
    title: "Mise en ligne",
    desc: "Après vos retours et les derniers ajustements, nous mettons le site en ligne.",
    icon: "M5 13l4 4L19 7M5 21h14",
  },
] as const;

export default function ProcessSteps() {
  return (
    <Section
      id="comment-ca-marche"
      title="Comment ça marche"
      subtitle="Un processus simple et rassurant, de la première prise de contact jusqu’à la mise en ligne de votre site."
    >
      <div className="mx-auto max-w-4xl">
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <li
              key={step.num}
              className="group flex flex-col rounded-2xl border border-slate-200/80 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-amber-200 hover:shadow-lg sm:p-6"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 font-display text-sm font-bold text-amber-700">
                  {step.num}
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/90 text-amber-300">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d={step.icon} />
                  </svg>
                </span>
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-[#0a0e1a] group-hover:text-amber-700">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                {step.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
      <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-slate-600">
        À chaque étape, nous échangeons avec vous pour valider les choix avant d’avancer. Le projet ne démarre qu’après validation conjointe.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <CTA href="/methode" variant="primary">
          Voir notre méthode détaillée
        </CTA>
        <CTA href="/#contact" variant="outline">
          Parler de mon projet
        </CTA>
      </div>
    </Section>
  );
}
