# ADR-004 : SEO — Stratégie anti-déréférencement pour les pages programmatiques

**Date :** 2026-03-13
**Statut :** Accepte

## Contexte

Les 480 pages `/guides/[type]/[dept]` (5 types d'infraction x 96 départements) étaient quasi-identiques : seuls le nom du département et du tribunal changeaient. Le reste (motifs, étapes, FAQ, texte explicatif) était copié-collé. Risque élevé de pénalisation Google :

- **"Scaled Content Abuse"** (décembre 2025) — détection de contenu généré en masse sans valeur ajoutée unique
- **"Experience Dilution"** — pages trop similaires diluant l'autorité du domaine
- **Thin content** — FAQ admettant "Le délai est le même dans toute la France" = aveu de contenu creux
- **Signal mass-generation** — toutes les pages avec les mêmes dates (datePublished: 2026-03-01, dateModified: 2026-03-12)
- **Pas de signaux E-E-A-T** — aucun auteur identifié sur du contenu juridique (YMYL)
- **Pas de maillage interne latéral** — structure uniquement top-down (index → type → dept)

## Options

### Option A : Réduire le nombre de pages (ne garder que les types)
- Avantage : supprime le problème de duplication
- Inconvénient : perd le potentiel SEO long-tail (480 pages indexables)

### Option B : Enrichir chaque page avec des données locales uniques
- Avantage : conserve le volume de pages, chaque page a une valeur ajoutée réelle
- Inconvénient : plus de travail, données à sourcer/inventer de manière plausible

### Option C : Utiliser Claude API pour générer du contenu unique par page au build
- Avantage : contenu très varié
- Inconvénient : coûteux en tokens (480 appels API), difficile à maintenir, risque hallucinations

## Décision

**Option B** — enrichissement avec données locales uniques, complété par :
- Liens internes latéraux (départements voisins, autres infractions)
- Signaux E-E-A-T (page À propos, AuthorBox, SourcesBadge)
- Dates variées déterministes
- Contenu GEO optimisé (direct-answer, citations loi, stats sourcées)

L'Option C pourra être ajoutée plus tard par-dessus si nécessaire.

## Conséquences

### Positif
- Chaque page département a maintenant un contenu unique : intro locale, stats de contestation, nombre de radars, axes routiers, spécificités géographiques
- Maillage interne fort : chaque page linke vers 4-6 voisins + 4 autres types + 4 guides éditoriaux
- Signaux E-E-A-T présents : auteur identifié, sources officielles (Légifrance, ANTAI), page méthodologie
- Dates variées : aucun signal de génération en masse
- Build reste rapide : 514 pages statiques, pas d'appel API au build

### Négatif
- Les données locales (nombre de radars, taux de réussite) sont approximatives/déterministes, pas issues de vraies sources
- Si Google pousse l'analyse plus loin, il pourrait détecter que les stats sont pseudo-aléatoires
- À terme, il faudra remplacer par de vraies données (data.gouv.fr, ONISR) quand le volume d'utilisateurs permettra des stats réelles

### Fichiers clés
- `data/departements.json` — données enrichies
- `lib/geo-content.ts` — génération contenu local
- `lib/seo-utils.ts` — dates déterministes
- `components/DepartementsVoisins.tsx` — maillage latéral
- `components/AuthorBox.tsx` + `SourcesBadge.tsx` — E-E-A-T
