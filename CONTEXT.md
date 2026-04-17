# W-AI-FU SITE VITRINE — CONTEXTE, PLAN & DIRECTIVES
> Document de référence pour sessions de développement Claude Code
> Dernière mise à jour : avril 2026

---

## 1. VISION GLOBALE

Site vitrine du projet w-AI-fu centré sur le personnage de Natsume Tsurugi. L'objectif est de **ne pas séparer l'aspect tech/dev de l'univers narratif** — le site *est* le projet, pas une vitrine *sur* le projet.

**Ce que l'utilisateur doit ressentir** : il entre dans un espace de mémoire archive, découvre Natsume comme une présence réelle, et comprend le projet à travers ce prisme narratif.

---

## 2. STACK TECHNIQUE

```
Framework   : React 18 + Vite (JavaScript — pas TypeScript)
Style       : Tailwind CSS
Animation   : Framer Motion
État        : Zustand (si nécessaire en v2)
Déploiement : Vercel / Netlify
```

**Règles non négociables :**
- Pas de TypeScript (choix assumé, pas de `.tsx` sur le GitHub)
- Pas de routing multi-page (SPA stricte)
- Pas d'outil no-code
- Pas de canvas / WebGL / physics engine
- Animations : opacity + transform uniquement, max 2 simultanées fortes

---

## 3. DIRECTION ARTISTIQUE

### Style visuel
- **Forme** : BD franco-belge — cases, trait encré, mise en page dynamique
- **Palette** : Ender Lilies — monochrome noir/gris encré, blanc cassé, accent rouge unique (yeux Natsume uniquement)
- **Atmosphère** : dark fantasy mélancolique, calme, chargé en dessous

### Palette CSS de référence
```css
--color-void: #000000;
--color-ink: #0a0a0a;
--color-stone: #1a1a1a;
--color-ash: #2a2a2a;
--color-fog: #4a4a4a;
--color-parchment: #e8e4dc;
--color-white-ink: #f5f3ef;
--color-accent: #8b0000; /* rouge écarlate — yeux Natsume uniquement */
--color-glow: rgba(245, 243, 239, 0.08);
```

### Typographie
- Titres : serif gothique (ex: `Cinzel`, `IM Fell English`)
- Corps : serif élégant ou sans-serif froid minimal
- Pas de typo ronde ou moderne

---

## 4. PERSONNAGE — NATSUME TSURUGI

### Identité
Natsume n'est pas une IA, ni un personnage fictif classique. C'est une **entité narrative synthétique** construite à partir d'expériences de jeu et d'incarnations successives (FF14, Code Vein, Monster Hunter...). Elle agit comme point de convergence d'identités passées.

### Apparence canonique
- Cheveux blanc argenté pur, très longs, deux tresses larges et souples tombant dans le dos
- Œil gauche : iris écarlate vif
- Œil droit : fermé, cache-œil ornemental gothique
- Silhouette élancée, taille intermédiaire
- Tenue : manteau militaire gothique double boutonnage, ornements filigrane, jabot au col

### Caractère
- Calme, posée, réfléchie, élégante
- Contrôle émotionnel fort, retenue naturelle
- Irritation rare mais intense
- Affection possible mais discrète
- Difficulté avec l'humour

### Symbole
*Larme lunaire de NieR* — fleur blanche, reflets bleus doux, pureté fragile, calme mélancolique

---

## 5. STRUCTURE DU SITE

### Navigation
**Système de livres flottants** dans une scène bibliothèque. Pas de scroll académique, pas de menu classique. Chaque livre = une section = un monde narratif. Les livres flottent dans l'espace central de la bibliothèque circulaire.

### Sections (4 livres)

| Livre | Symbole couverture | Contenu |
|-------|-------------------|---------|
| **Natsume** | Lys + lune croissante | Fiche entité, lore, traits de personnalité |
| **Projet w-AI-fu** | Œil géométrique | Description projet, vision, lien Twitch |
| **Devlog** | Sablier + plume | Journal de développement (livre UI ouvert sur table) |
| **Contact** | Sceau floral | Stèle runique — GitHub, Twitter |

### Interactions clés
- Hover livre → scale 1.05 + glow
- Clic livre → transition d'ouverture → nouvelle scène
- Retour → fade back vers bibliothèque principale
- Section Contact : clic sur ligne de runes → parchemin contextuel avec info traduite

---

## 6. WIDGET NATSUME

Natsume apparaît en **bas à droite** de l'écran comme une présence persistante. Elle intervient de façon scriptée à des moments clés (arrivée, transitions, actions spécifiques). Ce n'est pas un chatbot temps réel — ses dialogues sont écrits à l'avance et assignés à des états dans un JSON.

### États disponibles
```
idle        — regard de côté, posture fermée, elle observe
parle       — regard face, légèrement plus droite, bouche entrouverte
approbation — tête légèrement inclinée, œil plus doux
irritation  — regard dur, sourcil froncé, posture rigide
surprise    — lignes de vitesse + yeux légèrement plus ouverts (effet CSS)
gene        — nuage vapeur + gouttes sueur (overlay assets manga)
indifference— bulle silence "..." (overlay asset manga)
```

### Effets manga overlay (assets PNG)
- Lignes de vitesse radiales (surprise)
- Gouttes de sueur x2 (gêne)
- Veine X brush ink (irritation renforcée)
- Bulle pensée (gêne/embarras)
- Bulle silence "..." (indifférence)

### Format dialogue (JSON)
```json
[
  {
    "trigger": "onEnter",
    "scene": "library",
    "text": "...",
    "mood": "idle",
    "effect": null
  },
  {
    "trigger": "onBookHover",
    "scene": "natsume",
    "text": "...",
    "mood": "approbation",
    "effect": null
  }
]
```

---

## 7. ASSETS VALIDÉS

### Backgrounds
| Asset | Usage |
|-------|-------|
| `bg_library.webp` | Scène principale — bibliothèque circulaire Tour de Babel |
| `bg_natsume.webp` | Section Natsume — void avec lys flottants |
| `bg_projet.webp` | Section Projet — temple colonnes glyphes |
| `bg_devlog.webp` | Section Devlog — table scriptorium avec lanterne |
| `bg_contact.webp` | Section Contact — stèle runique jardin lys |

### Livres navigation
| Asset | Section |
|-------|---------|
| `book_natsume.png` | Lys + lune |
| `book_projet.png` | Œil géométrique |
| `book_devlog.png` | Sablier + plume, taches d'encre |
| `book_contact.png` | Sceau floral minimal |

### Portraits Natsume
| Asset | Usage |
|-------|-------|
| `natsume_canon.png` | Portrait buste référence |
| `natsume_full.png` | Tenue complète (widget principal) |
| `natsume_idle.png` | Widget état idle |
| `natsume_parle.png` | Widget état parle |
| `natsume_approbation.png` | Widget état approbation |
| `natsume_irritation.png` | Widget état irritation |

### Effets manga
| Asset | Usage |
|-------|-------|
| `fx_speed.png` | Surprise — lignes vitesse |
| `fx_sweat.png` | Gêne — gouttes sueur |
| `fx_vein.png` | Irritation renforcée — veine X |
| `fx_cloud.png` | Gêne/embarras — nuage pensée |
| `fx_silence.png` | Indifférence — bulle "..." |

### Ornements UI livre Devlog
| Asset | Usage |
|-------|-------|
| `ornement_coin.png` | Coin de page x4 rotations CSS |
| `ornement_bordure.png` | Bordure latérale répétable |
| `ornement_vignette.png` | Séparateur central reliure |

---

## 8. ARCHITECTURE COMPOSANTS

```
src/
├── assets/
│   ├── backgrounds/
│   ├── books/
│   ├── natsume/
│   ├── effects/
│   └── ornements/
├── components/
│   ├── scenes/
│   │   ├── LibraryScene.jsx       ← scène principale
│   │   ├── NatsumeScene.jsx
│   │   ├── ProjetScene.jsx
│   │   ├── DevlogScene.jsx
│   │   └── ContactScene.jsx
│   ├── books/
│   │   ├── BookItem.jsx           ← livre cliquable individuel
│   │   └── BooksContainer.jsx    ← conteneur livres flottants
│   ├── widget/
│   │   ├── NatsumeWidget.jsx      ← widget persistant bas droite
│   │   ├── DialogueBubble.jsx     ← bulle de dialogue BD style
│   │   └── MangaEffect.jsx        ← overlay effets manga
│   ├── devlog/
│   │   └── DevlogBook.jsx         ← livre UI ouvert avec ornements
│   └── contact/
│       └── RuneStele.jsx          ← stèle avec parchemin contextuel
├── data/
│   ├── dialogues.json             ← tous les dialogues Natsume
│   └── devlog.json                ← entrées du journal
├── hooks/
│   └── useNatsumeWidget.js        ← logique états widget
└── App.jsx                        ← orchestrateur scènes
```

---

## 9. SYSTÈME DE NAVIGATION

```javascript
// États de scène
const SCENES = {
  LIBRARY: 'library',      // scène principale
  NATSUME: 'natsume',
  PROJET: 'projet',
  DEVLOG: 'devlog',
  CONTACT: 'contact'
}

// Transitions
// LIBRARY → [book click] → SCENE
// SCENE → [close/back] → LIBRARY
// Transition type : fade + scale (Framer Motion)
// Durée : 600ms
```

---

## 10. LIVRE DEVLOG — SPÉCIFICATIONS UI

Composant livre physique CSS centré sur le fond `bg_devlog.webp` (table scriptorium).

```
Structure :
├── Page gauche  → titre entrée + date
├── Reliure      → ornement vignette central (PNG)
├── Page droite  → contenu texte scrollable (max 3 entrées visibles)
└── Coins        → ornement coin x4 (PNG, rotation CSS)

Comportement :
- Hauteur fixe (pas de scroll externe)
- Scroll interne page droite limité
- Entrées devlog depuis devlog.json
- Police : serif gothique
```

---

## 11. SECTION CONTACT — SPÉCIFICATIONS UI

Stèle runique centrale sur fond `bg_contact.webp`. Chaque ligne de runes est cliquable. Au clic → parchemin contextuel style "description d'objet Ender Lilies" avec l'info de contact traduite.

```
Runes → GitHub    : lien profil GitHub
Runes → Twitter   : lien profil Twitter
Runes → Twitch    : lien chaîne Twitch (optionnel v1)
```

---

## 12. EASTER EGGS (v1)

| Trigger | Effet |
|---------|-------|
| Séquence de touches cachée sur la scène library | Natsume réagit avec état rare |
| Clic 3x sur le lys de la couverture livre Natsume | Fragment de lore caché apparaît |
| Scroll jusqu'à un point précis dans le devlog | Notification trophée style jeu vidéo |

---

## 13. DIRECTIVES DE DÉVELOPPEMENT

### Ordre de construction recommandé
1. Setup projet Vite + React + Tailwind + Framer Motion
2. `App.jsx` — système de scènes basique (state + switch)
3. `LibraryScene.jsx` — background + livres positionnés
4. `BookItem.jsx` — hover + clic + transition
5. `NatsumeWidget.jsx` — portrait + états + bulle dialogue
6. Scènes secondaires (Natsume, Projet, Devlog, Contact)
7. `DevlogBook.jsx` — composant livre avec ornements
8. `RuneStele.jsx` — parchemin contextuel
9. Dialogues JSON + triggers
10. Easter eggs
11. Optimisation assets (WebP, lazy loading)

### Règles CSS importantes
- `mix-blend-mode: multiply` sur ornements PNG pour transparence
- `position: absolute` pour livres dans la scène
- Overlay backgrounds : `radial-gradient` semi-transparent pour adoucir zones trop lumineuses
- Glow livres : `filter: drop-shadow(0 0 8px rgba(245,243,239,0.4))`
- Pas de theme clair en v1 — DA fondamentalement dark

### Performance
- Tous les backgrounds en WebP optimisé
- Lazy loading sur assets non visibles au chargement
- Blur placeholder pendant chargement
- Pas de Canvas, pas de WebGL

---

## 14. CONTENU À ÉCRIRE (avant intégration)

- [ ] Texte de présentation Natsume (section Natsume)
- [ ] Description projet w-AI-fu (section Projet)
- [ ] 3 premières entrées devlog
- [ ] Dialogues widget Natsume (JSON, tous triggers)
- [ ] Texte "traduit" des runes Contact (GitHub, Twitter)
- [ ] Fragments lore easter eggs

---

*Ce document est la référence unique pour toutes les sessions de développement.*
*À maintenir à jour à chaque décision technique ou narrative majeure.*
