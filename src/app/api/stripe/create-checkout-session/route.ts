import { NextResponse } from "next/server";
import type { DepositConfig } from "@/types/payment";
import { getDepositConfig, OFFER_IDS } from "@/config/deposits";
import { getStripeServer, getBaseUrl } from "@/lib/stripe/config";

type OfferId = "vitrine" | "complet" | "abonnement" | "personnalise";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { offerId, successUrl, cancelUrl, clientReferenceId, customerEmail } = body as {
      offerId?: OfferId;
      successUrl?: string;
      cancelUrl?: string;
      clientReferenceId?: string;
      customerEmail?: string;
    };

    if (!offerId || !OFFER_IDS.includes(offerId)) {
      return NextResponse.json(
        { error: "Type d'offre invalide" },
        { status: 400 }
      );
    }

    const config: DepositConfig = getDepositConfig(offerId);
    if (config.amountCents == null || config.amountCents <= 0) {
      return NextResponse.json(
        { error: "Cette offre ne permet pas de paiement en ligne. Contactez-nous pour un devis personnalisé." },
        { status: 400 }
      );
    }

    const stripe = getStripeServer();
    if (!stripe) {
      return NextResponse.json(
        { error: "Paiement non configuré. Nous vous recontacterons pour finaliser." },
        { status: 503 }
      );
    }

    const baseUrl = getBaseUrl();
    const finalSuccessUrl = successUrl ?? `${baseUrl}/paiement-confirme?session_id={CHECKOUT_SESSION_ID}`;
    const finalCancelUrl = cancelUrl ?? `${baseUrl}/paiement-annule?offer=${offerId}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: config.amountCents,
            product_data: {
              name: config.shortLabel,
              description: config.description,
              images: [],
            },
          },
        },
      ],
      success_url: finalSuccessUrl,
      cancel_url: finalCancelUrl,
      client_reference_id: clientReferenceId ?? offerId,
      customer_email: customerEmail || undefined,
      metadata: {
        offerId,
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Impossible de créer la session de paiement" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[create-checkout-session]", err);
    return NextResponse.json(
      { error: "Une erreur est survenue. Veuillez réessayer ou nous contacter." },
      { status: 500 }
    );
  }
}
