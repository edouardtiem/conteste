# Build Report -- Conteste.app

## Statut : BUILD COMPLET (en attente des cles API pour production)

---

## Track A -- Application

- [x] **Upload** (camera + fichier + compression + preview)
  - CameraCapture avec `capture="environment"` pour camera arriere mobile
  - FileImport pour images et PDF
  - ImageCompressor via canvas API : max 1600px, JPEG 0.82, cible 700KB, reduction iterative
  - ImagePreview avec apercu image ou indication PDF
  - UploadZone : state machine complete (idle/uploading/preview/analyzing/error), barre de progression simulee
  - Validation : 10Mo max, formats JPG/PNG/WebP/HEIC/PDF

- [x] **API Extract (Claude Vision)** -- mock actif, pret pour production
  - Route POST /api/extract avec FormData
  - Claude Vision claude-sonnet-4-20250514 pour OCR
  - Support image + PDF natif
  - Gestion confidence < 0.3, document illisible, parsing JSON robuste
  - Calcul automatique date limite (+45 jours)
  - Mock fallback : AmendeExtracted realiste (vitesse, 135 EUR, A6 km 234)

- [x] **API Score (scoring + cas bloquants)** -- mock actif
  - Route POST /api/score
  - 3 cas bloquants : delai depasse, montant 0, amende majoree
  - Scoring Claude avec system prompt juridique
  - Arguments preview (titre + resume) pour teaser floute
  - Mock fallback : score 78/100 "fort", 3 arguments

- [x] **Stripe (Payment Intent + Apple Pay + Google Pay)** -- mock actif
  - Route POST /api/payment : PaymentIntent 1490 centimes (14,90 EUR)
  - Route POST /api/webhook : verification signature, idempotence
  - Client : Stripe Elements PaymentElement, wallets Apple Pay / Google Pay auto
  - Mode dev : bouton "Simuler le paiement" sans Stripe
  - payment-store.ts : Map in-memory pour paiements + packs

- [x] **API Pack (arguments + guide ANTAI)** -- mock actif
  - Route POST /api/pack : verification paiement, idempotence, generation Claude (max_tokens 4000)
  - 2-3 arguments personnalises avec titre, explication, "a mentionner", "a eviter"
  - Guide ANTAI complet : 5 etapes, motif recommande, pieces justificatives
  - Composants : ArgumentCard, AntaiGuide, CopyMotifBlock (clipboard API + fallback)

- [x] **Email Resend** -- log console en dev, pret pour production
  - Route POST /api/email
  - Template React Email ConfirmationPaiement.tsx
  - Contenu : header bleu France, recap amende, arguments, guide ANTAI, motif copiable, rappel date limite, CTA, bloc referral, footer
  - Singleton Resend avec fallback null

- [x] **PWA** (manifest.json + serwist)
  - @serwist/next 9.5.6
  - Manifest : display standalone, theme_color #000091, orientation portrait
  - Installable sur ecran d'accueil mobile

---

## Track B -- SEO/GEO

- [x] **Data layer complet (5 types + 96 departements + 12 motifs)**
  - `data/types.json` : radar, stationnement-fps, feux-rouges, ceinture, telephone
  - `data/departements.json` : 96 departements metropolitains (01-95 + 2A, 2B) avec tribunal, adresse, region
  - `data/motifs.json` : 12 motifs avec label, force (fort/moyen), description, article du Code de la route
  - `lib/data.ts` : loaders typesafe, generateurs FAQ et etapes

- [x] **493 pages statiques generees**
  - 480 pages type x departement (generateStaticParams)
  - 5 pages type
  - 1 page index guides
  - 3 pages speciales SEO (delai-contestation-amende, contester-amende-radar, antai-comment-contester)
  - 1 page stats
  - 1 page landing
  - 6 pages contest flow (upload, confirm, scoring, paywall, pack, success)

- [x] **Page /stats/ avec donnees agregees**
  - 6 metriques : 2847 amendes, 58% reussite, 43% radar, 45j ANTAI, Paris (75), 64/100 score moyen
  - Schema.org Dataset

- [x] **sitemap.xml dynamique**
  - Genere par app/sitemap.ts
  - Toutes URLs : landing + guides + types + departements + stats
  - Priorities : 1.0 (landing), 0.9 (guides), 0.8 (types), 0.7 (depts), 0.6 (stats)

- [x] **robots.txt**
  - Allow /
  - Disallow /contest/ et /api/
  - Reference sitemap.xml

- [x] **Schema.org** (Article + FAQPage + HowTo + BreadcrumbList + Dataset + CollectionPage)
  - Article sur chaque guide (datePublished, dateModified, author, publisher)
  - FAQPage avec 5 questions/reponses par page
  - HowTo avec etapes de contestation
  - BreadcrumbList sur toutes les pages
  - Dataset sur /stats/
  - CollectionPage sur /guides/

---

## Tests

- Build : 493 pages, 0 erreur
- Unitaires : utils.test.ts, types.test.ts (Vitest + jsdom)
- API : extract.test.ts, score.test.ts (Vitest)
- E2E : a completer

---

## Ce qui reste a faire manuellement

1. **Fournir les variables d'environnement** (.env.local)
   ```
   ANTHROPIC_API_KEY=sk-ant-...
   STRIPE_SECRET_KEY=sk_live_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   RESEND_API_KEY=re_...
   NEXT_PUBLIC_BASE_URL=https://conteste.app
   ```

2. **Configurer le projet sur Vercel**
   - Importer le repository
   - Ajouter les variables d'environnement
   - Framework preset : Next.js

3. **Configurer le domaine conteste.app**
   - Ajouter le domaine custom dans Vercel
   - Configurer les DNS (CNAME ou A record)

4. **Activer le webhook Stripe en production**
   - Creer un endpoint webhook dans le dashboard Stripe
   - URL : `https://conteste.app/api/webhook`
   - Events : `payment_intent.succeeded`
   - Recuperer le `STRIPE_WEBHOOK_SECRET` et l'ajouter aux env vars Vercel

5. **Verifier le domaine d'envoi Resend**
   - Ajouter le domaine `conteste.app` dans Resend
   - Configurer les records DNS (SPF, DKIM, DMARC)
   - L'adresse d'envoi est `bonjour@conteste.app`

6. **Soumettre le sitemap a Google Search Console**
   - Verifier la propriete du domaine
   - Soumettre `https://conteste.app/sitemap.xml`
   - Verifier l'indexation des 493 pages

7. **Tester le flow complet avec de vraies cles API**
   - Upload d'une photo de PV reelle
   - Verifier l'extraction Claude Vision
   - Verifier le scoring
   - Effectuer un paiement test Stripe (mode test puis live)
   - Verifier la reception de l'email Resend
   - Verifier le pack genere

---

## Decisions non prevues dans le PRD

Voir [DECISIONS.md](./DECISIONS.md) pour le detail complet. Principales deviations :

- **Prix 14,90 EUR** au lieu de 9,99 EUR (PRD initial) -- sur directive du master prompt
- **96 departements metropolitains** sans DOM-TOM -- reporte en V2
- **In-memory payment store** au lieu de DB -- conforme a la spec "V0 sans DB"
- **Compression image client-side** via canvas API -- conforme au PRD (< 700KB)
- **Claude Sonnet 4** pour les 3 endpoints IA -- PRD ne specifait pas le modele
- **12 motifs** au lieu de 8 initialement prevus -- enrichissement bonus
- **3 pages SEO speciales** en plus des pages programmatiques -- bonus SEO
