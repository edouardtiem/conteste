import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "D\u00e9lai de contestation d'amende en France — Guide 2026 | Conteste.app",
  description:
    "Quel d\u00e9lai pour contester une amende en France ? 45 jours pour un PV classique, 30 jours pour un FPS. D\u00e9lai major\u00e9, exceptions et conseils pratiques.",
  openGraph: {
    title: "D\u00e9lai de contestation d'amende — Guide 2026 | Conteste.app",
    description:
      "45 jours pour un PV classique, 30 jours pour un FPS. Tout savoir sur les d\u00e9lais de contestation.",
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
    question: "Quel est le d\u00e9lai pour contester une amende ?",
    answer:
      "Le d\u00e9lai l\u00e9gal est de 45 jours \u00e0 compter de la date d'envoi de l'avis de contravention pour les amendes forfaitaires classiques (radar, feu rouge, ceinture, t\u00e9l\u00e9phone). Pour un forfait post-stationnement (FPS), le d\u00e9lai est de 30 jours pour le RAPO.",
  },
  {
    question: "Le d\u00e9lai court-il \u00e0 partir de la r\u00e9ception du courrier ?",
    answer:
      "Non, le d\u00e9lai court \u00e0 partir de la date d'envoi de l'avis de contravention, et non de sa r\u00e9ception. Cette date figure sur l'avis. En pratique, vous disposez donc de quelques jours de moins que les 45 jours th\u00e9oriques.",
  },
  {
    question: "Peut-on contester une amende major\u00e9e ?",
    answer:
      "Oui, mais la contestation d'une amende major\u00e9e est plus complexe. Vous devez d'abord consigner le montant major\u00e9 avant de pouvoir contester. Le d\u00e9lai de contestation est de 30 jours \u00e0 compter de l'envoi de l'avis de majoration.",
  },
  {
    question: "Que se passe-t-il si le d\u00e9lai est d\u00e9pass\u00e9 ?",
    answer:
      "Si le d\u00e9lai de 45 jours est d\u00e9pass\u00e9, l'amende est automatiquement major\u00e9e. Vous pouvez encore contester l'amende major\u00e9e dans un d\u00e9lai de 30 jours, mais vous devrez consigner le montant major\u00e9.",
  },
  {
    question: "Le d\u00e9lai est-il le m\u00eame dans tous les d\u00e9partements ?",
    answer:
      "Oui, les d\u00e9lais de contestation sont fix\u00e9s par la loi et sont identiques sur tout le territoire fran\u00e7ais m\u00e9tropolitain et en outre-mer.",
  },
];

export default function DelaiContestationPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "D\u00e9lai de contestation d'amende en France — Guide complet 2026",
      description:
        "Tous les d\u00e9lais de contestation d'amende en France : 45 jours pour un PV classique, 30 jours pour un FPS.",
      url: "https://conteste.app/guides/delai-contestation-amende",
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
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: "https://conteste.app" },
        { "@type": "ListItem", position: 2, name: "Guides", item: "https://conteste.app/guides" },
        { "@type": "ListItem", position: 3, name: "D\u00e9lai de contestation", item: "https://conteste.app/guides/delai-contestation-amende" },
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
          <span className="text-gris-titre font-medium">D\u00e9lai de contestation d&apos;amende</span>
        </nav>

        <h1 className="text-h1-mobile md:text-h1-desktop text-gris-titre mb-4">
          D\u00e9lai de contestation d&apos;amende en France : guide complet 2026
        </h1>

        <div className="bg-bleu-fond rounded-card p-6 mb-8">
          <p className="text-body text-gris-texte">
            Le respect du d\u00e9lai de contestation est la premi\u00e8re condition pour que votre
            requ\u00eate soit recevable. <strong>45 jours pour une amende classique,
            30 jours pour un FPS.</strong> Voici tout ce que vous devez savoir.
          </p>
        </div>

        {/* Tableau r\u00e9capitulatif */}
        <section className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">R\u00e9capitulatif des d\u00e9lais</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gris-bordure rounded-card text-body">
              <thead>
                <tr className="bg-gris-fond">
                  <th className="text-left p-4 text-gris-titre font-bold border-b border-gris-bordure">Type d&apos;amende</th>
                  <th className="text-left p-4 text-gris-titre font-bold border-b border-gris-bordure">D\u00e9lai</th>
                  <th className="text-left p-4 text-gris-titre font-bold border-b border-gris-bordure">Point de d\u00e9part</th>
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
                  <td className="p-4">Amende t\u00e9l\u00e9phone</td>
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
                  <td className="p-4">Amende major\u00e9e</td>
                  <td className="p-4 font-bold">30 jours</td>
                  <td className="p-4">Date d&apos;envoi de la majoration</td>
                  <td className="p-4">ANTAI</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* D\u00e9tail 45 jours */}
        <section className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">Le d\u00e9lai de 45 jours expliqu\u00e9</h2>
          <div className="space-y-3 text-body text-gris-texte">
            <p>
              Pour les amendes forfaitaires classiques (exc\u00e8s de vitesse, feu rouge,
              ceinture, t\u00e9l\u00e9phone au volant), le d\u00e9lai de contestation est de
              <strong> 45 jours</strong> \u00e0 compter de la date d&apos;envoi de l&apos;avis de
              contravention.
            </p>
            <p>
              <strong>Attention :</strong> la date de d\u00e9part est la date d&apos;envoi
              figurant sur l&apos;avis, pas la date \u00e0 laquelle vous le recevez dans votre
              bo\u00eete aux lettres. Comptez 2 \u00e0 5 jours d&apos;acheminement postal,
              ce qui r\u00e9duit d&apos;autant votre d\u00e9lai effectif.
            </p>
            <p>
              Si vous contestez par voie \u00e9lectronique sur ANTAI, c&apos;est la date de soumission
              en ligne qui fait foi. Par courrier recommand\u00e9, c&apos;est la date d&apos;envoi
              (cachet de la Poste faisant foi).
            </p>
          </div>
        </section>

        {/* Que se passe-t-il apr\u00e8s le d\u00e9lai */}
        <section className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">Que se passe-t-il si le d\u00e9lai est d\u00e9pass\u00e9 ?</h2>
          <div className="space-y-3 text-body text-gris-texte">
            <p>
              Si vous ne contestez pas et ne payez pas dans les 45 jours, l&apos;amende est
              automatiquement <strong>major\u00e9e</strong>. Le montant major\u00e9 est g\u00e9n\u00e9ralement
              de 375&nbsp;&euro; pour une amende de 4\u00e8me classe (radar, feu rouge, ceinture, t\u00e9l\u00e9phone).
            </p>
            <p>
              Vous pouvez encore contester l&apos;amende major\u00e9e, mais les conditions sont plus
              strictes : d\u00e9lai de 30 jours et obligation de <strong>consigner</strong> le
              montant major\u00e9 avant de contester.
            </p>
            <p>
              <strong>La consignation n&apos;est pas un paiement.</strong> Si votre contestation
              aboutit, le montant consign\u00e9 vous est rembours\u00e9.
            </p>
          </div>
        </section>

        {/* Conseils */}
        <section className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">Nos conseils</h2>
          <ul className="space-y-2 text-body text-gris-texte">
            <li className="flex gap-2">
              <span className="text-bleu-france font-bold flex-shrink-0">&bull;</span>
              <span>Contestez le plus t\u00f4t possible &mdash; ne laissez pas le d\u00e9lai s&apos;\u00e9couler</span>
            </li>
            <li className="flex gap-2">
              <span className="text-bleu-france font-bold flex-shrink-0">&bull;</span>
              <span>Conservez une copie de l&apos;avis de contravention et notez la date d&apos;envoi</span>
            </li>
            <li className="flex gap-2">
              <span className="text-bleu-france font-bold flex-shrink-0">&bull;</span>
              <span>Privil\u00e9giez la contestation en ligne sur ANTAI : plus rapide et tra\u00e7able</span>
            </li>
            <li className="flex gap-2">
              <span className="text-bleu-france font-bold flex-shrink-0">&bull;</span>
              <span>Ne payez jamais l&apos;amende avant de contester</span>
            </li>
          </ul>
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
                <div className="px-4 pb-4 text-body text-gris-texte">{item.answer}</div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-bleu-fond rounded-card p-8 text-center">
          <h2 className="text-h2 text-gris-titre mb-3">
            Votre d\u00e9lai court encore ?
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
