import type { ArgumentPack } from "@/lib/types";

interface ArgumentCardProps {
  argument: ArgumentPack;
  index: number;
}

export function ArgumentCard({ argument, index }: ArgumentCardProps) {
  return (
    <div className="bg-white border border-gris-bordure border-l-4 border-l-bleu-france rounded-card p-6">
      <h3 className="text-h3 text-gris-titre mb-3">
        {index + 1}. {argument.titre}
      </h3>
      <p className="text-body text-gris-texte mb-4">{argument.explication}</p>

      <div
        className="rounded p-3 mb-3"
        style={{ backgroundColor: "var(--bleu-fond)" }}
      >
        <p
          className="text-[12px] font-bold uppercase tracking-wide mb-1"
          style={{ color: "var(--bleu-france)" }}
        >
          A mentionner
        </p>
        <p className="text-[14px] text-gris-texte">{argument.aMentionner}</p>
      </div>

      <div className="bg-orange-fond rounded p-3">
        <p className="text-[12px] font-bold text-orange-warning uppercase tracking-wide mb-1">
          A eviter
        </p>
        <p className="text-[14px] text-gris-texte">{argument.aEviter}</p>
      </div>
    </div>
  );
}
