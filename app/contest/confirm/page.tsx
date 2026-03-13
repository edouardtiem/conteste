"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { AmendeExtracted, AmendeType } from "@/lib/types";
import { formatDateFR, joursRestants } from "@/lib/utils";
import { AmendeCard } from "@/components/ui/AmendeCard";

const TYPE_LABELS: Record<string, string> = {
  stationnement: "Stationnement",
  vitesse: "Exces de vitesse",
  feux: "Feux rouges",
  ceinture: "Ceinture de securite",
  telephone: "Telephone au volant",
  autre: "Autre infraction",
};

const AMENDE_TYPES: AmendeType[] = [
  "stationnement",
  "vitesse",
  "feux",
  "ceinture",
  "telephone",
  "autre",
];

export default function ConfirmPage() {
  const router = useRouter();
  const [amende, setAmende] = useState<AmendeExtracted | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<AmendeExtracted | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Charger depuis localStorage
    const stored = localStorage.getItem("conteste_dossier");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AmendeExtracted;
        setAmende(parsed);
        setEditData(parsed);
      } catch {
        router.push("/contest/upload");
      }
    } else {
      router.push("/contest/upload");
    }
  }, [router]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
    setError(null);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
    setEditData(amende);
    setError(null);
  }, [amende]);

  const handleSaveEdit = useCallback(() => {
    if (editData) {
      setAmende(editData);
      localStorage.setItem("conteste_dossier", JSON.stringify(editData));
      setIsEditing(false);
    }
  }, [editData]);

  const updateField = useCallback(
    (field: keyof AmendeExtracted, value: string | number) => {
      if (editData) {
        setEditData({ ...editData, [field]: value });
      }
    },
    [editData]
  );

  const handleAnalyze = useCallback(async () => {
    if (!amende) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(amende),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "Erreur lors de l'analyse"
        );
      }

      // Stocker le resultat du scoring
      localStorage.setItem(
        "conteste_scoring",
        JSON.stringify(result.data)
      );

      // Stocker aussi l'amende pour les pages suivantes (pack, success)
      localStorage.setItem(
        "conteste_amende",
        JSON.stringify(amende)
      );

      router.push("/contest/scoring");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Une erreur est survenue";
      setError(message);
      setIsLoading(false);
    }
  }, [amende, router]);

  if (!amende) {
    return (
      <div className="container-flow py-8">
        <div className="border border-gris-bordure rounded-card p-8 text-center">
          <div className="w-8 h-8 border-[3px] border-gris-bordure border-t-bleu-france rounded-full animate-spin mx-auto mb-4" />
          <p className="text-body text-gris-mention">
            Chargement des donnees...
          </p>
        </div>
      </div>
    );
  }

  const jours = joursRestants(amende.dateLimiteContestation);

  return (
    <div className="container-flow py-8">
      <h1 className="text-h2 text-gris-titre mb-2">
        Verification des informations
      </h1>
      <p className="text-body text-gris-mention mb-6">
        Verifiez que les informations extraites sont correctes.
      </p>

      {error && (
        <div className="bg-orange-fond border-l-4 border-orange-warning rounded-card p-4 mb-6">
          <p className="text-[15px] text-orange-warning font-bold">Erreur</p>
          <p className="text-[14px] text-gris-texte">{error}</p>
        </div>
      )}

      {/* Mode lecture */}
      {!isEditing && (
        <>
          {/* Card Infraction */}
          <AmendeCard amende={amende} />

          {/* Montant */}
          <div className="text-center my-6">
            <p className="text-[14px] text-gris-mention mb-1">Montant</p>
            <p className="text-[36px] font-extrabold text-gris-titre">
              {amende.montant}&nbsp;&euro;
            </p>
          </div>

          {/* Card Contrevenant */}
          <div className="bg-white border border-gris-bordure rounded-card p-6 mb-6">
            <h2 className="text-h3 text-gris-titre mb-4">Contrevenant</h2>
            <div className="space-y-2">
              <p className="text-body text-gris-titre font-bold">
                {amende.prenom} {amende.nom}
              </p>
              <p className="text-body text-gris-texte">{amende.adresse}</p>
              <p className="text-body text-gris-texte">
                {amende.codePostal} {amende.ville}
              </p>
            </div>
          </div>

          {/* Card Date limite */}
          <div className="bg-bleu-fond border border-bleu-clair rounded-card p-6 mb-6">
            <p className="text-[14px] text-bleu-france font-bold mb-1">
              Date limite de contestation
            </p>
            <p className="text-body text-gris-titre font-bold">
              {formatDateFR(amende.dateLimiteContestation)}
            </p>
            <p className="text-[14px] text-gris-mention mt-1">
              {jours > 0
                ? `${jours} jour${jours > 1 ? "s" : ""} restant${jours > 1 ? "s" : ""}`
                : "Delai depasse"}
            </p>
          </div>

          {/* Boutons */}
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={isLoading}
            className="w-full bg-bleu-france text-white font-bold text-button py-[14px] rounded-button hover:bg-bleu-france-hover transition-colors min-h-[48px] mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyse en cours...
              </span>
            ) : (
              "C'est correct, analyser mes chances"
            )}
          </button>

          <button
            type="button"
            onClick={handleEdit}
            className="w-full text-center text-bleu-france font-bold text-[15px] py-3 hover:underline min-h-[48px]"
          >
            Corriger une information
          </button>
        </>
      )}

      {/* Mode edition */}
      {isEditing && editData && (
        <>
          <div className="space-y-4 mb-6">
            <EditField
              label="Numero d'avis"
              value={editData.numero}
              onChange={(v) => updateField("numero", v)}
            />
            <div>
              <label className="block text-[14px] text-gris-mention mb-1">
                Type d&apos;infraction
              </label>
              <select
                value={editData.type}
                onChange={(e) =>
                  updateField("type", e.target.value)
                }
                className="w-full border border-gris-bordure rounded-button px-4 py-3 text-body text-gris-titre bg-white min-h-[48px]"
              >
                {AMENDE_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {TYPE_LABELS[t]}
                  </option>
                ))}
              </select>
            </div>
            <EditField
              label="Montant (euros)"
              value={String(editData.montant)}
              onChange={(v) => updateField("montant", Number(v) || 0)}
              type="number"
            />
            <EditField
              label="Date de l'infraction (AAAA-MM-JJ)"
              value={editData.dateInfraction}
              onChange={(v) => updateField("dateInfraction", v)}
              type="date"
            />
            <EditField
              label="Lieu de l'infraction"
              value={editData.lieuInfraction}
              onChange={(v) => updateField("lieuInfraction", v)}
            />
            <EditField
              label="Organisme emetteur"
              value={editData.organismeEmetteur}
              onChange={(v) => updateField("organismeEmetteur", v)}
            />
            <EditField
              label="Nom"
              value={editData.nom}
              onChange={(v) => updateField("nom", v)}
            />
            <EditField
              label="Prenom"
              value={editData.prenom}
              onChange={(v) => updateField("prenom", v)}
            />
            <EditField
              label="Adresse"
              value={editData.adresse}
              onChange={(v) => updateField("adresse", v)}
            />
            <EditField
              label="Code postal"
              value={editData.codePostal}
              onChange={(v) => updateField("codePostal", v)}
            />
            <EditField
              label="Ville"
              value={editData.ville}
              onChange={(v) => updateField("ville", v)}
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleCancelEdit}
              className="flex-1 text-center border border-bleu-france text-bleu-france font-bold text-button py-[14px] rounded-button hover:bg-bleu-fond transition-colors min-h-[48px]"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={handleSaveEdit}
              className="flex-1 text-center bg-bleu-france text-white font-bold text-button py-[14px] rounded-button hover:bg-bleu-france-hover transition-colors min-h-[48px]"
            >
              Enregistrer
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function EditField({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-[14px] text-gris-mention mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gris-bordure rounded-button px-4 py-3 text-body text-gris-titre min-h-[48px]"
      />
    </div>
  );
}
