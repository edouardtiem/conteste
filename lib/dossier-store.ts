import pool from "@/lib/db";
import type {
  AmendeExtracted,
  ScoringResult,
  PackResult,
  PaiementStatut,
  AmendeType,
} from "@/lib/types";

// ---------- Types ----------

export interface DossierRow {
  id: string;
  created_at: Date;
  numero: string | null;
  type: string | null;
  montant: number | null;
  date_infraction: Date | null;
  lieu_infraction: string | null;
  organisme_emetteur: string | null;
  date_limite_contestation: Date | null;
  nom: string | null;
  prenom: string | null;
  adresse: string | null;
  code_postal: string | null;
  ville: string | null;
  score: number | null;
  niveau: string | null;
  motif_principal: string | null;
  alerte: string | null;
  teaser: string | null;
  pack_json: PackResult | null;
  email: string | null;
  stripe_payment_intent_id: string | null;
  montant_facture: number | null;
  paiement_statut: PaiementStatut;
  paid_at: Date | null;
}

// ---------- Helpers ----------

/** Check if DATABASE_URL is configured */
function hasDb(): boolean {
  return !!process.env.DATABASE_URL;
}

// ---------- Public API ----------

/**
 * Create a dossier from extracted amende data.
 * Returns the UUID of the new dossier.
 */
export async function createDossier(
  amende: AmendeExtracted
): Promise<string> {
  if (!hasDb()) {
    // Fallback: return a random id
    return `local_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  }

  try {
    const result = await pool.query<{ id: string }>(
      `INSERT INTO dossiers (
        numero, type, montant, date_infraction, lieu_infraction,
        organisme_emetteur, date_limite_contestation,
        nom, prenom, adresse, code_postal, ville
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
      RETURNING id`,
      [
        amende.numero,
        amende.type,
        amende.montant,
        amende.dateInfraction || null,
        amende.lieuInfraction,
        amende.organismeEmetteur,
        amende.dateLimiteContestation || null,
        amende.nom,
        amende.prenom,
        amende.adresse,
        amende.codePostal,
        amende.ville,
      ]
    );
    return result.rows[0]!.id;
  } catch (error) {
    console.error("[dossier-store] createDossier error:", error);
    throw error;
  }
}

/**
 * Update scoring fields for a dossier.
 */
export async function updateScoring(
  dossierId: string,
  scoring: ScoringResult
): Promise<void> {
  if (!hasDb()) return;

  try {
    await pool.query(
      `UPDATE dossiers
       SET score = $1, niveau = $2, motif_principal = $3, alerte = $4, teaser = $5
       WHERE id = $6`,
      [
        scoring.score,
        scoring.niveau,
        scoring.motifPrincipal,
        scoring.alerte,
        scoring.teaser,
        dossierId,
      ]
    );
  } catch (error) {
    console.error("[dossier-store] updateScoring error:", error);
    throw error;
  }
}

/**
 * Mark a dossier as paid.
 */
export async function markAsPaid(
  dossierId: string,
  paymentIntentId: string,
  email: string
): Promise<void> {
  if (!hasDb()) return;

  try {
    await pool.query(
      `UPDATE dossiers
       SET paiement_statut = 'paid',
           stripe_payment_intent_id = $1,
           email = $2,
           paid_at = NOW()
       WHERE id = $3`,
      [paymentIntentId, email, dossierId]
    );
  } catch (error) {
    console.error("[dossier-store] markAsPaid error:", error);
    throw error;
  }
}

/**
 * Check if a dossier is paid.
 */
export async function isPaid(dossierId: string): Promise<boolean> {
  if (!hasDb()) return false;

  try {
    const result = await pool.query<{ paiement_statut: string }>(
      `SELECT paiement_statut FROM dossiers WHERE id = $1`,
      [dossierId]
    );
    if (result.rows.length === 0) return false;
    return result.rows[0]!.paiement_statut === "paid";
  } catch (error) {
    console.error("[dossier-store] isPaid error:", error);
    return false;
  }
}

/**
 * Store the generated pack as JSONB.
 */
export async function storePack(
  dossierId: string,
  pack: PackResult
): Promise<void> {
  if (!hasDb()) return;

  try {
    await pool.query(
      `UPDATE dossiers SET pack_json = $1 WHERE id = $2`,
      [JSON.stringify(pack), dossierId]
    );
  } catch (error) {
    console.error("[dossier-store] storePack error:", error);
    throw error;
  }
}

/**
 * Retrieve the pack for a dossier.
 */
export async function getPack(
  dossierId: string
): Promise<PackResult | null> {
  if (!hasDb()) return null;

  try {
    const result = await pool.query<{ pack_json: PackResult | null }>(
      `SELECT pack_json FROM dossiers WHERE id = $1`,
      [dossierId]
    );
    if (result.rows.length === 0) return null;
    return result.rows[0]!.pack_json;
  } catch (error) {
    console.error("[dossier-store] getPack error:", error);
    return null;
  }
}

/**
 * Retrieve the full dossier row.
 */
export async function getDossier(
  dossierId: string
): Promise<DossierRow | null> {
  if (!hasDb()) return null;

  try {
    const result = await pool.query<DossierRow>(
      `SELECT * FROM dossiers WHERE id = $1`,
      [dossierId]
    );
    if (result.rows.length === 0) return null;
    return result.rows[0]!;
  } catch (error) {
    console.error("[dossier-store] getDossier error:", error);
    return null;
  }
}

/**
 * Log an email send in the email_logs table.
 */
export async function logEmail(
  email: string,
  dossierId: string,
  emailType: string
): Promise<void> {
  if (!hasDb()) return;

  try {
    await pool.query(
      `INSERT INTO email_logs (email, dossier_id, type)
       VALUES ($1, $2, $3)
       ON CONFLICT (dossier_id, type) DO NOTHING`,
      [email, dossierId, emailType]
    );
  } catch (error) {
    console.error("[dossier-store] logEmail error:", error);
    // Non-critical, don't throw
  }
}

// ---------- Amende helper ----------

/**
 * Reconstruct AmendeExtracted from a DossierRow.
 */
export function rowToAmende(row: DossierRow): AmendeExtracted {
  return {
    numero: row.numero ?? "",
    type: (row.type as AmendeType) ?? "autre",
    montant: Number(row.montant) || 0,
    dateInfraction: row.date_infraction
      ? row.date_infraction.toISOString().slice(0, 10)
      : "",
    lieuInfraction: row.lieu_infraction ?? "",
    organismeEmetteur: row.organisme_emetteur ?? "",
    dateLimiteContestation: row.date_limite_contestation
      ? row.date_limite_contestation.toISOString().slice(0, 10)
      : "",
    nom: row.nom ?? "",
    prenom: row.prenom ?? "",
    adresse: row.adresse ?? "",
    codePostal: row.code_postal ?? "",
    ville: row.ville ?? "",
  };
}
