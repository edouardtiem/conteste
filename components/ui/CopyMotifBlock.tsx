"use client";

import { useState, useCallback } from "react";

interface CopyMotifBlockProps {
  motif: string;
}

export function CopyMotifBlock({ motif }: CopyMotifBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(motif);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback pour les navigateurs qui ne supportent pas clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = motif;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [motif]);

  return (
    <div className="border-2 border-bleu-france rounded-card p-6">
      <p className="text-[12px] font-bold text-bleu-france uppercase tracking-wide mb-3">
        Motif de contestation — a copier
      </p>
      <p className="text-body text-gris-texte italic mb-4 leading-relaxed">
        {motif}
      </p>
      <button
        onClick={handleCopy}
        className={`font-bold text-[14px] px-5 py-2.5 rounded-button transition-colors min-h-[44px] ${
          copied
            ? "bg-vert-succes text-white"
            : "bg-bleu-france text-white hover:bg-bleu-france-hover"
        }`}
      >
        {copied ? "\u2713 Copie !" : "\uD83D\uDCCB Copier le motif"}
      </button>
    </div>
  );
}
