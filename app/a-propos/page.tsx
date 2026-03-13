import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos — Conteste.app",
  description:
    "Conteste.app aide les automobilistes français à exercer leur droit de contestation. Découvrez notre méthodologie, nos sources juridiques et notre mission.",
  openGraph: {
    title: "À propos — Conteste.app",
    description:
      "Notre mission : aider les automobilistes français à exercer leur droit de contestation grâce à une analyse automatisée et des sources juridiques officielles.",
    url: "https://conteste.app/a-propos",
    siteName: "Conteste.app",
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://conteste.app/a-propos",
  },
};

export default function AProposPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Conteste.app",
    url: "https://conteste.app",
    description:
      "Outil d'aide à la contestation d'amendes pour les automobilistes français.",
    foundingDate: "2026",
    areaServed: {
      "@type": "Country",
      name: "France",
    },
    knowsAbout: [
      "Contestation d'amendes",
      "Code de la route",
      "Code de procédure pénale",
      "ANTAI",
      "Droit routier français",
    ],
    sameAs: ["https://conteste.app"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container-landing py-12 md:py-16">
        {/* Breadcrumbs */}
        <nav
          aria-label="Fil d'Ariane"
          className="text-[14px] text-gris-mention mb-6"
        >
          <Link href="/" className="hover:text-bleu-france">
            Accueil
          </Link>
          <span className="mx-2">&gt;</span>
          <span className="text-gris-titre font-medium">À propos</span>
        </nav>

        <h1 className="text-h1-mobile md:text-h1-desktop text-gris-titre mb-8">
          À propos de Conteste.app
        </h1>

        {/* Mission */}
        <section className="mb-10">
          <h2 className="text-h2 text-gris-titre mb-4">Notre mission</h2>
          <div className="bg-bleu-fond rounded-card p-6">
            <p className="text-body text-gris-texte">
              Aider les automobilistes français à exercer leur droit de
              contestation. Chaque année, des millions d&apos;avis de
              contravention sont émis en France. Beaucoup sont contestables,
              mais les démarches restent complexes et mal connues.
              Conteste.app simplifie ce processus en fournissant une analyse
              claire, rapide et fondée sur le droit en vigueur.
            </p>
          </div>
        </section>

        {/* Méthodologie */}
        <section className="mb-10">
          <h2 className="text-h2 text-gris-titre mb-4">Notre méthodologie</h2>
          <div className="space-y-3 text-body text-gris-texte">
            <p>
              Analyse automatisée par intelligence artificielle, vérifiée par
              des critères juridiques issus du Code de la route et du Code de
              procédure pénale.
            </p>
            <p>
              Notre outil examine chaque situation au regard des textes
              applicables, identifie les motifs de contestation recevables et
              évalue leur force juridique. Les critères d&apos;analyse sont
              régulièrement mis à jour pour refléter les évolutions
              législatives et jurisprudentielles.
            </p>
          </div>
        </section>

        {/* Sources */}
        <section className="mb-10">
          <h2 className="text-h2 text-gris-titre mb-4">Nos sources</h2>
          <p className="text-body text-gris-texte mb-4">
            L&apos;ensemble de nos analyses s&apos;appuie sur des sources
            juridiques officielles et vérifiables :
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-gris-bordure rounded-card p-4">
              <h3 className="text-h3 text-gris-titre mb-1">Légifrance</h3>
              <p className="text-[13px] text-gris-mention mb-2">
                Service public de diffusion du droit
              </p>
              <a
                href="https://www.legifrance.gouv.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-bleu-france hover:underline"
              >
                legifrance.gouv.fr &rarr;
              </a>
            </div>
            <div className="bg-white border border-gris-bordure rounded-card p-4">
              <h3 className="text-h3 text-gris-titre mb-1">ANTAI</h3>
              <p className="text-[13px] text-gris-mention mb-2">
                Agence nationale de traitement automatisé des infractions
              </p>
              <a
                href="https://www.antai.gouv.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-bleu-france hover:underline"
              >
                antai.gouv.fr &rarr;
              </a>
            </div>
            <div className="bg-white border border-gris-bordure rounded-card p-4">
              <h3 className="text-h3 text-gris-titre mb-1">Code de la route</h3>
              <p className="text-[13px] text-gris-mention mb-2">
                Textes législatifs et réglementaires applicables
              </p>
              <a
                href="https://www.legifrance.gouv.fr/codes/id/LEGITEXT000006074228/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-bleu-france hover:underline"
              >
                Consulter sur Légifrance &rarr;
              </a>
            </div>
            <div className="bg-white border border-gris-bordure rounded-card p-4">
              <h3 className="text-h3 text-gris-titre mb-1">Jurisprudence</h3>
              <p className="text-[13px] text-gris-mention mb-2">
                Décisions de justice et interprétations des tribunaux
              </p>
              <a
                href="https://www.legifrance.gouv.fr/search/juri"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-bleu-france hover:underline"
              >
                Rechercher sur Légifrance &rarr;
              </a>
            </div>
          </div>
        </section>

        {/* Avertissement juridique */}
        <section className="mb-10">
          <div className="bg-[#FEF3CD] border border-[#FFD166] rounded-card p-6">
            <h2 className="text-h3 text-gris-titre mb-2">
              Avertissement important
            </h2>
            <p className="text-body text-gris-texte">
              Les informations fournies ne constituent pas un conseil juridique.
              Conteste.app est un outil d&apos;aide à la décision qui analyse
              les situations au regard des textes en vigueur, mais ne se
              substitue pas à l&apos;avis d&apos;un professionnel du droit. En
              cas de doute, consultez un avocat spécialisé.
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-bleu-fond rounded-card p-8 text-center">
          <h2 className="text-h2 text-gris-titre mb-3">
            Vous avez reçu une amende ?
          </h2>
          <p className="text-body text-gris-texte mb-6">
            Analysez gratuitement vos chances de contestation en moins de 60
            secondes.
          </p>
          <Link
            href="/contest/upload"
            className="inline-block bg-bleu-france text-white font-bold text-button px-8 py-[14px] rounded-button hover:bg-bleu-france-hover transition-colors min-h-[48px]"
          >
            Analyser mon amende gratuitement &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
