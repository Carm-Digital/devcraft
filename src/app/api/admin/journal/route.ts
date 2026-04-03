import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomUUID } from "node:crypto";
import { ADMIN_SESSION_COOKIE } from "@/lib/adminAuth";
import { isKvStorageEnabled } from "@/lib/siteContent";
import type { JournalEntry } from "@/lib/adminJournal";

export const runtime = "nodejs";

async function isAuthorized() {
  const jar = await cookies();
  return Boolean(jar.get(ADMIN_SESSION_COOKIE)?.value);
}

/** GET : les 50 dernières entrées journal:* triées par date décroissante */
export async function GET() {
  if (!(await isAuthorized())) {
    return NextResponse.json(
      { error: "UNAUTHORIZED", message: "Session expirée ou non connecté. Reconnectez-vous." },
      { status: 401 },
    );
  }

  if (!isKvStorageEnabled()) {
    return NextResponse.json({ ok: true, entries: [] as JournalEntry[], message: "KV non configuré." });
  }

  try {
    const { kv } = await import("@vercel/kv");
    const keys: string[] = [];
    for await (const key of kv.scanIterator({ match: "journal:*", count: 500 })) {
      keys.push(key);
    }
    keys.sort((a, b) => b.localeCompare(a));
    const slice = keys.slice(0, 50);

    const entries: JournalEntry[] = [];
    for (const key of slice) {
      const raw = await kv.get<string>(key);
      if (raw == null) continue;
      try {
        const parsed = typeof raw === "string" ? (JSON.parse(raw) as unknown) : raw;
        if (
          parsed &&
          typeof parsed === "object" &&
          typeof (parsed as JournalEntry).action === "string" &&
          typeof (parsed as JournalEntry).detail === "string" &&
          typeof (parsed as JournalEntry).timestamp === "string"
        ) {
          entries.push(parsed as JournalEntry);
        }
      } catch {
        /* skip */
      }
    }

    return NextResponse.json({ ok: true, entries });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Lecture journal impossible.";
    console.error("[api/admin/journal GET]", err);
    return NextResponse.json({ error: "KV_READ_FAILED", message }, { status: 500 });
  }
}

/** POST : ajoute une entrée { action, detail, timestamp } */
export async function POST(req: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json(
      { error: "UNAUTHORIZED", message: "Session expirée ou non connecté. Reconnectez-vous." },
      { status: 401 },
    );
  }

  if (!isKvStorageEnabled()) {
    return NextResponse.json({ error: "KV_DISABLED", message: "KV non configuré." }, { status: 503 });
  }

  const body = (await req.json().catch(() => null)) as {
    action?: unknown;
    detail?: unknown;
  } | null;

  if (!body || typeof body.action !== "string" || !body.action.trim()) {
    return NextResponse.json({ error: "INVALID_BODY", message: "action requise." }, { status: 400 });
  }
  const detail = typeof body.detail === "string" ? body.detail : "";

  const timestamp = new Date().toISOString();
  const key = `journal:${timestamp}:${randomUUID()}`;
  const payload: JournalEntry = { action: body.action.trim(), detail, timestamp };

  try {
    const { kv } = await import("@vercel/kv");
    await kv.set(key, JSON.stringify(payload), { ex: 60 * 60 * 24 * 365 });
    return NextResponse.json({ ok: true, entry: payload });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Écriture impossible.";
    console.error("[api/admin/journal POST]", err);
    return NextResponse.json({ error: "KV_WRITE_FAILED", message }, { status: 500 });
  }
}
