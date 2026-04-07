type SectionProps = {
  id?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  /** Accent radial cyan (sections sombres uniquement) */
  accent?: boolean;
};

export default function Section({
  id,
  title,
  subtitle,
  children,
  className = "",
  dark = false,
  accent = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden py-16 sm:py-20 ${
        dark ? "bg-nuit text-white" : "bg-white"
      } ${className}`}
    >
      {dark && accent && (
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(0,212,255,0.06),transparent)]"
          aria-hidden
        />
      )}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="mx-auto max-w-2xl text-center">
            {title && (
              <h2
                className={`font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl ${
                  dark ? "text-white" : "text-[#0d0f14]"
                }`}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={`mt-4 text-lg ${dark ? "text-slate-300" : "text-slate-600"}`}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div className={title || subtitle ? "mt-12" : ""}>{children}</div>
      </div>
    </section>
  );
}
