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
import { generateDateModified, getDatePublished } from "@/lib/seo-utils";
import { generateDeptIntro, generateLocalStats, getArticlesLoi } from "@/lib/geo-content";
import { prepositionDept } from "@/lib/geo";
import { DepartementsVoisins } from "@/components/DepartementsVoisins";
import { AutresInfractions } from "@/components/AutresInfractions";
import { GuidesEditoriaux } from "@/components/GuidesEditoriaux";
import AuthorBox from "@/components/AuthorBox";
import SourcesBadge from "@/components/SourcesBadge";

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
  const prep = prepositionDept(dept.nom);
  return {
    title: `Contester une ${type.label.toLowerCase()} ${prep} (${dept.code}) \u2014 Conteste.app`,
    description: `Comment contester une ${type.label.toLowerCase()} ${prep} (${dept.code}) ? Tribunal comp\u00e9tent : ${dept.tribunal}. D\u00e9lai : ${type.delaiJours} jours. Montant : ${type.montantForfaitaire} \u20ac. Guide complet.`,
    openGraph: {
      title: `Contester une ${type.label.toLowerCase()} ${prep} (${dept.code}) \u2014 Conteste.app`,
      description: `Tribunal : ${dept.tribunal}. D\u00e9lai : ${type.delaiJours} jours. Guide complet de contestation.`,
      url: `https://conteste.app/guides/${type.slug}/${dept.code}`,
      siteName: "Conteste.app",
      locale: "fr_FR",
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `Contester une ${type.label.toLowerCase()} ${prep} (${dept.code})`,
      description: `Tribunal : ${dept.tribunal}. D\u00e9lai : ${type.delaiJours} jours. Guide complet.`,
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

  const datePublished = getDatePublished(type.slug, type.datePublished);
  const dateModified = generateDateModified(type.slug, dept.code);
  const intro = generateDeptIntro(type, dept);
  const localStats = generateLocalStats(type, dept);
  const articlesLoi = getArticlesLoi(type.slug);
  const prep = prepositionDept(dept.nom);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `Contester une ${type.label.toLowerCase()} ${prep} (${dept.code})`,
      description: `Guide de contestation d'une ${type.label.toLowerCase()} dans le d\u00e9partement ${dept.nom}. Tribunal comp\u00e9tent : ${dept.tribunal}.`,
      url: `https://conteste.app/guides/${type.slug}/${dept.code}`,
      datePublished,
      dateModified,
      author: { "@type": "Organization", name: "Conteste.app", url: "https://conteste.app" },
      publisher: {
        "@type": "Organization",
        name: "Conteste.app",
        url: "https://conteste.app",
      },
      reviewedBy: { "@type": "Organization", name: "Conteste.app", url: "https://conteste.app" },
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
      name: `Comment contester une ${type.label.toLowerCase()} ${prep}`,
      description: `\u00c9tapes pour contester une ${type.label.toLowerCase()} ${prep} via ${portailNom}`,
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
          Contester une {type.label.toLowerCase()} {prep} ({dept.code})
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

        {/* Intro unique par d\u00e9partement */}
        <p className="text-body text-gris-texte mb-6 leading-relaxed">{intro}</p>

        {/* Sources officielles */}
        <div className="mb-6">
          <SourcesBadge />
        </div>

        {/* Table des mati\u00e8res */}
        <nav className="bg-[#F6F6F6] p-4 rounded-lg mb-6">
          <p className="font-bold text-sm">Sur cette page</p>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li><a href="#tribunal-competent" className="text-[14px] text-bleu-france hover:underline">Tribunal comp\u00e9tent</a></li>
            <li><a href="#ce-que-vous-devez-savoir" className="text-[14px] text-bleu-france hover:underline">Ce que vous devez savoir</a></li>
            <li><a href="#le-saviez-vous" className="text-[14px] text-bleu-france hover:underline">Le saviez-vous ?</a></li>
            <li><a href="#motifs-contestation" className="text-[14px] text-bleu-france hover:underline">Motifs de contestation</a></li>
            <li><a href="#articles-de-loi" className="text-[14px] text-bleu-france hover:underline">Articles de loi applicables</a></li>
            <li><a href="#comment-contester" className="text-[14px] text-bleu-france hover:underline">Comment contester</a></li>
            <li><a href="#questions-frequentes" className="text-[14px] text-bleu-france hover:underline">Questions fr\u00e9quentes</a></li>
            <li><a href="#departements-voisins" className="text-[14px] text-bleu-france hover:underline">D\u00e9partements voisins</a></li>
          </ul>
        </nav>

        {/* Tribunal comp\u00e9tent */}
        <section id="tribunal-competent" className="mb-8">
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
        <section id="ce-que-vous-devez-savoir" className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">Ce que vous devez savoir</h2>
          <ul className="space-y-3 text-body text-gris-texte">
            <li className="flex gap-2">
              <span className="text-bleu-france font-bold flex-shrink-0">&bull;</span>
              <span>
                {prep.charAt(0).toUpperCase() + prep.slice(1)}, les contestations d&apos;amendes pour {type.label.toLowerCase()} sont
                trait\u00e9es par le {dept.tribunal}. En cas de rejet de votre requ\u00eate en exon\u00e9ration,
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

        {/* Le saviez-vous ? */}
        <section id="le-saviez-vous" className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">Le saviez-vous ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {localStats.map((stat, i) => (
              <div key={i} className="bg-bleu-fond border border-bleu-clair rounded-card p-4">
                <p className="text-[14px] font-bold text-gris-titre mb-1">{stat.title}</p>
                <p className="text-[13px] text-gris-texte">{stat.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Motifs de contestation */}
        <section id="motifs-contestation" className="mb-8">
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

        {/* Articles de loi */}
        {articlesLoi.length > 0 && (
          <section id="articles-de-loi" className="mb-8">
            <h2 className="text-h2 text-gris-titre mb-4">Articles de loi applicables</h2>
            <div className="space-y-3">
              {articlesLoi.map((art) => (
                <div key={art.article} className="bg-white border border-gris-bordure rounded-card p-4">
                  <h3 className="text-h3 text-gris-titre mb-2">
                    <a href={art.url} target="_blank" rel="noopener noreferrer" className="text-bleu-france hover:underline">
                      {art.article}
                    </a>
                  </h3>
                  <p className="text-body text-gris-texte">{art.texte}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA interm\u00e9diaire */}
        <div className="bg-bleu-fond border border-bleu-clair rounded-card p-6 text-center my-8">
          <p className="text-body font-bold text-gris-titre mb-3">
            Vous avez re\u00e7u ce type d&apos;amende ?
          </p>
          <a href="/contest/upload" className="inline-block bg-bleu-france text-white font-bold py-3 px-6 rounded-button hover:bg-bleu-france-hover transition-colors min-h-[48px]">
            Analyser mon amende gratuitement
          </a>
        </div>

        {/* Comment contester */}
        <section id="comment-contester" className="mb-8">
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
        <section id="questions-frequentes" className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">Questions fr\u00e9quentes</h2>
          <div className="space-y-4">
            {faq.slice(0, 2).map((item, i) => (
              <div key={i} className="bg-white border border-gris-bordure rounded-card p-4">
                <h3 className="text-h3 font-bold text-gris-titre mb-2">{item.question}</h3>
                <p className="text-body text-gris-texte">{item.answer}</p>
              </div>
            ))}
            {faq.slice(2).map((item, i) => (
              <details key={i + 2} className="bg-white border border-gris-bordure rounded-card group">
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

        {/* D\u00e9partements voisins */}
        <div id="departements-voisins">
          <DepartementsVoisins currentDeptCode={dept.code} currentType={type.slug} />
        </div>

        {/* Autres infractions */}
        <AutresInfractions currentDeptCode={dept.code} currentDeptNom={dept.nom} currentType={type.slug} />

        {/* Guides \u00e9ditoriaux */}
        <GuidesEditoriaux />

        {/* Author + Sources */}
        <AuthorBox />

        {/* Date de mise \u00e0 jour visible */}
        <p className="text-[12px] text-gris-mention mt-4 mb-8">
          Derni\u00e8re mise \u00e0 jour : {new Date(dateModified).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
        </p>

        {/* CTA */}
        <div className="bg-bleu-fond rounded-card p-8 text-center">
          <h2 className="text-h2 text-gris-titre mb-3">
            Vous avez re\u00e7u une {type.label.toLowerCase()} {prep} ?
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
