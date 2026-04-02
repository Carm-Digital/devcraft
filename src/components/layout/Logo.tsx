import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  /**
   * Couleur du fond sur lequel le logo est posé.
   * - "light"  = fond clair (utilise `devcrafttt light.png`)
   * - "dark"   = fond sombre (utilise `logo-devcraft.png`)
   */
  background?: "light" | "dark";
  /** Afficher le nom "DevCraft" à côté du logo */
  showName?: boolean;
  /** Ne pas envelopper dans un lien (pour envelopper soi-même avec du texte, ex. navbar) */
  disableLink?: boolean;
  className?: string;
  href?: string;
  /** Classe Tailwind pour la couleur du nom "DevCraft" */
  nameColor?: string;
};

// Logo principal DevCraft — PNG dans /public
const LOGO_ON_LIGHT = "/aaaaaaaaaaaaaaaaaaa.png";
const LOGO_ON_DARK = "/aaaaaaaaaaaaaaaaaaa.png";
const LOGO_SYMBOL = "/aaaaaaaaaaaaaaaaaaa.png";

export default function Logo({
  background = "dark",
  showName = true,
  disableLink = false,
  className = "",
  href = "/",
  nameColor = "text-[#F1E83B]",
}: LogoProps) {
  const isDarkBackground = background === "dark";
  const baseTextClass = isDarkBackground
    ? "font-display font-bold tracking-tight"
    : "font-display font-bold tracking-tight";

  // Si on n'affiche pas le nom (ex. navbar), on privilégie le symbole seul
  const src = showName
    ? background === "light"
      ? LOGO_ON_LIGHT
      : LOGO_ON_DARK
    : LOGO_SYMBOL;

  // Variante symbole seul (navbar) : hauteur ~48px, proportions conservées
  if (!showName) {
    const imageEl = (
      <Image
        src={src}
        alt="Logo DevCraft"
        width={96}
        height={96}
        priority
        className="object-contain"
        sizes="48px"
      />
    );
    if (disableLink) {
      return <span className={className}>{imageEl}</span>;
    }
    return href ? (
      <Link
        href={href}
        className={`inline-flex items-center ${className}`}
        aria-label="DevCraft Accueil"
      >
        {imageEl}
      </Link>
    ) : (
      <span className={className}>{imageEl}</span>
    );
  }

  const content = (
    <span
      className={`inline-flex items-center gap-3 sm:gap-3.5 ${className}`}
      style={{ minHeight: "40px" }}
    >
      <Image
        src={src}
        alt="Logo DevCraft"
        width={112}
        height={112}
        priority
        className="h-10 w-10 shrink-0 object-contain drop-shadow-sm sm:h-11 sm:w-11"
        sizes="(max-width: 640px) 40px, 44px"
      />
      <span className={`text-xl font-semibold sm:text-2xl sm:font-bold leading-none tracking-tight ${baseTextClass} ${nameColor}`}>
        DevCraft
      </span>
    </span>
  );

  return href ? (
    <Link
      href={href}
      className="inline-flex items-center rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
      aria-label="DevCraft Accueil"
    >
      {content}
    </Link>
  ) : (
    content
  );
}

