import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contester une amende radar — Guide complet 2026 | Conteste.app",
  description:
    "Comment contester une amende radar en France ? D\u00e9lai de 45 jours, montant 135\u00a0\u20ac, motifs recevables (panneau masqu\u00e9, erreur de plaque, marge technique). Guide \u00e9tape par \u00e9tape pour contester sur ANTAI.",
  openGraph: {
    title: "Contester une amende radar — Guide complet 2026 | Conteste.app",
    description:
      "D\u00e9lai 45 jours, montant 135\u00a0\u20ac, motifs recevables. Guide complet pour contester une amende radar sur ANTAI.",
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
      "Oui, toute amende radar peut \u00eatre contest\u00e9e dans un d\u00e9lai de 45 jours. Les motifs les plus fr\u00e9quents sont le panneau masqu\u00e9 ou non visible, l'erreur sur la plaque d'immatriculation, et la marge technique du radar. La contestation se fait en ligne sur le site de l'ANTAI.",
  },
  {
    question: "Quel est le d\u00e9lai pour contester une amende radar ?",
    answer:
      "Le d\u00e9lai l\u00e9gal est de 45 jours \u00e0 compter de la date d'envoi de l'avis de contravention (et non de sa r\u00e9ception). Pass\u00e9 ce d\u00e9lai, la contestation n'est plus recevable et l'amende sera major\u00e9e.",
  },
  {
    question: "Faut-il payer l'amende avant de contester ?",
    answer:
      "Non, ne payez jamais l'amende avant de contester. Le paiement vaut reconnaissance de l'infraction. En revanche, vous pouvez \u00eatre amen\u00e9 \u00e0 consigner le montant de l'amende (135\u00a0\u20ac pour un radar), ce qui est diff\u00e9rent du paiement. La consignation est restitu\u00e9e si la contestation aboutit.",
  },
  {
    question: "Quels sont les meilleurs motifs pour contester une amende radar ?",
    answer:
      "Les motifs les plus efficaces sont : panneau de signalisation masqu\u00e9 ou non visible (article R411-25 du Code de la route), erreur sur la plaque d'immatriculation (article A9 du CPP), v\u00e9hicule vendu avant l'infraction (article R322-4), et marge technique du radar (arr\u00eat\u00e9 du 4 juin 2009). Chaque motif doit \u00eatre appuy\u00e9 par des preuves.",
  },
  {
    question: "Combien de points perd-on pour un exc\u00e8s de vitesse ?",
    answer:
      "Le retrait de points d\u00e9pend de l'exc\u00e8s de vitesse : 1 point pour un exc\u00e8s inf\u00e9rieur \u00e0 20 km/h, 2 points entre 20 et 30 km/h, 3 points entre 30 et 40 km/h, 4 points entre 40 et 50 km/h, et 6 points au-del\u00e0 de 50 km/h. En cas de contestation accept\u00e9e, les points sont restitu\u00e9s.",
  },
  {
    question: "Comment fonctionne la marge technique des radars ?",
    answer:
      "La marge technique est une tol\u00e9rance appliqu\u00e9e \u00e0 la vitesse mesur\u00e9e par le radar. Pour les vitesses inf\u00e9rieures \u00e0 100 km/h, la marge est de 5 km/h. Au-del\u00e0, elle est de 5%. Si la vitesse retenue apr\u00e8s marge est tr\u00e8s proche du seuil, c'est un motif de contestation recevable.",
  },
];

export default function ContesterAmendeRadarPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Contester une amende radar — Guide complet 2026",
      description:
        "Guide complet pour contester une amende radar en France. D\u00e9lai, motifs, d\u00e9marches ANTAI.",
      url: "https://conteste.app/guides/contester-amende-radar",
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
      name: "Comment contester une amende radar sur ANTAI",
      step: [
        { "@type": "HowToStep", position: 1, name: "Acc\u00e9der \u00e0 ANTAI", text: "Rendez-vous sur www.antai.gouv.fr" },
        { "@type": "HowToStep", position: 2, name: "Saisir le num\u00e9ro d'avis", text: "Entrez le num\u00e9ro figurant sur votre amende" },
        { "@type": "HowToStep", position: 3, name: "S\u00e9lectionner le motif", text: "Choisissez le motif de contestation adapt\u00e9" },
        { "@type": "HowToStep", position: 4, name: "R\u00e9diger l'argumentaire", text: "Exposez les raisons de votre contestation" },
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
            Chaque ann\u00e9e, des millions d&apos;amendes radar sont \u00e9mises en France. Une fraction
            significative est contestable. <strong>D\u00e9lai : 45 jours. Montant forfaitaire :
            135&nbsp;&euro;. Retrait : 1 \u00e0 6 points selon l&apos;exc\u00e8s.</strong>
          </p>
        </div>

        {/* En r\u00e9sum\u00e9 */}
        <section className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">En r\u00e9sum\u00e9</h2>
          <ul className="space-y-2 text-body text-gris-texte">
            <li className="flex gap-2">
              <span className="text-bleu-france font-bold flex-shrink-0">&bull;</span>
              <span>Vous avez <strong>45 jours</strong> pour contester une amende radar, \u00e0 compter de la date d&apos;envoi de l&apos;avis</span>
            </li>
            <li className="flex gap-2">
              <span className="text-bleu-france font-bold flex-shrink-0">&bull;</span>
              <span>Le montant forfaitaire est de <strong>135&nbsp;&euro;</strong> (minor\u00e9 \u00e0 90&nbsp;&euro; si paiement sous 15 jours)</span>
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
              <span>Les motifs les plus solides : <strong>panneau masqu\u00e9, erreur de plaque, v\u00e9hicule vendu, marge technique</strong></span>
            </li>
          </ul>
        </section>

        {/* Les diff\u00e9rents types de radars */}
        <section className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">Les diff\u00e9rents types de radars en France</h2>
          <div className="space-y-3 text-body text-gris-texte">
            <p>
              La France compte plusieurs types de radars automatiques : les radars fixes, les radars
              mobiles embarqu\u00e9s, les radars de vitesse moyenne (tron\u00e7ons), les radars tourelles
              et les voitures-radars. Chacun a ses sp\u00e9cificit\u00e9s techniques qui peuvent
              constituer des motifs de contestation.
            </p>
            <p>
              Les <strong>radars fixes</strong> doivent obligatoirement \u00eatre signal\u00e9s par un panneau
              en amont. Si ce panneau est absent, masqu\u00e9 par la v\u00e9g\u00e9tation ou illisible,
              c&apos;est un motif de contestation solide (article R411-25 du Code de la route).
            </p>
            <p>
              Les <strong>radars mobiles</strong> sont install\u00e9s dans des v\u00e9hicules banalis\u00e9s.
              Ils doivent \u00e9galement respecter des r\u00e8gles strictes de calibration et de positionnement.
            </p>
            <p>
              Les <strong>radars tron\u00e7ons</strong> mesurent la vitesse moyenne entre deux points.
              La marge technique s&apos;applique \u00e9galement \u00e0 ce type de radar.
            </p>
          </div>
        </section>

        {/* Motifs d\u00e9taill\u00e9s */}
        <section className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">Les 4 motifs de contestation les plus efficaces</h2>

          <div className="space-y-4">
            <div className="bg-white border border-gris-bordure border-l-4 border-l-bleu-france rounded-card p-6">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-h3 text-gris-titre">1. Panneau de signalisation masqu\u00e9 ou absent</h3>
                <span className="bg-vert-fond text-vert-succes text-badge px-3 py-1 rounded-pill flex-shrink-0">Fort</span>
              </div>
              <p className="text-body text-gris-texte mb-2">
                L&apos;article R411-25 du Code de la route impose que les dispositifs de contr\u00f4le
                soient signal\u00e9s. Si le panneau d&apos;avertissement est masqu\u00e9 par la v\u00e9g\u00e9tation,
                un camion, ou tout autre obstacle, la verbalisation peut \u00eatre annul\u00e9e.
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
                Si le num\u00e9ro de plaque indiqu\u00e9 sur l&apos;avis ne correspond pas \u00e0 votre v\u00e9hicule,
                c&apos;est un motif de contestation irr\u00e9futable. Joignez une copie de votre carte grise.
              </p>
              <p className="text-[13px] text-gris-mention">
                R\u00e9f\u00e9rence : article A9 du Code de proc\u00e9dure p\u00e9nale.
              </p>
            </div>

            <div className="bg-white border border-gris-bordure border-l-4 border-l-bleu-france rounded-card p-6">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-h3 text-gris-titre">3. V\u00e9hicule vendu avant la date de l&apos;infraction</h3>
                <span className="bg-vert-fond text-vert-succes text-badge px-3 py-1 rounded-pill flex-shrink-0">Fort</span>
              </div>
              <p className="text-body text-gris-texte mb-2">
                Si vous avez vendu votre v\u00e9hicule avant la date de l&apos;infraction, vous n&apos;\u00eates pas
                responsable. Joignez le certificat de cession (Cerfa n\u00b015776) et la d\u00e9claration
                de cession enregistr\u00e9e sur le site de l&apos;ANTS.
              </p>
              <p className="text-[13px] text-gris-mention">
                R\u00e9f\u00e9rence : article R322-4 du Code de la route.
              </p>
            </div>

            <div className="bg-white border border-gris-bordure border-l-4 border-l-bleu-france rounded-card p-6">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-h3 text-gris-titre">4. Marge technique du radar</h3>
                <span className="bg-score-moyen-fond text-score-moyen-texte text-badge px-3 py-1 rounded-pill flex-shrink-0">Moyen</span>
              </div>
              <p className="text-body text-gris-texte mb-2">
                La marge technique est la tol\u00e9rance appliqu\u00e9e \u00e0 la mesure du radar :
                5 km/h pour les vitesses &lt; 100 km/h, 5% au-del\u00e0. Si la vitesse retenue apr\u00e8s
                marge est tr\u00e8s proche du seuil de verbalisation, c&apos;est un argument recevable.
              </p>
              <p className="text-[13px] text-gris-mention">
                R\u00e9f\u00e9rence : arr\u00eat\u00e9 du 4 juin 2009 relatif aux cin\u00e9mom\u00e8tres.
              </p>
            </div>
          </div>
        </section>

        {/* D\u00e9marche \u00e9tape par \u00e9tape */}
        <section className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">D\u00e9marche de contestation \u00e9tape par \u00e9tape</h2>
          <div className="space-y-4">
            {[
              {
                n: 1,
                title: "V\u00e9rifiez votre \u00e9ligibilit\u00e9",
                text: "Assurez-vous que le d\u00e9lai de 45 jours n'est pas d\u00e9pass\u00e9 et que vous n'avez pas d\u00e9j\u00e0 pay\u00e9 l'amende. Le paiement vaut reconnaissance de l'infraction.",
              },
              {
                n: 2,
                title: "Rassemblez vos preuves",
                text: "Photos du lieu (panneau masqu\u00e9, signalisation absente), copie de carte grise, certificat de cession, ou tout document prouvant votre motif de contestation.",
              },
              {
                n: 3,
                title: "Connectez-vous \u00e0 ANTAI",
                text: "Rendez-vous sur www.antai.gouv.fr et cliquez sur \"D\u00e9signer ou Contester\". Munissez-vous de votre avis de contravention.",
              },
              {
                n: 4,
                title: "Remplissez le formulaire de contestation",
                text: "Saisissez votre num\u00e9ro d'avis, s\u00e9lectionnez le motif de contestation, r\u00e9digez votre argumentaire en \u00e9tant pr\u00e9cis et factuel.",
              },
              {
                n: 5,
                title: "Joignez vos pi\u00e8ces justificatives",
                text: "T\u00e9l\u00e9chargez vos photos et documents. Plus vos preuves sont solides, meilleures sont vos chances.",
              },
              {
                n: 6,
                title: "Attendez la r\u00e9ponse",
                text: "Le d\u00e9lai de traitement moyen est de 45 jours. Vous recevrez un courrier de l'Officier du Minist\u00e8re Public vous informant de la d\u00e9cision.",
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

        {/* R\u00e9f\u00e9rences */}
        <section className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">R\u00e9f\u00e9rences l\u00e9gales</h2>
          <ul className="space-y-2 text-body text-gris-texte">
            <li>
              <a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006842108" target="_blank" rel="noopener noreferrer" className="text-bleu-france underline">
                Article R411-25 du Code de la route
              </a>{" "}
              &mdash; signalisation des dispositifs de contr\u00f4le
            </li>
            <li>
              <a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000039278004" target="_blank" rel="noopener noreferrer" className="text-bleu-france underline">
                Article R322-4 du Code de la route
              </a>{" "}
              &mdash; d\u00e9claration de cession de v\u00e9hicule
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

        {/* Guides par d\u00e9partement */}
        <section className="mb-8">
          <h2 className="text-h2 text-gris-titre mb-4">Consultez aussi</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <Link href="/guides/radar" className="text-bleu-france hover:underline text-body">
              Guide complet : amende radar par d\u00e9partement &rarr;
            </Link>
            <Link href="/guides/feux-rouges" className="text-bleu-france hover:underline text-body">
              Contester une amende feu rouge &rarr;
            </Link>
            <Link href="/guides/delai-contestation-amende" className="text-bleu-france hover:underline text-body">
              D\u00e9lais de contestation d&apos;amende &rarr;
            </Link>
            <Link href="/guides/antai-comment-contester" className="text-bleu-france hover:underline text-body">
              ANTAI : comment contester en ligne &rarr;
            </Link>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-bleu-fond rounded-card p-8 text-center">
          <h2 className="text-h2 text-gris-titre mb-3">
            Vous avez re\u00e7u une amende radar ?
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
