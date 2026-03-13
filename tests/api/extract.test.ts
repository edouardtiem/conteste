import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock next/server
vi.mock("next/server", () => {
  class MockNextRequest {
    private _formData: FormData | null;
    private _url: string;

    constructor(url: string, init?: { method?: string; body?: FormData }) {
      this._url = url;
      this._formData = init?.body instanceof FormData ? init.body : null;
    }

    async formData(): Promise<FormData> {
      if (!this._formData) {
        throw new Error("No FormData");
      }
      return this._formData;
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

// Importer la route apres les mocks
const importRoute = () => import("@/app/api/extract/route");

describe("API /api/extract", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
    // S'assurer que la cle API n'est pas definie pour utiliser le mock
    vi.stubEnv("ANTHROPIC_API_KEY", "");
  });

  it("POST sans fichier retourne 400", async () => {
    const { POST } = await importRoute();
    const formData = new FormData();
    const req = new NextRequest("http://localhost/api/extract", {
      method: "POST",
      body: formData,
    });

    const response = await POST(req);
    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.error).toContain("fichier");
  });

  it("POST avec fichier trop gros retourne 400", async () => {
    const { POST } = await importRoute();

    // Creer un blob de 11 Mo
    const bigContent = new Uint8Array(11 * 1024 * 1024);
    const bigFile = new File([bigContent], "big.jpg", { type: "image/jpeg" });

    const formData = new FormData();
    formData.append("file", bigFile);

    const req = new NextRequest("http://localhost/api/extract", {
      method: "POST",
      body: formData,
    });

    const response = await POST(req);
    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.error).toContain("volumineux");
  });

  it("POST avec format non supporte retourne 400", async () => {
    const { POST } = await importRoute();

    const txtFile = new File(["hello"], "test.txt", { type: "text/plain" });
    const formData = new FormData();
    formData.append("file", txtFile);

    const req = new NextRequest("http://localhost/api/extract", {
      method: "POST",
      body: formData,
    });

    const response = await POST(req);
    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.error).toContain("Format non supporte");
  });

  it("POST avec image valide sans cle API retourne le mock", async () => {
    const { POST } = await importRoute();

    const imgContent = new Uint8Array([0xff, 0xd8, 0xff, 0xe0]); // JPEG header
    const imgFile = new File([imgContent], "amende.jpg", {
      type: "image/jpeg",
    });

    const formData = new FormData();
    formData.append("file", imgFile);

    const req = new NextRequest("http://localhost/api/extract", {
      method: "POST",
      body: formData,
    });

    const response = await POST(req);
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data).toBeDefined();

    // Verifier la structure AmendeExtracted
    const amende = data.data;
    expect(amende.numero).toBeTruthy();
    expect(amende.type).toBeTruthy();
    expect(typeof amende.montant).toBe("number");
    expect(amende.dateInfraction).toBeTruthy();
    expect(amende.lieuInfraction).toBeTruthy();
    expect(amende.organismeEmetteur).toBeTruthy();
    expect(amende.nom).toBeTruthy();
    expect(amende.prenom).toBeTruthy();
    expect(amende.adresse).toBeTruthy();
    expect(amende.codePostal).toBeTruthy();
    expect(amende.ville).toBeTruthy();
  });

  it("POST avec PDF valide sans cle API retourne le mock", async () => {
    const { POST } = await importRoute();

    const pdfContent = new Uint8Array([0x25, 0x50, 0x44, 0x46]); // PDF header
    const pdfFile = new File([pdfContent], "amende.pdf", {
      type: "application/pdf",
    });

    const formData = new FormData();
    formData.append("file", pdfFile);

    const req = new NextRequest("http://localhost/api/extract", {
      method: "POST",
      body: formData,
    });

    const response = await POST(req);
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data.numero).toBeTruthy();
  });
});
