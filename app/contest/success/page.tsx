"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { AmendeExtracted } from "@/lib/types";
import { formatDateFR } from "@/lib/utils";

export default function SuccessPage() {
  const [email, setEmail] = useState("");
  const [amende, setAmende] = useState<AmendeExtracted | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedEmail = localStorage.getItem("conteste_email") || "";
    setEmail(storedEmail);
    try {
      // Essayer conteste_amende d'abord, puis conteste_dossier en fallback
      const raw = localStorage.getItem("conteste_amende") || localStorage.getItem("conteste_dossier");
      if (raw) {
        setAmende(JSON.parse(raw) as AmendeExtracted);
      }
    } catch {
      // pas de données amende
    }
  }, []);

  return (
    <div className="container-flow py-8 text-center">
      <div className="bg-vert-fond text-vert-succes rounded-full w-[64px] h-[64px] flex items-center justify-center text-[28px] mx-auto mb-6">
        &#10003;
      </div>

      <h1 className="text-h2 text-gris-titre mb-4">
        Votre dossier est pret
      </h1>

      {(email || amende) && (
        <p className="text-body text-gris-texte mb-6">
          Votre dossier a ete envoye a{" "}
          <strong className="text-gris-titre">
            {email || (amende ? `${amende.prenom.toLowerCase()}.${amende.nom.toLowerCase()}@exemple.fr` : "")}
          </strong>
        </p>
      )}

      {/* Récap amende */}
      {amende && (
        <div className="bg-bleu-fond rounded-card p-6 mb-6 text-left">
          <h2 className="text-h3 text-gris-titre mb-3">Recapitulatif</h2>
          <div className="space-y-1 text-[14px] text-gris-texte">
            <p>
              <strong>Type :</strong>{" "}
              {amende.type.charAt(0).toUpperCase() + amende.type.slice(1)}
            </p>
            <p>
              <strong>Montant :</strong> {amende.montant}&nbsp;&euro;
            </p>
            {amende.dateLimiteContestation && (
              <p>
                <strong>Date limite :</strong>{" "}
                {formatDateFR(amende.dateLimiteContestation)}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Rappel date limite */}
      {amende?.dateLimiteContestation && (
        <div className="bg-orange-fond border-l-4 border-orange-warning rounded-card p-4 mb-6 text-left">
          <p className="text-body font-bold text-orange-warning mb-1">
            Rappel important
          </p>
          <p className="text-[14px] text-gris-texte">
            Vous avez jusqu&apos;au{" "}
            <strong>{formatDateFR(amende.dateLimiteContestation)}</strong> pour
            contester votre amende sur le portail ANTAI.
          </p>
        </div>
      )}

      {!amende && (
        <div className="bg-orange-fond border-l-4 border-orange-warning rounded-card p-4 mb-8 text-left">
          <p className="text-body font-bold text-orange-warning mb-1">
            Rappel important
          </p>
          <p className="text-[14px] text-gris-texte">
            N&apos;oubliez pas de contester avant la date limite indiquee sur
            votre avis. Le delai legal est de 45 jours.
          </p>
        </div>
      )}

      <p className="text-[14px] text-gris-mention mb-6">
        Nous vous recontacterons dans 60 jours pour savoir si votre
        contestation a abouti.
      </p>

      <Link
        href="/"
        className="inline-block border border-bleu-france text-bleu-france font-bold text-button px-8 py-[14px] rounded-button hover:bg-bleu-fond transition-colors min-h-[48px]"
      >
        Retour a l&apos;accueil
      </Link>
    </div>
  );
}
