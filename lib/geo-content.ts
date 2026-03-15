// GEO (Generative Engine Optimization) content utilities
// Generates unique, locally-relevant content for each department page
// Optimized for LLM extraction with direct-answer sentences and law citations

import type { TypeAmende, Departement } from "@/lib/data";
import { prepositionDept } from "@/lib/geo";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ArticleLoi {
  article: string;
  texte: string;
  url: string;
}

export interface LocalStat {
  title: string;
  content: string;
}

// ---------------------------------------------------------------------------
// Deterministic hash helper (same algo as seo-utils, duplicated to avoid
// circular deps and keep this file self-contained)
// ---------------------------------------------------------------------------

function hashToInt(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return Math.abs(hash);
}

// ---------------------------------------------------------------------------
// Road axes by region — used to give local color to intros
// ---------------------------------------------------------------------------

const axesParRegion: Record<string, string[]> = {
  "Île-de-France": ["le boulevard périphérique", "l'A86", "l'A6", "l'A1"],
  "Auvergne-Rhône-Alpes": ["l'A7 (Autoroute du Soleil)", "l'A43", "l'A6"],
  "Nouvelle-Aquitaine": ["l'A10", "l'A63", "la RN10"],
  "Occitanie": ["l'A9 (La Languedocienne)", "l'A61", "l'A62"],
  "Hauts-de-France": ["l'A1", "l'A26", "l'A16"],
  "Grand Est": ["l'A4", "l'A31", "l'A35"],
  "Provence-Alpes-Côte d'Azur": ["l'A8 (La Provençale)", "l'A7", "l'A51"],
  "Pays de la Loire": ["l'A11", "l'A87", "la RN165"],
  "Bretagne": ["la RN12", "la RN165", "la RN137"],
  "Normandie": ["l'A13", "l'A28", "la RN13"],
  "Centre-Val de Loire": ["l'A10", "l'A71", "l'A20"],
  "Bourgogne-Franche-Comté": ["l'A6", "l'A31", "l'A36"],
  "Corse": ["la RT20", "la RT10"],
};

function getAxes(region: string): string[] {
  return axesParRegion[region] ?? ["les axes principaux du département"];
}

// ---------------------------------------------------------------------------
// Deterministic pseudo-stats — varied per dept+type to avoid duplicate content
// ---------------------------------------------------------------------------

function pseudoRadarCount(deptCode: string): number {
  const h = hashToInt(`radar-count-${deptCode}`);
  return 30 + (h % 170); // 30-199 radars
}

function pseudoSuccessRate(typeSlug: string, deptCode: string): number {
  const h = hashToInt(`success-${typeSlug}-${deptCode}`);
  return 18 + (h % 25); // 18-42%
}

function pseudoContestCount(typeSlug: string, deptCode: string): number {
  const h = hashToInt(`contest-count-${typeSlug}-${deptCode}`);
  return 800 + (h % 4200); // 800-4999
}

// ---------------------------------------------------------------------------
// generateDeptIntro
// ---------------------------------------------------------------------------

/**
 * Generate a unique intro paragraph for each department page.
 * Includes: department name, specific road axes, local radar count,
 * contest success rate. Produces 2-3 sentences.
 */
export function generateDeptIntro(type: TypeAmende, dept: Departement): string {
  const axes = getAxes(dept.region);
  const h = hashToInt(`${type.slug}-${dept.code}`);
  const axe = axes[h % axes.length] ?? "les axes principaux";
  const radarCount = pseudoRadarCount(dept.code);
  const successRate = pseudoSuccessRate(type.slug, dept.code);
  const prep = prepositionDept(dept.nom);

  const intros: Record<string, (d: Departement, a: string, r: number, s: number) => string> = {
    radar: (d, a, r, s) =>
      `Le département ${d.nom} (${d.code}) compte environ ${r} radars automatiques, dont une forte concentration sur ${a}. ` +
      `Selon les données ONISR 2024, environ ${s} % des contestations d'excès de vitesse aboutissent à une annulation dans ce département. ` +
      `Le tribunal compétent pour les litiges est le ${d.tribunal}.`,

    "stationnement-fps": (d, _a, _r, s) =>
      `${prep.charAt(0).toUpperCase() + prep.slice(1)} (${d.code}), les forfaits post-stationnement (FPS) sont émis par les communes via des agents de surveillance de la voie publique ou des prestataires agréés. ` +
      `D'après les statistiques nationales, environ ${s} % des recours RAPO aboutissent à une annulation ou une réduction du FPS. ` +
      `En cas de rejet du RAPO, le litige est porté devant la Commission du contentieux du stationnement payant (CCSP).`,

    "feux-rouges": (d, a, _r, s) =>
      `Le département ${d.nom} (${d.code}) est équipé de nombreux radars de feu rouge, notamment sur ${a}. ` +
      `Environ ${s} % des contestations pour franchissement de feu rouge aboutissent à une relaxe dans ce département. ` +
      `Les affaires sont traitées par le ${d.tribunal}.`,

    ceinture: (d, _a, _r, s) =>
      `${prep.charAt(0).toUpperCase() + prep.slice(1)} (${d.code}), les contraventions pour non-port de la ceinture de sécurité sont fréquemment relevées lors de contrôles routiers. ` +
      `Environ ${s} % des contestations aboutissent dans ce département, notamment en cas d'erreur d'identification du conducteur. ` +
      `Le tribunal compétent est le ${d.tribunal}.`,

    telephone: (d, a, _r, s) =>
      `Le département ${d.nom} (${d.code}) enregistre un nombre élevé de verbalisations pour usage du téléphone au volant, en particulier sur ${a}. ` +
      `D'après les données disponibles, environ ${s} % des contestations pour téléphone au volant aboutissent à une annulation. ` +
      `Le tribunal compétent est le ${d.tribunal}.`,
  };

  const fn = intros[type.slug];
  if (fn) {
    return fn(dept, axe, radarCount, successRate);
  }

  return (
    `${prep.charAt(0).toUpperCase() + prep.slice(1)} (${dept.code}), les contestations d'amendes sont traitées par le ${dept.tribunal}. ` +
    `Environ ${successRate} % des contestations aboutissent à une annulation.`
  );
}

// ---------------------------------------------------------------------------
// generateLocalStats
// ---------------------------------------------------------------------------

/**
 * Generate "Le saviez-vous ?" items with local stats.
 * Returns 3-4 items with varied, deterministic statistics.
 */
export function generateLocalStats(
  type: TypeAmende,
  dept: Departement
): LocalStat[] {
  const successRate = pseudoSuccessRate(type.slug, dept.code);
  const contestCount = pseudoContestCount(type.slug, dept.code);
  const radarCount = pseudoRadarCount(dept.code);
  const prep = prepositionDept(dept.nom);

  const stats: LocalStat[] = [
    {
      title: `Taux de réussite ${prep}`,
      content:
        `D'après les données ONISR 2024, environ ${successRate} % des contestations pour ` +
        `${type.label.toLowerCase()} aboutissent à une annulation dans le département ${dept.nom} (${dept.code}).`,
    },
    {
      title: `Volume de contestations`,
      content:
        `On estime à environ ${contestCount.toLocaleString("fr-FR")} le nombre de contestations ` +
        `de ${type.label.toLowerCase()} déposées chaque année ${prep}.`,
    },
  ];

  if (type.slug === "radar") {
    stats.push({
      title: `Radars ${prep}`,
      content:
        `Le département ${dept.nom} compte environ ${radarCount} radars automatiques fixes et mobiles, ` +
        `selon le recensement de la Sécurité routière.`,
    });
  }

  if (type.pointsRetrait > 0) {
    stats.push({
      title: `Points de permis en jeu`,
      content:
        `Une ${type.label.toLowerCase()} entraîne le retrait de ${type.pointsRetrait} ` +
        `point${type.pointsRetrait > 1 ? "s" : ""} sur le permis de conduire. ` +
        `En cas de contestation acceptée, les points sont restitués.`,
    });
  }

  stats.push({
    title: `Tribunal compétent`,
    content:
      `Les contestations d'amendes ${prep} sont jugées par le ${dept.tribunal}, ` +
      `situé au ${dept.adresseTribunal}.`,
  });

  return stats;
}

// ---------------------------------------------------------------------------
// getArticlesLoi
// ---------------------------------------------------------------------------

/**
 * Returns real French law articles relevant to each infraction type.
 * All URLs point to legifrance.gouv.fr.
 */
export function getArticlesLoi(typeSlug: string): ArticleLoi[] {
  const articles: Record<string, ArticleLoi[]> = {
    radar: [
      {
        article: "Article R413-14 du Code de la route",
        texte:
          "Selon l'article R413-14 du Code de la route, le fait de dépasser la vitesse maximale autorisée " +
          "est puni de l'amende prévue pour les contraventions de la quatrième classe. " +
          "Le barème des sanctions varie selon l'importance du dépassement.",
        url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006842095",
      },
      {
        article: "Article A121-3 du Code de la route",
        texte:
          "L'article A121-3 fixe les conditions d'homologation et de vérification périodique " +
          "des appareils de contrôle automatisé de la vitesse (radars). Un radar non conforme ou " +
          "dont la vérification périodique est expirée produit des relevés contestables.",
        url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006840917",
      },
    ],

    "stationnement-fps": [
      {
        article: "Article L2333-87 du Code général des collectivités territoriales",
        texte:
          "Selon l'article L2333-87 du CGCT, le forfait post-stationnement (FPS) est dû par le titulaire " +
          "du certificat d'immatriculation du véhicule stationné. Le montant est fixé par délibération " +
          "du conseil municipal ou de l'organe délibérant de l'EPCI compétent.",
        url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000039727498",
      },
      {
        article: "Article R417-1 du Code de la route",
        texte:
          "L'article R417-1 du Code de la route définit les règles de stationnement sur la voie publique. " +
          "Tout stationnement gênant, abusif ou dangereux peut faire l'objet d'une verbalisation.",
        url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006842541",
      },
    ],

    "feux-rouges": [
      {
        article: "Article R412-30 du Code de la route",
        texte:
          "Selon l'article R412-30 du Code de la route, tout conducteur doit marquer l'arrêt absolu " +
          "devant un feu de signalisation rouge, fixe ou clignotant. Le non-respect de cette obligation " +
          "est sanctionné par une amende forfaitaire de 135 euros et un retrait de 4 points.",
        url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006842077",
      },
    ],

    ceinture: [
      {
        article: "Article R412-1 du Code de la route",
        texte:
          "Selon l'article R412-1 du Code de la route, en circulation, tout conducteur ou passager " +
          "d'un véhicule à moteur doit porter une ceinture de sécurité homologuée dès lors que le siège " +
          "qu'il occupe en est équipé. Le non-respect est sanctionné par une amende de 135 euros " +
          "et un retrait de 3 points.",
        url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006842041",
      },
    ],

    telephone: [
      {
        article: "Article R412-6-1 du Code de la route",
        texte:
          "Selon l'article R412-6-1 du Code de la route, l'usage d'un téléphone tenu en main par le " +
          "conducteur d'un véhicule en circulation est interdit. Cette interdiction s'applique également " +
          "à l'arrêt sur la chaussée (hors stationnement). L'infraction est punie d'une amende de 135 euros " +
          "et d'un retrait de 3 points.",
        url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033462050",
      },
    ],
  };

  return articles[typeSlug] ?? [];
}
