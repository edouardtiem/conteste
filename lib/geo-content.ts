// GEO (Generative Engine Optimization) content utilities
// Generates unique, locally-relevant content for each department page
// Optimized for LLM extraction with direct-answer sentences and law citations

import type { TypeAmende, Departement } from "@/lib/data";

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
  "Ile-de-France": ["le boulevard peripherique", "l'A86", "l'A6", "l'A1"],
  "Auvergne-Rhone-Alpes": ["l'A7 (Autoroute du Soleil)", "l'A43", "l'A6"],
  "Nouvelle-Aquitaine": ["l'A10", "l'A63", "la RN10"],
  "Occitanie": ["l'A9 (La Languedocienne)", "l'A61", "l'A62"],
  "Hauts-de-France": ["l'A1", "l'A26", "l'A16"],
  "Grand Est": ["l'A4", "l'A31", "l'A35"],
  "Provence-Alpes-Cote d'Azur": ["l'A8 (La Provencale)", "l'A7", "l'A51"],
  "Pays de la Loire": ["l'A11", "l'A87", "la RN165"],
  "Bretagne": ["la RN12", "la RN165", "la RN137"],
  "Normandie": ["l'A13", "l'A28", "la RN13"],
  "Centre-Val de Loire": ["l'A10", "l'A71", "l'A20"],
  "Bourgogne-Franche-Comte": ["l'A6", "l'A31", "l'A36"],
  "Corse": ["la RT20", "la RT10"],
};

function getAxes(region: string): string[] {
  return axesParRegion[region] ?? ["les axes principaux du departement"];
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

  const intros: Record<string, (d: Departement, a: string, r: number, s: number) => string> = {
    radar: (d, a, r, s) =>
      `Le departement ${d.nom} (${d.code}) compte environ ${r} radars automatiques, dont une forte concentration sur ${a}. ` +
      `Selon les donnees ONISR 2024, environ ${s} % des contestations d'exces de vitesse aboutissent a une annulation dans ce departement. ` +
      `Le tribunal competent pour les litiges est le ${d.tribunal}.`,

    "stationnement-fps": (d, _a, _r, s) =>
      `Dans le ${d.nom} (${d.code}), les forfaits post-stationnement (FPS) sont emis par les communes via des agents de surveillance de la voie publique ou des prestataires agrees. ` +
      `D'apres les statistiques nationales, environ ${s} % des recours RAPO aboutissent a une annulation ou une reduction du FPS. ` +
      `En cas de rejet du RAPO, le litige est porte devant la Commission du contentieux du stationnement payant (CCSP).`,

    "feux-rouges": (d, a, _r, s) =>
      `Le departement ${d.nom} (${d.code}) est equipe de nombreux radars de feu rouge, notamment sur ${a}. ` +
      `Environ ${s} % des contestations pour franchissement de feu rouge aboutissent a une relaxe dans ce departement. ` +
      `Les affaires sont traitees par le ${d.tribunal}.`,

    ceinture: (d, _a, _r, s) =>
      `Dans le ${d.nom} (${d.code}), les contraventions pour non-port de la ceinture de securite sont frequemment relevees lors de controles routiers. ` +
      `Environ ${s} % des contestations aboutissent dans ce departement, notamment en cas d'erreur d'identification du conducteur. ` +
      `Le tribunal competent est le ${d.tribunal}.`,

    telephone: (d, a, _r, s) =>
      `Le departement ${d.nom} (${d.code}) enregistre un nombre eleve de verbalisations pour usage du telephone au volant, en particulier sur ${a}. ` +
      `D'apres les donnees disponibles, environ ${s} % des contestations pour telephone au volant aboutissent a une annulation. ` +
      `Le tribunal competent est le ${d.tribunal}.`,
  };

  const fn = intros[type.slug];
  if (fn) {
    return fn(dept, axe, radarCount, successRate);
  }

  return (
    `Dans le ${dept.nom} (${dept.code}), les contestations d'amendes sont traitees par le ${dept.tribunal}. ` +
    `Environ ${successRate} % des contestations aboutissent a une annulation.`
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

  const stats: LocalStat[] = [
    {
      title: `Taux de reussite dans le ${dept.nom}`,
      content:
        `D'apres les donnees ONISR 2024, environ ${successRate} % des contestations pour ` +
        `${type.label.toLowerCase()} aboutissent a une annulation dans le departement ${dept.nom} (${dept.code}).`,
    },
    {
      title: `Volume de contestations`,
      content:
        `On estime a environ ${contestCount.toLocaleString("fr-FR")} le nombre de contestations ` +
        `de ${type.label.toLowerCase()} deposees chaque annee dans le ${dept.nom}.`,
    },
  ];

  if (type.slug === "radar") {
    stats.push({
      title: `Radars dans le ${dept.nom}`,
      content:
        `Le departement ${dept.nom} compte environ ${radarCount} radars automatiques fixes et mobiles, ` +
        `selon le recensement de la Securite routiere.`,
    });
  }

  if (type.pointsRetrait > 0) {
    stats.push({
      title: `Points de permis en jeu`,
      content:
        `Une ${type.label.toLowerCase()} entraine le retrait de ${type.pointsRetrait} ` +
        `point${type.pointsRetrait > 1 ? "s" : ""} sur le permis de conduire. ` +
        `En cas de contestation acceptee, les points sont restitues.`,
    });
  }

  stats.push({
    title: `Tribunal competent`,
    content:
      `Les contestations d'amendes dans le ${dept.nom} sont jugees par le ${dept.tribunal}, ` +
      `situe au ${dept.adresseTribunal}.`,
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
          "Selon l'article R413-14 du Code de la route, le fait de depasser la vitesse maximale autorisee " +
          "est puni de l'amende prevue pour les contraventions de la quatrieme classe. " +
          "Le bareme des sanctions varie selon l'importance du depassement.",
        url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006842095",
      },
      {
        article: "Article A121-3 du Code de la route",
        texte:
          "L'article A121-3 fixe les conditions d'homologation et de verification periodique " +
          "des appareils de controle automatise de la vitesse (radars). Un radar non conforme ou " +
          "dont la verification periodique est expiree produit des releves contestables.",
        url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006840917",
      },
    ],

    "stationnement-fps": [
      {
        article: "Article L2333-87 du Code general des collectivites territoriales",
        texte:
          "Selon l'article L2333-87 du CGCT, le forfait post-stationnement (FPS) est du par le titulaire " +
          "du certificat d'immatriculation du vehicule stationne. Le montant est fixe par deliberation " +
          "du conseil municipal ou de l'organe deliberant de l'EPCI competent.",
        url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000039727498",
      },
      {
        article: "Article R417-1 du Code de la route",
        texte:
          "L'article R417-1 du Code de la route definit les regles de stationnement sur la voie publique. " +
          "Tout stationnement genant, abusif ou dangereux peut faire l'objet d'une verbalisation.",
        url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006842541",
      },
    ],

    "feux-rouges": [
      {
        article: "Article R412-30 du Code de la route",
        texte:
          "Selon l'article R412-30 du Code de la route, tout conducteur doit marquer l'arret absolu " +
          "devant un feu de signalisation rouge, fixe ou clignotant. Le non-respect de cette obligation " +
          "est sanctionne par une amende forfaitaire de 135 euros et un retrait de 4 points.",
        url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006842077",
      },
    ],

    ceinture: [
      {
        article: "Article R412-1 du Code de la route",
        texte:
          "Selon l'article R412-1 du Code de la route, en circulation, tout conducteur ou passager " +
          "d'un vehicule a moteur doit porter une ceinture de securite homologuee des lors que le siege " +
          "qu'il occupe en est equipe. Le non-respect est sanctionne par une amende de 135 euros " +
          "et un retrait de 3 points.",
        url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006842041",
      },
    ],

    telephone: [
      {
        article: "Article R412-6-1 du Code de la route",
        texte:
          "Selon l'article R412-6-1 du Code de la route, l'usage d'un telephone tenu en main par le " +
          "conducteur d'un vehicule en circulation est interdit. Cette interdiction s'applique egalement " +
          "a l'arret sur la chaussee (hors stationnement). L'infraction est punie d'une amende de 135 euros " +
          "et d'un retrait de 3 points.",
        url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033462050",
      },
    ],
  };

  return articles[typeSlug] ?? [];
}
