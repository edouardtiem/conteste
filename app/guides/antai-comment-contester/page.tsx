import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ANTAI : comment contester une amende en ligne — Guide 2026 | Conteste.app",
  description:
    "Comment contester une amende sur le site ANTAI (antai.gouv.fr) ? Guide \u00e9tape par \u00e9tape : num\u00e9ro d'avis, motif, pi\u00e8ces justificatives, suivi de dossier. Tout savoir sur la proc\u00e9dure en ligne.",
  openGraph: {
    title: "ANTAI : comment contester une amende en ligne | Conteste.app",
    description:
      "Guide \u00e9tape par \u00e9tape pour contester une amende sur ANTAI. Proc\u00e9dure compl\u00e8te.",
    url: "https://conteste.app/guides/antai-comment-contester",
    siteName: "Conteste.app",
    locale: "fr_FR",
    type: "article",
  },
  alternates: {
    canonical: "https://conteste.app/guides/antai-comment-contester",
  },
};

const faq = [
  {
    question: "Qu'est-ce que l'ANTAI ?",
    answer:
      "L'ANTAI (Agence Nationale de Traitement Automatis\u00e9 des Infractions) est l'organisme public fran\u00e7ais charg\u00e9 de traiter les infractions routi\u00e8res automatis\u00e9es. C'est sur leur site (antai.gouv.fr) que vous pouvez contester vos amendes en ligne.",
  },
  {
    question: "Quelles amendes peut-on contester sur ANTAI ?",
    answer:
      "Les amendes contestables sur ANTAI sont : exc\u00e8s de vitesse (radar), feu rouge, ceinture de s\u00e9curit\u00e9, t\u00e9l\u00e9phone au volant, et de mani\u00e8re g\u00e9n\u00e9rale toutes les contraventions \u00e9mises par le syst\u00e8me de contr\u00f4le automatis\u00e9. Les FPS (stationnement) se contestent sur le portail de la commune.",
  },
  {
    question: "Faut-il un compte pour contester sur ANTAI ?",
    answer:
      "Non, il n'est pas n\u00e9cessaire de cr\u00e9er un compte. Vous avez simplement besoin du num\u00e9ro de l'avis de contravention et de votre nom pour acc\u00e9der au formulaire de contestation.",
  },
  {
    question: "Peut-on suivre l'\u00e9tat de sa contestation sur ANTAI ?",
    answer:
      "Oui, le site de l'ANTAI permet de suivre l'\u00e9tat d'avancement de votre contestation. Rendez-vous sur antai.gouv.fr et cliquez sur \"Suivre mon dossier\". Vous aurez besoin de votre num\u00e9ro d'avis.",
  },
  {
    question: "Combien de temps dure le traitement d'une contestation sur ANTAI ?",
    answer:
      "Le d\u00e9lai moyen de traitement est d'environ 45 jours. Cependant, ce d\u00e9lai peut varier selon la complexit\u00e9 du dossier et la charge du tribunal comp\u00e9tent. Vous recevrez la d\u00e9cision par courrier.",
  },
  {
    question: "Que faire si le site ANTAI ne fonctionne pas ?",
    answer:
      "Si le site est temporairement inaccessible, vous pouvez contester par courrier recommand\u00e9 avec accus\u00e9 de r\u00e9ception adress\u00e9 \u00e0 l'Officier du Minist\u00e8re Public du tribunal comp\u00e9tent. Conservez la preuve d'envoi.",
  },
];

export default function AntaiCommentContesterPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "ANTAI : comment contester une amende en ligne",
      description:
        "Guide complet pour contester une amende sur le site ANTAI. Proc\u00e9dure \u00e9tape par \u00e9tape.",
      url: "https://conteste.app/guides/antai-comment-contester",
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
      "@type": "HowTo",
      name: "Comment contester une amende sur ANTAI",
      step: [
        { "@type": "HowToStep", position: 1, name: "Acc\u00e9der au site ANTAI", text: "Rendez-vous sur www.antai.gouv.fr" },
        { "@type": "HowToStep", position: 2, name: "Cliquer sur D\u00e9signer / Contester", text: "Choisissez l'option de contestation" },
        { "@type": "HowToStep", position: 3, name: "Saisir le num\u00e9ro d'avis", text: "Entrez votre num\u00e9ro d'avis de contravention" },
        { "@type": "HowToStep", position: 4, name: "Choisir le motif", text: "S\u00e9lectionnez votre motif de contestation" },
        { "@type": "HowToStep", position: 5, name: "R\u00e9diger l'argumentaire", text: "R\u00e9digez votre motivation de contestation" },
        { "@type": "HowToStep", position: 6, name: "Joindre les pi\u00e8ces", text: "T\u00e9l\u00e9chargez vos justificatifs" },
        { "@type": "HowToStep", position: 7, name: "Valider et conserver le r\u00e9c\u00e9piss\u00e9", text: "Confirmez et conservez votre accus\u00e9 de r\u00e9ception" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: "https://conteste.app" },
        { "@type": "ListItem", position: 2, name: "Guides", item: "https://conteste.app/guides" },
        { "@type": "ListItem", position: 3, name: "ANTAI : comment contester", item: "https://conteste.app/guides/antai-comment-contester" },
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
          <span className="text-gris-titre font-medium">ANTAI : comment contester</span>
        </nav>

        <h1 className="text-h1-mobile md:text-h1-desktop text-gris-titre mb-4">
          ANTAI : comment contester une amende en ligne
        </h1>

        <div className="bg-bleu-fond rounded-card p-6 mb-8">
          <p className="text-body text-gris-texte">
            L&apos;ANTAI (Agence Nationale de Traitement Automatis\u00e9 des Infractions) est le portail
            officiel pour contester les amendes routi\u00e8res en France. Voici comment l&apos;utiliser,
            \u00e9tape par \u00e9tape.
          </p>
        </div>

        {/* Qu'est-ce que l'ANTAI */}
        <section className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">Qu&apos;est-ce que l&apos;ANTAI ?</h2>
          <div className="space-y-3 text-body text-gris-texte">
            <p>
              L&apos;ANTAI est l&apos;agence gouvernementale cr\u00e9\u00e9e en 2011, charg\u00e9e du traitement
              des infractions routi\u00e8res d\u00e9tect\u00e9es par le syst\u00e8me de contr\u00f4le automatis\u00e9
              (radars, feux rouges, etc.).
            </p>
            <p>
              Son site, <strong>antai.gouv.fr</strong>, permet de :
            </p>
            <ul className="space-y-1 ml-4">
              <li>Payer ses amendes en ligne</li>
              <li>D\u00e9signer un autre conducteur</li>
              <li><strong>Contester une amende</strong> (requ\u00eate en exon\u00e9ration)</li>
              <li>Suivre l&apos;\u00e9tat d&apos;un dossier</li>
            </ul>
          </div>
        </section>

        {/* Quelles amendes */}
        <section className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">Quelles amendes peut-on contester sur ANTAI ?</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { label: "Exc\u00e8s de vitesse (radar)", ok: true },
              { label: "Franchissement de feu rouge", ok: true },
              { label: "Non-port de la ceinture", ok: true },
              { label: "T\u00e9l\u00e9phone au volant", ok: true },
              { label: "Stationnement (FPS)", ok: false },
              { label: "Transports en commun", ok: false },
            ].map((item) => (
              <div
                key={item.label}
                className={`p-4 rounded-card border ${
                  item.ok
                    ? "bg-vert-fond border-vert-succes"
                    : "bg-orange-fond border-orange-warning"
                }`}
              >
                <p className="text-body font-bold">
                  {item.ok ? "Oui" : "Non"} &mdash; {item.label}
                </p>
                {!item.ok && (
                  <p className="text-[13px] text-gris-mention mt-1">
                    Contestation via le portail de la commune ou de l&apos;op\u00e9rateur
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Guide \u00e9tape par \u00e9tape */}
        <section className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">
            Proc\u00e9dure de contestation sur ANTAI : \u00e9tape par \u00e9tape
          </h2>
          <div className="space-y-6">
            {[
              {
                n: 1,
                title: "Rendez-vous sur antai.gouv.fr",
                text: "Ouvrez votre navigateur et acc\u00e9dez au site officiel de l'ANTAI. Assurez-vous d'\u00eatre bien sur le site officiel (domaine en .gouv.fr).",
              },
              {
                n: 2,
                title: "Cliquez sur \"D\u00e9signer ou Contester\"",
                text: "Sur la page d'accueil, cliquez sur le bouton \"D\u00e9signer ou Contester\". Vous serez redirig\u00e9 vers le formulaire.",
              },
              {
                n: 3,
                title: "Saisissez votre num\u00e9ro d'avis de contravention",
                text: "Le num\u00e9ro d'avis figure en haut \u00e0 droite de votre amende. Il s'agit d'un num\u00e9ro unique qui identifie votre dossier. Saisissez-le sans espaces.",
              },
              {
                n: 4,
                title: "S\u00e9lectionnez \"Contester\" (requ\u00eate en exon\u00e9ration)",
                text: "Vous aurez le choix entre d\u00e9signer un autre conducteur ou contester. Choisissez \"Contester\" pour formuler une requ\u00eate en exon\u00e9ration.",
              },
              {
                n: 5,
                title: "Choisissez votre motif de contestation",
                text: "L'ANTAI propose plusieurs motifs pr\u00e9d\u00e9finis. S\u00e9lectionnez celui qui correspond le mieux \u00e0 votre situation : v\u00e9hicule vol\u00e9 ou vendu, autre conducteur, contestation de l'infraction elle-m\u00eame.",
              },
              {
                n: 6,
                title: "R\u00e9digez votre argumentaire",
                text: "Dans le champ \"Motif de la requ\u00eate\", exposez clairement et factuellement les raisons de votre contestation. Soyez pr\u00e9cis, mentionnez les articles de loi si possible, et \u00e9vitez les formulations \u00e9motionnelles.",
              },
              {
                n: 7,
                title: "Joignez vos pi\u00e8ces justificatives",
                text: "T\u00e9l\u00e9chargez les documents qui appuient votre contestation : photos, copie de carte grise, certificat de cession, attestation m\u00e9dicale, etc. Les formats accept\u00e9s sont g\u00e9n\u00e9ralement PDF, JPG et PNG.",
              },
              {
                n: 8,
                title: "Validez et conservez votre r\u00e9c\u00e9piss\u00e9",
                text: "Apr\u00e8s validation, vous recevrez un r\u00e9c\u00e9piss\u00e9 de d\u00e9p\u00f4t. Conservez-le pr\u00e9cieusement : il prouve que vous avez bien contest\u00e9 dans les d\u00e9lais.",
              },
            ].map((step) => (
              <div key={step.n} className="flex gap-4">
                <div className="w-10 h-10 bg-bleu-france text-white rounded-full flex items-center justify-center font-bold text-[16px] flex-shrink-0 mt-1">
                  {step.n}
                </div>
                <div>
                  <h3 className="text-h3 text-gris-titre mb-1">{step.title}</h3>
                  <p className="text-body text-gris-texte">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Conseils r\u00e9daction */}
        <section className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">Conseils pour r\u00e9diger votre contestation</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-vert-fond border border-vert-succes rounded-card p-4">
              <h3 className="text-h3 text-vert-succes mb-2">A faire</h3>
              <ul className="space-y-1 text-body text-gris-texte">
                <li>&bull; Rester factuel et pr\u00e9cis</li>
                <li>&bull; Citer les articles de loi</li>
                <li>&bull; Joindre des preuves concr\u00e8tes</li>
                <li>&bull; D\u00e9crire les faits chronologiquement</li>
              </ul>
            </div>
            <div className="bg-orange-fond border border-orange-warning rounded-card p-4">
              <h3 className="text-h3 text-orange-warning mb-2">A \u00e9viter</h3>
              <ul className="space-y-1 text-body text-gris-texte">
                <li>&bull; Les arguments \u00e9motionnels</li>
                <li>&bull; Les excuses sans preuve</li>
                <li>&bull; Les menaces ou le ton agressif</li>
                <li>&bull; Les copier-coller g\u00e9n\u00e9riques</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Suivi */}
        <section className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">Suivre sa contestation</h2>
          <div className="space-y-3 text-body text-gris-texte">
            <p>
              Apr\u00e8s avoir d\u00e9pos\u00e9 votre contestation, vous pouvez suivre son \u00e9tat sur le site
              de l&apos;ANTAI. Rendez-vous sur <strong>antai.gouv.fr</strong> et cliquez sur
              &laquo; Suivre mon dossier &raquo;.
            </p>
            <p>
              Le d\u00e9lai de traitement moyen est d&apos;environ <strong>45 jours</strong>,
              mais peut \u00eatre plus long en p\u00e9riode d&apos;affluence. La d\u00e9cision vous sera
              notifi\u00e9e par courrier de l&apos;Officier du Minist\u00e8re Public.
            </p>
            <p>
              Les trois issues possibles sont : classement sans suite (contestation accept\u00e9e),
              renvoi devant le tribunal de police, ou rejet de la contestation.
            </p>
          </div>
        </section>

        {/* R\u00e9f\u00e9rences */}
        <section className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">Liens utiles</h2>
          <ul className="space-y-2 text-body text-gris-texte">
            <li>
              <a href="https://www.antai.gouv.fr" target="_blank" rel="noopener noreferrer" className="text-bleu-france underline">
                ANTAI &mdash; Site officiel
              </a>
            </li>
            <li>
              <a href="https://www.service-public.fr/particuliers/vosdroits/F18509" target="_blank" rel="noopener noreferrer" className="text-bleu-france underline">
                Service-public.fr &mdash; Contester une amende
              </a>
            </li>
            <li>
              <a href="https://www.legifrance.gouv.fr" target="_blank" rel="noopener noreferrer" className="text-bleu-france underline">
                L\u00e9gifrance &mdash; Textes de loi
              </a>
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
            Besoin d&apos;aide pour r\u00e9diger votre contestation ?
          </h2>
          <p className="text-body text-gris-texte mb-6">
            Notre outil analyse votre amende et g\u00e9n\u00e8re les arguments personnalis\u00e9s
            les plus efficaces pour votre cas. Gratuit pour l&apos;analyse.
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
