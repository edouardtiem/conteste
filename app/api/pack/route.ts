import { NextRequest, NextResponse } from "next/server";
import type { PackResult, AmendeExtracted } from "@/lib/types";
import {
  isPaid,
  isPackGenerated,
  markPackGenerated,
  getStoredPack,
  storePack,
} from "@/lib/payment-store";

/**
 * Mock réaliste pour le dev sans clé API.
 */
function getMockPack(): PackResult {
  return {
    arguments: [
      {
        titre: "Signalisation non conforme",
        explication:
          "Le panneau de limitation de vitesse situe avant la zone de controle n'est pas conforme aux prescriptions de l'arrete du 24 novembre 1967 relatif a la signalisation des routes et autoroutes. La signalisation doit etre visible, lisible et correctement positionnee pour etre opposable au contrevenant.",
        aMentionner:
          "Mentionnez la reference exacte de l'arrete du 24 novembre 1967, decrivez l'emplacement du panneau, sa visibilite reduite (vegetation, distance, angle). Si possible, joignez une photo du panneau.",
        aEviter:
          "Ne dites jamais que vous n'avez pas vu le panneau. Argumentez sur sa non-conformite reglementaire, pas sur votre perception.",
      },
      {
        titre: "Marge d'erreur technique de l'appareil de controle",
        explication:
          "Tout appareil de controle de vitesse est soumis a une marge d'erreur technique reglementaire. Pour une vitesse retenue inferieure a 100 km/h, la marge est de 5 km/h. Pour une vitesse superieure a 100 km/h, la marge est de 5%. Si la vitesse retenue apres marge est tres proche de la limite, la fiabilite de la mesure peut etre contestee.",
        aMentionner:
          "Demandez la communication du certificat d'homologation de l'appareil et du proces-verbal de sa derniere verification annuelle. Mentionnez l'article R. 130-11 du Code de la route.",
        aEviter:
          "N'affirmez pas que le radar est defaillant sans element de preuve. Demandez la verification — c'est votre droit.",
      },
    ],
    guideAntai: {
      portail: "antai",
      url: "https://www.antai.gouv.fr",
      etapes: [
        {
          numero: 1,
          action: "Accedez au portail ANTAI",
          detail:
            "Rendez-vous sur www.antai.gouv.fr et cliquez sur 'Contester en ligne'. Vous aurez besoin de votre numero d'avis de contravention et de votre nom de famille.",
        },
        {
          numero: 2,
          action: "Saisissez votre numero d'avis",
          detail:
            "Entrez le numero figurant en haut a droite de votre avis de contravention (format : 12 chiffres). Saisissez egalement votre nom de famille tel qu'il apparait sur l'avis.",
        },
        {
          numero: 3,
          action: "Selectionnez le motif de contestation",
          detail:
            "Choisissez 'Autre motif' dans la liste deroulante pour pouvoir rediger librement votre argumentation. Ne cochez pas 'vehicule vole' ou 'vehicule cede' sauf si c'est votre cas.",
        },
        {
          numero: 4,
          action: "Copiez-collez le motif recommande",
          detail:
            "Dans le champ 'Motif de la contestation', collez le texte que nous avons prepare pour vous (voir ci-dessous). Ne modifiez pas la formulation sauf pour ajouter des elements specifiques a votre situation.",
        },
        {
          numero: 5,
          action: "Joignez vos pieces justificatives et validez",
          detail:
            "Ajoutez les pieces justificatives recommandees (photos, copie de l'avis). Relisez l'ensemble, puis validez. Vous recevrez un accuse de reception par email de la part d'ANTAI.",
        },
      ],
      motifRecommande:
        "Je conteste l'avis de contravention dresse a mon encontre. La signalisation en amont de la zone de controle n'etait pas conforme aux prescriptions reglementaires (arrete du 24 novembre 1967, articles R. 411-25 et suivants du Code de la route). De plus, je demande la communication du certificat d'homologation et du dernier proces-verbal de verification de l'appareil de mesure utilise, conformement a l'article R. 130-11 du Code de la route. En l'absence de ces elements, la mesure ne saurait etre consideree comme fiable et opposable.",
      piecesJointes: [
        "Copie recto-verso de l'avis de contravention",
        "Photo du panneau de signalisation (si disponible)",
        "Tout document attestant de la non-conformite de la signalisation",
      ],
    },
  };
}

/**
 * Génère le pack via Claude API.
 */
async function generatePackWithClaude(
  amende: AmendeExtracted
): Promise<PackResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.warn("[pack] ANTHROPIC_API_KEY manquante — retour mock");
    return getMockPack();
  }

  const Anthropic = (await import("@anthropic-ai/sdk")).default;
  const client = new Anthropic({ apiKey });

  const prompt = `Tu es un assistant specialise dans la contestation d'amendes en France.
Tu aides les utilisateurs a comprendre leurs chances et a contester efficacement via ANTAI.

REGLES ABSOLUES :
1. Tu ne fournis jamais de conseil juridique personnalise au sens legal.
2. Tu es honnete sur les chances de succes — tu ne survends pas.
3. Tu detectes et alertes immediatement les cas bloquants.
4. Meme en cas de faibles chances, tu expliques pourquoi ca peut quand meme passer.
5. Tu adaptes le guide ANTAI au type d'amende (ANTAI vs portail commune pour FPS).

PHASE PACK COMPLET — retourne un JSON :
{
  "arguments": [
    {
      "titre": "string",
      "explication": "string — formule pour ce cas precis",
      "a_mentionner": "string",
      "a_eviter": "string"
    }
  ],
  "guide_antai": {
    "portail": "ANTAI" | "commune" | "operateur",
    "url": "string",
    "etapes": [
      {
        "numero": number,
        "action": "string",
        "detail": "string"
      }
    ],
    "motif_recommande": "string — texte exact a copier-coller dans le champ motif",
    "pieces_jointes": ["string"]
  }
}

Voici les donnees de l'amende :
- Type : ${amende.type}
- Montant : ${amende.montant} EUR
- Date infraction : ${amende.dateInfraction}
- Lieu : ${amende.lieuInfraction}
- Organisme : ${amende.organismeEmetteur}
- Numero avis : ${amende.numero}
- Nom : ${amende.nom} ${amende.prenom}

Genere 2 a 3 arguments solides et un guide ANTAI complet avec 5 etapes.
Retourne UNIQUEMENT le JSON, sans texte avant ou apres.`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4000,
    messages: [{ role: "user", content: prompt }],
  });

  const textBlock = response.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("Reponse Claude vide");
  }

  // Parser le JSON de la réponse
  const raw = JSON.parse(textBlock.text) as {
    arguments: Array<{
      titre: string;
      explication: string;
      a_mentionner: string;
      a_eviter: string;
    }>;
    guide_antai: {
      portail: string;
      url: string;
      etapes: Array<{ numero: number; action: string; detail: string }>;
      motif_recommande: string;
      pieces_jointes: string[];
    };
  };

  // Mapper vers nos types (snake_case -> camelCase)
  const pack: PackResult = {
    arguments: raw.arguments.map((arg) => ({
      titre: arg.titre,
      explication: arg.explication,
      aMentionner: arg.a_mentionner,
      aEviter: arg.a_eviter,
    })),
    guideAntai: {
      portail: raw.guide_antai.portail.toLowerCase() as "antai" | "commune" | "operateur",
      url: raw.guide_antai.url,
      etapes: raw.guide_antai.etapes,
      motifRecommande: raw.guide_antai.motif_recommande,
      piecesJointes: raw.guide_antai.pieces_jointes,
    },
  };

  return pack;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as {
      dossierId?: string;
      amende?: AmendeExtracted;
    };

    if (!body.dossierId) {
      return NextResponse.json(
        { success: false, error: "Identifiant du dossier manquant" },
        { status: 400 }
      );
    }

    const isDev = process.env.NODE_ENV === "development";

    // SECURITE CRITIQUE : vérifier le paiement
    if (!isDev && !isPaid(body.dossierId)) {
      return NextResponse.json(
        { success: false, error: "Paiement non verifie pour ce dossier" },
        { status: 403 }
      );
    }

    // Idempotence : si pack déjà généré, le retourner
    if (isPackGenerated(body.dossierId)) {
      const existingPack = getStoredPack(body.dossierId);
      if (existingPack) {
        return NextResponse.json({
          success: true,
          data: existingPack,
        });
      }
    }

    // Générer le pack
    let pack: PackResult;

    if (body.amende) {
      pack = await generatePackWithClaude(body.amende);
    } else {
      // Pas de données amende — retourner le mock
      pack = getMockPack();
    }

    // Stocker le pack
    storePack(body.dossierId, pack);
    markPackGenerated(body.dossierId);

    return NextResponse.json({
      success: true,
      data: pack,
    });
  } catch (error) {
    console.error("[pack] Erreur:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Erreur lors de la generation du pack";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
