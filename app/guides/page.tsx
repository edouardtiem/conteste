import Link from "next/link";
import type { Metadata } from "next";
import { getTypes } from "@/lib/data";

export const metadata: Metadata = {
  title: "Guides de contestation d'amendes en France — Conteste.app",
  description:
    "Guides complets pour contester vos amendes en France : radar, stationnement FPS, feux rouges, ceinture, t\u00e9l\u00e9phone. D\u00e9lais, motifs recevables, d\u00e9marches par d\u00e9partement.",
  openGraph: {
    title: "Guides de contestation d'amendes en France — Conteste.app",
    description:
      "Guides complets pour contester vos amendes en France. D\u00e9lais, motifs recevables, d\u00e9marches ANTAI par d\u00e9partement.",
    url: "https://conteste.app/guides",
    siteName: "Conteste.app",
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://conteste.app/guides",
  },
};

export default function GuidesPage() {
  const types = getTypes();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Guides de contestation d'amendes en France",
    description:
      "Guides complets pour contester vos amendes en France : radar, stationnement FPS, feux rouges, ceinture, t\u00e9l\u00e9phone.",
    url: "https://conteste.app/guides",
    publisher: {
      "@type": "Organization",
      name: "Conteste.app",
      url: "https://conteste.app",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Accueil",
          item: "https://conteste.app",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Guides",
          item: "https://conteste.app/guides",
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container-landing py-12 md:py-16">
        {/* Breadcrumbs */}
        <nav aria-label="Fil d'Ariane" className="text-[14px] text-gris-mention mb-6">
          <Link href="/" className="hover:text-bleu-france">
            Accueil
          </Link>
          <span className="mx-2">&gt;</span>
          <span className="text-gris-titre font-medium">Guides</span>
        </nav>

        <h1 className="text-h1-mobile md:text-h1-desktop text-gris-titre mb-4">
          Guides de contestation d&apos;amendes en France
        </h1>
        <p className="text-body text-gris-texte mb-8 max-w-[700px]">
          Retrouvez nos guides d\u00e9taill\u00e9s pour contester chaque type d&apos;amende
          en France. D\u00e9lais l\u00e9gaux, motifs recevables, d\u00e9marches ANTAI
          et guides personnalis\u00e9s par d\u00e9partement avec le tribunal comp\u00e9tent.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {types.map((type) => (
            <Link
              key={type.slug}
              href={`/guides/${type.slug}`}
              className="bg-white border border-gris-bordure rounded-card p-6 hover:border-bleu-france transition-colors group"
            >
              <h2 className="text-h3 text-gris-titre mb-2 group-hover:text-bleu-france transition-colors">
                {type.label}
              </h2>
              <p className="text-body text-gris-texte mb-3">{type.description}</p>
              <div className="flex flex-wrap gap-3 text-[13px]">
                <span className="bg-bleu-fond text-bleu-france px-3 py-1 rounded-pill font-bold">
                  {type.montantForfaitaire}&nbsp;&euro; forfaitaire
                </span>
                <span className="bg-bleu-fond text-bleu-france px-3 py-1 rounded-pill font-bold">
                  {type.delaiJours} jours pour contester
                </span>
                {type.pointsRetrait > 0 && (
                  <span className="bg-orange-fond text-orange-warning px-3 py-1 rounded-pill font-bold">
                    {type.pointsRetrait} point{type.pointsRetrait > 1 ? "s" : ""} retir\u00e9{type.pointsRetrait > 1 ? "s" : ""}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
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
