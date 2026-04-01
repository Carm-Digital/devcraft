type SectionProps = {
  id?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
};

export default function Section({
  id,
  title,
  subtitle,
  children,
  className = "",
  dark = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-16 sm:py-20 ${dark ? "bg-[#0a0e1a] text-white" : "bg-[#f8fafc]"} ${className}`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="mx-auto max-w-2xl text-center">
            {title && (
              <h2
                className={`font-display text-3xl font-bold tracking-tight sm:text-4xl ${
                  dark ? "text-white" : "text-[#0a0e1a]"
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

