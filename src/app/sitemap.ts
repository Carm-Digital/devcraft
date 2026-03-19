import type { MetadataRoute } from "next";

const routes = [
  "/",
  "/services",
  "/a-propos",
  "/faq",
  "/methode",
  "/realisations",
  "/qualification",
  "/validation-projet",
  "/paiement-confirme",
  "/paiement-annule",
  "/merci",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")).replace(
    /\/$/,
    "",
  );

  const lastModified = new Date();

  return routes.map((path) => ({
    url: `${baseUrl}${path === "/" ? "" : path}`,
    lastModified,
  }));
}

