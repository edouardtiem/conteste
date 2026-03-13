"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import type { AmendeExtracted } from "@/lib/types";
import { CameraCapture } from "./CameraCapture";
import { FileImport } from "./FileImport";
import { ImagePreview } from "./ImagePreview";
import { compressImage } from "./ImageCompressor";

export type UploadState =
  | "idle"
  | "uploading"
  | "preview"
  | "confirmed"
  | "analyzing"
  | "error";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "application/pdf",
];

function isAcceptedType(type: string): boolean {
  // Permissif sur les images generiques (mobile retourne parfois image/*)
  if (type.startsWith("image/")) return true;
  return ACCEPTED_TYPES.includes(type);
}

const MOCK_AMENDE: AmendeExtracted = {
  numero: "2026-069-4482891",
  type: "vitesse",
  montant: 135,
  dateInfraction: "2026-02-15",
  lieuInfraction: "A6, km 234 — Rhone (69)",
  organismeEmetteur:
    "Centre Automatise de Constatation des Infractions Routieres",
  dateLimiteContestation: "2026-04-01",
  nom: "Dupont",
  prenom: "Jean",
  adresse: "12 rue de la Paix",
  codePostal: "75002",
  ville: "Paris",
};

export function UploadZone() {
  const router = useRouter();
  const [state, setState] = useState<UploadState>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleDemoClick = useCallback(() => {
    localStorage.setItem("conteste_dossier", JSON.stringify(MOCK_AMENDE));
    localStorage.setItem("conteste_amende", JSON.stringify(MOCK_AMENDE));
    localStorage.setItem("conteste_dossier_id", "demo_" + Date.now());
    router.push("/contest/confirm");
  }, [router]);

  const resetState = useCallback(() => {
    setState("idle");
    setFile(null);
    setCompressedBlob(null);
    setErrorMessage("");
    setProgress(0);
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  }, []);

  const handleFile = useCallback(
    async (selectedFile: File) => {
      // Validation taille
      if (selectedFile.size > MAX_FILE_SIZE) {
        setState("error");
        setErrorMessage(
          "Le fichier est trop volumineux. La taille maximum est de 10 Mo."
        );
        return;
      }

      // Validation format
      if (!isAcceptedType(selectedFile.type)) {
        setState("error");
        setErrorMessage(
          "Format non supporte. Veuillez utiliser un fichier JPG, PNG ou PDF."
        );
        return;
      }

      setState("uploading");
      setFile(selectedFile);

      try {
        const compressed = await compressImage(selectedFile);
        setCompressedBlob(compressed);
        setState("preview");
      } catch {
        setState("error");
        setErrorMessage(
          "Impossible de traiter ce fichier. Veuillez reessayer avec un autre fichier."
        );
      }
    },
    []
  );

  const startProgressSimulation = useCallback(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        // Progression rapide au debut, plus lente vers la fin
        const increment = prev < 50 ? 8 : prev < 75 ? 4 : 2;
        return Math.min(prev + increment, 90);
      });
    }, 300);
    progressInterval.current = interval;
    return interval;
  }, []);

  const handleConfirm = useCallback(async () => {
    if (!compressedBlob || !file) return;

    setState("analyzing");
    const interval = startProgressSimulation();

    try {
      const formData = new FormData();
      // Utiliser le nom original du fichier
      formData.append("file", compressedBlob, file.name);

      const response = await fetch("/api/extract", {
        method: "POST",
        body: formData,
      });

      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.error || `Erreur serveur (${response.status})`
        );
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Extraction echouee");
      }

      // Progression a 100% avant la redirection
      setProgress(100);

      // Stocker les donnees extraites en localStorage pour la page confirm
      localStorage.setItem(
        "conteste_dossier",
        JSON.stringify(result.data)
      );

      // Stocker le dossierId retourné par l'API
      if (result.dossierId) {
        localStorage.setItem("conteste_dossier_id", result.dossierId);
      }

      // Petite pause pour montrer la barre a 100%
      setTimeout(() => {
        router.push("/contest/confirm");
      }, 400);
    } catch (error) {
      clearInterval(interval);
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
        progressInterval.current = null;
      }

      const message =
        error instanceof Error ? error.message : "Une erreur est survenue";

      // Message adapte si la photo est difficile a lire
      if (
        message.includes("confidence") ||
        message.includes("lisible") ||
        message.includes("extraction")
      ) {
        setErrorMessage(
          "La photo est difficile a lire. Veuillez prendre une nouvelle photo bien eclairee et nette."
        );
      } else {
        setErrorMessage(message);
      }
      setState("error");
    }
  }, [compressedBlob, file, router, startProgressSimulation]);

  const handleRetry = useCallback(() => {
    resetState();
  }, [resetState]);

  return (
    <div>
      {/* IDLE : CameraCapture + FileImport cote a cote */}
      {state === "idle" && (
        <div className="flex gap-4">
          <CameraCapture onCapture={handleFile} />
          <FileImport onImport={handleFile} />
        </div>
      )}

      {/* UPLOADING : compression en cours */}
      {state === "uploading" && (
        <div className="border border-gris-bordure rounded-card p-8 text-center">
          <div className="w-8 h-8 border-[3px] border-gris-bordure border-t-bleu-france rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[16px] font-medium text-gris-texte">
            Preparation du fichier...
          </p>
        </div>
      )}

      {/* PREVIEW : apercu du fichier */}
      {state === "preview" && file && (
        <ImagePreview
          file={file}
          onRetry={handleRetry}
          onConfirm={handleConfirm}
        />
      )}

      {/* CONFIRMED + ANALYZING : loader avec barre de progression */}
      {(state === "confirmed" || state === "analyzing") && (
        <div className="border border-gris-bordure rounded-card p-8 text-center">
          <div className="w-8 h-8 border-[3px] border-gris-bordure border-t-bleu-france rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[16px] font-medium text-gris-texte mb-4">
            Nous analysons votre amende...
          </p>
          {/* Barre de progression simulee */}
          <div className="w-full bg-gris-fond rounded-pill h-2 overflow-hidden">
            <div
              className="h-full bg-bleu-france rounded-pill transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[13px] text-gris-mention mt-3">
            Cela prend generalement 5 a 10 secondes
          </p>
        </div>
      )}

      {/* Lien demo — visible en idle et error */}
      {(state === "idle" || state === "error") && (
        <button
          type="button"
          onClick={handleDemoClick}
          className="block w-full text-center mt-6"
          style={{ color: "#666", fontSize: 14 }}
        >
          Pas d&apos;amende sous la main ? Essayer avec un exemple &rarr;
        </button>
      )}

      {/* ERROR */}
      {state === "error" && (
        <div className="border border-rouge-erreur bg-orange-fond rounded-card p-6">
          <div className="flex items-start gap-3 mb-4">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-rouge-erreur flex-shrink-0 mt-0.5"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="text-[15px] text-gris-titre">{errorMessage}</p>
          </div>
          <button
            type="button"
            onClick={handleRetry}
            className="w-full bg-bleu-france text-white font-bold text-[16px] py-[14px] rounded-button hover:bg-bleu-france-hover transition-colors min-h-[48px]"
          >
            Reessayer
          </button>
        </div>
      )}
    </div>
  );
}
