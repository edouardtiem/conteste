import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ANTAI : comment contester une amende en ligne — Guide 2026 | Conteste.app",
  description:
    "Comment contester une amende sur le site ANTAI (antai.gouv.fr) ? Guide étape par étape : numéro d'avis, motif, pièces justificatives, suivi de dossier. Tout savoir sur la procédure en ligne.",
  openGraph: {
    title: "ANTAI : comment contester une amende en ligne | Conteste.app",
    description:
      "Guide étape par étape pour contester une amende sur ANTAI. Procédure complète.",
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
      "L'ANTAI (Agence Nationale de Traitement Automatisé des Infractions) est l'organisme public français chargé de traiter les infractions routières automatisées. C'est sur leur site (antai.gouv.fr) que vous pouvez contester vos amendes en ligne.",
  },
  {
    question: "Quelles amendes peut-on contester sur ANTAI ?",
    answer:
      "Les amendes contestables sur ANTAI sont : excès de vitesse (radar), feu rouge, ceinture de sécurité, téléphone au volant, et de manière générale toutes les contraventions émises par le système de contrôle automatisé. Les FPS (stationnement) se contestent sur le portail de la commune.",
  },
  {
    question: "Faut-il un compte pour contester sur ANTAI ?",
    answer:
      "Non, il n'est pas nécessaire de créer un compte. Vous avez simplement besoin du numéro de l'avis de contravention et de votre nom pour accéder au formulaire de contestation.",
  },
  {
    question: "Peut-on suivre l'état de sa contestation sur ANTAI ?",
    answer:
      "Oui, le site de l'ANTAI permet de suivre l'état d'avancement de votre contestation. Rendez-vous sur antai.gouv.fr et cliquez sur \"Suivre mon dossier\". Vous aurez besoin de votre numéro d'avis.",
  },
  {
    question: "Combien de temps dure le traitement d'une contestation sur ANTAI ?",
    answer:
      "Le délai moyen de traitement est d'environ 45 jours. Cependant, ce délai peut varier selon la complexité du dossier et la charge du tribunal compétent. Vous recevrez la décision par courrier.",
  },
  {
    question: "Que faire si le site ANTAI ne fonctionne pas ?",
    answer:
      "Si le site est temporairement inaccessible, vous pouvez contester par courrier recommandé avec accusé de réception adressé à l'Officier du Ministère Public du tribunal compétent. Conservez la preuve d'envoi.",
  },
];

export default function AntaiCommentContesterPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "ANTAI : comment contester une amende en ligne",
      description:
        "Guide complet pour contester une amende sur le site ANTAI. Procédure étape par étape.",
      url: "https://conteste.app/guides/antai-comment-contester",
      datePublished: "2026-02-20",
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
      "@type": "HowTo",
      name: "Comment contester une amende sur ANTAI",
      step: [
        { "@type": "HowToStep", position: 1, name: "Accéder au site ANTAI", text: "Rendez-vous sur www.antai.gouv.fr" },
        { "@type": "HowToStep", position: 2, name: "Cliquer sur Désigner / Contester", text: "Choisissez l'option de contestation" },
        { "@type": "HowToStep", position: 3, name: "Saisir le numéro d'avis", text: "Entrez votre numéro d'avis de contravention" },
        { "@type": "HowToStep", position: 4, name: "Choisir le motif", text: "Sélectionnez votre motif de contestation" },
        { "@type": "HowToStep", position: 5, name: "Rédiger l'argumentaire", text: "Rédigez votre motivation de contestation" },
        { "@type": "HowToStep", position: 6, name: "Joindre les pièces", text: "Téléchargez vos justificatifs" },
        { "@type": "HowToStep", position: 7, name: "Valider et conserver le récépissé", text: "Confirmez et conservez votre accusé de réception" },
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
            L&apos;ANTAI (Agence Nationale de Traitement Automatisé des Infractions) est le portail
            officiel pour contester les amendes routières en France. Voici comment l&apos;utiliser,
            étape par étape.
          </p>
        </div>

        {/* Qu'est-ce que l'ANTAI */}
        <section className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">Qu&apos;est-ce que l&apos;ANTAI ?</h2>
          <div className="space-y-3 text-body text-gris-texte">
            <p>
              L&apos;ANTAI est l&apos;agence gouvernementale créée en 2011, chargée du traitement
              des infractions routières détectées par le système de contrôle automatisé
              (radars, feux rouges, etc.).
            </p>
            <p>
              Son site, <strong>antai.gouv.fr</strong>, permet de :
            </p>
            <ul className="space-y-1 ml-4">
              <li>Payer ses amendes en ligne</li>
              <li>Désigner un autre conducteur</li>
              <li><strong>Contester une amende</strong> (requête en exonération)</li>
              <li>Suivre l&apos;état d&apos;un dossier</li>
            </ul>
          </div>
        </section>

        {/* Quelles amendes */}
        <section className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">Quelles amendes peut-on contester sur ANTAI ?</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { label: "Excès de vitesse (radar)", ok: true },
              { label: "Franchissement de feu rouge", ok: true },
              { label: "Non-port de la ceinture", ok: true },
              { label: "Téléphone au volant", ok: true },
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
                    Contestation via le portail de la commune ou de l&apos;opérateur
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Guide étape par étape */}
        <section className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">
            Procédure de contestation sur ANTAI : étape par étape
          </h2>
          <div className="space-y-6">
            {[
              {
                n: 1,
                title: "Rendez-vous sur antai.gouv.fr",
                text: "Ouvrez votre navigateur et accédez au site officiel de l'ANTAI. Assurez-vous d'être bien sur le site officiel (domaine en .gouv.fr).",
              },
              {
                n: 2,
                title: "Cliquez sur \"Désigner ou Contester\"",
                text: "Sur la page d'accueil, cliquez sur le bouton \"Désigner ou Contester\". Vous serez redirigé vers le formulaire.",
              },
              {
                n: 3,
                title: "Saisissez votre numéro d'avis de contravention",
                text: "Le numéro d'avis figure en haut à droite de votre amende. Il s'agit d'un numéro unique qui identifie votre dossier. Saisissez-le sans espaces.",
              },
              {
                n: 4,
                title: "Sélectionnez \"Contester\" (requête en exonération)",
                text: "Vous aurez le choix entre désigner un autre conducteur ou contester. Choisissez \"Contester\" pour formuler une requête en exonération.",
              },
              {
                n: 5,
                title: "Choisissez votre motif de contestation",
                text: "L'ANTAI propose plusieurs motifs prédéfinis. Sélectionnez celui qui correspond le mieux à votre situation : véhicule volé ou vendu, autre conducteur, contestation de l'infraction elle-même.",
              },
              {
                n: 6,
                title: "Rédigez votre argumentaire",
                text: "Dans le champ \"Motif de la requête\", exposez clairement et factuellement les raisons de votre contestation. Soyez précis, mentionnez les articles de loi si possible, et évitez les formulations émotionnelles.",
              },
              {
                n: 7,
                title: "Joignez vos pièces justificatives",
                text: "Téléchargez les documents qui appuient votre contestation : photos, copie de carte grise, certificat de cession, attestation médicale, etc. Les formats acceptés sont généralement PDF, JPG et PNG.",
              },
              {
                n: 8,
                title: "Validez et conservez votre récépissé",
                text: "Après validation, vous recevrez un récépissé de dépôt. Conservez-le précieusement : il prouve que vous avez bien contesté dans les délais.",
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

        {/* Conseils rédaction */}
        <section className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">Conseils pour rédiger votre contestation</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-vert-fond border border-vert-succes rounded-card p-4">
              <h3 className="text-h3 text-vert-succes mb-2">A faire</h3>
              <ul className="space-y-1 text-body text-gris-texte">
                <li>&bull; Rester factuel et précis</li>
                <li>&bull; Citer les articles de loi</li>
                <li>&bull; Joindre des preuves concrètes</li>
                <li>&bull; Décrire les faits chronologiquement</li>
              </ul>
            </div>
            <div className="bg-orange-fond border border-orange-warning rounded-card p-4">
              <h3 className="text-h3 text-orange-warning mb-2">A éviter</h3>
              <ul className="space-y-1 text-body text-gris-texte">
                <li>&bull; Les arguments émotionnels</li>
                <li>&bull; Les excuses sans preuve</li>
                <li>&bull; Les menaces ou le ton agressif</li>
                <li>&bull; Les copier-coller génériques</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Suivi */}
        <section className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">Suivre sa contestation</h2>
          <div className="space-y-3 text-body text-gris-texte">
            <p>
              Après avoir déposé votre contestation, vous pouvez suivre son état sur le site
              de l&apos;ANTAI. Rendez-vous sur <strong>antai.gouv.fr</strong> et cliquez sur
              &laquo; Suivre mon dossier &raquo;.
            </p>
            <p>
              Le délai de traitement moyen est d&apos;environ <strong>45 jours</strong>,
              mais peut être plus long en période d&apos;affluence. La décision vous sera
              notifiée par courrier de l&apos;Officier du Ministère Public.
            </p>
            <p>
              Les trois issues possibles sont : classement sans suite (contestation acceptée),
              renvoi devant le tribunal de police, ou rejet de la contestation.
            </p>
          </div>
        </section>

        {/* Références */}
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
                Légifrance &mdash; Textes de loi
              </a>
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
            Besoin d&apos;aide pour rédiger votre contestation ?
          </h2>
          <p className="text-body text-gris-texte mb-6">
            Notre outil analyse votre amende et génère les arguments personnalisés
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
