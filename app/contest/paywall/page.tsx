"use client";

import { useState, useEffect, useCallback, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getStripe } from "@/lib/stripe";
import { PRIX_MVP_DISPLAY } from "@/lib/types";

// ---- Composant de formulaire Stripe ----

function CheckoutForm({ email }: { email: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      const baseUrl = window.location.origin;
      const dossierId = typeof window !== "undefined"
        ? localStorage.getItem("conteste_dossier_id") || ""
        : "";

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${baseUrl}/contest/pack?dossierId=${dossierId}&email=${encodeURIComponent(email)}`,
          receipt_email: email,
        },
      });

      if (result.error) {
        setError(result.error.message || "Erreur lors du paiement");
      }
      // Si pas d'erreur, le navigateur est redirigé automatiquement
    } catch {
      setError("Une erreur inattendue est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement
        options={{
          layout: "tabs",
          wallets: {
            applePay: "auto",
            googlePay: "auto",
          },
        }}
      />

      {error && (
        <div className="bg-orange-fond border-l-4 border-orange-warning rounded p-3 mt-4">
          <p className="text-[14px] text-orange-warning">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="block w-full text-center bg-bleu-france text-white font-bold text-button py-[14px] rounded-button hover:bg-bleu-france-hover transition-colors min-h-[48px] mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Traitement en cours..." : `Payer ${PRIX_MVP_DISPLAY}`}
      </button>
    </form>
  );
}

// ---- Page Paywall principale ----

export default function PaywallPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stripeAvailable, setStripeAvailable] = useState<boolean | null>(null);

  // Vérifier si Stripe est disponible
  useEffect(() => {
    getStripe().then((s) => setStripeAvailable(s !== null));
  }, []);

  // Initialiser le PaymentIntent
  const initPayment = useCallback(async () => {
    if (!email || !email.includes("@")) return;

    setLoading(true);
    setError(null);

    try {
      const dossierId = localStorage.getItem("conteste_dossier_id") || "dev_" + Date.now();
      localStorage.setItem("conteste_dossier_id", dossierId);
      localStorage.setItem("conteste_email", email);

      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dossierId, email }),
      });

      const data = await res.json() as {
        success: boolean;
        data?: { clientSecret: string; paymentIntentId: string };
        error?: string;
      };

      if (!data.success || !data.data?.clientSecret) {
        throw new Error(data.error || "Erreur de creation du paiement");
      }

      setClientSecret(data.data.clientSecret);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur inattendue";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [email]);

  // Simuler le paiement en dev/demo
  const handleDevPayment = () => {
    const dossierId = localStorage.getItem("conteste_dossier_id") || "demo_" + Date.now();
    localStorage.setItem("conteste_dossier_id", dossierId);
    localStorage.setItem("conteste_paid", "true");
    if (email) {
      localStorage.setItem("conteste_email", email);
    }
    router.push(`/contest/pack?dossierId=${dossierId}&dev=true`);
  };

  const stripePromise = getStripe();

  return (
    <div className="container-flow py-8">
      {/* Card prix */}
      <div
        className="rounded-card p-8 mb-6 text-center"
        style={{ border: "2px solid var(--bleu-france)" }}
      >
        <p
          className="font-extrabold mb-1"
          style={{ fontSize: 40, color: "var(--bleu-france)" }}
        >
          14,90&euro;
        </p>
        <p className="text-[14px] text-gris-mention">
          Paiement unique &mdash; pas d&apos;abonnement
        </p>
      </div>

      {/* Liste inclus */}
      <div className="bg-white border border-gris-bordure rounded-card p-6 mb-6">
        <ul className="space-y-3">
          {[
            "2 a 3 arguments personnalises pour votre cas",
            "Guide etape par etape pour contester sur ANTAI",
            "Motif de contestation pret a copier-coller",
            "Recapitulatif envoye par email",
          ].map((item, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="text-vert-succes font-bold mt-0.5 text-[18px]">
                &#10003;
              </span>
              <span className="text-body text-gris-texte">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Champ email */}
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block text-[14px] font-bold text-gris-titre mb-2"
        >
          Votre email (pour recevoir le recapitulatif)
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email.fr"
          required
          className="w-full border border-gris-bordure rounded-button px-4 py-3 text-body text-gris-texte focus:outline-none focus:border-bleu-france focus:ring-1 focus:ring-bleu-france"
        />
      </div>

      {/* Erreur */}
      {error && (
        <div className="bg-orange-fond border-l-4 border-orange-warning rounded-card p-4 mb-4">
          <p className="text-[14px] text-orange-warning">{error}</p>
        </div>
      )}

      {/* Stripe Payment Element */}
      {stripeAvailable && clientSecret ? (
        <div className="mb-6">
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: "stripe",
                variables: {
                  colorPrimary: "#000091",
                  fontFamily: "Marianne, -apple-system, BlinkMacSystemFont, sans-serif",
                },
              },
              locale: "fr",
            }}
          >
            <CheckoutForm email={email} />
          </Elements>
        </div>
      ) : stripeAvailable && !clientSecret ? (
        <div className="mb-6">
          <button
            onClick={initPayment}
            disabled={loading || !email || !email.includes("@")}
            className="block w-full text-center bg-bleu-france text-white font-bold text-button py-[14px] rounded-button hover:bg-bleu-france-hover transition-colors min-h-[48px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Chargement..." : `Payer par carte bancaire — ${PRIX_MVP_DISPLAY}`}
          </button>
        </div>
      ) : null}

      {/* Mode demo sans Stripe */}
      {stripeAvailable === false && (
        <div className="mb-6 space-y-3">
          <button
            onClick={handleDevPayment}
            className="block w-full text-center font-bold text-[16px] py-[14px] rounded-button transition-colors min-h-[48px]"
            style={{
              border: "2px dashed #999",
              color: "#666",
              backgroundColor: "transparent",
            }}
          >
            Simuler le paiement (mode demo)
          </button>
        </div>
      )}

      {/* Sécurité */}
      <p className="text-[12px] text-gris-mention text-center">
        &#128274; Paiement securise par Stripe. Apple Pay et Google Pay acceptes.
      </p>
    </div>
  );
}
