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
    <section className="relative overflow-hidden bg-[#0a0e1a] px-4 pt-16 pb-24 text-white sm:px-6 sm:pt-20 sm:pb-32 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050815] via-[#0d1324] to-[#050815]" />
      <div className="hero-gradient-animated absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.18),transparent)]" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#f8fafc] rounded-t-[3rem] sm:rounded-t-[4rem]" />
      <div className="relative mx-auto max-w-3xl text-center">
        {eyebrow && (
          <p className="animate-fade-up font-display text-base font-bold uppercase tracking-[0.35em] text-[#F1E83B]/90 sm:text-lg lg:text-xl">
            {eyebrow}
          </p>
        )}
        <h1 className="animate-fade-up animate-delay-1 mt-10 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
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

