import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Délai de contestation d'amende en France — Guide 2026 | Conteste.app",
  description:
    "Quel délai pour contester une amende en France ? 45 jours pour un PV classique, 30 jours pour un FPS. Délai majoré, exceptions et conseils pratiques.",
  openGraph: {
    title: "Délai de contestation d'amende — Guide 2026 | Conteste.app",
    description:
      "45 jours pour un PV classique, 30 jours pour un FPS. Tout savoir sur les délais de contestation.",
    url: "https://conteste.app/guides/delai-contestation-amende",
    siteName: "Conteste.app",
    locale: "fr_FR",
    type: "article",
  },
  alternates: {
    canonical: "https://conteste.app/guides/delai-contestation-amende",
  },
};

const faq = [
  {
    question: "Quel est le délai pour contester une amende ?",
    answer:
      "Le délai légal est de 45 jours à compter de la date d'envoi de l'avis de contravention pour les amendes forfaitaires classiques (radar, feu rouge, ceinture, téléphone). Pour un forfait post-stationnement (FPS), le délai est de 30 jours pour le RAPO.",
  },
  {
    question: "Le délai court-il à partir de la réception du courrier ?",
    answer:
      "Non, le délai court à partir de la date d'envoi de l'avis de contravention, et non de sa réception. Cette date figure sur l'avis. En pratique, vous disposez donc de quelques jours de moins que les 45 jours théoriques.",
  },
  {
    question: "Peut-on contester une amende majorée ?",
    answer:
      "Oui, mais la contestation d'une amende majorée est plus complexe. Vous devez d'abord consigner le montant majoré avant de pouvoir contester. Le délai de contestation est de 30 jours à compter de l'envoi de l'avis de majoration.",
  },
  {
    question: "Que se passe-t-il si le délai est dépassé ?",
    answer:
      "Si le délai de 45 jours est dépassé, l'amende est automatiquement majorée. Vous pouvez encore contester l'amende majorée dans un délai de 30 jours, mais vous devrez consigner le montant majoré.",
  },
  {
    question: "Le délai est-il le même dans tous les départements ?",
    answer:
      "Oui, les délais de contestation sont fixés par la loi et sont identiques sur tout le territoire français métropolitain et en outre-mer.",
  },
];

export default function DelaiContestationPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Délai de contestation d'amende en France — Guide complet 2026",
      description:
        "Tous les délais de contestation d'amende en France : 45 jours pour un PV classique, 30 jours pour un FPS.",
      url: "https://conteste.app/guides/delai-contestation-amende",
      datePublished: "2026-02-05",
      dateModified: new Date().toISOString().split("T")[0],
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
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: "https://conteste.app" },
        { "@type": "ListItem", position: 2, name: "Guides", item: "https://conteste.app/guides" },
        { "@type": "ListItem", position: 3, name: "Délai de contestation", item: "https://conteste.app/guides/delai-contestation-amende" },
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
        <nav aria-label="Fil d'Ariane" className="text-[14px] text-gris-mention mb-6">
          <Link href="/" className="hover:text-bleu-france">Accueil</Link>
          <span className="mx-2">&gt;</span>
          <Link href="/guides" className="hover:text-bleu-france">Guides</Link>
          <span className="mx-2">&gt;</span>
          <span className="text-gris-titre font-medium">Délai de contestation d&apos;amende</span>
        </nav>

        <h1 className="text-h1-mobile md:text-h1-desktop text-gris-titre mb-4">
          Délai de contestation d&apos;amende en France : guide complet 2026
        </h1>

        <div className="bg-bleu-fond rounded-card p-6 mb-8">
          <p className="text-body text-gris-texte">
            Le respect du délai de contestation est la première condition pour que votre
            requête soit recevable. <strong>45 jours pour une amende classique,
            30 jours pour un FPS.</strong> Voici tout ce que vous devez savoir.
          </p>
        </div>

        {/* Tableau récapitulatif */}
        <section className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">Récapitulatif des délais</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gris-bordure rounded-card text-body">
              <thead>
                <tr className="bg-gris-fond">
                  <th className="text-left p-4 text-gris-titre font-bold border-b border-gris-bordure">Type d&apos;amende</th>
                  <th className="text-left p-4 text-gris-titre font-bold border-b border-gris-bordure">Délai</th>
                  <th className="text-left p-4 text-gris-titre font-bold border-b border-gris-bordure">Point de départ</th>
                  <th className="text-left p-4 text-gris-titre font-bold border-b border-gris-bordure">Portail</th>
                </tr>
              </thead>
              <tbody className="text-gris-texte">
                <tr className="border-b border-gris-bordure">
                  <td className="p-4">Amende radar</td>
                  <td className="p-4 font-bold">45 jours</td>
                  <td className="p-4">Date d&apos;envoi de l&apos;avis</td>
                  <td className="p-4">ANTAI</td>
                </tr>
                <tr className="border-b border-gris-bordure">
                  <td className="p-4">Amende feu rouge</td>
                  <td className="p-4 font-bold">45 jours</td>
                  <td className="p-4">Date d&apos;envoi de l&apos;avis</td>
                  <td className="p-4">ANTAI</td>
                </tr>
                <tr className="border-b border-gris-bordure">
                  <td className="p-4">Amende ceinture</td>
                  <td className="p-4 font-bold">45 jours</td>
                  <td className="p-4">Date d&apos;envoi de l&apos;avis</td>
                  <td className="p-4">ANTAI</td>
                </tr>
                <tr className="border-b border-gris-bordure">
                  <td className="p-4">Amende téléphone</td>
                  <td className="p-4 font-bold">45 jours</td>
                  <td className="p-4">Date d&apos;envoi de l&apos;avis</td>
                  <td className="p-4">ANTAI</td>
                </tr>
                <tr className="border-b border-gris-bordure">
                  <td className="p-4">FPS (stationnement)</td>
                  <td className="p-4 font-bold">30 jours (RAPO)</td>
                  <td className="p-4">Date d&apos;envoi de l&apos;avis</td>
                  <td className="p-4">Commune</td>
                </tr>
                <tr>
                  <td className="p-4">Amende majorée</td>
                  <td className="p-4 font-bold">30 jours</td>
                  <td className="p-4">Date d&apos;envoi de la majoration</td>
                  <td className="p-4">ANTAI</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Détail 45 jours */}
        <section className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">Le délai de 45 jours expliqué</h2>
          <div className="space-y-3 text-body text-gris-texte">
            <p>
              Pour les amendes forfaitaires classiques (excès de vitesse, feu rouge,
              ceinture, téléphone au volant), le délai de contestation est de
              <strong> 45 jours</strong> à compter de la date d&apos;envoi de l&apos;avis de
              contravention.
            </p>
            <p>
              <strong>Attention :</strong> la date de départ est la date d&apos;envoi
              figurant sur l&apos;avis, pas la date à laquelle vous le recevez dans votre
              boîte aux lettres. Comptez 2 à 5 jours d&apos;acheminement postal,
              ce qui réduit d&apos;autant votre délai effectif.
            </p>
            <p>
              Si vous contestez par voie électronique sur ANTAI, c&apos;est la date de soumission
              en ligne qui fait foi. Par courrier recommandé, c&apos;est la date d&apos;envoi
              (cachet de la Poste faisant foi).
            </p>
          </div>
        </section>

        {/* Que se passe-t-il après le délai */}
        <section className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">Que se passe-t-il si le délai est dépassé ?</h2>
          <div className="space-y-3 text-body text-gris-texte">
            <p>
              Si vous ne contestez pas et ne payez pas dans les 45 jours, l&apos;amende est
              automatiquement <strong>majorée</strong>. Le montant majoré est généralement
              de 375&nbsp;&euro; pour une amende de 4ème classe (radar, feu rouge, ceinture, téléphone).
            </p>
            <p>
              Vous pouvez encore contester l&apos;amende majorée, mais les conditions sont plus
              strictes : délai de 30 jours et obligation de <strong>consigner</strong> le
              montant majoré avant de contester.
            </p>
            <p>
              <strong>La consignation n&apos;est pas un paiement.</strong> Si votre contestation
              aboutit, le montant consigné vous est remboursé.
            </p>
          </div>
        </section>

        {/* Conseils */}
        <section className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">Nos conseils</h2>
          <ul className="space-y-2 text-body text-gris-texte">
            <li className="flex gap-2">
              <span className="text-bleu-france font-bold flex-shrink-0">&bull;</span>
              <span>Contestez le plus tôt possible &mdash; ne laissez pas le délai s&apos;écouler</span>
            </li>
            <li className="flex gap-2">
              <span className="text-bleu-france font-bold flex-shrink-0">&bull;</span>
              <span>Conservez une copie de l&apos;avis de contravention et notez la date d&apos;envoi</span>
            </li>
            <li className="flex gap-2">
              <span className="text-bleu-france font-bold flex-shrink-0">&bull;</span>
              <span>Privilégiez la contestation en ligne sur ANTAI : plus rapide et traçable</span>
            </li>
            <li className="flex gap-2">
              <span className="text-bleu-france font-bold flex-shrink-0">&bull;</span>
              <span>Ne payez jamais l&apos;amende avant de contester</span>
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">Questions fréquentes</h2>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <details key={i} className="bg-white border border-gris-bordure rounded-card group">
                <summary className="p-4 cursor-pointer text-h3 text-gris-titre list-none flex justify-between items-center">
                  {item.question}
                  <span className="text-bleu-france ml-2 flex-shrink-0 group-open:rotate-180 transition-transform">
                    &#9662;
                  </span>
                </summary>
                <div className="px-4 pb-4 text-body text-gris-texte">{item.answer}</div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-bleu-fond rounded-card p-8 text-center">
          <h2 className="text-h2 text-gris-titre mb-3">
            Votre délai court encore ?
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
