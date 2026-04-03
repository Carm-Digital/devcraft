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
  /** Si défini (non vide), le premier mot du titre est en cyan, le reste en blanc */
  titleAccent?: string;
  secondaryDescription?: string;
  actions?: HeroAction[];
};

function renderTitle(title: string, titleAccent?: string) {
  if (!titleAccent?.trim()) {
    return <span className="text-white">{title}</span>;
  }
  const i = title.indexOf(" ");
  if (i === -1) {
    return <span className="text-[#00D4FF]">{title}</span>;
  }
  return (
    <>
      <span className="text-[#00D4FF]">{title.slice(0, i)}</span>
      <span className="text-white">{title.slice(i)}</span>
    </>
  );
}

export default function PageHero({
  title,
  description,
  eyebrow,
  titleAccent,
  secondaryDescription,
  actions = [],
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#0d0f14] px-4 pt-20 pb-28 text-white sm:px-6 sm:pt-28 sm:pb-36 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050815] via-[#0d1324] to-[#050815]" />
      <div className="hero-gradient-animated absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.18),transparent)]" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(0,212,255,0.12),transparent)]"
        aria-hidden
      />
      <div className="absolute bottom-0 left-0 right-0 h-24 rounded-t-[3rem] bg-[#F5F4F0] sm:rounded-t-[4rem]" />
      <div className="relative mx-auto max-w-3xl text-center">
        {eyebrow && (
          <p className="animate-fade-up inline-flex items-center justify-center font-display text-base font-bold uppercase tracking-[0.35em] text-[#00D4FF]/90 sm:text-lg lg:text-xl">
            <span
              className="mb-0.5 mr-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#00D4FF] align-middle"
              aria-hidden
            />
            {eyebrow}
          </p>
        )}
        <h1 className="animate-fade-up animate-delay-1 mt-10 font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          {renderTitle(title, titleAccent)}
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
