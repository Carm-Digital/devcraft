import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { getStripeServer, getBaseUrl } from "@/lib/stripe/config";
import { isKvStorageEnabled } from "@/lib/siteContent";

type PaymentKind = "acompte" | "solde";

type DemandeRecord = {
  clientId?: string;
  prenom?: string;
  nom?: string;
  email?: string;
  typeSite?: string;
  acompte?: number;
  solde?: number;
  statut?: string;
};

function parseDemande(raw: unknown): DemandeRecord | null {
  if (raw == null) return null;
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw) as DemandeRecord;
    } catch {
      return null;
    }
  }
  if (typeof raw === "object") return raw as DemandeRecord;
  return null;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as {
      clientId?: string;
      kind?: PaymentKind;
    } | null;

    const clientId = typeof body?.clientId === "string" ? body.clientId.trim() : "";
    const kind = body?.kind;

    if (!clientId || (kind !== "acompte" && kind !== "solde")) {
      return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
    }

    if (!isKvStorageEnabled()) {
      return NextResponse.json(
        { error: "Service temporairement indisponible." },
        { status: 503 },
      );
    }

    const raw = await kv.get<string | Record<string, unknown>>(`demande:${clientId}`);
    const demande = parseDemande(raw);
    if (!demande) {
      return NextResponse.json({ error: "Demande introuvable." }, { status: 404 });
    }

    const statut = demande.statut ?? "en_attente";
    const acompte = typeof demande.acompte === "number" && !Number.isNaN(demande.acompte) ? demande.acompte : 0;
    const solde = typeof demande.solde === "number" && !Number.isNaN(demande.solde) ? demande.solde : 0;

    let amountEuros = 0;
    let label = "";
    let description = "";

    if (kind === "acompte") {
      if (statut !== "en_attente") {
        return NextResponse.json(
          { error: "L’acompte ne peut plus être réglé pour cette demande." },
          { status: 400 },
        );
      }
      if (acompte <= 0) {
        return NextResponse.json({ error: "Aucun montant d’acompte défini." }, { status: 400 });
      }
      amountEuros = acompte;
      label = `Acompte — ${clientId}`;
      description = "Règlement de l’acompte pour votre projet DevCraft.";
    } else {
      if (statut !== "acompte_regle") {
        return NextResponse.json(
          { error: "Le solde ne peut être réglé qu’après l’acompte." },
          { status: 400 },
        );
      }
      if (solde <= 0) {
        return NextResponse.json({ error: "Aucun solde à régler." }, { status: 400 });
      }
      amountEuros = solde;
      label = `Solde — ${clientId}`;
      description = "Règlement du solde pour votre projet DevCraft.";
    }

    const amountCents = Math.round(amountEuros * 100);
    if (amountCents <= 0) {
      return NextResponse.json({ error: "Montant invalide." }, { status: 400 });
    }

    const stripe = getStripeServer();
    if (!stripe) {
      return NextResponse.json(
        { error: "Paiement non configuré. Contactez-nous pour finaliser." },
        { status: 503 },
      );
    }

    const baseUrl = getBaseUrl();
    const successUrl = `${baseUrl}/paiement-confirme?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${baseUrl}/reglement-devis?id=${encodeURIComponent(clientId)}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: amountCents,
            product_data: {
              name: label,
              description,
              images: [],
            },
          },
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      client_reference_id: clientId,
      customer_email: typeof demande.email === "string" ? demande.email : undefined,
      metadata: {
        clientId,
        paymentKind: kind,
      },
    });

    if (!session.url) {
      return NextResponse.json({ error: "Impossible de créer la session de paiement." }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[create-checkout-demande]", err);
    return NextResponse.json(
      { error: "Une erreur est survenue. Réessayez ou contactez-nous." },
      { status: 500 },
    );
  }
}
