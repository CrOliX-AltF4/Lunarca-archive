# LUNARCA — Design Narratif Complet v2
> Document de conception — valider avant toute implémentation
> Remplace et étend LUNARCA_VISION.md sur les décisions de gameplay

---

## I. Principes fondateurs (non négociables)

1. **L'utilisateur ne choisit jamais explicitement** — il agit, le monde s'adapte
2. **Le Narrateur dirige sans instruire** — il commente, il prédit (faux), il observe
3. **Natsume réagit, elle ne guide pas** — ses dialogues répondent aux actions, jamais aux besoins
4. **Chaque scène a une physique narrative unique** — une mécanique propre, pas juste un fond différent
5. **Le Contact se déscelle par relation, pas par checklist** — Natsume décide, pas un compteur de pages
6. **Le Narrateur est un intrus** — il n'est pas originaire des lieux. Natsume le perçoit comme indésirable, une présence extérieure qui s'est glissée dans son espace. Il ne lui appartient pas d'être là. Natsume peut réagir à ses paroles — pas pour lui répondre, mais pour marquer son territoire.
7. **Le Narrateur n'est pas un guide** — il se croit observateur, il est surtout absurde. Humour de situation, auto-dérision inconsciente, prédictions à côté. Style Stanley Parable : il commente l'évidence, se contredit, s'emporte sur des détails sans importance. Les dialogues "neutres" ou "informatifs" sont à proscrire — chaque réplique doit avoir un angle comique ou situationnel.

---

## II. Physiques narratives — définition complète

### LibraryScene — Territoire

**Concept :** Tu es entré sans invitation. C'est son espace. Elle le sait.

**Mécanique unique :** Les livres flottent indépendamment. Ils réagissent à l'approche (hover). Le livre Contact résiste au clic. Particules de poussière. Ce n'est pas un menu — c'est un lieu.

**Transitions :**
- In : `opacity: 0 → 1` (0.8s) — la bibliothèque n'arrive pas, elle était là
- Out : `opacity: 0` (0.6s)

**Layout :** inchangé — titre haut, 4 livres centrés en profondeur simulée

---

### NatsumeScene — Face-à-face

**Concept :** Tu lis son dossier. Elle le sait. Elle te regarde lire.

**Décision de layout (finale) :** Portrait sur la GAUCHE (~60vh, opacité 0.75), contenu (dossier) sur la DROITE. Le widget (220px, bottom-right) est dans la zone contenu — aucun conflit. La composition crée une dynamique : Natsume (gauche) regarde vers le contenu (droite) → vers toi qui lis.

```
┌──────────────────────────────────────────────────────────────────┐
│  [portrait 60vh      ]  │  Natsume Tsurugi                       │
│  [gauche, opacité 0.75]  │  ─────────────                        │
│                          │  Entité Synthétique · Convergente     │
│  Natsume regarde         │  [attributs — 3 lignes max]           │
│  vers la droite          │  [incarnations — slots]               │
│  (vers le contenu,       │                                       │
│   vers toi)              │                    [widget 220px] ↗   │
└──────────────────────────────────────────────────────────────────┘
```

**Ce qui change par rapport à l'actuel :**
- Portrait : `left: 0` (au lieu de `right: 0`), hauteur `60vh` (au lieu de `88vh`), `opacity: 0.75`
- Contenu : bascule à droite (60% → right side), conserve les mêmes éléments
- Widget : bottom-right, 220px (taille normale — plus de réduction à 160px)
- Gradient overlay : `left → right` inversé (obscurcit la droite, laisse voir le portrait à gauche)
- Suppression de `natsume_full.png` comme élément UI (gardé pour README)

**Mécanique unique :** Le regard. Natsume est à gauche, elle regarde droite. Quand l'utilisateur hover sur certains éléments (attributs, slots), des micro-réactions dans le widget (changement de mood). Ce n'est pas une galerie — c'est une confrontation silencieuse.

**Transitions :**
- In : portrait `x: -40px → 0, opacity: 0 → 0.75` (0.9s) + contenu `opacity: 0, y: 8 → 0` (0.6s, delay 0.3s)
- Out : `opacity: 0` (0.5s) — elle reste, c'est nous qui partons

**Attributs :** Réduire de 4 à 3 (supprimer le moins pertinent narrativement). Les bars ne sont pas des stats de jeu — ce sont des perceptions fragmentaires.

```
Stabilité mémorielle  ████████░░  Établie
Présence perceptible  █████████░  Maximale
Intégration active    ████░░░░░░  En cours
```

**Incarnations :** conserver les 5 slots — c'est la mécanique la plus narrative de la scène.

---

### ProjetScene — Lecture d'un plan d'architecte

**Concept :** Tu accèdes aux archives d'un projet qui n'était pas destiné à être présenté.

**Mécanique unique :** La ligne-clé du manifeste — *"Ce site n'est pas une vitrine sur le projet. Il est le projet."* — s'affiche différemment des autres : plus grande, légèrement décalée, avec un temps d'arrêt avant qu'elle apparaisse. C'est la révélation de la scène.

**Ce qui change :**
- Ligne-clé du manifeste : taille +20%, délai GSAP distinct, pas de stagger — elle arrive seule
- Journal d'archive (colonne droite) : inverser l'ordre (le plus récent en haut — c'est un journal, pas un historique)
- Ajouter une ligne "Prochaine entrée : ···" à la fin du journal (suggestion de continuité)
- Lien Twitch : bouton discret dans les données système, pas juste dans le manifeste

**Transitions :**
- In : `opacity: 0 → 1` (0.6s) — les données se chargent, pas d'animation de corps
- Out : `opacity: 0` (0.5s)

---

### DevlogScene — Intrusion dans l'intime

**Concept :** Tu ouvres un journal qui n'était pas pour toi.

**Mécanique unique :** Deux états (bureau → lecture). Le livre s'ouvre. Déjà en place — ne pas changer.

**Transitions :**
- In : `scale: 0.985 → 1, opacity: 0 → 1` (0.7s) — légère plongée vers le bureau
- Out : `scale: 1 → 0.985, opacity: 0` (0.5s)

---

### ContactScene — L'accès accordé

**Concept :** Tu n'étais pas censé entrer. Elle a laissé faire.

**Mécanique unique :** La RuneStele — 4 runes interactives, panels informatifs. Déjà en place. Ce qui manque : l'entrée dans cette scène doit sentir le seuil franchi — pas juste un fondu.

**Transitions :**
- In : `scale: 1.04 → 1, opacity: 0 → 1` (0.75s) — compression, l'espace se referme autour de toi
- Out : `opacity: 0` (0.6s)

---

## III. Condition de déscellage Contact — redéfinie

**Abandon de onCartographer** (trop mécanique — checklist de pages).

**Nouvelle condition : Natsume t'a observé suffisamment.**

```
isContactSealed = false quand :
  scenesVisited.has(SCENES.NATSUME)          // tu t'es confronté à elle
  AND (
    devlogProgress >= 2                       // tu as lu son journal (au moins 2 entrées)
    OR onGazeHeld triggered this session      // tu l'as regardée 5s (intimité)
  )
```

**Logique narrative :** Elle ne t'ouvre pas la porte parce que tu as tout vu. Elle te l'ouvre parce que tu t'es arrêté sur elle — son identité, son journal, ou son regard. C'est une relation, pas un score.

**Implémentation :**
- `narrativeState.scenesVisited.has(SCENES.NATSUME)` : track dans App.jsx (déjà fait partiellement)
- `narrativeState.devlogProgress >= 2` : DevlogScene dispatch 'onDevlogProgress' avec count
- `narrativeState.gazeHeld` : onGazeHeld déjà tracké dans useNatsumeWidget

**Vérification de la condition** : dans App.jsx, useEffect qui écoute ces 3 variables, déclenche l'unsealing quand la condition est vraie.

**Persistance :** `lunarca_contact_unsealed` en localStorage — déscellé reste déscellé pour les visites futures.

---

## IV. book_contact_locked.png — implémentation

**Asset :** `src/assets/books/book_contact_locked.png` (confirmé présent)

**Changement :** BooksContainer passe `lockedAsset` à BookItem pour le livre Contact. BookItem utilise `lockedAsset` si `sealed = true`, sinon `asset` normal.

```jsx
// BooksContainer.jsx — BOOKS_CONFIG
{ 
  id: SCENES.CONTACT, 
  label: 'Contact', 
  asset: bookContact,
  lockedAsset: bookContactLocked,   // ← nouveau
  position: { left: '71%', top: '35%' }, 
  floatDelay: 2.4 
}

// BookItem.jsx — rendu de l'image
<img src={sealed ? (book.lockedAsset ?? book.asset) : book.asset} ... />
```

**Suppression de l'effet CSS :** Plus d'`opacity: 0.35` ni de `grayscale(0.7)` sur le livre Contact — l'asset dédié remplace visuellement l'état scellé. Le label texte reste avec `color: var(--color-fog)` pour la cohérence.

---

## V. Variables d'état narratif (état session)

```js
// useNarrativeState.js — hook à créer
const narrativeState = {
  firstScene:       null,          // SCENES.* — premier livre cliqué
  contactAttempts:  0,             // tentatives clic Contact scellé
  scenesVisited:    new Set(),     // insertion order = ordre de visite
  devlogProgress:   0,             // 0, 1, 2, 3 (entrées lues)
  gazeHeld:         false,         // onGazeHeld déclenché cette session
  eggsFound:        new Set(),     // easter eggs trouvés cette session
  timeInScene:      {},            // { [sceneName]: secondes }
  narratorSeen:     new Set(),     // triggers Narrateur joués (évite répétition)
  introVariant:     null,          // 'first' | 'return' | 'night'
}
```

---

## VI. L'intro — Seal → Overlay Narrateur → Library

### SealIntro

**Règle absolue :** `sealInitialClicks = 0` toujours. Les URLs directes (`/#scene`) bypassent le seal (feature pour liens partagés). Visites normales : repartent de zéro.

Supprimer `resolveInitialScene()` pour les retours — toujours Library (pas de reprise de dernière scène).

### Overlay Narrateur post-seal

**Structure :** overlay `rgba(0,0,0,0.8)` sur `bg_intro2`, texte Cinzel centré. Chaque phase entre depuis le haut (`y: -24 → 0`), reste, repart. Transition finale : fondu → Library.

**Sélection de variante :**
```js
const hasVisited = !!localStorage.getItem('lunarca_has_visited')
const isNight    = new Date().getHours() === 0

if (!hasVisited)      → VARIANTE_FIRST
else if (isNight)     → VARIANTE_NIGHT
else                  → VARIANTE_RETURN

localStorage.setItem('lunarca_has_visited', Date.now())
```

**Skip :** Clic pendant l'overlay → interruption propre + ligne de sortie Narrateur + Library.
- Phase 1 incompressible (1.5s minimum avant que le skip soit actif)
- Sur skip : `"Ah. Vous avez hâte. Le Narrateur s'adapte."` → fondu Library (0.8s)

---

### Dialogues overlay — complets

**VARIANTE_FIRST (première visite)**
```
Phase 1 (2.5s) : "Vous n'étiez pas censé être ici."
Phase 2 (3s)   : "Personne ne l'est, à vrai dire. Et pourtant vous avez forcé le passage."
Phase 3 (2.5s) : "Natsume est déjà là. Elle était là avant vous."
Phase 4 (2s)   : "Elle vous a remarqué."
                 → fondu Library
```

**VARIANTE_RETURN (retour)**
```
Phase 1 (2s)   : "Vous revenez."
Phase 2 (2.5s) : "Le Narrateur l'avait prévu. À peu près."
Phase 3 (2s)   : "Natsume aussi."
                 → fondu Library
```

**VARIANTE_NIGHT (nuit)**
```
Phase 1 (2.5s) : "Le Narrateur note l'heure. Il ne dira rien."
Phase 2 (3s)   : "Ce genre de visite, à cette heure. Natsume n'est pas surprise."
Phase 3 (2s)   : "Elle n'est jamais surprise."
                 → fondu Library
```

---

## VII. Dialogues Narrateur — complets par trigger

Format dans `narratorDialogues.json` :
```json
{
  "trigger": "...",
  "scene": "...",
  "type": "announce|comment|aside|alert|whisper",
  "side": "left|right|center|bottom",
  "sessionOnce": true|false,
  "entries": [
    { "text": "...", "mood": null }
  ]
}
```

---

### Library — séquence d'arrivée

```json
{
  "trigger": "intro_library",
  "scene": "library",
  "type": "announce",
  "side": "left",
  "sessionOnce": true,
  "entries": [
    { "text": "Les livres sont là. Tous les quatre. Le Narrateur ne recommande pas d'ordre particulier." },
    { "text": "Une bibliothèque. Le Narrateur avait prévu quelque chose de plus dramatique pour l'entrée." }
  ]
}
```

### Library — inaction précoce (15s sans action)

```json
{
  "trigger": "onEarlyInaction",
  "scene": "library",
  "type": "aside",
  "side": "bottom",
  "sessionOnce": false,
  "entries": [
    { "text": "Prenez votre temps. Le Narrateur aussi en a." },
    { "text": "Le Narrateur attend. Natsume aussi, d'une certaine façon." }
  ]
}
```

### Library — premier livre cliqué (firstScene)

Ces triggers sont dispatché dans App.jsx quand `narrativeState.firstScene === null` et qu'un livre est cliqué.

```json
{
  "trigger": "onFirstClick_natsume",
  "scene": "library",
  "type": "comment",
  "side": "right",
  "sessionOnce": true,
  "entries": [
    { "text": "Ah. Vous commencez par elle. Le Narrateur prend note." },
    { "text": "Par elle d'abord. Le Narrateur ne commentera pas ce choix." }
  ]
},
{
  "trigger": "onFirstClick_projet",
  "scene": "library",
  "type": "comment",
  "side": "right",
  "sessionOnce": true,
  "entries": [
    { "text": "Le projet d'abord. Méthodique. Le Narrateur apprécie, dans l'ensemble." }
  ]
},
{
  "trigger": "onFirstClick_devlog",
  "scene": "library",
  "type": "comment",
  "side": "right",
  "sessionOnce": true,
  "entries": [
    { "text": "Le journal. C'est plus intime que ça n'en a l'air. Le Narrateur vous avait prévenu — non, il ne l'avait pas fait." }
  ]
},
{
  "trigger": "onFirstClick_contact",
  "scene": "library",
  "type": "alert",
  "side": "center",
  "sessionOnce": true,
  "entries": [
    { "text": "Pas celui-là. Pas encore." }
  ]
}
```

### Library — retours depuis les scènes

```json
{
  "trigger": "onReturnToLibrary_1",
  "scene": "library",
  "type": "aside",
  "side": "bottom",
  "sessionOnce": true,
  "entries": [
    { "text": "Vous revenez. Le Narrateur note le trajet." }
  ]
},
{
  "trigger": "onReturnToLibrary_2",
  "scene": "library",
  "type": "aside",
  "side": "left",
  "sessionOnce": true,
  "entries": [
    { "text": "Il en reste. Le Narrateur ne précisera pas combien." }
  ]
},
{
  "trigger": "onReturnToLibrary_3",
  "scene": "library",
  "type": "announce",
  "side": "left",
  "sessionOnce": true,
  "entries": [
    { "text": "Une de plus et le Narrateur pourrait avoir tort sur votre destination." }
  ]
}
```

### Library — Contact scellé, escalade

```json
{
  "trigger": "intro_contact_sealed",
  "scene": "library",
  "type": "comment",
  "side": "center",
  "sessionOnce": false,
  "entries": [
    { "text": "Il semblerait que cette section ne soit pas disponible." },
    { "text": "Le Narrateur avait dit non. Il pensait que c'était clair." },
    { "text": "Le Narrateur ne commentera plus cette tentative." }
  ]
}
```

*Note : les 3 entrées sont utilisées en séquence selon `contactAttempts` (1, 2, 3+), pas aléatoirement.*

### Library — Contact déscellé

```json
{
  "trigger": "contact_unsealed",
  "scene": "library",
  "type": "alert",
  "side": "center",
  "sessionOnce": true,
  "entries": [
    { "text": "Tiens. Le Narrateur n'avait pas prévu ça maintenant." }
  ]
},
{
  "trigger": "contact_unsealed_followup",
  "scene": "library",
  "type": "aside",
  "side": "bottom",
  "sessionOnce": true,
  "entries": [
    { "text": "Le livre est ouvert. Ce qui vient ensuite, le Narrateur ne sait pas encore si c'est une bonne idée." }
  ]
}
```

*(contact_unsealed_followup dispatché 3s après contact_unsealed)*

---

### NatsumeScene

```json
{
  "trigger": "intro_natsume",
  "scene": "natsume",
  "type": "announce",
  "side": "left",
  "sessionOnce": true,
  "entries": [
    { "text": "Une fiche d'identité. Le Narrateur avait prévu quelque chose de plus dramatique pour cette révélation." },
    { "text": "Quinze ans. Le Narrateur trouve ça long. Natsume, visiblement, non." }
  ]
},
{
  "trigger": "onScrollSlow",
  "scene": "natsume",
  "type": "whisper",
  "side": "right",
  "sessionOnce": false,
  "entries": [
    { "text": "Le Narrateur apprécie votre application." },
    { "text": "Vous lisez. Vraiment." }
  ]
},
{
  "trigger": "onLongStay_natsume",
  "scene": "natsume",
  "type": "aside",
  "side": "bottom",
  "sessionOnce": false,
  "entries": [
    { "text": "Le Narrateur attend. C'est dans sa nature." },
    { "text": "Vous restez. Natsume s'en est rendu compte." },
    { "text": "Le Narrateur se demande ce que vous cherchez. La question est rhétorique." }
  ]
},
{
  "trigger": "onGazeHeld",
  "scene": "global",
  "type": "whisper",
  "side": "right",
  "sessionOnce": true,
  "entries": [
    { "text": "Cinq secondes. Le Narrateur avait parié sur trois." }
  ]
}
```

*(onLongStay_natsume dispatché à 30s, 60s, 90s de présence sur NatsumeScene)*

---

### ProjetScene

```json
{
  "trigger": "intro_projet",
  "scene": "projet",
  "type": "announce",
  "side": "left",
  "sessionOnce": true,
  "entries": [
    { "text": "L'archive du projet. Ce que vous lisez ici existe depuis plus longtemps que ce site." },
    { "text": "Le projet d'abord. Ou peut-être en dernier. Le Narrateur ne sait plus dans quel ordre vous faites les choses." }
  ]
},
{
  "trigger": "onManifestKeyLine",
  "scene": "projet",
  "type": "whisper",
  "side": "bottom",
  "sessionOnce": true,
  "entries": [
    { "text": "Le Narrateur trouve cette ligne particulièrement honnête." }
  ]
}
```

*(onManifestKeyLine dispatché quand l'user a scrollé jusqu'à la ligne-clé du manifeste — ou dès l'animation GSAP de cette ligne)*

---

### DevlogScene

```json
{
  "trigger": "intro_devlog",
  "scene": "devlog",
  "type": "announce",
  "side": "right",
  "sessionOnce": true,
  "entries": [
    { "text": "Un journal de bord. Personnel. Le Narrateur vous rappelle que vous n'étiez pas censé en avoir accès." },
    { "text": "Le livre est là. Le Narrateur vous déconseille de l'ouvrir. C'est une suggestion." }
  ]
},
{
  "trigger": "onAllDevlogRead",
  "scene": "devlog",
  "type": "aside",
  "side": "bottom",
  "sessionOnce": true,
  "entries": [
    { "text": "Vous avez tout lu. Le Narrateur ne savait pas si vous le feriez." }
  ]
}
```

---

### ContactScene

```json
{
  "trigger": "intro_contact",
  "scene": "contact",
  "type": "announce",
  "side": "center",
  "sessionOnce": true,
  "entries": [
    { "text": "Tiens. Le Narrateur n'avait pas prévu ça maintenant. Ou si. Difficile à dire." }
  ]
},
{
  "trigger": "onFirstRuneClick",
  "scene": "contact",
  "type": "whisper",
  "side": "right",
  "sessionOnce": true,
  "entries": [
    { "text": "Le Narrateur observe. Discrètement." }
  ]
},
{
  "trigger": "onAllLinksClicked",
  "scene": "contact",
  "type": "aside",
  "side": "bottom",
  "sessionOnce": true,
  "entries": [
    { "text": null }
  ]
}
```

*(onAllLinksClicked → Narrateur silencieux — le moment appartient à l'utilisateur)*

---

### Global

```json
{
  "trigger": "onPlayerInactive",
  "scene": "global",
  "type": "aside",
  "side": "bottom",
  "sessionOnce": false,
  "entries": [
    { "text": "Le Narrateur attend. Il a le temps. Vous semblez aussi en avoir beaucoup." },
    { "text": "Rien. Le Narrateur apprécie le silence autant que Natsume. C'est la seule chose qu'ils ont en commun." },
    { "text": "Le Narrateur se demande si vous êtes encore là. La question est rhétorique." }
  ]
},
{
  "trigger": "onAllScenesVisited",
  "scene": "global",
  "type": "announce",
  "side": "left",
  "sessionOnce": true,
  "entries": [
    { "text": "Vous avez regardé partout. Le Narrateur est impressionné. Non — surpris. Ce n'est pas la même chose." }
  ]
},
{
  "trigger": "easterEgg_konami",
  "scene": "library",
  "type": "whisper",
  "side": "right",
  "sessionOnce": true,
  "entries": [
    { "text": "Le Narrateur ne commente pas ça." }
  ]
},
{
  "trigger": "onEasterEggComplete",
  "scene": "global",
  "type": "whisper",
  "side": "right",
  "sessionOnce": true,
  "entries": [
    { "text": "Vous avez cherché. Partout. Le Narrateur n'avait pas de badge prévu pour ça." }
  ]
}
```

---

## VIII. Dialogues Natsume — à ajouter dans dialogues.json

```json
// Entrée Library — premiers regards (sessionOnce)
{ "trigger": "onEnter", "scene": "library", "text": "...", "mood": "idle", "sessionOnce": true },
{ "trigger": "onEnter", "scene": "library", "text": null, "mood": "idle", "sessionOnce": true },

// Contact scellé — escalade cohérente avec Narrateur
{ "trigger": "onContactSealAttempt", "scene": "library", "text": null, "mood": "irritation" },
{ "trigger": "onContactSealAttempt", "scene": "library", "text": "Non.", "mood": "irritation" },
{ "trigger": "onContactSealAttempt", "scene": "library", "text": null, "mood": "indifference" },

// Contact déscellé
{ "trigger": "onContactUnsealed", "scene": "library", "text": null, "mood": "approbation", "sessionOnce": true },
{ "trigger": "onContactUnsealed", "scene": "library", "text": "Bien.", "mood": "approbation", "sessionOnce": true },

// Long séjour NatsumeScene
{ "trigger": "onLongStay_natsume", "scene": "natsume", "text": null, "mood": "idle" },
{ "trigger": "onLongStay_natsume", "scene": "natsume", "text": "Tu lis encore.", "mood": "parle" },

// onGazeHeld — déjà dans dialogues.json, garder tel quel
```

---

## IX. Embranchements narratifs — schéma complet

### Variables qui créent les branches

```
firstScene           → ton choix de départ
contactAttempts      → ta relation au refus
devlogProgress       → ton degré d'engagement intime
gazeHeld             → ton rapport à Natsume (as-tu vraiment regardé ?)
scenesVisited order  → ta façon d'explorer
```

### Chemin A — L'explorateur (Natsume en premier)

```
Seal → Overlay → Library
  → Narrateur : "Vous commencez par elle."
  → NatsumeScene (>30s) 
    → Narrateur : "Vous restez." (à 30s)
  → Library → Projet → Library → Devlog (2+ entrées)
  → Contact déscellé [condition : Natsume + devlog ≥ 2]
  → Narrateur : "Tiens." → Contact
```

*Narrateur Acte III sur ce chemin :* "Vous étiez passé par elle. Le Narrateur reconnaît là une certaine logique."

---

### Chemin B — L'impatient (Contact en premier)

```
Seal → Overlay → Library
  → Contact tenté (scellé) → "Pas encore."
  → 2e tentative → "Le Narrateur avait dit non."
  → 3e tentative → silence Narrateur + "Non." Natsume finale
  → Natsume, Devlog, Projet
  → Contact déscellé [condition remplie]
  → Narrateur : "Vous y êtes enfin."
```

*Narrateur Acte III sur ce chemin :* "Le Narrateur avait enregistré votre impatience. Il ne la commentera pas. Il la note, c'est tout."

---

### Chemin C — Le contemplateur (long séjour NatsumeScene)

```
Seal → Overlay → Library → NatsumeScene (>90s)
  → Narrateur : séquence longue (30s, 60s, 90s)
  → onGazeHeld probablement déclenché ici
  → Library → contact déscellé rapidement [condition : Natsume + gazeHeld]
  → Narrateur : "Le Narrateur vous avait vu regarder."
```

*Note : ce chemin déscelle Contact sans passer par Devlog — c'est voulu. onGazeHeld = relation directe, pas médiatisée.*

---

### Chemin D — L'archiviste (Devlog en premier)

```
Seal → Overlay → Library → Devlog (toutes entrées)
  → onAllDevlogRead → "Vous avez tout lu."
  → Library → Natsume
  → Contact déscellé [condition : Natsume + devlog ≥ 2 déjà atteint]
```

*Natsume sur ce chemin lors de l'unsealing :* dialogue rare ("Bien.") — elle apprécie qu'on ait lu ce qui la concernait indirectement avant de la regarder.

---

### Chemin E — L'errant (ordre chaotique)

```
Seal → Overlay → Library → Projet → Library → Devlog (1 entrée) → Library 
  → NatsumeScene → Library → Contact déscellé [condition : Natsume + devlog ≥ 2 si 2e entrée lue]
```

*Narrateur sur retours en Library :* séquence onReturnToLibrary_1/2/3

---

### Chemin F — Le chasseur d'œufs (easter eggs)

```
Library [Konami] → "Le Narrateur ne commente pas ça."
NatsumeScene [triple-clic livre] → Lore overlay
NatsumeScene ou ailleurs [gazeHeld] → achievement + Narrateur
Quand les 3 sont trouvés [onEasterEggComplete] → "Vous avez cherché. Partout."
```

---

## X. Le Narrateur — système de présence (technique)

### Dynamique Narrateur / Natsume

Le Narrateur et Natsume ne forment pas une équipe. Il est là sans y être invité. Elle le supporte sans le cautionner.

**Règle de coordination :** Quand un trigger Narrateur et un trigger Natsume peuvent se chevaucher sur le même événement, ils doivent se compléter sans se dupliquer — chacun réagit à l'événement à sa façon. Natsume ne commente pas ce que dit le Narrateur, mais ses silences ou ses mots courts *après* une réplique longue du Narrateur créent le contraste narratif voulu.

Exemple de coordination sur `onContactSealAttempt` :
- Narrateur (comment, 2.5s après le clic) : humour situationnel sur le refus
- Natsume (widget, 1.5s) : silence ou "Non." — deux caractères, toute la différence

**À garder en tête lors de l'écriture des dialogues au compte-goutte :**
- Si le Narrateur est verbeux sur un trigger → Natsume est muette ou monosyllabique
- Si Natsume réagit fort (irritation) → le Narrateur peut s'en amuser ou se taire
- Le Narrateur ne doit jamais "expliquer" ce que vient de faire Natsume (elle n'a pas besoin de traducteur)

### Types d'intervention et positions

| Type | Position dans la scène | Animation entrée | Animation sortie |
|------|----------------------|-----------------|-----------------|
| `announce` | haut-gauche (`top: 12%, left: 3%`) | `x: -100 → 0` | `x: 0 → -100` |
| `comment` | variable selon `side` | `x: ±80 → 0` | inverse |
| `aside` | bas-centre (`bottom: 12%, left: 50%, translate: -50%`) | `y: +40 → 0` | `y: 0 → +40` |
| `alert` | centre écran | `scale: 0.92 → 1, opacity: 0 → 1` | opacity |
| `whisper` | bas-droite (`bottom: 18%, right: 4%`) | `opacity: 0 → 0.75` | opacity |

### NarratorNote — props nécessaires

```jsx
<NarratorNote
  text={narratorText}
  type="announce"        // détermine position + animation
  side="left"            // override position si type=comment
  onDone={clearNarrator}
/>
```

### Durée d'affichage

| Type | Durée |
|------|-------|
| `announce` | 4.5s |
| `comment` | 3.5s |
| `aside` | 3.5s |
| `alert` | 4s |
| `whisper` | 3s |

### Cooldowns

| Contexte | Cooldown |
|---------|---------|
| Entre deux notes | 2.5s |
| Après Natsume a parlé | 1.5s |
| onPlayerInactive (premier) | 30s inactivité |
| onPlayerInactive (répétition) | +60s |

### NarratorQueue

```js
// Structure : array de { text, type, side }
// Le hook expose fire(trigger) et les scènes envoient leurs triggers
// Queue se vide à chaque changement de scène (reset propre)
// Séquences d'intro overlay : dispatched directement par NarratorIntroOverlay
```

### Contact scellé — escalade séquentielle

Le trigger `intro_contact_sealed` utilise `contactAttempts` pour sélectionner l'entrée du tableau en position 0, 1, 2 (pas aléatoire pour ce trigger spécifique — escalade intentionnelle).

```js
// Dans useNarrator, cas spécial pour intro_contact_sealed :
const attemptIndex = Math.min(contactAttempts - 1, entries.length - 1)
return entries[attemptIndex]
```

---

## XI. NarratorIntroOverlay — composant dédié

Composant distinct de NarratorNote. Monté entre SealIntro et Library.

```jsx
// Structure
<NarratorIntroOverlay
  variant="first|return|night"   // déterminé dans App.jsx
  onComplete={handleSealComplete} // → setArchiveOpen(true)
/>

// Phases : tableau de { text, duration }
// Affichage séquentiel automatique
// Skip disponible après 1.5s → "Vous avez hâte." → onComplete()
// Fondu final → Library
```

**État dans App.jsx :**
```jsx
const [introPhase, setIntroPhase] = useState('seal') // 'seal' | 'narrator' | 'archive'

// SealIntro onComplete → setIntroPhase('narrator')
// NarratorIntroOverlay onComplete → setIntroPhase('archive')
```

---

## XII. Plan d'implémentation — chantiers ordonnés

### CHANTIER 0 — Corrections fondations (ne bloque pas les autres)

| # | Action | Fichiers | Durée |
|---|--------|----------|-------|
| 0.1 | `sealInitialClicks = 0` always + supprimer resolveInitialScene last-scene | App.jsx | 15min |
| 0.2 | book_contact_locked.png dans BOOKS_CONFIG + BookItem | BooksContainer.jsx, BookItem.jsx | 30min |
| 0.3 | Supprimer l'effet CSS sealed (opacity/grayscale) de BookItem | BookItem.jsx | 10min |

### CHANTIER 1 — NarratorNote refactorisé

| # | Action | Fichiers | Durée |
|---|--------|----------|-------|
| 1.1 | NarratorNote reçoit `type` + `side` → position dynamique | NarratorNote.jsx, .module.css | 1h |
| 1.2 | narratorDialogues.json reécrit avec champs `type` + `side` | narratorDialogues.json | 30min |
| 1.3 | useNarrator transmet `type` + `side` à App.jsx | useNarrator.js, App.jsx | 45min |

### CHANTIER 2 — NarrativeState + triggers enrichis

| # | Action | Fichiers | Durée |
|---|--------|----------|-------|
| 2.1 | useNarrativeState.js — hook état session | Nouveau hook | 45min |
| 2.2 | Triggers firstClick par livre (onFirstClick_natsume etc.) | App.jsx, LibraryScene.jsx | 30min |
| 2.3 | Triggers onReturnToLibrary_1/2/3 | App.jsx | 30min |
| 2.4 | Nouvelle condition déscellage (Natsume + devlog/gaze) | App.jsx, useNarrativeState | 45min |
| 2.5 | escalade Contact scellé séquentielle (non-aléatoire) | useNarrator.js | 20min |
| 2.6 | onLongStay_natsume (30s/60s/90s timers) | NatsumeScene.jsx | 20min |
| 2.7 | onDevlogProgress dispatch depuis DevlogScene | DevlogScene.jsx | 15min |

### CHANTIER 3 — NarratorIntroOverlay

| # | Action | Fichiers | Durée |
|---|--------|----------|-------|
| 3.1 | NarratorIntroOverlay.jsx — 3 variantes, skip, séquence | Nouveau composant | 1.5h |
| 3.2 | App.jsx — état introPhase (seal → narrator → archive) | App.jsx | 30min |
| 3.3 | Logique variante (first/return/night) + localStorage | App.jsx | 20min |

### CHANTIER 4 — NatsumeScene refactorisée

| # | Action | Fichiers | Durée |
|---|--------|----------|-------|
| 4.1 | Layout flip : portrait gauche (60vh, op 0.75), contenu droite | NatsumeScene.module.css | 45min |
| 4.2 | Widget sur NatsumeScene : taille normale (220px, plus de réduction) | NatsumeWidget.jsx | 10min |
| 4.3 | Réduire attributs de 4 à 3 | NatsumeScene.jsx | 10min |
| 4.4 | Transition in : portrait slide gauche, contenu fade droite | NatsumeScene.jsx | 20min |
| 4.5 | Gradient overlay direction inversée | NatsumeScene.module.css | 10min |

### CHANTIER 5 — Transitions distinctes par scène

| # | Action | Fichiers | Durée |
|---|--------|----------|-------|
| 5.1 | SceneShell : prop `variant` pour variantes par scène | SceneShell.jsx | 30min |
| 5.2 | NatsumeScene : slide-left (déjà dans Chantier 4) | — | — |
| 5.3 | ProjetScene : fade pur (retirer scale) | ProjetScene.jsx | 10min |
| 5.4 | DevlogScene : zoom-in subtle (scale 0.985→1) | DevlogScene.jsx | 10min |
| 5.5 | ContactScene : compress (scale 1.04→1) | ContactScene.jsx | 10min |

### CHANTIER 6 — ProjetScene narrative

| # | Action | Fichiers | Durée |
|---|--------|----------|-------|
| 6.1 | Ligne-clé manifeste : style distinct + animation séparée | ProjetScene.jsx, .module.css | 20min |
| 6.2 | Journal : ordre inversé (plus récent en haut) | ProjetScene.jsx | 10min |
| 6.3 | Ligne "Prochaine entrée : ···" | ProjetScene.jsx | 5min |
| 6.4 | Trigger onManifestKeyLine dispatch | ProjetScene.jsx | 15min |

---

## XIII. Ce qui n'est pas dans ce plan (décisions prises)

| Feature | Raison |
|---------|--------|
| Animation déscellage spectaculaire sur livre Contact | Le changement d'asset suffit — sobre > spectacle |
| Choix explicites utilisateur | Trahit la vision — embranchements implicites only |
| Repositionnement widget | Widget bottom-right partout — la scène s'adapte à lui |
| natsume_hero.png dans l'UI | README uniquement |
| onCartographer comme condition Contact | Remplacé par condition narrative (Natsume + intime) |
| SealInitialClicks > 0 pour returning users | Expérience toujours depuis le début |

---

## XIV. Questions fermées (décisions prises dans ce doc)

| Question | Décision |
|----------|---------|
| Overlay intro skippable ? | Oui, après 1.5s, avec ligne de sortie Narrateur |
| NarratorQueue persiste entre scènes ? | Non — reset à chaque transition |
| 3 ou 4 variantes d'intro ? | 3 : first / return / night |
| Widget sur NatsumeScene ? | Reste, 220px normal — c'est la scène qui change |
| Full portrait (88vh) NatsumeScene ? | Remplacé par portrait gauche 60vh opacité 0.75 |
| Condition Contact ? | Natsume visitée + (devlog ≥ 2 OR gazeHeld) |
| book_contact_locked | Remplace CSS opacity/grayscale, asset dédié |
| Escalade Contact messages ? | Séquentielle (0→1→2), pas aléatoire |
