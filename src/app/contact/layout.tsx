import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Demander un devis ou parler de votre projet",
  description:
    "Contactez DevCraft pour votre projet de site web. Formulaire de demande de devis : type de site, tarifs clairs (vitrine 300 €, complet 900 €, abonnement 1300 €, personnalisé sur devis). Réponse sous 24–48 h.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
