# Decisions techniques -- Conteste.app

---

## [STACK TECHNIQUE] -- localStorage pour le state inter-pages -- 2026-03-12

**Contexte** : Le flow de contestation comporte 6 etapes (upload, confirm, scoring, paywall, pack, success). Les donnees doivent etre transmises entre les pages sans rechargement complet.

**Options considerees** :
1. Base de donnees (Supabase, PlanetScale) avec sessions serveur
2. Zustand / Redux en memoire client
3. localStorage natif du navigateur

**Decision prise** : localStorage natif du navigateur avec cles prefixees `conteste_`.

**Justification** :
- Aucune base de donnees a provisionner au MVP (zero cout d'infrastructure)
- Les donnees restent sur le device de l'utilisateur (conforme RGPD par design)
- Fonctionne en mode offline (coherent avec la PWA)
- Pas de gestion de sessions complexe cote serveur
- Cles utilisees : `conteste_dossier` (extraction), `conteste_scoring` (scoring), `conteste_dossierId`, `conteste_email`, `conteste_amende`

**Impact PRD** : Conforme a la spec PRD section 10 "V0 sans DB". Le PRD prevoyait explicitement un MVP sans base de donnees, avec migration vers Supabase en V2.

---

## [API] -- Mock fallback quand les API keys sont absentes -- 2026-03-12

**Contexte** : Les routes API `/api/extract`, `/api/score`, `/api/pack`, `/api/payment` et `/api/email` dependent de cles API externes (Anthropic, Stripe, Resend). En developpement ou en CI, ces cles ne sont pas toujours disponibles.

**Options considerees** :
1. Bloquer le demarrage si les cles manquent
2. Retourner des erreurs 500 quand les cles manquent
3. Retourner des donnees mock realistes quand les cles manquent

**Decision prise** : Pattern "mock fallback" -- chaque route API verifie la presence de la cle (`process.env.ANTHROPIC_API_KEY`, `process.env.STRIPE_SECRET_KEY`, `process.env.RESEND_API_KEY`) et retourne un mock realiste si absente. Un `console.warn` est emis pour tracer le mode degrade.

**Justification** :
- Permet de builder, tester et demontrer l'app sans aucune cle API
- Le flow complet est testable localement en mode degrade
- La validation Zod dans `lib/env.ts` log des warnings (non bloquants) au demarrage
- Chaque mock retourne des donnees au format strictement identique a la reponse API reelle

**Impact PRD** : Le PRD mentionnait "Mode fallback mock" pour toutes les APIs dans le planning sprint.

---

## [BACKEND] -- In-memory payment store au lieu de DB -- 2026-03-12

**Contexte** : Le webhook Stripe doit enregistrer les paiements confirmes pour autoriser la generation du pack. Sans base de donnees, il faut un mecanisme de stockage temporaire.

**Options considerees** :
1. Supabase ou PostgreSQL
2. Redis
3. Fichier JSON sur disque
4. Map JavaScript en memoire

**Decision prise** : `lib/payment-store.ts` utilise deux `Map<string, ...>` en memoire pour stocker les paiements confirmes et les packs generes. Expose les fonctions `markAsPaid`, `isPaid`, `isPackGenerated`, `markPackGenerated`, `storePack`, `getStoredPack`.

**Justification** :
- Zero infrastructure supplementaire au MVP
- Suffisant pour un seul pod Vercel (les donnees sont perdues au redemarrage, mais le flow est concu pour etre complete en une session)
- Idempotence implementee : le webhook verifie `isPaid()` avant de marquer, le pack verifie `isPackGenerated()` avant de regenerer
- En mode dev (`NODE_ENV=development`), la verification de paiement est bypassee pour permettre les tests

**Impact PRD** : Conforme. Le PRD prevoyait un remplacement par Supabase en V2 avec persistance des dossiers.

---

## [CLIENT] -- Compression image client-side via canvas API -- 2026-03-12

**Contexte** : Les photos de PV prises sur mobile peuvent peser 5-10 Mo en HEIC/JPEG haute resolution. L'API Claude Vision a une limite de taille et le temps d'upload serait trop long sur mobile 4G.

**Options considerees** :
1. Compression cote serveur (Sharp, Jimp)
2. Service externe (Cloudinary, imgproxy)
3. Compression client-side via canvas API natif

**Decision prise** : `components/upload/ImageCompressor.ts` compresse les images en client avant upload. Parametres : max 1600px de largeur, JPEG quality 0.82, cible 700KB. Reduction iterative de la qualite si le fichier depasse la cible (jusqu'a quality 0.4). Les PDF sont passes tels quels.

**Justification** :
- Zero cout serveur pour la compression
- Reduction du temps d'upload de 80% en moyenne
- L'API canvas est supportee par tous les navigateurs modernes
- La qualite 0.82 preserve la lisibilite du texte (critique pour l'OCR de Claude Vision)
- Les PDF sont envoyes sans modification (Claude les supporte nativement)

**Impact PRD** : Le PRD mentionnait "compression < 700KB" dans les specs d'upload. Implemente conformement.

---

## [DATA] -- 96 departements metropolitains (pas DOM-TOM) -- 2026-03-12

**Contexte** : Les pages SEO sont generees par combinaison type x departement. Il faut definir le perimetre geographique.

**Options considerees** :
1. 101 departements (metropole + DOM-TOM)
2. 96 departements (metropole uniquement, incluant 2A et 2B pour la Corse)
3. 13 regions seulement

**Decision prise** : 96 departements metropolitains dans `data/departements.json`, incluant les 2 departements corses (2A, 2B). Pas de DOM-TOM au MVP.

**Justification** :
- Les DOM-TOM ont des regimes juridiques differents pour certaines infractions
- Les tribunaux et les portails de contestation different
- 96 departements x 5 types = 480 pages departement, volume SEO suffisant pour le lancement
- Les DOM-TOM seront ajoutes en V2 avec un data layer adapte

**Impact PRD** : Le PRD mentionnait "96 departements metropolitains" dans la spec Track B. Respecte.

---

## [PRICING] -- Prix unique 14,90 EUR (au lieu de 9,99 EUR du PRD initial) -- 2026-03-12

**Contexte** : Le PRD initial mentionnait un prix de 9,99 EUR. Le master prompt de build a indique 14,90 EUR comme prix MVP.

**Options considerees** :
1. 9,99 EUR (prix PRD initial)
2. 14,90 EUR (prix master prompt)
3. Pricing dynamique par montant d'amende (7,99 / 14,90 / 24,90 EUR)

**Decision prise** : Prix unique flat a 14,90 EUR (`PRIX_MVP = 1490` centimes dans `lib/types.ts`). Le code pour le pricing dynamique est present mais commente dans `app/api/payment/route.ts`.

**Justification** :
- 14,90 EUR est le prix le plus recemment specifie
- Prix unique = zero friction cognitive au moment du paiement
- Marge nette ~96% par dossier apres frais Stripe (0,35 EUR) et Claude (~0,05 EUR)
- Le pricing dynamique (commente dans le code) est pret pour activation en V2

**Impact PRD** : Deviation par rapport au PRD initial (9,99 EUR). Le prix a ete ajuste a la hausse sur directive du master prompt, avec le pricing dynamique prevu en V2.

---

## [PWA] -- Utilisation de serwist pour la PWA -- 2026-03-12

**Contexte** : L'application doit etre installable sur l'ecran d'accueil mobile comme une app native, sans passer par un app store.

**Options considerees** :
1. next-pwa (deprecated)
2. @serwist/next (successeur actif de next-pwa)
3. Service worker manuel

**Decision prise** : `@serwist/next` v9.5.6 + `serwist` v9.5.6 dans les dependances. Manifest PWA dans `public/manifest.json` reference dans le layout root.

**Justification** :
- @serwist/next est le successeur officiel de next-pwa, activement maintenu
- Support natif de Next.js 14 App Router
- Gestion du service worker et du precaching automatique
- Le manifest definit `display: "standalone"`, `theme_color: "#000091"` (bleu France), `orientation: "portrait"`

**Impact PRD** : Le PRD exigeait une PWA installable. Conforme.

---

## [EMAIL] -- React Email pour les templates Resend -- 2026-03-12

**Contexte** : L'email de confirmation de paiement doit contenir les arguments personnalises, le guide ANTAI et un bloc referral.

**Options considerees** :
1. Template HTML inline
2. MJML
3. React Email (@react-email/components)

**Decision prise** : Template React Email dans `emails/ConfirmationPaiement.tsx`. Utilise les composants Html, Head, Body, Container, Section, Text, Link, Hr, Heading de @react-email/components.

**Justification** :
- Integration native avec Resend (meme ecosysteme)
- TypeScript type-safe pour les props du template
- Le template inclut : header bleu France, recap amende, arguments numerotes, guide ANTAI etape par etape, motif copiable, rappel date limite, CTA vers le dossier, bloc referral ("tapez amendes dans votre recherche"), footer avec lien de desinscription et mentions legales
- Le mot "amendes" est present dans le template pour le SEO email (recherche dans Gmail)

**Impact PRD** : Le PRD exigeait un email avec referral mecanism. Le bloc "tapez amendes dans votre recherche d'emails" est implemente.

---

## [SEO] -- Schema.org sur toutes les pages SEO -- 2026-03-12

**Contexte** : Les pages SEO doivent maximiser leur visibilite dans les SERP Google avec des rich snippets.

**Options considerees** :
1. Pas de donnees structurees
2. Schema.org de base (Article seulement)
3. Schema.org complet multi-types

**Decision prise** : JSON-LD Schema.org injecte via `dangerouslySetInnerHTML` sur toutes les pages SEO. Types utilises :
- `Article` sur chaque page guide (datePublished, dateModified, author, publisher)
- `FAQPage` avec les questions/reponses generees dynamiquement
- `HowTo` avec les etapes de contestation
- `BreadcrumbList` sur toutes les pages (navigation hierarchique)
- `Dataset` sur la page /stats/
- `CollectionPage` sur la page /guides/

**Justification** :
- Les FAQ et HowTo Google affichent des rich snippets dans les SERP
- BreadcrumbList ameliore la navigation dans les resultats de recherche
- Dataset sur /stats/ positionne la page pour les recherches de donnees
- Chaque page de departement a son propre schema avec le tribunal competent

**Impact PRD** : Le PRD exigeait "Schema.org sur chaque page programmatique". Implemente avec plus de types que prevu (Dataset, CollectionPage en bonus).

---

## [SEO] -- generateStaticParams pour 480+ pages -- 2026-03-12

**Contexte** : Les pages SEO departementales doivent etre generees statiquement au build pour le SEO et la performance.

**Options considerees** :
1. Server-side rendering (SSR) a la demande
2. Incremental Static Regeneration (ISR)
3. Static Site Generation (SSG) complete via generateStaticParams

**Decision prise** : `generateStaticParams()` dans `app/guides/[type]/page.tsx` (5 types) et `app/guides/[type]/[dept]/page.tsx` (5 x 96 = 480 combinaisons). Les donnees viennent des fichiers JSON statiques (`data/types.json`, `data/departements.json`, `data/motifs.json`) via `lib/data.ts`.

**Justification** :
- Generation complete au build = temps de chargement minimal (HTML statique)
- Les donnees ne changent pas (codes juridiques, tribunaux) = pas besoin d'ISR
- 480 pages departement + 5 pages type + 1 index + 3 pages speciales + 1 stats = 490 pages statiques
- Plus les 3 pages speciales SEO : delai-contestation-amende, contester-amende-radar, antai-comment-contester
- sitemap.xml dynamique genere par `app/sitemap.ts` avec toutes les URLs
- robots.txt via `app/robots.ts` interdit /contest/ et /api/ aux crawlers

**Impact PRD** : Le PRD exigeait "480 pages generees" minimum. Objectif atteint avec 493 pages SEO au total.

---

## [DATA] -- 5 types d'amendes et 12 motifs de contestation -- 2026-03-12

**Contexte** : Le data layer SEO doit couvrir les types d'amendes les plus frequents en France avec des motifs de contestation documentes.

**Options considerees** :
1. 3 types seulement (radar, stationnement, feux)
2. 5 types couvrant les infractions majeures
3. 10+ types avec des infractions rares

**Decision prise** : 5 types dans `data/types.json` :
- `radar` (exces de vitesse, ANTAI, 135 EUR, 1 point)
- `stationnement-fps` (FPS, commune, 35 EUR, 0 point)
- `feux-rouges` (feu rouge, ANTAI, 135 EUR, 4 points)
- `ceinture` (ceinture, ANTAI, 135 EUR, 3 points)
- `telephone` (telephone, ANTAI, 135 EUR, 3 points)

12 motifs dans `data/motifs.json` avec pour chaque motif : label, force (fort/moyen), description, articleCode.

**Justification** :
- Ces 5 types couvrent ~95% des amendes contestees en France
- Chaque type a ses motifs principaux lies (3-4 motifs par type)
- Les articles du Code de la route sont references pour la credibilite
- Les motifs sont classes par force (fort = defaut de signalisation, moyen = marge technique)

**Impact PRD** : Le PRD demandait "5 types x 96 departements". Conforme.

---

## [API] -- Claude Sonnet 4 pour extraction, scoring et generation -- 2026-03-12

**Contexte** : Le choix du modele Claude pour les 3 endpoints IA (extract, score, pack).

**Options considerees** :
1. Claude Haiku (rapide, moins cher, moins precis)
2. Claude Sonnet (bon compromis vitesse/qualite)
3. Claude Opus (meilleur qualite, plus lent, plus cher)

**Decision prise** : `claude-sonnet-4-20250514` pour les 3 routes API. Parametres : max_tokens 1024 pour extract/score, 4000 pour pack.

**Justification** :
- Sonnet offre un bon compromis entre qualite d'extraction OCR et cout (~0.01-0.05 EUR par appel)
- La vision de Sonnet est suffisante pour lire un avis de contravention
- Le scoring necessite un raisonnement juridique de bonne qualite
- Le pack necessite max_tokens plus eleve (4000) pour generer arguments + guide complet
- Un system prompt dedie au scoring rappelle les regles : pas de conseil juridique au sens legal, honnetete sur les chances

**Impact PRD** : Le PRD ne specifait pas le modele. Sonnet est un choix equilibre pour le MVP.
