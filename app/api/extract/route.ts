import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import type { AmendeExtracted } from "@/lib/types";
import { calculerDateLimite } from "@/lib/utils";
import { createDossier } from "@/lib/dossier-store";
import { trackEvent, getClientIdFromCookie } from "@/lib/analytics";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const EXTRACTION_PROMPT = `Extrais de cet avis de contravention français les informations suivantes.
Retourne UNIQUEMENT un JSON valide avec ces champs :
- numero (string) : numéro de l'avis de contravention
- type (string) : un parmi stationnement|vitesse|feux|ceinture|telephone|autre
- montant (number) : montant en euros
- dateInfraction (string) : date au format ISO YYYY-MM-DD
- lieuInfraction (string) : lieu complet
- organismeEmetteur (string)
- nom (string), prenom (string), adresse (string), codePostal (string), ville (string)
- confidence (number 0-1) : ton niveau de confiance dans l'extraction
Si tu ne peux pas lire le document, retourne { "error": "illisible", "confidence": 0 }`;

function getMockData(): AmendeExtracted {
  return {
    numero: "2026ARC0034567",
    type: "vitesse",
    montant: 135,
    dateInfraction: "2026-02-15",
    lieuInfraction: "Autoroute A6, km 234, sens Paris-Lyon",
    organismeEmetteur: "Centre automatise de constatation des infractions routieres de Rennes",
    dateLimiteContestation: "2026-04-01",
    nom: "DUPONT",
    prenom: "Jean",
    adresse: "12 rue de la Paix",
    codePostal: "75002",
    ville: "Paris",
  };
}

function getMediaType(
  mimeType: string
): "image/jpeg" | "image/png" | "image/gif" | "image/webp" {
  if (mimeType === "image/png") return "image/png";
  if (mimeType === "image/gif") return "image/gif";
  if (mimeType === "image/webp") return "image/webp";
  return "image/jpeg";
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { success: false, error: "Aucun fichier fourni" },
        { status: 400 }
      );
    }

    // Validation taille
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: "Le fichier est trop volumineux. Taille maximum : 10 Mo.",
        },
        { status: 400 }
      );
    }

    // Validation format
    const isImage = file.type.startsWith("image/");
    const isPdf = file.type === "application/pdf";
    if (!isImage && !isPdf) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Format non supporte. Veuillez utiliser un fichier JPG, PNG ou PDF.",
        },
        { status: 400 }
      );
    }

    // Si pas de cle API, retourner des donnees mock
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.warn(
        "[extract] ANTHROPIC_API_KEY manquante — retour de donnees mock"
      );
      const mockData = getMockData();
      let dossierId: string | undefined;
      try {
        dossierId = await createDossier(mockData);
      } catch (err) {
        console.error("[extract] Erreur creation dossier (mock):", err);
      }
      const clientId = getClientIdFromCookie(request.headers.get("cookie"));
      trackEvent("extraction_complete", { amende_type: mockData.type, departement: mockData.codePostal?.slice(0, 2) || "" }, clientId);
      return NextResponse.json({
        success: true,
        data: mockData,
        dossierId,
      });
    }

    // Convertir en base64
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    // Appeler Claude Vision
    const client = new Anthropic({ apiKey });

    const content: Anthropic.MessageCreateParams["messages"][0]["content"] = [];

    if (isPdf) {
      content.push({
        type: "document",
        source: {
          type: "base64",
          media_type: "application/pdf",
          data: base64,
        },
      });
    } else {
      content.push({
        type: "image",
        source: {
          type: "base64",
          media_type: getMediaType(file.type),
          data: base64,
        },
      });
    }

    content.push({
      type: "text",
      text: EXTRACTION_PROMPT,
    });

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content,
        },
      ],
    });

    // Extraire le texte de la reponse
    const responseText = message.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("");

    // Parser le JSON de la reponse
    // Claude peut retourner le JSON dans un bloc markdown ```json ... ```
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Impossible de lire ce document. Veuillez reessayer avec une photo plus nette.",
        },
        { status: 422 }
      );
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // Verifier si le document est illisible
    if (parsed.error === "illisible" || parsed.confidence === 0) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Le document est illisible. Veuillez prendre une nouvelle photo bien eclairee et nette.",
        },
        { status: 422 }
      );
    }

    // Confiance trop basse
    if (typeof parsed.confidence === "number" && parsed.confidence < 0.3) {
      return NextResponse.json(
        {
          success: false,
          error:
            "La qualite de l'image ne permet pas une extraction fiable. Veuillez reessayer avec une photo plus nette.",
        },
        { status: 422 }
      );
    }

    // Calculer la date limite de contestation
    const dateLimite = calculerDateLimite(parsed.dateInfraction);

    const extracted: AmendeExtracted = {
      numero: parsed.numero || "",
      type: parsed.type || "autre",
      montant: Number(parsed.montant) || 0,
      dateInfraction: parsed.dateInfraction || "",
      lieuInfraction: parsed.lieuInfraction || "",
      organismeEmetteur: parsed.organismeEmetteur || "",
      dateLimiteContestation: dateLimite.toISOString().slice(0, 10),
      nom: parsed.nom || "",
      prenom: parsed.prenom || "",
      adresse: parsed.adresse || "",
      codePostal: parsed.codePostal || "",
      ville: parsed.ville || "",
    };

    // Create dossier in DB
    let dossierId: string | undefined;
    try {
      dossierId = await createDossier(extracted);
    } catch (err) {
      console.error("[extract] Erreur creation dossier:", err);
    }

    const clientId = getClientIdFromCookie(request.headers.get("cookie"));
    trackEvent("extraction_complete", { amende_type: extracted.type, departement: extracted.codePostal?.slice(0, 2) || "" }, clientId);

    return NextResponse.json({
      success: true,
      data: extracted,
      dossierId,
    });
  } catch (error) {
    console.error("Extraction error:", error);

    // Erreur de parsing JSON
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Impossible de traiter la reponse. Veuillez reessayer.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Une erreur est survenue lors de l'extraction. Veuillez reessayer.",
      },
      { status: 500 }
    );
  }
}
