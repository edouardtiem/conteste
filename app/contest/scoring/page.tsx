"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { ScoreNiveau } from "@/lib/types";
import { ScoreBadge } from "@/components/ui/ScoreBadge";
import { WarningBanner } from "@/components/ui/WarningBanner";
import { BlurredTeaser } from "@/components/ui/BlurredTeaser";

interface ArgumentPreview {
  titre: string;
  resume: string;
}

interface ScoringData {
  score: number;
  niveau: ScoreNiveau;
  motifPrincipal: string;
  alerte: string | null;
  teaser: string;
  recommandation: string;
  argumentsPreview: ArgumentPreview[];
}

export default function ScoringPage() {
  const router = useRouter();
  const [scoring, setScoring] = useState<ScoringData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("conteste_scoring");
    if (stored) {
      try {
        setScoring(JSON.parse(stored) as ScoringData);
      } catch {
        router.push("/contest/upload");
      }
    } else {
      router.push("/contest/upload");
    }
  }, [router]);

  if (!scoring) {
    return (
      <div className="container-flow py-8">
        <div className="border border-gris-bordure rounded-card p-8 text-center">
          <div className="w-8 h-8 border-[3px] border-gris-bordure border-t-bleu-france rounded-full animate-spin mx-auto mb-4" />
          <p className="text-body text-gris-mention">
            Chargement des resultats...
          </p>
        </div>
      </div>
    );
  }

  const hasAlerte = scoring.alerte !== null && scoring.alerte !== "";
  const hasArguments =
    scoring.argumentsPreview && scoring.argumentsPreview.length > 0;

  return (
    <div className="container-flow py-8">
      <h1 className="text-h2 text-gris-titre mb-6">
        Resultat de l&apos;analyse
      </h1>

      {/* Warning banner si alerte */}
      {hasAlerte && (
        <div className="mb-6">
          <WarningBanner title="Attention">
            <p>{scoring.alerte}</p>
          </WarningBanner>
        </div>
      )}

      {/* Score principal */}
      <div className="bg-white border border-gris-bordure rounded-card p-6 mb-6 text-center">
        <p className="text-[56px] font-extrabold text-gris-titre leading-none mb-3">
          {scoring.score}
          <span className="text-[24px] text-gris-mention font-bold">
            /100
          </span>
        </p>

        <div className="mb-4">
          <ScoreBadge score={scoring.score} niveau={scoring.niveau} />
        </div>

        {scoring.teaser && (
          <p className="text-body text-gris-texte">{scoring.teaser}</p>
        )}
      </div>

      {/* Recommandation */}
      <div className="bg-white border border-gris-bordure rounded-card p-6 mb-6">
        <p className="text-[14px] text-gris-mention mb-1">Recommandation</p>
        <p className="text-body text-gris-titre font-bold">
          {scoring.recommandation}
        </p>
        <p className="text-[14px] text-gris-mention mt-2">
          Motif principal : {scoring.motifPrincipal}
        </p>
      </div>

      {/* Bloc réassurance — ce que contient le dossier */}
      <div className="bg-bleu-fond border border-bleu-clair rounded-card p-6 mb-6">
        <h2 className="text-h3 text-gris-titre mb-3">
          Ce que contient votre dossier complet
        </h2>
        <p className="text-body text-gris-texte mb-4">
          Notre analyse a identifie des elements en votre faveur. Pour maximiser vos chances, votre dossier detaillera :
        </p>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-bleu-france text-white rounded-full flex items-center justify-center text-[12px] font-bold mt-0.5">1</span>
            <span className="text-[14px] text-gris-texte"><strong className="text-gris-titre">Les motifs juridiques applicables</strong> — articles du Code de la route et jurisprudences qui s&apos;appliquent a votre situation precise</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-bleu-france text-white rounded-full flex items-center justify-center text-[12px] font-bold mt-0.5">2</span>
            <span className="text-[14px] text-gris-texte"><strong className="text-gris-titre">Les arguments personnalises</strong> — ce qu&apos;il faut mentionner et ce qu&apos;il faut absolument eviter de dire dans votre contestation</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-bleu-france text-white rounded-full flex items-center justify-center text-[12px] font-bold mt-0.5">3</span>
            <span className="text-[14px] text-gris-texte"><strong className="text-gris-titre">Le motif de contestation redige</strong> — un texte pret a copier-coller dans le formulaire officiel, adapte a votre cas</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-bleu-france text-white rounded-full flex items-center justify-center text-[12px] font-bold mt-0.5">4</span>
            <span className="text-[14px] text-gris-texte"><strong className="text-gris-titre">Le guide pas a pas</strong> — chaque etape sur le portail officiel (ANTAI ou commune), quoi cocher, quoi joindre comme pieces</span>
          </li>
        </ul>
      </div>

      {/* Arguments floutes */}
      {hasArguments && (
        <div className="bg-white border border-gris-bordure rounded-card p-6 mb-6">
          <h2 className="text-h3 text-gris-titre mb-2">
            Apercu de vos arguments
          </h2>
          <p className="text-[14px] text-gris-mention mb-4">
            Voici un apercu des pistes identifiees. Le dossier complet detaille chaque argument avec les references legales et la formulation exacte a utiliser.
          </p>

          <BlurredTeaser message="Debloquez vos arguments personnalises">
            <div className="space-y-4">
              {scoring.argumentsPreview.map((arg, index) => (
                <div
                  key={index}
                  className="border-l-4 border-bleu-france pl-4"
                >
                  <p className="text-body font-bold text-gris-titre">
                    {arg.titre}
                  </p>
                  <p className="text-body text-gris-texte">{arg.resume}</p>
                </div>
              ))}
            </div>
          </BlurredTeaser>
        </div>
      )}

      {/* CTA */}
      {!hasAlerte && (
        <>
          <Link
            href="/contest/paywall"
            className="block w-full text-center bg-bleu-france text-white font-bold text-button py-[14px] rounded-button hover:bg-bleu-france-hover transition-colors min-h-[48px]"
          >
            Debloquer mon dossier complet — 14,90&nbsp;&euro;
          </Link>

          <p className="text-[12px] text-gris-mention mt-4 text-center">
            Paiement securise par Stripe — Apple Pay et Google Pay acceptes
          </p>
        </>
      )}

      {/* Lien retour si alerte */}
      {hasAlerte && (
        <Link
          href="/contest/upload"
          className="block w-full text-center border border-bleu-france text-bleu-france font-bold text-button py-[14px] rounded-button hover:bg-bleu-fond transition-colors min-h-[48px]"
        >
          Analyser une autre amende
        </Link>
      )}
    </div>
  );
}
