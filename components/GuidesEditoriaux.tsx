import Link from "next/link";

const GUIDES = [
  {
    href: "/guides/contester-amende-radar",
    title: "Contester une amende radar",
    description: "Démarches, délais et motifs pour contester un excès de vitesse.",
  },
  {
    href: "/guides/delai-contestation-amende",
    title: "Délai de contestation d'une amende",
    description: "Tout savoir sur les délais légaux pour contester.",
  },
  {
    href: "/guides/antai-comment-contester",
    title: "ANTAI : comment contester en ligne",
    description: "Guide pas-à-pas pour contester sur le site de l'ANTAI.",
  },
  {
    href: "/guides/contester-amende-france",
    title: "Contester une amende en France",
    description: "Guide complet de la contestation d'amende en France.",
  },
];

export function GuidesEditoriaux() {
  return (
    <section className="mb-8">
      <h2 className="text-h2 text-gris-titre mb-4">Guides pratiques</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {GUIDES.map((guide) => (
          <Link
            key={guide.href}
            href={guide.href}
            className="bg-white border border-gris-bordure hover:border-bleu-france rounded-card p-4 transition-colors group"
          >
            <span className="text-[14px] font-bold text-bleu-france group-hover:underline">
              {guide.title}
            </span>
            <span className="block text-[13px] text-gris-mention mt-1">
              {guide.description}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
