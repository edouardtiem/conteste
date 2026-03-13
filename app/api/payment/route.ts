import { NextRequest, NextResponse } from "next/server";
import { PRIX_MVP } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { dossierId?: string; email?: string };

    if (!body.dossierId || !body.email) {
      return NextResponse.json(
        { success: false, error: "Identifiant du dossier et email requis" },
        { status: 400 }
      );
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    // Si pas de clé Stripe, retourner un mock pour le dev
    if (!stripeSecretKey) {
      console.warn("[payment] STRIPE_SECRET_KEY manquante — mode dev, retour mock");
      return NextResponse.json({
        success: true,
        data: {
          clientSecret: `mock_secret_${body.dossierId}_${Date.now()}`,
          paymentIntentId: `mock_pi_${body.dossierId}_${Date.now()}`,
        },
      });
    }

    // Import dynamique de Stripe (côté serveur uniquement)
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2026-02-25.clover",
    });

    // Prix dynamique V2 (CODE COMMENTÉ, pas actif) :
    // function getPrix(montantAmende: number): number {
    //   if (montantAmende < 68) return 799;    // 7,99 EUR
    //   if (montantAmende <= 200) return 1490;  // 14,90 EUR
    //   return 2490;                            // 24,90 EUR
    // }
    // const amount = getPrix(body.montantAmende);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: PRIX_MVP,
      currency: "eur",
      metadata: {
        dossierId: body.dossierId,
        email: body.email,
      },
      payment_method_types: ["card"],
      // Apple Pay et Google Pay sont gérés automatiquement
      // via le Payment Element côté client
    });

    return NextResponse.json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      },
    });
  } catch (error) {
    console.error("[payment] Erreur:", error);
    const message =
      error instanceof Error ? error.message : "Erreur lors de la creation du paiement";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
