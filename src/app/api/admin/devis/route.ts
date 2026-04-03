import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE } from "@/lib/adminAuth";
import { appendJournalEntry } from "@/lib/adminJournal";
import { isKvStorageEnabled } from "@/lib/siteContent";

export const runtime = "nodejs";

const STATUTS = ["en_attente", "acompte_regle", "solde_regle", "archive"] as const;
type StatutDevis = (typeof STATUTS)[number];

async function isAuthorized() {
  const jar = await cookies();
  return Boolean(jar.get(ADMIN_SESSION_COOKIE)?.value);
}

function parseDemande(raw: unknown): Record<string, unknown> | null {
  if (raw == null) return null;
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw) as Record<string, unknown>;
    } catch {
      return null;
    }
  }
  if (typeof raw === "object") return raw as Record<string, unknown>;
  return null;
}

/** GET : liste les entrées `demande:*` dans KV */
export async function GET() {
  if (!(await isAuthorized())) {
    return NextResponse.json(
      { error: "UNAUTHORIZED", message: "Session expirée ou non connecté. Reconnectez-vous." },
      { status: 401 },
    );
  }

  if (!isKvStorageEnabled()) {
    return NextResponse.json({
      ok: true,
      demandes: [] as unknown[],
      message: "KV non configuré : aucune demande listée.",
    });
  }

  try {
    const { kv } = await import("@vercel/kv");
    const keys: string[] = [];
    for await (const key of kv.scanIterator({ match: "demande:*", count: 200 })) {
      keys.push(key);
    }

    const demandes: Record<string, unknown>[] = [];
    for (const key of keys) {
      const raw = await kv.get<string | Record<string, unknown>>(key);
      const parsed = parseDemande(raw);
      if (parsed) demandes.push(parsed);
    }

    demandes.sort((a, b) => {
      const ca = typeof a.createdAt === "string" ? a.createdAt : "";
      const cb = typeof b.createdAt === "string" ? b.createdAt : "";
      return cb.localeCompare(ca);
    });

    return NextResponse.json({ ok: true, demandes });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Lecture KV impossible.";
    console.error("[api/admin/devis GET]", err);
    return NextResponse.json({ error: "KV_READ_FAILED", message }, { status: 500 });
  }
}

/** POST : met à jour acompte, solde, statut pour une demande */
export async function POST(req: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json(
      { error: "UNAUTHORIZED", message: "Session expirée ou non connecté. Reconnectez-vous." },
      { status: 401 },
    );
  }

  if (!isKvStorageEnabled()) {
    return NextResponse.json(
      { error: "KV_DISABLED", message: "KV non configuré." },
      { status: 503 },
    );
  }

  const body = (await req.json().catch(() => null)) as {
    clientId?: string;
    acompte?: number;
    solde?: number;
    statut?: string;
    notes?: string;
  } | null;

  if (!body || typeof body.clientId !== "string" || !body.clientId.trim()) {
    return NextResponse.json({ error: "INVALID_BODY", message: "clientId requis." }, { status: 400 });
  }

  if (typeof body.acompte !== "number" || Number.isNaN(body.acompte)) {
    return NextResponse.json({ error: "INVALID_BODY", message: "acompte doit être un nombre." }, { status: 400 });
  }

  if (typeof body.solde !== "number" || Number.isNaN(body.solde)) {
    return NextResponse.json({ error: "INVALID_BODY", message: "solde doit être un nombre." }, { status: 400 });
  }

  if (!body.statut || !STATUTS.includes(body.statut as StatutDevis)) {
    return NextResponse.json({ error: "INVALID_BODY", message: "statut invalide." }, { status: 400 });
  }

  const clientId = body.clientId.trim();
  const key = `demande:${clientId}`;

  try {
    const { kv } = await import("@vercel/kv");
    const raw = await kv.get<string | Record<string, unknown>>(key);
    const existing = parseDemande(raw);
    if (!existing) {
      return NextResponse.json({ error: "NOT_FOUND", message: "Demande introuvable." }, { status: 404 });
    }

    const notes =
      typeof body.notes === "string"
        ? body.notes
        : typeof existing.notes === "string"
          ? existing.notes
          : "";

    const updated = {
      ...existing,
      clientId: existing.clientId ?? clientId,
      acompte: body.acompte,
      solde: body.solde,
      statut: body.statut as StatutDevis,
      notes,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(key, JSON.stringify(updated), { ex: 60 * 60 * 24 * 365 });

    if (body.statut === "archive") {
      await appendJournalEntry("Archivage demande", `Demande ${clientId} archivée.`);
    } else {
      await appendJournalEntry("Montants devis", `Demande ${clientId} — acompte / solde enregistrés.`);
    }

    return NextResponse.json({ ok: true, demande: updated });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Mise à jour impossible.";
    console.error("[api/admin/devis POST]", err);
    return NextResponse.json({ error: "KV_WRITE_FAILED", message }, { status: 500 });
  }
}

/** DELETE : supprime une entrée `demande:{clientId}` dans KV */
export async function DELETE(req: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json(
      { error: "UNAUTHORIZED", message: "Session expirée ou non connecté. Reconnectez-vous." },
      { status: 401 },
    );
  }

  if (!isKvStorageEnabled()) {
    return NextResponse.json(
      { error: "KV_DISABLED", message: "KV non configuré." },
      { status: 503 },
    );
  }

  const body = (await req.json().catch(() => null)) as { clientId?: string } | null;
  if (!body || typeof body.clientId !== "string" || !body.clientId.trim()) {
    return NextResponse.json({ error: "INVALID_BODY", message: "clientId requis." }, { status: 400 });
  }

  const clientId = body.clientId.trim();
  const key = `demande:${clientId}`;

  try {
    const { kv } = await import("@vercel/kv");
    await kv.del(key);
    await appendJournalEntry("Suppression demande", `Demande ${clientId} supprimée définitivement.`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Suppression impossible.";
    console.error("[api/admin/devis DELETE]", err);
    return NextResponse.json({ error: "KV_DELETE_FAILED", message }, { status: 500 });
  }
}
