import { z } from "zod/v4";

/**
 * Schema de validation des variables d'environnement.
 * Ne crash PAS au demarrage — log un warning pour chaque variable manquante.
 */
const envSchema = z.object({
  // Anthropic (Claude Vision)
  ANTHROPIC_API_KEY: z.string().min(1),

  // Stripe
  STRIPE_SECRET_KEY: z.string().min(1),
  STRIPE_PUBLISHABLE_KEY: z.string().min(1),
  STRIPE_WEBHOOK_SECRET: z.string().min(1),

  // Resend
  RESEND_API_KEY: z.string().min(1),

  // App
  NEXT_PUBLIC_BASE_URL: z.string().url().default("http://localhost:3000"),

  // Optional
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

type Env = z.infer<typeof envSchema>;

function validateEnv(): Partial<Env> {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    const issues = result.error.issues;
    for (const issue of issues) {
      const path = issue.path.join(".");
      console.warn(
        `[env] Variable manquante ou invalide: ${path} — ${issue.message}`
      );
    }
    // Return what we can parse, with defaults for missing values
    return process.env as unknown as Partial<Env>;
  }

  return result.data;
}

export const env = validateEnv();

/**
 * Helper to get an env var with a fallback.
 * Use this when you need a specific env var and want a default.
 */
export function getEnv(key: keyof Env, fallback?: string): string {
  const value = env[key];
  if (value !== undefined && value !== null) return String(value);
  if (fallback !== undefined) return fallback;
  console.warn(`[env] Acces a la variable ${key} non definie`);
  return "";
}
