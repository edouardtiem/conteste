import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock next/server
vi.mock("next/server", () => {
  class MockNextRequest {
    private _body: string;
    private _headers: Map<string, string>;

    constructor(
      _url: string,
      init?: { method?: string; body?: string; headers?: Record<string, string> }
    ) {
      this._body = init?.body ?? "";
      this._headers = new Map(Object.entries(init?.headers ?? {}));
    }

    async text(): Promise<string> {
      return this._body;
    }

    get headers() {
      const headersMap = this._headers;
      return {
        get: (name: string) => headersMap.get(name) ?? null,
      };
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

// Mock payment-store
vi.mock("@/lib/payment-store", () => ({
  markAsPaid: vi.fn(),
  isPaid: vi.fn().mockReturnValue(false),
}));

// Mock stripe
vi.mock("stripe", () => ({
  default: class MockStripe {
    webhooks = {
      constructEvent: vi.fn().mockImplementation(() => {
        throw new Error("Signature invalide mock");
      }),
    };
  },
}));

import { NextRequest } from "next/server";

const importRoute = () => import("@/app/api/webhook/route");

describe("API /api/webhook", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
  });

  it("POST sans header stripe-signature retourne 400", async () => {
    const { POST } = await importRoute();

    const req = new NextRequest("http://localhost/api/webhook", {
      method: "POST",
      body: JSON.stringify({ type: "payment_intent.succeeded" }),
    });

    const response = await POST(req);
    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.error).toContain("Signature");
  });

  it("POST sans cles Stripe en mode dev retourne received: true", async () => {
    vi.stubEnv("STRIPE_SECRET_KEY", "");
    vi.stubEnv("STRIPE_WEBHOOK_SECRET", "");

    const { POST } = await importRoute();

    const req = new NextRequest("http://localhost/api/webhook", {
      method: "POST",
      body: JSON.stringify({ type: "payment_intent.succeeded" }),
      headers: { "stripe-signature": "fake_sig_123" },
    });

    const response = await POST(req);
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.received).toBe(true);
  });

  it("POST avec signature invalide et cles Stripe retourne 400", async () => {
    vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_fake");
    vi.stubEnv("STRIPE_WEBHOOK_SECRET", "whsec_fake");

    const { POST } = await importRoute();

    const req = new NextRequest("http://localhost/api/webhook", {
      method: "POST",
      body: JSON.stringify({ type: "payment_intent.succeeded" }),
      headers: { "stripe-signature": "fake_invalid_sig" },
    });

    const response = await POST(req);
    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.error).toContain("invalide");
  });
});
