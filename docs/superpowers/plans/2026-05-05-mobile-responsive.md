# Mobile Responsive Fix — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rendre Lunarca utilisable sur mobile (375–767px) sans toucher à l'expérience desktop.

**Architecture:** Breakpoint unique `@media (max-width: 767px)` ajouté à la fin de chaque CSS Module concerné. Pas de restructuration des composants — uniquement surcharge des propriétés défaillantes. Les triggers hover Natsume ne sont pas critiques sur mobile (dialogues cosmétiques) : seuls les slots d'incarnation reçoivent un support touch explicite. DevlogBook 2-colonnes est hors scope.

**Tech Stack:** React 18 · Vite · CSS Modules · Framer Motion · GSAP · JS uniquement

**Breakpoint mobile :** `max-width: 767px` — couvre téléphones portrait (375–430px) et petits formats.

---

## Fichiers modifiés

| Fichier | Type | Raison |
|---------|------|--------|
| `src/components/ui/FrameOverlay.module.css` | Modify | Coins 200px se chevauchent sur mobile |
| `src/components/ui/DustParticles.jsx` | Modify | 35 animations CPU-lourdes sur mobile |
| `src/components/scenes/NatsumeScene.module.css` | Modify | Portrait 88vh + content 60% + grid 158px fixe |
| `src/components/scenes/NatsumeScene.jsx` | Modify | IncarnationSlots hover-only → click/touch |
| `src/components/scenes/ProjetScene.module.css` | Modify | 2 colonnes flex non responsive |
| `src/components/widget/NatsumeWidget.jsx` | Modify | Widget 220px = 58% écran sur 375px |
| `src/components/books/BookItem.jsx` | Modify | Book img 120px, 4e livre clip hors écran |
| `src/components/scenes/DevlogScene.module.css` | Modify | Livre sur bureau : centrage mobile |

---

## Task 1: FrameOverlay masqué + DustParticles désactivées sur mobile

**Problème :** FrameOverlay a des coins images de 200px : sur 375px ils se chevauchent. DustParticles génère 35 divs animés : inutile et lourd sur mobile.

**Files:**
- Modify: `src/components/ui/FrameOverlay.module.css`
- Modify: `src/components/ui/DustParticles.jsx`

- [ ] **Step 1 : Lire FrameOverlay.module.css**

```
C:\code\Lunarca\src\components\ui\FrameOverlay.module.css
```

- [ ] **Step 2 : Ajouter media query à la fin de FrameOverlay.module.css**

Ajouter ces lignes à la fin du fichier (après toutes les règles existantes) :

```css
@media (max-width: 767px) {
  .cornerTL,
  .cornerTR,
  .cornerBL,
  .cornerBR,
  .sideLeft,
  .sideRight {
    display: none;
  }
}
```

- [ ] **Step 3 : Lire DustParticles.jsx**

```
C:\code\Lunarca\src\components\ui\DustParticles.jsx
```

- [ ] **Step 4 : Ajouter early return sur touch device dans DustParticles.jsx**

Ajouter `useMemo` depuis React (déjà importé dans le fichier). Juste après la ligne `import { useMemo } from 'react'`, ajouter l'early return au début du composant :

```jsx
export default function DustParticles({ count = 35 }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isTouchDevice = useMemo(() => window.matchMedia('(hover: none)').matches, [])
  if (isTouchDevice) return null

  // ... reste du composant inchangé
```

Note : `useMemo` est déjà importé. Le commentaire eslint-disable est nécessaire car le hook précède la condition de retour. Alternativement, restructurer sans early return :

```jsx
export default function DustParticles({ count = 35 }) {
  const isTouchDevice = useMemo(() => window.matchMedia('(hover: none)').matches, [])

  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({ ... }))
  , [count])

  if (isTouchDevice) return null

  return (
    ...
  )
}
```

Cette structure respecte les règles des hooks (tous appelés avant tout return conditionnel).

- [ ] **Step 5 : Build**

```bash
npm run build
```

Résultat attendu : `✓ built in ~Xs` — 0 erreurs.

---

## Task 2: NatsumeScene — layout portrait + contenu + grid (CSS)

**Problème :** Portrait `height: 88vh` couvre tout l'écran. Content `width: 60%` = 225px sur 375px. Grid `158px 1fr 90px` trop large pour écran étroit.

**File:** Modify `src/components/scenes/NatsumeScene.module.css`

- [ ] **Step 1 : Lire NatsumeScene.module.css**

```
C:\code\Lunarca\src\components\scenes\NatsumeScene.module.css
```

- [ ] **Step 2 : Ajouter media query à la fin du fichier**

```css
/* ── Mobile (≤ 767px) ─────────────────────────────────── */

@media (max-width: 767px) {
  /* Portrait : fond atmosphérique atténué */
  .portrait {
    height: 50vh;
    opacity: 0.15;
    filter: none;
  }

  /* Overlay gradient : renforcé pour lisibilité */
  .gradientOverlay {
    background: rgba(0, 0, 0, 0.9);
  }

  /* Contenu : pleine largeur + scroll interne */
  .content {
    width: 100%;
    padding: 8% 5% 80px;
    justify-content: flex-start;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  /* Attributs : colonnes réduites */
  .attrRow {
    grid-template-columns: 120px 1fr 70px;
    gap: 0.5rem;
  }

  /* Slots : scroll horizontal */
  .slotsRow {
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 0.5rem;
    gap: 0.35rem;
  }

  .slot {
    min-width: 70px;
    flex-shrink: 0;
    padding: 0.6rem 0.4rem;
  }

  /* Tooltip slot : au-dessus sur mobile */
  .slotTooltip {
    bottom: auto;
    top: calc(100% + 6px);
    right: auto;
    left: 0;
    width: 200px;
    max-width: 80vw;
  }
}
```

- [ ] **Step 3 : Build**

```bash
npm run build
```

Résultat attendu : `✓ built` — 0 erreurs.

---

## Task 3: NatsumeScene — IncarnationSlots touch support (JS)

**Problème :** Les slots utilisent uniquement `onMouseEnter`/`onMouseLeave` — ils ne répondent pas au touch. Sur mobile, aucun tooltip n'est visible.

**File:** Modify `src/components/scenes/NatsumeScene.jsx` — fonction `IncarnationSlots` uniquement.

- [ ] **Step 1 : Lire NatsumeScene.jsx**

```
C:\code\Lunarca\src\components\scenes\NatsumeScene.jsx
```

- [ ] **Step 2 : Modifier la fonction IncarnationSlots**

Remplacer la fonction `IncarnationSlots` (lignes ~134-170) entièrement par :

```jsx
function IncarnationSlots() {
  const [activeIdx, setActiveIdx] = useState(null)

  return (
    <div className={styles.slotsSection}>
      <span className={styles.sectionLabel}>Incarnations</span>
      <div className={styles.slotsRow}>
        {INCARNATIONS.map((inc, i) => (
          <div
            key={inc.game}
            className={`nat-slot ${styles.slot} ${activeIdx === i ? styles.slotActive : ''}`}
            onMouseEnter={() => {
              setActiveIdx(i)
              if (inc.trigger) dispatch(inc.trigger, 'natsume')
            }}
            onMouseLeave={() => setActiveIdx(null)}
            onClick={() => setActiveIdx(activeIdx === i ? null : i)}
            onFocus={() => setActiveIdx(i)}
            onBlur={() => setActiveIdx(null)}
            tabIndex={0}
            role="button"
            aria-expanded={activeIdx === i}
            aria-label={inc.game}
          >
            <span className={styles.slotName}>{inc.game}</span>
            <span className={styles.slotYear}>{inc.year ?? '···'}</span>
            <AnimatePresence>
              {activeIdx === i && (
                <motion.div
                  key={`tip-${i}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  className={styles.slotTooltip}
                >
                  {inc.fragment}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}
```

Changements apportés vs l'original :
- `onClick` : toggle le slot actif (même comportement hover mais via tap)
- `onFocus/onBlur` : accessibilité clavier
- `tabIndex={0}`, `role="button"`, `aria-expanded` : sémantique ARIA correcte
- `aria-label={inc.game}` : label accessible
- Le dispatch `inc.trigger` reste dans `onMouseEnter` uniquement (trigger cosmétique, pas critique sur touch)

- [ ] **Step 3 : Build**

```bash
npm run build
```

Résultat attendu : `✓ built` — 0 erreurs.

---

## Task 4: ProjetScene — layout 2 colonnes → 1 colonne sur mobile

**Problème :** `.layout { display: flex }` avec `.colLeft { flex: 0 0 54% }` et `.colRight { flex: 1 }`. Sur mobile (375px), les deux colonnes côte-à-côte donnent ~200px + ~175px avec padding — illisible.

**File:** Modify `src/components/scenes/ProjetScene.module.css`

- [ ] **Step 1 : Lire ProjetScene.module.css**

```
C:\code\Lunarca\src\components\scenes\ProjetScene.module.css
```

- [ ] **Step 2 : Ajouter media query à la fin du fichier**

```css
/* ── Mobile (≤ 767px) ─────────────────────────────────── */

@media (max-width: 767px) {
  .layout {
    flex-direction: column;
    padding: 6% 5% 80px;
    align-items: stretch;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    justify-content: flex-start;
    gap: 2rem;
  }

  .colLeft {
    flex: none;
    width: 100%;
    padding-right: 0;
  }

  .manifeste {
    max-width: 100%;
  }

  .separator {
    width: 100%;
    height: 1px;
    align-self: stretch;
  }

  .colRight {
    width: 100%;
    padding-left: 0;
  }

  .sysEntry {
    grid-template-columns: 80px 1fr;
  }
}
```

- [ ] **Step 3 : Build**

```bash
npm run build
```

Résultat attendu : `✓ built` — 0 erreurs.

---

## Task 5: NatsumeWidget — portrait réduit sur mobile

**Problème :** Widget fixé en bas-droite avec `width: '220px'` (inline style). Sur 375px, il couvre 58% de la largeur et peut masquer du contenu.

**File:** Modify `src/components/widget/NatsumeWidget.jsx`

- [ ] **Step 1 : Lire NatsumeWidget.jsx**

```
C:\code\Lunarca\src\components\widget\NatsumeWidget.jsx
```

- [ ] **Step 2 : Ajouter détection mobile et style conditionnel**

Ajouter l'import `useMemo` (à côté de `useRef` déjà importé) puis détecter le device dans le composant :

```jsx
import { useRef, useMemo } from 'react'
```

Dans le composant `NatsumeWidget`, avant le `return`, ajouter :

```jsx
const isMobile = useMemo(() => window.matchMedia('(max-width: 767px)').matches, [])
const portraitWidth = isMobile ? '140px' : '220px'
```

Puis remplacer dans le JSX :
```jsx
style={{ width: '220px', height: 'auto', display: 'block', pointerEvents: 'auto' }}
```
Par :
```jsx
style={{ width: portraitWidth, height: 'auto', display: 'block', pointerEvents: 'auto' }}
```

- [ ] **Step 3 : Build**

```bash
npm run build
```

Résultat attendu : `✓ built` — 0 erreurs.

---

## Task 6: BookItem — image réduite sur mobile (anti-clip)

**Problème :** `BookItem` affiche les images à `width: '120px'`. Le 4e livre positionné à `left: 71%` déborde de 11px sur un écran de 375px. Réduire à 90px sur mobile.

**File:** Modify `src/components/books/BookItem.jsx`

- [ ] **Step 1 : Lire BookItem.jsx**

```
C:\code\Lunarca\src\components\books\BookItem.jsx
```

- [ ] **Step 2 : Ajouter détection mobile et largeur conditionnelle**

Ajouter `useMemo` à l'import React existant :

```jsx
import { useRef, useState, useMemo } from 'react'
```

Dans le composant `BookItem`, avant le `return`, ajouter :

```jsx
const isMobile = useMemo(() => window.matchMedia('(max-width: 767px)').matches, [])
const imgWidth = isMobile ? '90px' : '120px'
```

Puis remplacer dans le JSX :
```jsx
style={{ width: '120px', height: 'auto', display: 'block' }}
```
Par :
```jsx
style={{ width: imgWidth, height: 'auto', display: 'block' }}
```

- [ ] **Step 3 : Build**

```bash
npm run build
```

Résultat attendu : `✓ built` — 0 erreurs.

---

## Task 7: DevlogScene — centrage du livre sur mobile

**Problème :** `.bookOnDesk` est positionné de façon absolue par rapport au fond. Sur mobile portrait, le livre peut être hors-cadre ou mal centré.

**File:** Modify `src/components/scenes/DevlogScene.module.css`

- [ ] **Step 1 : Lire DevlogScene.module.css**

```
C:\code\Lunarca\src\components\scenes\DevlogScene.module.css
```

- [ ] **Step 2 : Identifier les classes `.bookOnDesk` et `.bookOnDeskImg`**

Lire le fichier pour comprendre les positions actuelles (left/top/transform utilisés).

- [ ] **Step 3 : Ajouter media query pour centrage**

Si `.bookOnDesk` utilise des positions absolues non-centrées, ajouter à la fin du fichier :

```css
@media (max-width: 767px) {
  .bookOnDesk {
    left: 50%;
    transform: translateX(-50%);
    top: auto;
    bottom: 15%;
  }

  .bookOnDeskImg {
    max-width: 75vw;
    width: auto;
    height: auto;
  }
}
```

Si `.bookOnDesk` est déjà centré (via margin auto ou transform existant), ne rien ajouter et noter que ce fichier ne nécessite pas de modification mobile.

- [ ] **Step 4 : Build**

```bash
npm run build
```

Résultat attendu : `✓ built` — 0 erreurs.

---

## Task 8: Build final + vérification cross-composant

- [ ] **Step 1 : Build production complet**

```bash
npm run build
```

Résultat attendu : `✓ built` en < 2s, 0 erreurs, 0 warnings CSS.

- [ ] **Step 2 : Vérifier en dev server (optionnel — si l'utilisateur peut tester)**

```bash
npm run dev
```

Ouvrir DevTools → Device Toolbar → iPhone SE (375×667). Vérifier :
- LibraryScene : 4 livres visibles sans clip horizontal
- NatsumeScene : contenu lisible pleine largeur, portrait en fond atténué, slots scrollables horizontalement et cliquables
- ProjetScene : 1 colonne, texte manifeste lisible
- ContactScene : runes et ItemPanel centré
- DevlogScene : livre visible et cliquable
- Widget Natsume : 140px, ne masque pas les éléments critiques
- Aucun élément FrameOverlay visible
- Grain DustParticles absent

---

## Hors scope — Session dédiée suivante

**DevlogBook mobile** : La vue lecture utilise `columns: 2` avec position absolue calée sur le fond `bg_book.webp`. Sur mobile, les 2 colonnes CSS ne sont pas viables. Nécessite :
- Détection mobile dans DevlogBook.jsx
- Mode single-column pour la lecture
- Repositionnement des zones de navigation bas-de-page
Estimé à 1h30 de session dédiée.
