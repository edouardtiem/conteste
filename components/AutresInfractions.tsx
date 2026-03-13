import Link from "next/link";
import { getTypes } from "@/lib/data";

interface AutresInfractionsProps {
  currentDeptCode: string;
  currentDeptNom: string;
  currentType: string;
}

export function AutresInfractions({
  currentDeptCode,
  currentDeptNom,
  currentType,
}: AutresInfractionsProps) {
  const allTypes = getTypes();
  const otherTypes = allTypes.filter((t) => t.slug !== currentType);

  if (otherTypes.length === 0) return null;

  return (
    <section className="mb-8">
      <h2 className="text-h2 text-gris-titre mb-4">
        Autres infractions dans le {currentDeptNom}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {otherTypes.map((type) => (
          <Link
            key={type.slug}
            href={`/guides/${type.slug}/${currentDeptCode}`}
            className="bg-white border border-gris-bordure hover:border-bleu-france rounded-card p-4 transition-colors group"
          >
            <span className="text-[14px] font-bold text-bleu-france group-hover:underline">
              {type.label}
            </span>
            <span className="block text-[13px] text-gris-mention mt-1">
              Montant forfaitaire : {type.montantForfaitaire}&nbsp;&euro;
              {type.pointsRetrait > 0 && (
                <> — {type.pointsRetrait} point{type.pointsRetrait > 1 ? "s" : ""}</>
              )}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
