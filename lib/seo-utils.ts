// SEO utility functions for deterministic date generation
// Avoids all 500+ pages having the same datePublished/dateModified

/**
 * Simple deterministic hash function.
 * Returns a number between 0 and 1 based on the input string.
 */
function hashToFloat(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0; // Force 32-bit integer
  }
  // Normalize to 0-1 range
  return Math.abs(hash % 10000) / 10000;
}

/**
 * Generate a deterministic but varied dateModified based on type slug and dept code.
 * Returns dates spread between 2026-02-15 and 2026-03-12 (25-day window).
 * Uses a simple hash of typeSlug+deptCode so each page gets a unique but stable date.
 */
export function generateDateModified(typeSlug: string, deptCode: string): string {
  const startDate = new Date("2026-02-15");
  const endDate = new Date("2026-03-12");
  const rangeDays = Math.floor(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const ratio = hashToFloat(`${typeSlug}-${deptCode}`);
  const offsetDays = Math.floor(ratio * rangeDays);

  const result = new Date(startDate);
  result.setDate(result.getDate() + offsetDays);

  const iso = result.toISOString().split("T")[0];
  return iso ?? "2026-03-01";
}

/**
 * Get the datePublished for a given type.
 * Returns the base date string directly (already set per type in types.json).
 */
export function getDatePublished(typeSlug: string, baseDateStr: string): string {
  // Validate the date format, fallback to a safe default
  const parsed = Date.parse(baseDateStr);
  if (isNaN(parsed)) {
    // Fallback dates per type slug
    const fallbacks: Record<string, string> = {
      radar: "2026-01-15",
      "stationnement-fps": "2026-01-22",
      "feux-rouges": "2026-02-03",
      ceinture: "2026-02-10",
      telephone: "2026-02-18",
    };
    return fallbacks[typeSlug] ?? "2026-01-15";
  }
  return baseDateStr;
}
