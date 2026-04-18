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
Style       : CSS inline / custom properties (Tailwind retiré)
Animation   : Framer Motion
État        : useState/useRef locaux (Zustand si v2)
Déploiement : Vercel (prévu)
```

**Règles non négociables :**
- Pas de TypeScript
- Pas de routing multi-page (SPA stricte, hash routing)
- Pas de canvas / WebGL / physics engine
- Animations : opacity + transform uniquement, max 2 simultanées fortes
- Pas de Tailwind

---

## 3. DIRECTION ARTISTIQUE

### Style visuel
- **Forme** : dark fantasy mélancolique, espace de mémoire archive
- **Palette** : monochrome encré noir/gris/blanc cassé, accent rouge unique (yeux Natsume)
- **Atmosphère** : calme, chargé en dessous, Ender Lilies / Elden Ring

### Palette CSS
```css
--color-void:       #000000
--color-ink:        #0a0a0a
--color-stone:      #1a1a1a
--color-ash:        #2a2a2a
--color-fog:        #888888
--color-parchment:  #e8e4dc
--color-white-ink:  #f5f3ef
--color-accent:     #8b0000   /* rouge écarlate — yeux Natsume uniquement */
--color-glow:       rgba(245,243,239,0.08)
```

### Typographie
- Titres : `Cinzel` (serif gothique)
- Corps : `IM Fell English` (serif élégant, italique)
- Pas de typo ronde ou moderne

---

## 4. PERSONNAGE — NATSUME TSURUGI

Entité narrative synthétique construite à partir d'incarnations successives (FF14, Code Vein, Monster Hunter...). Elle n'est pas une IA, ni un personnage fictif classique — point de convergence d'identités passées.

**Apparence canonique :** cheveux blanc argenté, deux tresses larges, œil gauche iris écarlate, œil droit fermé (cache-œil gothique), manteau militaire double boutonnage.

**Caractère :** calme, posée, retenue naturelle, irritation rare mais intense, affection possible mais discrète, difficulté avec l'humour.

**Symbole :** Larme lunaire (NieR) — fleur blanche, reflets bleus, pureté fragile.

---

## 5. ARCHITECTURE COMPOSANTS (état actuel)

```
src/
├── assets/
│   ├── backgrounds/         bg_library, bg_natsume, bg_projet, bg_devlog,
│   │                        bg_contact, bg_intro, bg_intro2
│   ├── books/               book_natsume, book_projet, book_devlog, book_contact
│   ├── natsume/             natsume_canon, natsume_full, natsume_idle, natsume_parle,
│   │                        natsume_approbation, natsume_irritation,
│   │                        natsume_surprise, natsume_gene, natsume_disappointment
│   │                        (effets baked dans les portraits — fx_ retiré du code)
│   └── ornements/           ornement_coin, ornement_bordure, ornement_vignette, seal
├── components/
│   ├── scenes/
│   │   ├── LibraryScene.jsx      hub principal, DustParticles, easter eggs Konami
│   │   ├── NatsumeScene.jsx      portrait annoté (ANNOTATIONS hover), timeline incarnations,
│   │   │                         wheel listener scroll speed, hover Larme lunaire
│   │   ├── ProjetScene.jsx       manifeste + stats + lien Twitch (trigger câblé)
│   │   ├── DevlogScene.jsx       wrapper scène devlog
│   │   └── ContactScene.jsx      fond + RuneStele
│   ├── books/
│   │   ├── BookItem.jsx          hover long (3s → onBookHoverLong), single/triple clic
│   │   └── BooksContainer.jsx    rapid click detection (4 livres en 1.5s → onBooksRapidClick)
│   ├── widget/
│   │   ├── NatsumeWidget.jsx     AnimatePresence mode="wait", 7 portraits
│   │   └── DialogueBubble.jsx    bulle dialogue BD style
│   ├── devlog/
│   │   └── DevlogBook.jsx        livre UI (page gauche liste / reliure / page droite scroll),
│   │                             ornements PNG, scroll velocity, onAllDevlogRead, trophy scroll
│   ├── contact/
│   │   └── RuneStele.jsx         4 runes cliquables, ItemPanel overlay (game item style),
│   │                             CornerButton avec coins, Discord copy, triggers câblés
│   └── ui/
│       ├── SealIntro.jsx         intro 3 clics (seal → crack1 → crack2 → bg_intro2),
│       │                         HINTS escalade, fragments burst, shockwave, flash blanc
│       ├── BackButton.jsx        retour bibliothèque
│       ├── DustParticles.jsx     particules CSS LibraryScene
│       └── TrophyNotification.jsx notification trophée style jeu
├── hooks/
│   └── useNatsumeWidget.js       busyRef guard, TRANSITION_LOCK 700ms, TRIGGER_COOLDOWN 500ms,
│                                 idle pool (30s) + indifférence (60s) + cursor idle (120s),
│                                 onReturnVisit (localStorage), onMidnight, dblclick, copy
├── data/
│   ├── dialogues.json            49 entrées — tous triggers câblés
│   ├── idleDialogues.json        pool idle par scène (5 scènes)
│   └── devlog.json               6 entrées avec arc narratif
└── constants/
    └── scenes.js                 enum SCENES (évite dépendances circulaires)
```

---

## 6. WIDGET NATSUME — SYSTÈME D'INTERACTIONS

### Gardes-fous
- `busyRef` : bloque tout nouveau trigger pendant une interaction active
- `TRANSITION_LOCK` (700ms) : verrou pendant les transitions de scène
- `TRIGGER_COOLDOWN` (500ms) : délai minimum entre deux triggers
- `force: true` : bypass pour onEnter (une seule fois par changement de scène)

### États / portraits disponibles
```
idle          natsume_idle.png
parle         natsume_parle.png
approbation   natsume_approbation.png
irritation    natsume_irritation.png
surprise      natsume_surprise.png
gene          natsume_gene.png
indifference  natsume_disappointment.png   (même asset)
disappointment natsume_disappointment.png
```

### Triggers câblés (dialogues.json + code)

| Trigger | Scène | Note |
|---------|-------|------|
| `onEnter` | toutes | déclenché après TRANSITION_LOCK |
| `onBookHover` | library | silent, mood idle |
| `onBookHoverLong` | library | 3s hover |
| `onBookClick` | library | single click |
| `onBooksRapidClick` | library | 4 livres cliqués en 1.5s |
| `onScrollSlow` | natsume | wheel fenêtre 350ms <250px total |
| `onScrollFast` | natsume, devlog | wheel >250px OU velocity >1.2px/ms |
| `onHoverLarme` | natsume | hover valeur "Symbole" |
| `onAllDevlogRead` | devlog | toutes les entrées cliquées |
| `onLinkClick_twitch` | projet | clic lien Twitch |
| `onRuneHover` | contact | hover rune |
| `onFirstRuneClick` | contact | premier clic rune |
| `onLinkClick_github` | contact | clic GitHub |
| `onLinkClick_twitter` | contact | clic Twitter |
| `onAllLinksClicked` | contact | tous les liens cliqués |
| `onDoubleClick` | global | dblclick window |
| `onCursorIdle_2min` | global | curseur immobile 2min |
| `onReturnVisit` | global | localStorage visite précédente |
| `onCopyText` | global | copy event |
| `onMidnight` | global | heure == 0 au chargement |
| `onEasterEggComplete` | global | tous eggs trouvés (non implémenté) |
| `easterEgg_konami` | library | ↑↑↓↓←→←→ |
| `easterEgg_lys` | natsume | triple clic livre Natsume |

### Idle pool
Tirage sans répétition par scène, reset quand le pool est épuisé. Cooldown indifférence 60s ("..."), cursor idle 2min.

---

## 7. EFFETS VISUELS

- **Grain de film** : `#root::after` SVG feTurbulence, opacity 0.085, background-size 180px
- **Portraits Natsume** : effets manga baked directement dans les assets PNG (fx_ retiré du code)
- **DustParticles** : CSS animation dans LibraryScene uniquement
- **Transitions scènes** : fade + scale Framer Motion, 600ms
- **AnimatePresence** : mode="wait" pour portraits widget, mode par défaut pour dialogues

---

## 8. EASTER EGGS

| Trigger | Condition | Effet Natsume |
|---------|-----------|---------------|
| `easterEgg_konami` | ↑↑↓↓←→←→ sur LibraryScene | "Comment as-tu su ?" — surprise |
| `easterEgg_lys` | Triple clic livre Natsume | "Arrête. Ce n'est pas pour toi." — irritation + lore visible 4s |
| Scroll devlog jusqu'au bout | `onScroll` atBottom | TrophyNotification "Lecteur du Scriptorium" |
| `onEasterEggComplete` | Tous eggs trouvés | "Tu as tout trouvé." — surprise (tracking à implémenter) |

---

## 9. NAVIGATION

```
SealIntro (3 clics) → App
App → LibraryScene (hub)
LibraryScene → [clic livre] → scène secondaire
Scène secondaire → [BackButton] → LibraryScene
Hash routing : window.location.hash = currentScene
React.lazy + Suspense sur toutes les scènes
```

---

## 10. PLAN D'ACTION — ORDRE D'EXÉCUTION

> Référence complète : `LUNARCA_PLAN_FINAL.md`
> Référence narrative : `LUNARCA_NARRATION_REF.md`

### SESSION 1 — Corrections bloquantes
- [ ] D2 — Supprimer TheatreCurtain.jsx + IntroScreen.jsx
- [ ] D3 — Trigger twitch RuneStele : ajouter rune OU retirer trigger JSON
- [ ] D4 — natsume_full.png : intégrer dans NatsumeScene ou retirer
- [ ] D5 — CSS audit (styles inline qui devraient être en module)
- [ ] D7 — Alt text sur tous les `<img>` Natsume + livres
- [ ] A7 — PWA manifest (10 lignes JSON)

### SESSION 2 — Core tech
- [ ] A2 — URLs directes `/#natsume` etc., bypass SealIntro si hash
- [ ] D1 — `prefers-reduced-motion` dans globals.css
- [ ] D6 — Audit contraste WCAG AA (--color-fog en priorité)
- [ ] D8 — Font loading `@font-face` + `font-display: swap` + préchargement

### SESSION 3 — Contenu *(chantier principal)*
- [ ] C1 — Révision dialogues selon LUNARCA_NARRATION_REF.md ✅ fait
- [ ] C2 — Textes sections Natsume + Projet (réécriture si besoin)
- [ ] C2 — Devlog 6 entrées arc narratif (révision si besoin)
- [ ] C3 — Enrichir idle pool (+ de variété par scène)

### SESSION 4 — Immersion
- [ ] B3 — Visite retour : SealIntro fissuré dès le départ, 1 clic
- [ ] B4 — Reprise dernière section (conditionnel, uniquement si pas de hash)
- [ ] C8 — Animation ouverture livre (rotation 3D 150ms MAX, abandon si lag)

### SESSION 5 — Polish + SystemMenu
- [ ] A1 — Copie contact en un clic (déjà partiellement fait, Discord)
- [ ] A6 — Page 404 sobre
- [ ] D9 — Favicon SVG
- [ ] A3 — Open Graph + og-preview.jpg 1200x630
- [ ] B1 — SystemMenu diégétique (bas gauche, vocab univers)
- [ ] C5 — Natsume commente actions système (grain off, reset mémoire)

### SESSION 6 — Mobile
- [ ] A5 — Fix mobile : débordements, tap ≥ 44px, grain/particules off sur `@media (hover: none)`

### SESSION 7 — Features conditionnelles *(si résultat propre)*
- [ ] B2 — Achievements dans SystemMenu (useRecords.js, slots verrouillés)
- [ ] C4 — Typewriter sur titres de section (skippable, 80ms/char min)
- [ ] C7 — Curseur custom larme/encre (abandon si latence perceptible)
- [ ] C9 — Pétales lys NatsumeScene (max 8, désactivable)

### SESSION 8 — Bonus
- [ ] E5 — onGazeHeld (5s sur œil Natsume → irritation)
- [ ] E8 — Dialogue minuit (trigger câblé, juste le texte)
- [ ] E9 — Console easter egg dans main.jsx

### SESSION 9 — Déploiement
- [ ] Optimisation assets WebP
- [ ] Meta tags index.html complets
- [ ] vercel.json SPA redirect
- [ ] Lighthouse audit
- [ ] URL finale vérifiée dans RuneStele + ProjetScene

### Features écartées définitivement
navigation entre livres · 7 clics logo · DevTools detect · son V1 · parallax œil seul

---

## 11. POINTS D'ATTENTION

- **`onEasterEggComplete`** : trigger défini dans JSON mais tracking pas implémenté (nécessite suivi des 3 eggs)
- **`onLinkClick_twitch` dans RuneStele** : non câblé (Contact n'a pas de lien Twitch dans les runes)
- **Lien Twitch ProjetScene** : pointe sur `twitch.tv/natsumetsurugi` — à vérifier quand chaîne active
- **TheatreCurtain.jsx** + **IntroScreen.jsx** : fichiers fantômes présents dans `src/components/ui/` mais non utilisés — peuvent être supprimés
- **`natsume_full.png`** : importé dans CONTEXT mais non utilisé dans le code actuel

---

*Ce document est la référence unique pour toutes les sessions de développement.*
*À maintenir à jour à chaque décision technique ou narrative majeure.*
