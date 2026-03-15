# ADR-005 : SEO — Améliorations V2 (qualité contenu + conversion)

**Date :** 2026-03-15
**Statut :** Accepté

## Contexte

Suite au déploiement de la stratégie anti-déréférencement (ADR-004), plusieurs problèmes de qualité ont été identifiés sur les 480 pages département :

1. **Accents manquants** — `lib/geo-content.ts` génère du texte sans accents ("departement", "reussite", "donnees"), visible en production
2. **Prépositions géographiques incorrectes** — "dans le Paris", "dans le Alpes-Maritimes" au lieu de "à Paris", "en Alpes-Maritimes"
3. **Capitalisation incohérente** — "Contester une Amende radar" au lieu de "Contester une amende radar"
4. **Typo juridique** — "exération" au lieu de "exonération" (page département, section "Ce que vous devez savoir")
5. **Stats locales inventées** — chiffres pseudo-aléatoires (radars, taux de réussite, contestations annuelles) présentés comme sourcés ONISR, risque crédibilité
6. **Contenu identique** — malgré ADR-004, les pages restent similaires ; potentiel thin content
7. **Pas de funnel SEO → produit** — les pages guides n'orientent pas vers la conversion

## Décision

5 chantiers à implémenter séquentiellement :

### Chantier 1 — Bugs critiques (priorité absolue)
- Corriger tous les accents manquants dans `lib/geo-content.ts`
- Créer un helper `prepositionDept()` dans `lib/geo.ts` pour les prépositions géographiques correctes
- Corriger la capitalisation des titles/H1 (label en minuscules)
- Corriger la typo "exération" → "exonération"

### Chantier 2 — Enrichissement contenu
- Supprimer les stats locales inventées (section "Le saviez-vous ?")
- Remplacer par une section "Contexte local" avec données factuelles (axes surveillés, tribunal, spécificités)
- Ajouter un encart conseil "Où placer vos arguments sur ANTAI"

### Chantier 3 — Bloc conversion SEO → produit
- Nouveau bloc "Comment maximiser vos chances de contestation"
- CTA intégré avec estimation gratuite
- Placement entre motifs et étapes

### Chantier 4 — Polish SEO
- Meta descriptions < 160 caractères avec préposition correcte
- Titles avec année (signal fraîcheur)
- Table des matières collapsible sur mobile
- Liens internes manquants

### Chantier 5 — Vérifications post-deploy
- Script de vérification automatisé

## Conséquences

### Positif
- Qualité linguistique correcte (accents, prépositions, capitalisation)
- Contenu unique réellement différencié par département
- Funnel SEO → conversion intégré
- Stats uniquement vérifiables (nationales) — crédibilité renforcée

### Négatif
- Suppression des stats locales réduit le volume de contenu unique par page
- Le champ `contexteLocal` dans departements.json nécessite un travail manuel ou semi-automatisé

### Fichiers clés
- `lib/geo.ts` (nouveau) — helper prépositions géographiques
- `lib/geo-content.ts` — correction accents, refonte stats
- `lib/data.ts` — intégration prépositions dans FAQ
- `app/guides/[type]/[dept]/page.tsx` — corrections titres, prépositions, nouveau bloc
- `app/guides/[type]/page.tsx` — corrections titres
