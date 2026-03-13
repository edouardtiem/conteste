/**
 * Utilitaires generaux pour Conteste.app
 */

/**
 * Formatte un montant en euros.
 */
export function formatEuros(cents: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}

/**
 * Formatte une date en format francais.
 */
export function formatDateFR(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
}

/**
 * Calcule la date limite de contestation (date + 45 jours).
 */
export function calculerDateLimite(dateInfraction: Date | string): Date {
  const d = typeof dateInfraction === "string" ? new Date(dateInfraction) : dateInfraction;
  const limite = new Date(d);
  limite.setDate(limite.getDate() + 45);
  return limite;
}

/**
 * Verifie si le delai de contestation est depasse.
 */
export function estDelaiDepasse(dateLimite: Date | string): boolean {
  const d = typeof dateLimite === "string" ? new Date(dateLimite) : dateLimite;
  return new Date() > d;
}

/**
 * Nombre de jours restants avant la date limite.
 */
export function joursRestants(dateLimite: Date | string): number {
  const d = typeof dateLimite === "string" ? new Date(dateLimite) : dateLimite;
  const diff = d.getTime() - new Date().getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

/**
 * Genere un identifiant unique simple.
 */
export function generateId(): string {
  return crypto.randomUUID();
}

/**
 * Concatene des classes CSS conditionnellement.
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
