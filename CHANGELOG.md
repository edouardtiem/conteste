# Changelog -- Conteste.app

Toutes les modifications notables du projet sont documentees ici.

Format base sur [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/).

---

## 2026-03-15

### SEO V2 — Chantier 1 : Bugs critiques

→ [ADR-005](docs/decisions/005-seo-ameliorations-v2.md)

- [x] **Accents corrigés** : toutes les chaînes de `lib/geo-content.ts` réécrites en UTF-8 natif (département, réussite, données, sécurité, téléphone, etc.) — les intros, stats locales et articles de loi s'affichent maintenant avec les bons accents en production
- [x] **Prépositions géographiques** : création de `lib/geo.ts` avec `prepositionDept()` — "à Paris", "en Gironde", "en Alpes-Maritimes", "dans le Finistère". Intégré dans `geo-content.ts`, `data.ts` (FAQ), `[dept]/page.tsx` (titles, H1, meta, JSON-LD, CTA, sections)
- [x] **Capitalisation titles** : `type.label` en minuscules après "une" dans tous les titres, H1, meta descriptions, JSON-LD headline — "Contester une amende radar" au lieu de "Contester une Amende radar"
- [x] **Typo corrigée** : "exération" → "exonération" dans la section "Ce que vous devez savoir"
- [x] **Régions avec accents** : clés `axesParRegion` corrigées (Île-de-France, Auvergne-Rhône-Alpes, Provence-Alpes-Côte d'Azur, Bourgogne-Franche-Comté)

#### Fichiers créés
- `lib/geo.ts` — helper prépositions géographiques françaises
- `docs/decisions/005-seo-ameliorations-v2.md` — ADR plan SEO V2 (5 chantiers)

#### Fichiers modifiés
- `lib/geo-content.ts` — accents restaurés, prépositions dynamiques, régions corrigées
- `lib/data.ts` — prépositions dans `generateDeptFaq()`
- `app/guides/[type]/[dept]/page.tsx` — prépositions, capitalisation, typo exonération
- `app/guides/[type]/page.tsx` — capitalisation titles
- `docs/backlog.md` — ajout section P0.5 SEO V2
- `CHANGELOG.md` — cette entrée

---

## 2026-03-13

### P0 SEO — Anti-déréférencement Google

- [x] **Enrichissement departements.json** : 8 nouveaux champs par département (nombreRadars, axesPrincipaux, statsContestations, prefecturePhone, prefectureUrl, specificites, population, densite) — données uniques et géographiquement plausibles pour les 96 départements
- [x] **Contenu unique par page** : intro département unique (lib/geo-content.ts), section "Le saviez-vous ?" avec stats locales variées, articles de loi Légifrance par type d'infraction
- [x] **Liens internes latéraux** : 3 composants créés (DepartementsVoisins avec carte d'adjacence 96 depts, AutresInfractions, GuidesEditoriaux) — intégrés dans toutes les pages /guides/[type]/[dept]
- [x] **Signaux E-E-A-T** : page /a-propos (mission, méthodologie, sources, disclaimer juridique), composant AuthorBox (Schema.org Organization), composant SourcesBadge (Légifrance, ANTAI, Service-public.fr)
- [x] **Dates variées** : datePublished par type (jan-fév 2026), dateModified unique par page via hash déterministe (lib/seo-utils.ts), signal "Dernière mise à jour" visible
- [x] **Sitemap corrigé** : ajout pages manquantes (/a-propos, /contact, /cgu, /confidentialite, /mentions-legales), dates variées par page
- [x] **Navigation** : lien "À propos" ajouté dans le header, carte page pilier ajoutée dans l'index guides
- [x] **Articles de loi** : citations réelles (R413-14, L2333-87, R412-30, R412-1, R412-6-1) avec liens Légifrance, intégrées dans pages type et département
- [x] **FAQ enrichies** : réponses avec phrases direct-answer (GEO), citations loi inline, stats sourcées ONISR
- [x] **Build** : 514 pages statiques, 0 erreur TypeScript

#### Fichiers créés
- `lib/seo-utils.ts` — génération dates déterministes
- `lib/geo-content.ts` — intros uniques, stats locales, articles de loi
- `components/DepartementsVoisins.tsx` — liens départements voisins
- `components/AutresInfractions.tsx` — liens autres types même département
- `components/GuidesEditoriaux.tsx` — liens guides éditoriaux
- `components/AuthorBox.tsx` — signal auteur/vérification
- `components/SourcesBadge.tsx` — badges sources officielles
- `app/a-propos/page.tsx` — page À propos

#### Fichiers modifiés
- `data/departements.json` — enrichi (8 champs ajoutés)
- `data/types.json` — ajout datePublished par type
- `lib/data.ts` — interface Departement étendue, adjacencyMap, getDepartementsVoisins, getDepartementsByRegion, FAQ enrichies
- `app/guides/[type]/[dept]/page.tsx` — intégration complète (intro, stats, articles loi, composants, dates)
- `app/guides/[type]/page.tsx` — intégration (articles loi, EEAT, dates fixes)
- `app/sitemap.ts` — pages manquantes + dates variées
- `app/layout.tsx` — lien nav À propos
- `app/guides/page.tsx` — carte page pilier

### Documentation

- [x] **Systeme de documentation projet** : mise en place de `docs/backlog.md` (backlog priorise P0-P3), `docs/decisions/` (ADR par decision), conservation de `CHANGELOG.md` pour l'avancement → [ADR-003](docs/decisions/003-systeme-documentation.md)
- [x] **ADR-001** : consolidation des decisions d'architecture initiale (localStorage, mock fallback, payment-store, compression, etc.) dans un seul fichier
- [x] **ADR-002** : documentation du probleme de persistance payment-store in-memory sur Vercel (perte de paiement entre pods), avec 3 options et recommandation Supabase
- [x] **ADR-003** : documentation du choix du systeme de documentation
- [x] **Backlog initial** : creation du backlog priorise avec tous les chantiers identifies (P0: persistance DB, cles API / P1: email, tests, GSC / P2: feedback, pricing, blog / P3: comptes, B2B, fine-tuning)
- [x] **Suppression fichiers redondants** : DECISIONS.md, ARCHITECTURE.md, BUILD_REPORT.md consolides et supprimes
- [x] **Commande `/save` project-level** : `.claude/commands/save.md` pour mise a jour automatique de la doc a chaque checkpoint

### Supabase — Base de données

- [x] **Tables Postgres créées** : `dossiers` (25 colonnes), `email_logs`, `feedbacks`, `tokens_dossier_gratuit` + index
- [x] **Client DB** : `lib/db.ts` — pool pg avec SSL conditionnel, max 10 connexions
- [x] **Store DB** : `lib/dossier-store.ts` — createDossier, updateScoring, markAsPaid, isPaid, storePack, getPack, getDossier, logEmail — fallback silencieux si pas de DATABASE_URL
- [x] **Migration routes API** : double-write (mémoire + DB) sur extract, score, webhook, pack, email — le mode démo continue de fonctionner

### Déploiement Vercel

- [x] **Site en ligne** : https://conteste.app + https://conteste.vercel.app
- [x] **11 variables d'environnement** configurées (Anthropic, Stripe, Resend, Supabase, base URL)
- [x] **513 pages statiques** générées en production
- [x] **Framework corrigé** : framework null → nextjs via API Vercel (résolution 404 initial)

### Infrastructure & Configuration

- [x] **Git + GitHub** : repo initialisé et push initial (75 fichiers) → https://github.com/edouardtiem/conteste.git
- [x] **`.env.local`** : créé avec toutes les variables d'environnement (Anthropic, Stripe test, Resend)
- [x] **Stripe CLI** : installé dans `~/bin/stripe` (v1.37.3), webhook secret généré via `stripe listen`
- [x] **Resend** : nettoyage du compte (suppression domaine `dreep.app`, API keys `Dreep`, `DealSlate`, `Main Api Key`), ajout domaine `conteste.app` (région eu-west-1), **vérifié**
- [x] **DNS Vercel** : 3 records ajoutés via API (DKIM TXT, SPF MX, SPF TXT) pour `conteste.app`

### Variables d'environnement — Statut

| Variable | Statut |
|---|---|
| `ANTHROPIC_API_KEY` | ✅ |
| `STRIPE_SECRET_KEY` | ✅ (test) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | ✅ (test) |
| `STRIPE_WEBHOOK_SECRET` | ✅ |
| `RESEND_API_KEY` | ✅ |

### Mode démo

- [x] **Flow complet sans upload** : bouton "Essayer avec un exemple" sur la page upload, injecte des données mock (amende radar 135€ Jean Dupont) et parcourt tout le flow
- [x] **Simulation paiement** : bouton "Simuler le paiement (mode démo)" sur la page paywall quand Stripe n'est pas configuré
- [x] **Données mock réalistes** : chaque API retourne des mocks cohérents sans clés API

### Audit SEO/GEO — Corrections P1

- [x] **Sitemap** : ajout des 3 guides éditoriaux manquants (contester-amende-radar, delai-contestation-amende, antai-comment-contester) + page pilier
- [x] **Pages légales** : création de /mentions-legales, /cgu, /confidentialite, /contact — liens morts du footer corrigés (href="#" → vrais liens)
- [x] **Navigation header** : ajout de 3 liens (Guides, Statistiques, CTA "Analyser mon amende") — liens texte masqués sur mobile, CTA toujours visible
- [x] **FAQ visibles** : les 2 premières FAQ de chaque page guide affichées en texte clair (pas en accordéon) — meilleur crawl LLM/Google
- [x] **Table des matières** : ToC cliquable avec ancres ajoutée en haut de chaque page guide (type et département)
- [x] **CTA intermédiaire** : bloc "Vous avez reçu ce type d'amende ?" ajouté après la section "Motifs de contestation" sur toutes les pages guides
- [x] **Dates variées** : datePublished différenciée par type d'amende (jan-fév 2026), dateModified = date du build
- [x] **Viewport zoom** : suppression de maximumScale: 1 pour permettre le zoom mobile (accessibilité)
- [x] **Page pilier GEO** : /guides/contester-amende-france — guide exhaustif 2500+ mots, 8 sections, citations articles de loi, Schema.org @graph, maillage interne complet

### Corrections de bugs

- [x] **Caractères Unicode** : 822 séquences \u00XX remplacées par les vrais caractères UTF-8 (é, è, à, ç, etc.) dans 11 fichiers (data JSON, pages guides, lib/data.ts, stats)
- [x] **Page scoring améliorée** : ajout d'un bloc de réassurance "Ce que contient votre dossier complet" (4 points numérotés) entre la recommandation et les arguments floutés

### Bilan technique

- **516 pages statiques** (vs 508 avant), build 0 erreur
- **59 tests** unitaires + API + composants, tous verts
- Mode production (`next start`) stable, erreur useContext limitée au hot-reload dev (bug Next.js 14.2.35)

### ⚠️ TODO avant production
- [ ] Régénérer toutes les clés API (Anthropic, Stripe, Resend) — clés exposées pendant la session de setup
- [ ] Supprimer le token Vercel temporaire

---

## 2026-03-12

### Track A -- Application

- [x] **A1 : Setup Next.js 14 + TypeScript strict + Tailwind + PWA**
  - Next.js 14.2.35 avec App Router
  - TypeScript strict mode
  - Tailwind CSS 3.4 avec tokens DSFR (palette bleu France, police Marianne, espacements 8px)
  - PWA via @serwist/next 9.5.6, manifest.json dans /public/
  - Validation env via Zod 4 (non bloquante, warnings)

- [x] **A2 : Composants upload (CameraCapture, FileImport, ImageCompressor, ImagePreview, UploadZone)**
  - `CameraCapture` : input file avec `capture="environment"` pour camera arriere mobile
  - `FileImport` : input file classique (image/* + PDF)
  - `ImageCompressor` : compression canvas API, max 1600px, JPEG 0.82, cible 700KB, reduction iterative
  - `ImagePreview` : apercu image (avec ObjectURL) ou indication PDF, boutons Recommencer/Analyser
  - `UploadZone` : orchestrateur avec state machine (idle/uploading/preview/analyzing/error), barre de progression simulee, validation taille (10Mo) et format

- [x] **A3 : API Extract (Claude Vision + mock)**
  - Route `POST /api/extract` avec FormData
  - Claude Vision (claude-sonnet-4-20250514) pour extraction OCR
  - Support image (JPEG, PNG, WebP) et PDF natif
  - Mock fallback si `ANTHROPIC_API_KEY` absente
  - Gestion confidence < 0.3 (rejet), document illisible (rejet), parsing JSON robuste (regex `/{[\s\S]*}/`)
  - Calcul automatique de la date limite de contestation (+45 jours)

- [x] **A4 : API Score + pages Confirm/Scoring (blurred teaser, cas bloquants)**
  - Route `POST /api/score` avec body JSON (AmendeExtracted)
  - 3 cas bloquants detectes : delai depasse, montant a 0, amende majoree
  - Scoring via Claude avec system prompt juridique
  - Page Confirm : affichage des donnees extraites, mode edition inline, AmendeCard component
  - Page Scoring : score /100, ScoreBadge (fort/moyen/faible), WarningBanner pour alertes, BlurredTeaser pour arguments floutes, CTA vers paywall
  - Mock fallback avec score 78/100 "fort" et 3 arguments preview

- [x] **A5 : Stripe Payment Intent + Webhook + page Paywall**
  - Route `POST /api/payment` : creation PaymentIntent 14,90 EUR (1490 centimes)
  - Route `POST /api/webhook` : reception events Stripe, verification signature, idempotence via payment-store
  - `lib/stripe.ts` : singleton Stripe client-side avec loadStripe
  - `lib/payment-store.ts` : store in-memory (Map) pour paiements et packs
  - Page Paywall : champ email, Stripe Elements avec PaymentElement (tabs layout), Apple Pay / Google Pay auto
  - Mode dev sans Stripe : bouton "Simuler le paiement (dev)" qui bypass le paiement

- [x] **A6 : API Pack + page Pack (ArgumentCard, AntaiGuide, CopyMotifBlock)**
  - Route `POST /api/pack` : verification paiement (bypass en dev), idempotence pack, generation via Claude ou mock
  - Mapping snake_case (Claude) vers camelCase (TypeScript)
  - `ArgumentCard` : titre, explication, bloc "A mentionner" (bleu), bloc "A eviter" (orange)
  - `AntaiGuide` : guide etape par etape avec numeros, pieces justificatives
  - `CopyMotifBlock` : texte copier-coller avec bouton clipboard API + fallback execCommand
  - Page Pack : confirmation paiement (vert), arguments, motif copiable, guide ANTAI, lien ANTAI externe, envoi email

- [x] **A7 : Email Resend (template ConfirmationPaiement avec referral)**
  - Route `POST /api/email` : envoi via Resend ou log console en dev
  - Template React Email `ConfirmationPaiement.tsx` : header bleu France, recap amende, arguments numerotes, guide ANTAI complet, motif recommande encadre, rappel date limite (orange), CTA "Acceder a mon dossier", bloc referral ("tapez amendes dans votre recherche"), footer mentions legales + desinscription
  - `lib/resend.ts` : singleton Resend avec fallback null

### Track B -- SEO/GEO

- [x] **B1 : Data layer (types.json, departements.json, motifs.json)**
  - `data/types.json` : 5 types d'amendes (radar, stationnement-fps, feux-rouges, ceinture, telephone) avec slug, label, portail, delaiJours, montantForfaitaire, pointsRetrait, motifsPrincipaux, description
  - `data/departements.json` : 96 departements metropolitains (01 a 95 + 2A, 2B) avec code, nom, region, tribunal, adresseTribunal, portailCommune
  - `data/motifs.json` : 12 motifs de contestation (panneau-masque, erreur-plaque, vehicule-vendu, horodateur-defaillant, marquage-absent, signalisation-ambigue, marge-technique, erreur-identification, exemption-medicale, feu-defaillant, kit-mains-libres, signalisation-manquante) avec label, force (fort/moyen), description, articleCode
  - `lib/data.ts` : loaders typesafe (getTypes, getDepartements, getMotifs, getMotifsByKeys), generateurs FAQ (generateTypeFaq, generateDeptFaq), generateur etapes (generateEtapes)

- [x] **B2 : 493 pages statiques (5 types x 96 departements + index + speciales)**
  - `app/guides/page.tsx` : index guides avec cards par type, metadata, Schema.org CollectionPage
  - `app/guides/[type]/page.tsx` : guide par type avec generateStaticParams (5 pages), chiffres cles, resume, motifs, etapes, FAQ, liste departements, Schema.org (Article + FAQPage + HowTo + BreadcrumbList)
  - `app/guides/[type]/[dept]/page.tsx` : guide par departement avec generateStaticParams (480 pages), tribunal competent, chiffres cles, motifs, etapes, FAQ departementale, Schema.org complet
  - `app/guides/delai-contestation-amende/page.tsx` : page speciale SEO avec tableau recapitulatif des delais, FAQ, Schema.org
  - `app/guides/contester-amende-radar/page.tsx` : page speciale SEO avec 4 motifs detailles, demarche 6 etapes, references legales, FAQ
  - `app/guides/antai-comment-contester/page.tsx` : page speciale SEO avec procedure ANTAI 8 etapes, conseils redaction, suivi dossier, FAQ

- [x] **B3 : Pipeline contenu (donnees statiques en JSON, pret pour Claude API)**
  - Donnees statiques chargees depuis les fichiers JSON au build time
  - FAQ generees dynamiquement par type et departement via `lib/data.ts`
  - Etapes de contestation adaptees au portail (ANTAI vs commune)
  - Architecture prete pour enrichissement via Claude API (contenu genere a la volee)

- [x] **B4 : Page /stats/ avec donnees agregees**
  - 6 metriques cles : 2847 amendes analysees, 58% taux de reussite, 43% amendes radar, 45j delai ANTAI, Paris (75) departement le plus actif, 64/100 score moyen
  - Guides populaires (top 4 types)
  - Sources et methodologie
  - Schema.org Dataset + BreadcrumbList

- [x] **B5 : sitemap.xml, robots.txt, Schema.org, metadata complete**
  - `app/sitemap.ts` : sitemap dynamique avec toutes les URLs (landing + guides index + 5 types + 480 depts + stats)
  - `app/robots.ts` : allow /, disallow /contest/ et /api/, reference sitemap
  - Metadata Next.js sur chaque page : title, description, openGraph, alternates (canonical)
  - Breadcrumbs aria-label sur toutes les pages SEO

### Composants UI

- [x] `ScoreBadge` : badge colore par niveau (fort=vert, moyen=jaune, faible=orange)
- [x] `WarningBanner` : banniere d'alerte orange avec titre et contenu
- [x] `BlurredTeaser` : contenu floute (blur 6px) avec overlay cadenas et message
- [x] `AmendeCard` : card recapitulative de l'amende avec InfoRow
- [x] `ArgumentCard` : card argument avec explication, "A mentionner", "A eviter"
- [x] `AntaiGuide` : guide ANTAI avec etapes numerotees et pieces justificatives
- [x] `CopyMotifBlock` : bloc copier-coller avec clipboard API + fallback

### Lib

- [x] `types.ts` : modele de donnees complet (AmendeExtracted, ScoringResult, PackResult, Dossier, FeedbackDossier, TokenDossierGratuit, UtilisateurEmail, ApiResponse, prix MVP)
- [x] `utils.ts` : formatEuros, formatDateFR, calculerDateLimite, estDelaiDepasse, joursRestants, generateId, cn
- [x] `data.ts` : data layer SEO complet avec loaders, generateurs FAQ et etapes
- [x] `stripe.ts` : singleton Stripe client-side
- [x] `payment-store.ts` : store in-memory pour paiements et packs
- [x] `resend.ts` : singleton Resend avec fallback null
- [x] `env.ts` : validation Zod des variables d'environnement (non bloquante)

### Tests

- [x] Build complet : 493 pages, 0 erreur
- [x] Tests unitaires : `tests/unit/utils.test.ts`, `tests/unit/types.test.ts`
- [x] Tests API : `tests/api/extract.test.ts`, `tests/api/score.test.ts`
- [x] Setup Vitest + jsdom + Testing Library
