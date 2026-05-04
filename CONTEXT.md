# LUNARCA — ÉTAT DU CODE
> Référence technique pure — architecture, triggers, navigation
> Vision & narration → `docs/LUNARCA_VISION.md`
> Règles & rôle → `CLAUDE.md`

---

## ARCHITECTURE COMPOSANTS

```
src/
├── assets/
│   ├── backgrounds/     bg_library, bg_natsume, bg_projet, bg_devlog, bg_contact, bg_intro, bg_intro2
│   ├── books/           book_natsume, book_projet, book_devlog, book_contact
│   ├── natsume/         natsume_idle, natsume_parle, natsume_approbation, natsume_irritation,
│   │                    natsume_surprise, natsume_gene, natsume_disappointment, natsume_full (inutilisé)
│   └── ornements/       seal, seal_crack1, seal_crack2, frame_corner, frame_side
│
├── components/
│   ├── scenes/
│   │   ├── LibraryScene.jsx + .module.css    hub principal, DustParticles, Konami, easterEgg_lys
│   │   ├── NatsumeScene.jsx + .module.css    RPG character sheet — stat bars + incarnation slots
│   │   ├── ProjetScene.jsx + .module.css     console archive 2 colonnes — manifeste + système
│   │   ├── DevlogScene.jsx + .module.css     wrapper devlog
│   │   └── ContactScene.jsx + .module.css    fond + RuneStele
│   ├── books/
│   │   ├── BookItem.jsx          hover 3s → onBookHoverLong, single/triple clic
│   │   └── BooksContainer.jsx    rapid click detection (4 livres / 1.5s → onBooksRapidClick)
│   ├── widget/
│   │   ├── NatsumeWidget.jsx     AnimatePresence mode="wait", 7 portraits, masqué sur scène natsume
│   │   └── DialogueBubble.jsx    bulle dialogue BD style
│   ├── devlog/
│   │   └── DevlogBook.jsx        page gauche liste / reliure / page droite scroll,
│   │                             scroll velocity, onAllDevlogRead, trophy scroll
│   ├── contact/
│   │   └── RuneStele.jsx         4 runes cliquables, ItemPanel overlay, CornerButton,
│   │                             Discord copy, triggers câblés
│   └── ui/
│       ├── SealIntro.jsx         intro 3 clics (seal → crack1 → crack2 → bg_intro2)
│       ├── BackButton.jsx
│       ├── DustParticles.jsx     particules CSS LibraryScene uniquement
│       ├── FrameOverlay.jsx      coins + bordures decoratifs
│       ├── Footer.jsx            bas de page, accès SystemMenu
│       ├── SystemMenu.jsx        grain toggle, reset seal, achievements
│       ├── AchievementsPanel.jsx panneau achievements
│       ├── TrophyNotification.jsx notification style jeu
│       └── CustomCursor.jsx      point + anneau spring (Framer Motion)
│
├── hooks/
│   ├── useNatsumeWidget.js   busyRef, TRANSITION_LOCK 700ms, TRIGGER_COOLDOWN 500ms,
│   │                         idle 30s + indifférence 60s + cursor idle 120s,
│   │                         onReturnVisit (localStorage), onMidnight, dblclick, copy,
│   │                         findEntry() → filter() + Math.random() (variantes)
│   └── useAchievements.js    écoute natsume:trigger, unlock via achievements.js
│
├── data/
│   ├── dialogues.json        70+ entrées, 2-3 variantes par trigger, sessionOnce flag
│   ├── idleDialogues.json    15-18 entrées par scène, 5 scènes
│   ├── achievements.js       6 achievements : easterEgg_konami, onAllLinksClicked,
│   │                         onAllDevlogRead, easterEgg_lys, onGazeHeld, onCartographer
│   └── devlog.json           3 entrées (mars / avril / mai 2026) — projet w-AI-fu
│
└── constants/
    └── scenes.js             SCENES enum — source de vérité
```

---

## WIDGET — GARDES-FOUS

| Constante | Valeur | Rôle |
|-----------|--------|------|
| `TRANSITION_LOCK` | 700ms | Verrou après changement de scène |
| `TRIGGER_COOLDOWN` | 500ms | Délai minimum entre deux triggers |
| `IDLE_TIMEOUT` | 30s | Déclenchement idle pool |
| `INDIFFERENCE_DELAY` | 60s | Déclenchement indifférence ("...") |
| `CURSOR_IDLE_DELAY` | 120s | Déclenchement onCursorIdle_2min |

`busyRef` bloque tout nouveau trigger pendant une interaction active.
`force: true` bypass pour `onEnter` (une seule fois par changement de scène).
Cleanup de scène : `setDialogue(null)` + `setMood('idle')` immédiat.

---

## WIDGET — PORTRAITS

```
idle           natsume_idle.png
parle          natsume_parle.png
approbation    natsume_approbation.png
irritation     natsume_irritation.png
surprise       natsume_surprise.png
gene           natsume_gene.png
indifference   natsume_disappointment.png  (même asset)
disappointment natsume_disappointment.png
```

---

## TRIGGERS CÂBLÉS

| Trigger | Scène | Condition |
|---------|-------|-----------|
| `onEnter` | toutes | après TRANSITION_LOCK, une fois par scène/session |
| `onBookHover` | library | hover livre |
| `onBookHoverLong` | library | hover 3s |
| `onBookClick` | library | single click |
| `onBooksRapidClick` | library | 4 livres cliqués en 1.5s |
| `onScrollSlow` | natsume | wheel < 250px en 350ms |
| `onScrollFast` | natsume, devlog | wheel > 250px OU velocity > 1.2px/ms |
| `onHoverLarme` | natsume | hover slot NieR dans IncarnationSlots |
| `onAllDevlogRead` | devlog | toutes les entrées cliquées |
| `onLinkClick_twitch` | projet | clic lien Twitch |
| `onRuneHover` | contact | hover rune |
| `onFirstRuneClick` | contact | premier clic rune |
| `onLinkClick_github` | contact | clic GitHub |
| `onLinkClick_twitter` | contact | clic Twitter |
| `onAllLinksClicked` | contact | tous les liens cliqués |
| `onDoubleClick` | global | dblclick window |
| `onCursorIdle_2min` | global | curseur immobile 2min |
| `onReturnVisit` | global | localStorage — sessionOnce |
| `onCopyText` | global | copy event |
| `onMidnight` | global | heure == 0 au chargement — sessionOnce |
| `onCartographer` | global | 4 scènes secondaires visitées — sessionOnce |
| `onGrainOn` | global | toggle grain on |
| `onGrainOff` | global | toggle grain off |
| `onSealReset` | global | reset seal |
| `onGazeHeld` | global | 5s sur œil Natsume |
| `easterEgg_konami` | library | ↑↑↓↓←→←→ |
| `easterEgg_lys` | natsume | triple clic livre Natsume |
| `onEasterEggComplete` | global | tous eggs trouvés *(tracking non implémenté)* |

Dispatch : `window.dispatchEvent(new CustomEvent('natsume:trigger', { detail: { trigger, scene } }))`

---

## EASTER EGGS

| Trigger | Condition | Effet |
|---------|-----------|-------|
| `easterEgg_konami` | ↑↑↓↓←→←→ sur LibraryScene | "Comment as-tu su ?" — surprise + achievement |
| `easterEgg_lys` | Triple clic livre Natsume | "Arrête. Ce n'est pas pour toi." — irritation + lore 4s |
| `onAllDevlogRead` | Tout le devlog lu | TrophyNotification "Lecteur du Scriptorium" |
| `onGazeHeld` | 5s sur œil Natsume | achievement "Regard fixe" |
| `onCartographer` | 4 scènes visitées | achievement "Cartographe" |
| `onEasterEggComplete` | Tracking non implémenté | trigger JSON défini, code manquant |
| `window.natsume()` | Console navigateur | données système + réplique Natsume |

---

## NAVIGATION

```
SealIntro (3 clics, 1 si return visit prévu) → App
App → LibraryScene (hub)
LibraryScene → [clic livre] → scène secondaire
Scène secondaire → [BackButton] → LibraryScene

Hash routing : window.location.hash = currentScene (App.jsx)
React.lazy + Suspense sur toutes les scènes
NatsumeWidget masqué si currentScene === SCENES.NATSUME
Cartographer tracking : visitedScenesRef (Set) dans App.jsx
```

---

## DETTE TECHNIQUE

| Item | Action requise |
|------|---------------|
| `onLinkClick_twitch` RuneStele | Ajouter rune Twitch dans Contact OU retirer le trigger JSON |
| `natsume_full.png` | Intégrer dans NatsumeScene ou supprimer de l'assets |
| `onEasterEggComplete` | Implémenter tracking des 3 eggs pour déclencher le trigger |
| Lien Twitch ProjetScene | `twitch.tv/natsumetsurugi` — à vérifier quand chaîne active |
