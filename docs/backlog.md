# Backlog — Conteste.app

Backlog priorise. Source de verite pour "qu'est-ce qu'on fait ensuite".

**Priorites :**
- **P0** : Bloquant production / perte de donnees
- **P1** : Necessaire pour un lancement credible
- **P2** : Amelioration significative post-lancement
- **P3** : Nice to have / futur

**Statuts :** `todo` | `in-progress` | `done`

---

## P0 — Bloquant production

- [x] **Persistance paiements et packs** — `done` — Supabase Postgres connecté, 4 tables créées, routes API migrées en double-write (mémoire + DB), fallback si pas de DB. → [ADR-002](decisions/002-payment-store-persistence.md)
- [x] **SEO anti-déréférencement** — `done` — Enrichissement données départements (8 champs), contenu unique par page (intros, stats locales, articles de loi), liens internes latéraux (3 composants), signaux E-E-A-T (page À propos, AuthorBox, SourcesBadge), dates variées, sitemap corrigé. 514 pages, build OK. → [ADR-004](decisions/004-seo-anti-dereferencement.md)
- [ ] **Régénérer toutes les clés API** — `todo` — Anthropic, Stripe, Resend, Supabase. Les clés actuelles ont été exposées pendant la session de setup initiale.
- [ ] **Supprimer le token Vercel temporaire** — `todo` — créé pendant le setup.

## P1 — Lancement credible

- [x] **Email confirmation paiement** — `done` — auto-envoi Resend dès que le pack se charge (plus besoin de clic), bouton "Renvoyer" disponible. Template, route API, logging DB tous opérationnels.
- [ ] **Tester le flow complet avec vraies cles API** — upload photo reelle → extraction Claude Vision → scoring → paiement Stripe test → pack → email.
- [x] **Webhook Stripe en production** — `done` — endpoint créé via API (`https://www.conteste.app/api/webhook`, event `payment_intent.succeeded`), secret mis à jour sur Vercel, paiement test validé. Note : clés encore en mode test, passage en live requis.
- [x] **Google Search Console** — `done` — domaine vérifié, sitemap soumis (497 pages découvertes, traitement réussi).
- [ ] **Tests E2E** — flow complet sur iPhone Safari + Chrome Android.
- [ ] **Pages legales** — verifier le contenu CGU, mentions legales, confidentialite (pages creees mais contenu a valider).

## P2 — Post-lancement

- [ ] **Sequence emails feedback** — J+60, J+90, J+120 (Resend + Vercel Cron). Coeur du data flywheel. Le PRD detaille la sequence complete et les templates.
- [ ] **Pricing dynamique** — <68€ → 7,99€ / 68-200€ → 14,90€ / >200€ → 24,90€. Le code est commente dans `/api/payment`.
- [ ] **Token dossier gratuit** — incentive feedback : un dossier gratuit via lien magique tokenise (JWT) en echange du retour resultat.
- [ ] **Collecte preuve** — photo du courrier ANTAI → Claude Vision extrait le resultat officiel → certificat PDF. Donnees verifiees vs declaratif.
- [ ] **DOM-TOM** — ajouter les departements d'outre-mer (regimes juridiques differents, portails specifiques).
- [ ] **Pipeline blog automatique** — a partir de ~200 dossiers. Cron hebdo : agregation anonymisee → articles "cas reels" via Claude API → publication auto sur /blog/.

## P3 — Futur

- [ ] **Comptes utilisateur** — magic link via Resend (passwordless). Uniquement quand le dossier gratuit le justifie (~M3).
- [ ] **Push notifications PWA** — Web Push API pour rappels dossier et feedback. Necessite comptes.
- [ ] **B2B flottes** — abonnement mensuel illimite pour VTC, livreurs, entreprises. Ticket eleve, volume garanti (~M6+).
- [ ] **Fine-tuning modele** — a partir de 2000-3000 dossiers avec feedback resultat (~M12). Modele calibre sur des cas reels francais.
- [ ] **Veille jurisprudence** — scraping Legifrance automatise, resumes accessibles des decisions recentes sur les contraventions.

---

*Dernière mise à jour : 2026-03-13 (session 2 — email auto-send + webhook Stripe configuré)*
