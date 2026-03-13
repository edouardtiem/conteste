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

// Mock stripe
vi.mock("stripe", () => ({
  default: class MockStripe {
    paymentIntents = {
      create: vi.fn().mockResolvedValue({
        id: "pi_mock_123",
        client_secret: "cs_mock_secret_123",
      }),
    };
  },
}));

import { NextRequest } from "next/server";

const importRoute = () => import("@/app/api/payment/route");

describe("API /api/payment", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
    vi.stubEnv("STRIPE_SECRET_KEY", "");
  });

  it("POST avec donnees valides sans cle Stripe retourne un mock", async () => {
    const { POST } = await importRoute();

    const req = new NextRequest("http://localhost/api/payment", {
      method: "POST",
      body: JSON.stringify({
        dossierId: "dossier-123",
        email: "test@example.com",
      }),
    });

    const response = await POST(req);
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data).toBeDefined();
    expect(data.data.clientSecret).toBeTruthy();
    expect(data.data.clientSecret).toContain("mock_secret");
    expect(data.data.paymentIntentId).toBeTruthy();
  });

  it("POST sans body retourne 400", async () => {
    const { POST } = await importRoute();

    const req = new NextRequest("http://localhost/api/payment", {
      method: "POST",
      body: JSON.stringify({}),
    });

    const response = await POST(req);
    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.error).toContain("requis");
  });

  it("POST sans email retourne 400", async () => {
    const { POST } = await importRoute();

    const req = new NextRequest("http://localhost/api/payment", {
      method: "POST",
      body: JSON.stringify({ dossierId: "dossier-123" }),
    });

    const response = await POST(req);
    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.success).toBe(false);
  });

  it("POST sans dossierId retourne 400", async () => {
    const { POST } = await importRoute();

    const req = new NextRequest("http://localhost/api/payment", {
      method: "POST",
      body: JSON.stringify({ email: "test@example.com" }),
    });

    const response = await POST(req);
    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.success).toBe(false);
  });
});
