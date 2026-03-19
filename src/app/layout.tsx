import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DevCraftAgent from "@/components/DevCraftAgent";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Création de site web professionnel | DevCraft",
  description:
    "DevCraft crée votre site web professionnel en moins de 7 jours. Vitrine, e-commerce, sur mesure. Devis gratuit sous 24h.",
  keywords: ["création site web", "agence web", "site professionnel", "site sur mesure", "DevCraft"],
  openGraph: {
    type: "website",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL ?? "https://dev-craft.store"}/logo.png`,
        width: 1200,
        height: 630,
        alt: "DevCraft — Création de site web",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://dev-craft.store";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "DevCraft",
    url: baseUrl,
    areaServed: "Île-de-France",
    serviceType: "Création de site web",
  };

  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} ${plusJakarta.variable} font-sans antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <DevCraftAgent />
        <ScrollToTopButton />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
