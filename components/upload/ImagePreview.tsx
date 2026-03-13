"use client";

import { useMemo } from "react";

interface ImagePreviewProps {
  file: File;
  onRetry: () => void;
  onConfirm: () => void;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

export function ImagePreview({ file, onRetry, onConfirm }: ImagePreviewProps) {
  const isPdf = file.type === "application/pdf";

  const previewUrl = useMemo(() => {
    if (isPdf) return null;
    return URL.createObjectURL(file);
  }, [file, isPdf]);

  return (
    <div className="border border-gris-bordure rounded-card p-6">
      {isPdf ? (
        <div className="bg-gris-fond rounded-card p-8 text-center mb-4">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gris-mention mx-auto mb-3"
            aria-hidden="true"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
          <p className="text-[15px] font-bold text-gris-titre mb-1">
            Document PDF
          </p>
          <p className="text-[13px] text-gris-mention">
            {file.name} — {formatFileSize(file.size)}
          </p>
        </div>
      ) : (
        previewUrl && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={previewUrl}
            alt="Apercu de l'amende"
            className="w-full rounded-card mb-4 max-h-[300px] object-contain bg-gris-fond"
          />
        )
      )}

      <p className="text-[15px] text-gris-titre font-bold mb-4">
        {isPdf ? "Document pret pour l'analyse ?" : "Photo nette et lisible ?"}
      </p>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onRetry}
          className="flex-1 bg-white border border-gris-bordure text-gris-titre font-bold text-[16px] py-[14px] rounded-button hover:border-bleu-france hover:text-bleu-france transition-colors min-h-[48px]"
        >
          Recommencer
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="flex-1 bg-bleu-france text-white font-bold text-[16px] py-[14px] rounded-button hover:bg-bleu-france-hover transition-colors min-h-[48px]"
        >
          Analyser
        </button>
      </div>
    </div>
  );
}
