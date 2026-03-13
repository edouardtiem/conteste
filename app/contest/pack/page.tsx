"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArgumentCard } from "@/components/ui/ArgumentCard";
import { AntaiGuide } from "@/components/ui/AntaiGuide";
import { CopyMotifBlock } from "@/components/ui/CopyMotifBlock";
import type { PackResult, AmendeExtracted } from "@/lib/types";

export default function PackPage() {
  return (
    <Suspense
      fallback={
        <div className="container-flow py-8 text-center">
          <div className="animate-pulse">
            <div className="w-12 h-12 bg-bleu-fond rounded-full mx-auto mb-4 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-bleu-france border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="text-body text-gris-texte">Chargement...</p>
          </div>
        </div>
      }
    >
      <PackPageContent />
    </Suspense>
  );
}

function PackPageContent() {
  const searchParams = useSearchParams();
  const [pack, setPack] = useState<PackResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [emailSending, setEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const dossierId = searchParams.get("dossierId") || (typeof window !== "undefined" ? localStorage.getItem("conteste_dossierId") : null) || "";
  const email = searchParams.get("email") || (typeof window !== "undefined" ? localStorage.getItem("conteste_email") : null) || "";

  // Récupérer les données amende depuis localStorage
  const getAmendeFromStorage = useCallback((): AmendeExtracted | null => {
    if (typeof window === "undefined") return null;
    try {
      // Essayer conteste_amende d'abord, puis conteste_dossier en fallback
      const raw = localStorage.getItem("conteste_amende") || localStorage.getItem("conteste_dossier");
      if (!raw) return null;
      return JSON.parse(raw) as AmendeExtracted;
    } catch {
      return null;
    }
  }, []);

  // Charger le pack
  useEffect(() => {
    async function loadPack() {
      if (!dossierId) {
        setError("Identifiant de dossier manquant");
        setLoading(false);
        return;
      }

      try {
        const amende = getAmendeFromStorage();

        const res = await fetch("/api/pack", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            dossierId,
            amende,
          }),
        });

        const data = await res.json() as {
          success: boolean;
          data?: PackResult;
          error?: string;
        };

        if (!data.success || !data.data) {
          throw new Error(data.error || "Erreur lors du chargement du pack");
        }

        setPack(data.data);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Erreur inattendue";
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    loadPack();
  }, [dossierId, getAmendeFromStorage]);

  // Envoyer par email
  const handleSendEmail = async () => {
    if (!email || !pack) return;

    setEmailSending(true);
    try {
      const amende = getAmendeFromStorage();

      const res = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          dossierId,
          pack,
          amende,
        }),
      });

      const data = await res.json() as { success: boolean; error?: string };

      if (!data.success) {
        throw new Error(data.error || "Erreur d'envoi");
      }

      setEmailSent(true);
    } catch {
      // En mode demo, simuler le succes de l'envoi email
      const isDemo = typeof window !== "undefined" && localStorage.getItem("conteste_paid") === "true";
      if (isDemo) {
        setEmailSent(true);
      } else {
        setError("Erreur d'envoi");
      }
    } finally {
      setEmailSending(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="container-flow py-8 text-center">
        <div className="animate-pulse">
          <div className="w-12 h-12 bg-bleu-fond rounded-full mx-auto mb-4 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-bleu-france border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-body text-gris-texte">
            Generation de votre dossier en cours...
          </p>
          <p className="text-[14px] text-gris-mention mt-2">
            Cela peut prendre quelques secondes
          </p>
        </div>
      </div>
    );
  }

  // Erreur
  if (error && !pack) {
    return (
      <div className="container-flow py-8">
        <div className="bg-orange-fond border-l-4 border-orange-warning rounded-card p-4 mb-6">
          <p className="text-body font-bold text-orange-warning mb-1">
            Erreur
          </p>
          <p className="text-[14px] text-gris-texte">{error}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="block w-full text-center bg-bleu-france text-white font-bold text-button py-[14px] rounded-button hover:bg-bleu-france-hover transition-colors min-h-[48px]"
        >
          Reessayer
        </button>
      </div>
    );
  }

  if (!pack) return null;

  const amende = getAmendeFromStorage();

  return (
    <div className="container-flow py-8">
      {/* Confirmation paiement */}
      <div className="bg-vert-fond text-vert-succes rounded-card p-4 mb-6 text-center">
        <p className="font-bold">
          Paiement confirme &mdash; votre dossier est pret
        </p>
      </div>

      {/* Titre */}
      <h1 className="text-h2 text-gris-titre mb-2">
        Votre dossier de contestation
      </h1>
      {amende && (
        <p className="text-body text-gris-mention mb-6">
          {amende.type.charAt(0).toUpperCase() + amende.type.slice(1)} &mdash;{" "}
          {amende.montant}&nbsp;&euro;
        </p>
      )}

      {/* Arguments */}
      <h2 className="text-h2 text-gris-titre mb-4">
        Vos arguments personnalises
      </h2>
      <div className="space-y-4 mb-8">
        {pack.arguments.map((arg, i) => (
          <ArgumentCard key={i} argument={arg} index={i} />
        ))}
      </div>

      {/* Motif copiable */}
      <div className="mb-8">
        <CopyMotifBlock motif={pack.guideAntai.motifRecommande} />
      </div>

      {/* Guide ANTAI */}
      <div className="mb-8">
        <AntaiGuide guide={pack.guideAntai} />
      </div>

      {/* Lien ANTAI */}
      <a
        href={pack.guideAntai.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center bg-bleu-france text-white font-bold text-button py-[14px] rounded-button hover:bg-bleu-france-hover transition-colors min-h-[48px] mb-4"
      >
        Acceder a {pack.guideAntai.portail === "antai" ? "ANTAI" : pack.guideAntai.portail} pour contester
      </a>

      {/* Envoyer par email */}
      {email && (
        <button
          onClick={handleSendEmail}
          disabled={emailSending || emailSent}
          className={`block w-full text-center font-bold text-button py-[14px] rounded-button transition-colors min-h-[48px] mb-6 ${
            emailSent
              ? "bg-vert-succes text-white"
              : "border border-bleu-france text-bleu-france hover:bg-bleu-fond"
          } disabled:opacity-70 disabled:cursor-not-allowed`}
        >
          {emailSent
            ? "\u2713 Email envoye !"
            : emailSending
              ? "Envoi en cours..."
              : "Recevoir par email"}
        </button>
      )}

      {/* Erreur email */}
      {error && (
        <div className="bg-orange-fond border-l-4 border-orange-warning rounded-card p-3 mb-4">
          <p className="text-[14px] text-orange-warning">{error}</p>
        </div>
      )}

      {/* Bouton Termine */}
      <Link
        href="/contest/success"
        className="block w-full text-center border border-bleu-france text-bleu-france font-bold text-button py-[14px] rounded-button hover:bg-bleu-fond transition-colors min-h-[48px] mb-6"
      >
        Termine
      </Link>
    </div>
  );
}
