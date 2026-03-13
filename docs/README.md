# Documentation — Conteste.app

## Structure

```
docs/
  backlog.md              ← Backlog priorise (P0/P1/P2/P3) — "quoi faire ensuite"
  decisions/
    001-*.md              ← ADR (Architecture Decision Records) — "pourquoi on a fait ca"
    002-*.md
    ...
CHANGELOG.md              ← Avancement factuel — "ce qu'on a livre"
```

## Comment utiliser

### Planifier → `backlog.md`
- Ajouter les nouvelles features/bugs avec une priorite (P0-P3)
- Cocher quand c'est fait
- Lier vers l'ADR si une decision a ete prise

### Documenter une decision → `docs/decisions/NNN-titre.md`
- Un fichier par decision, numerote sequentiellement
- Format : **Contexte** (pourquoi on en parle) → **Options** (ce qu'on a considere) → **Decision** (ce qu'on fait) → **Consequences** (ce que ca implique)
- Statuts : `Accepte` | `A faire` | `Remplace par ADR-XXX`

### Documenter l'avancement → `CHANGELOG.md`
- Une entree par session de travail
- Format factuel : ce qui a ete fait, pas pourquoi (le pourquoi est dans les ADRs)
