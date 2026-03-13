import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getTypes,
  getTypeBySlug,
  getDepartements,
  getDepartementByCode,
  getMotifsByKeys,
  generateDeptFaq,
  generateEtapes,
} from "@/lib/data";

interface PageProps {
  params: { type: string; dept: string };
}

export function generateStaticParams() {
  const types = getTypes();
  const depts = getDepartements();
  const params: Array<{ type: string; dept: string }> = [];
  for (const t of types) {
    for (const d of depts) {
      params.push({ type: t.slug, dept: d.code });
    }
  }
  return params;
}

export function generateMetadata({ params }: PageProps): Metadata {
  const type = getTypeBySlug(params.type);
  const dept = getDepartementByCode(params.dept);
  if (!type || !dept) return {};
  return {
    title: `Contester une ${type.label} dans le ${dept.nom} (${dept.code}) — Conteste.app`,
    description: `Comment contester une ${type.label.toLowerCase()} dans le ${dept.nom} (${dept.code}) ? Tribunal comp\u00e9tent : ${dept.tribunal}. D\u00e9lai : ${type.delaiJours} jours. Montant : ${type.montantForfaitaire}\u00a0\u20ac. Guide complet.`,
    openGraph: {
      title: `Contester une ${type.label} dans le ${dept.nom} (${dept.code}) — Conteste.app`,
      description: `Tribunal : ${dept.tribunal}. D\u00e9lai : ${type.delaiJours} jours. Guide complet de contestation.`,
      url: `https://conteste.app/guides/${type.slug}/${dept.code}`,
      siteName: "Conteste.app",
      locale: "fr_FR",
      type: "article",
    },
    alternates: {
      canonical: `https://conteste.app/guides/${type.slug}/${dept.code}`,
    },
  };
}

export default function GuideDeptPage({ params }: PageProps) {
  const type = getTypeBySlug(params.type);
  const dept = getDepartementByCode(params.dept);
  if (!type || !dept) notFound();

  const motifs = getMotifsByKeys(type.motifsPrincipaux);
  const faq = generateDeptFaq(type, dept);
  const etapes = generateEtapes(type);
  const portailNom = type.portail === "antai" ? "ANTAI" : "le portail de la commune";
  const portailUrl = type.portail === "antai"
    ? "https://www.antai.gouv.fr"
    : dept.portailCommune;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `Contester une ${type.label} dans le ${dept.nom} (${dept.code})`,
      description: `Guide de contestation d'une ${type.label.toLowerCase()} dans le d\u00e9partement ${dept.nom}. Tribunal comp\u00e9tent : ${dept.tribunal}.`,
      url: `https://conteste.app/guides/${type.slug}/${dept.code}`,
      datePublished: "2026-03-01",
      dateModified: "2026-03-12",
      author: { "@type": "Organization", name: "Conteste.app" },
      publisher: {
        "@type": "Organization",
        name: "Conteste.app",
        url: "https://conteste.app",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: `Comment contester une ${type.label.toLowerCase()} dans le ${dept.nom}`,
      description: `\u00c9tapes pour contester une ${type.label.toLowerCase()} dans le ${dept.nom} via ${portailNom}`,
      step: etapes.map((e) => ({
        "@type": "HowToStep",
        position: e.numero,
        name: e.action,
        text: e.detail,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: "https://conteste.app" },
        { "@type": "ListItem", position: 2, name: "Guides", item: "https://conteste.app/guides" },
        { "@type": "ListItem", position: 3, name: type.label, item: `https://conteste.app/guides/${type.slug}` },
        { "@type": "ListItem", position: 4, name: `${dept.nom} (${dept.code})`, item: `https://conteste.app/guides/${type.slug}/${dept.code}` },
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
          <Link href="/guides" className="hover:text-bleu-france">Guides</Link>
          <span className="mx-2">&gt;</span>
          <Link href={`/guides/${type.slug}`} className="hover:text-bleu-france">{type.label}</Link>
          <span className="mx-2">&gt;</span>
          <span className="text-gris-titre font-medium">{dept.nom} ({dept.code})</span>
        </nav>

        {/* H1 */}
        <h1 className="text-h1-mobile md:text-h1-desktop text-gris-titre mb-4">
          Contester une {type.label.toLowerCase()} dans le {dept.nom} ({dept.code})
        </h1>

        {/* Chiffre cl\u00e9 */}
        <div className="bg-bleu-fond rounded-card p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-[24px] md:text-[28px] font-extrabold text-bleu-france">{type.delaiJours}j</p>
              <p className="text-[13px] text-gris-mention">D\u00e9lai de contestation</p>
            </div>
            <div>
              <p className="text-[24px] md:text-[28px] font-extrabold text-bleu-france">{type.montantForfaitaire}&euro;</p>
              <p className="text-[13px] text-gris-mention">Montant forfaitaire</p>
            </div>
            <div>
              <p className="text-[24px] md:text-[28px] font-extrabold text-bleu-france">
                {type.pointsRetrait > 0 ? type.pointsRetrait : "0"}
              </p>
              <p className="text-[13px] text-gris-mention">Point{type.pointsRetrait !== 1 ? "s" : ""} retir\u00e9{type.pointsRetrait !== 1 ? "s" : ""}</p>
            </div>
            <div>
              <p className="text-[24px] md:text-[28px] font-extrabold text-bleu-france uppercase text-[16px]">
                {type.portail === "antai" ? "ANTAI" : "Commune"}
              </p>
              <p className="text-[13px] text-gris-mention">Portail de contestation</p>
            </div>
          </div>
        </div>

        {/* Tribunal comp\u00e9tent */}
        <section className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">Tribunal comp\u00e9tent</h2>
          <div className="bg-white border border-gris-bordure border-l-4 border-l-bleu-france rounded-card p-6">
            <p className="text-h3 text-gris-titre mb-2">{dept.tribunal}</p>
            <p className="text-body text-gris-texte mb-1">{dept.adresseTribunal}</p>
            <p className="text-[13px] text-gris-mention">
              R\u00e9gion : {dept.region}
            </p>
          </div>
        </section>

        {/* Ce que vous devez savoir */}
        <section className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">Ce que vous devez savoir</h2>
          <ul className="space-y-3 text-body text-gris-texte">
            <li className="flex gap-2">
              <span className="text-bleu-france font-bold flex-shrink-0">&bull;</span>
              <span>
                Dans le {dept.nom}, les contestations d&apos;amendes pour {type.label.toLowerCase()} sont
                trait\u00e9es par le {dept.tribunal}. En cas de rejet de votre requ\u00eate en ex\u00e9ration,
                c&apos;est devant cette juridiction que votre dossier sera examin\u00e9.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-bleu-france font-bold flex-shrink-0">&bull;</span>
              <span>
                Vous disposez de {type.delaiJours} jours pour contester. Le d\u00e9lai court \u00e0 compter
                de la date d&apos;envoi de l&apos;avis, pas de sa r\u00e9ception. Ne payez pas l&apos;amende
                avant de contester.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-bleu-france font-bold flex-shrink-0">&bull;</span>
              <span>
                La contestation se fait en ligne sur {portailNom}. Munissez-vous de votre
                avis de contravention et de tout \u00e9l\u00e9ment de preuve pertinent.
              </span>
            </li>
          </ul>
        </section>

        {/* Motifs de contestation */}
        <section className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">Motifs de contestation recevables</h2>
          <div className="space-y-3">
            {motifs.map((motif) => (
              <div
                key={motif.slug}
                className="bg-white border border-gris-bordure border-l-4 border-l-bleu-france rounded-card p-4"
              >
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h3 className="text-h3 text-gris-titre">{motif.label}</h3>
                  <span
                    className={`text-badge px-3 py-1 rounded-pill flex-shrink-0 ${
                      motif.force === "fort"
                        ? "bg-vert-fond text-vert-succes"
                        : "bg-score-moyen-fond text-score-moyen-texte"
                    }`}
                  >
                    {motif.force === "fort" ? "Fort" : "Moyen"}
                  </span>
                </div>
                <p className="text-body text-gris-texte mb-1">{motif.description}</p>
                <p className="text-[13px] text-gris-mention">
                  R\u00e9f\u00e9rence : {motif.articleCode}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Comment contester */}
        <section className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">
            Comment contester
          </h2>
          <div className="space-y-4">
            {etapes.map((etape) => (
              <div key={etape.numero} className="flex gap-4">
                <div className="w-8 h-8 bg-bleu-france text-white rounded-full flex items-center justify-center font-bold text-[14px] flex-shrink-0 mt-1">
                  {etape.numero}
                </div>
                <div>
                  <h3 className="text-h3 text-gris-titre mb-1">{etape.action}</h3>
                  <p className="text-body text-gris-texte">{etape.detail}</p>
                </div>
              </div>
            ))}
          </div>
          {portailUrl && (
            <p className="mt-4 text-body">
              <a
                href={portailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-bleu-france underline hover:text-bleu-france-hover"
              >
                Acc\u00e9der au portail de contestation &rarr;
              </a>
            </p>
          )}
        </section>

        {/* FAQ */}
        <section className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">Questions fr\u00e9quentes</h2>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <details key={i} className="bg-white border border-gris-bordure rounded-card group">
                <summary className="p-4 cursor-pointer text-h3 text-gris-titre list-none flex justify-between items-center">
                  {item.question}
                  <span className="text-bleu-france ml-2 flex-shrink-0 group-open:rotate-180 transition-transform">
                    &#9662;
                  </span>
                </summary>
                <div className="px-4 pb-4 text-body text-gris-texte">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-bleu-fond rounded-card p-8 text-center">
          <h2 className="text-h2 text-gris-titre mb-3">
            Vous avez re\u00e7u une {type.label.toLowerCase()} dans le {dept.nom} ?
          </h2>
          <p className="text-body text-gris-texte mb-6">
            Analysez gratuitement vos chances de contestation en moins de 60 secondes.
            Nous identifions les meilleurs motifs pour votre cas pr\u00e9cis.
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
