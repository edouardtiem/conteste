import Link from "next/link";

export default function AuthorBox() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Conteste.app",
    url: "https://conteste.app",
    description:
      "Outil d'aide à la contestation d'amendes pour les automobilistes français.",
    knowsAbout: [
      "Contestation d'amendes",
      "Code de la route",
      "Code de procédure pénale",
    ],
  };

  return (
    <aside className="bg-[#F6F6F6] border border-gris-bordure rounded-card p-5 mt-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-bleu-france rounded-full flex items-center justify-center text-white font-bold text-[13px] flex-shrink-0">
          C
        </div>
        <div>
          <p className="text-[14px] font-semibold text-gris-titre">
            Contenu vérifié par l&apos;équipe Conteste.app
          </p>
          <p className="text-[12px] text-gris-mention mt-1">
            Sources : Code de la route, Code de procédure pénale, données ANTAI
            et ONISR
          </p>
          <Link
            href="/a-propos"
            className="text-[12px] text-bleu-france hover:underline mt-1 inline-block"
          >
            En savoir plus sur notre méthodologie &rarr;
          </Link>
        </div>
      </div>
    </aside>
  );
}
