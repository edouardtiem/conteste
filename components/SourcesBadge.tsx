const sources = [
  {
    label: "Légifrance",
    href: "https://www.legifrance.gouv.fr",
  },
  {
    label: "ANTAI",
    href: "https://www.antai.gouv.fr",
  },
  {
    label: "Service-public.fr",
    href: "https://www.service-public.fr",
  },
] as const;

export default function SourcesBadge() {
  return (
    <div className="flex flex-wrap gap-2">
      {sources.map((source) => (
        <a
          key={source.label}
          href={source.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[12px] text-gris-mention bg-[#F6F6F6] border border-gris-bordure rounded-full px-3 py-1 hover:text-bleu-france hover:border-bleu-france transition-colors"
        >
          {source.label}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3 h-3"
            aria-hidden="true"
          >
            <path d="M3.5 1.5h7v7" />
            <path d="M10.5 1.5 1.5 10.5" />
          </svg>
        </a>
      ))}
    </div>
  );
}
