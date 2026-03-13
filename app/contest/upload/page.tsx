import { UploadZone } from "@/components/upload/UploadZone";

export default function UploadPage() {
  return (
    <div className="container-flow py-8">
      <h1 className="text-h2 text-gris-titre mb-2">
        Importez votre avis de contravention
      </h1>
      <p className="text-body text-gris-mention mb-6">
        Prenez une photo ou importez le document depuis vos fichiers.
      </p>

      <UploadZone />

      <p className="text-[13px] text-gris-mention mt-4 text-center">
        JPG, PNG ou PDF — 10 Mo maximum
      </p>

      <p className="text-[12px] text-gris-mention mt-6 text-center">
        Vos donnees sont traitees de maniere securisee et supprimees sous 30
        jours.
      </p>
    </div>
  );
}
