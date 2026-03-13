# PRD Design — Conteste.app
**Version** : 1.0
**Date** : Mars 2026

---

## Direction artistique

### Positionnement
Style **service public français** — inspiré du DSFR (Design System de l'État) et du site ANTAI. L'objectif n'est pas de copier mais de créer un environnement familier pour des utilisateurs de tous horizons, y compris en zone rurale. Le visiteur ne doit jamais se sentir perdu ou avoir l'impression d'être sur un "site IA".

### Ton
- **Pro et rassurant** — le visiteur vient de recevoir une amende, il est stressé
- **Accessible** — pas de jargon technique, langage clair et direct
- **Sympa sans être familier** — tutoiement exclu, vouvoiement systématique
- **Factuel** — chiffres, délais, références légales visibles

---

## Palette de couleurs

### Couleurs principales
| Variable | Hex | Usage |
|----------|-----|-------|
| `--bleu-france` | `#000091` | CTA, liens, éléments interactifs, bordures accent |
| `--bleu-france-hover` | `#1212FF` | Hover sur éléments bleus |
| `--bleu-clair` | `#E3E3FD` | Bordures accent légères |
| `--bleu-fond` | `#F5F5FE` | Fonds de sections, héros, zones mises en avant |

### Couleurs sémantiques
| Variable | Hex | Usage |
|----------|-----|-------|
| `--vert-succes` | `#18753C` | Score fort, badges positifs |
| `--vert-fond` | `#B8FEC9` | Fond badges positifs |
| `--orange-warning` | `#D64D00` | Alertes, warnings, score faible |
| `--orange-fond` | `#FFE8E5` | Fond alertes |
| `--rouge-erreur` | `#CE0500` | Erreurs critiques |

### Neutres
| Variable | Hex | Usage |
|----------|-----|-------|
| `--gris-titre` | `#161616` | Titres, texte fort |
| `--gris-texte` | `#3A3A3A` | Corps de texte |
| `--gris-mention` | `#666666` | Texte secondaire, labels |
| `--gris-bordure` | `#DDDDDD` | Bordures, séparateurs |
| `--gris-fond` | `#F6F6F6` | Fonds secondaires, footer |
| `--blanc` | `#FFFFFF` | Fond principal |

---

## Typographie

- **Police principale** : Marianne (police officielle du gouvernement français)
- **Fallback** : -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
- **Graisses utilisées** : 400 (corps), 500 (semi-gras), 700 (gras), 800 (extra-gras titres)

### Échelle typographique
| Élément | Taille | Graisse |
|---------|--------|---------|
| H1 (hero) | 28px mobile / 36px desktop | 800 |
| H2 (section) | 22px | 800 |
| H3 (card) | 16-18px | 700 |
| Corps | 15px | 400 |
| Mention/label | 13-14px | 400-700 |
| Badge | 13px | 700 |
| Bouton | 15-16px | 700 |

---

## Composants UI

### Boutons
- **Primaire** : fond `--bleu-france`, texte blanc, radius 4px, padding 14px 32px, min-height 48px
- **Secondaire** : fond blanc, bordure `--bleu-france`, texte bleu, même dimensions
- **Touch targets** : minimum 48px (accessibilité mobile)
- **Pas d'ombres, pas de gradients** — style plat service public

### Cards
- Fond blanc, bordure 1px `--gris-bordure`, radius 8px
- Padding 24px
- Variante accent : bordure gauche 4px `--bleu-france` (cards arguments)
- Pas de box-shadow

### Upload zone
- Bordure 2px dashed `--gris-bordure`, radius 8px
- Hover : bordure `--bleu-france`, fond `--bleu-fond`
- Deux boutons côte à côte (photo / fichier), même poids visuel

### Badges de score
- Fort : fond `--vert-fond`, texte `--vert-succes`
- Moyen : fond `#FEF7DA`, texte `#B34000`
- Faible : fond `--orange-fond`, texte `--orange-warning`
- Border-radius 24px (pill shape)

### Warning banners
- Fond `--orange-fond`, bordure gauche 4px `--orange-warning`
- Titre en gras orange, texte normal

### Bloc motif copiable
- Bordure 2px `--bleu-france`, radius 8px, padding 24px
- Label uppercase bleu
- Texte en italique
- Bouton "Copier" avec icône clipboard

### Blurred teaser (paywall)
- Contenu avec `filter: blur(6px)`, non sélectionnable
- Overlay blanc semi-transparent (60% opacité)
- Icône cadenas + CTA centré

---

## Layout

### Général
- Max-width contenu : 1000px (landing), 500px (flow app)
- Padding horizontal : 24px mobile, 32px desktop
- Mobile first — breakpoint unique à 500px

### Header
- Fond blanc, bordure inférieure 3px `--bleu-france`
- Logo "RF" dans carré bleu 44x44 + nom "conteste.app" en 20px bold bleu
- Baseline : "Contestez vos amendes en ligne" en 12px gris

### Footer
- Fond `--gris-fond`, bordure supérieure 1px
- Liens : mentions légales, CGU, confidentialité, contact
- Mention : "Ce n'est pas un cabinet d'avocats"

---

## Espacements (tokens)

| Token | Valeur |
|-------|--------|
| `--space-xs` | 4px |
| `--space-sm` | 8px |
| `--space-md` | 16px |
| `--space-lg` | 24px |
| `--space-xl` | 32px |
| `--space-2xl` | 48px |
| `--space-3xl` | 64px |

---

## Principes de design

1. **Pas de "look IA"** — pas d'icônes robot, pas de gradients néon, pas de termes comme "IA" ou "intelligence artificielle" en front
2. **Familiarité service public** — l'utilisateur doit sentir qu'il est sur un outil sérieux, proche des services qu'il connaît
3. **Zéro friction mobile** — chaque écran doit être utilisable d'une main sur un iPhone SE
4. **Information progressive** — ne montrer que ce qui est nécessaire à chaque étape
5. **Réassurance constante** — à chaque étape, rappeler la sécurité des données et le délai restant

---

## Référence prototype

Le fichier `prototype.html` à la racine du repo contient le rendu visuel complet des 6 écrans du flow.
