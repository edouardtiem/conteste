# ADR-001 : Architecture initiale MVP

**Date :** 2026-03-12
**Statut :** Accepte

## Contexte

Lancement de Conteste.app — PWA de contestation d'amendes en France. Besoin d'aller vite avec un MVP fonctionnel sans infrastructure lourde.

## Decisions

### Stack
- **Next.js 14 App Router** sur Vercel (serverless)
- **Tailwind CSS** avec tokens DSFR (palette bleu France, police Marianne)
- **PWA** via @serwist/next (installable, offline basique)
- **TypeScript strict**

### Pas de DB au MVP
- **localStorage** pour le state inter-pages du flow (cles prefixees `conteste_`). Les donnees restent sur le device, conforme RGPD par design.
- **payment-store in-memory** (Map JS) pour les paiements confirmes et les packs generes. Suffisant pour une session unique, perdu au restart du pod. ⚠️ Remplace en ADR-002.

### APIs externes
- **Claude Sonnet 4** (`claude-sonnet-4-20250514`) pour les 3 endpoints IA (extract, score, pack). Bon compromis qualite/cout (~0.05€/dossier).
- **Stripe** Payment Intent + Apple Pay + Google Pay. Prix flat 14,90€.
- **Resend** + React Email pour les emails transactionnels.

### Mock fallback systematique
Chaque route API verifie la presence de sa cle et retourne un mock realiste si absente. Permet de builder, tester et demontrer sans aucune cle API.

### SEO programmatique
- 516 pages statiques (SSG via `generateStaticParams`) : 5 types x 96 departements + index + pages speciales + stats.
- Schema.org complet (Article, FAQPage, HowTo, BreadcrumbList, Dataset).
- 96 departements metropolitains, pas de DOM-TOM au MVP (regimes juridiques differents).

### Prix
14,90€ flat (au lieu de 9,99€ du PRD initial). Pricing dynamique par montant d'amende prevu en V2.

## Consequences

- Zero cout d'infrastructure au MVP (Vercel free tier).
- Le flow est concu pour etre complete en une session (pas de persistance entre sessions).
- Migration vers Supabase necessaire des que le traffic reel arrive (cf. ADR-002).
