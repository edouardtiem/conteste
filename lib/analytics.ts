import { randomUUID } from "crypto";

/**
 * Server-side GA4 Measurement Protocol tracking.
 * Fire-and-forget — never blocks the API response.
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number>,
  clientId?: string
) {
  const measurementId = process.env.NEXT_PUBLIC_GA_ID;
  const apiSecret = process.env.GA_API_SECRET;

  if (!measurementId || !apiSecret) return;

  const cid = clientId || randomUUID();

  fetch(
    `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
    {
      method: "POST",
      body: JSON.stringify({
        client_id: cid,
        events: [{ name: eventName, params: params || {} }],
      }),
    }
  ).catch((err) => {
    console.error("[analytics] GA4 event error:", err);
  });
}

/**
 * Extract GA client ID from the _ga cookie value.
 * Cookie format: GA1.1.XXXXXXXXXX.XXXXXXXXXX
 * Returns the last two segments joined by a dot, or undefined.
 */
export function getClientIdFromCookie(
  cookieHeader: string | null
): string | undefined {
  if (!cookieHeader) return undefined;

  const match = cookieHeader.match(/_ga=GA\d+\.\d+\.(.+?)(?:;|$)/);
  return match?.[1] || undefined;
}
