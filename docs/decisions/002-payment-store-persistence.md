# ADR-002 : Remplacer le payment-store in-memory par une DB

**Date :** 2026-03-13
**Statut :** A faire (P0)

## Contexte

`lib/payment-store.ts` utilise deux `Map<string, ...>` en memoire du process Node :

```ts
const payments = new Map<string, PaymentRecord>();
const packs = new Map<string, PackResult>();
```

Sur Vercel Serverless, chaque invocation peut tomber sur un cold start ou un pod different. Les Maps sont vides a chaque nouveau pod.

### Scenario de perte concret

1. User paie → webhook Stripe arrive → `markAsPaid()` ecrit dans la Map du **pod A**
2. User ferme l'onglet, revient, appelle `POST /api/pack` → tombe sur le **pod B** → `isPaid()` = `false` → **403 "Paiement non verifie"**
3. Le pack est perdu. L'idempotence (`isPackGenerated` / `getStoredPack`) est aussi cassee pour la meme raison.

Meme sans fermer l'onglet, avec du traffic, deux requetes consecutives peuvent tomber sur des pods differents.

## Options

### Option A : Supabase (Postgres)
- Gratuit en free tier, SDK simple, serverless-friendly.
- Une table `payments` + une table `packs`.
- Avantage : c'est la DB prevue pour toute la V2 (feedback, comptes, tokens). Autant la poser maintenant.

### Option B : Vercel KV (Redis)
- Key-value rapide, zero config cote Vercel.
- TTL natif pour nettoyer les vieux dossiers.
- Avantage : minimal, pas de schema. Inconvenient : il faudra quand meme une DB relationnelle pour la V2.

### Option C : Contournement sans DB (Stripe comme source de verite)
- Dans `/api/pack`, au lieu de `isPaid(dossierId)`, appeler `stripe.paymentIntents.search({ query: "metadata['dossierId']:'xxx'" })`.
- Stripe devient la "base de donnees" des paiements.
- Avantage : zero infra. Inconvenient : plus lent (~500ms), ne resout pas le stockage des packs generes.

## Decision

A trancher. Recommandation : **Option A (Supabase)** — c'est la fondation de toute la V2 (feedback, emails, tokens, comptes). Poser la DB maintenant evite une double migration.

## Consequences

- Le payment-store.ts devient un wrapper autour de Supabase au lieu des Maps.
- L'interface publique (`markAsPaid`, `isPaid`, `storePack`, `getStoredPack`) ne change pas — les appelants (webhook, pack) n'ont pas besoin de changer.
- Les packs survivent aux restarts, les users ne perdent plus leur achat.
- Prerequis pour la sequence emails feedback (P2) qui a besoin d'une DB de toute facon.
