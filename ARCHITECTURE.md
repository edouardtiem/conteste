# Architecture -- Conteste.app

## Vue d'ensemble

PWA Next.js 14 (App Router) deployee sur Vercel. Mobile first, style service public francais (DSFR).
Score de contestation gratuit, pack complet payant a 14,90 EUR.

---

## Arborescence des fichiers

```
conteste/
|
|-- app/                              # Pages et routes (Next.js App Router)
|   |-- page.tsx                      # Landing page (CTA principal)
|   |-- layout.tsx                    # Layout root (Header RF + Footer + metadata globale)
|   |-- globals.css                   # Styles globaux + tokens Tailwind DSFR
|   |-- sitemap.ts                    # Sitemap XML dynamique (493 URLs)
|   |-- robots.ts                     # robots.txt (allow /, disallow /contest/ /api/)
|   |
|   |-- contest/                      # Flow de contestation (6 etapes, client-side)
|   |   |-- upload/page.tsx           # Etape 1 : upload photo/PDF
|   |   |-- confirm/page.tsx          # Etape 2 : verification + edition des donnees
|   |   |-- scoring/page.tsx          # Etape 3 : score gratuit + teaser floute
|   |   |-- paywall/page.tsx          # Etape 4 : paiement Stripe 14,90 EUR
|   |   |-- pack/page.tsx             # Etape 5 : pack complet (arguments + guide ANTAI)
|   |   |-- success/page.tsx          # Etape 6 : confirmation + recap
|   |
|   |-- guides/                       # Pages SEO statiques
|   |   |-- page.tsx                  # Index guides (liste des 5 types)
|   |   |-- [type]/page.tsx           # Guide par type (5 pages, generateStaticParams)
|   |   |-- [type]/[dept]/page.tsx    # Guide type+departement (480 pages, generateStaticParams)
|   |   |-- delai-contestation-amende/page.tsx    # Page speciale SEO
|   |   |-- contester-amende-radar/page.tsx       # Page speciale SEO
|   |   |-- antai-comment-contester/page.tsx      # Page speciale SEO
|   |
|   |-- stats/page.tsx                # Page statistiques agregees
|   |
|   |-- api/                          # Routes API serverless
|       |-- extract/route.ts          # POST : extraction OCR (Claude Vision)
|       |-- score/route.ts            # POST : scoring + cas bloquants (Claude)
|       |-- payment/route.ts          # POST : creation PaymentIntent (Stripe)
|       |-- webhook/route.ts          # POST : webhook Stripe (payment_intent.succeeded)
|       |-- pack/route.ts             # POST : generation pack complet (Claude)
|       |-- email/route.ts            # POST : envoi email confirmation (Resend)
|
|-- components/
|   |-- upload/                       # Composants du flow d'upload
|   |   |-- UploadZone.tsx            # Orchestrateur (state machine 6 etats)
|   |   |-- CameraCapture.tsx         # Input camera (capture="environment")
|   |   |-- FileImport.tsx            # Input fichier (image + PDF)
|   |   |-- ImageCompressor.ts        # Compression canvas (1600px, JPEG 0.82, 700KB)
|   |   |-- ImagePreview.tsx          # Apercu image/PDF + actions
|   |
|   |-- ui/                           # Composants UI reutilisables
|       |-- ScoreBadge.tsx            # Badge score colore (fort/moyen/faible)
|       |-- WarningBanner.tsx         # Banniere alerte orange
|       |-- BlurredTeaser.tsx         # Contenu floute + cadenas
|       |-- AmendeCard.tsx            # Card recapitulative amende
|       |-- ArgumentCard.tsx          # Card argument (explication + mentionner + eviter)
|       |-- AntaiGuide.tsx            # Guide ANTAI etape par etape
|       |-- CopyMotifBlock.tsx        # Bloc copier-coller motif
|
|-- lib/                              # Logique partagee
|   |-- types.ts                      # Types TypeScript complets du modele de donnees
|   |-- utils.ts                      # Utilitaires (dates, formatage, cn)
|   |-- data.ts                       # Data layer SEO (loaders JSON, generateurs FAQ/etapes)
|   |-- stripe.ts                     # Singleton Stripe client-side
|   |-- payment-store.ts             # Store in-memory paiements + packs (Map)
|   |-- resend.ts                     # Singleton Resend (null si pas de cle)
|   |-- env.ts                        # Validation Zod des env vars (non bloquante)
|
|-- data/                             # Donnees statiques (JSON)
|   |-- types.json                    # 5 types d'amendes
|   |-- departements.json             # 96 departements metropolitains
|   |-- motifs.json                   # 12 motifs de contestation
|
|-- emails/                           # Templates email
|   |-- ConfirmationPaiement.tsx      # Template React Email (Resend)
|
|-- public/                           # Assets statiques
|   |-- manifest.json                 # Manifest PWA
|
|-- tests/                            # Tests
|   |-- setup.ts                      # Setup Vitest + jsdom
|   |-- unit/
|   |   |-- utils.test.ts
|   |   |-- types.test.ts
|   |-- api/
|       |-- extract.test.ts
|       |-- score.test.ts
|
|-- next.config.mjs                   # Config Next.js
|-- tailwind.config.ts                # Config Tailwind (tokens DSFR)
|-- tsconfig.json                     # Config TypeScript strict
|-- vitest.config.ts                  # Config Vitest
|-- package.json                      # Dependances
```

---

## Flow de donnees -- Application (Track A)

```
[1] UPLOAD
    Utilisateur mobile
         |
         | photo (camera) ou fichier (image/PDF)
         v
    CameraCapture / FileImport
         |
         | File object
         v
    ImageCompressor (canvas API)
         |
         | Blob compresse (<700KB)
         v
    UploadZone → POST /api/extract (FormData)
         |
         v
    [CLAUDE VISION] claude-sonnet-4-20250514
    (ou mock si ANTHROPIC_API_KEY absente)
         |
         | AmendeExtracted JSON
         v
    localStorage["conteste_dossier"]
         |
         | redirect /contest/confirm
         v

[2] CONFIRM
    Lecture localStorage["conteste_dossier"]
         |
         | AmendeExtracted (editable)
         v
    Bouton "Analyser" → POST /api/score (JSON body)
         |
         v
    [CLAUDE SCORING] claude-sonnet-4-20250514
    (ou mock) + cas bloquants (delai, montant 0, majoree)
         |
         | ScoringResult + argumentsPreview
         v
    localStorage["conteste_scoring"]
         |
         | redirect /contest/scoring
         v

[3] SCORING
    Lecture localStorage["conteste_scoring"]
         |
         | Score /100 + niveau + teaser
         | Arguments floutes (BlurredTeaser)
         | Alerte si cas bloquant (WarningBanner)
         v
    CTA "Debloquer mon dossier" → /contest/paywall

[4] PAYWALL
    Saisie email
         |
         | POST /api/payment { dossierId, email }
         v
    [STRIPE] PaymentIntent 1490 centimes (14,90 EUR)
    (ou mock si STRIPE_SECRET_KEY absente)
         |
         | clientSecret
         v
    Stripe Elements (PaymentElement + Apple Pay + Google Pay)
         |
         | confirmPayment → redirect /contest/pack
         v
    [STRIPE WEBHOOK] POST /api/webhook
         |
         | payment_intent.succeeded
         v
    payment-store.markAsPaid(dossierId, email, paymentIntentId)

[5] PACK
    POST /api/pack { dossierId, amende }
         |
         | Verification paiement (payment-store.isPaid)
         | Idempotence (isPackGenerated → getStoredPack)
         v
    [CLAUDE GENERATION] claude-sonnet-4-20250514 max_tokens=4000
    (ou mock)
         |
         | PackResult { arguments[], guideAntai }
         v
    ArgumentCard x2-3 + CopyMotifBlock + AntaiGuide
         |
         | Bouton "Recevoir par email"
         v
    POST /api/email { email, dossierId, pack, amende }
         |
         v
    [RESEND] ConfirmationPaiement template
    (ou console.log en dev)

[6] SUCCESS
    Recap amende + rappel date limite + lien retour accueil
```

---

## Flow de donnees -- SEO (Track B)

```
data/types.json (5 types)
data/departements.json (96 depts)
data/motifs.json (12 motifs)
         |
         v
lib/data.ts (loaders typesafe)
    |-- getTypes() / getTypeBySlug()
    |-- getDepartements() / getDepartementByCode()
    |-- getMotifs() / getMotifsByKeys()
    |-- generateTypeFaq() / generateDeptFaq()
    |-- generateEtapes()
         |
         v
generateStaticParams()
    |-- [type]/page.tsx → 5 pages
    |-- [type]/[dept]/page.tsx → 5 x 96 = 480 pages
         |
         v
Build Next.js (SSG)
    |-- 480 pages departement
    |-- 5 pages type
    |-- 1 page index guides
    |-- 3 pages speciales SEO
    |-- 1 page stats
    |-- 1 page landing
    |-- 6 pages contest flow
    = ~497 pages totales

Chaque page SEO inclut :
    |-- Metadata Next.js (title, description, OG, canonical)
    |-- Schema.org JSON-LD (Article + FAQPage + HowTo + BreadcrumbList)
    |-- Breadcrumbs aria-label
    |-- CTA vers /contest/upload

sitemap.ts → sitemap.xml (toutes URLs SEO)
robots.ts → robots.txt (allow /, disallow /contest/ /api/)
```

---

## Integrations externes

### Anthropic Claude (claude-sonnet-4-20250514)

| Route | Usage | max_tokens | Fallback |
|-------|-------|-----------|----------|
| `/api/extract` | OCR via Vision (image/PDF → JSON) | 1024 | Mock AmendeExtracted |
| `/api/score` | Analyse juridique + scoring | 1024 | Mock score 78/100 |
| `/api/pack` | Generation arguments + guide ANTAI | 4000 | Mock 2 arguments + guide |

### Stripe

| Route | Usage | Montant |
|-------|-------|---------|
| `/api/payment` | Cree PaymentIntent | 1490 centimes (14,90 EUR) |
| `/api/webhook` | Recoit payment_intent.succeeded | -- |
| Client (paywall) | PaymentElement + Apple Pay + Google Pay | -- |

### Resend

| Route | Usage | Template |
|-------|-------|----------|
| `/api/email` | Envoie email confirmation | ConfirmationPaiement.tsx |

---

## Variables d'environnement requises

```env
# Anthropic (Claude Vision + Scoring + Pack)
ANTHROPIC_API_KEY=sk-ant-...

# Stripe
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Resend
RESEND_API_KEY=re_...

# App
NEXT_PUBLIC_BASE_URL=https://conteste.app
NODE_ENV=production
```

Toutes les variables sont optionnelles au developpement (mock fallback).
Validation via `lib/env.ts` (Zod, non bloquante, warnings en console).

---

## Dependances principales

| Package | Version | Usage |
|---------|---------|-------|
| next | 14.2.35 | Framework React SSR/SSG |
| react | ^18 | UI |
| @anthropic-ai/sdk | ^0.78.0 | Claude Vision + Scoring + Pack |
| stripe | ^20.4.1 | Stripe server-side |
| @stripe/react-stripe-js | ^5.6.1 | Stripe Elements client-side |
| @stripe/stripe-js | ^8.9.0 | Stripe loader client-side |
| resend | ^6.9.3 | Envoi emails transactionnels |
| @react-email/components | ^1.0.9 | Templates email React |
| @serwist/next | ^9.5.6 | PWA (service worker) |
| serwist | ^9.5.6 | PWA core |
| zod | ^4.3.6 | Validation schemas |
| tailwindcss | ^3.4.1 | CSS utility-first |
| vitest | ^3.2.4 | Tests unitaires |
| @testing-library/react | ^16.3.2 | Tests composants |

---

## Principes d'architecture

1. **Mobile first** -- chaque ecran utilisable d'une main sur iPhone SE
2. **Zero friction** -- score gratuit, paiement unique, pas d'abonnement, pas de compte
3. **Style service public** -- palette DSFR, police Marianne, pas de "look IA"
4. **Mock fallback** -- toute l'app fonctionne sans cle API (donnees mock realistes)
5. **Email comme identite** -- pas de compte utilisateur au MVP
6. **localStorage comme state** -- zero DB au MVP, migration Supabase prevue V2
7. **SSG pour le SEO** -- 480+ pages generees statiquement au build
8. **Idempotence** -- webhook et pack verifient avant d'ecrire (no double processing)
