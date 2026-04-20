# LUNARCA — SPEC ASSETS ORNEMENTS & CADRE UI
> Référence d'intégration pour le développement
> Tous les assets sont en PNG fond transparent, couleur #f5f3ef

---

## 1. INVENTAIRE ASSETS VALIDÉS

### Cadre ornemental (nouveaux assets)

| Fichier | Description | Dimensions suggérées |
|---------|-------------|---------------------|
| `frame_corner.png` | Coin haut gauche — branche + lys | 200x200px |
| `frame_side.png` | Bordure latérale gauche — vine vertical | 80x400px |
| `frame_bottom.png` | Bordure basse + filet footer | 1920x120px |

### Ornements DevlogBook (assets existants — à régénérer en blanc cassé)

| Fichier | Description | Dimensions suggérées |
|---------|-------------|---------------------|
| `ornement_coin.png` | Coin ornemental gothique | 120x120px |
| `ornement_bordure.png` | Bordure latérale répétable | 60x300px |
| `ornement_vignette.png` | Séparateur central reliure | 200x60px |

---

## 2. CADRE ORNEMENTAL — INTÉGRATION CSS

### Structure HTML

```jsx
// FrameOverlay.jsx — wrapper fixe sur toutes les scènes sauf SealIntro
<div className={styles.frameOverlay} aria-hidden="true">
  <img className={styles.cornerTL} src={frameCorner} alt="" />
  <img className={styles.cornerTR} src={frameCorner} alt="" />
  <img className={styles.cornerBL} src={frameCorner} alt="" />
  <img className={styles.cornerBR} src={frameCorner} alt="" />
  <img className={styles.sideLeft} src={frameSide} alt="" />
  <img className={styles.sideRight} src={frameSide} alt="" />
  <img className={styles.bottom} src={frameBottom} alt="" />
</div>
```

### CSS Modules

```css
/* FrameOverlay.module.css */

.frameOverlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  pointer-events: none;
  user-select: none;
}

/* COINS — un seul asset, 4 positions via transform */

.cornerTL {
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 200px;
  object-fit: contain;
  /* aucun transform — position naturelle */
}

.cornerTR {
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 200px;
  object-fit: contain;
  transform: scaleX(-1);
}

.cornerBL {
  position: absolute;
  bottom: 80px; /* au-dessus du footer */
  left: 0;
  width: 200px;
  height: 200px;
  object-fit: contain;
  transform: scaleY(-1);
}

.cornerBR {
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 200px;
  height: 200px;
  object-fit: contain;
  transform: scale(-1, -1);
}

/* BORDURES LATÉRALES — répétition verticale */

.sideLeft {
  position: absolute;
  top: 180px; /* commence après le coin haut */
  bottom: 260px; /* s'arrête avant le coin bas */
  left: 0;
  width: 80px;
  object-fit: cover; /* répète le motif verticalement */
  object-position: left center;
}

.sideRight {
  position: absolute;
  top: 180px;
  bottom: 260px;
  right: 0;
  width: 80px;
  object-fit: cover;
  object-position: right center;
  transform: scaleX(-1);
}

/* BORDURE BASSE + FOOTER */

.bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 120px;
  object-fit: fill;
}
```

### Zone footer UI

```css
/* Footer.module.css */

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 44px; /* zone sous le filet de l'asset */
  z-index: 101; /* au-dessus du cadre */
  pointer-events: all;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  background: var(--color-void); /* #000000 — zone noire pure */
}

.logo {
  font-family: var(--font-cinzel);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  color: var(--color-fog);
  text-transform: uppercase;
}

.sceneLabel {
  font-family: var(--font-cinzel);
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  color: var(--color-fog);
  text-transform: uppercase;
  opacity: 0.6;
}

.systemButton {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  pointer-events: all;
  opacity: 0.5;
  transition: opacity 200ms ease;
}

.systemButton:hover {
  opacity: 1;
}
```

```jsx
// Footer.jsx
const Footer = ({ currentScene }) => (
  <footer className={styles.footer}>
    <span className={styles.logo}>Lunarca</span>
    <span className={styles.sceneLabel}>{currentScene}</span>
    <button className={styles.systemButton} onClick={onSystemMenuOpen}>
      {/* icône glyphe SystemMenu */}
    </button>
  </footer>
)
```

---

## 3. DEVLOGBOOK — INTÉGRATION ORNEMENTS

### Principe

Les ornements PNG s'appliquent avec `mix-blend-mode: multiply` — le blanc de l'asset disparaît sur fond sombre, seul le trait reste visible.

⚠️ Les ornements actuels sont en noir sur blanc. Ils doivent être régénérés en **blanc cassé #f5f3ef sur fond transparent** pour fonctionner sur fond sombre sans mix-blend-mode.

### Structure DevlogBook avec ornements

```jsx
// DevlogBook.jsx
<div className={styles.book}>

  {/* Coins ornementaux — 4 positions */}
  <img className={styles.ornCoinTL} src={ornementCoin} alt="" aria-hidden="true" />
  <img className={styles.ornCoinTR} src={ornementCoin} alt="" aria-hidden="true" />
  <img className={styles.ornCoinBL} src={ornementCoin} alt="" aria-hidden="true" />
  <img className={styles.ornCoinBR} src={ornementCoin} alt="" aria-hidden="true" />

  {/* Pages */}
  <div className={styles.pageLeft}>
    {/* liste entrées */}
  </div>

  {/* Reliure centrale */}
  <div className={styles.spine}>
    <img className={styles.ornVignette} src={ornementVignette} alt="" aria-hidden="true" />
    <img className={styles.ornBordure} src={ornementBordure} alt="" aria-hidden="true" />
  </div>

  <div className={styles.pageRight}>
    {/* contenu entrée active */}
  </div>

</div>
```

### CSS ornements DevlogBook

```css
/* DevlogBook.module.css — section ornements */

.book {
  position: relative;
  /* ... autres styles ... */
}

/* COINS — même logique que le cadre global */

.ornCoinTL,
.ornCoinTR,
.ornCoinBL,
.ornCoinBR {
  position: absolute;
  width: 80px;
  height: 80px;
  object-fit: contain;
  pointer-events: none;
  z-index: 10;
}

.ornCoinTL { top: -10px; left: -10px; }
.ornCoinTR { top: -10px; right: -10px; transform: scaleX(-1); }
.ornCoinBL { bottom: -10px; left: -10px; transform: scaleY(-1); }
.ornCoinBR { bottom: -10px; right: -10px; transform: scale(-1, -1); }

/* RELIURE */

.spine {
  position: relative;
  width: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.ornVignette {
  width: 60px;
  height: auto;
  object-fit: contain;
  pointer-events: none;
}

.ornBordure {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 20px;
  object-fit: cover;
  pointer-events: none;
  opacity: 0.4;
}
```

---

## 4. RÈGLES D'APPLICATION GLOBALES

### Couleur des assets

Tous les assets ornements doivent être en **blanc cassé `#f5f3ef`** sur fond transparent.
- Assets cadre → déjà corrects
- Assets DevlogBook existants (coin, bordure, vignette) → à régénérer

### Opacité recommandée par contexte

| Contexte | Opacité |
|---------|---------|
| Cadre global sur scènes chargées (bibliothèque) | `0.6` |
| Cadre global sur scènes sobres (Natsume, Contact) | `0.8` |
| Ornements DevlogBook | `0.7` |
| Coins bas cadre (zone Natsume widget) | `0.4` — pour ne pas concurrencer Natsume |

### z-index stack

```
z-index: 50   → contenu scènes
z-index: 80   → widget Natsume
z-index: 100  → cadre ornemental (pointer-events: none)
z-index: 101  → footer UI (pointer-events: all)
z-index: 200  → SystemMenu overlay
z-index: 300  → TrophyNotification
```

### pointer-events

Le cadre ornemental doit absolument avoir `pointer-events: none` sur le wrapper ET sur chaque img. Sinon les livres de la bibliothèque deviennent inaccessibles aux bords.

### Responsive

Sur mobile (`max-width: 768px`) :
- Coins : réduire à 120px
- Bordures latérales : masquer (`display: none`) si moins de 768px
- Footer : garder mais réduire padding

---

## 5. CHECKLIST INTÉGRATION

- [ ] Régénérer ornements DevlogBook en blanc cassé fond transparent
- [ ] Créer `FrameOverlay.jsx` + `FrameOverlay.module.css`
- [ ] Créer `Footer.jsx` + `Footer.module.css`
- [ ] Intégrer `FrameOverlay` + `Footer` dans `App.jsx` hors SealIntro
- [ ] Tester superposition avec widget Natsume bas droit
- [ ] Tester sur toutes les scènes — vérifier pas de conflit visuel
- [ ] Vérifier `pointer-events: none` sur tous les éléments cadre
- [ ] Tester responsive mobile

---

*Document de référence intégration ornements — avril 2026*
