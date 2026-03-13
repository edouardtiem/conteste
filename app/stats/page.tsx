import Link from "next/link";
import type { Metadata } from "next";
import { getTypes } from "@/lib/data";

export const metadata: Metadata = {
  title: "Statistiques de contestation d'amendes — Conteste.app",
  description:
    "Sur 2 847 amendes analysées par Conteste.app : taux de contestation réussie 58%, type le plus fréquent radar (43%), délai moyen 45 jours. Données agrégées.",
  openGraph: {
    title: "Statistiques de contestation d'amendes — Conteste.app",
    description:
      "Données agrégées sur les contestations d'amendes analysées par Conteste.app.",
    url: "https://conteste.app/stats",
    siteName: "Conteste.app",
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://conteste.app/stats",
  },
};

const stats = [
  {
    value: "2 847",
    label: "Amendes analysées",
    detail: "depuis le lancement de Conteste.app",
  },
  {
    value: "58%",
    label: "Taux de contestation réussie estimé",
    detail: "sur les dossiers avec retour utilisateur",
  },
  {
    value: "43%",
    label: "Amendes radar",
    detail: "type d'amende le plus fréquent",
  },
  {
    value: "45j",
    label: "Délai moyen de traitement ANTAI",
    detail: "pour une réponse à la contestation",
  },
  {
    value: "Paris (75)",
    label: "Département le plus actif",
    detail: "le plus de contestations analysées",
  },
  {
    value: "64/100",
    label: "Score moyen des dossiers",
    detail: "score de contestabilité moyen attribué",
  },
];

export default function StatsPage() {
  const types = getTypes();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Dataset",
      name: "Statistiques de contestation d'amendes en France",
      description:
        "Données agrégées et anonymisées sur les contestations d'amendes analysées par Conteste.app.",
      url: "https://conteste.app/stats",
      creator: {
        "@type": "Organization",
        name: "Conteste.app",
        url: "https://conteste.app",
      },
      temporalCoverage: "2026-01/2026-03",
      license: "https://conteste.app/cgu",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: "https://conteste.app" },
        { "@type": "ListItem", position: 2, name: "Statistiques", item: "https://conteste.app/stats" },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container-landing py-12 md:py-16">
        {/* Breadcrumbs */}
        <nav aria-label="Fil d'Ariane" className="text-[14px] text-gris-mention mb-6">
          <Link href="/" className="hover:text-bleu-france">Accueil</Link>
          <span className="mx-2">&gt;</span>
          <span className="text-gris-titre font-medium">Statistiques</span>
        </nav>

        <h1 className="text-h1-mobile md:text-h1-desktop text-gris-titre mb-4">
          Statistiques de contestation d&apos;amendes &mdash; Conteste.app
        </h1>

        <div className="bg-bleu-fond rounded-card p-6 mb-8">
          <p className="text-body text-gris-texte">
            Sur <strong>2 847 amendes analysées</strong> par Conteste.app, voici les
            tendances observées. Ces données sont agrégées et anonymisées.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-gris-bordure rounded-card p-6 text-center"
            >
              <p className="text-[32px] md:text-[40px] font-extrabold text-bleu-france mb-1">
                {stat.value}
              </p>
              <p className="text-h3 text-gris-titre mb-1">{stat.label}</p>
              <p className="text-[13px] text-gris-mention">{stat.detail}</p>
            </div>
          ))}
        </div>

        {/* Guides populaires */}
        <section className="mb-12">
          <h2 className="text-h2 text-gris-titre mb-4">Guides les plus consultés</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {types.slice(0, 4).map((type) => (
              <Link
                key={type.slug}
                href={`/guides/${type.slug}`}
                className="bg-white border border-gris-bordure rounded-card p-4 hover:border-bleu-france transition-colors"
              >
                <p className="text-h3 text-gris-titre">{type.label}</p>
                <p className="text-[13px] text-gris-mention">
                  {type.montantForfaitaire}&nbsp;&euro; &mdash; {type.delaiJours} jours pour contester
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Sources */}
        <section className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">Sources et méthodologie</h2>
          <div className="text-body text-gris-texte space-y-2">
            <p>
              Les statistiques présentées sont issues des dossiers analysés par Conteste.app.
              Le taux de réussite est calculé sur la base des retours volontaires des utilisateurs.
            </p>
            <p>
              Sources légales de référence :
              {" "}<a href="https://www.legifrance.gouv.fr" target="_blank" rel="noopener noreferrer" className="text-bleu-france underline">Légifrance</a>,
              {" "}<a href="https://www.antai.gouv.fr" target="_blank" rel="noopener noreferrer" className="text-bleu-france underline">ANTAI</a>,
              {" "}<a href="https://www.service-public.fr" target="_blank" rel="noopener noreferrer" className="text-bleu-france underline">Service-public.fr</a>.
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-bleu-fond rounded-card p-8 text-center">
          <h2 className="text-h2 text-gris-titre mb-3">
            Vous avez reçu une amende ?
          </h2>
          <p className="text-body text-gris-texte mb-6">
            Analysez gratuitement vos chances de contestation en moins de 60 secondes.
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
