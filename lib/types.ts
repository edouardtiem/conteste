// Types du modele de donnees — PRD Section 7

export type AmendeType =
  | "stationnement"
  | "vitesse"
  | "feux"
  | "ceinture"
  | "telephone"
  | "autre";

export type ScoreNiveau = "fort" | "moyen" | "faible";

export type PortailType = "antai" | "commune" | "operateur";

export type PaiementStatut = "pending" | "paid";

export type FeedbackResultat =
  | "annulee"
  | "rejetee"
  | "sans_reponse"
  | "non_renseigne";

export type EmailSequence = "j60" | "j90" | "j120";

export type EmailType =
  | "confirmation"
  | "rappel"
  | "feedback_j60"
  | "feedback_j90"
  | "feedback_j120"
  | "certificat";

// --- Extraction ---

export interface AmendeExtracted {
  numero: string;
  type: AmendeType;
  montant: number;
  dateInfraction: string;
  lieuInfraction: string;
  organismeEmetteur: string;
  dateLimiteContestation: string;
  nom: string;
  prenom: string;
  adresse: string;
  codePostal: string;
  ville: string;
}

// --- Scoring ---

export interface ScoringResult {
  score: number;
  niveau: ScoreNiveau;
  motifPrincipal: string;
  alerte: string | null;
  teaser: string;
  recommandation: string;
}

// --- Pack ---

export interface ArgumentPack {
  titre: string;
  explication: string;
  aMentionner: string;
  aEviter: string;
}

export interface EtapeGuide {
  numero: number;
  action: string;
  detail: string;
}

export interface GuideAntai {
  portail: PortailType;
  url: string;
  etapes: EtapeGuide[];
  motifRecommande: string;
  piecesJointes: string[];
}

export interface PackResult {
  arguments: ArgumentPack[];
  guideAntai: GuideAntai;
}

// --- Dossier complet ---

export interface Dossier {
  id: string;
  createdAt: Date;

  amende: {
    numero: string;
    type: AmendeType;
    montant: number;
    dateInfraction: Date;
    lieuInfraction: string;
    organismeEmetteur: string;
    dateLimiteContestation: Date;
  };

  contrevenant: {
    nom: string;
    prenom: string;
    adresse: string;
    codePostal: string;
    ville: string;
  };

  scoring: {
    score: number;
    niveau: ScoreNiveau;
    motifPrincipal: string;
    alerte: string | null;
    teaser: string;
  };

  pack: PackResult | null;

  paiement: {
    stripeSessionId: string | null;
    montantFacture: number; // 14.90 EUR MVP
    statut: PaiementStatut;
  };
}

// --- Feedback ---

export interface FeedbackDossier {
  dossierId: string;
  typeAmende: AmendeType;
  montant: number;
  departement: string;
  motifPrincipal: string;
  argumentsUtilises: string[];
  scoreInitial: number;
  resultat: FeedbackResultat;
  delaiReponseJours: number | null;
  feedbackDate: Date;
}

// --- Token dossier gratuit ---

export interface TokenDossierGratuit {
  token: string;
  email: string;
  dossierOrigineId: string;
  createdAt: Date;
  expiresAt: Date;
  usedAt: Date | null;
}

// --- Utilisateur email ---

export interface UtilisateurEmail {
  email: string;
  dossiers: Dossier[];
  tokens: TokenDossierGratuit[];
  feedbacks: FeedbackDossier[];
  preferences: {
    unsubscribed: boolean;
    unsubscribedAt: Date | null;
  };
}

// --- API Response types ---

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// --- Prix MVP ---

export const PRIX_MVP = 1490; // en centimes (14.90 EUR)
export const PRIX_MVP_DISPLAY = "14,90 EUR";
