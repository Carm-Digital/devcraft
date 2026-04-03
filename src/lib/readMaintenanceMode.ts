import { isKvStorageEnabled } from "@/lib/siteContent";

const KV_CONTENT_KEY = "devcraft:site_content";

/** Lit uniquement le flag maintenance (KV ou fichier local via readSiteContent). */
export async function readMaintenanceMode(): Promise<boolean> {
  if (isKvStorageEnabled()) {
    try {
      const { kv } = await import("@vercel/kv");
      const raw = await kv.get<string>(KV_CONTENT_KEY);
      if (raw == null) return false;
      const parsed = typeof raw === "string" ? (JSON.parse(raw) as unknown) : raw;
      return typeof parsed === "object" && parsed !== null && "maintenanceMode" in parsed
        ? Boolean((parsed as { maintenanceMode?: unknown }).maintenanceMode)
        : false;
    } catch {
      return false;
    }
  }

  try {
    const { readSiteContent } = await import("@/lib/siteContent");
    const c = await readSiteContent();
    return Boolean(c.maintenanceMode);
  } catch {
    return false;
  }
}
