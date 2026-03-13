import { describe, it, expect, vi, beforeEach } from "vitest";
import type { AmendeExtracted } from "@/lib/types";

// Mock next/server
vi.mock("next/server", () => {
  class MockNextRequest {
    private _body: string;

    constructor(_url: string, init?: { method?: string; body?: string }) {
      this._body = init?.body ?? "";
    }

    async json(): Promise<unknown> {
      return JSON.parse(this._body);
    }
  }

  return {
    NextRequest: MockNextRequest,
    NextResponse: {
      json: (body: unknown, init?: { status?: number }) => ({
        status: init?.status ?? 200,
        json: async () => body,
        body,
      }),
    },
  };
});

// Mock Anthropic SDK
vi.mock("@anthropic-ai/sdk", () => ({
  default: class MockAnthropic {
    messages = {
      create: vi.fn(),
    };
  },
}));

import { NextRequest } from "next/server";

const importRoute = () => import("@/app/api/score/route");

function creerAmendeValide(): AmendeExtracted {
  return {
    numero: "2026ARC0034567",
    type: "vitesse",
    montant: 135,
    dateInfraction: "2026-02-15",
    lieuInfraction: "Autoroute A6, km 234",
    organismeEmetteur: "Centre automatise de Rennes",
    dateLimiteContestation: "2027-04-01", // futur lointain
    nom: "DUPONT",
    prenom: "Jean",
    adresse: "12 rue de la Paix",
    codePostal: "75002",
    ville: "Paris",
  };
}

describe("API /api/score", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
    vi.stubEnv("ANTHROPIC_API_KEY", "");
  });

  it("POST avec donnees valides retourne 200 et une structure ScoringResult", async () => {
    const { POST } = await importRoute();
    const amende = creerAmendeValide();

    const req = new NextRequest("http://localhost/api/score", {
      method: "POST",
      body: JSON.stringify(amende),
    });

    const response = await POST(req);
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data).toBeDefined();
    expect(typeof data.data.score).toBe("number");
    expect(data.data.score).toBeGreaterThanOrEqual(0);
    expect(data.data.score).toBeLessThanOrEqual(100);
    expect(["fort", "moyen", "faible"]).toContain(data.data.niveau);
    expect(data.data.motifPrincipal).toBeTruthy();
    expect(data.data.teaser).toBeTruthy();
    expect(data.data.recommandation).toBeTruthy();
  });

  it("POST avec dateLimiteContestation passee retourne alerte delai depasse", async () => {
    const { POST } = await importRoute();
    const amende = creerAmendeValide();
    amende.dateLimiteContestation = "2020-01-01"; // passe

    const req = new NextRequest("http://localhost/api/score", {
      method: "POST",
      body: JSON.stringify(amende),
    });

    const response = await POST(req);
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data.score).toBe(0);
    expect(data.data.niveau).toBe("faible");
    expect(data.data.alerte).toBeTruthy();
    expect(data.data.alerte).toContain("depasse");
  });

  it("POST avec montant 0 retourne 400 car montant falsy considere comme manquant", async () => {
    const { POST } = await importRoute();
    const amende = creerAmendeValide();
    amende.montant = 0;

    const req = new NextRequest("http://localhost/api/score", {
      method: "POST",
      body: JSON.stringify(amende),
    });

    const response = await POST(req);
    // Le code verifie !amende.montant, qui est true pour 0
    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.error).toContain("manquantes");
  });

  it("POST avec body invalide retourne 400", async () => {
    const { POST } = await importRoute();

    const req = new NextRequest("http://localhost/api/score", {
      method: "POST",
      body: JSON.stringify({}),
    });

    const response = await POST(req);
    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.success).toBe(false);
  });

  it("POST avec amende majoree retourne alerte specifique", async () => {
    const { POST } = await importRoute();
    const amende = creerAmendeValide();
    amende.organismeEmetteur = "Amende majoree - Tresor public";

    const req = new NextRequest("http://localhost/api/score", {
      method: "POST",
      body: JSON.stringify(amende),
    });

    const response = await POST(req);
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data.score).toBe(0);
    expect(data.data.alerte).toContain("majoree");
  });
});
