import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type LeadKind = "exchange" | "qualification";

type LeadPayload = {
  kind: LeadKind;
  // exchange
  nom?: string;
  telephone?: string;
  email?: string;
  creneau?: string;
  message?: string;
  // qualification
  prenom?: string;
  entreprise?: string;
  typeSite?: string;
  budget?: string;
  delai?: string;
  description?: string;
  hasLogo?: string;
  hasTextes?: string;
  hasPhotos?: string;
  styleSouhaite?: string;
  commentConnu?: string;
  acceptationRGPD?: boolean;
  // metadata
  source?: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatBool(value: unknown) {
  return value ? "Oui" : "Non";
}

export async function POST(req: Request) {
  const payload = (await req.json().catch(() => null)) as LeadPayload | null;
  if (!payload || typeof payload !== "object" || payload.kind === undefined) {
    return NextResponse.json({ error: "INVALID_PAYLOAD" }, { status: 400 });
  }

  const { kind } = payload;
  if (kind !== "exchange" && kind !== "qualification") {
    return NextResponse.json({ error: "INVALID_KIND" }, { status: 400 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const from = "contact@dev-craft.store";
  const to = "devcraft.store@gmail.com";

  const requestId = String(req.headers.get("x-request-id") ?? Date.now());
  console.log("[api/contact]", { requestId, kind, source: payload.source ?? "site", resendConfigured: Boolean(resendApiKey) });

  // Validation minimale (le front valide aussi, mais on sécurise côté serveur)
  if (kind === "exchange") {
    if (!payload.nom || !payload.telephone || !payload.email) {
      return NextResponse.json({ error: "MISSING_FIELDS" }, { status: 400 });
    }
  }

  if (kind === "qualification") {
    if (!payload.prenom || !payload.nom || !payload.email || !payload.telephone || !payload.acceptationRGPD) {
      return NextResponse.json({ error: "MISSING_FIELDS" }, { status: 400 });
    }
  }

  const subject =
    kind === "exchange" ? "Nouvelle demande d’échange — DevCraft" : "Nouvelle demande de devis — DevCraft";

  const replyTo = payload.email ? String(payload.email) : undefined;

  const htmlParts: string[] = [];
  htmlParts.push(`<div style="font-family: ui-sans-serif, system-ui; line-height:1.4;">`);
  htmlParts.push(`<h2 style="margin:0 0 16px 0;">${escapeHtml(subject)}</h2>`);
  htmlParts.push(`<p style="margin: 0 0 12px 0; color:#111827;">Source : ${escapeHtml(String(payload.source ?? "site"))}</p>`);

  if (kind === "exchange") {
    htmlParts.push("<h3 style='margin: 16px 0 8px 0;'>Coordonnées</h3>");
    htmlParts.push(`<p><strong>Nom :</strong> ${escapeHtml(String(payload.nom ?? ""))}</p>`);
    htmlParts.push(`<p><strong>Téléphone :</strong> ${escapeHtml(String(payload.telephone ?? ""))}</p>`);
    htmlParts.push(`<p><strong>Email :</strong> ${escapeHtml(String(payload.email ?? ""))}</p>`);
    if (payload.creneau) htmlParts.push(`<p><strong>Créneau souhaité :</strong> ${escapeHtml(String(payload.creneau))}</p>`);
    if (payload.message) htmlParts.push(`<p><strong>Message :</strong> ${escapeHtml(String(payload.message))}</p>`);
  } else {
    htmlParts.push("<h3 style='margin: 16px 0 8px 0;'>Coordonnées</h3>");
    htmlParts.push(`<p><strong>Prénom :</strong> ${escapeHtml(String(payload.prenom ?? ""))}</p>`);
    htmlParts.push(`<p><strong>Nom :</strong> ${escapeHtml(String(payload.nom ?? ""))}</p>`);
    htmlParts.push(`<p><strong>Email :</strong> ${escapeHtml(String(payload.email ?? ""))}</p>`);
    htmlParts.push(`<p><strong>Téléphone :</strong> ${escapeHtml(String(payload.telephone ?? ""))}</p>`);
    if (payload.entreprise) htmlParts.push(`<p><strong>Entreprise / Activité :</strong> ${escapeHtml(String(payload.entreprise))}</p>`);

    htmlParts.push("<h3 style='margin: 16px 0 8px 0;'>Projet</h3>");
    if (payload.typeSite) htmlParts.push(`<p><strong>Type de site :</strong> ${escapeHtml(String(payload.typeSite))}</p>`);
    if (payload.budget) htmlParts.push(`<p><strong>Budget :</strong> ${escapeHtml(String(payload.budget))}</p>`);
    if (payload.delai) htmlParts.push(`<p><strong>Délai :</strong> ${escapeHtml(String(payload.delai))}</p>`);
    if (payload.description) htmlParts.push(`<p><strong>Description :</strong> ${escapeHtml(String(payload.description))}</p>`);
    if (payload.styleSouhaite) htmlParts.push(`<p><strong>Style souhaité :</strong> ${escapeHtml(String(payload.styleSouhaite))}</p>`);
    if (payload.commentConnu) htmlParts.push(`<p><strong>Comment nous avez-vous connu ? :</strong> ${escapeHtml(String(payload.commentConnu))}</p>`);

    if (payload.hasLogo) htmlParts.push(`<p><strong>Logo :</strong> ${escapeHtml(String(payload.hasLogo))}</p>`);
    if (payload.hasTextes) htmlParts.push(`<p><strong>Textes :</strong> ${escapeHtml(String(payload.hasTextes))}</p>`);
    if (payload.hasPhotos) htmlParts.push(`<p><strong>Photos / visuels :</strong> ${escapeHtml(String(payload.hasPhotos))}</p>`);

    htmlParts.push(
      `<p style="margin-top: 14px; padding: 10px 12px; background:#f8fafc; border:1px solid #e5e7eb; border-radius:10px;">RGPD : ${escapeHtml(
        formatBool(payload.acceptationRGPD),
      )}</p>`,
    );
  }

  htmlParts.push(`<p style="margin: 16px 0 0 0; font-size: 12px; color:#6b7280;">Message envoyé depuis dev-craft.store</p>`);
  htmlParts.push("</div>");

  const html = htmlParts.join("");
  const text = payload.kind === "exchange"
    ? [
        "Nouvelle demande d’échange — DevCraft",
        `Source: ${payload.source ?? "site"}`,
        `Nom: ${payload.nom}`,
        `Téléphone: ${payload.telephone}`,
        `Email: ${payload.email}`,
        `Créneau: ${payload.creneau ?? "-"}`,
        `Message: ${payload.message ?? "-"}`,
      ].join("\n")
    : [
        "Nouvelle demande de devis — DevCraft",
        `Source: ${payload.source ?? "site"}`,
        `Prénom: ${payload.prenom}`,
        `Nom: ${payload.nom}`,
        `Téléphone: ${payload.telephone}`,
        `Email: ${payload.email}`,
        `Entreprise: ${payload.entreprise ?? "-"}`,
        `Type de site: ${payload.typeSite ?? "-"}`,
        `Budget: ${payload.budget ?? "-"}`,
        `Délai: ${payload.delai ?? "-"}`,
        `Description: ${payload.description ?? "-"}`,
        `Style souhaité: ${payload.styleSouhaite ?? "-"}`,
        `Comment connu: ${payload.commentConnu ?? "-"}`,
        `Logo: ${payload.hasLogo ?? "-"}`,
        `Textes: ${payload.hasTextes ?? "-"}`,
        `Photos: ${payload.hasPhotos ?? "-"}`,
        `RGPD: ${formatBool(payload.acceptationRGPD)}`,
      ].join("\n");

  if (!resendApiKey) {
    console.error("[api/contact]", { requestId, error: "MISSING_RESEND_API_KEY" });
    return NextResponse.json(
      {
        error: "MISSING_RESEND_API_KEY",
        message: "RESEND_API_KEY manquante. Configure-la dans Vercel (Environment Variables) pour activer l'envoi.",
      },
      { status: 500 },
    );
  }

  console.log("[api/contact] sending via Resend", { requestId, from, to, kind });
  const resend = new Resend(resendApiKey);

  try {
    await resend.emails.send({
      from,
      to,
      replyTo,
      subject,
      html,
      text,
    });
    console.log("[api/contact] resend sent", { requestId });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Envoi Resend impossible.";
    console.error("[api/contact] resend failed", { requestId, message, err });
    return NextResponse.json(
      {
        error: "RESEND_SEND_FAILED",
        message,
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}

