import { describe, it, expect } from "vitest";
import type {
  AmendeExtracted,
  ScoringResult,
  PackResult,
  ScoreNiveau,
  AmendeType,
} from "@/lib/types";
import { PRIX_MVP, PRIX_MVP_DISPLAY } from "@/lib/types";

describe("AmendeExtracted - validation de structure", () => {
  const amendeValide: AmendeExtracted = {
    numero: "2026ARC0034567",
    type: "vitesse",
    montant: 135,
    dateInfraction: "2026-02-15",
    lieuInfraction: "Autoroute A6, km 234",
    organismeEmetteur: "Centre automatise de Rennes",
    dateLimiteContestation: "2026-04-01",
    nom: "DUPONT",
    prenom: "Jean",
    adresse: "12 rue de la Paix",
    codePostal: "75002",
    ville: "Paris",
  };

  it("un objet AmendeExtracted valide a tous les champs requis", () => {
    expect(amendeValide.numero).toBeTruthy();
    expect(amendeValide.type).toBe("vitesse");
    expect(amendeValide.montant).toBeGreaterThan(0);
    expect(amendeValide.dateInfraction).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(amendeValide.lieuInfraction).toBeTruthy();
    expect(amendeValide.organismeEmetteur).toBeTruthy();
    expect(amendeValide.dateLimiteContestation).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(amendeValide.nom).toBeTruthy();
    expect(amendeValide.prenom).toBeTruthy();
    expect(amendeValide.adresse).toBeTruthy();
    expect(amendeValide.codePostal).toMatch(/^\d{5}$/);
    expect(amendeValide.ville).toBeTruthy();
  });

  it("verifie que le type est un AmendeType valide", () => {
    const typesValides: AmendeType[] = [
      "stationnement",
      "vitesse",
      "feux",
      "ceinture",
      "telephone",
      "autre",
    ];
    expect(typesValides).toContain(amendeValide.type);
  });

  it("detecte un montant negatif comme invalide", () => {
    const amendeInvalide: AmendeExtracted = {
      ...amendeValide,
      montant: -50,
    };
    expect(amendeInvalide.montant).toBeLessThan(0);
  });

  it("detecte une date invalide", () => {
    const dateInvalide = "pas-une-date";
    const parsed = new Date(dateInvalide);
    expect(isNaN(parsed.getTime())).toBe(true);
  });

  it("detecte un code postal invalide", () => {
    const codePostalInvalide = "ABC";
    expect(codePostalInvalide).not.toMatch(/^\d{5}$/);
  });
});

describe("ScoringResult - validation de structure", () => {
  it("un scoring valide a tous les champs requis", () => {
    const scoring: ScoringResult = {
      score: 78,
      niveau: "fort",
      motifPrincipal: "Signalisation non conforme",
      alerte: null,
      teaser: "Plusieurs elements renforcent votre dossier",
      recommandation: "Nous recommandons de contester",
    };

    expect(scoring.score).toBeGreaterThanOrEqual(0);
    expect(scoring.score).toBeLessThanOrEqual(100);
    expect(["fort", "moyen", "faible"]).toContain(scoring.niveau);
    expect(scoring.motifPrincipal).toBeTruthy();
    expect(scoring.alerte).toBeNull();
    expect(scoring.teaser).toBeTruthy();
    expect(scoring.recommandation).toBeTruthy();
  });

  it("verifie les trois niveaux possibles", () => {
    const niveaux: ScoreNiveau[] = ["fort", "moyen", "faible"];
    expect(niveaux).toHaveLength(3);
  });
});

describe("PackResult - validation de structure", () => {
  it("un pack valide contient des arguments et un guide ANTAI", () => {
    const pack: PackResult = {
      arguments: [
        {
          titre: "Argument 1",
          explication: "Explication detaillee",
          aMentionner: "Points a mentionner",
          aEviter: "Points a eviter",
        },
      ],
      guideAntai: {
        portail: "antai",
        url: "https://www.antai.gouv.fr",
        etapes: [
          { numero: 1, action: "Etape 1", detail: "Detail etape 1" },
        ],
        motifRecommande: "Motif de contestation",
        piecesJointes: ["Copie de l'avis"],
      },
    };

    expect(pack.arguments.length).toBeGreaterThan(0);
    expect(pack.guideAntai.portail).toBe("antai");
    expect(pack.guideAntai.url).toContain("antai");
    expect(pack.guideAntai.etapes.length).toBeGreaterThan(0);
    expect(pack.guideAntai.motifRecommande).toBeTruthy();
    expect(pack.guideAntai.piecesJointes.length).toBeGreaterThan(0);
  });
});

describe("Constantes de prix", () => {
  it("PRIX_MVP vaut 1490 centimes", () => {
    expect(PRIX_MVP).toBe(1490);
  });

  it("PRIX_MVP_DISPLAY est 14,90 EUR", () => {
    expect(PRIX_MVP_DISPLAY).toBe("14,90 EUR");
  });
});
