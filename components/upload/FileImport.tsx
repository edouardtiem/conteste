"use client";

import { useRef, useCallback } from "react";

interface FileImportProps {
  onImport: (file: File) => void;
}

export function FileImport({ onImport }: FileImportProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onImport(file);
      }
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
    [onImport]
  );

  return (
    <label className="flex flex-col items-center justify-center gap-2 cursor-pointer border-2 border-dashed border-gris-bordure rounded-card p-4 min-h-[120px] min-w-0 flex-1 hover:border-bleu-france hover:bg-bleu-fond transition-colors">
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gris-mention"
        aria-hidden="true"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <line x1="9" y1="15" x2="12" y2="12" />
        <line x1="15" y1="15" x2="12" y2="12" />
      </svg>
      <span className="text-[15px] font-bold text-gris-titre text-center">
        Importer un fichier
      </span>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,application/pdf"
        onChange={handleChange}
        className="hidden"
      />
    </label>
  );
}
