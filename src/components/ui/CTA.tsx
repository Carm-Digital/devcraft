import Link from "next/link";

export type CTAVariant = "primary" | "secondary" | "outline" | "ghost";

type CTAProps = {
  children: React.ReactNode;
  href?: string;
  variant?: CTAVariant;
  dark?: boolean;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

const BASE =
  "inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50";

/* Primary : identique sur fond clair et sombre */
const PRIMARY =
  "bg-accent text-nuit hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]";

const VARIANTS: Record<CTAVariant, string> = {
  primary: PRIMARY,
  secondary:
    "border-2 border-accent/60 bg-transparent text-accent hover:border-accent hover:bg-accent/10",
  outline:
    "border-2 border-[#0d0f14]/30 bg-transparent text-[#0d0f14] hover:border-[#0d0f14] hover:bg-[#0d0f14]/5",
  ghost:
    "bg-transparent text-slate-600 hover:bg-[#0d0f14]/5 hover:text-[#0d0f14]",
};

const VARIANTS_DARK: Record<CTAVariant, string> = {
  primary: PRIMARY,
  secondary:
    "border-2 border-accent/60 bg-transparent text-accent hover:border-accent hover:bg-accent/10",
  outline:
    "border-2 border-white/40 bg-transparent text-white hover:border-white hover:bg-white/10",
  ghost: "bg-transparent text-slate-400 hover:bg-white/5 hover:text-white",
};

const DEFAULT_HREF = "/formulaire";

export default function CTA({
  children,
  href = DEFAULT_HREF,
  variant = "primary",
  dark = false,
  className = "",
  type = "button",
  onClick,
  disabled,
}: CTAProps) {
  const variantStyles = dark ? VARIANTS_DARK[variant] : VARIANTS[variant];
  const classes = `${BASE} ${variantStyles} ${className}`;
  const isLink = href && type !== "submit" && !onClick;

  if (isLink) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
