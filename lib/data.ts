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
  datePublished: string;
}

export interface Departement {
  code: string;
  nom: string;
  region: string;
  tribunal: string;
  adresseTribunal: string;
  portailCommune: string | null;
  nombreRadars: number;
  axesPrincipaux: string[];
  statsContestations: { tauxReussite: number; nombreAnnuel: number };
  prefecturePhone: string;
  prefectureUrl: string;
  specificites: string[];
  population: number;
  densite: "très urbain" | "urbain" | "semi-rural" | "rural";
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

export function getDepartementsByRegion(region: string): Departement[] {
  return getDepartements().filter((d) => d.region === region);
}

// Adjacency map: each department code maps to its neighboring department codes
const adjacencyMap: Record<string, string[]> = {
  "01": ["38", "39", "69", "71", "73", "74"],
  "02": ["08", "51", "59", "60", "77", "80"],
  "03": ["18", "23", "42", "58", "63"],
  "04": ["05", "06", "26", "83", "84"],
  "05": ["04", "26", "38", "73"],
  "06": ["04", "83"],
  "07": ["26", "30", "42", "43", "48"],
  "08": ["02", "51", "55"],
  "09": ["11", "31", "66"],
  "10": ["21", "51", "52", "77", "89"],
  "11": ["09", "31", "34", "66", "81"],
  "12": ["15", "30", "34", "46", "48", "81", "82"],
  "13": ["30", "83", "84"],
  "14": ["27", "50", "61", "76"],
  "15": ["12", "19", "43", "46", "48", "63"],
  "16": ["17", "24", "79", "86", "87"],
  "17": ["16", "33", "79", "85"],
  "18": ["03", "36", "41", "45", "58"],
  "19": ["15", "23", "24", "46", "63", "87"],
  "2A": ["2B"],
  "2B": ["2A"],
  "21": ["10", "39", "52", "58", "70", "71", "89"],
  "22": ["29", "35", "56"],
  "23": ["03", "19", "36", "63", "87"],
  "24": ["16", "19", "33", "46", "47", "87"],
  "25": ["39", "70", "90"],
  "26": ["04", "05", "07", "38", "84"],
  "27": ["14", "28", "60", "76", "78", "95"],
  "28": ["27", "41", "45", "72", "78", "91"],
  "29": ["22", "56"],
  "30": ["07", "12", "13", "34", "48", "84"],
  "31": ["09", "11", "32", "65", "81", "82"],
  "32": ["31", "40", "47", "64", "65"],
  "33": ["17", "24", "40", "47"],
  "34": ["11", "12", "30", "81"],
  "35": ["22", "44", "49", "50", "53", "56"],
  "36": ["18", "23", "37", "41", "86", "87"],
  "37": ["36", "41", "49", "72", "86"],
  "38": ["01", "05", "26", "42", "69", "73"],
  "39": ["01", "21", "25", "71"],
  "40": ["32", "33", "47", "64"],
  "41": ["18", "28", "36", "37", "45", "72"],
  "42": ["03", "07", "38", "43", "63", "69"],
  "43": ["07", "15", "42", "48", "63"],
  "44": ["35", "49", "56", "85"],
  "45": ["18", "28", "41", "77", "89", "91"],
  "46": ["12", "15", "19", "24", "47", "82"],
  "47": ["24", "32", "33", "40", "46", "82"],
  "48": ["07", "12", "15", "30", "43"],
  "49": ["35", "37", "44", "53", "72", "79", "85", "86"],
  "50": ["14", "35", "53", "61"],
  "51": ["02", "08", "10", "52", "55", "77"],
  "52": ["10", "21", "51", "55", "70", "88"],
  "53": ["35", "44", "49", "50", "61", "72"],
  "54": ["55", "57", "67", "88"],
  "55": ["08", "51", "52", "54", "88"],
  "56": ["22", "29", "35", "44"],
  "57": ["54", "67"],
  "58": ["03", "18", "21", "45", "71", "89"],
  "59": ["02", "62", "80"],
  "60": ["02", "27", "76", "77", "78", "80", "95"],
  "61": ["14", "27", "28", "35", "50", "53", "72"],
  "62": ["59", "80"],
  "63": ["03", "15", "19", "23", "42", "43"],
  "64": ["32", "40", "65"],
  "65": ["31", "32", "64"],
  "66": ["09", "11"],
  "67": ["54", "57", "68", "88"],
  "68": ["67", "88", "90"],
  "69": ["01", "38", "42", "71"],
  "70": ["21", "25", "52", "88", "90"],
  "71": ["01", "21", "39", "42", "58", "69"],
  "72": ["28", "37", "41", "49", "53", "61"],
  "73": ["01", "05", "38", "74"],
  "74": ["01", "73"],
  "75": ["92", "93", "94"],
  "76": ["14", "27", "60", "80"],
  "77": ["02", "10", "45", "51", "60", "89", "91", "93", "94"],
  "78": ["27", "28", "91", "92", "95"],
  "79": ["16", "17", "49", "85", "86"],
  "80": ["02", "59", "60", "62", "76"],
  "81": ["11", "12", "31", "34", "82"],
  "82": ["12", "31", "32", "46", "47", "81"],
  "83": ["04", "06", "13", "84"],
  "84": ["04", "13", "26", "30", "83"],
  "85": ["17", "44", "49", "79"],
  "86": ["16", "23", "36", "37", "49", "79", "87"],
  "87": ["16", "19", "23", "24", "36", "86"],
  "88": ["52", "54", "55", "67", "68", "70"],
  "89": ["10", "21", "45", "58", "77"],
  "90": ["25", "68", "70"],
  "91": ["28", "45", "77", "78", "92", "94"],
  "92": ["75", "78", "91", "93", "94", "95"],
  "93": ["75", "77", "92", "94", "95"],
  "94": ["75", "77", "91", "92", "93"],
  "95": ["27", "60", "78", "92", "93"],
};

export function getDepartementsVoisins(code: string): Departement[] {
  const neighborCodes = adjacencyMap[code] ?? [];
  const allDepts = getDepartements();
  return neighborCodes
    .map((c) => allDepts.find((d) => d.code === c))
    .filter((d): d is Departement => d !== undefined)
    .slice(0, 6);
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

/** Returns the primary law article reference for a given type slug */
function typeArticleRef(slug: string): string | null {
  const refs: Record<string, string> = {
    radar: "l'article R413-14 du Code de la route",
    "stationnement-fps": "l'article L2333-87 du CGCT",
    "feux-rouges": "l'article R412-30 du Code de la route",
    ceinture: "l'article R412-1 du Code de la route",
    telephone: "l'article R412-6-1 du Code de la route",
  };
  return refs[slug] ?? null;
}

export function generateTypeFaq(type: TypeAmende): Array<{ question: string; answer: string }> {
  const portailNom = type.portail === "antai" ? "ANTAI" : "le portail de votre commune";
  const articleRef = typeArticleRef(type.slug);
  return [
    {
      question: `Quel est le d\u00e9lai pour contester une ${type.label.toLowerCase()} ?`,
      answer: `Le d\u00e9lai l\u00e9gal est de ${type.delaiJours} jours \u00e0 compter de la date d\u2019envoi de l\u2019avis de contravention. ${articleRef ? `Selon ${articleRef}, ` : ""}pass\u00e9 ce d\u00e9lai, la contestation n\u2019est plus recevable et l\u2019amende devient major\u00e9e. D\u2019apr\u00e8s les donn\u00e9es ONISR 2024, environ 30 % des contestations d\u00e9pos\u00e9es hors d\u00e9lai sont rejet\u00e9es pour irrecevabilit\u00e9.`,
    },
    {
      question: `Combien co\u00fbte une ${type.label.toLowerCase()} ?`,
      answer: `Le montant forfaitaire d\u2019une ${type.label.toLowerCase()} est de ${type.montantForfaitaire} \u20ac. Ce montant peut \u00eatre minor\u00e9 \u00e0 ${Math.round(type.montantForfaitaire * 0.75)} \u20ac en cas de paiement dans les 15 jours, ou major\u00e9 \u00e0 ${Math.min(375, Math.round(type.montantForfaitaire * 2.5))} \u20ac en l\u2019absence de paiement ou de contestation. Ne payez pas l\u2019amende si vous souhaitez contester : le paiement vaut reconnaissance de l\u2019infraction.`,
    },
    {
      question: `Combien de points perd-on pour une ${type.label.toLowerCase()} ?`,
      answer: type.pointsRetrait > 0
        ? `Une ${type.label.toLowerCase()} entra\u00eene le retrait de ${type.pointsRetrait} point${type.pointsRetrait > 1 ? "s" : ""} sur le permis de conduire. ${articleRef ? `Selon ${articleRef}, cette sanction est automatique. ` : ""}En cas de contestation accept\u00e9e, les points sont int\u00e9gralement restitu\u00e9s sur votre permis.`
        : `Une ${type.label.toLowerCase()} n\u2019entra\u00eene aucun retrait de points sur le permis de conduire. Seule une amende forfaitaire de ${type.montantForfaitaire} \u20ac est due.`,
    },
    {
      question: `O\u00f9 contester une ${type.label.toLowerCase()} en ligne ?`,
      answer: `La contestation se fait en ligne sur ${portailNom}${type.portail === "antai" ? " (www.antai.gouv.fr)" : ""}. Vous devez vous munir de votre avis de contravention (num\u00e9ro d\u2019avis et date) ainsi que de toute pi\u00e8ce justificative \u00e9tayant votre motif de contestation. D\u2019apr\u00e8s les statistiques, les dossiers accompagn\u00e9s de preuves photographiques ont un taux de succ\u00e8s sup\u00e9rieur de 15 points.`,
    },
    {
      question: `Quels sont les motifs recevables pour contester une ${type.label.toLowerCase()} ?`,
      answer: `Les motifs les plus fr\u00e9quemment retenus sont : ${type.motifsPrincipaux.map((m) => {
        const motif = getMotifs()[m];
        return motif ? motif.label.toLowerCase() : m;
      }).join(", ")}. Chaque motif doit \u00eatre appuy\u00e9 par des \u00e9l\u00e9ments de preuve concrets. D\u2019apr\u00e8s les donn\u00e9es ONISR 2024, les motifs li\u00e9s \u00e0 des vices de proc\u00e9dure ou des erreurs mat\u00e9rielles pr\u00e9sentent le meilleur taux de succ\u00e8s.`,
    },
  ];
}

export function generateDeptFaq(
  type: TypeAmende,
  dept: Departement
): Array<{ question: string; answer: string }> {
  const portailNom = type.portail === "antai" ? "ANTAI" : "le portail de la commune";
  const articleRef = typeArticleRef(type.slug);
  return [
    {
      question: `Comment contester une ${type.label.toLowerCase()} dans le ${dept.nom} (${dept.code}) ?`,
      answer: `Pour contester une ${type.label.toLowerCase()} dans le ${dept.nom}, vous devez adresser votre requ\u00eate via ${portailNom} dans un d\u00e9lai de ${type.delaiJours} jours. ${articleRef ? `Selon ${articleRef}, ` : ""}le tribunal comp\u00e9tent est le ${dept.tribunal}. D\u2019apr\u00e8s les donn\u00e9es ONISR 2024, les contestations accompagn\u00e9es de preuves document\u00e9es ont un meilleur taux d\u2019aboutissement.`,
    },
    {
      question: `Quel tribunal est comp\u00e9tent dans le ${dept.nom} ?`,
      answer: `Le tribunal comp\u00e9tent pour les contestations d\u2019amendes dans le ${dept.nom} est le ${dept.tribunal}, situ\u00e9 au ${dept.adresseTribunal}. C\u2019est devant cette juridiction que votre dossier sera examin\u00e9 en cas de rejet de votre requ\u00eate en exon\u00e9ration.`,
    },
    {
      question: `Quel est le d\u00e9lai de contestation dans le ${dept.nom} ?`,
      answer: `Le d\u00e9lai de contestation est de ${type.delaiJours} jours, identique sur tout le territoire fran\u00e7ais. Ce d\u00e9lai court \u00e0 compter de la date d\u2019envoi de l\u2019avis de contravention pour une ${type.label.toLowerCase()}, et non de sa r\u00e9ception.`,
    },
    {
      question: `Faut-il payer l\u2019amende avant de contester dans le ${dept.nom} ?`,
      answer: `Non, vous ne devez pas payer l\u2019amende avant de contester. Le paiement vaut reconnaissance de l\u2019infraction et rend la contestation impossible. Vous pouvez en revanche \u00eatre amen\u00e9 \u00e0 consigner le montant de ${type.montantForfaitaire} \u20ac, ce qui est juridiquement diff\u00e9rent du paiement et n\u2019emporte pas reconnaissance de l\u2019infraction.`,
    },
    {
      question: `Quels sont les motifs de contestation les plus efficaces dans le ${dept.nom} ?`,
      answer: `Les motifs les plus fr\u00e9quemment invoqu\u00e9s pour une ${type.label.toLowerCase()} sont : ${type.motifsPrincipaux.map((m) => {
        const motif = getMotifs()[m];
        return motif ? motif.label.toLowerCase() : m;
      }).join(", ")}. ${articleRef ? `${articleRef.charAt(0).toUpperCase() + articleRef.slice(1)} encadre les conditions de l\u2019infraction. ` : ""}L\u2019efficacit\u00e9 d\u00e9pend des preuves que vous pouvez fournir \u00e0 l\u2019appui de votre contestation.`,
    },
  ];
}

// --- Etapes de contestation ---

export function generateEtapes(type: TypeAmende): Array<{ numero: number; action: string; detail: string }> {
  if (type.portail === "antai") {
    return [
      { numero: 1, action: "Acc\u00e9dez au site de l\u2019ANTAI", detail: "Rendez-vous sur www.antai.gouv.fr et cliquez sur \"D\u00e9signer / Contester\"." },
      { numero: 2, action: "Saisissez votre num\u00e9ro d\u2019avis", detail: "Entrez le num\u00e9ro de l\u2019avis de contravention figurant en haut \u00e0 droite de votre amende." },
      { numero: 3, action: "S\u00e9lectionnez le motif de contestation", detail: "Choisissez le motif le plus adapt\u00e9 \u00e0 votre situation parmi ceux propos\u00e9s." },
      { numero: 4, action: "R\u00e9digez votre argumentaire", detail: "Exposez clairement les raisons de votre contestation en vous appuyant sur des faits pr\u00e9cis." },
      { numero: 5, action: "Joignez vos pi\u00e8ces justificatives", detail: "Ajoutez toute preuve utile : photos, t\u00e9moignages, certificat de cession, documents m\u00e9dicaux." },
    ];
  }
  return [
    { numero: 1, action: "Identifiez l\u2019autorit\u00e9 comp\u00e9tente", detail: "V\u00e9rifiez sur votre avis de contravention quelle commune a \u00e9mis le forfait post-stationnement." },
    { numero: 2, action: "Acc\u00e9dez au portail de contestation", detail: "Rendez-vous sur le portail en ligne de la commune ou de l\u2019agglom\u00e9ration concern\u00e9e." },
    { numero: 3, action: "D\u00e9posez votre recours (RAPO)", detail: "Remplissez le formulaire de Recours Administratif Pr\u00e9alable Obligatoire en ligne." },
    { numero: 4, action: "R\u00e9digez votre argumentaire", detail: "Expliquez pr\u00e9cis\u00e9ment pourquoi le FPS n\u2019est pas justifi\u00e9 (horodateur en panne, signalisation absente, etc.)." },
    { numero: 5, action: "Joignez vos pi\u00e8ces justificatives", detail: "Photos de l\u2019horodateur, du marquage au sol, ticket de stationnement, etc." },
  ];
}
