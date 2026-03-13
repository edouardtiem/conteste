import { NextRequest, NextResponse } from "next/server";
import type { PackResult, AmendeExtracted } from "@/lib/types";
import { getResend } from "@/lib/resend";
import { ConfirmationPaiement } from "@/emails/ConfirmationPaiement";
import { formatDateFR } from "@/lib/utils";
import { logEmail } from "@/lib/dossier-store";
import { trackEvent, getClientIdFromCookie } from "@/lib/analytics";

interface EmailRequestBody {
  email?: string;
  dossierId?: string;
  pack?: PackResult;
  amende?: AmendeExtracted;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as EmailRequestBody;

    if (!body.email || !body.dossierId) {
      return NextResponse.json(
        { success: false, error: "Email et identifiant du dossier requis" },
        { status: 400 }
      );
    }

    const resend = getResend();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const prenom = body.amende?.prenom || "Utilisateur";
    const typeAmende = body.amende?.type || "amende";
    const montantAmende = body.amende?.montant
      ? `${body.amende.montant} EUR`
      : "Non renseigne";
    const dateLimite = body.amende?.dateLimiteContestation
      ? formatDateFR(body.amende.dateLimiteContestation)
      : "Non renseignee";
    const dateInfraction = body.amende?.dateInfraction || "";

    const subject = dateInfraction
      ? `Votre dossier Conteste.app — amende du ${formatDateFR(dateInfraction)}`
      : "Votre dossier Conteste.app est pret";

    const packData = body.pack;
    const emailContent = ConfirmationPaiement({
      prenom,
      numeroDossier: body.dossierId,
      typeAmende,
      montantAmende,
      dateLimite,
      lienDossier: `${baseUrl}/contest/pack?dossierId=${body.dossierId}`,
      pack: packData,
    });

    // Log email in DB
    try {
      await logEmail(body.email, body.dossierId, "confirmation");
    } catch (err) {
      console.error("[email] logEmail error:", err);
    }

    // Si pas de clé Resend, log en console (dev mode)
    if (!resend) {
      console.log("[email] Mode dev — email non envoye");
      console.log("[email] Destinataire:", body.email);
      console.log("[email] Objet:", subject);
      console.log("[email] Contenu: [template React Email]");
      const clientId = getClientIdFromCookie(request.headers.get("cookie"));
      trackEvent("email_sent", { email_type: "confirmation" }, clientId);
      return NextResponse.json({
        success: true,
        message: "Email simule en mode dev",
      });
    }

    const result = await resend.emails.send({
      from: "Conteste.app <bonjour@conteste.app>",
      to: body.email,
      subject,
      react: emailContent,
      tags: [{ name: "type", value: "confirmation" }],
    });

    console.log("[email] Email envoye:", result);

    const clientId = getClientIdFromCookie(request.headers.get("cookie"));
    trackEvent("email_sent", { email_type: "confirmation" }, clientId);

    return NextResponse.json({
      success: true,
      message: "Email envoye avec succes",
    });
  } catch (error) {
    console.error("[email] Erreur:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Erreur lors de l'envoi de l'email";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
