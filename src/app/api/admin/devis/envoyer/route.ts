import { createElement, type ReactElement } from "react";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { pdf, type DocumentProps } from "@react-pdf/renderer";
import { Resend } from "resend";
import { DevisPDF } from "@/components/features/devis/DevisPDF";
import type { DevisData } from "@/components/features/devis/DevisPDF";
import { appendJournalEntry } from "@/lib/adminJournal";
import { ADMIN_SESSION_COOKIE } from "@/lib/adminAuth";

export const runtime = "nodejs";

async function isAuthorized() {
  const jar = await cookies();
  return Boolean(jar.get(ADMIN_SESSION_COOKIE)?.value);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatMontant(n: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isRecord(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

function validatePrestation(v: unknown): v is { label: string; montant: number } {
  if (!isRecord(v)) return false;
  return typeof v.label === "string" && v.label.trim().length > 0 && typeof v.montant === "number" && !Number.isNaN(v.montant);
}

function validateDevisData(raw: unknown): { ok: true; data: DevisData } | { ok: false; error: string } {
  if (!isRecord(raw)) return { ok: false, error: "devisData invalide." };

  const {
    clientId,
    prenom,
    nom,
    email,
    telephone,
    entreprise,
    typeSite,
    description,
    prestations,
    acompte,
    solde,
    totalHT,
    dateDevis,
    validiteJours,
  } = raw;

  if (typeof clientId !== "string" || !clientId.trim()) return { ok: false, error: "clientId requis." };
  if (typeof prenom !== "string" || !prenom.trim()) return { ok: false, error: "prenom requis." };
  if (typeof nom !== "string" || !nom.trim()) return { ok: false, error: "nom requis." };
  if (typeof email !== "string" || !email.trim()) return { ok: false, error: "email (devis) requis." };
  if (typeof telephone !== "string" || !telephone.trim()) return { ok: false, error: "telephone requis." };
  if (typeof typeSite !== "string" || !typeSite.trim()) return { ok: false, error: "typeSite requis." };
  if (!Array.isArray(prestations) || prestations.length === 0 || !prestations.every(validatePrestation)) {
    return { ok: false, error: "prestations invalides." };
  }
  if (typeof acompte !== "number" || Number.isNaN(acompte)) return { ok: false, error: "acompte invalide." };
  if (typeof solde !== "number" || Number.isNaN(solde)) return { ok: false, error: "solde invalide." };
  if (typeof totalHT !== "number" || Number.isNaN(totalHT)) return { ok: false, error: "totalHT invalide." };
  if (typeof dateDevis !== "string" || !dateDevis.trim()) return { ok: false, error: "dateDevis requise." };

  const data: DevisData = {
    clientId: clientId.trim(),
    prenom: prenom.trim(),
    nom: nom.trim(),
    email: email.trim(),
    telephone: telephone.trim(),
    typeSite: typeSite.trim(),
    prestations: prestations.map((p) => ({
      label: (p as { label: string }).label.trim(),
      montant: (p as { montant: number }).montant,
    })),
    acompte,
    solde,
    totalHT,
    dateDevis: dateDevis.trim(),
  };

  if (typeof entreprise === "string" && entreprise.trim()) data.entreprise = entreprise.trim();
  if (typeof description === "string" && description.trim()) data.description = description.trim();
  if (typeof validiteJours === "number" && !Number.isNaN(validiteJours) && validiteJours > 0) {
    data.validiteJours = validiteJours;
  }

  return { ok: true, data };
}

function getBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_BASE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  ).replace(/\/$/, "");
}

function buildClientEmailHtml(devisData: DevisData, reglementUrl: string) {
  const prenom = escapeHtml(devisData.prenom);
  const nom = escapeHtml(devisData.nom);
  const id = escapeHtml(devisData.clientId);
  const total = escapeHtml(formatMontant(devisData.totalHT));
  const acompte = escapeHtml(formatMontant(devisData.acompte));
  const solde = escapeHtml(formatMontant(devisData.solde));

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Devis DevCraft — ${id}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f5f7;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.5;color:#0d0f14;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f5f7;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:560px;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(10,14,26,0.08);">
          <tr>
            <td style="background-color:#0d0f14;padding:20px 24px;">
              <span style="font-size:22px;font-weight:bold;color:#00D4FF;letter-spacing:0.02em;">DevCraft</span>
            </td>
          </tr>
          <tr>
            <td style="padding:24px;">
              <p style="margin:0 0 16px;">Bonjour ${prenom} ${nom},</p>
              <p style="margin:0 0 20px;">Veuillez trouver ci-joint votre devis N° <strong>${id}</strong>.</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;border:1px solid #e2e4e8;border-radius:6px;">
                <tr>
                  <td style="padding:12px 16px;border-bottom:1px solid #e2e4e8;background-color:#fafafa;font-weight:bold;">Total HT</td>
                  <td style="padding:12px 16px;border-bottom:1px solid #e2e4e8;text-align:right;">${total}</td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;border-bottom:1px solid #e2e4e8;background-color:#fafafa;font-weight:bold;">Acompte</td>
                  <td style="padding:12px 16px;border-bottom:1px solid #e2e4e8;text-align:right;">${acompte}</td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;background-color:#fafafa;font-weight:bold;">Solde</td>
                  <td style="padding:12px 16px;text-align:right;">${solde}</td>
                </tr>
              </table>
              <p style="margin:0 0 12px;">Pour valider votre projet et régler l’acompte :</p>
              <p style="margin:0 0 24px;">
                <a href="${escapeHtml(reglementUrl)}" style="display:inline-block;background-color:#00D4FF;color:#0d0f14;font-weight:bold;text-decoration:none;padding:12px 20px;border-radius:6px;">Accéder au règlement</a>
              </p>
              <p style="margin:0;font-size:13px;color:#5a6170;">Cordialement,<br />L’équipe DevCraft</p>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 24px;background-color:#f4f5f7;font-size:12px;color:#5a6170;text-align:center;border-top:1px solid #e2e4e8;">
              DevCraft — <a href="mailto:devcraft.store@gmail.com" style="color:#0d0f14;">devcraft.store@gmail.com</a> — <a href="https://dev-craft.store" style="color:#0d0f14;">dev-craft.store</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(req: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json(
      { error: "UNAUTHORIZED", message: "Session expirée ou non connecté. Reconnectez-vous." },
      { status: 401 },
    );
  }

  const body = (await req.json().catch(() => null)) as { emailClient?: unknown; devisData?: unknown } | null;
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "INVALID_BODY", message: "Corps JSON invalide." }, { status: 400 });
  }

  const emailClient = body.emailClient;
  if (typeof emailClient !== "string" || !emailClient.trim() || !EMAIL_RE.test(emailClient.trim())) {
    return NextResponse.json({ error: "INVALID_EMAIL", message: "emailClient invalide." }, { status: 400 });
  }

  const checked = validateDevisData(body.devisData);
  if (!checked.ok) {
    return NextResponse.json({ error: "INVALID_DEVIS_DATA", message: checked.error }, { status: 400 });
  }

  const devisData = checked.data;
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    return NextResponse.json(
      { error: "RESEND_NOT_CONFIGURED", message: "RESEND_API_KEY manquant." },
      { status: 503 },
    );
  }

  let buffer: Buffer;
  try {
    const blob = await pdf(
      createElement(DevisPDF, { data: devisData }) as ReactElement<DocumentProps>,
    ).toBlob();
    buffer = Buffer.from(await blob.arrayBuffer());
  } catch (err) {
    const message = err instanceof Error ? err.message : "Génération PDF impossible.";
    console.error("[api/admin/devis/envoyer] pdf failed", err);
    return NextResponse.json({ error: "PDF_FAILED", message }, { status: 500 });
  }

  const baseUrl = getBaseUrl();
  const reglementUrl = `${baseUrl}/reglement-devis?id=${encodeURIComponent(devisData.clientId)}`;
  const html = buildClientEmailHtml(devisData, reglementUrl);
  const subject = `Votre devis DevCraft — N° ${devisData.clientId}`;

  const resend = new Resend(resendApiKey);

  try {
    const { error } = await resend.emails.send({
      from: "contact@dev-craft.store",
      to: emailClient.trim(),
      subject,
      html,
      attachments: [
        {
          filename: `devis-${devisData.clientId}.pdf`,
          content: buffer,
        },
      ],
    });

    if (error) {
      console.error("[api/admin/devis/envoyer] resend", error);
      return NextResponse.json(
        { error: "RESEND_FAILED", message: error.message ?? "Envoi impossible." },
        { status: 502 },
      );
    }

    await appendJournalEntry(
      "Envoi devis par e-mail",
      `Devis ${devisData.clientId} envoyé à ${emailClient.trim()}.`,
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Envoi Resend impossible.";
    console.error("[api/admin/devis/envoyer] resend failed", err);
    return NextResponse.json({ error: "RESEND_FAILED", message }, { status: 502 });
  }
}
