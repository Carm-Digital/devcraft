import CTA from "@/components/ui/CTA";

type HeroAction = {
  href: string;
  label: string;
  variant?: "primary" | "secondary" | "outline";
};

type PageHeroProps = {
  title: string;
  description: string;
  eyebrow?: string;
  secondaryDescription?: string;
  actions?: HeroAction[];
};

export default function PageHero({
  title,
  description,
  eyebrow,
  secondaryDescription,
  actions = [],
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#0a0e1a] px-4 py-16 text-white sm:px-6 sm:py-24 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.08),transparent)]" />
      <div className="relative mx-auto max-w-3xl text-center">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300/90">{eyebrow}</p>
        )}
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-6 text-lg text-slate-300">{description}</p>
        {secondaryDescription && <p className="mt-4 text-slate-400">{secondaryDescription}</p>}
        {actions.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
            {actions.map((action) => (
              <CTA key={action.href + action.label} href={action.href} variant={action.variant ?? "primary"} dark>
                {action.label}
              </CTA>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

