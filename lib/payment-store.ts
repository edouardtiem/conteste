/**
 * Store en mémoire pour le MVP (remplacé par une DB plus tard).
 * Stocke les paiements confirmés et les packs générés.
 */

import type { PackResult } from "@/lib/types";

interface PaymentRecord {
  dossierId: string;
  email: string;
  paymentIntentId: string;
  paidAt: Date;
  packGenerated: boolean;
}

// Map dossierId -> PaymentRecord
const payments = new Map<string, PaymentRecord>();

// Map dossierId -> PackResult
const packs = new Map<string, PackResult>();

export function markAsPaid(
  dossierId: string,
  email: string,
  paymentIntentId: string
): void {
  payments.set(dossierId, {
    dossierId,
    email,
    paymentIntentId,
    paidAt: new Date(),
    packGenerated: false,
  });
}

export function isPaid(dossierId: string): boolean {
  return payments.has(dossierId);
}

export function getPayment(dossierId: string): PaymentRecord | undefined {
  return payments.get(dossierId);
}

export function markPackGenerated(dossierId: string): void {
  const record = payments.get(dossierId);
  if (record) {
    record.packGenerated = true;
  }
}

export function isPackGenerated(dossierId: string): boolean {
  const record = payments.get(dossierId);
  return record?.packGenerated ?? false;
}

export function storePack(dossierId: string, pack: PackResult): void {
  packs.set(dossierId, pack);
}

export function getStoredPack(dossierId: string): PackResult | undefined {
  return packs.get(dossierId);
}

/**
 * En mode dev, marquer un dossier comme payé sans Stripe.
 */
export function devMarkAsPaid(dossierId: string, email: string): void {
  markAsPaid(dossierId, email, `dev_${Date.now()}`);
}
