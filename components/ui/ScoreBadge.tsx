import type { ScoreNiveau } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ScoreBadgeProps {
  score: number;
  niveau: ScoreNiveau;
}

const niveauConfig: Record<
  ScoreNiveau,
  { bg: string; text: string; label: string }
> = {
  fort: {
    bg: "bg-vert-fond",
    text: "text-vert-succes",
    label: "Chances elevees",
  },
  moyen: {
    bg: "bg-score-moyen-fond",
    text: "text-score-moyen-texte",
    label: "Chances moderees",
  },
  faible: {
    bg: "bg-orange-fond",
    text: "text-orange-warning",
    label: "Chances faibles",
  },
};

export function ScoreBadge({ score, niveau }: ScoreBadgeProps) {
  const config = niveauConfig[niveau];

  return (
    <span
      className={cn(
        config.bg,
        config.text,
        "text-[13px] font-bold px-4 py-2 rounded-pill inline-flex items-center gap-2"
      )}
    >
      {score}/100 — {config.label}
    </span>
  );
}
