import { NextRequest, NextResponse } from "next/server";
import { markAsPaid, isPaid } from "@/lib/payment-store";
import type Stripe from "stripe";

/**
 * Webhook Stripe -- recoit les evenements de paiement.
 * IMPORTANT : ne pas parser le body en JSON automatiquement.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Signature Stripe manquante" },
        { status: 400 }
      );
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!stripeSecretKey || !webhookSecret) {
      console.warn("[webhook] Cles Stripe manquantes — mode dev");
      return NextResponse.json({ received: true });
    }

    // Import dynamique de Stripe
    const StripeSDK = (await import("stripe")).default;
    const stripe = new StripeSDK(stripeSecretKey, {
      apiVersion: "2026-02-25.clover",
    });

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      );
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Signature invalide";
      console.error("[webhook] Signature invalide:", message);
      return NextResponse.json(
        { error: `Signature webhook invalide: ${message}` },
        { status: 400 }
      );
    }

    // Traitement des evenements
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data
        .object as Stripe.PaymentIntent;
      const dossierId = paymentIntent.metadata?.dossierId;
      const email = paymentIntent.metadata?.email;

      if (!dossierId || !email) {
        console.error(
          "[webhook] Metadata manquantes dans le PaymentIntent"
        );
        return NextResponse.json({ received: true });
      }

      // Idempotence : verifier si deja traite
      if (isPaid(dossierId)) {
        console.log(
          `[webhook] Dossier ${dossierId} deja marque comme paye — idempotent`
        );
        return NextResponse.json({ received: true });
      }

      // Marquer comme paye
      markAsPaid(dossierId, email, paymentIntent.id);
      console.log(
        `[webhook] Paiement confirme pour dossier ${dossierId}, email ${email}`
      );
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[webhook] Erreur:", error);
    return NextResponse.json(
      { error: "Erreur webhook" },
      { status: 500 }
    );
  }
}
