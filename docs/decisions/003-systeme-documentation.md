# ADR-003 : Systeme de documentation projet

**Date :** 2026-03-13
**Statut :** Accepte

## Contexte

Le projet avait plusieurs fichiers de documentation eparpilles (DECISIONS.md, ARCHITECTURE.md, BUILD_REPORT.md, CHANGELOG.md) avec du contenu redondant et pas de systeme structure pour planifier les features, tracker l'avancement et documenter les decisions.

Besoin d'un systeme unique pour :
1. Planifier les features et choses a faire
2. Documenter l'avancement
3. Documenter les decisions et changements (avec le "pourquoi")

## Options

### Option A : Outil externe (Linear, Notion, etc.)
- Avantage : UI riche, collaboration, notifications
- Inconvenient : deconnecte du code, necessite un compte, pas accessible a Claude Code

### Option B : Fichiers markdown dans le repo
- Avantage : versionne avec le code, accessible a Claude Code, zero tooling, grep-able
- Inconvenient : pas de UI riche

## Decision

**Option B** — structure fichiers markdown :

```
docs/
  backlog.md              ← Backlog priorise (P0/P1/P2/P3)
  decisions/
    001-*.md              ← ADR (Architecture Decision Records)
    002-*.md
    ...
CHANGELOG.md              ← Avancement factuel
```

- `backlog.md` : source de verite pour "quoi faire ensuite", priorise P0→P3
- `docs/decisions/NNN-titre.md` : un fichier par decision, format ADR (Contexte → Options → Decision → Consequences)
- `CHANGELOG.md` : log factuel de ce qui a ete livre, par session
- `/save` command project-level (`.claude/commands/save.md`) pour mettre a jour automatiquement les 3 docs a chaque checkpoint

Les anciens fichiers (DECISIONS.md, ARCHITECTURE.md, BUILD_REPORT.md) ont ete consolides et supprimes.

## Consequences

- Toute la documentation projet est dans `docs/` + `CHANGELOG.md`
- Claude Code peut lire et mettre a jour la doc automatiquement via `/save`
- Les decisions sont tracees individuellement avec leur contexte, facilitant la comprehension 6 mois plus tard
- Le backlog remplace la gestion mentale des priorites
