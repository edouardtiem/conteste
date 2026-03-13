import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import type { AmendeExtracted, ScoringResult } from "@/lib/types";
import { estDelaiDepasse } from "@/lib/utils";

interface ArgumentPreview {
  titre: string;
  resume: string;
}

interface ScoringResultWithArgs extends ScoringResult {
  argumentsPreview: ArgumentPreview[];
}

const SCORING_PROMPT = (amende: AmendeExtracted) =>
  `Analyse cette amende française et évalue les chances de contestation.
Type: ${amende.type}, Montant: ${amende.montant}€, Lieu: ${amende.lieuInfraction}, Date: ${amende.dateInfraction}
Retourne UNIQUEMENT un JSON valide :
{
  "score": <nombre 0-100>,
  "niveau": "<fort|moyen|faible>",
  "motifPrincipal": "<string>",
  "teaser": "<1 phrase d'accroche sans révéler les arguments>",
  "recommandation": "<string>",
  "argumentsPreview": [
    { "titre": "<string>", "resume": "<string court>" },
    { "titre": "<string>", "resume": "<string court>" },
    { "titre": "<string>", "resume": "<string court>" }
  ]
}`;

function getMockScoring(): ScoringResultWithArgs {
  return {
    score: 78,
    niveau: "fort",
    motifPrincipal: "Signalisation potentiellement non conforme",
    alerte: null,
    teaser:
      "Plusieurs elements factuels renforcent votre dossier de contestation.",
    recommandation:
      "Bonne chance d'aboutir — nous recommandons de contester.",
    argumentsPreview: [
      {
        titre: "Defaut de signalisation",
        resume:
          "La signalisation sur le lieu de l'infraction presente des irregularites documentables.",
      },
      {
        titre: "Vice de procedure",
        resume:
          "L'avis de contravention comporte des elements qui pourraient constituer un vice de procedure.",
      },
      {
        titre: "Marge d'erreur technique",
        resume:
          "Les appareils de controle ont une marge d'erreur legale qui pourrait jouer en votre faveur.",
      },
    ],
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const amende = body as AmendeExtracted;

    if (!amende || !amende.type || !amende.montant) {
      return NextResponse.json(
        { success: false, error: "Donnees de l'amende manquantes" },
        { status: 400 }
      );
    }

    // --- Cas bloquants ---

    // 1. Delai depasse
    if (
      amende.dateLimiteContestation &&
      estDelaiDepasse(amende.dateLimiteContestation)
    ) {
      const result: ScoringResultWithArgs = {
        score: 0,
        niveau: "faible",
        motifPrincipal: "Delai depasse",
        alerte:
          "Le delai legal de contestation de 45 jours est depasse. Il n'est malheureusement plus possible de contester cette amende dans les conditions normales.",
        teaser: "",
        recommandation:
          "Le delai de contestation est depasse. Nous ne pouvons pas vous aider sur ce dossier.",
        argumentsPreview: [],
      };
      return NextResponse.json({ success: true, data: result });
    }

    // 2. Montant a 0
    if (amende.montant === 0) {
      const result: ScoringResultWithArgs = {
        score: 0,
        niveau: "faible",
        motifPrincipal: "Donnees incorrectes",
        alerte: "Donnees incorrectes — le montant de l'amende semble invalide.",
        teaser: "",
        recommandation:
          "Veuillez verifier les informations de votre amende.",
        argumentsPreview: [],
      };
      return NextResponse.json({ success: true, data: result });
    }

    // 3. Amende majoree
    const texteComplet = JSON.stringify(amende).toLowerCase();
    if (texteComplet.includes("majoree") || texteComplet.includes("majorée")) {
      const result: ScoringResultWithArgs = {
        score: 0,
        niveau: "faible",
        motifPrincipal: "Amende majoree",
        alerte:
          "Pour contester une amende majoree, vous devez d'abord consigner le montant de l'amende. Contester sans consigner peut aggraver votre situation.",
        teaser: "",
        recommandation:
          "Consignez d'abord le montant de l'amende majoree avant de contester.",
        argumentsPreview: [],
      };
      return NextResponse.json({ success: true, data: result });
    }

    // --- Scoring via Claude ---

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.warn(
        "[score] ANTHROPIC_API_KEY manquante — retour de donnees mock"
      );
      return NextResponse.json({
        success: true,
        data: getMockScoring(),
      });
    }

    const client = new Anthropic({ apiKey });

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: `Tu es un assistant spécialisé dans la contestation d'amendes en France.
Tu aides les utilisateurs à comprendre leurs chances et à contester efficacement via ANTAI.
RÈGLES ABSOLUES :
1. Tu ne fournis jamais de conseil juridique personnalisé au sens légal.
2. Tu es honnête sur les chances de succès — tu ne survends pas.
3. Même en cas de faibles chances, tu expliques pourquoi ça peut quand même passer.`,
      messages: [
        {
          role: "user",
          content: SCORING_PROMPT(amende),
        },
      ],
    });

    const responseText = message.content
      .filter(
        (block): block is Anthropic.TextBlock => block.type === "text"
      )
      .map((block) => block.text)
      .join("");

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      // Fallback mock si le parsing echoue
      return NextResponse.json({
        success: true,
        data: getMockScoring(),
      });
    }

    const parsed = JSON.parse(jsonMatch[0]);

    const scoring: ScoringResultWithArgs = {
      score: Number(parsed.score) || 50,
      niveau: parsed.niveau || "moyen",
      motifPrincipal: parsed.motifPrincipal || "",
      alerte: null,
      teaser: parsed.teaser || "",
      recommandation: parsed.recommandation || "",
      argumentsPreview: Array.isArray(parsed.argumentsPreview)
        ? parsed.argumentsPreview.map(
            (arg: { titre?: string; resume?: string }) => ({
              titre: arg.titre || "",
              resume: arg.resume || "",
            })
          )
        : [],
    };

    return NextResponse.json({
      success: true,
      data: scoring,
    });
  } catch (error) {
    console.error("Scoring error:", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          error: "Donnees invalides. Veuillez reessayer.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error:
          "Une erreur est survenue lors de l'analyse. Veuillez reessayer.",
      },
      { status: 500 }
    );
  }
}
