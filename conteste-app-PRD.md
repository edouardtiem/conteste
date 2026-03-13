# PRD — Conteste.app
**Version** : 6.0  
**Date** : Mars 2026  
**Auteur** : Edouard  
**Stack** : PWA Next.js + Vercel (Mobile First — iOS + Android sans App Store)  

---

## 1. Problème

Chaque année, 30 millions d'amendes sont émises en France. Une fraction significative est contestable — excès de vitesse limite, panneau non visible, horodateur défaillant, erreur de plaque, stationnement litigieux.

La grande majorité des Français paient sans contester. Pas par manque de légitimité, mais par friction pure : à qui écrire, quel délai, quel motif invoquer, quelle formulation employer.

**Conteste.app résout ça en 60 secondes.**

---

## 2. Solution

**PWA Mobile First** (Progressive Web App) — iOS + Android sans App Store ni Play Store :
- Zéro commission Apple/Google (vs 15-30% IAP)
- Apple Pay + Google Pay via Stripe natif — même expérience qu'une app native
- Lancement immédiat sans review App Store
- SEO bénéficie directement du même domaine
- L'utilisateur peut ajouter à son écran d'accueil (icône native)
1. Scanne l'avis de contravention (photo ou PDF)
2. Extrait automatiquement les informations via Claude Vision
3. Analyse les chances de succès de la contestation
4. Affiche gratuitement le score + un aperçu de la faisabilité
5. Débloque contre paiement : les arguments personnalisés + le guide pas à pas sur ANTAI pour contester soi-même en ligne

**Ce qu'on ne fait pas** : on n'envoie pas de courrier. ANTAI (portail officiel du gouvernement) existe et permet de contester gratuitement en ligne. On vend l'intelligence et le guide pour le faire correctement — pas la logistique.

**Modèle économique MVP** : Score gratuit. Pack complet à **14,90€ flat** (arguments + guide ANTAI personnalisé).

**Marge nette MVP : 14,90 - 0,35 (Stripe) - 0,05 (Claude API) = ~14,54€ par dossier (~96%)**

**V2 — Pricing dynamique** (à activer une fois la conversion validée) :

| Montant amende | Prix |
|---|---|
| < 68€ | 7,99€ |
| 68€ – 200€ | 14,90€ |
| > 200€ | 24,90€ |

L'utilisateur ne voit pas la grille — il voit uniquement le prix adapté à son cas.

---

## 3. User Flow Complet

```
ÉTAPE 1 — Upload
L'utilisateur prend une photo de l'amende OU uploade un PDF
        ↓
ÉTAPE 2 — Extraction (Claude Vision)
Extraction automatique :
- Type d'infraction
- Montant de l'amende
- Date et heure de l'infraction
- Numéro de l'avis de contravention
- Organisme émetteur
- Nom, prénom, adresse du contrevenant
- Date limite de contestation (calculée : date + 45 jours)
- Lieu de l'infraction
        ↓
ÉTAPE 3 — Confirmation
Écran récapitulatif : "Est-ce bien ça ?"
L'utilisateur peut corriger manuellement si extraction incorrecte
        ↓
ÉTAPE 4 — Analyse & Scoring (GRATUIT)
L'agent analyse la situation et affiche :
  > 70% → "Bonne chance d'aboutir — nous recommandons de contester"
            + aperçu flou de 2-3 arguments (teaser payant)
  50-70% → "Chances modérées — vous pouvez tenter"
            + aperçu flou + mention que ça vaut quand même le coup d'essayer
  < 50%  → WARNING visible : "Situation peu contestable en l'état.
            Vous pouvez quand même tenter — voici pourquoi ça peut passer."
            + aperçu flou des arguments possibles
        ↓
ÉTAPE 5 — Paywall (14,90€)
CTA : "Débloquer mon dossier complet — 14,90€"
Stripe Checkout
        ↓
ÉTAPE 6 — Pack complet débloqué
6a. ARGUMENTS PERSONNALISÉS
    - 2 à 3 arguments solides formulés pour leur cas précis
    - Ce qu'il faut mentionner
    - Ce qu'il faut éviter de dire (important)

6b. GUIDE ANTAI ÉTAPE PAR ÉTAPE
    - URL directe vers le bon portail selon le type d'amende
      (ANTAI pour radar/feux/ceinture, portail commune pour stationnement FPS)
    - Quelle rubrique choisir
    - Quoi cocher
    - Quoi joindre comme pièces justificatives
    - Formulation exacte recommandée pour le champ "motif" — rédigée pour leur cas
        ↓
ÉTAPE 7 — Email de confirmation
Récap du dossier + arguments + guide envoyés par email
(pour retrouver facilement au moment de faire la démarche)
```

---

## 4. Règles Métier Critiques

### 4.1 Cas bloquants à détecter impérativement
Ces cas doivent déclencher un message d'alerte spécifique avant toute génération :

| Situation | Alerte à afficher |
|-----------|-------------------|
| Amende forfaitaire majorée sans consignation | "⚠️ Attention : pour contester une amende majorée, vous devez d'abord consigner le montant. Contester sans consigner peut aggraver votre situation." |
| Délai de 45 jours dépassé | "⚠️ Le délai légal de contestation est dépassé. Nous ne pouvons pas générer de lettre pour cette amende." |
| Amende déjà payée | "⚠️ Une amende payée ne peut généralement plus être contestée." |

### 4.2 Destinataires selon le type d'amende
L'agent doit identifier automatiquement le bon destinataire :

| Type d'amende | Destinataire |
|---------------|-------------|
| Stationnement (FPS) | Autorité en charge du stationnement de la commune |
| Excès de vitesse (radar) | Officier du Ministère Public du TJ compétent |
| Feux rouges, ceinture, téléphone (PV électronique) | Officier du Ministère Public |
| PV de police/gendarmerie | Officier du Ministère Public du TJ du lieu de l'infraction |
| Transports en commun (SNCF, RATP) | Service contentieux de l'opérateur |

### 4.3 Motifs de contestation recevables
Le scoring s'appuie sur ces motifs :

**Motifs forts (score élevé)**
- Panneau de signalisation absent, non visible, ou illisible (photos à l'appui)
- Erreur sur la plaque d'immatriculation dans l'avis
- Véhicule vendu avant la date de l'infraction
- Horodateur défaillant (ticket de caisse à l'appui)
- Absence de marquage au sol
- Certificat médical (urgence médicale)
- Force majeure documentée

**Motifs moyens (score modéré)**
- Signalisation ambiguë
- Contradiction entre signalisation horizontale et verticale
- Doute sur l'identification du conducteur

**Motifs faibles (score bas, warning)**
- "Je ne savais pas"
- Infraction reconnue mais circonstances atténuantes sans preuve

---

## 5. Prompt Système — Agent Principal

```
Tu es un assistant spécialisé dans la contestation d'amendes en France.
Tu aides les utilisateurs à comprendre leurs chances et à contester efficacement via ANTAI.

RÈGLES ABSOLUES :
1. Tu ne fournis jamais de conseil juridique personnalisé au sens légal.
2. Tu es honnête sur les chances de succès — tu ne survends pas.
3. Tu détectes et alertes immédiatement les cas bloquants.
4. Même en cas de faibles chances, tu expliques pourquoi ça peut quand même passer.
5. Tu adaptes le guide ANTAI au type d'amende (ANTAI vs portail commune pour FPS).

PHASE SCORING (gratuite) — retourne un JSON :
{
  "score": 0-100,
  "niveau": "fort" | "moyen" | "faible",
  "motif_principal": "string",
  "alerte": null | "string",
  "teaser": "Une phrase d'accroche sur la contestabilité, sans révéler les arguments",
  "recommandation": "string"
}

PHASE PACK COMPLET (après paiement) — retourne un JSON :
{
  "arguments": [
    {
      "titre": "string",
      "explication": "string — formulé pour ce cas précis",
      "a_mentionner": "string",
      "a_eviter": "string"
    }
  ],
  "guide_antai": {
    "portail": "ANTAI" | "commune" | "operateur",
    "url": "string",
    "etapes": [
      {
        "numero": 1,
        "action": "string",
        "detail": "string"
      }
    ],
    "motif_recommande": "string — texte exact à copier-coller dans le champ motif",
    "pieces_jointes": ["string"]
  }
}
```

---

## 6. Stack Technique

### PWA — Next.js 14 App Router
```
/app
  /page.tsx                   — Landing (mobile first, hero + CTA upload)
  /contest
    /upload/page.tsx          — Écran upload (caméra + fichier)
    /confirm/page.tsx         — Confirmation extraction
    /scoring/page.tsx         — Score gratuit + teaser flou
    /paywall/page.tsx         — Paywall Apple Pay / Google Pay
    /pack/page.tsx            — Arguments + Guide ANTAI débloqués
    /success/page.tsx         — Confirmation + email envoyé
  /components
    /upload
      UploadZone.tsx          — Orchestrateur upload (voir section 6.1)
      CameraCapture.tsx       — Bouton caméra natif mobile
      FileImport.tsx          — Import image/PDF
      ImagePreview.tsx        — Preview + retry avant envoi
      ImageCompressor.tsx     — Compression client-side avant envoi
    AmendeCard.tsx            — Récap données extraites
    ScoreBadge.tsx            — Badge score coloré (vert/orange/rouge)
    ArgumentCard.tsx          — Carte argument personnalisé
    AntaiGuide.tsx            — Guide étape par étape
    WarningBanner.tsx         — Alertes critiques (délai dépassé etc.)
    BlurredTeaser.tsx         — Aperçu flou arguments avant paiement
  /manifest.json              — PWA manifest (icône écran d'accueil)
  /sw.js                      — Service Worker (offline basique)
```

### Backend — Next.js API Routes (Vercel Serverless)
```
/app/api
  /extract/route.ts     — POST : Claude Vision → extraction données amende
  /score/route.ts       — POST : Analyse chances + teaser (gratuit)
  /pack/route.ts        — POST : Arguments + guide ANTAI (paiement vérifié)
  /payment/route.ts     — POST : Stripe Payment Intent (Apple Pay / Google Pay)
  /webhook/route.ts     — POST : Stripe webhook confirmation paiement
  /email/route.ts       — POST : Envoi email récap dossier
```

### APIs externes
| Service | Usage | Coût estimé |
|---------|-------|-------------|
| Anthropic Claude Vision | Extraction, scoring, génération pack | ~0,05€/dossier |
| Stripe (+ Apple Pay + Google Pay) | Paiement 14,90€ — zéro commission App Store | ~0,35€/transaction |
| Resend | Email récap dossier | ~0,001€/email |
| Vercel | Hosting PWA + API | Gratuit MVP |

**Marge nette par dossier : 14,90 - 0,35 - 0,05 - 0,001 = ~14,54€ (~96%)**

---

### 6.1 Composant Upload — Spécification Détaillée

C'est le moment le plus critique du flow. L'utilisateur est sur mobile, il vient de recevoir une amende, il est stressé. Zéro friction.

**UI — deux boutons, même niveau d'importance**
```
┌─────────────────────────────────────┐
│                                     │
│   Importez votre avis de           │
│   contravention                     │
│                                     │
│  ┌─────────────┐  ┌─────────────┐  │
│  │  📷          │  │  📄          │  │
│  │  Prendre    │  │  Importer   │  │
│  │  une photo  │  │  un fichier │  │
│  └─────────────┘  └─────────────┘  │
│                                     │
│  JPG, PNG ou PDF — max 10MB        │
└─────────────────────────────────────┘
```

**Implémentation technique**
```typescript
// CameraCapture.tsx — ouvre caméra native directement
<input
  type="file"
  accept="image/*"
  capture="environment"    // caméra arrière mobile
  onChange={handleCapture}
  className="hidden"
/>

// FileImport.tsx — image ou PDF depuis galerie/fichiers
<input
  type="file"
  accept="image/*,application/pdf"
  onChange={handleImport}
  className="hidden"
/>
```

**Compression avant envoi (client-side)**
```typescript
// ImageCompressor.tsx
// Photo brute : 4-8MB → compressée : 600-800KB
// Imperceptible visuellement, 10x plus rapide pour Claude Vision
async function compressImage(file: File): Promise<Blob> {
  const canvas = document.createElement('canvas')
  const img = await createImageBitmap(file)
  const MAX_WIDTH = 1600
  const scale = Math.min(1, MAX_WIDTH / img.width)
  canvas.width = img.width * scale
  canvas.height = img.height * scale
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  return new Promise(resolve =>
    canvas.toBlob(blob => resolve(blob!), 'image/jpeg', 0.82)
  )
}
```

**Preview + retry — obligatoire**
```
Après upload :
┌─────────────────────────────────────┐
│  [preview de l'image]               │
│                                     │
│  ✓ Photo nette et lisible ?        │
│                                     │
│  [ Recommencer ]  [ Analyser → ]   │
└─────────────────────────────────────┘
```
L'utilisateur doit confirmer avant envoi. Ça évite les extractions ratées sur photo floue et réduit le support.

**Gestion PDF mobile**
Sur iOS Safari, l'input file accepte les PDF depuis Files app. Sur Android Chrome, idem depuis le gestionnaire de fichiers. Aucune lib externe nécessaire — le browser natif gère.

**États du composant**
```
idle → uploading (progress bar) → preview → confirmed → analyzing
                                      ↓
                                   retry (retour idle)
```

**Règles UX critiques**
- Jamais de drag & drop (inutile sur mobile)
- Progress bar pendant l'upload vers Claude Vision (ça peut prendre 3-5 secondes)
- Message rassurant pendant l'analyse : "Nous analysons votre amende..."
- Si extraction échoue : message clair + bouton retry, jamais d'écran blanc

---

## 7. Modèle de Données

```typescript
interface Dossier {
  id: string
  createdAt: Date

  // Données amende (extraites par Claude Vision)
  amende: {
    numero: string
    type: 'stationnement' | 'vitesse' | 'feux' | 'ceinture' | 'telephone' | 'autre'
    montant: number
    dateInfraction: Date
    lieuInfraction: string
    organismeEmetteur: string
    dateLimiteContestation: Date
  }

  // Données contrevenant
  contrevenant: {
    nom: string
    prenom: string
    adresse: string
    codePostal: string
    ville: string
  }

  // Scoring (gratuit)
  scoring: {
    score: number
    niveau: 'fort' | 'moyen' | 'faible'
    motifPrincipal: string
    alerte: string | null
    teaser: string
  }

  // Pack complet (après paiement)
  pack: {
    arguments: {
      titre: string
      explication: string
      aMentionner: string
      aEviter: string
    }[]
    guideAntai: {
      portail: 'antai' | 'commune' | 'operateur'
      url: string
      etapes: { numero: number; action: string; detail: string }[]
      motifRecommande: string
      piecesJointes: string[]
    }
  } | null

  // Paiement
  paiement: {
    stripeSessionId: string | null
    montantFacture: number  // 14,90€ MVP — dynamique en V2
    statut: 'pending' | 'paid'
  }
}
```

---

## 7.5 — Resend : Colonne Vertébrale de la Relation Utilisateur

Sans compte utilisateur, **l'email est l'unique identifiant et canal de communication**. Resend n'est pas juste un outil d'envoi — c'est l'infrastructure de toute la relation avec l'utilisateur. Chaque interaction post-paiement passe par là.

### L'email comme identité persistante

```typescript
// L'email est collecté une seule fois — au moment du paiement Stripe
// Il devient l'identifiant de tout le cycle de vie du dossier

interface UtilisateurEmail {
  email: string                    // clé primaire de fait
  dossiers: Dossier[]             // 1 à N dossiers liés
  tokens: TokenDossierGratuit[]   // dossiers gratuits disponibles
  feedbacks: FeedbackDossier[]    // historique des retours
  preferences: {
    unsubscribed: boolean         // opt-out global RGPD
    unsubscribed_at: Date | null
  }
}
```

### Les 6 emails du cycle de vie complet

```
EMAIL 1 — Confirmation paiement (J+0, immédiat)
Déclencheur : webhook Stripe payment_intent.succeeded
Objet : "Votre dossier Conteste.app est prêt"
Contenu : récap amende + 3 arguments + guide ANTAI + motif copier-coller
CTA : "Accéder à mon dossier →" (lien vers /pack?token=xxx)
Importance : critique — c'est la livraison du produit

EMAIL 2 — Rappel guide (J+3, si pas de clic sur EMAIL 1)
Déclencheur : cron J+3, filtre : ouverture EMAIL 1 = false
Objet : "Votre guide ANTAI vous attend — [date limite] approche"
Contenu : rappel du délai restant + lien direct ANTAI
CTA : "Contester maintenant →"
Importance : réduit le taux d'abandon post-paiement

EMAIL 3 — Feedback J+60
Déclencheur : cron quotidien, filtre : paiement_date = aujourd'hui - 60j
Objet : "Votre amende du [date] — avez-vous eu une réponse ?"
Contenu : 3 boutons (annulée / rejetée / pas encore) + incentive dossier gratuit
CTA : liens magiques tokenisés par bouton
Importance : cœur du data flywheel

EMAIL 4 — Relance feedback J+90
Déclencheur : cron quotidien, filtre : feedback_j60_cliqué = false
Objet : "Rappel — votre dossier gratuit expire dans 30 jours"
Contenu : même 3 boutons + urgence sur l'incentive
Importance : récupère 20-25% de ceux qui n'ont pas répondu à J+60

EMAIL 5 — Clôture J+120
Déclencheur : cron quotidien, filtre : feedback_j90_cliqué = false
Objet : "Dernier rappel — votre dossier gratuit"
Contenu : même 3 boutons — dernière tentative
Importance : clôture le cycle proprement

EMAIL 6 — Livraison certificat (si preuve fournie)
Déclencheur : /api/proof traitement réussi
Objet : "Votre certificat de contestation ✅"
Contenu : PDF certificat en pièce jointe + stats comparatives personnalisées
Importance : moment de satisfaction maximale — fort potentiel de partage
```

### Architecture Resend

```typescript
// /lib/resend.ts — client centralisé

import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)

// Templates React Email — un composant par email
// /emails/
//   ConfirmationPaiement.tsx
//   RappelGuide.tsx
//   FeedbackJ60.tsx
//   RelanceFeedbackJ90.tsx
//   ClotureFeedback.tsx
//   Certificat.tsx

// Fonction d'envoi typée
export async function sendEmail(
  type: EmailType,
  to: string,
  data: EmailData
): Promise<void> {
  await resend.emails.send({
    from: 'Conteste.app <bonjour@conteste.app>',
    to,
    subject: EMAIL_SUBJECTS[type](data),
    react: EMAIL_TEMPLATES[type](data),
    tags: [{ name: 'type', value: type }]   // pour analytics Resend
  })
  // Logger en base : email envoyé, type, timestamp
  await logEmailSent(to, type)
}
```

### Tracking et déduplication

```typescript
// Table email_logs — évite les doublons et permet le suivi
CREATE TABLE email_logs (
  id UUID PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  dossier_id UUID REFERENCES dossiers(id),
  type VARCHAR(50) NOT NULL,      -- confirmation | rappel | feedback_j60 | etc.
  sent_at TIMESTAMP DEFAULT NOW(),
  opened_at TIMESTAMP,            -- via pixel Resend webhook
  clicked_at TIMESTAMP,           -- via link tracking Resend
  UNIQUE(dossier_id, type)        -- un seul envoi par type par dossier
);

// Avant chaque cron : vérifier que l'email n'a pas déjà été envoyé
// Respecter le RGPD : vérifier unsubscribed = false avant tout envoi
```

### Gestion RGPD et désinscription

Chaque email contient un lien de désinscription en pied de page.
Un clic → `unsubscribed = true` en base → aucun email ultérieur.
Conforme RGPD, géré nativement par Resend.

---

### Referral Passif — La Règle du Mot "Amendes"

Pas de programme de referral. Pas de code promo à partager. Pas de mécanique à builder.

Un seul principe : **chaque email envoyé par Conteste.app contient le mot "amendes"** dans le corps ou l'objet — naturellement, pas artificiellement.

L'idée : quand un ami parle d'une amende à l'utilisateur, celui-ci tape "amendes" dans sa recherche d'emails et retombe instantanément sur son email Conteste.app avec le lien de partage. L'email devient un bookmark passif que l'utilisateur retrouve au bon moment sans effort.

#### Règle d'implémentation

```
RÈGLE OBLIGATOIRE sur tous les templates React Email :
Le mot "amendes" doit apparaître au moins une fois dans chaque email.
Naturellement dans le contexte — jamais artificiel.

Exemples :
- EMAIL 1 : "Votre dossier de contestation d'amende est prêt"
- EMAIL 2 : "Votre guide pour contester les amendes en France"
- EMAIL 3 : "Suite à votre contestation d'amende du [date]..."
- CERTIFICAT : "Vous avez contesté votre amende avec succès"
```

#### Le bloc referral — présent dans TOUS les emails

Un bloc fixe en bas de chaque email, juste avant le footer RGPD :

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  Un ami vient de recevoir une amende ?          │
│  Gardez cet email — il vous suffira de          │
│  chercher "amendes" dans vos mails pour         │
│  retrouver ce lien.                             │
│                                                 │
│  → conteste.app                                 │
│                                                 │
└─────────────────────────────────────────────────┘
```

Texte exact à inclure dans chaque template :
```
"Un ami vient de recevoir une amende ? Ne supprimez pas cet email —
tapez "amendes" dans votre recherche d'emails pour retrouver
ce lien le jour où vous en aurez besoin. → conteste.app"
```

#### Pourquoi ça marche

L'utilisateur ne partage pas dans l'instant. Il partage 3 semaines plus tard quand un collègue lui parle d'une amende. À ce moment-là, il ne se souvient plus du nom du service — mais il retrouve l'email en 2 secondes. Le referral se fait naturellement, sans aucune friction, sans aucune relance de notre part.

Zéro coût. Zéro spam. Zéro mécanique à maintenir.

---

## 8. Séquence de Build (ordre Claude Code)

L'app et le SEO/GEO se construisent simultanément — ils partagent le même repo Next.js et le même déploiement Vercel.

---

### TRACK A — Application

#### Session A1 — Core (6-8h)
1. Setup Next.js 14 + Tailwind + PWA manifest + Service Worker
2. Composant Upload complet (CameraCapture + FileImport + Compressor + Preview)
3. API Extract (Claude Vision) + écran Confirm
4. API Score + écran Scoring (gratuit) + BlurredTeaser

#### Session A2 — Paiement & Pack (6-8h)
5. Intégration Stripe Payment Intent + Apple Pay + Google Pay
6. Webhook Stripe → déblocage pack
7. API Pack (arguments + guide ANTAI) + écran Pack
8. Intégration Resend → email récap dossier
9. Gestion erreurs + cas limites (délai dépassé, amende majorée, photo floue)

#### Session A3 — Deploy & Polish (4-6h)
10. UI/UX pass mobile first — design propre
11. Tests end-to-end sur iPhone Safari + Chrome Android
12. Optimisation Lighthouse (PWA score, performance, SEO)
13. Déploiement Vercel + domaine conteste.app

---

### TRACK B — SEO/GEO Programmatique

#### Session B1 — Infrastructure (4-6h)
1. Setup `/app/guides/` avec Next.js generateStaticParams
2. Création du data layer : fichiers JSON structurés par type d'amende et département
```
/data
  /amendes
    types.json          — tous les types d'infractions
    departements.json   — 96 départements + tribunal compétent + portail local
    motifs.json         — motifs recevables par type
    delais.json         — délais légaux par type d'amende
```
3. Template de page générique réutilisable pour toutes les combinaisons
4. Génération des 300+ pages statiques en une commande

#### Session B2 — Contenu & Structure (4-6h)
5. Pipeline Claude Code : génération du contenu de chaque page via Claude API
```
Pour chaque page /guides/[type]/[département]/ :
- Introduction contextualisée (type + lieu)
- Délai légal exact pour ce cas
- Tribunal ou portail compétent avec adresse
- Motifs recevables les plus fréquents pour ce type
- FAQ 5 questions spécifiques à ce cas
- Schema.org FAQPage + HowTo + Article
- CTA → "Analyser mon amende gratuitement"
```
6. Pages spéciales haute valeur à créer manuellement :
- `/guides/contester-amende-radar/` — requête volume maximal
- `/guides/contester-pv-stationnement/` — requête volume maximal
- `/guides/delai-contestation-amende/` — requête informelle forte
- `/guides/antai-comment-contester/` — requête GEO prioritaire

#### Session B3 — GEO Layer (3-4h)
7. Ajout du balisage GEO sur chaque page :
```typescript
// Données structurées optimisées citation LLM
// Chiffres clés en haut de page (les LLMs les extraient en priorité)
// Sources officielles linkées (Légifrance, ANTAI, service-public.fr)
// Section "En résumé" en début de page — format bullet points
// Balise <meta name="description"> ultra-précise avec chiffres
```
8. Page `/stats/` — données agrégées publiques
```
"Sur [N] amendes analysées par Conteste.app :
- 67% des amendes radar avec panneau contesté aboutissent
- Délai moyen de réponse : 45 jours
- Type d'amende le plus contesté : stationnement FPS"
```
Mise à jour automatique chaque semaine via cron job.

9. Sitemap.xml dynamique auto-généré — toutes les pages soumises à Google Search Console dès J1

---

### Structure des routes finales
```
conteste.app/                          — Landing PWA (app)
conteste.app/contest/...               — Flow contestation (app)
conteste.app/guides/                   — Index SEO
conteste.app/guides/[type]/            — Guide par type d'amende
conteste.app/guides/[type]/[dept]/     — Guide type × département (300+ pages)
conteste.app/stats/                    — Données agrégées (GEO anchor page)
conteste.app/blog/                     — Cas réels anonymisés (pipeline M3+)
```

---

### Pipeline blog automatique (M3 — dès 200 dossiers)
Une fois les premiers dossiers en base, Claude Code génère un cron hebdomadaire :
```
Chaque lundi :
1. Agrège les dossiers de la semaine (anonymisés)
2. Identifie les patterns nouveaux (motifs, types, départements)
3. Génère 3-5 articles "cas réels" via Claude API
4. Publie automatiquement sur /blog/
5. Met à jour /stats/ avec les nouvelles données
```
Zéro intervention manuelle. Le contenu se génère en fonctionnant.

---

## 9. CGU — Points Clés à Inclure

- Conteste.app est un outil d'aide à la décision et de guidage, pas un cabinet d'avocats
- Aucune garantie de résultat n'est fournie
- La démarche de contestation est effectuée par l'utilisateur lui-même via les portails officiels
- Le paiement couvre l'analyse personnalisée et le guide de contestation, non le résultat
- Les données personnelles sont traitées conformément au RGPD et supprimées sous 30 jours

---

## 10. KPIs MVP

| Métrique | Objectif M1 | Objectif M3 |
|---------|-------------|-------------|
| Dossiers analysés (gratuit) | 500 | 5 000 |
| Taux de conversion analyse → pack payant | >20% | >30% |
| Revenue MRR | 1 000€ | 15 000€ |
| Note App Store | — | >4,5/5 |
| CAC | — | <5€ (SEO organique) |

---

## 11. Distribution — Go-to-Market

**Canal principal : SEO programmatique**
- "contester amende radar", "contester PV stationnement", "comment contester amende ANTAI"
- Requêtes à intention forte, volume élevé, concurrence faible sur le conseil personnalisé
- Pages générées automatiquement par Claude Code : `/contester-amende-[type]/[département]/`
- Objectif : 300+ pages indexées en M2, chacune ciblant une requête longue traîne précise

**Canal secondaire : Réseaux sociaux**
- TikTok/Instagram : "J'ai analysé mon amende en 10 secondes et j'ai gagné"
- Viral naturellement si le produit délivre
- 1 vidéo/semaine minimum les 3 premiers mois

**Canal tertiaire (M6+) : B2B flottes**
- Flottes de véhicules (VTC, livreurs, entreprises avec véhicules de société)
- Abonnement mensuel illimité — ticket élevé, volume garanti

---

## 12. Stratégie GEO — Être Cité par les AIs

Le SEO Google est un jeu de volume et de backlinks. Le GEO (Generative Engine Optimization) est différent : Claude, ChatGPT et Perplexity citent des sources autoritatives quand ils répondent à "comment contester une amende en France". L'objectif est que Conteste.app devienne **la référence citée par les LLMs** sur ce sujet.

Une citation dans Perplexity ou Claude en 2026 vaut potentiellement plus qu'un ranking Google page 1.

### Ce que les LLMs adorent citer

Les modèles favorisent le contenu : factuel, sourcé, spécifique, utile, non-commercial en apparence. Exactement ce que Conteste.app peut produire à partir de ses vrais dossiers.

### Pipeline de contenu authoritative (automatisé via Claude Code)

```
Dossiers anonymisés (après M3, ~500 dossiers)
        ↓
Pipeline Claude Code hebdomadaire :
- Agrège les patterns par type d'amende
- Génère des articles "cas réels" anonymisés
- Calcule les taux de succès par motif
- Publie automatiquement sur le blog
        ↓
Corpus authoritative qui grossit chaque semaine sans intervention
```

### Typologies de contenu à produire

**Données agrégées** — ce que les LLMs citent en priorité
- "Sur 1 000 contestations analysées, 67% des amendes radar avec panneau contesté aboutissent"
- "Taux de succès par type d'amende et par motif — données Conteste.app 2026"
- Mis à jour automatiquement chaque mois

**Cas documentés anonymisés**
- "Amende 135€ — radar — panneau masqué par camion — contestée à Lyon — résultat : annulée"
- Format structuré, indexable, citable
- 5 à 10 nouveaux cas publiés par semaine via pipeline automatique

**Guides ultra-précis par contexte**
- Guide ANTAI par département (tribunal compétent, délais locaux, contacts)
- Guide par type d'infraction (radar, feux, stationnement FPS, ceinture)
- Ces pages répondent exactement aux questions que les gens posent aux AIs

**Décisions de tribunaux commentées**
- Veille automatique sur Légifrance
- Résumés accessibles des jurisprudences récentes sur les contraventions
- Contenu rare = forte autorité

### Optimisation technique GEO

```
Chaque page doit inclure :
- Données structurées Schema.org (Article, FAQPage, HowTo)
- Balisage clair de l'auteur et de la date
- Sources citées et linkées (Légifrance, ANTAI, service-public.fr)
- Chiffres clés en début de page (les LLMs les extraient)
- Section FAQ répondant aux questions exactes posées aux AIs
```

### Trajectoire de croissance avec GEO

| Horizon | Levier dominant | MRR estimé |
|---|---|---|
| M1-M6 | SEO programmatique + TikTok | 3 000 – 8 000€ |
| M6-M12 | GEO + contenu authoritative + B2B flottes | 10 000 – 20 000€ |
| M12-M24 | Référence citée par les AIs, flywheel enclenché | 30 000€+ |

**Le plafond naturel du SEO seul est ~8k MRR. Le GEO supprime ce plafond.**

Quand Conteste.app est cité par Claude ou ChatGPT comme référence sur la contestation d'amende en France, chaque conversation AI sur le sujet devient un canal d'acquisition gratuit et non-saturable.

### Métriques GEO à tracker

| Métrique | Comment mesurer | Objectif M12 |
|---|---|---|
| Citations dans Perplexity | Requêtes manuelles hebdo | Apparaître sur 5+ requêtes cibles |
| Citations dans ChatGPT | Requêtes manuelles hebdo | Apparaître sur 3+ requêtes cibles |
| Trafic referral "AI" | Analytics — source directe post-AI | >15% du trafic total |
| Nombre d'articles authoritative publiés | Blog analytics | 200+ articles |
| Backlinks domaines autorité | Ahrefs/SEMrush | 50+ domaines référents |

---

## 13. Flywheel Data — Le Vrai Moat

C'est la section la plus importante du PRD à long terme. L'app génère des données que personne d'autre ne peut avoir. Ces données deviennent un actif qui s'auto-renforce et crée une barrière à l'entrée réelle contre les LLMs généralistes.

---

### Le principe

Chaque dossier traité est un signal. À terme tu sais exactement :
- Quel type d'amende
- Quel motif invoqué
- Quels arguments générés
- Quel département / tribunal
- **Et surtout : est-ce que ça a marché ?**

Avec suffisamment de dossiers, tu identifies les patterns précis : quel argument, pour quel type d'amende, dans quel département, avec quelle formulation, produit le meilleur taux de succès réel.

Tu n'es plus un LLM générique qui raisonne sur le droit des contraventions. Tu es un modèle calibré sur des milliers de cas réels français — ce que ni ChatGPT ni Claude ne peuvent répliquer sans tes données.

---

### Collecte du feedback résultat — Non optionnelle

**C'est le cœur de l'actif. À implémenter dès le MVP.**

#### Mécanisme

```
J+0  : Dossier payé → email récap envoyé
J+60 : Email automatique de suivi
       "Bonjour, avez-vous obtenu une réponse concernant votre contestation ?"
       [ ✅ Amende annulée ] [ ❌ Rejetée ] [ ⏳ Pas encore de réponse ]
J+90 : Relance si pas de réponse au J+60
J+120 : Dernier email de suivi — clôture du dossier
```

#### Ce que tu collectes par dossier
```typescript
interface FeedbackDossier {
  dossier_id: string
  type_amende: string
  montant: number
  departement: string
  motif_principal: string
  arguments_utilises: string[]
  score_initial: number           // score estimé au moment de l'analyse
  resultat: 'annulee' | 'rejetee' | 'sans_reponse' | 'non_renseigne'
  delai_reponse_jours: number | null
  feedback_date: Date
}
```

#### Taux de collecte estimé
- Email seul J+60 : 30-40%
- Email + incentive : 60-70%
- Email + incentive + lien magique (zéro friction) : 70-80%
- Objectif MVP : >60%

---

### Mécanisme de collecte complet

#### Séquence emails (Resend + Vercel Cron)

```
J+0   : Email récap dossier (déjà implémenté section A7)
        → Ajouter : "Nous vous recontacterons dans 60 jours pour
                     savoir si votre contestation a abouti."

J+60  : Email feedback principal
        Objet : "Votre amende du [date] — avez-vous eu une réponse ?"
        Corps : 3 boutons CTA larges (mobile friendly)
                [ ✅ Amende annulée ]
                [ ❌ Contestation rejetée ]
                [ ⏳ Pas encore de réponse ]
        → Chaque bouton = lien magique tokenisé

J+90  : Relance si pas de clic sur J+60
        Objet : "Rappel — votre dossier Conteste.app"
        Corps : même 3 boutons + mention de l'incentive

J+120 : Dernier email — clôture
        Objet : "Dernier rappel — votre dossier gratuit expire dans 30 jours"
        Corps : même 3 boutons — urgence sur l'incentive
```

#### L'incentive — dossier gratuit via lien magique

Quand l'utilisateur clique sur un des 3 boutons :
1. Le résultat est enregistré en base (déclaratif)
2. Il arrive sur une page de remerciement
3. Il voit son **rapport comparatif personnalisé** immédiatement :

```
"Votre dossier était dans le top 23% des contestations
 les plus solides ce mois.

 Les amendes radar avec panneau contesté dans le Rhône
 ont un taux de succès de 61% sur notre base."
```

4. S'il a répondu "annulée" → proposition optionnelle :

```
"Partagez la photo de votre courrier ANTAI et recevez
 votre certificat de contestation personnalisé."
[ 📷 Partager la preuve ]
```

5. Dans tous les cas → débloquage dossier gratuit via lien magique :

```
"Merci pour votre retour — voici votre dossier gratuit
 valable 6 mois."
[ Utiliser mon dossier gratuit → ]
```

Ce lien est un **token JWT unique** stocké en base :
```typescript
interface TokenDossierGratuit {
  token: string           // UUID v4, usage unique
  email: string           // lié à cet email uniquement
  dossier_origine_id: string
  created_at: Date
  expires_at: Date        // +6 mois
  used_at: Date | null
}
```

Quand l'utilisateur clique → nouvelle analyse débloquée sans paiement Stripe. Le token est marqué `used_at` immédiatement — non réutilisable, non partageable.

---

#### Collecte de la preuve (optionnelle mais précieuse)

Si l'utilisateur partage la photo du courrier ANTAI :
- Claude Vision extrait le résultat officiel (annulée / rejetée)
- Tu as une **preuve vérifiée** vs déclaratif simple
- Le document anonymisé peut alimenter le blog GEO
- L'utilisateur reçoit son certificat PDF en échange

```typescript
// /api/proof — POST
// Input : photo courrier ANTAI
// Claude Vision extrait : resultat_officiel, date_courrier, reference_dossier
// Output : certificate PDF + confirmation en base avec flag 'verified: true'
```

---

### Gestion des comptes — Sans compte au MVP, compte optionnel à M3

#### MVP (J0) — Sans compte
- Identification uniquement par email
- Tokens JWT en base pour le dossier gratuit
- Historique dossiers : non disponible (pas de compte)
- Notifications : email uniquement

#### M3 — Compte optionnel via magic link

Le seul moment où tu proposes un compte c'est quand l'utilisateur veut utiliser son dossier gratuit. Pas avant.

```
"Pour utiliser votre dossier gratuit,
 créez un accès en 10 secondes."

[ Continuer avec mon email ]
→ Magic link envoyé → compte créé automatiquement
  sans mot de passe (Passwordless auth via Resend)
```

Le compte débloque :
- Historique de tous ses dossiers
- Statut de suivi en temps réel
- Notifications push (PWA installée)
- Accès direct sans re-saisir ses infos

#### M6+ — Compte avec push notifications

Une fois le compte existant, tu transformes la PWA en app installable :
```
"Installez Conteste.app sur votre écran d'accueil
 pour recevoir les mises à jour de votre dossier."
→ Web Push API → notifications push natives iOS/Android
→ Taux de feedback J+60 passe de 60% à 80%+
```

---

### Infrastructure Data mise à jour

```typescript
// Tables Postgres

CREATE TABLE feedbacks (
  id UUID PRIMARY KEY,
  dossier_id UUID REFERENCES dossiers(id),
  email VARCHAR(255),
  resultat VARCHAR(20),           -- annulee | rejetee | sans_reponse
  resultat_verifie BOOLEAN DEFAULT false,  -- true si photo courrier fournie
  delai_reponse_jours INT,
  feedback_date TIMESTAMP,
  email_sequence VARCHAR(10),     -- j60 | j90 | j120
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tokens_dossier_gratuit (
  token UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL,
  dossier_origine_id UUID REFERENCES dossiers(id),
  expires_at TIMESTAMP NOT NULL,  -- created_at + 6 mois
  used_at TIMESTAMP,              -- NULL = non utilisé
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE comptes (            -- créé à M3, optionnel
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP
);

// Cron emails (vercel.json)
{
  "crons": [
    { "path": "/api/cron/feedback-j60",  "schedule": "0 9 * * *" },
    { "path": "/api/cron/feedback-j90",  "schedule": "0 9 * * *" },
    { "path": "/api/cron/feedback-j120", "schedule": "0 9 * * *" },
    { "path": "/api/cron/token-cleanup", "schedule": "0 2 * * 0" }
  ]
}
```

---

### Niveau 1 — Prompt Engineering Continu (M3+)

Pas besoin de fine-tuning pour commencer à exploiter les données.

```
Chaque semaine :
1. Analyse des feedbacks reçus
2. Identification des arguments qui ont abouti vs échoué
3. Mise à jour du prompt système avec les patterns gagnants
4. A/B test sur les nouvelles formulations

Exemple d'insight actionnable :
"Le motif 'panneau masqué' dans le département 75 a 71% de succès
 quand l'argument mentionne l'arrêté municipal de signalisation,
 vs 34% sans cette mention."
→ Le prompt est mis à jour pour inclure systématiquement cette référence
   pour les amendes radar à Paris.
```

Ce travail est **automatisable via Claude Code** dès que tu as la data :
```typescript
// /scripts/optimize-prompts.ts — lancé chaque dimanche
// 1. Récupère les feedbacks de la semaine
// 2. Calcule les taux de succès par motif × département × formulation
// 3. Génère un rapport de recommandations
// 4. Propose une mise à jour du prompt système pour review manuelle
```

---

### Niveau 2 — Fine-Tuning (M12+)

Quand tu as **2 000 à 3 000 dossiers avec feedback de résultat**, tu peux fine-tuner un modèle sur ces paires input/output.

```
Dataset d'entraînement :
Input  : données amende + contexte
Output : arguments qui ont abouti (label: succès)
         arguments qui ont échoué (label: échec)

Résultat : un modèle qui prédit et génère les arguments
           avec le meilleur taux de succès réel — pas théorique.
```

C'est à ce moment que le moat devient infranchissable pour un concurrent qui démarre. Il lui faudrait 12-18 mois de dossiers pour rattraper.

---

### Infrastructure Data à construire dès le MVP

```typescript
// Table feedbacks en base (Postgres)
CREATE TABLE feedbacks (
  id UUID PRIMARY KEY,
  dossier_id UUID REFERENCES dossiers(id),
  resultat VARCHAR(20),          -- annulee | rejetee | sans_reponse
  delai_reponse_jours INT,
  feedback_date TIMESTAMP,
  email_sequence VARCHAR(10),    -- j60 | j90 | j120
  created_at TIMESTAMP DEFAULT NOW()
);

// Cron emails de suivi (Resend + Vercel Cron)
// vercel.json :
{
  "crons": [
    { "path": "/api/cron/feedback-j60", "schedule": "0 9 * * *" },
    { "path": "/api/cron/feedback-j90", "schedule": "0 9 * * *" },
    { "path": "/api/cron/feedback-j120", "schedule": "0 9 * * *" }
  ]
}
```

---

### KPIs Data Flywheel

| Métrique | M3 | M6 | M12 |
|---|---|---|---|
| Dossiers avec feedback résultat | 50 | 500 | 3 000 |
| Taux de collecte feedback | >40% | >60% | >75% |
| Feedbacks vérifiés (photo courrier) | — | >10% | >20% |
| Taux de succès moyen documenté | — | ~55% | ~65% |
| Arguments mis à jour via data | 0 | 3 | 12+ |
| Score de précision du scoring initial | baseline | +10% | +25% |
| Dossiers gratuits utilisés (rétention) | — | >30% | >45% |

---

### Ce que ça change sur la proposition de valeur

Dès M6, tu peux afficher sur la landing :

> **"Sur 1 200 contestations analysées, notre taux de succès moyen est de 58%. Sur les dossiers notés 'fort', il monte à 74%."**

C'est une claim que personne d'autre ne peut faire. Ni ChatGPT, ni un avocat généraliste, ni un concurrent qui vient de lancer.

C'est ton vrai différenciateur — pas la technologie, pas l'UX. **La donnée.**

---

*PRD v10.0 — Prêt pour ingestion Claude Code*
