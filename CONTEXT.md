# LUNARCA — ÉTAT DU CODE
> Référence technique pure — architecture, triggers, navigation
> Vision & narration → `docs/LUNARCA_VISION.md`
> Règles & rôle → `CLAUDE.md`

---

## ARCHITECTURE COMPOSANTS

```
src/
├── assets/
│   ├── backgrounds/     bg_library, bg_natsume, bg_projet, bg_devlog, bg_book,
│   │                    bg_contact, bg_intro, bg_intro2
│   ├── books/           book_natsume, book_projet, book_devlog, book_contact,
│   │                    book_memento_open
│   ├── natsume/         natsume_idle, natsume_parle, natsume_approbation,
│   │                    natsume_irritation, natsume_surprise, natsume_gene,
│   │                    natsume_disappointment, natsume_full (NatsumeScene portrait)
│   └── ornements/       seal, seal_crack1, seal_crack2, frame_corner, frame_side
│
├── components/
│   ├── scenes/
│   │   ├── LibraryScene.jsx + .module.css    hub principal, DustParticles, Konami,
│   │   │                                      easterEgg_lys, Contact scellé (à impl.)
│   │   ├── NatsumeScene.jsx + .module.css    RPG character sheet — portrait full,
│   │   │                                      stat bars, incarnation slots
│   │   ├── ProjetScene.jsx + .module.css     archive 2 colonnes — manifeste + système
│   │   ├── DevlogScene.jsx + .module.css     bureau → livre (DeskView / ReadingView)
│   │   └── ContactScene.jsx + .module.css    fond + RuneStele (scellé par défaut, à impl.)
│   ├── books/
│   │   ├── BookItem.jsx          hover 3s → onBookHoverLong, single/triple clic,
│   │   │                          résistance Contact scellé (à impl.)
│   │   └── BooksContainer.jsx    rapid click detection (BUG: mappe index pas IDs)
│   ├── widget/
│   │   ├── NatsumeWidget.jsx     AnimatePresence mode="wait", 7 portraits,
│   │   │                          masqué sur scène natsume, isMobile non-réactif (BUG)
│   │   └── DialogueBubble.jsx    bulle dialogue BD style, typewriter 28ms/char
│   ├── narrator/                  ── À CRÉER ──
│   │   ├── NarratorNote.jsx      feuille qui glisse depuis bord d'écran
│   │   └── NarratorNote.module.css
│   ├── devlog/
│   │   └── DevlogBook.jsx        page gauche liste / reliure / page droite scroll,
│   │                              scroll velocity, onAllDevlogRead, trophy scroll
│   ├── contact/
│   │   └── RuneStele.jsx         4 runes cliquables, ItemPanel overlay, CornerButton,
│   │                              Discord copy, triggers câblés
│   └── ui/
│       ├── SealIntro.jsx         intro 3 clics (seal → crack1 → crack2 → bg_intro2)
│       │                          retour visit : démarre à crack2 (1 clic)
│       ├── BackButton.jsx
│       ├── DustParticles.jsx     particules CSS LibraryScene uniquement
│       ├── FrameOverlay.jsx      coins + bordures decoratifs
│       ├── Footer.jsx            bas de page, accès SystemMenu (◈)
│       ├── SystemMenu.jsx        grain toggle, reset seal, achievements
│       ├── AchievementsPanel.jsx panneau achievements
│       ├── TrophyNotification.jsx notification style jeu
│       └── CustomCursor.jsx      point + anneau spring (Framer Motion)
│
├── hooks/
│   ├── useNatsumeWidget.js   busyRef, TRANSITION_LOCK 700ms, TRIGGER_COOLDOWN 500ms,
│   │                          idle 30s + indifférence 60s + cursor idle 120s,
│   │                          onReturnVisit (localStorage), onMidnight, dblclick, copy,
│   │                          findEntry() → filter() + Math.random() (variantes)
│   ├── useNarrator.js        ── À CRÉER ── triggers Narrateur, moins aléatoire,
│   │                          narrative beats + réactif actions/inactions
│   └── useAchievements.js    écoute natsume:trigger, unlock via achievements.js
│
├── data/
│   ├── dialogues.json          70+ entrées, 2-3 variantes par trigger, sessionOnce flag
│   ├── idleDialogues.json      15-18 entrées par scène, 5 scènes
│   ├── narratorDialogues.json  ── À CRÉER ── entrées Narrateur par scène et trigger
│   ├── achievements.js         6 achievements : easterEgg_konami, onAllLinksClicked,
│   │                            onAllDevlogRead, easterEgg_lys, onGazeHeld, onCartographer
│   └── devlog.json             3 entrées (mars / avril / mai 2026) — projet w-AI-fu
│
└── constants/
    └── scenes.js               SCENES enum — source de vérité
```

---

## WIDGET NATSUME — GARDES-FOUS

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

## NARRATEUR — SYSTÈME

Le Narrateur est une voix distincte de Natsume. Ses interventions glissent depuis le bord de l'écran via `NarratorNote`. Natsume peut réagir à ses paroles — lui ne répond jamais à Natsume.

| Constante | Valeur cible | Rôle |
|-----------|-------------|------|
| `NARRATOR_ENTRY_DELAY` | ~800ms après entrée scène | Laisser Natsume parler d'abord |
| `NARRATOR_MIN_INTERVAL` | ~3s | Éviter le chevauchement avec Natsume |

**Position par scène (bord d'entrée du NarratorNote) :**

| Scène | Bord d'entrée |
|-------|--------------|
| Library | haut-gauche |
| Natsume | gauche |
| Projet | bas-gauche |
| Devlog (bureau) | haut-droite |
| Contact | haut |

**Événement dispatch :** `window.dispatchEvent(new CustomEvent('narrator:trigger', { detail: { trigger, scene } }))`

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

## TRIGGERS NATSUME CÂBLÉS

| Trigger | Scène | Condition |
|---------|-------|-----------|
| `onEnter` | toutes | après TRANSITION_LOCK, une fois par scène/session |
| `onBookHover` | library | hover livre |
| `onBookHoverLong` | library | hover 3s |
| `onBookClick` | library | single click |
| `onBooksRapidClick` | library | 4 clics livres en 1.5s (BUG: mappe index pas IDs) |
| `onScrollSlow` | natsume | wheel < 250px en 350ms |
| `onScrollFast` | natsume, devlog | wheel > 250px OU velocity > 1.2px/ms |
| `onHoverLarme` | natsume | hover slot NieR dans IncarnationSlots |
| `onAllDevlogRead` | devlog | toutes les entrées cliquées |
| `onLinkClick_twitch` | projet | clic lien Twitch (entrée dialogues.json à vérifier) |
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
| `easterEgg_lys` | natsume | triple clic livre Natsume (dispatché depuis library) |
| `onEasterEggComplete` | global | tous eggs trouvés *(tracking non implémenté)* |

---

## TRIGGERS NARRATEUR — PLAN (à implémenter)

| Trigger | Scène | Condition | Type |
|---------|-------|-----------|------|
| `intro_library` | library | première visite tous temps | beat narratif |
| `intro_natsume` | natsume | première entrée scène | beat narratif |
| `intro_projet` | projet | première entrée scène | beat narratif |
| `intro_devlog` | devlog | première entrée scène | beat narratif |
| `intro_contact_sealed` | library | clic sur Contact scellé | réactif |
| `contact_unsealed` | library | Contact se déscelle | beat narratif |
| `onPlayerInactive` | global | inactivité prolongée (>45s) | réactif |
| `onAllScenesVisited` | global | Cartographer atteint | beat narratif |

*(Liste indicative — à enrichir avec les dialogues)*

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
SealIntro (3 clics, 1 si return visit) → App
App → LibraryScene (hub)
LibraryScene → [clic livre] → scène secondaire
Scène secondaire → [BackButton] → LibraryScene

Contact : scellé par défaut → résistance au clic → déblocage par condition narrative (TBD)

Hash routing : window.location.hash = currentScene (App.jsx)
React.lazy + Suspense sur toutes les scènes
NatsumeWidget masqué si currentScene === SCENES.NATSUME
Cartographer tracking : visitedScenesRef (Set) dans App.jsx

Return visit : SealIntro démarre à clicks=2 (crack2) ✓
Reprise dernière scène : resolveInitialScene() lit lunarca_last_scene ✓
```

---

## DETTE TECHNIQUE

| Item | Priorité | Action requise |
|------|----------|---------------|
| `onEasterEggComplete` tracking | moyenne | Implémenter suivi des 3 eggs pour déclencher le trigger |
| Lien Twitch ProjetScene | basse | Vérifier URL quand chaîne active |
| Alt text sur tous `<img>` | haute | Accessibilité baseline avant déploiement |
| Font loading `font-display: swap` | moyenne | Évite FOUT |
| Open Graph + og-preview | moyenne | Asset portrait + fond à générer |
| Mobile fix global | haute | Grain/particules off sur `@media (hover: none)`, NatsumeWidget safe |
| Contact scellé — mécanique | haute | Condition TBD, résistance livre, déblocage |
| NarratorNote composant | haute | Nouveau composant à créer |
| useNarrator hook | haute | Nouveau hook à créer |
| narratorDialogues.json | haute | Données Narrateur à rédiger |
