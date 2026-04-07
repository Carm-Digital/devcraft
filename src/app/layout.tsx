import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import { readSiteContent } from "@/lib/siteContent";

export const dynamic = "force-dynamic";

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
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
    other: [
      { rel: "android-chrome", url: "/android-chrome-192x192.png", sizes: "192x192" },
      { rel: "android-chrome", url: "/android-chrome-512x512.png", sizes: "512x512" },
    ],
  },
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await readSiteContent();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://dev-craft.store";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "DevCraft",
    url: baseUrl,
    areaServed: "Île-de-France",
    serviceType: "Création de site web",
  };

  const themeCss = `:root {
  --color-nuit: ${content.colors.nuit};
  --color-electric: ${content.colors.electric};
  --color-gold: ${content.colors.gold};
  --color-offwhite: ${content.colors.offwhite};
  --color-foreground: ${content.colors.foreground};
  --color-ink: ${content.colors.foreground};
  --color-accent: ${content.colors.gold};
  --color-accent-muted: ${content.colors.gold}99;
  --color-nuit-border: ${content.colors.nuit}1a;
}`;

  return (
    <html lang="fr">
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeCss }} />
      </head>
      <body
        className={`grain-overlay ${geistSans.variable} ${geistMono.variable} ${plusJakarta.variable} font-sans antialiased`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ScrollToTopButton />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
