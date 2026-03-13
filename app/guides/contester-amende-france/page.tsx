import type { Metadata } from "next";
import Link from "next/link";
import { getTypes, getMotifs } from "@/lib/data";

export const metadata: Metadata = {
  title:
    "Comment contester une amende en France \u2014 Guide complet 2026",
  description:
    "Guide complet pour contester une amende en France. Delais, motifs recevables, procedure ANTAI etape par etape. Analyse gratuite de votre amende.",
  alternates: {
    canonical: "https://conteste.app/guides/contester-amende-france",
  },
  openGraph: {
    title:
      "Comment contester une amende en France \u2014 Guide complet 2026",
    description:
      "Guide complet pour contester une amende en France. Delais, motifs recevables, procedure ANTAI etape par etape. Analyse gratuite de votre amende.",
    url: "https://conteste.app/guides/contester-amende-france",
    siteName: "Conteste.app",
    locale: "fr_FR",
    type: "article",
  },
};

/* ---------- Structured Data (Schema.org @graph) ---------- */

function StructuredData() {
  const faqItems = [
    {
      q: "Peut-on contester une amende deja payee ?",
      a: "Non. En droit francais, le paiement de l'amende forfaitaire vaut reconnaissance de l'infraction (article 529 du Code de procedure penale). Une fois le paiement effectue, la contestation n'est plus recevable. C'est pourquoi il est essentiel de ne pas payer avant d'avoir decide si vous souhaitez contester.",
    },
    {
      q: "Peut-on contester une amende sans avocat ?",
      a: "Oui, absolument. La contestation d'une amende forfaitaire ne necessite pas d'avocat. La procedure se fait en ligne sur le portail ANTAI ou aupres de la commune concernee. Un avocat peut toutefois etre utile si l'affaire est renvoyee devant le tribunal de police.",
    },
    {
      q: "Que risque-t-on si la contestation echoue ?",
      a: "Si votre contestation est rejetee par l'Officier du Ministere Public, vous serez convoque devant le tribunal de police. Le juge peut confirmer l'amende forfaitaire, la reduire ou vous relaxer. Il ne peut pas augmenter le montant au-dela de l'amende majoree prevue par la loi.",
    },
    {
      q: "Comment prouver qu'un panneau etait masque ?",
      a: "Prenez des photos du panneau dans son etat actuel, montrant la vegetation ou l'obstacle qui le masque. Notez la date, l'heure et le lieu precis. Un constat d'huissier constitue une preuve particulierement solide. Vous pouvez egalement solliciter des temoignages.",
    },
    {
      q: "Quel est le delai de reponse apres une contestation ?",
      a: "L'Officier du Ministere Public dispose d'un delai raisonnable, generalement compris entre 45 jours et 3 mois, pour statuer sur votre contestation. En l'absence de reponse dans les 3 mois, vous pouvez considerer que votre contestation est implicitement acceptee.",
    },
    {
      q: "Faut-il consigner le montant de l'amende pour contester ?",
      a: "Pour les amendes forfaitaires classiques (radar, feu rouge, ceinture, telephone), la consignation n'est pas obligatoire pour contester dans le delai de 45 jours. En revanche, pour contester une amende majoree, la consignation du montant est obligatoire.",
    },
    {
      q: "Peut-on contester un FPS (stationnement) directement sur ANTAI ?",
      a: "Non. Les forfaits post-stationnement (FPS) ne se contestent pas sur ANTAI. Vous devez d'abord effectuer un Recours Administratif Prealable Obligatoire (RAPO) aupres de la commune ou de l'agglomeration qui a emis le FPS, dans un delai d'un mois.",
    },
    {
      q: "Mon vehicule a ete vendu avant l'infraction : que faire ?",
      a: "Si vous avez effectue la declaration de cession sur le site de l'ANTS et que l'infraction est posterieure a la date de cession, vous devez contester en fournissant le certificat de cession et l'accusé de reception de la declaration. Le motif est considere comme fort.",
    },
    {
      q: "Peut-on contester une amende recue a l'etranger ?",
      a: "Les amendes emises par les autorites francaises peuvent etre contestees quelle que soit la nationalite du conducteur. Pour les amendes emises dans un autre pays de l'UE, la procedure depend du pays emetteur. Ce guide concerne uniquement les contraventions françaises.",
    },
    {
      q: "Contester une amende suspend-il le retrait de points ?",
      a: "Oui. Tant que la contestation est en cours, le retrait de points est suspendu. Les points ne seront retires que si le tribunal de police confirme l'infraction. Si la contestation aboutit, aucun point n'est retire.",
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline:
          "Contester une amende en France : le guide complet 2026",
        description:
          "Guide complet pour contester une amende en France. Delais, motifs recevables, procedure ANTAI etape par etape.",
        author: { "@type": "Organization", name: "Conteste.app" },
        publisher: {
          "@type": "Organization",
          name: "Conteste.app",
          url: "https://conteste.app",
        },
        datePublished: "2026-03-13",
        dateModified: "2026-03-13",
        mainEntityOfPage:
          "https://conteste.app/guides/contester-amende-france",
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
      {
        "@type": "HowTo",
        name: "Comment contester une amende en France",
        description:
          "Procedure etape par etape pour contester une amende via le portail ANTAI ou aupres de la commune.",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Verifiez le type d'amende et le delai",
            text: "Identifiez le type de contravention (radar, stationnement, feu rouge, etc.) et verifiez que le delai de contestation n'est pas depasse (45 jours pour les contraventions classiques, 90 jours pour les FPS).",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Identifiez votre motif de contestation",
            text: "Choisissez le motif le plus adapte a votre situation : erreur de plaque, vehicule vendu, panneau masque, signalisation defaillante, etc.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Rassemblez vos pieces justificatives",
            text: "Preparez votre avis de contravention, les preuves photographiques, les attestations de temoins, le certificat de cession ou tout autre document utile.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Accedez au portail de contestation",
            text: "Rendez-vous sur antai.gouv.fr pour les amendes radar, feu rouge, ceinture et telephone. Pour les FPS, contactez la commune concernee.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Remplissez le formulaire de contestation",
            text: "Saisissez votre numero d'avis, selectionnez le motif de contestation, redigez votre argumentaire et joignez vos pieces justificatives.",
          },
          {
            "@type": "HowToStep",
            position: 6,
            name: "Suivez l'avancement de votre dossier",
            text: "Conservez le numero de dossier attribue. La reponse intervient generalement sous 45 jours a 3 mois.",
          },
        ],
      },
      {
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
          {
            "@type": "ListItem",
            position: 3,
            name: "Contester une amende en France",
            item: "https://conteste.app/guides/contester-amende-france",
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ---------- Small reusable components ---------- */

function LawBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-bleu-fond border-l-4 border-bleu-france rounded-card p-lg my-md">
      <p className="text-[13px] font-bold text-bleu-france uppercase tracking-wide mb-xs">
        Article de loi
      </p>
      <p className="text-body text-gris-texte italic leading-relaxed">
        {children}
      </p>
    </div>
  );
}

function CtaBlock({ variant }: { variant: "mid" | "final" }) {
  return (
    <div className="bg-bleu-fond border border-bleu-clair rounded-card p-lg my-2xl text-center">
      {variant === "mid" ? (
        <>
          <p className="text-h3 text-gris-titre mb-sm">
            Vous pensez avoir un motif recevable ?
          </p>
          <p className="text-body text-gris-texte mb-lg">
            Notre outil analyse votre amende gratuitement et vous indique vos
            chances de succes en quelques secondes.
          </p>
        </>
      ) : (
        <>
          <p className="text-h3 text-gris-titre mb-sm">
            Analysez votre amende gratuitement
          </p>
          <p className="text-body text-gris-texte mb-lg">
            Prenez en photo votre avis de contravention. Notre outil identifie
            automatiquement le type d&apos;amende, les motifs de contestation
            applicables et vos chances de succes.
          </p>
        </>
      )}
      <Link
        href="/contest/upload"
        className="inline-flex items-center justify-center min-h-[48px] bg-bleu-france hover:bg-bleu-france-hover text-white text-button px-xl py-[14px] rounded-button transition-colors"
      >
        Analyser mon amende
      </Link>
    </div>
  );
}

function FaqItem({
  question,
  answer,
  open,
}: {
  question: string;
  answer: string;
  open?: boolean;
}) {
  if (open) {
    return (
      <div className="border-b border-gris-bordure pb-lg mb-lg">
        <h3 className="text-h3 text-gris-titre mb-sm">{question}</h3>
        <p className="text-body text-gris-texte">{answer}</p>
      </div>
    );
  }
  return (
    <details className="border-b border-gris-bordure pb-lg mb-lg group">
      <summary className="text-h3 text-gris-titre cursor-pointer list-none flex items-center justify-between">
        {question}
        <span className="text-bleu-france ml-md transition-transform group-open:rotate-180">
          &#9660;
        </span>
      </summary>
      <p className="text-body text-gris-texte mt-sm">{answer}</p>
    </details>
  );
}

/* ---------- Table of contents ---------- */

const TOC_ITEMS = [
  { id: "chiffres-cles", label: "Les chiffres cles des amendes en France" },
  { id: "quelles-amendes", label: "Quelles amendes peut-on contester ?" },
  { id: "delais", label: "Les delais de contestation" },
  { id: "motifs", label: "Les motifs de contestation recevables" },
  { id: "etapes", label: "Comment contester etape par etape" },
  { id: "amende-majoree", label: "Amende majoree : que faire ?" },
  { id: "apres-contestation", label: "Que se passe-t-il apres la contestation ?" },
  { id: "faq", label: "FAQ" },
];

/* ---------- Main Page ---------- */

export default function ContesterAmendeFrancePage() {
  const types = getTypes();
  const motifs = getMotifs();

  return (
    <>
      <StructuredData />

      <article className="max-w-[700px] mx-auto px-lg py-2xl">
        {/* Breadcrumb */}
        <nav
          aria-label="Fil d'Ariane"
          className="text-mention text-gris-mention mb-lg"
        >
          <Link href="/" className="hover:text-bleu-france">
            Accueil
          </Link>
          <span className="mx-xs">/</span>
          <Link href="/guides" className="hover:text-bleu-france">
            Guides
          </Link>
          <span className="mx-xs">/</span>
          <span className="text-gris-titre">Contester une amende en France</span>
        </nav>

        {/* H1 */}
        <h1 className="text-h1-mobile min-[500px]:text-h1-desktop text-gris-titre mb-lg">
          Contester une amende en France : le guide complet 2026
        </h1>

        {/* Chapeau -- reponse directe GEO */}
        <div className="bg-bleu-fond border border-bleu-clair rounded-card p-lg mb-2xl">
          <p className="text-body text-gris-texte leading-relaxed">
            <strong>
              En France, vous disposez de 45 jours a compter de l&apos;envoi de
              l&apos;avis de contravention pour contester une amende.
            </strong>{" "}
            La contestation se fait gratuitement en ligne sur le portail ANTAI (
            <a
              href="https://www.antai.gouv.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-bleu-france underline hover:text-bleu-france-hover"
            >
              antai.gouv.fr
            </a>
            ) ou aupres de l&apos;autorite competente selon le type
            d&apos;infraction. Ce guide vous explique la marche a suivre, les
            delais a respecter, les motifs recevables et la procedure complete
            etape par etape.
          </p>
        </div>

        {/* Table des matieres */}
        <nav className="border border-gris-bordure rounded-card p-lg mb-2xl">
          <p className="text-h3 text-gris-titre mb-md">Sommaire</p>
          <ol className="list-decimal list-inside space-y-sm">
            {TOC_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-body text-bleu-france hover:text-bleu-france-hover underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* ================================================================
            SECTION 1 : Chiffres cles
        ================================================================ */}
        <section id="chiffres-cles" className="mb-3xl scroll-mt-lg">
          <h2 className="text-h2 text-gris-titre mb-lg">
            1. Les chiffres cles des amendes en France
          </h2>
          <p className="text-body text-gris-texte mb-md">
            Selon les donnees du Ministere de l&apos;Interieur et de
            l&apos;Observatoire National Interministeriel de la Securite
            Routiere (ONISR), plus de 12,9 millions de contraventions sont
            emises chaque annee en France. La route reste le premier domaine
            d&apos;infraction, loin devant les contraventions liees au
            stationnement urbain.
          </p>

          <div className="grid grid-cols-2 min-[500px]:grid-cols-4 gap-md mb-lg">
            <div className="bg-bleu-fond rounded-card p-md text-center">
              <p className="text-[24px] font-extrabold text-bleu-france">
                12,9M
              </p>
              <p className="text-mention text-gris-mention">
                contraventions / an
              </p>
            </div>
            <div className="bg-bleu-fond rounded-card p-md text-center">
              <p className="text-[24px] font-extrabold text-bleu-france">
                43 %
              </p>
              <p className="text-mention text-gris-mention">radars</p>
            </div>
            <div className="bg-bleu-fond rounded-card p-md text-center">
              <p className="text-[24px] font-extrabold text-bleu-france">
                31 %
              </p>
              <p className="text-mention text-gris-mention">stationnement</p>
            </div>
            <div className="bg-bleu-fond rounded-card p-md text-center">
              <p className="text-[24px] font-extrabold text-bleu-france">
                ~3 %
              </p>
              <p className="text-mention text-gris-mention">taux de contestation</p>
            </div>
          </div>

          <p className="text-body text-gris-texte mb-md">
            La repartition par type d&apos;infraction se decompose
            approximativement comme suit : les exces de vitesse detectes par
            radar representent 43 % des contraventions, le stationnement
            (forfaits post-stationnement inclus) represente 31 %, les
            infractions aux feux de signalisation environ 12 %, et les autres
            infractions (ceinture, telephone, etc.) se partagent les 14 %
            restants.
          </p>
          <p className="text-body text-gris-texte mb-md">
            Malgre ces volumes considerables, le taux de contestation reste
            faible, estime a environ 3 % des amendes emises. Pourtant, de
            nombreuses contestations sont fondees et aboutissent a une
            annulation. Beaucoup d&apos;automobilistes renoncent par
            meconnaissance de la procedure ou par crainte de perdre du temps.
          </p>
          <p className="text-body text-gris-texte">
            Pour des statistiques detaillees par type et par departement,
            consultez notre{" "}
            <Link
              href="/stats"
              className="text-bleu-france underline hover:text-bleu-france-hover"
            >
              page de statistiques
            </Link>
            .
          </p>
        </section>

        {/* ================================================================
            SECTION 2 : Quelles amendes peut-on contester ?
        ================================================================ */}
        <section id="quelles-amendes" className="mb-3xl scroll-mt-lg">
          <h2 className="text-h2 text-gris-titre mb-lg">
            2. Quelles amendes peut-on contester ?
          </h2>
          <p className="text-body text-gris-texte mb-lg">
            Toutes les contraventions routieres peuvent faire l&apos;objet
            d&apos;une contestation, a condition de respecter les delais et la
            procedure prevus par la loi. Voici un tableau recapitulatif des
            principaux types d&apos;amendes contestables en France.
          </p>

          <div className="overflow-x-auto mb-lg">
            <table className="w-full border-collapse text-body">
              <thead>
                <tr className="bg-bleu-fond">
                  <th className="border border-gris-bordure p-sm text-left text-gris-titre font-bold">
                    Type d&apos;amende
                  </th>
                  <th className="border border-gris-bordure p-sm text-left text-gris-titre font-bold">
                    Montant forfaitaire
                  </th>
                  <th className="border border-gris-bordure p-sm text-left text-gris-titre font-bold">
                    Points retires
                  </th>
                  <th className="border border-gris-bordure p-sm text-left text-gris-titre font-bold">
                    Delai
                  </th>
                  <th className="border border-gris-bordure p-sm text-left text-gris-titre font-bold">
                    Portail
                  </th>
                </tr>
              </thead>
              <tbody>
                {types.map((type, index) => (
                  <tr
                    key={type.slug}
                    className={index % 2 === 1 ? "bg-gris-fond" : ""}
                  >
                    <td className="border border-gris-bordure p-sm">
                      <Link
                        href={`/guides/${type.slug}`}
                        className="text-bleu-france underline hover:text-bleu-france-hover"
                      >
                        {type.label}
                      </Link>
                    </td>
                    <td className="border border-gris-bordure p-sm">
                      {type.montantForfaitaire}&nbsp;&euro;
                    </td>
                    <td className="border border-gris-bordure p-sm">
                      {type.pointsRetrait > 0
                        ? `${type.pointsRetrait} point${type.pointsRetrait > 1 ? "s" : ""}`
                        : "Aucun"}
                    </td>
                    <td className="border border-gris-bordure p-sm">
                      {type.delaiJours} jours
                    </td>
                    <td className="border border-gris-bordure p-sm">
                      {type.portail === "antai" ? (
                        <a
                          href="https://www.antai.gouv.fr"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-bleu-france underline hover:text-bleu-france-hover"
                        >
                          ANTAI
                        </a>
                      ) : (
                        "Commune"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-body text-gris-texte">
            Chaque type d&apos;amende a ses specificites en matiere de
            contestation. Pour un guide detaille sur un type precis, consultez
            nos guides specialises :{" "}
            <Link
              href="/guides/radar"
              className="text-bleu-france underline hover:text-bleu-france-hover"
            >
              amende radar
            </Link>
            ,{" "}
            <Link
              href="/guides/stationnement-fps"
              className="text-bleu-france underline hover:text-bleu-france-hover"
            >
              PV stationnement (FPS)
            </Link>
            ,{" "}
            <Link
              href="/guides/feux-rouges"
              className="text-bleu-france underline hover:text-bleu-france-hover"
            >
              amende feu rouge
            </Link>
            ,{" "}
            <Link
              href="/guides/ceinture"
              className="text-bleu-france underline hover:text-bleu-france-hover"
            >
              amende ceinture
            </Link>
            ,{" "}
            <Link
              href="/guides/telephone"
              className="text-bleu-france underline hover:text-bleu-france-hover"
            >
              amende telephone
            </Link>
            .
          </p>
        </section>

        {/* ================================================================
            SECTION 3 : Les delais de contestation
        ================================================================ */}
        <section id="delais" className="mb-3xl scroll-mt-lg">
          <h2 className="text-h2 text-gris-titre mb-lg">
            3. Les delais de contestation
          </h2>
          <p className="text-body text-gris-texte mb-md">
            Le respect des delais est la premiere condition pour que votre
            contestation soit recevable. Un dossier solide envoye hors delai
            sera systematiquement rejete. Voici les delais a connaitre
            imperativement.
          </p>

          <div className="space-y-md mb-lg">
            <div className="flex items-start gap-md border-l-4 border-bleu-france pl-md py-sm">
              <div>
                <p className="text-h3 text-gris-titre">
                  45 jours &mdash; Contraventions classiques
                </p>
                <p className="text-body text-gris-texte">
                  Exces de vitesse (radar), feu rouge, ceinture de securite,
                  telephone au volant. Le delai court a compter de la date
                  d&apos;envoi de l&apos;avis, pas de sa reception.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-md border-l-4 border-bleu-france pl-md py-sm">
              <div>
                <p className="text-h3 text-gris-titre">
                  30 jours &mdash; Paiement a tarif minore
                </p>
                <p className="text-body text-gris-texte">
                  Si vous souhaitez beneficier du tarif minore (en general 90 &euro;
                  au lieu de 135 &euro; pour les contraventions de 4e classe),
                  vous devez payer dans les 15 jours (30 jours par
                  telepaiement). Attention : le paiement vaut reconnaissance de
                  l&apos;infraction et annule toute possibilite de contestation.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-md border-l-4 border-bleu-france pl-md py-sm">
              <div>
                <p className="text-h3 text-gris-titre">
                  30 jours (RAPO) + 30 jours (CCSP) &mdash; Forfait
                  post-stationnement (FPS)
                </p>
                <p className="text-body text-gris-texte">
                  Pour les FPS, vous disposez d&apos;un mois pour deposer un
                  Recours Administratif Prealable Obligatoire (RAPO) aupres de
                  la commune. En cas de rejet, vous avez un mois supplementaire
                  pour saisir la Commission du Contentieux du Stationnement
                  Payant (CCSP).
                </p>
              </div>
            </div>
          </div>

          <LawBlock>
            L&apos;article 529-2 du Code de procedure penale dispose que
            &laquo;&nbsp;la requete en exoneration ou la reclamation doit etre
            adressee [...] dans un delai de quarante-cinq jours a compter de
            l&apos;envoi de l&apos;avis de contravention&nbsp;&raquo;. Passe ce
            delai, l&apos;amende est majoree et la contestation n&apos;est plus
            recevable sauf dans les cas prevus a l&apos;article 530.
          </LawBlock>

          <div className="bg-orange-fond border-l-4 border-orange-warning rounded-card p-lg my-md">
            <p className="text-h3 text-orange-warning mb-xs">
              Attention : date d&apos;envoi, pas de reception
            </p>
            <p className="text-body text-gris-texte">
              Le delai de 45 jours court a compter de la date d&apos;envoi de
              l&apos;avis de contravention, c&apos;est-a-dire la date figurant
              sur le document, et non la date a laquelle vous le recevez dans
              votre boite aux lettres. En cas de retard postal, vous perdez
              autant de jours utiles pour contester. Il est donc recommande
              d&apos;agir des reception de l&apos;avis.
            </p>
          </div>

          <p className="text-body text-gris-texte">
            Pour un guide complet sur les delais de contestation, consultez
            notre article dedie :{" "}
            <Link
              href="/guides/delai-contestation-amende"
              className="text-bleu-france underline hover:text-bleu-france-hover"
            >
              Delai de contestation d&apos;une amende : tout savoir
            </Link>
            .
          </p>
        </section>

        {/* ================================================================
            SECTION 4 : Les motifs de contestation recevables
        ================================================================ */}
        <section id="motifs" className="mb-3xl scroll-mt-lg">
          <h2 className="text-h2 text-gris-titre mb-lg">
            4. Les motifs de contestation recevables
          </h2>
          <p className="text-body text-gris-texte mb-lg">
            La force de votre contestation depend en grande partie du motif
            invoque. Tous les motifs ne se valent pas : certains entrainent
            quasi systematiquement une annulation, d&apos;autres necessitent
            des preuves solides.
          </p>

          {/* Motifs forts */}
          <h3 className="text-h3 text-gris-titre mb-md flex items-center gap-sm">
            <span className="inline-block bg-vert-fond text-vert-succes text-badge px-md py-xs rounded-pill">
              Fort
            </span>
            Motifs forts &mdash; Taux de succes eleve
          </h3>

          <div className="space-y-md mb-2xl">
            <div className="border border-gris-bordure border-l-4 border-l-vert-succes rounded-card p-lg">
              <p className="text-h3 text-gris-titre mb-xs">
                {motifs["panneau-masque"]?.label}
              </p>
              <p className="text-body text-gris-texte mb-sm">
                Si le panneau de limitation de vitesse, de stationnement interdit
                ou de signalisation etait masque par de la vegetation, un vehicule
                ou tout autre obstacle au moment de l&apos;infraction, la
                contestation est recevable. Vous devez fournir des preuves
                photographiques montrant l&apos;obstruction du panneau.
              </p>
              <p className="text-mention text-gris-mention italic">
                Fondement : article {motifs["panneau-masque"]?.articleCode}
              </p>
            </div>

            <div className="border border-gris-bordure border-l-4 border-l-vert-succes rounded-card p-lg">
              <p className="text-h3 text-gris-titre mb-xs">
                {motifs["erreur-plaque"]?.label}
              </p>
              <p className="text-body text-gris-texte mb-sm">
                Une erreur materielle sur le numero de plaque d&apos;immatriculation
                figurant sur l&apos;avis de contravention constitue un motif
                d&apos;annulation. Cela arrive notamment lorsque le systeme de
                lecture automatique des plaques (LAPI) commet une erreur de
                reconnaissance optique.
              </p>
              <p className="text-mention text-gris-mention italic">
                Fondement : article {motifs["erreur-plaque"]?.articleCode}
              </p>
            </div>

            <div className="border border-gris-bordure border-l-4 border-l-vert-succes rounded-card p-lg">
              <p className="text-h3 text-gris-titre mb-xs">
                {motifs["vehicule-vendu"]?.label}
              </p>
              <p className="text-body text-gris-texte mb-sm">
                Si vous avez vendu votre vehicule et effectue la declaration de
                cession sur le site de l&apos;ANTS avant la date de
                l&apos;infraction, vous n&apos;etes pas responsable de
                l&apos;amende. Fournissez le certificat de cession et l&apos;accuse
                de reception de la declaration.
              </p>
              <p className="text-mention text-gris-mention italic">
                Fondement : article {motifs["vehicule-vendu"]?.articleCode}
              </p>
            </div>

            <div className="border border-gris-bordure border-l-4 border-l-vert-succes rounded-card p-lg">
              <p className="text-h3 text-gris-titre mb-xs">
                {motifs["horodateur-defaillant"]?.label}
              </p>
              <p className="text-body text-gris-texte mb-sm">
                Si l&apos;horodateur le plus proche du lieu de stationnement
                etait en panne au moment des faits, le FPS n&apos;est pas
                justifie. Prenez une photo de l&apos;horodateur affichant un
                message d&apos;erreur ou hors service, avec la date et l&apos;heure
                visibles si possible.
              </p>
              <p className="text-mention text-gris-mention italic">
                Fondement : article {motifs["horodateur-defaillant"]?.articleCode}
              </p>
            </div>

            <div className="border border-gris-bordure border-l-4 border-l-vert-succes rounded-card p-lg">
              <p className="text-h3 text-gris-titre mb-xs">
                {motifs["exemption-medicale"]?.label}
              </p>
              <p className="text-body text-gris-texte mb-sm">
                Si vous disposez d&apos;un certificat medical justifiant
                l&apos;impossibilite de porter la ceinture de securite (par
                exemple en raison d&apos;une grossesse a risque ou d&apos;une
                pathologie specifique), la contravention pour non-port de la
                ceinture peut etre annulee.
              </p>
              <p className="text-mention text-gris-mention italic">
                Fondement : article {motifs["exemption-medicale"]?.articleCode}
              </p>
            </div>

            <div className="border border-gris-bordure border-l-4 border-l-vert-succes rounded-card p-lg">
              <p className="text-h3 text-gris-titre mb-xs">
                {motifs["feu-defaillant"]?.label}
              </p>
              <p className="text-body text-gris-texte mb-sm">
                Si le feu tricolore etait en panne, clignotant de maniere
                anormale ou eteint au moment de l&apos;infraction, le
                franchissement ne constitue pas une infraction. Une attestation
                de la mairie ou de la societe gestionnaire des feux peut
                renforcer votre dossier.
              </p>
              <p className="text-mention text-gris-mention italic">
                Fondement : article {motifs["feu-defaillant"]?.articleCode}
              </p>
            </div>

            <div className="border border-gris-bordure border-l-4 border-l-vert-succes rounded-card p-lg">
              <p className="text-h3 text-gris-titre mb-xs">
                {motifs["signalisation-manquante"]?.label}
              </p>
              <p className="text-body text-gris-texte mb-sm">
                L&apos;absence de panneau indiquant les regles de stationnement
                payant ou les restrictions horaires rend le FPS contestable. La
                signalisation doit etre presente, lisible et conforme a la
                reglementation en vigueur.
              </p>
              <p className="text-mention text-gris-mention italic">
                Fondement : article {motifs["signalisation-manquante"]?.articleCode}
              </p>
            </div>

            <div className="border border-gris-bordure border-l-4 border-l-vert-succes rounded-card p-lg">
              <p className="text-h3 text-gris-titre mb-xs">
                {motifs["marquage-absent"]?.label}
              </p>
              <p className="text-body text-gris-texte mb-sm">
                L&apos;absence de marquage au sol delimitant la zone de
                stationnement payant peut constituer un motif fort de
                contestation. La zone de stationnement reglementee doit etre
                clairement materialisee au sol conformement au Code de la route.
              </p>
              <p className="text-mention text-gris-mention italic">
                Fondement : article {motifs["marquage-absent"]?.articleCode}
              </p>
            </div>
          </div>

          {/* Motifs moyens */}
          <h3 className="text-h3 text-gris-titre mb-md flex items-center gap-sm">
            <span className="inline-block bg-score-moyen-fond text-score-moyen-texte text-badge px-md py-xs rounded-pill">
              Moyen
            </span>
            Motifs moyens &mdash; Necessitent des preuves solides
          </h3>

          <div className="space-y-md mb-2xl">
            <div className="border border-gris-bordure border-l-4 border-l-score-moyen-texte rounded-card p-lg">
              <p className="text-h3 text-gris-titre mb-xs">
                {motifs["signalisation-ambigue"]?.label}
              </p>
              <p className="text-body text-gris-texte mb-sm">
                Une signalisation contradictoire ou confuse (par exemple un
                panneau d&apos;interdiction de stationner contredit par un
                marquage au sol autorisant le stationnement) peut constituer un
                motif de contestation. La preuve repose sur des photos montrant
                la contradiction.
              </p>
              <p className="text-mention text-gris-mention italic">
                Fondement : article {motifs["signalisation-ambigue"]?.articleCode}
              </p>
            </div>

            <div className="border border-gris-bordure border-l-4 border-l-score-moyen-texte rounded-card p-lg">
              <p className="text-h3 text-gris-titre mb-xs">
                {motifs["marge-technique"]?.label}
              </p>
              <p className="text-body text-gris-texte mb-sm">
                L&apos;arrete du 4 juin 2009 fixe les marges techniques
                applicables aux appareils de controle de vitesse. Si la vitesse
                retenue apres application de la marge est tres proche du seuil
                (par exemple 51 km/h retenu pour une limitation a 50 km/h), la
                contestation peut etre envisagee, bien qu&apos;elle soit plus
                difficile a faire aboutir.
              </p>
              <p className="text-mention text-gris-mention italic">
                Fondement : {motifs["marge-technique"]?.articleCode}
              </p>
            </div>

            <div className="border border-gris-bordure border-l-4 border-l-score-moyen-texte rounded-card p-lg">
              <p className="text-h3 text-gris-titre mb-xs">
                {motifs["erreur-identification"]?.label}
              </p>
              <p className="text-body text-gris-texte mb-sm">
                Si vous n&apos;etiez pas le conducteur au moment de
                l&apos;infraction (vehicule prete a un tiers, vehicule de
                societe), vous pouvez contester en designant le veritable
                conducteur ou en demontrant que vous n&apos;etiez pas au volant.
                L&apos;article L121-3 du Code de la route precise les conditions
                de cette exoneration.
              </p>
              <p className="text-mention text-gris-mention italic">
                Fondement : article {motifs["erreur-identification"]?.articleCode}
              </p>
            </div>

            <div className="border border-gris-bordure border-l-4 border-l-score-moyen-texte rounded-card p-lg">
              <p className="text-h3 text-gris-titre mb-xs">
                {motifs["kit-mains-libres"]?.label}
              </p>
              <p className="text-body text-gris-texte mb-sm">
                Depuis le 1er juillet 2015, l&apos;utilisation d&apos;un
                dispositif de type oreillette ou kit mains-libres est interdite.
                Toutefois, si vous utilisiez un systeme integre au vehicule (type
                Bluetooth embarque) et que l&apos;agent a commis une erreur
                d&apos;appreciation, la contestation reste possible mais
                necessite des elements de preuve.
              </p>
              <p className="text-mention text-gris-mention italic">
                Fondement : article {motifs["kit-mains-libres"]?.articleCode}
              </p>
            </div>
          </div>

          {/* Motifs faibles */}
          <h3 className="text-h3 text-gris-titre mb-md flex items-center gap-sm">
            <span className="inline-block bg-orange-fond text-orange-warning text-badge px-md py-xs rounded-pill">
              Faible
            </span>
            Motifs faibles &mdash; Rarement acceptes
          </h3>

          <div className="space-y-md mb-lg">
            <div className="border border-gris-bordure border-l-4 border-l-orange-warning rounded-card p-lg">
              <p className="text-h3 text-gris-titre mb-xs">
                Meconnaissance de la reglementation
              </p>
              <p className="text-body text-gris-texte mb-sm">
                L&apos;ignorance de la loi n&apos;est pas un motif recevable de
                contestation en droit francais. Le fait de ne pas avoir vu le
                panneau ou de ne pas connaitre la reglementation locale ne
                constitue pas un motif d&apos;exoneration. Le principe
                &laquo;&nbsp;nul n&apos;est cense ignorer la loi&nbsp;&raquo;
                s&apos;applique pleinement.
              </p>
            </div>

            <div className="border border-gris-bordure border-l-4 border-l-orange-warning rounded-card p-lg">
              <p className="text-h3 text-gris-titre mb-xs">
                Circonstances attenuantes personnelles
              </p>
              <p className="text-body text-gris-texte mb-sm">
                Les arguments de type &laquo;&nbsp;j&apos;etais presse&nbsp;&raquo;,
                &laquo;&nbsp;je transportais un malade&nbsp;&raquo; (sauf
                situation d&apos;urgence vitale averee) ou &laquo;&nbsp;je ne
                fais jamais d&apos;exces de vitesse d&apos;habitude&nbsp;&raquo;
                ne sont pas consideres comme des motifs juridiquement
                recevables par l&apos;OMP ou le tribunal de police.
              </p>
            </div>

            <div className="border border-gris-bordure border-l-4 border-l-orange-warning rounded-card p-lg">
              <p className="text-h3 text-gris-titre mb-xs">
                Contestation du montant uniquement
              </p>
              <p className="text-body text-gris-texte mb-sm">
                Contester une amende au seul motif que son montant serait
                &laquo;&nbsp;disproportionne&nbsp;&raquo; n&apos;est pas un
                argument recevable. Les montants forfaitaires sont fixes par le
                Code penal et ne relevent pas de l&apos;appreciation de
                l&apos;autorite de contestation.
              </p>
            </div>
          </div>
        </section>

        {/* CTA intermediaire apres section 4 */}
        <CtaBlock variant="mid" />

        {/* ================================================================
            SECTION 5 : Comment contester etape par etape
        ================================================================ */}
        <section id="etapes" className="mb-3xl scroll-mt-lg">
          <h2 className="text-h2 text-gris-titre mb-lg">
            5. Comment contester etape par etape
          </h2>
          <p className="text-body text-gris-texte mb-lg">
            La procedure de contestation varie selon le type d&apos;amende. Voici
            les demarches detaillees pour chaque cas.
          </p>

          {/* 5a. ANTAI */}
          <h3 className="text-h3 text-gris-titre mb-md" id="etape-antai">
            5a. Sur le portail ANTAI (amendes radar, feux, ceinture, telephone)
          </h3>
          <p className="text-body text-gris-texte mb-md">
            Le portail ANTAI (Agence Nationale de Traitement Automatise des
            Infractions) est le guichet unique pour contester les amendes
            forfaitaires liees aux infractions routieres detectees par des
            systemes automatiques ou constatees par les forces de l&apos;ordre.
          </p>
          <p className="text-body text-gris-texte mb-md">
            <strong>Avant de commencer, preparez :</strong>
          </p>
          <ul className="list-disc list-inside text-body text-gris-texte mb-lg space-y-xs pl-md">
            <li>Votre avis de contravention (original ou numerique)</li>
            <li>Le numero d&apos;avis (en haut a droite du document)</li>
            <li>Vos pieces justificatives numerisees (photos, attestations, certificat de cession...)</li>
            <li>Votre argumentaire redige</li>
          </ul>

          <div className="space-y-md mb-2xl">
            <div className="flex gap-md">
              <div className="flex-shrink-0 w-[36px] h-[36px] bg-bleu-france rounded-full flex items-center justify-center text-white font-bold text-[14px]">
                1
              </div>
              <div>
                <p className="text-h3 text-gris-titre">
                  Accedez au site de l&apos;ANTAI
                </p>
                <p className="text-body text-gris-texte">
                  Rendez-vous sur{" "}
                  <a
                    href="https://www.antai.gouv.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-bleu-france underline hover:text-bleu-france-hover"
                  >
                    www.antai.gouv.fr
                  </a>{" "}
                  et cliquez sur le bouton
                  &laquo;&nbsp;Designer / Contester&nbsp;&raquo;.
                </p>
              </div>
            </div>

            <div className="flex gap-md">
              <div className="flex-shrink-0 w-[36px] h-[36px] bg-bleu-france rounded-full flex items-center justify-center text-white font-bold text-[14px]">
                2
              </div>
              <div>
                <p className="text-h3 text-gris-titre">
                  Saisissez votre numero d&apos;avis
                </p>
                <p className="text-body text-gris-texte">
                  Entrez le numero de l&apos;avis de contravention figurant en
                  haut a droite de votre amende, ainsi que votre date de
                  naissance pour verification.
                </p>
              </div>
            </div>

            <div className="flex gap-md">
              <div className="flex-shrink-0 w-[36px] h-[36px] bg-bleu-france rounded-full flex items-center justify-center text-white font-bold text-[14px]">
                3
              </div>
              <div>
                <p className="text-h3 text-gris-titre">
                  Choisissez &laquo;&nbsp;Je conteste&nbsp;&raquo;
                </p>
                <p className="text-body text-gris-texte">
                  Selectionnez l&apos;option de contestation (et non de
                  designation d&apos;un autre conducteur, sauf si c&apos;est
                  votre cas). Cochez le motif de contestation le plus adapte a
                  votre situation.
                </p>
              </div>
            </div>

            <div className="flex gap-md">
              <div className="flex-shrink-0 w-[36px] h-[36px] bg-bleu-france rounded-full flex items-center justify-center text-white font-bold text-[14px]">
                4
              </div>
              <div>
                <p className="text-h3 text-gris-titre">
                  Redigez votre argumentaire
                </p>
                <p className="text-body text-gris-texte">
                  Exposez clairement et factuellement les raisons de votre
                  contestation. Citez les articles de loi pertinents. Restez
                  courtois et precis. Evitez les formulations emotionnelles.
                </p>
              </div>
            </div>

            <div className="flex gap-md">
              <div className="flex-shrink-0 w-[36px] h-[36px] bg-bleu-france rounded-full flex items-center justify-center text-white font-bold text-[14px]">
                5
              </div>
              <div>
                <p className="text-h3 text-gris-titre">
                  Joignez vos pieces justificatives
                </p>
                <p className="text-body text-gris-texte">
                  Telechargez toute preuve utile : photos, temoignages ecrits,
                  certificat de cession, documents medicaux, captures d&apos;ecran.
                  Les formats acceptes sont generalement PDF, JPG et PNG.
                </p>
              </div>
            </div>

            <div className="flex gap-md">
              <div className="flex-shrink-0 w-[36px] h-[36px] bg-bleu-france rounded-full flex items-center justify-center text-white font-bold text-[14px]">
                6
              </div>
              <div>
                <p className="text-h3 text-gris-titre">
                  Validez et conservez votre numero de dossier
                </p>
                <p className="text-body text-gris-texte">
                  Apres validation, un numero de dossier vous est attribue.
                  Conservez-le precieusement : il vous permettra de suivre
                  l&apos;avancement de votre contestation en ligne.
                </p>
              </div>
            </div>
          </div>

          <p className="text-body text-gris-texte mb-2xl">
            Pour un guide detaille sur la procedure ANTAI, consultez notre
            article :{" "}
            <Link
              href="/guides/antai-comment-contester"
              className="text-bleu-france underline hover:text-bleu-france-hover"
            >
              ANTAI : comment contester en ligne
            </Link>
            .
          </p>

          {/* 5b. Commune (FPS) */}
          <h3 className="text-h3 text-gris-titre mb-md" id="etape-commune">
            5b. Aupres de la commune (FPS stationnement)
          </h3>
          <p className="text-body text-gris-texte mb-md">
            Les forfaits post-stationnement (FPS) ne se contestent pas sur
            le portail ANTAI. La procedure est differente et passe par un
            Recours Administratif Prealable Obligatoire (RAPO).
          </p>

          <div className="space-y-md mb-2xl">
            <div className="flex gap-md">
              <div className="flex-shrink-0 w-[36px] h-[36px] bg-bleu-france rounded-full flex items-center justify-center text-white font-bold text-[14px]">
                1
              </div>
              <div>
                <p className="text-h3 text-gris-titre">
                  Identifiez la commune emettrice
                </p>
                <p className="text-body text-gris-texte">
                  Verifiez sur votre avis de paiement FPS quelle commune ou
                  agglomeration a emis le forfait. Les coordonnees du service
                  de contestation figurent sur le document.
                </p>
              </div>
            </div>

            <div className="flex gap-md">
              <div className="flex-shrink-0 w-[36px] h-[36px] bg-bleu-france rounded-full flex items-center justify-center text-white font-bold text-[14px]">
                2
              </div>
              <div>
                <p className="text-h3 text-gris-titre">
                  Deposez un RAPO dans le delai d&apos;un mois
                </p>
                <p className="text-body text-gris-texte">
                  Adressez votre Recours Administratif Prealable Obligatoire a
                  la commune par voie electronique (portail en ligne de la
                  commune) ou par lettre recommandee avec accuse de reception.
                </p>
              </div>
            </div>

            <div className="flex gap-md">
              <div className="flex-shrink-0 w-[36px] h-[36px] bg-bleu-france rounded-full flex items-center justify-center text-white font-bold text-[14px]">
                3
              </div>
              <div>
                <p className="text-h3 text-gris-titre">
                  En cas de rejet, saisissez la CCSP
                </p>
                <p className="text-body text-gris-texte">
                  Si votre RAPO est rejete ou reste sans reponse pendant un mois,
                  vous pouvez saisir la Commission du Contentieux du
                  Stationnement Payant (CCSP) dans un delai d&apos;un mois a
                  compter de la notification du rejet.
                </p>
              </div>
            </div>
          </div>

          {/* 5c. Transports */}
          <h3 className="text-h3 text-gris-titre mb-md" id="etape-transport">
            5c. Aupres du transporteur (SNCF, RATP)
          </h3>
          <p className="text-body text-gris-texte mb-md">
            Les amendes liees aux transports en commun (absence de titre de
            transport, titre non valide) ne sont pas des contraventions
            routieres et ne relevent pas de l&apos;ANTAI. La contestation
            s&apos;effectue directement aupres du transporteur.
          </p>
          <ul className="list-disc list-inside text-body text-gris-texte mb-md space-y-xs pl-md">
            <li>
              <strong>SNCF :</strong> contestation en ligne sur le site du
              Service de Recouvrement des PV SNCF ou par courrier recommande
              dans les 2 mois suivant l&apos;infraction.
            </li>
            <li>
              <strong>RATP :</strong> contestation aupres du Centre de
              Recouvrement de la RATP par courrier recommande dans les 2 mois.
            </li>
            <li>
              <strong>Autres reseaux :</strong> contactez le service client du
              reseau de transport concerne. Les coordonnees figurent sur
              l&apos;avis d&apos;infraction.
            </li>
          </ul>
        </section>

        {/* ================================================================
            SECTION 6 : Amende majoree
        ================================================================ */}
        <section id="amende-majoree" className="mb-3xl scroll-mt-lg">
          <h2 className="text-h2 text-gris-titre mb-lg">
            6. Amende majoree : que faire ?
          </h2>
          <p className="text-body text-gris-texte mb-md">
            Si vous n&apos;avez ni paye ni conteste votre amende dans le delai
            imparti, celle-ci est automatiquement majoree. Le montant de la
            majoration est fixe par la loi : il est generalement de 375 &euro;
            pour les contraventions de 4e classe (au lieu de 135 &euro;). La
            majoration est significative, mais il est encore possible d&apos;agir.
          </p>

          <LawBlock>
            L&apos;article 530 du Code de procedure penale prevoit que le
            contrevenant dispose d&apos;un delai de 30 jours a compter de
            l&apos;envoi de l&apos;avis d&apos;amende majoree pour former une
            reclamation aupres du Ministere public. Cette reclamation doit etre
            accompagnee de l&apos;avis de majoration et, dans certains cas, de
            la consignation du montant de l&apos;amende.
          </LawBlock>

          <h3 className="text-h3 text-gris-titre mb-md mt-lg">
            L&apos;obligation de consigner
          </h3>
          <p className="text-body text-gris-texte mb-md">
            Contrairement a la contestation dans le delai initial de 45 jours
            (ou la consignation n&apos;est pas toujours exigee), la contestation
            d&apos;une amende majoree requiert generalement la consignation du
            montant de l&apos;amende forfaitaire initiale. Cette consignation
            n&apos;est pas un paiement : elle vous sera restituee si la
            contestation aboutit.
          </p>

          <div className="bg-orange-fond border-l-4 border-orange-warning rounded-card p-lg my-md">
            <p className="text-h3 text-orange-warning mb-xs">
              Consigner n&apos;est pas payer
            </p>
            <p className="text-body text-gris-texte">
              La consignation est un depot de garantie aupres du Tresor public.
              Elle est differente du paiement de l&apos;amende, qui vaut
              reconnaissance de l&apos;infraction. Si votre contestation
              aboutit, le montant consigne vous est integralement restitue.
            </p>
          </div>

          <h3 className="text-h3 text-gris-titre mb-md mt-lg">
            Demander un delai supplementaire
          </h3>
          <p className="text-body text-gris-texte mb-md">
            Si vous n&apos;avez pas recu l&apos;avis initial d&apos;amende
            (par exemple en raison d&apos;un demenagement), vous pouvez invoquer
            ce motif dans votre reclamation contre l&apos;amende majoree.
            Joignez tout element prouvant votre changement d&apos;adresse
            (attestation de redirection du courrier, justificatif de domicile
            a la nouvelle adresse).
          </p>
          <p className="text-body text-gris-texte">
            Il est egalement possible d&apos;adresser une demande gracieuse au
            comptable du Tresor public pour obtenir un echelonnement du paiement
            ou une remise gracieuse, notamment si votre situation financiere
            est difficile.
          </p>
        </section>

        {/* CTA intermediaire apres section 6 (apres section 7 dans la spec, mais avant is fine) */}

        {/* ================================================================
            SECTION 7 : Apres la contestation
        ================================================================ */}
        <section id="apres-contestation" className="mb-3xl scroll-mt-lg">
          <h2 className="text-h2 text-gris-titre mb-lg">
            7. Que se passe-t-il apres la contestation ?
          </h2>
          <p className="text-body text-gris-texte mb-md">
            Une fois votre contestation deposee, votre dossier est examine par
            l&apos;Officier du Ministere Public (OMP). Voici les differentes
            issues possibles et les delais a prevoir.
          </p>

          <h3 className="text-h3 text-gris-titre mb-md">
            Delai de reponse
          </h3>
          <p className="text-body text-gris-texte mb-lg">
            L&apos;OMP dispose d&apos;un delai raisonnable pour statuer,
            generalement compris entre 45 jours et 3 mois. Ce delai peut etre
            plus long en periode de forte affluence. En l&apos;absence de
            reponse dans les 3 mois, votre contestation est consideree comme
            implicitement acceptee.
          </p>

          <h3 className="text-h3 text-gris-titre mb-md">
            Les issues possibles
          </h3>

          <div className="space-y-md mb-lg">
            <div className="border border-gris-bordure rounded-card p-lg border-l-4 border-l-vert-succes">
              <p className="text-h3 text-vert-succes mb-xs">
                Classement sans suite (annulation)
              </p>
              <p className="text-body text-gris-texte">
                L&apos;OMP estime que votre contestation est fondee. L&apos;amende
                est annulee, aucun point n&apos;est retire et si vous avez
                consigne, le montant vous est restitue. Vous recevez un courrier
                de notification.
              </p>
            </div>

            <div className="border border-gris-bordure rounded-card p-lg border-l-4 border-l-score-moyen-texte">
              <p className="text-h3 text-score-moyen-texte mb-xs">
                Renvoi devant le tribunal de police
              </p>
              <p className="text-body text-gris-texte">
                L&apos;OMP estime que la contestation ne peut pas etre tranchee
                en l&apos;etat. Vous etes convoque devant le tribunal de police
                qui statuera. Vous pouvez vous y presenter seul ou assiste
                d&apos;un avocat. Le juge peut relaxer, confirmer ou adapter
                l&apos;amende.
              </p>
            </div>

            <div className="border border-gris-bordure rounded-card p-lg border-l-4 border-l-orange-warning">
              <p className="text-h3 text-orange-warning mb-xs">
                Rejet de la contestation
              </p>
              <p className="text-body text-gris-texte">
                Si l&apos;OMP rejette votre contestation, il vous adresse une
                ordonnance penale. Vous disposez alors de 30 jours pour former
                opposition a cette ordonnance et demander a etre juge par le
                tribunal de police.
              </p>
            </div>
          </div>

          <h3 className="text-h3 text-gris-titre mb-md">
            Remboursement en cas d&apos;annulation
          </h3>
          <p className="text-body text-gris-texte">
            Si votre contestation aboutit a une annulation de l&apos;amende, le
            montant consigne ou paye par erreur avant contestation vous est
            restitue par le Tresor public. Le delai de remboursement varie
            generalement de 1 a 3 mois apres la decision definitive. Aucun
            point n&apos;est retire du permis de conduire en cas d&apos;annulation.
          </p>
        </section>

        {/* CTA intermediaire apres section 7 */}
        <CtaBlock variant="mid" />

        {/* ================================================================
            SECTION 8 : FAQ
        ================================================================ */}
        <section id="faq" className="mb-3xl scroll-mt-lg">
          <h2 className="text-h2 text-gris-titre mb-lg">
            8. FAQ &mdash; Questions les plus frequentes
          </h2>

          {/* 5 premieres en clair */}
          <FaqItem
            question="Peut-on contester une amende deja payee ?"
            answer="Non. En droit francais, le paiement de l'amende forfaitaire vaut reconnaissance de l'infraction (article 529 du Code de procedure penale). Une fois le paiement effectue, la contestation n'est plus recevable. C'est pourquoi il est essentiel de ne pas payer avant d'avoir decide si vous souhaitez contester."
            open
          />
          <FaqItem
            question="Peut-on contester une amende sans avocat ?"
            answer="Oui, absolument. La contestation d'une amende forfaitaire ne necessite pas d'avocat. La procedure se fait en ligne sur le portail ANTAI ou aupres de la commune concernee. Un avocat peut toutefois etre utile si l'affaire est renvoyee devant le tribunal de police."
            open
          />
          <FaqItem
            question="Que risque-t-on si la contestation echoue ?"
            answer="Si votre contestation est rejetee par l'Officier du Ministere Public, vous serez convoque devant le tribunal de police. Le juge peut confirmer l'amende forfaitaire, la reduire ou vous relaxer. Il ne peut pas augmenter le montant au-dela de l'amende majoree prevue par la loi."
            open
          />
          <FaqItem
            question="Comment prouver qu'un panneau etait masque ?"
            answer="Prenez des photos du panneau dans son etat actuel, montrant la vegetation ou l'obstacle qui le masque. Notez la date, l'heure et le lieu precis. Un constat d'huissier constitue une preuve particulierement solide. Vous pouvez egalement solliciter des temoignages."
            open
          />
          <FaqItem
            question="Quel est le delai de reponse apres une contestation ?"
            answer="L'Officier du Ministere Public dispose d'un delai raisonnable, generalement compris entre 45 jours et 3 mois, pour statuer sur votre contestation. En l'absence de reponse dans les 3 mois, vous pouvez considerer que votre contestation est implicitement acceptee."
            open
          />

          {/* 5 suivantes en accordeon */}
          <FaqItem
            question="Faut-il consigner le montant de l'amende pour contester ?"
            answer="Pour les amendes forfaitaires classiques (radar, feu rouge, ceinture, telephone), la consignation n'est pas obligatoire pour contester dans le delai de 45 jours. En revanche, pour contester une amende majoree, la consignation du montant est obligatoire."
          />
          <FaqItem
            question="Peut-on contester un FPS (stationnement) directement sur ANTAI ?"
            answer="Non. Les forfaits post-stationnement (FPS) ne se contestent pas sur ANTAI. Vous devez d'abord effectuer un Recours Administratif Prealable Obligatoire (RAPO) aupres de la commune ou de l'agglomeration qui a emis le FPS, dans un delai d'un mois."
          />
          <FaqItem
            question="Mon vehicule a ete vendu avant l'infraction : que faire ?"
            answer="Si vous avez effectue la declaration de cession sur le site de l'ANTS et que l'infraction est posterieure a la date de cession, vous devez contester en fournissant le certificat de cession et l'accuse de reception de la declaration. Le motif est considere comme fort."
          />
          <FaqItem
            question="Peut-on contester une amende recue a l'etranger ?"
            answer="Les amendes emises par les autorites francaises peuvent etre contestees quelle que soit la nationalite du conducteur. Pour les amendes emises dans un autre pays de l'UE, la procedure depend du pays emetteur. Ce guide concerne uniquement les contraventions francaises."
          />
          <FaqItem
            question="Contester une amende suspend-il le retrait de points ?"
            answer="Oui. Tant que la contestation est en cours, le retrait de points est suspendu. Les points ne seront retires que si le tribunal de police confirme l'infraction. Si la contestation aboutit, aucun point n'est retire."
          />
        </section>

        {/* CTA final */}
        <CtaBlock variant="final" />

        {/* Derniere mise a jour */}
        <p className="text-mention text-gris-mention text-center mt-2xl">
          Derniere mise a jour : mars 2026. Les informations de ce guide sont
          fournies a titre informatif et ne constituent pas un avis juridique.
        </p>
      </article>
    </>
  );
}
