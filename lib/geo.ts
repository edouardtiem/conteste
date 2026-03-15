/**
 * Returns the correct French preposition for a department name.
 * Examples: "à Paris", "en Gironde", "dans le Finistère"
 */
export function prepositionDept(nomDept: string): string {
  // Departments using "à" (cities/islands without article)
  const aList = ["Paris", "Mayotte"];
  if (aList.includes(nomDept)) return `à ${nomDept}`;

  // Departments using "en" (feminine or starting with vowel)
  const enList = [
    "Ain", "Ardèche", "Ardennes", "Ariège", "Aube", "Aude", "Aveyron",
    "Charente", "Charente-Maritime", "Corrèze", "Corse-du-Sud", "Haute-Corse",
    "Creuse", "Dordogne", "Drôme", "Eure", "Eure-et-Loir", "Gironde",
    "Haute-Garonne", "Haute-Loire", "Haute-Marne", "Haute-Saône",
    "Haute-Savoie", "Haute-Vienne", "Hautes-Alpes", "Hautes-Pyrénées",
    "Hérault", "Ille-et-Vilaine", "Indre", "Indre-et-Loire", "Isère",
    "Lozère", "Manche", "Marne", "Mayenne", "Meuse", "Moselle",
    "Nièvre", "Oise", "Orne", "Saône-et-Loire", "Sarthe", "Savoie",
    "Seine-et-Marne", "Seine-Maritime", "Seine-Saint-Denis", "Somme",
    "Vendée", "Vienne", "Vosges", "Yonne",
    // Starting with vowel
    "Allier", "Alpes-de-Haute-Provence", "Alpes-Maritimes", "Essonne",
  ];
  if (enList.includes(nomDept)) return `en ${nomDept}`;

  // Default → "dans le"
  return `dans le ${nomDept}`;
}
