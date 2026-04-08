import type { MetadataRoute } from "next";

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[0]["changeFrequency"]>;

const routes: { path: string; priority: number; changeFrequency: ChangeFrequency }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/a-propos", priority: 0.8, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
  { path: "/formulaire", priority: 0.9, changeFrequency: "monthly" },
  { path: "/mentions-legales", priority: 0.3, changeFrequency: "yearly" },
  { path: "/politique-confidentialite", priority: 0.3, changeFrequency: "yearly" },
  { path: "/cgv", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")).replace(
    /\/$/,
    "",
  );

  const lastModified = new Date();

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path === "/" ? "" : path}`,
    lastModified,
    priority,
    changeFrequency,
  }));
}
