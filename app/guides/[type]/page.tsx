import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getTypes,
  getTypeBySlug,
  getDepartements,
  getMotifsByKeys,
  generateTypeFaq,
  generateEtapes,
} from "@/lib/data";
import { getArticlesLoi } from "@/lib/geo-content";
import { GuidesEditoriaux } from "@/components/GuidesEditoriaux";
import AuthorBox from "@/components/AuthorBox";
import SourcesBadge from "@/components/SourcesBadge";

interface PageProps {
  params: { type: string };
}

export function generateStaticParams() {
  return getTypes().map((t) => ({ type: t.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const type = getTypeBySlug(params.type);
  if (!type) return {};
  return {
    title: `Contester une ${type.label} — Guide complet ${new Date().getFullYear()} | Conteste.app`,
    description: `Comment contester une ${type.label.toLowerCase()} en France ? Délai de ${type.delaiJours} jours, montant ${type.montantForfaitaire} €, motifs recevables et démarches sur ${type.portail === "antai" ? "ANTAI" : "le portail communal"}. Guide complet.`,
    openGraph: {
      title: `Contester une ${type.label} — Guide complet | Conteste.app`,
      description: `Délai de ${type.delaiJours} jours, montant ${type.montantForfaitaire} €, motifs recevables. Guide complet pour contester.`,
      url: `https://conteste.app/guides/${type.slug}`,
      siteName: "Conteste.app",
      locale: "fr_FR",
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `Contester une ${type.label} — Guide complet`,
      description: `Délai de ${type.delaiJours} jours, montant ${type.montantForfaitaire} €. Guide complet pour contester.`,
    },
    alternates: {
      canonical: `https://conteste.app/guides/${type.slug}`,
    },
  };
}

export default function GuideTypePage({ params }: PageProps) {
  const type = getTypeBySlug(params.type);
  if (!type) notFound();

  const departements = getDepartements();
  const motifs = getMotifsByKeys(type.motifsPrincipaux);
  const faq = generateTypeFaq(type);
  const etapes = generateEtapes(type);
  const portailNom = type.portail === "antai" ? "ANTAI" : "le portail de votre commune";
  const portailUrl = type.portail === "antai" ? "https://www.antai.gouv.fr" : null;
  const articlesLoi = getArticlesLoi(type.slug);

  const datePublishedByType: Record<string, string> = {
    radar: "2026-01-15",
    "stationnement-fps": "2026-01-22",
    "feux-rouges": "2026-02-01",
    ceinture: "2026-02-08",
    telephone: "2026-02-15",
  };
  const datePublished = datePublishedByType[type.slug] ?? "2026-01-15";
  const dateModifiedByType: Record<string, string> = {
    radar: "2026-03-07",
    "stationnement-fps": "2026-03-05",
    "feux-rouges": "2026-03-03",
    ceinture: "2026-02-28",
    telephone: "2026-03-01",
  };
  const dateModified = dateModifiedByType[type.slug] ?? "2026-03-01";

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `Contester une ${type.label}`,
      description: type.description,
      url: `https://conteste.app/guides/${type.slug}`,
      datePublished,
      dateModified,
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
      name: `Comment contester une ${type.label.toLowerCase()}`,
      description: `Étapes pour contester une ${type.label.toLowerCase()} sur ${portailNom}`,
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
          <span className="text-gris-titre font-medium">{type.label}</span>
        </nav>

        {/* H1 */}
        <h1 className="text-h1-mobile md:text-h1-desktop text-gris-titre mb-4">
          Contester une {type.label.toLowerCase()}
        </h1>

        {/* Chiffre clé */}
        <div className="bg-bleu-fond rounded-card p-6 mb-8">
          <p className="text-[28px] md:text-[36px] font-extrabold text-bleu-france mb-1">
            {type.delaiJours} jours
          </p>
          <p className="text-body text-gris-texte">
            pour contester &mdash; délai légal à compter de la date d&apos;envoi de l&apos;avis
          </p>
        </div>

        {/* Table des matières */}
        <nav className="bg-[#F6F6F6] p-4 rounded-lg mb-6">
          <p className="font-bold text-sm">Sur cette page</p>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li><a href="#ce-que-vous-devez-savoir" className="text-[14px] text-bleu-france hover:underline">Ce que vous devez savoir</a></li>
            <li><a href="#motifs-contestation" className="text-[14px] text-bleu-france hover:underline">Motifs de contestation</a></li>
            <li><a href="#articles-de-loi" className="text-[14px] text-bleu-france hover:underline">Articles de loi applicables</a></li>
            <li><a href="#comment-contester" className="text-[14px] text-bleu-france hover:underline">Comment contester</a></li>
            <li><a href="#questions-frequentes" className="text-[14px] text-bleu-france hover:underline">Questions fréquentes</a></li>
          </ul>
        </nav>

        {/* Résumé rapide */}
        <div className="bg-white border border-gris-bordure rounded-card p-6 mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">En résumé</h2>
          <ul className="space-y-2 text-body text-gris-texte">
            <li className="flex gap-2">
              <span className="text-bleu-france font-bold flex-shrink-0">&bull;</span>
              <span>Montant forfaitaire : <strong>{type.montantForfaitaire}&nbsp;&euro;</strong></span>
            </li>
            <li className="flex gap-2">
              <span className="text-bleu-france font-bold flex-shrink-0">&bull;</span>
              <span>Retrait de points : <strong>{type.pointsRetrait > 0 ? `${type.pointsRetrait} point${type.pointsRetrait > 1 ? "s" : ""}` : "Aucun"}</strong></span>
            </li>
            <li className="flex gap-2">
              <span className="text-bleu-france font-bold flex-shrink-0">&bull;</span>
              <span>Portail de contestation : <strong>{type.portail === "antai" ? "ANTAI (antai.gouv.fr)" : "Portail de la commune concernée"}</strong></span>
            </li>
            <li className="flex gap-2">
              <span className="text-bleu-france font-bold flex-shrink-0">&bull;</span>
              <span>Délai légal : <strong>{type.delaiJours} jours</strong> à compter de l&apos;envoi de l&apos;avis</span>
            </li>
          </ul>
        </div>

        {/* Ce que vous devez savoir */}
        <section id="ce-que-vous-devez-savoir" className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">Ce que vous devez savoir</h2>
          <div className="space-y-3 text-body text-gris-texte">
            <p>
              Une {type.label.toLowerCase()} peut être contestée dans un délai de {type.delaiJours} jours.
              Ce délai court à compter de la date d&apos;envoi de l&apos;avis de contravention,
              et non de sa réception.
            </p>
            <p>
              Le montant forfaitaire est de {type.montantForfaitaire}&nbsp;&euro;. Il peut être minoré
              à {Math.round(type.montantForfaitaire * 0.75)}&nbsp;&euro; en cas de paiement dans les 15 jours,
              ou majoré à {type.montantForfaitaire * 2.5 > 375 ? 375 : Math.round(type.montantForfaitaire * 2.5)}&nbsp;&euro;
              en cas de non-paiement et non-contestation.
            </p>
            <p>
              <strong>Ne payez pas l&apos;amende avant de contester.</strong> Le paiement vaut reconnaissance
              de l&apos;infraction et rend la contestation impossible.
            </p>
            {type.pointsRetrait > 0 && (
              <p>
                En cas de contestation acceptée, les {type.pointsRetrait} point{type.pointsRetrait > 1 ? "s" : ""} retiré{type.pointsRetrait > 1 ? "s" : ""} seront
                restitué{type.pointsRetrait > 1 ? "s" : ""} sur votre permis de conduire.
              </p>
            )}
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
                  Référence : {motif.articleCode}
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

        {/* Sources officielles */}
        <div className="mb-6">
          <SourcesBadge />
        </div>

        {/* CTA intermédiaire */}
        <div className="bg-bleu-fond border border-bleu-clair rounded-card p-6 text-center my-8">
          <p className="text-body font-bold text-gris-titre mb-3">
            Vous avez reçu ce type d&apos;amende ?
          </p>
          <a href="/contest/upload" className="inline-block bg-bleu-france text-white font-bold py-3 px-6 rounded-button hover:bg-bleu-france-hover transition-colors min-h-[48px]">
            Analyser mon amende gratuitement
          </a>
        </div>

        {/* Comment contester */}
        <section id="comment-contester" className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">
            Comment contester sur {portailNom}
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
                Accéder au site officiel de l&apos;ANTAI &rarr;
              </a>
            </p>
          )}
        </section>

        {/* FAQ */}
        <section id="questions-frequentes" className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">Questions fréquentes</h2>
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

        {/* Guides éditoriaux */}
        <GuidesEditoriaux />

        {/* Author + Sources */}
        <AuthorBox />

        {/* Date de mise à jour visible */}
        <p className="text-[12px] text-gris-mention mt-4 mb-8">
          Dernière mise à jour : {new Date(dateModified).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
        </p>

        {/* Liste des départements */}
        <section className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">
            Guides par département
          </h2>
          <p className="text-body text-gris-texte mb-4">
            Sélectionnez votre département pour obtenir un guide personnalisé
            avec le tribunal compétent et les démarches spécifiques.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {departements.map((dept) => (
              <Link
                key={dept.code}
                href={`/guides/${type.slug}/${dept.code}`}
                className="text-[14px] text-bleu-france hover:text-bleu-france-hover hover:underline py-1"
              >
                {dept.code} &mdash; {dept.nom}
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-bleu-fond rounded-card p-8 text-center">
          <h2 className="text-h2 text-gris-titre mb-3">
            Vous avez reçu une {type.label.toLowerCase()} ?
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
