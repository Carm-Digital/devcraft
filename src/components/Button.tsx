import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  type = "button",
  onClick,
  disabled,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-lg font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 disabled:opacity-50";
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 px-5 py-2.5 text-sm",
    secondary: "bg-amber-600 text-white hover:bg-amber-700 px-5 py-2.5 text-sm",
    outline: "border-2 border-slate-900 text-slate-900 hover:bg-slate-50 px-5 py-2.5 text-sm",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
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
