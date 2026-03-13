import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  formatEuros,
  formatDateFR,
  calculerDateLimite,
  estDelaiDepasse,
  joursRestants,
  generateId,
  cn,
} from "@/lib/utils";

describe("formatEuros", () => {
  it("formate 13500 centimes en 135,00 EUR", () => {
    const result = formatEuros(13500);
    // Intl peut utiliser un espace insecable
    expect(result.replace(/\s/g, " ")).toBe("135,00 €");
  });

  it("formate 1490 centimes en 14,90 EUR", () => {
    const result = formatEuros(1490);
    expect(result.replace(/\s/g, " ")).toBe("14,90 €");
  });

  it("formate 0 centime en 0,00 EUR", () => {
    const result = formatEuros(0);
    expect(result.replace(/\s/g, " ")).toBe("0,00 €");
  });

  it("formate 99 centimes en 0,99 EUR", () => {
    const result = formatEuros(99);
    expect(result.replace(/\s/g, " ")).toBe("0,99 €");
  });
});

describe("formatDateFR", () => {
  it("formate une date ISO en format francais", () => {
    const result = formatDateFR("2026-02-15");
    expect(result).toBe("15/02/2026");
  });

  it("formate un objet Date en format francais", () => {
    const result = formatDateFR(new Date(2026, 0, 1)); // 1er janvier 2026
    expect(result).toBe("01/01/2026");
  });

  it("formate le 31 decembre correctement", () => {
    const result = formatDateFR("2025-12-31");
    expect(result).toBe("31/12/2025");
  });
});

describe("calculerDateLimite", () => {
  it("ajoute 45 jours a une date", () => {
    const result = calculerDateLimite("2026-01-01");
    // 1er janvier + 45 jours = 15 fevrier
    expect(result.getFullYear()).toBe(2026);
    expect(result.getMonth()).toBe(1); // fevrier (0-indexed)
    expect(result.getDate()).toBe(15);
  });

  it("gere le passage de mois correctement", () => {
    const result = calculerDateLimite("2026-03-01");
    // 1er mars + 45 jours = 15 avril
    expect(result.getMonth()).toBe(3); // avril
    expect(result.getDate()).toBe(15);
  });

  it("gere les annees bissextiles (2024 est bissextile)", () => {
    // 15 janvier 2024 + 45 jours = 29 fevrier (bissextile) + 1 jour = 1er mars
    // en fait: 15 jan + 45 = 29 fevrier 2024
    const result = calculerDateLimite("2024-01-15");
    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(1); // fevrier
    expect(result.getDate()).toBe(29);
  });

  it("gere les annees non-bissextiles", () => {
    // 15 janvier 2025 + 45 jours = 1er mars 2025
    const result = calculerDateLimite("2025-01-15");
    expect(result.getFullYear()).toBe(2025);
    expect(result.getMonth()).toBe(2); // mars
    expect(result.getDate()).toBe(1);
  });

  it("accepte un objet Date en entree", () => {
    const date = new Date(2026, 0, 1); // 1er janvier 2026
    const result = calculerDateLimite(date);
    expect(result.getMonth()).toBe(1); // fevrier
    expect(result.getDate()).toBe(15);
  });
});

describe("estDelaiDepasse", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-12"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("retourne true si la date limite est dans le passe", () => {
    expect(estDelaiDepasse("2026-03-01")).toBe(true);
  });

  it("retourne false si la date limite est dans le futur", () => {
    expect(estDelaiDepasse("2026-04-01")).toBe(false);
  });

  it("retourne false si la date limite est aujourd'hui (fin de journee)", () => {
    // Date limite = 12 mars 2026 a minuit, now = 12 mars 2026 a minuit
    // new Date() > d => false (egaux)
    expect(estDelaiDepasse("2026-03-12")).toBe(false);
  });
});

describe("joursRestants", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-12"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("retourne le nombre correct de jours restants", () => {
    // Du 12 mars au 1er avril = 20 jours
    expect(joursRestants("2026-04-01")).toBe(20);
  });

  it("retourne 0 si la date limite est passee", () => {
    expect(joursRestants("2026-03-01")).toBe(0);
  });

  it("retourne 0 si la date limite est aujourd'hui", () => {
    expect(joursRestants("2026-03-12")).toBe(0);
  });

  it("retourne 1 pour demain", () => {
    expect(joursRestants("2026-03-13")).toBe(1);
  });
});

describe("generateId", () => {
  it("retourne une chaine non vide", () => {
    const id = generateId();
    expect(id).toBeTruthy();
    expect(typeof id).toBe("string");
  });

  it("retourne des identifiants uniques", () => {
    const id1 = generateId();
    const id2 = generateId();
    expect(id1).not.toBe(id2);
  });
});

describe("cn", () => {
  it("concatene des classes CSS", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("filtre les valeurs falsy", () => {
    expect(cn("foo", false, undefined, null, "bar")).toBe("foo bar");
  });

  it("retourne une chaine vide si aucune classe", () => {
    expect(cn(false, undefined, null)).toBe("");
  });
});
