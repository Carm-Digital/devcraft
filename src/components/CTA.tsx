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
  "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 disabled:opacity-50";

/* Clair (sur fond clair) : primary = doré, secondary = bleu nuit contour */
const VARIANTS: Record<CTAVariant, string> = {
  primary:
    "bg-gradient-to-r from-[#b8962e] to-[#c9a227] text-[#0a0e1a] shadow-lg shadow-amber-900/20 hover:from-[#c9a227] hover:to-[#d4af37] hover:shadow-amber-900/30 px-5 py-2.5 text-sm",
  secondary:
    "border-2 border-[#0a0e1a] text-[#0a0e1a] hover:bg-[#0a0e1a] hover:text-white px-5 py-2.5 text-sm",
  outline:
    "border-2 border-slate-300 text-slate-700 hover:border-[#0a0e1a] hover:bg-slate-50 hover:text-[#0a0e1a] px-5 py-2.5 text-sm",
  ghost:
    "text-slate-700 hover:bg-slate-100 px-5 py-2.5 text-sm",
};

/* Sombre (sur fond nuit) : primary = doré, secondary = contour blanc/doré */
const VARIANTS_DARK: Record<CTAVariant, string> = {
  primary:
    "bg-gradient-to-r from-[#b8962e] to-[#c9a227] text-[#0a0e1a] shadow-lg shadow-amber-900/30 hover:from-[#c9a227] hover:to-[#d4af37] px-5 py-2.5 text-sm",
  secondary:
    "border-2 border-white/80 text-white hover:bg-white hover:text-[#0a0e1a] px-5 py-2.5 text-sm",
  outline:
    "border-2 border-white/40 text-white hover:bg-white/10 px-5 py-2.5 text-sm",
  ghost:
    "text-slate-300 hover:bg-white/5 hover:text-white px-5 py-2.5 text-sm",
};

const DEFAULT_HREF = "/qualification";

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
    return <Link href={href} className={classes}>{children}</Link>;
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
