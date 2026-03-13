import { describe, it, expect, vi, beforeEach } from "vitest";

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

// Mock payment-store
vi.mock("@/lib/payment-store", () => {
  const paidDossiers = new Set<string>();
  const generatedPacks = new Set<string>();
  const storedPacks = new Map<string, unknown>();

  return {
    isPaid: (id: string) => paidDossiers.has(id),
    isPackGenerated: (id: string) => generatedPacks.has(id),
    markPackGenerated: (id: string) => generatedPacks.add(id),
    getStoredPack: (id: string) => storedPacks.get(id),
    storePack: (id: string, pack: unknown) => storedPacks.set(id, pack),
    // Helper pour les tests
    _markAsPaid: (id: string) => paidDossiers.add(id),
    _reset: () => {
      paidDossiers.clear();
      generatedPacks.clear();
      storedPacks.clear();
    },
  };
});

import { NextRequest } from "next/server";

const importRoute = () => import("@/app/api/pack/route");
const importStore = () =>
  import("@/lib/payment-store") as Promise<
    typeof import("@/lib/payment-store") & {
      _markAsPaid: (id: string) => void;
      _reset: () => void;
    }
  >;

describe("API /api/pack", () => {
  beforeEach(async () => {
    vi.resetModules();
    vi.unstubAllEnvs();
    vi.stubEnv("ANTHROPIC_API_KEY", "");
    vi.stubEnv("NODE_ENV", "development");
  });

  it("POST sans dossierId retourne 400", async () => {
    const { POST } = await importRoute();

    const req = new NextRequest("http://localhost/api/pack", {
      method: "POST",
      body: JSON.stringify({}),
    });

    const response = await POST(req);
    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.error).toContain("dossier");
  });

  it("POST en mode production sans paiement retourne 403", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const { POST } = await importRoute();

    const req = new NextRequest("http://localhost/api/pack", {
      method: "POST",
      body: JSON.stringify({ dossierId: "dossier-non-paye" }),
    });

    const response = await POST(req);
    expect(response.status).toBe(403);

    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.error).toContain("Paiement");
  });

  it("POST en mode dev avec dossierId retourne 200 et un pack mock", async () => {
    const { POST } = await importRoute();

    const req = new NextRequest("http://localhost/api/pack", {
      method: "POST",
      body: JSON.stringify({ dossierId: "test-dossier-123" }),
    });

    const response = await POST(req);
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data).toBeDefined();

    // Verifier la structure PackResult
    const pack = data.data;
    expect(Array.isArray(pack.arguments)).toBe(true);
    expect(pack.arguments.length).toBeGreaterThan(0);

    // Verifier chaque argument
    for (const arg of pack.arguments) {
      expect(arg.titre).toBeTruthy();
      expect(arg.explication).toBeTruthy();
      expect(arg.aMentionner).toBeTruthy();
      expect(arg.aEviter).toBeTruthy();
    }

    // Verifier le guide ANTAI
    expect(pack.guideAntai).toBeDefined();
    expect(pack.guideAntai.portail).toBe("antai");
    expect(pack.guideAntai.url).toContain("antai");
    expect(pack.guideAntai.etapes.length).toBeGreaterThan(0);
    expect(pack.guideAntai.motifRecommande).toBeTruthy();
    expect(pack.guideAntai.piecesJointes.length).toBeGreaterThan(0);
  });
});
