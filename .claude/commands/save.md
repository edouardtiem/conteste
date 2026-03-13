# Save — Conteste.app Session Checkpoint

You are saving a checkpoint for the current work session on Conteste.app. Update all project documentation automatically based on what happened in this conversation.

**DO NOT** commit, push, or end the session. This is just a documentation checkpoint.

## Steps

### 1. Analyze the conversation

Review everything that was discussed and done in this conversation:
- What was built, fixed, or changed?
- What decisions were made and why?
- What new issues or tasks were discovered?
- What's the current state of work?

### 2. Update `docs/backlog.md`

Read `docs/backlog.md` and update it:
- **Check off** (`[x]`) items that were completed this session
- **Add new items** discovered during the session (bugs found, features identified, tech debt spotted) — place them in the right priority tier (P0/P1/P2/P3)
- **Link to ADRs** if a decision was documented for that item (e.g. `→ [ADR-NNN](decisions/NNN-titre.md)`)
- **Update the "Derniere mise a jour" date** at the bottom

### 3. Create new ADRs in `docs/decisions/` (if decisions were made)

If any architectural or technical decisions were made during this session, create a new ADR file for each.

**First:** Read the existing files in `docs/decisions/` to find the next available number (e.g., if 002 exists, next is 003).

**File format:** `docs/decisions/NNN-slug-descriptif.md`

**Template:**
```markdown
# ADR-NNN : Titre de la decision

**Date :** YYYY-MM-DD
**Statut :** Accepte | A faire | Remplace par ADR-XXX

## Contexte

Pourquoi on en parle. Quel probleme ou quelle question s'est posee.

## Options

### Option A : Nom
- Description, avantages, inconvenients

### Option B : Nom
- Description, avantages, inconvenients

## Decision

Ce qu'on a choisi (ou "A trancher" si pas encore decide).

## Consequences

Ce que ca implique concretement. Impact sur le code, l'infra, le workflow.
```

**Rules:**
- Write in French (no accents in filenames, accents OK in content)
- Be specific about the "why" — the context should explain the problem clearly enough that someone reading it 6 months later understands
- Include concrete code snippets or file paths when relevant
- Link back from the backlog item to the ADR

### 4. Update `CHANGELOG.md`

Read `CHANGELOG.md` and add a new entry (or update today's entry if one exists) at the top of the file, below the header.

**Format:**
```markdown
## YYYY-MM-DD

### Section (e.g., Infrastructure, Application, SEO, Corrections, Documentation)

- [x] **Titre court** : description factuelle de ce qui a ete fait
- [x] **Autre chose** : description

### ⚠️ TODO avant production (if applicable)
- [ ] Item a faire
```

**Rules:**
- Keep it factual — what was done, not why (the "why" is in the ADRs)
- Group by theme (Infrastructure, Application, SEO, Corrections, Documentation, etc.)
- Use `[x]` for completed items, `[ ]` for TODOs
- If today's date already has an entry, **append** to it (don't create a duplicate date block)

### 5. Summary output

After all updates, output a brief summary:

```
## Checkpoint saved

**Done this session:**
- Item 1
- Item 2

**Decisions documented:**
- ADR-NNN: titre

**Backlog changes:**
- Added: X new items
- Completed: Y items

**Next steps:**
- What to do next
```

## Important

- This is a CHECKPOINT — do NOT commit, push, or end the session
- Write in French (matching the existing docs style)
- Do not add accents in filenames
- Be concise — no fluff, just facts
- If nothing changed for a section (e.g., no new ADRs needed), skip it silently

**Begin checkpoint now.**
