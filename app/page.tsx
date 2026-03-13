import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="container-landing py-16">
      {/* Hero */}
      <section className="bg-bleu-fond rounded-card p-8 mb-12 text-center">
        <h1 className="text-h1-mobile md:text-h1-desktop text-gris-titre mb-4">
          Contestez votre amende en 60 secondes
        </h1>
        <p className="text-body text-gris-texte mb-8 max-w-[600px] mx-auto">
          Analysez gratuitement vos chances de succes. Si votre dossier est
          solide, obtenez vos arguments personnalises et un guide etape par
          etape pour contester via ANTAI.
        </p>
        <Link
          href="/contest/upload"
          className="inline-block bg-bleu-france text-white font-bold text-button px-8 py-[14px] rounded-button hover:bg-bleu-france-hover transition-colors min-h-[48px]"
        >
          Analyser mon amende gratuitement
        </Link>
        <p className="text-[14px] text-gris-mention mt-4">
          Score gratuit — Pack complet a 14,90 EUR
        </p>
      </section>

      {/* Comment ca marche */}
      <section className="mb-12">
        <h2 className="text-h2 text-gris-titre text-center mb-8">
          Comment ca marche
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: "1",
              title: "Photographiez votre amende",
              desc: "Prenez en photo votre avis de contravention ou importez le PDF.",
            },
            {
              step: "2",
              title: "Analyse instantanee",
              desc: "Notre systeme analyse vos chances de contestation en quelques secondes.",
            },
            {
              step: "3",
              title: "Contestez efficacement",
              desc: "Recevez vos arguments personnalises et un guide ANTAI pas a pas.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-white border border-gris-bordure rounded-card p-6 text-center"
            >
              <div className="w-[48px] h-[48px] bg-bleu-france text-white rounded-full flex items-center justify-center font-bold text-[20px] mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-h3 text-gris-titre mb-2">{item.title}</h3>
              <p className="text-body text-gris-texte">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reassurance */}
      <section className="bg-white border border-gris-bordure rounded-card p-8 mb-12">
        <h2 className="text-h2 text-gris-titre mb-6">
          Pourquoi contester ?
        </h2>
        <div className="space-y-4">
          {[
            "30 millions d'amendes emises chaque annee en France",
            "Une fraction significative est contestable avec les bons arguments",
            "La contestation via ANTAI est 100% gratuite — vous n'avez rien a perdre",
            "Delai legal : 45 jours pour contester",
          ].map((text, i) => (
            <div
              key={i}
              className="flex gap-2 items-start border-l-4 border-bleu-france pl-4"
            >
              <p className="text-body text-gris-texte">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="text-center">
        <Link
          href="/contest/upload"
          className="inline-block bg-bleu-france text-white font-bold text-button px-8 py-[14px] rounded-button hover:bg-bleu-france-hover transition-colors min-h-[48px]"
        >
          Analyser mon amende gratuitement
        </Link>
      </section>
    </div>
  );
}
