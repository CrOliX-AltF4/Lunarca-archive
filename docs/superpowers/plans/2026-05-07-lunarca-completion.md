# Lunarca — Plan d'implémentation complet (chantier final)

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Compléter le jeu narratif interactif Lunarca — game loop 3 actes opérationnel, Narrateur actif, Contact scellé fonctionnel, polish UI/UX cohérent avec l'univers.

**Architecture:** SPA React 18 + Vite, hash routing, localStorage only. Deux voix narratives (Natsume via `useNatsumeWidget` + custom event `natsume:trigger`, Narrateur via `useNarrator` + custom event `narrator:trigger`). Framer Motion pour transitions inter-scènes, GSAP pour animations intra-scènes — règle stricte, ne pas mélanger.

**Tech Stack:** React 18, Vite, Framer Motion, GSAP + @gsap/react, CSS Modules, localStorage

---

## Auto-critique & zones de risque

| Zone | Risque | Décision |
|------|--------|----------|
| Contact sealed unlock | TBD dans la vision → décision arrêtée ici : **onCartographer** (toutes scènes visitées) | Narrativement cohérent, déjà tracké dans App.jsx |
| GSAP + prefers-reduced-motion | Les timelines JS ne respectent pas la CSS media query | Chaque `useGSAP` doit vérifier `window.matchMedia('(prefers-reduced-motion: reduce)').matches` |
| onEasterEggComplete "3 eggs" | Liste ambiguë dans CONTEXT.md | Décision : easterEgg_konami + easterEgg_lys + onGazeHeld |
| Contact unseal animation | Si l'animation est lourde → abandonner, garder état seul | Critère d'abandon : si > 50 lignes ou effet peu convaincant |
| NatsumeWidget sur NatsumeScene | Portrait widget (220px) + full portrait (88vh) mêmes côté droit | Acceptable : scales différentes, présence renforcée |

## Ce qui est DÉJÀ FAIT (ne pas retoucher)

- DustParticles : `if (isTouchDevice) return null` ✓
- font-display:swap : `&display=swap` dans l'URL Google Fonts ✓
- favicon.svg, manifest.json, og-preview, 404.html : dans `/public` ✓
- Open Graph meta tags : dans `index.html` ✓
- prefers-reduced-motion CSS : dans `index.css` ✓
- grain mobile réduit (opacity 0.04 sur hover:none) ✓
- BG1 (rapid click IDs), BG2 (isMobile réactif) : corrigés ✓
- gradientOverlay NatsumeScene pointer-events:none ✓
- SceneShell créé + appliqué aux 3 scènes secondaires ✓

---

## Carte des fichiers modifiés

| Fichier | Tâche(s) | Rôle du changement |
|---------|----------|-------------------|
| `src/components/widget/NatsumeWidget.jsx` | T1 | Supprimer `!isNatsumeScene`, ajuster taille portrait |
| `src/data/narratorDialogues.json` | T2 | Contenu réel style Stanley Parable |
| `src/data/dialogues.json` | T3, T5 | Ajouter onContactSealAttempt + onEasterEggComplete |
| `src/components/books/BookItem.jsx` | T3 | Sealed visual + résistance GSAP |
| `src/components/books/BooksContainer.jsx` | T3, T4 | Prop sealed, écouter contact:unseal |
| `src/components/scenes/LibraryScene.jsx` | T3, T4 | Passer isContactSealed à BooksContainer |
| `src/App.jsx` | T4 | onCartographer → unseal + narrator + natsume |
| `src/hooks/useAchievements.js` | T5 | onEasterEggComplete tracking |
| `src/data/achievements.js` | T5 | Ajouter onEasterEggComplete |
| `src/components/ui/SystemMenu.jsx` | T6 | Labels diégétiques univers |
| `src/components/scenes/NatsumeScene.jsx` | T7 | GSAP reduced-motion guard |
| `src/components/scenes/ProjetScene.jsx` | T7 | GSAP reduced-motion guard |
| `src/components/scenes/DevlogScene.jsx` | T7 | Audit (probablement rien) |
| `src/components/widget/DialogueBubble.jsx` | T8 | Alt text audit |

---

## Task 1 — NatsumeWidget : présence complète sur NatsumeScene

**Contexte :** Le code actuel cache le portrait miniature (`!isNatsumeScene`) sur NatsumeScene. La décision est annulée — Natsume doit être pleinement présente sur sa propre scène : full portrait (88vh droite) + widget portrait (bottom-right, taille légèrement réduite pour éviter compétition visuelle). La bulle de dialogue et le gazeHeld restent actifs dans les deux zones.

**Files:**
- Modify: `src/components/widget/NatsumeWidget.jsx`

- [ ] **Step 1 : Retirer `!isNatsumeScene` + ajuster la taille**

Remplacer dans `NatsumeWidget.jsx` :

```jsx
// AVANT
const isNatsumeScene = currentScene === 'natsume'
// ...
const portraitWidth = isMobile ? '140px' : '220px'
// ...
{!isNatsumeScene && (
  <AnimatePresence mode="wait">
    <motion.img ... />
  </AnimatePresence>
)}
```

```jsx
// APRÈS — supprimer isNatsumeScene, ajuster taille selon scène
const isNatsumeScene = currentScene === 'natsume'
const portraitWidth = isNatsumeScene ? '160px' : (isMobile ? '140px' : '220px')

// Dans le return — supprimer le wrapper {!isNatsumeScene && ...}
<AnimatePresence mode="wait">
  <motion.img
    key={mood}
    src={PORTRAITS[mood] ?? natsumeIdle}
    alt="Natsume"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0, transition: { duration: 0.35 } }}
    exit={{ opacity: 0, x: 20, transition: { duration: 0.25 } }}
    onMouseEnter={handleGazeStart}
    onMouseLeave={handleGazeEnd}
    style={{ width: portraitWidth, height: 'auto', display: 'block', pointerEvents: 'auto' }}
  />
</AnimatePresence>
```

- [ ] **Step 2 : Build de vérification**

```bash
npm run build
```
Attendu : `✓ built` sans erreur.

- [ ] **Step 3 : Commit**

```bash
git add src/components/widget/NatsumeWidget.jsx
git commit -m "fix: restore Natsume widget presence on NatsumeScene"
```

---

## Task 2 — Contenu Narrateur : narratorDialogues.json

**Contexte :** Le JSON actuel a un contenu placeholder correct mais trop générique. Le ton Stanley Parable n'est pas encore pleinement rendu : le Narrateur doit être méta-conscient, légèrement condescendant, surpris par les événements, capable d'erreur. Il parle à l'utilisateur, jamais à Natsume. Ses textes : 1 à 3 phrases max, second degré, voix distincte de Natsume.

**Règles de contenu :**
- Il sait qu'il narre. Il peut se tromper.
- Il ne guide pas — il commente.
- Surpris que les choses marchent.
- Jamais de réponse directe à Natsume même si elle réagit.
- Registre : détaché, légèrement ironique, fataliste.

**Files:**
- Modify: `src/data/narratorDialogues.json`

- [ ] **Step 1 : Réécrire le JSON complet**

```json
[
  {
    "trigger": "intro_library",
    "scene": "library",
    "sessionOnce": true,
    "entries": [
      {
        "text": "Ah. Vous êtes là. Le Narrateur ne s'attendait pas à ce que ça fonctionne aussi vite.",
        "mood": null
      },
      {
        "text": "Bienvenue dans la bibliothèque. Natsume est déjà là. Elle était là avant vous. Elle sera probablement là après.",
        "mood": null
      }
    ]
  },
  {
    "trigger": "intro_natsume",
    "scene": "natsume",
    "sessionOnce": true,
    "entries": [
      {
        "text": "Une fiche d'identité. Le Narrateur avait prévu quelque chose de plus dramatique pour cette révélation.",
        "mood": null
      },
      {
        "text": "Quinze ans. Le Narrateur trouve ça long. Natsume, visiblement, non.",
        "mood": null
      }
    ]
  },
  {
    "trigger": "intro_projet",
    "scene": "projet",
    "sessionOnce": true,
    "entries": [
      {
        "text": "L'archive du projet. Le Narrateur vous recommande la lecture attentive. Natsume n'a pas été consultée sur cette recommandation.",
        "mood": null
      },
      {
        "text": "Ce que vous lisez ici existe depuis plus longtemps que ce site. Le Narrateur le sait. Natsume aussi.",
        "mood": null
      }
    ]
  },
  {
    "trigger": "intro_devlog",
    "scene": "devlog",
    "sessionOnce": true,
    "entries": [
      {
        "text": "Un journal de bord. Personnel. Le Narrateur vous rappelle que vous n'étiez pas censé en avoir accès.",
        "mood": null
      },
      {
        "text": "Le livre est sur la table. Le Narrateur vous déconseille de l'ouvrir. C'est une suggestion.",
        "mood": null
      }
    ]
  },
  {
    "trigger": "intro_contact_sealed",
    "scene": "library",
    "sessionOnce": false,
    "entries": [
      {
        "text": "Pas encore. Le Narrateur est catégorique sur ce point, ce qui est rare.",
        "mood": null
      },
      {
        "text": "Ce livre résiste. Le Narrateur note votre tentative sans commentaire particulier.",
        "mood": null
      },
      {
        "text": "Il y a un ordre dans les choses. Le Narrateur n'en dira pas plus.",
        "mood": null
      }
    ]
  },
  {
    "trigger": "contact_unsealed",
    "scene": "library",
    "sessionOnce": true,
    "entries": [
      {
        "text": "Tiens. Le Narrateur n'avait pas prévu ça non plus. Enfin — si. Mais pas maintenant.",
        "mood": null
      }
    ]
  },
  {
    "trigger": "onPlayerInactive",
    "scene": "global",
    "sessionOnce": false,
    "entries": [
      {
        "text": "Le Narrateur attend. Il a le temps. Vous semblez aussi en avoir beaucoup.",
        "mood": null
      },
      {
        "text": "Rien. Le Narrateur apprécie le silence autant que Natsume. C'est la seule chose qu'ils ont en commun.",
        "mood": null
      },
      {
        "text": "Le Narrateur se demande si vous êtes encore là. La question est rhétorique.",
        "mood": null
      }
    ]
  },
  {
    "trigger": "onAllScenesVisited",
    "scene": "global",
    "sessionOnce": true,
    "entries": [
      {
        "text": "Vous avez regardé partout. Le Narrateur est impressionné. Non. Surpris. Ce n'est pas la même chose.",
        "mood": null
      }
    ]
  }
]
```

- [ ] **Step 2 : Vérifier que useNarrator.findEntry() lit bien `entries[x].text`**

Ouvrir `src/hooks/useNarrator.js` ligne 24 : `return pool[Math.floor(Math.random() * pool.length)] ?? null` retourne l'objet entier `{ text, mood }`. Le composant NarratorNote reçoit `text={narratorText}` depuis App.jsx où `narratorText = text` (string) — vérifier que `useNarrator` expose bien `.text` et non l'objet entier.

Correction si nécessaire dans `useNarrator.js` :
```js
// findEntry retourne entry.entries[x] qui est { text, mood }
// setText reçoit entry.text (string)
setText(entry.text)  // ligne 41 actuelle — correct si entry = { text, mood }
```

- [ ] **Step 3 : Commit**

```bash
git add src/data/narratorDialogues.json
git commit -m "content: narratorDialogues real Stanley Parable tone"
```

---

## Task 3 — Contact scellé : état visuel + résistance au clic

**Contexte :** Le livre Contact dans la Library doit avoir un état visuel distinct (scellé) et résister au clic avec une animation GSAP de tremblement. Natsume peut réagir à la tentative. Le Narrateur aussi (déjà câblé via `intro_contact_sealed`).

**Décision d'architecture :**
- `isContactSealed` : état booléen géré dans App.jsx, lu depuis `localStorage.getItem('lunarca_contact_unsealed')`
- Passé via props : `App → LibraryScene → BooksContainer → BookItem`
- L'état scellé est persistant : si déjà déscellé dans une session précédente → Contact accessible dès le chargement
- Animation résistance : GSAP dans BookItem (intra-scène → GSAP ✓)

**Files:**
- Modify: `src/data/dialogues.json` — ajouter `onContactSealAttempt`
- Modify: `src/components/books/BookItem.jsx` — sealed visual + GSAP shake
- Modify: `src/components/books/BooksContainer.jsx` — sealed prop propagation
- Modify: `src/components/scenes/LibraryScene.jsx` — recevoir + passer isContactSealed

- [ ] **Step 1 : Ajouter dialogue Natsume pour tentative Contact scellé**

Dans `src/data/dialogues.json`, ajouter après les entrées `onBooksRapidClick` :

```json
{ "trigger": "onContactSealAttempt", "scene": "library", "text": null, "mood": "irritation" },
{ "trigger": "onContactSealAttempt", "scene": "library", "text": "Non.", "mood": "irritation" },
{ "trigger": "onContactSealAttempt", "scene": "library", "text": "Pas encore.", "mood": "idle" }
```

- [ ] **Step 2 : Modifier BookItem — sealed visual + GSAP shake**

Dans `src/components/books/BookItem.jsx` :

```jsx
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { dispatch } from '../../utils/dispatch.js'

export default function BookItem({ book, onClick, onTripleClick, sealed = false }) {
  const clickDataRef = useRef({ count: 0, timer: null })
  const hoverLongRef = useRef(null)
  const shakeRef = useRef(null)
  const [flipping, setFlipping] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 767px)').matches)
  const imgWidth = isMobile ? '90px' : '120px'

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)')
    const handler = (e) => setIsMobile(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  const handleClick = () => {
    if (sealed) {
      // Résistance : tremblement GSAP + triggers narratifs
      if (shakeRef.current) {
        gsap.killTweensOf(shakeRef.current)
        gsap.to(shakeRef.current, {
          x: 0, y: 0, rotation: 0, duration: 0.15, ease: 'power2.out',
        })
      }
      if (shakeRef.current) {
        gsap.timeline()
          .to(shakeRef.current, { x: -6, rotation: -2, duration: 0.06, ease: 'power2.out' })
          .to(shakeRef.current, { x: 7, rotation: 2, duration: 0.06, ease: 'power2.out' })
          .to(shakeRef.current, { x: -5, rotation: -1.5, duration: 0.06, ease: 'power2.out' })
          .to(shakeRef.current, { x: 4, rotation: 1, duration: 0.06, ease: 'power2.out' })
          .to(shakeRef.current, { x: 0, rotation: 0, duration: 0.1, ease: 'power2.inOut' })
      }
      dispatch('onContactSealAttempt', 'library')
      window.dispatchEvent(new CustomEvent('narrator:trigger', {
        detail: { trigger: 'intro_contact_sealed', scene: 'library' },
      }))
      return
    }

    const data = clickDataRef.current
    data.count += 1
    clearTimeout(data.timer)

    if (data.count >= 3 && onTripleClick) {
      data.count = 0
      onTripleClick()
      return
    }

    data.timer = setTimeout(() => {
      if (data.count === 1) {
        dispatch('onBookClick', book.id)
        setFlipping(true)
        setTimeout(() => onClick(), 150)
      }
      data.count = 0
    }, 300)
  }

  const handleHoverStart = () => {
    if (sealed) return
    dispatch('onBookHover', book.id)
    hoverLongRef.current = setTimeout(() => {
      dispatch('onBookHoverLong', book.id)
    }, 3000)
  }

  const handleHoverEnd = () => {
    clearTimeout(hoverLongRef.current)
  }

  return (
    <div ref={shakeRef} style={{ position: 'absolute', left: book.position.left, top: book.position.top }}>
      <motion.div
        onClick={handleClick}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        style={{ transformOrigin: 'bottom center', perspective: '500px' }}
        initial={{ opacity: 0, y: 20 }}
        animate={flipping ? {
          rotateY: -28, scaleX: 0.82, opacity: 0.6, y: 0,
          transition: { duration: 0.14, ease: 'easeIn' },
        } : {
          opacity: sealed ? 0.35 : 1,
          y: sealed ? 0 : [0, -8, 0],
          filter: sealed
            ? 'grayscale(0.7) drop-shadow(0 0 0px rgba(0,0,0,0))'
            : 'drop-shadow(0 0 0px rgba(245,243,239,0))',
          transition: {
            opacity: { duration: 0.8, delay: book.floatDelay * 0.3 },
            y: sealed ? {} : { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: book.floatDelay },
            filter: { duration: 0.3 },
          },
        }}
        whileHover={flipping || sealed ? {} : {
          scale: 1.05,
          filter: 'drop-shadow(0 0 14px rgba(245,243,239,0.5))',
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: sealed ? 1 : 0.97 }}
      >
        <img
          src={book.asset}
          alt={book.label}
          style={{ width: imgWidth, height: 'auto', display: 'block' }}
        />
        <p style={{
          textAlign: 'center',
          fontFamily: 'Cinzel, serif',
          fontSize: '0.75rem',
          letterSpacing: '0.12em',
          marginTop: '0.5rem',
          color: sealed ? 'var(--color-fog)' : 'var(--color-parchment)',
          textShadow: '0 0 8px rgba(0,0,0,0.8)',
          opacity: sealed ? 0.5 : 1,
        }}>
          {book.label}
        </p>
      </motion.div>
    </div>
  )
}
```

**Attention :** Le wrapper `div ref={shakeRef}` remplace le `style.position:absolute` qui était sur le `motion.div`. Vérifier que le positionnement visuel reste identique.

- [ ] **Step 3 : Modifier BooksContainer — propagation sealed**

Dans `src/components/books/BooksContainer.jsx` :

```jsx
export default function BooksContainer({ onNavigate, onNatsumeTripleClick, isContactSealed = true }) {
  // ... (rapidRef, handleBookClick inchangés)

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {BOOKS_CONFIG.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          onClick={() => handleBookClick(book.id)}
          onTripleClick={book.id === SCENES.NATSUME ? onNatsumeTripleClick : undefined}
          sealed={book.id === SCENES.CONTACT && isContactSealed}
        />
      ))}
    </div>
  )
}
```

- [ ] **Step 4 : Modifier LibraryScene — recevoir + passer isContactSealed**

Dans `src/components/scenes/LibraryScene.jsx` :

```jsx
export default function LibraryScene({ onNavigate, isContactSealed }) {
  // ... (inchangé sauf BooksContainer)
  
  // Dans le return, modifier BooksContainer :
  <BooksContainer
    onNavigate={onNavigate}
    onNatsumeTripleClick={handleNatsumeTripleClick}
    isContactSealed={isContactSealed}
  />
}
```

- [ ] **Step 5 : Build de vérification**

```bash
npm run build
```
Attendu : `✓ built` sans erreur.

- [ ] **Step 6 : Commit**

```bash
git add src/data/dialogues.json src/components/books/BookItem.jsx src/components/books/BooksContainer.jsx src/components/scenes/LibraryScene.jsx
git commit -m "feat: Contact sealed — visual state + GSAP resistance + Natsume reaction"
```

---

## Task 4 — Contact scellé : condition de déblocage + déscellage

**Décision : onCartographer** (toutes 4 scènes secondaires visitées). Déjà tracké dans App.jsx. Quand il se déclenche : unseal Contact, dispatch narrator, Natsume silencieuse (l'event onCartographer Natsume a déjà une réplique dans dialogues.json).

**Files:**
- Modify: `src/App.jsx` — condition unseal + états + props

- [ ] **Step 1 : Modifier App.jsx — état isContactSealed + unseal au Cartographer**

```jsx
// Ajouter après les useState existants :
const [isContactSealed, setIsContactSealed] = useState(
  () => !localStorage.getItem('lunarca_contact_unsealed')
)

// Remplacer le useEffect cartographer existant :
useEffect(() => {
  if (!archiveOpen || cartographerFired.current) return
  const sections = [SCENES.NATSUME, SCENES.PROJET, SCENES.DEVLOG, SCENES.CONTACT]
  visitedScenesRef.current.add(currentScene)
  if (sections.every(s => visitedScenesRef.current.has(s))) {
    cartographerFired.current = true
    // Natsume
    window.dispatchEvent(new CustomEvent('natsume:trigger', {
      detail: { trigger: 'onCartographer', scene: 'global' },
    }))
    // Narrateur
    window.dispatchEvent(new CustomEvent('narrator:trigger', {
      detail: { trigger: 'onAllScenesVisited', scene: 'global' },
    }))
    // Unseal Contact si encore scellé
    if (!localStorage.getItem('lunarca_contact_unsealed')) {
      localStorage.setItem('lunarca_contact_unsealed', '1')
      setIsContactSealed(false)
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('narrator:trigger', {
          detail: { trigger: 'contact_unsealed', scene: 'library' },
        }))
      }, 2000)  // laisser le trigger onAllScenesVisited s'afficher d'abord
    }
  }
}, [currentScene, archiveOpen])

// Passer isContactSealed à LibraryScene :
{currentScene === SCENES.LIBRARY && (
  <LibraryScene key="library" onNavigate={navigate} isContactSealed={isContactSealed} />
)}
```

**Note :** Le reset du sceau (`onResetSeal` dans SystemMenu) doit aussi remettre `isContactSealed`:

```jsx
const handleResetSeal = useCallback(() => {
  localStorage.removeItem('lunarca_contact_unsealed')
  setIsContactSealed(true)
  setArchiveOpen(false)
}, [])

// Et dans le SystemMenu :
<SystemMenu
  open={systemMenuOpen}
  onClose={() => setSystemMenuOpen(false)}
  onResetSeal={handleResetSeal}
  onOpenAchievements={() => setAchievementsOpen(true)}
/>
```

- [ ] **Step 2 : Build de vérification**

```bash
npm run build
```

- [ ] **Step 3 : Vérifier manuellement**

En dev (`npm run dev`) :
1. Visiter toutes les scènes → le Narrateur doit afficher `onAllScenesVisited`
2. Retourner en Library → Contact book doit avoir `opacity: 1`, `grayscale(0)`, flottement actif
3. Cliquer Contact → navigation vers ContactScene (non scellée)
4. Reset depuis SystemMenu → Contact redevient scellé

- [ ] **Step 4 : Commit**

```bash
git add src/App.jsx
git commit -m "feat: Contact unseal on onCartographer — onAllScenesVisited narrator"
```

---

## Task 5 — onEasterEggComplete : tracking des 3 eggs

**Contexte :** 3 "œufs" à trouver : `easterEgg_konami`, `easterEgg_lys`, `onGazeHeld`. Quand les 3 sont débloqués dans la session → dispatche `onEasterEggComplete`. L'achievement ne donne pas de TrophyNotification (trop méta) — juste un dialogue Natsume rare.

**Files:**
- Modify: `src/data/achievements.js` — ajouter onEasterEggComplete dans ACHIEVEMENTS
- Modify: `src/data/dialogues.json` — dialogue onEasterEggComplete
- Modify: `src/hooks/useAchievements.js` — tracking + dispatch quand 3/3

- [ ] **Step 1 : Ajouter dans achievements.js**

```js
export const ACHIEVEMENTS = {
  easterEgg_konami:     { title: 'Séquence ancienne',       description: 'Tu as su.' },
  onAllLinksClicked:    { title: 'Toutes les portes',        description: 'Chaque lien franchi.' },
  onAllDevlogRead:      { title: 'Lecteur du Scriptorium',   description: 'Tu as lu jusqu\'au bout.' },
  easterEgg_lys:        { title: 'Ce n\'est pas pour toi',   description: 'Elle t\'a prévenu.' },
  onGazeHeld:           { title: 'Regard fixe',              description: 'Cinq secondes de trop.' },
  onCartographer:       { title: 'Cartographe',              description: 'Chaque section visitée.' },
  onEasterEggComplete:  { title: 'Tu as cherché',            description: 'Tout trouvé. Elle l\'a noté.' },
}
```

- [ ] **Step 2 : Ajouter dialogue dans dialogues.json**

```json
{ "trigger": "onEasterEggComplete", "scene": "global", "text": "Tu as cherché. Je n'avais pas décidé si c'était bien.", "mood": "gene", "sessionOnce": true },
{ "trigger": "onEasterEggComplete", "scene": "global", "text": "Tout.", "mood": "surprise", "sessionOnce": true }
```

- [ ] **Step 3 : Modifier useAchievements.js**

```js
import { useEffect, useState } from 'react'
import { ACHIEVEMENTS, getUnlocked, saveUnlocked } from '../data/achievements.js'

const EGGS = new Set(['easterEgg_konami', 'easterEgg_lys', 'onGazeHeld'])

export default function useAchievements() {
  const [pending, setPending] = useState(null)

  useEffect(() => {
    const unlocked = getUnlocked()
    const eggsFoundThisSession = new Set()

    const handler = (e) => {
      const { trigger } = e.detail
      const achievement = ACHIEVEMENTS[trigger]
      if (!achievement || unlocked.has(trigger)) return
      unlocked.add(trigger)
      saveUnlocked(unlocked)
      setPending({ ...achievement, key: trigger })
      setTimeout(() => setPending(null), 4500)

      // onEasterEggComplete : tracker les 3 eggs de session
      if (EGGS.has(trigger)) {
        eggsFoundThisSession.add(trigger)
        if (
          eggsFoundThisSession.size >= EGGS.size &&
          !unlocked.has('onEasterEggComplete')
        ) {
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('natsume:trigger', {
              detail: { trigger: 'onEasterEggComplete', scene: 'global' },
            }))
          }, 1500)
        }
      }
    }

    window.addEventListener('natsume:trigger', handler)
    return () => window.removeEventListener('natsume:trigger', handler)
  }, [])

  return pending
}
```

- [ ] **Step 4 : Build + commit**

```bash
npm run build
git add src/data/achievements.js src/data/dialogues.json src/hooks/useAchievements.js
git commit -m "feat: onEasterEggComplete tracking — 3 eggs konami + lys + gazeHeld"
```

---

## Task 6 — SystemMenu diégétique

**Contexte :** Les labels actuels sont fonctionnels mais hors univers. Renommer en vocabulaire de l'archive.

**Files:**
- Modify: `src/components/ui/SystemMenu.jsx`

- [ ] **Step 1 : Renommer les labels**

```jsx
// AVANT
<p style={{...}}>Paramètres de l'archive</p>

<MenuRow label="Texture de grain"   value={grainOn ? 'Active' : 'Désactivée'} onClick={...} />
<MenuRow label="Trophées"           value="Consulter" onClick={...} />
<MenuRow label="Mémoire du sceau"   value="Réinitialiser" danger onClick={...} />
<button onClick={onClose}>✕  Fermer</button>
```

```jsx
// APRÈS
<p style={{...}}>Registre du Gardien</p>

<MenuRow label="Résidu mémoriel"    value={grainOn ? 'Présent' : 'Effacé'} onClick={...} />
<MenuRow label="Résonances"         value="Consulter" onClick={...} />
<MenuRow label="Réinitialiser"      value="Tout effacer" danger onClick={...} />
<button onClick={onClose}>Refermer</button>
```

- [ ] **Step 2 : Build + commit**

```bash
npm run build
git add src/components/ui/SystemMenu.jsx
git commit -m "polish: SystemMenu labels — univers Lunarca"
```

---

## Task 7 — GSAP : respect de prefers-reduced-motion

**Contexte :** `@media (prefers-reduced-motion: reduce)` dans index.css ne stoppe que les CSS transitions/animations. Les timelines GSAP en JS restent actives. Chaque `useGSAP` doit vérifier la préférence et soit court-circuiter l'animation, soit la rendre instantanée.

**Pattern à appliquer :**
```js
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (prefersReduced) return  // ou gsap.set() au lieu de gsap.from()
```

**Files:**
- Modify: `src/components/scenes/NatsumeScene.jsx`
- Modify: `src/components/scenes/ProjetScene.jsx`

- [ ] **Step 1 : NatsumeScene.jsx — guard dans useGSAP**

```jsx
useGSAP(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const tl = gsap.timeline({ delay: 0.5 })
  tl.from('.nat-portrait',  { opacity: 0, x: 20,  duration: 1.0, ease: 'power2.out' })
    // ... rest of timeline unchanged
}, { scope: containerRef })
```

- [ ] **Step 2 : ProjetScene.jsx — guard dans useGSAP**

```jsx
useGSAP(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const tl = gsap.timeline({ delay: 0.5 })
  tl.from('.proj-title',     { opacity: 0, y: 12,  duration: 0.6, ease: 'power2.out' })
    // ... rest of timeline unchanged
}, { scope: containerRef })
```

- [ ] **Step 3 : Audit DevlogScene**

Lire `src/components/scenes/DevlogScene.jsx` et `src/components/devlog/DevlogBook.jsx` pour identifier tous les `useGSAP` / `gsap.timeline()`. Appliquer le même guard si trouvés.

- [ ] **Step 4 : Build + commit**

```bash
npm run build
git add src/components/scenes/NatsumeScene.jsx src/components/scenes/ProjetScene.jsx
git commit -m "a11y: GSAP timelines respect prefers-reduced-motion"
```

---

## Task 8 — Accessibilité : audit alt text + contraste

**Contexte :** Alt text manquants ou génériques sur certains composants. Contraste de `--color-fog` (#888888) sur fond `rgba(0,0,0,0.42)` = fond effectif ~#060606 → ratio #888 / #060606 ≈ 6.1:1 (WCAG AA ✓). Sur fond plus clair (#1a1a1a) → ratio ≈ 4.8:1 (✓). Pas de problème critique de contraste.

**Files à auditer :**
- `src/components/ui/SealIntro.jsx` — imgs du sceau
- `src/components/ui/FrameOverlay.jsx` — imgs décoratives
- `src/components/contact/RuneStele.jsx` — imgs runes

- [ ] **Step 1 : Lire SealIntro.jsx et corriger alt text**

Les images du sceau sont décoratives → `alt=""` si purement décoratif, ou alt descriptif si elles ont du sens narratif. Chercher tous les `<img` sans `alt` ou avec `alt=""`.

Ouvrir et inspecter : `src/components/ui/SealIntro.jsx`

- [ ] **Step 2 : Lire FrameOverlay.jsx**

Les coins et bordures decoratifs → `alt=""` (décoratif). Vérifier que c'est bien le cas.

- [ ] **Step 3 : Lire RuneStele.jsx**

Les runes sont interactives → `alt` descriptif requis (ex: "Rune Discord", "Rune GitHub").

- [ ] **Step 4 : Commit si changements**

```bash
git add src/components/ui/SealIntro.jsx src/components/ui/FrameOverlay.jsx src/components/contact/RuneStele.jsx
git commit -m "a11y: alt text audit — decorative and interactive images"
```

---

## Conditionnel — à faire UNIQUEMENT si résultat propre

### C1 : Animation de déscellage Contact (BookItem)

**Si** les Tasks 3-4 sont propres et l'effet serait convaincant : ajouter une animation GSAP sur le livre Contact au moment du déscellage (brief glow pulse + opacity restore + brief upward float).

**BooksContainer** : écouter `contact:unseal` custom event, passer un prop `unsealing` temporaire à BookItem.
**BookItem** : `useEffect` sur `unsealing` → GSAP timeline (0.6s, opacity 0.35→1, filter grayscale→normal, y 0→-12→0).

**Critère d'abandon :** si ça nécessite plus de 40 lignes de code ou si le résultat n'est pas fluide.

### C2 : Footer diégétique

Remplacer "Lunarca" par un glyphe de l'univers. Remplacer les labels scènes par le vocabulaire archive. Critère d'abandon : si ça casse la lisibilité.

---

## Ordre d'exécution recommandé

```
T1 (5 min)  → T2 (30 min) → T3 (45 min) → T4 (30 min)
→ T5 (20 min) → T6 (10 min) → T7 (15 min) → T8 (20 min)
→ C1 si temps (30 min)
```

**Total estimé : ~3h (sans C1)**

---

## Self-review

**Couverture spec :**
- ✅ NatsumeWidget NatsumeScene → T1
- ✅ Narrateur contenu réel → T2
- ✅ Contact scellé visuel + résistance → T3
- ✅ Contact déscellage + condition → T4
- ✅ onEasterEggComplete → T5
- ✅ SystemMenu diégétique → T6
- ✅ GSAP reduced-motion → T7
- ✅ Alt text → T8
- ✅ Narrator `onAllScenesVisited` dispatch → T4 (dans App.jsx useEffect)

**Décisions arrêtées :**
- Contact unlock = onCartographer ✓
- 3 eggs = konami + lys + gazeHeld ✓
- Portrait widget NatsumeScene = 160px (vs 220px normal) ✓

**Placeholders :** Aucun. Tout le code est présent.

**Dépendances critiques :**
- T4 dépend de T3 (LibraryScene doit recevoir `isContactSealed` avant de l'utiliser)
- T5 dépend de rien (indépendant)
- T7, T8 sont indépendants
