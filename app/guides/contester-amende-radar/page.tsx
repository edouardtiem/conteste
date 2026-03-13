import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contester une amende radar — Guide complet 2026 | Conteste.app",
  description:
    "Comment contester une amende radar en France ? Délai de 45 jours, montant 135 €, motifs recevables (panneau masqué, erreur de plaque, marge technique). Guide étape par étape pour contester sur ANTAI.",
  openGraph: {
    title: "Contester une amende radar — Guide complet 2026 | Conteste.app",
    description:
      "Délai 45 jours, montant 135 €, motifs recevables. Guide complet pour contester une amende radar sur ANTAI.",
    url: "https://conteste.app/guides/contester-amende-radar",
    siteName: "Conteste.app",
    locale: "fr_FR",
    type: "article",
  },
  alternates: {
    canonical: "https://conteste.app/guides/contester-amende-radar",
  },
};

const faq = [
  {
    question: "Peut-on contester une amende radar automatique ?",
    answer:
      "Oui, toute amende radar peut être contestée dans un délai de 45 jours. Les motifs les plus fréquents sont le panneau masqué ou non visible, l'erreur sur la plaque d'immatriculation, et la marge technique du radar. La contestation se fait en ligne sur le site de l'ANTAI.",
  },
  {
    question: "Quel est le délai pour contester une amende radar ?",
    answer:
      "Le délai légal est de 45 jours à compter de la date d'envoi de l'avis de contravention (et non de sa réception). Passé ce délai, la contestation n'est plus recevable et l'amende sera majorée.",
  },
  {
    question: "Faut-il payer l'amende avant de contester ?",
    answer:
      "Non, ne payez jamais l'amende avant de contester. Le paiement vaut reconnaissance de l'infraction. En revanche, vous pouvez être amené à consigner le montant de l'amende (135 € pour un radar), ce qui est différent du paiement. La consignation est restituée si la contestation aboutit.",
  },
  {
    question: "Quels sont les meilleurs motifs pour contester une amende radar ?",
    answer:
      "Les motifs les plus efficaces sont : panneau de signalisation masqué ou non visible (article R411-25 du Code de la route), erreur sur la plaque d'immatriculation (article A9 du CPP), véhicule vendu avant l'infraction (article R322-4), et marge technique du radar (arrêté du 4 juin 2009). Chaque motif doit être appuyé par des preuves.",
  },
  {
    question: "Combien de points perd-on pour un excès de vitesse ?",
    answer:
      "Le retrait de points dépend de l'excès de vitesse : 1 point pour un excès inférieur à 20 km/h, 2 points entre 20 et 30 km/h, 3 points entre 30 et 40 km/h, 4 points entre 40 et 50 km/h, et 6 points au-delà de 50 km/h. En cas de contestation acceptée, les points sont restitués.",
  },
  {
    question: "Comment fonctionne la marge technique des radars ?",
    answer:
      "La marge technique est une tolérance appliquée à la vitesse mesurée par le radar. Pour les vitesses inférieures à 100 km/h, la marge est de 5 km/h. Au-delà, elle est de 5%. Si la vitesse retenue après marge est très proche du seuil, c'est un motif de contestation recevable.",
  },
];

export default function ContesterAmendeRadarPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Contester une amende radar — Guide complet 2026",
      description:
        "Guide complet pour contester une amende radar en France. Délai, motifs, démarches ANTAI.",
      url: "https://conteste.app/guides/contester-amende-radar",
      datePublished: "2026-01-10",
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
      name: "Comment contester une amende radar sur ANTAI",
      step: [
        { "@type": "HowToStep", position: 1, name: "Accéder à ANTAI", text: "Rendez-vous sur www.antai.gouv.fr" },
        { "@type": "HowToStep", position: 2, name: "Saisir le numéro d'avis", text: "Entrez le numéro figurant sur votre amende" },
        { "@type": "HowToStep", position: 3, name: "Sélectionner le motif", text: "Choisissez le motif de contestation adapté" },
        { "@type": "HowToStep", position: 4, name: "Rédiger l'argumentaire", text: "Exposez les raisons de votre contestation" },
        { "@type": "HowToStep", position: 5, name: "Joindre les preuves", text: "Ajoutez photos et documents justificatifs" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: "https://conteste.app" },
        { "@type": "ListItem", position: 2, name: "Guides", item: "https://conteste.app/guides" },
        { "@type": "ListItem", position: 3, name: "Contester une amende radar", item: "https://conteste.app/guides/contester-amende-radar" },
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
          <span className="text-gris-titre font-medium">Contester une amende radar</span>
        </nav>

        <h1 className="text-h1-mobile md:text-h1-desktop text-gris-titre mb-4">
          Contester une amende radar : guide complet 2026
        </h1>

        <div className="bg-bleu-fond rounded-card p-6 mb-8">
          <p className="text-body text-gris-texte">
            Chaque année, des millions d&apos;amendes radar sont émises en France. Une fraction
            significative est contestable. <strong>Délai : 45 jours. Montant forfaitaire :
            135&nbsp;&euro;. Retrait : 1 à 6 points selon l&apos;excès.</strong>
          </p>
        </div>

        {/* En résumé */}
        <section className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">En résumé</h2>
          <ul className="space-y-2 text-body text-gris-texte">
            <li className="flex gap-2">
              <span className="text-bleu-france font-bold flex-shrink-0">&bull;</span>
              <span>Vous avez <strong>45 jours</strong> pour contester une amende radar, à compter de la date d&apos;envoi de l&apos;avis</span>
            </li>
            <li className="flex gap-2">
              <span className="text-bleu-france font-bold flex-shrink-0">&bull;</span>
              <span>Le montant forfaitaire est de <strong>135&nbsp;&euro;</strong> (minoré à 90&nbsp;&euro; si paiement sous 15 jours)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-bleu-france font-bold flex-shrink-0">&bull;</span>
              <span><strong>Ne payez pas avant de contester</strong> : le paiement vaut reconnaissance de l&apos;infraction</span>
            </li>
            <li className="flex gap-2">
              <span className="text-bleu-france font-bold flex-shrink-0">&bull;</span>
              <span>La contestation se fait en ligne sur <strong>ANTAI</strong> (antai.gouv.fr)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-bleu-france font-bold flex-shrink-0">&bull;</span>
              <span>Les motifs les plus solides : <strong>panneau masqué, erreur de plaque, véhicule vendu, marge technique</strong></span>
            </li>
          </ul>
        </section>

        {/* Les différents types de radars */}
        <section className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">Les différents types de radars en France</h2>
          <div className="space-y-3 text-body text-gris-texte">
            <p>
              La France compte plusieurs types de radars automatiques : les radars fixes, les radars
              mobiles embarqués, les radars de vitesse moyenne (tronçons), les radars tourelles
              et les voitures-radars. Chacun a ses spécificités techniques qui peuvent
              constituer des motifs de contestation.
            </p>
            <p>
              Les <strong>radars fixes</strong> doivent obligatoirement être signalés par un panneau
              en amont. Si ce panneau est absent, masqué par la végétation ou illisible,
              c&apos;est un motif de contestation solide (article R411-25 du Code de la route).
            </p>
            <p>
              Les <strong>radars mobiles</strong> sont installés dans des véhicules banalisés.
              Ils doivent également respecter des règles strictes de calibration et de positionnement.
            </p>
            <p>
              Les <strong>radars tronçons</strong> mesurent la vitesse moyenne entre deux points.
              La marge technique s&apos;applique également à ce type de radar.
            </p>
          </div>
        </section>

        {/* Motifs détaillés */}
        <section className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">Les 4 motifs de contestation les plus efficaces</h2>

          <div className="space-y-4">
            <div className="bg-white border border-gris-bordure border-l-4 border-l-bleu-france rounded-card p-6">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-h3 text-gris-titre">1. Panneau de signalisation masqué ou absent</h3>
                <span className="bg-vert-fond text-vert-succes text-badge px-3 py-1 rounded-pill flex-shrink-0">Fort</span>
              </div>
              <p className="text-body text-gris-texte mb-2">
                L&apos;article R411-25 du Code de la route impose que les dispositifs de contrôle
                soient signalés. Si le panneau d&apos;avertissement est masqué par la végétation,
                un camion, ou tout autre obstacle, la verbalisation peut être annulée.
              </p>
              <p className="text-[13px] text-gris-mention">
                Conseil : prenez des photos du lieu de l&apos;infraction montrant l&apos;absence ou le masquage
                du panneau le plus rapidement possible.
              </p>
            </div>

            <div className="bg-white border border-gris-bordure border-l-4 border-l-bleu-france rounded-card p-6">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-h3 text-gris-titre">2. Erreur sur la plaque d&apos;immatriculation</h3>
                <span className="bg-vert-fond text-vert-succes text-badge px-3 py-1 rounded-pill flex-shrink-0">Fort</span>
              </div>
              <p className="text-body text-gris-texte mb-2">
                Si le numéro de plaque indiqué sur l&apos;avis ne correspond pas à votre véhicule,
                c&apos;est un motif de contestation irréfutable. Joignez une copie de votre carte grise.
              </p>
              <p className="text-[13px] text-gris-mention">
                Référence : article A9 du Code de procédure pénale.
              </p>
            </div>

            <div className="bg-white border border-gris-bordure border-l-4 border-l-bleu-france rounded-card p-6">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-h3 text-gris-titre">3. Véhicule vendu avant la date de l&apos;infraction</h3>
                <span className="bg-vert-fond text-vert-succes text-badge px-3 py-1 rounded-pill flex-shrink-0">Fort</span>
              </div>
              <p className="text-body text-gris-texte mb-2">
                Si vous avez vendu votre véhicule avant la date de l&apos;infraction, vous n&apos;êtes pas
                responsable. Joignez le certificat de cession (Cerfa n°15776) et la déclaration
                de cession enregistrée sur le site de l&apos;ANTS.
              </p>
              <p className="text-[13px] text-gris-mention">
                Référence : article R322-4 du Code de la route.
              </p>
            </div>

            <div className="bg-white border border-gris-bordure border-l-4 border-l-bleu-france rounded-card p-6">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-h3 text-gris-titre">4. Marge technique du radar</h3>
                <span className="bg-score-moyen-fond text-score-moyen-texte text-badge px-3 py-1 rounded-pill flex-shrink-0">Moyen</span>
              </div>
              <p className="text-body text-gris-texte mb-2">
                La marge technique est la tolérance appliquée à la mesure du radar :
                5 km/h pour les vitesses &lt; 100 km/h, 5% au-delà. Si la vitesse retenue après
                marge est très proche du seuil de verbalisation, c&apos;est un argument recevable.
              </p>
              <p className="text-[13px] text-gris-mention">
                Référence : arrêté du 4 juin 2009 relatif aux cinémomètres.
              </p>
            </div>
          </div>
        </section>

        {/* Démarche étape par étape */}
        <section className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">Démarche de contestation étape par étape</h2>
          <div className="space-y-4">
            {[
              {
                n: 1,
                title: "Vérifiez votre éligibilité",
                text: "Assurez-vous que le délai de 45 jours n'est pas dépassé et que vous n'avez pas déjà payé l'amende. Le paiement vaut reconnaissance de l'infraction.",
              },
              {
                n: 2,
                title: "Rassemblez vos preuves",
                text: "Photos du lieu (panneau masqué, signalisation absente), copie de carte grise, certificat de cession, ou tout document prouvant votre motif de contestation.",
              },
              {
                n: 3,
                title: "Connectez-vous à ANTAI",
                text: "Rendez-vous sur www.antai.gouv.fr et cliquez sur \"Désigner ou Contester\". Munissez-vous de votre avis de contravention.",
              },
              {
                n: 4,
                title: "Remplissez le formulaire de contestation",
                text: "Saisissez votre numéro d'avis, sélectionnez le motif de contestation, rédigez votre argumentaire en étant précis et factuel.",
              },
              {
                n: 5,
                title: "Joignez vos pièces justificatives",
                text: "Téléchargez vos photos et documents. Plus vos preuves sont solides, meilleures sont vos chances.",
              },
              {
                n: 6,
                title: "Attendez la réponse",
                text: "Le délai de traitement moyen est de 45 jours. Vous recevrez un courrier de l'Officier du Ministère Public vous informant de la décision.",
              },
            ].map((step) => (
              <div key={step.n} className="flex gap-4">
                <div className="w-8 h-8 bg-bleu-france text-white rounded-full flex items-center justify-center font-bold text-[14px] flex-shrink-0 mt-1">
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

        {/* Références */}
        <section className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">Références légales</h2>
          <ul className="space-y-2 text-body text-gris-texte">
            <li>
              <a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006842108" target="_blank" rel="noopener noreferrer" className="text-bleu-france underline">
                Article R411-25 du Code de la route
              </a>{" "}
              &mdash; signalisation des dispositifs de contrôle
            </li>
            <li>
              <a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000039278004" target="_blank" rel="noopener noreferrer" className="text-bleu-france underline">
                Article R322-4 du Code de la route
              </a>{" "}
              &mdash; déclaration de cession de véhicule
            </li>
            <li>
              <a href="https://www.antai.gouv.fr" target="_blank" rel="noopener noreferrer" className="text-bleu-france underline">
                ANTAI
              </a>{" "}
              &mdash; portail officiel de contestation en ligne
            </li>
            <li>
              <a href="https://www.service-public.fr/particuliers/vosdroits/F18509" target="_blank" rel="noopener noreferrer" className="text-bleu-france underline">
                Service-public.fr
              </a>{" "}
              &mdash; contester une amende (contravention)
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

        {/* Guides par département */}
        <section className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">Consultez aussi</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <Link href="/guides/radar" className="text-bleu-france hover:underline text-body">
              Guide complet : amende radar par département &rarr;
            </Link>
            <Link href="/guides/feux-rouges" className="text-bleu-france hover:underline text-body">
              Contester une amende feu rouge &rarr;
            </Link>
            <Link href="/guides/delai-contestation-amende" className="text-bleu-france hover:underline text-body">
              Délais de contestation d&apos;amende &rarr;
            </Link>
            <Link href="/guides/antai-comment-contester" className="text-bleu-france hover:underline text-body">
              ANTAI : comment contester en ligne &rarr;
            </Link>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-bleu-fond rounded-card p-8 text-center">
          <h2 className="text-h2 text-gris-titre mb-3">
            Vous avez reçu une amende radar ?
          </h2>
          <p className="text-body text-gris-texte mb-6">
            Analysez gratuitement vos chances de contestation en moins de 60 secondes.
            Notre outil identifie automatiquement les meilleurs motifs pour votre cas.
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
