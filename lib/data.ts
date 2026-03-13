// Data layer — loads JSON files for SEO pages (static generation only)

import typesData from "@/data/types.json";
import departementsData from "@/data/departements.json";
import motifsData from "@/data/motifs.json";

// --- Types ---

export interface TypeAmende {
  slug: string;
  label: string;
  portail: "antai" | "commune";
  delaiJours: number;
  montantForfaitaire: number;
  pointsRetrait: number;
  motifsPrincipaux: string[];
  description: string;
}

export interface Departement {
  code: string;
  nom: string;
  region: string;
  tribunal: string;
  adresseTribunal: string;
  portailCommune: string | null;
}

export interface Motif {
  label: string;
  force: "fort" | "moyen";
  description: string;
  articleCode: string;
}

export type MotifsMap = Record<string, Motif>;

// --- Loaders ---

export function getTypes(): TypeAmende[] {
  return typesData as TypeAmende[];
}

export function getTypeBySlug(slug: string): TypeAmende | undefined {
  return getTypes().find((t) => t.slug === slug);
}

export function getDepartements(): Departement[] {
  return departementsData as Departement[];
}

export function getDepartementByCode(code: string): Departement | undefined {
  return getDepartements().find((d) => d.code === code);
}

export function getMotifs(): MotifsMap {
  return motifsData as MotifsMap;
}

export function getMotifsByKeys(keys: string[]): Array<Motif & { slug: string }> {
  const allMotifs = getMotifs();
  return keys
    .map((key) => {
      const motif = allMotifs[key];
      if (!motif) return null;
      return { ...motif, slug: key };
    })
    .filter((m): m is Motif & { slug: string } => m !== null);
}

// --- FAQ generators ---

export function generateTypeFaq(type: TypeAmende): Array<{ question: string; answer: string }> {
  const portailNom = type.portail === "antai" ? "ANTAI" : "le portail de votre commune";
  return [
    {
      question: `Quel est le d\u00e9lai pour contester une ${type.label.toLowerCase()} ?`,
      answer: `Le d\u00e9lai l\u00e9gal pour contester une ${type.label.toLowerCase()} est de ${type.delaiJours} jours \u00e0 compter de la date d'envoi de l'avis de contravention. Pass\u00e9 ce d\u00e9lai, la contestation n'est plus recevable.`,
    },
    {
      question: `Combien co\u00fbte une ${type.label.toLowerCase()} ?`,
      answer: `Le montant forfaitaire d'une ${type.label.toLowerCase()} est de ${type.montantForfaitaire}\u00a0\u20ac. Ce montant peut \u00eatre minor\u00e9 en cas de paiement rapide ou major\u00e9 en cas de retard.`,
    },
    {
      question: `Combien de points perd-on pour une ${type.label.toLowerCase()} ?`,
      answer: type.pointsRetrait > 0
        ? `Une ${type.label.toLowerCase()} entra\u00eene le retrait de ${type.pointsRetrait} point${type.pointsRetrait > 1 ? "s" : ""} sur le permis de conduire.`
        : `Une ${type.label.toLowerCase()} n'entra\u00eene aucun retrait de points sur le permis de conduire.`,
    },
    {
      question: `O\u00f9 contester une ${type.label.toLowerCase()} en ligne ?`,
      answer: `La contestation se fait en ligne sur ${portailNom}. Vous devez vous munir de votre avis de contravention et des pi\u00e8ces justificatives n\u00e9cessaires.`,
    },
    {
      question: `Quels sont les motifs recevables pour contester une ${type.label.toLowerCase()} ?`,
      answer: `Les motifs les plus fr\u00e9quents sont : ${type.motifsPrincipaux.map((m) => {
        const motif = getMotifs()[m];
        return motif ? motif.label.toLowerCase() : m;
      }).join(", ")}. Chaque motif doit \u00eatre appuy\u00e9 par des \u00e9l\u00e9ments de preuve.`,
    },
  ];
}

export function generateDeptFaq(
  type: TypeAmende,
  dept: Departement
): Array<{ question: string; answer: string }> {
  const portailNom = type.portail === "antai" ? "ANTAI" : "le portail de la commune";
  return [
    {
      question: `Comment contester une ${type.label.toLowerCase()} dans le ${dept.nom} (${dept.code}) ?`,
      answer: `Pour contester une ${type.label.toLowerCase()} dans le ${dept.nom}, vous devez adresser votre requête via ${portailNom} dans un d\u00e9lai de ${type.delaiJours} jours. Le tribunal comp\u00e9tent est le ${dept.tribunal}.`,
    },
    {
      question: `Quel tribunal est comp\u00e9tent dans le ${dept.nom} ?`,
      answer: `Le tribunal comp\u00e9tent pour les contestations d'amendes dans le ${dept.nom} est le ${dept.tribunal}, situ\u00e9 au ${dept.adresseTribunal}.`,
    },
    {
      question: `Quel est le d\u00e9lai de contestation dans le ${dept.nom} ?`,
      answer: `Le d\u00e9lai de contestation est le m\u00eame sur tout le territoire fran\u00e7ais : ${type.delaiJours} jours \u00e0 compter de la r\u00e9ception de l'avis pour une ${type.label.toLowerCase()}.`,
    },
    {
      question: `Faut-il payer l'amende avant de contester dans le ${dept.nom} ?`,
      answer: `Non, vous ne devez pas payer l'amende avant de contester. Le paiement vaut reconnaissance de l'infraction. Vous pouvez en revanche \u00eatre amen\u00e9 \u00e0 consigner le montant de l'amende, ce qui est diff\u00e9rent du paiement.`,
    },
    {
      question: `Quels sont les motifs de contestation les plus efficaces dans le ${dept.nom} ?`,
      answer: `Les motifs les plus fr\u00e9quemment invoqu\u00e9s pour une ${type.label.toLowerCase()} sont : ${type.motifsPrincipaux.map((m) => {
        const motif = getMotifs()[m];
        return motif ? motif.label.toLowerCase() : m;
      }).join(", ")}. L'efficacit\u00e9 d\u00e9pend des preuves que vous pouvez fournir.`,
    },
  ];
}

// --- Etapes de contestation ---

export function generateEtapes(type: TypeAmende): Array<{ numero: number; action: string; detail: string }> {
  if (type.portail === "antai") {
    return [
      { numero: 1, action: "Acc\u00e9dez au site de l'ANTAI", detail: "Rendez-vous sur www.antai.gouv.fr et cliquez sur \"D\u00e9signer / Contester\"." },
      { numero: 2, action: "Saisissez votre num\u00e9ro d'avis", detail: "Entrez le num\u00e9ro de l'avis de contravention figurant en haut \u00e0 droite de votre amende." },
      { numero: 3, action: "S\u00e9lectionnez le motif de contestation", detail: "Choisissez le motif le plus adapt\u00e9 \u00e0 votre situation parmi ceux propos\u00e9s." },
      { numero: 4, action: "R\u00e9digez votre argumentaire", detail: "Exposez clairement les raisons de votre contestation en vous appuyant sur des faits pr\u00e9cis." },
      { numero: 5, action: "Joignez vos pi\u00e8ces justificatives", detail: "Ajoutez toute preuve utile : photos, t\u00e9moignages, certificat de cession, documents m\u00e9dicaux." },
    ];
  }
  return [
    { numero: 1, action: "Identifiez l'autorit\u00e9 comp\u00e9tente", detail: "V\u00e9rifiez sur votre avis de contravention quelle commune a \u00e9mis le forfait post-stationnement." },
    { numero: 2, action: "Acc\u00e9dez au portail de contestation", detail: "Rendez-vous sur le portail en ligne de la commune ou de l'agglom\u00e9ration concern\u00e9e." },
    { numero: 3, action: "D\u00e9posez votre recours (RAPO)", detail: "Remplissez le formulaire de Recours Administratif Pr\u00e9alable Obligatoire en ligne." },
    { numero: 4, action: "R\u00e9digez votre argumentaire", detail: "Expliquez pr\u00e9cis\u00e9ment pourquoi le FPS n'est pas justifi\u00e9 (horodateur en panne, signalisation absente, etc.)." },
    { numero: 5, action: "Joignez vos pi\u00e8ces justificatives", detail: "Photos de l'horodateur, du marquage au sol, ticket de stationnement, etc." },
  ];
}
