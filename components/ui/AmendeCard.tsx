import type { AmendeExtracted } from "@/lib/types";
import { formatDateFR } from "@/lib/utils";

const TYPE_LABELS: Record<string, string> = {
  stationnement: "Stationnement",
  vitesse: "Exces de vitesse",
  feux: "Feux rouges",
  ceinture: "Ceinture de securite",
  telephone: "Telephone au volant",
  autre: "Autre infraction",
};

interface AmendeCardProps {
  amende: AmendeExtracted;
}

export function AmendeCard({ amende }: AmendeCardProps) {
  return (
    <div className="bg-white border border-gris-bordure rounded-card p-6">
      <h2 className="text-h3 text-gris-titre mb-4">Infraction</h2>
      <div className="space-y-3">
        <InfoRow
          label="Type d'infraction"
          value={TYPE_LABELS[amende.type] || amende.type}
        />
        <InfoRow
          label="Date"
          value={formatDateFR(amende.dateInfraction)}
        />
        <InfoRow label="Lieu" value={amende.lieuInfraction} />
        <InfoRow label="Numero d'avis" value={amende.numero} />
        <InfoRow label="Organisme" value={amende.organismeEmetteur} />
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start gap-4 py-2 border-b border-gris-bordure last:border-0">
      <span className="text-[14px] text-gris-mention shrink-0">{label}</span>
      <span className="text-body text-gris-titre font-bold text-right">
        {value}
      </span>
    </div>
  );
}
