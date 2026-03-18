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
    kind === "exchange"
      ? "Nouvelle demande d’échange — DevCraft"
      : "🚀 Nouvelle demande de projet — DevCraft";

  // Après validation, `payload.email` est obligatoire (exchange/qualification)
  const replyTo = payload.email!; // = body.email
  const fullNameQualification =
    kind === "qualification" ? [payload.prenom, payload.nom].filter(Boolean).join(" ") : undefined;

  const htmlParts: string[] = [];
  const baseContainer =
    "font-family: ui-sans-serif, system-ui; line-height:1.4; background:#ffffff; padding:0; margin:0; color:#0a0e1a;";

  htmlParts.push(`<div style="${baseContainer}">`);
  htmlParts.push(
    `<div style="max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;background:#ffffff;">`,
  );

  // Header
  htmlParts.push(
    `<div style="padding:22px 20px;background:linear-gradient(90deg,#0a0e1a 0%, #0a0e1a 65%, #f59e0b 100%);">` +
      `<p style="margin:0 0 10px 0;font-size:14px;color:#ffffff;opacity:0.95;">Un nouveau prospect vient de remplir le formulaire sur ton site DevCraft.</p>` +
      `<h1 style="margin:0;font-size:20px;line-height:1.2;color:#ffffff;">${kind === "qualification" ? "Nouvelle demande de projet" : escapeHtml(subject)}</h1>` +
      `</div>`,
  );

  // Body sections
  if (kind === "exchange") {
    htmlParts.push(`<div style="padding:18px 20px 10px 20px;">`);
    htmlParts.push(`<div style="border:1px solid #e5e7eb;border-radius:12px;padding:14px 14px;margin-bottom:12px;background:#ffffff;">`);
    htmlParts.push(`<p style="margin:0 0 10px 0;font-weight:700;color:#0a0e1a;">Infos client</p>`);
    htmlParts.push(`<p style="margin:0;"><strong>Nom :</strong> ${escapeHtml(String(payload.nom ?? ""))}</p>`);
    htmlParts.push(`<p style="margin:6px 0 0 0;"><strong>Email :</strong> ${escapeHtml(String(payload.email ?? ""))}</p>`);
    htmlParts.push(`<p style="margin:6px 0 0 0;"><strong>Téléphone :</strong> ${escapeHtml(String(payload.telephone ?? ""))}</p>`);
    htmlParts.push(`</div>`);

    htmlParts.push(`<div style="border:1px solid #e5e7eb;border-radius:12px;padding:14px 14px;background:#ffffff;">`);
    htmlParts.push(`<p style="margin:0 0 10px 0;font-weight:700;color:#0a0e1a;">Message</p>`);
    if (payload.creneau) htmlParts.push(`<p style="margin:0;"><strong>Créneau :</strong> ${escapeHtml(String(payload.creneau))}</p>`);
    if (payload.message) htmlParts.push(`<p style="margin:6px 0 0 0;"><strong>Message :</strong> ${escapeHtml(String(payload.message))}</p>`);
    htmlParts.push(`</div>`);

    htmlParts.push(`</div>`);
  } else {
    const clientName = fullNameQualification && fullNameQualification.trim().length > 0 ? fullNameQualification : payload.nom ?? "";
    const sourceLabel = payload.commentConnu ? String(payload.commentConnu) : "—";
    const projectMessage = payload.description ? String(payload.description) : "—";

    const replyEmail = payload.email ? String(payload.email) : "";
    const mailto = replyEmail ? `mailto:${replyEmail}` : "";

    htmlParts.push(`<div style="padding:18px 20px 10px 20px;">`);

    // Infos client
    htmlParts.push(`<div style="border:1px solid #e5e7eb;border-radius:12px;padding:14px 14px;margin-bottom:12px;background:#ffffff;">`);
    htmlParts.push(`<p style="margin:0 0 10px 0;font-weight:700;color:#0a0e1a;">Infos client</p>`);
    htmlParts.push(`<p style="margin:0;"><strong>Nom :</strong> ${escapeHtml(String(clientName))}</p>`);
    htmlParts.push(`<p style="margin:6px 0 0 0;"><strong>Email :</strong> ${escapeHtml(String(payload.email ?? ""))}</p>`);
    htmlParts.push(`<p style="margin:6px 0 0 0;"><strong>Téléphone :</strong> ${escapeHtml(String(payload.telephone ?? ""))}</p>`);
    htmlParts.push(`</div>`);

    // Projet
    htmlParts.push(`<div style="border:1px solid #e5e7eb;border-radius:12px;padding:14px 14px;margin-bottom:12px;background:#ffffff;">`);
    htmlParts.push(`<p style="margin:0 0 10px 0;font-weight:700;color:#0a0e1a;">Projet</p>`);
    htmlParts.push(`<p style="margin:0;"><strong>Type de site :</strong> ${escapeHtml(String(payload.typeSite ?? "—"))}</p>`);
    htmlParts.push(`<p style="margin:6px 0 0 0;"><strong>Budget :</strong> ${escapeHtml(String(payload.budget ?? "—"))}</p>`);
    htmlParts.push(`<p style="margin:6px 0 0 0;"><strong>Délai :</strong> ${escapeHtml(String(payload.delai ?? "—"))}</p>`);
    htmlParts.push(`<p style="margin:10px 0 0 0;"><strong>Message :</strong></p>`);
    htmlParts.push(
      `<p style="margin:6px 0 0 0;color:#374151;white-space:pre-wrap;">${escapeHtml(projectMessage)}</p>`,
    );
    htmlParts.push(`</div>`);

    // Source
    htmlParts.push(`<div style="border:1px solid #e5e7eb;border-radius:12px;padding:14px 14px;background:#ffffff;">`);
    htmlParts.push(`<p style="margin:0 0 10px 0;font-weight:700;color:#0a0e1a;">Source</p>`);
    htmlParts.push(`<p style="margin:0;"><strong>Comment il nous a connu :</strong> ${escapeHtml(sourceLabel)}</p>`);
    htmlParts.push(`</div>`);

    // CTA
    htmlParts.push(`<div style="padding:18px 20px 24px 20px;">`);
    if (mailto) {
      htmlParts.push(
        `<a href="${escapeHtml(mailto)}" style="display:inline-block;background:#f59e0b;color:#0a0e1a;text-decoration:none;font-weight:700;padding:12px 18px;border-radius:12px;">Répondre au client</a>`,
      );
    } else {
      htmlParts.push(`<p style="margin:10px 0 0 0;color:#6b7280;font-size:14px;">Email client introuvable.</p>`);
    }
    htmlParts.push(`</div>`);
  }

  // Footer
  htmlParts.push(`<p style="margin:0;padding:0 20px 18px 20px;font-size:12px;color:#6b7280;">Message envoyé depuis dev-craft.store</p>`);
  htmlParts.push(`</div></div>`);

  const html = htmlParts.join("");

  const text =
    kind === "exchange"
      ? [
          "Nouvelle demande d’échange — DevCraft",
          `Nom: ${payload.nom ?? "-"}`,
          `Email: ${payload.email ?? "-"}`,
          `Téléphone: ${payload.telephone ?? "-"}`,
          `Créneau: ${payload.creneau ?? "-"}`,
          `Message: ${payload.message ?? "-"}`,
        ].join("\n")
      : [
          "🚀 Nouvelle demande de projet — DevCraft",
          "",
          `Nom: ${fullNameQualification ?? payload.nom ?? "-"}`,
          `Email: ${payload.email ?? "-"}`,
          `Téléphone: ${payload.telephone ?? "-"}`,
          "",
          `Type de site: ${payload.typeSite ?? "-"}`,
          `Budget: ${payload.budget ?? "-"}`,
          `Délai: ${payload.delai ?? "-"}`,
          "",
          `Message: ${payload.description ?? "-"}`,
          "",
          `Comment il nous a connu: ${payload.commentConnu ?? "-"}`,
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

