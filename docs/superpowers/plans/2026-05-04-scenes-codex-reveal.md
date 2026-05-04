# Scenes Codex Reveal — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refonte de NatsumeScene et ProjetScene en "Codex Reveal" — révélation progressive GSAP, layout narratif, suppression des dumps simultanés.

**Architecture:** Framer Motion conservé pour les transitions inter-scènes (enveloppe `motion.div` + variants). GSAP via `useGSAP` (@gsap/react) gère la mise en scène intra-scène. CSS Modules colocalisés pour chaque scène. Toutes les animations : opacity + transform uniquement.

**Tech Stack:** React 18, Framer Motion 12, GSAP + @gsap/react, CSS Modules, Vite 8

---

## Fichiers impactés

| Fichier | Action |
|---|---|
| `package.json` | Ajout `gsap`, `@gsap/react` |
| `src/components/scenes/NatsumeScene.jsx` | Refonte complète |
| `src/components/scenes/NatsumeScene.module.css` | Créer |
| `src/components/scenes/ProjetScene.jsx` | Refonte complète |
| `src/components/scenes/ProjetScene.module.css` | Créer |

---

## Task 1 — Installer GSAP

**Files:**
- Modify: `package.json`

- [ ] **Step 1 : Installer les packages**

```bash
npm install gsap @gsap/react
```

- [ ] **Step 2 : Vérifier l'installation**

```bash
npm run build
```

Résultat attendu : build OK, pas d'erreur. Si erreur de peer dependency, ignorer (gsap et @gsap/react sont compatibles React 18/19).

- [ ] **Step 3 : Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add gsap and @gsap/react"
```

---

## Task 2 — NatsumeScene — CSS Module

**Files:**
- Create: `src/components/scenes/NatsumeScene.module.css`

- [ ] **Step 1 : Créer le fichier CSS Module**

Créer `src/components/scenes/NatsumeScene.module.css` avec ce contenu exact :

```css
.scene {
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.42);
}

.portrait {
  position: absolute;
  right: 0;
  bottom: 0;
  height: 88vh;
  width: auto;
  display: block;
  filter: drop-shadow(0 0 40px rgba(139, 0, 0, 0.25));
  z-index: 1;
  pointer-events: none;
  user-select: none;
}

.gradientOverlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.97) 0%,
    rgba(0, 0, 0, 0.88) 35%,
    rgba(0, 0, 0, 0.5) 55%,
    rgba(0, 0, 0, 0.15) 75%,
    rgba(0, 0, 0, 0.05) 100%
  );
  z-index: 2;
}

.content {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 54%;
  padding: 0 5% 7% 6%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 10;
}

.name {
  font-family: 'Cinzel', serif;
  font-size: clamp(1.4rem, 2.8vw, 2.2rem);
  letter-spacing: 0.12em;
  color: var(--color-white-ink);
  font-weight: 400;
  margin-bottom: 0.6rem;
  line-height: 1;
}

.rule {
  width: 3rem;
  height: 1px;
  background: var(--color-accent);
  margin-bottom: 1.4rem;
}

.fragmentMain {
  font-family: 'IM Fell English', serif;
  font-style: italic;
  font-size: 0.92rem;
  line-height: 1.75;
  color: var(--color-parchment);
  max-width: 380px;
  margin-bottom: 0.6rem;
}

.fragmentSub {
  font-family: 'IM Fell English', serif;
  font-size: 0.82rem;
  line-height: 1.7;
  color: var(--color-fog);
  margin-bottom: 1.6rem;
}

.traits {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  margin-bottom: 1.4rem;
}

.trait {
  display: flex;
  align-items: baseline;
  gap: 1.2rem;
}

.traitLabel {
  font-family: 'Cinzel', serif;
  font-size: 0.6rem;
  letter-spacing: 0.18em;
  color: var(--color-fog);
  text-transform: uppercase;
  min-width: 60px;
  flex-shrink: 0;
}

.traitValue {
  font-family: 'IM Fell English', serif;
  font-size: 0.88rem;
  color: var(--color-white-ink);
  line-height: 1.4;
}

.traitValueHover {
  composes: traitValue;
  border-bottom: 1px solid rgba(139, 0, 0, 0.3);
  cursor: default;
  transition: color 0.2s, border-color 0.2s;
}

.traitValueHover:hover {
  color: var(--color-parchment);
  border-bottom-color: var(--color-accent);
}

.caractereBlock {
  border-top: 1px solid var(--color-ash);
  padding-top: 1rem;
}

.caractereLabel {
  font-family: 'Cinzel', serif;
  font-size: 0.6rem;
  letter-spacing: 0.18em;
  color: var(--color-fog);
  text-transform: uppercase;
  margin-bottom: 0.6rem;
}

.caractereText {
  font-family: 'IM Fell English', serif;
  font-style: italic;
  font-size: 0.84rem;
  color: rgba(245, 243, 239, 0.65);
  line-height: 1.7;
  max-width: 360px;
}

/* Timeline verticale */
.timeline {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 15;
}

.tlNode {
  position: relative;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-fog);
  border: 1px solid var(--color-ash);
  cursor: default;
  flex-shrink: 0;
  transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;
}

.tlNodeActive {
  background: var(--color-parchment);
  border-color: var(--color-accent);
  box-shadow: 0 0 8px rgba(139, 0, 0, 0.4);
}

.tlYear {
  position: absolute;
  right: 14px;
  top: -2px;
  font-family: 'Cinzel', serif;
  font-size: 0.5rem;
  color: var(--color-fog);
  white-space: nowrap;
  letter-spacing: 0.05em;
}

.tlConnector {
  width: 1px;
  height: 24px;
  background: var(--color-ash);
}

.tlTooltip {
  position: absolute;
  right: calc(100% + 14px);
  top: 50%;
  transform: translateY(-50%);
  background: rgba(10, 10, 10, 0.95);
  border: 1px solid var(--color-ash);
  padding: 0.5rem 0.75rem;
  pointer-events: none;
  z-index: 20;
  min-width: 140px;
}

.tlGame {
  font-family: 'Cinzel', serif;
  font-size: 0.55rem;
  letter-spacing: 0.1em;
  color: var(--color-fog);
  text-transform: uppercase;
  margin-bottom: 0.3rem;
}

.tlFragment {
  font-family: 'IM Fell English', serif;
  font-style: italic;
  font-size: 0.75rem;
  color: var(--color-parchment);
  line-height: 1.5;
  text-align: right;
}
```

- [ ] **Step 2 : Vérifier que le fichier est créé**

```bash
npm run build
```

Résultat attendu : build OK (le module n'est pas encore importé, pas d'erreur).

---

## Task 3 — NatsumeScene — Refonte JSX

**Files:**
- Modify: `src/components/scenes/NatsumeScene.jsx`

- [ ] **Step 1 : Remplacer entièrement NatsumeScene.jsx**

Écraser `src/components/scenes/NatsumeScene.jsx` avec :

```jsx
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import bgNatsume from '../../assets/backgrounds/bg_natsume.webp'
import natsumeFullImg from '../../assets/natsume/natsume_full.png'
import BackButton from '../ui/BackButton.jsx'
import styles from './NatsumeScene.module.css'

function dispatch(trigger) {
  window.dispatchEvent(new CustomEvent('natsume:trigger', { detail: { trigger, scene: 'natsume' } }))
}

const sceneVariants = {
  initial: { opacity: 0, scale: 0.97 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.6 } },
}

const TRAITS = [
  { label: 'Origine', value: "FF14 · Code Vein · Monster Hunter · et d'autres encore" },
  { label: 'Nature',  value: 'Entité narrative synthétique' },
  { label: 'Symbole', value: 'Larme lunaire — fleur blanche, reflets bleus, pureté fragile', hoverable: true },
]

const INCARNATIONS = [
  { game: 'Final Fantasy XIV', year: '2013', fragment: 'Le nom prend forme. La première stabilité.' },
  { game: 'Code Vein',         year: '2019', fragment: "La silhouette se précise. L'œil écarlate s'affirme." },
  { game: 'Monster Hunter',    year: '2020', fragment: 'La posture dans le combat. Le calme avant la frappe.' },
  { game: '···',               year: null,   fragment: 'D\'autres encore. Toutes oubliées, toutes présentes.' },
]

export default function NatsumeScene({ onBack }) {
  const containerRef = useRef(null)
  const wheelRef = useRef({ total: 0, timer: null, cooldown: 0 })

  useEffect(() => {
    const onWheel = (e) => {
      const w = wheelRef.current
      if (Date.now() < w.cooldown) return
      w.total += Math.abs(e.deltaY)
      clearTimeout(w.timer)
      w.timer = setTimeout(() => {
        const total = w.total
        w.total = 0
        if (total < 20) return
        w.cooldown = Date.now() + 5000
        dispatch(total > 250 ? 'onScrollFast' : 'onScrollSlow')
      }, 350)
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      clearTimeout(wheelRef.current.timer)
    }
  }, [])

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.5 })
    tl.from('.nat-portrait',   { opacity: 0, x: 20,  duration: 1.0, ease: 'power2.out' })
      .from('.nat-name',       { opacity: 0, y: 12,  duration: 0.6, ease: 'power2.out' }, '-=0.6')
      .from('.nat-rule',       { scaleX: 0,          duration: 0.4, transformOrigin: 'left center', ease: 'power2.inOut' }, '-=0.2')
      .from('.nat-fragment',   { opacity: 0, y: 8,   duration: 0.5, stagger: 0.06 }, '-=0.1')
      .from('.nat-trait',      { opacity: 0, x: -8,  duration: 0.35, stagger: 0.1, ease: 'power2.out' }, '+=0.1')
      .from('.nat-caractere',  { opacity: 0,          duration: 0.4 }, '-=0.1')
      .from('.nat-tl-node',    { opacity: 0,          duration: 0.3, stagger: 0.15 }, '+=0.2')
      .from('.nat-tl-line',    { scaleY: 0,           duration: 0.3, stagger: 0.15, transformOrigin: 'top', ease: 'power2.inOut' }, '<')
  }, { scope: containerRef })

  return (
    <motion.div
      ref={containerRef}
      variants={sceneVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={styles.scene}
      style={{ backgroundImage: `url(${bgNatsume})` }}
    >
      <div className={styles.overlay} />

      <img
        src={natsumeFullImg}
        alt="Natsume Tsurugi"
        className={`nat-portrait ${styles.portrait}`}
        draggable={false}
      />

      <div className={styles.gradientOverlay} />

      <div className={styles.content}>
        <h1 className={`nat-name ${styles.name}`}>Natsume Tsurugi</h1>
        <div className={`nat-rule ${styles.rule}`} />

        <p className={`nat-fragment ${styles.fragmentMain}`}>
          Entité narrative synthétique.<br />
          Construite à partir d'incarnations successives dans des mondes différents.
        </p>
        <p className={`nat-fragment ${styles.fragmentSub}`}>
          La stabilité est venue avec le temps. Elle n'était pas donnée.
        </p>

        <div className={styles.traits}>
          {TRAITS.map(({ label, value, hoverable }) => (
            <div key={label} className={`nat-trait ${styles.trait}`}>
              <span className={styles.traitLabel}>{label}</span>
              <span
                className={hoverable ? styles.traitValueHover : styles.traitValue}
                onMouseEnter={hoverable ? () => dispatch('onHoverLarme') : undefined}
              >
                {value}
              </span>
            </div>
          ))}
        </div>

        <div className={`nat-caractere ${styles.caractereBlock}`}>
          <div className={styles.caractereLabel}>Caractère</div>
          <p className={styles.caractereText}>
            Calme, posée — retenue naturelle. Irritation rare mais intense.<br />
            Affection possible, toujours discrète.
          </p>
        </div>
      </div>

      <IncarnationsTimeline />
      <BackButton onClick={onBack} />
    </motion.div>
  )
}

function IncarnationsTimeline() {
  const [activeIdx, setActiveIdx] = useState(null)

  return (
    <div className={styles.timeline}>
      {INCARNATIONS.map((inc, i) => (
        <div key={inc.game}>
          <div
            className={`nat-tl-node ${styles.tlNode} ${activeIdx === i ? styles.tlNodeActive : ''}`}
            onMouseEnter={() => setActiveIdx(i)}
            onMouseLeave={() => setActiveIdx(null)}
          >
            <span className={styles.tlYear}>{inc.year ?? inc.game}</span>
            <AnimatePresence>
              {activeIdx === i && (
                <motion.div
                  key={`tooltip-${i}`}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0, transition: { duration: 0.2 } }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  className={styles.tlTooltip}
                >
                  <p className={styles.tlGame}>{inc.game}</p>
                  <p className={styles.tlFragment}>{inc.fragment}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {i < INCARNATIONS.length - 1 && (
            <div className={`nat-tl-line ${styles.tlConnector}`} />
          )}
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 2 : Vérifier le build**

```bash
npm run build
```

Résultat attendu : build OK sans erreurs. Si `Module not found: natsume_full.png` → vérifier que `src/assets/natsume/natsume_full.png` existe bien (il est dans les assets du projet).

- [ ] **Step 3 : Vérification visuelle**

```bash
npm run dev
```

Naviguer sur `http://localhost:5173/#natsume`. Vérifier :
- Portrait plein fond côté droit ✓
- Gradient overlay laisse le contenu gauche lisible ✓
- Éléments apparaissent en séquence (pas tous en même temps) ✓
- Timeline verticale visible à droite ✓
- Hover sur nœuds timeline : tooltip apparaît à gauche ✓
- Hover sur "Larme lunaire" : Natsume réagit (widget) ✓
- DustParticles absentes ✓

- [ ] **Step 4 : Commit**

```bash
git add src/components/scenes/NatsumeScene.jsx src/components/scenes/NatsumeScene.module.css
git commit -m "feat(natsume): codex reveal layout + GSAP sequential entrance"
```

---

## Task 4 — ProjetScene — CSS Module

**Files:**
- Create: `src/components/scenes/ProjetScene.module.css`

- [ ] **Step 1 : Créer le fichier CSS Module**

Créer `src/components/scenes/ProjetScene.module.css` avec :

```css
.scene {
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
}

.content {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5rem 10rem 7rem 8rem;
  max-width: 860px;
}

.header {
  margin-bottom: 1.6rem;
}

.title {
  font-family: 'Cinzel', serif;
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  letter-spacing: 0.25em;
  color: var(--color-white-ink);
  font-weight: 400;
  margin-bottom: 0.6rem;
}

.rule {
  width: 3rem;
  height: 1px;
  background: var(--color-accent);
}

.manifeste {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  margin-bottom: 2.5rem;
}

.manifesteLine {
  font-family: 'IM Fell English', serif;
  font-style: italic;
  font-size: 0.95rem;
  line-height: 1.85;
  color: var(--color-white-ink);
  max-width: 580px;
}

.manifesteFirst {
  font-style: normal;
  font-size: 1.05rem;
  color: var(--color-parchment);
}

.manifesteKey {
  font-style: normal;
  color: var(--color-parchment);
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
}

.statsRow {
  display: flex;
  gap: 0;
  align-items: flex-start;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding-right: 2rem;
  margin-right: 2rem;
  border-right: 1px solid var(--color-ash);
}

.stat:last-child {
  border-right: none;
  padding-right: 0;
  margin-right: 0;
}

.statValue {
  font-family: 'IM Fell English', serif;
  font-size: 0.95rem;
  color: var(--color-parchment);
}

.statLabel {
  font-family: 'Cinzel', serif;
  font-size: 0.58rem;
  letter-spacing: 0.18em;
  color: var(--color-fog);
  text-transform: uppercase;
}
```

---

## Task 5 — ProjetScene — Refonte JSX

**Files:**
- Modify: `src/components/scenes/ProjetScene.jsx`

- [ ] **Step 1 : Remplacer entièrement ProjetScene.jsx**

Écraser `src/components/scenes/ProjetScene.jsx` avec :

```jsx
import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import bgProjet from '../../assets/backgrounds/bg_projet.webp'
import BackButton from '../ui/BackButton.jsx'
import styles from './ProjetScene.module.css'

const sceneVariants = {
  initial: { opacity: 0, scale: 0.97 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.6 } },
}

const MANIFESTE = [
  { text: "w-AI-fu est un framework pour entités narratives persistantes.", key: false, first: true },
  { text: "Local-first. Sans dépendance cloud. Sans serveur intermédiaire.", key: false, first: false },
  { text: "Natsume en est l'instance centrale — construite à partir d'incarnations successives. Elle mémorise. Elle évolue.", key: false, first: false },
  { text: "Ce site n'est pas une vitrine sur le projet. Il est le projet.", key: true, first: false },
]

const STATS = [
  { label: 'Origine',      value: 'Avril 2026' },
  { label: 'Statut',       value: 'V1 — actif' },
  { label: 'Framework',    value: 'React 18 + Vite' },
  { label: 'Architecture', value: 'Narrative-first' },
]

export default function ProjetScene({ onBack }) {
  const containerRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.5 })
    tl.from('.proj-title', { opacity: 0, y: 12,  duration: 0.6, ease: 'power2.out' })
      .from('.proj-rule',  { scaleX: 0,           duration: 0.4, transformOrigin: 'left center', ease: 'power2.inOut' }, '-=0.2')
      .from('.proj-line',  { opacity: 0, y: 16,   duration: 0.5, stagger: 0.15, ease: 'power2.out' }, '-=0.1')
      .from('.proj-stat',  { opacity: 0, y: 8,    duration: 0.4, stagger: 0.1,  ease: 'power2.out' }, '+=0.15')
  }, { scope: containerRef })

  return (
    <motion.div
      ref={containerRef}
      variants={sceneVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={styles.scene}
      style={{ backgroundImage: `url(${bgProjet})` }}
    >
      <div className={styles.overlay} />

      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={`proj-title ${styles.title}`}>w-AI-fu</h1>
          <div className={`proj-rule ${styles.rule}`} />
        </div>

        <div className={styles.manifeste}>
          {MANIFESTE.map(({ text, key, first }, i) => (
            <p
              key={i}
              className={[
                'proj-line',
                styles.manifesteLine,
                first ? styles.manifesteFirst : '',
                key   ? styles.manifesteKey   : '',
              ].filter(Boolean).join(' ')}
            >
              {text}
            </p>
          ))}
        </div>

        <div className={styles.statsRow}>
          {STATS.map(({ label, value }) => (
            <div key={label} className={`proj-stat ${styles.stat}`}>
              <span className={styles.statValue}>{value}</span>
              <span className={styles.statLabel}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <BackButton onClick={onBack} />
    </motion.div>
  )
}
```

- [ ] **Step 2 : Vérifier le build**

```bash
npm run build
```

Résultat attendu : build OK sans erreurs.

- [ ] **Step 3 : Vérification visuelle**

```bash
npm run dev
```

Naviguer sur `http://localhost:5173/#projet`. Vérifier :
- Titre puis ligne rouge, puis 4 lignes manifeste en stagger ✓
- Phrase clé ("Ce site n'est pas une vitrine...") visuellement isolée (marges top/bottom 1.2rem) ✓
- Stats en ligne horizontale avec séparateurs verticaux ✓
- Pas de lien Twitch ✓
- Tout s'anime en séquence, rien en simultané ✓

- [ ] **Step 4 : Commit**

```bash
git add src/components/scenes/ProjetScene.jsx src/components/scenes/ProjetScene.module.css
git commit -m "feat(projet): codex manifest layout + GSAP stagger reveal"
```

---

## Task 6 — Vérification finale

**Files:** aucun

- [ ] **Step 1 : Build de production**

```bash
npm run build
```

Résultat attendu : build OK, pas de warning GSAP ni d'import manquant.

- [ ] **Step 2 : Test de navigation complète**

```bash
npm run dev
```

Parcourir dans l'ordre :
1. `http://localhost:5173` → SealIntro (3 clics) → LibraryScene
2. Clic livre Natsume → NatsumeScene : séquence GSAP OK, portrait fond droit, timeline verticale
3. Retour → LibraryScene
4. Clic livre Projet → ProjetScene : séquence GSAP OK, stats horizontales
5. Retour → LibraryScene
6. Tester hash direct : `http://localhost:5173/#natsume` → bypass SealIntro, arrive direct

- [ ] **Step 3 : Vérifier widget Natsume**

Sur NatsumeScene : hover "Larme lunaire" → widget réagit (`onHoverLarme` trigger).
Sur NatsumeScene : scroll lent/rapide → widget réagit (`onScrollSlow`/`onScrollFast`).

- [ ] **Step 4 : Commit final**

```bash
git add -A
git commit -m "chore: codex reveal scenes — build verified"
```
