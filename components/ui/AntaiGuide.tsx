import type { GuideAntai } from "@/lib/types";

interface AntaiGuideProps {
  guide: GuideAntai;
}

export function AntaiGuide({ guide }: AntaiGuideProps) {
  return (
    <div className="bg-gris-fond rounded-card p-6">
      <h2 className="text-h2 text-gris-titre mb-4">
        Guide de contestation — {guide.portail === "antai" ? "ANTAI" : guide.portail === "commune" ? "Portail commune" : "Operateur"}
      </h2>

      <div className="space-y-4 mb-6">
        {guide.etapes.map((etape) => (
          <div
            key={etape.numero}
            className="bg-white rounded-card p-4 flex gap-4"
          >
            <div className="w-[28px] h-[28px] bg-bleu-france text-white rounded-full flex items-center justify-center font-bold text-[13px] flex-shrink-0 mt-0.5">
              {etape.numero}
            </div>
            <div>
              <p className="text-body font-bold text-gris-titre">
                {etape.action}
              </p>
              <p className="text-[14px] text-gris-mention mt-1">
                {etape.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      {guide.piecesJointes.length > 0 && (
        <div>
          <h3 className="text-h3 text-gris-titre mb-3">
            Pieces justificatives a joindre
          </h3>
          <ul className="space-y-2">
            {guide.piecesJointes.map((piece, i) => (
              <li key={i} className="flex gap-2 items-start">
                <span className="text-bleu-france font-bold">•</span>
                <span className="text-body text-gris-texte">{piece}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
