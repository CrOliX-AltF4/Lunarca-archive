# Lunarca — Scènes Codex Reveal · Design Spec
> Date : 2026-05-04  
> Scope : NatsumeScene + ProjetScene  
> Stack : React 18 + Vite (JS), GSAP + useGSAP, Framer Motion (transitions), CSS Modules

---

## Contexte & Diagnostic

L'audit visuel global (mai 2026) a identifié que les scènes secondaires NatsumeScene et ProjetScene traitent l'information comme des pages web, pas comme des moments narratifs. Tous les éléments arrivent simultanément, sans tempo, sans révélation progressive. La direction artistique "point-and-click / visual novel" n'est pas exprimée dans la mise en scène.

**Décisions structurantes :**
- Framer Motion : conservé exclusivement pour les transitions inter-scènes (fade+scale 600ms)
- GSAP : ajouté pour la mise en scène intra-scène (timeline orchestrée, stagger, reveal)
- Toutes les animations : opacity + transform uniquement (contrainte non négociable)
- Chaque nouveau CSS : CSS Modules colocalisé dans le dossier du composant

---

## 1. NatsumeScene — Codex Reveal

### Layout

- **Portrait** : `natsume_full.png` (remplace `natsume_hero.png`) — position absolue, ancré bas-droite, hauteur ~85vh, width auto. Gradient overlay depuis la gauche (dark → transparent) pour lisibilité du contenu.
- **Contenu** : zone gauche, overlay sur portrait, padding 5-6%, centré verticalement. flex column.
- **DustParticles** : supprimées — le portrait occupe l'espace, les particules créent du bruit inutile.
- **CSS Module** : `NatsumeScene.module.css` — nouveau fichier colocalisé.

### Contenu gauche (ordre de révélation)

1. Nom `Natsume Tsurugi` — Cinzel, ~2.2rem, letterSpacing 0.12em
2. Ligne rouge `--color-accent` — width 3rem, height 1px
3. Fragment narratif principal — IM Fell English italic, ~0.9rem, parchment
4. Fragment secondaire — IM Fell English normal, ~0.78rem, fog
5. TRAITS (3 lignes) — label Cinzel fog uppercase + value IM Fell white-ink. Symbole conserve le hover `onHoverLarme`.
6. Section CARACTÈRE — redessinée : 4 bullets → 2 phrases narratives condensées. Séparée par un `border-top` ash.

### Timeline incarnations — redessinée verticale

- Position : `absolute`, `right: 18px`, `top: 50%`, `transform: translateY(-50%)` — intégrée sur le portrait
- Nœuds : 6px, border-radius 50%, hover → parchment + border accent
- Connecteurs : 1px vertical, `--color-ash`
- Tooltip au hover : apparaît à gauche du nœud (pas au-dessus), fragment narratif italic

### GSAP Timeline (useGSAP)

```
delay: 0.4s  // après Framer Motion scene entry

t = gsap.timeline()
  .from(portrait,    { opacity:0, x:20,    duration:1.0, ease:'power2.out' })
  .from(name,        { opacity:0, y:12,    duration:0.6, ease:'power2.out' }, '-=0.6')
  .from(rule,        { scaleX:0,           duration:0.4, transformOrigin:'left center' }, '-=0.2')
  .from(fragment,    { opacity:0, y:8,     duration:0.5, stagger:0.06 }, '-=0.1')
  .from(traits,      { opacity:0, x:-8,    duration:0.35, stagger:0.1 }, '+=0.1')
  .from(caractere,   { opacity:0,          duration:0.4 }, '-=0.1')
  .from(tlNodes,     { opacity:0,          duration:0.3, stagger:0.15 }, '+=0.2')
  .from(tlLines,     { scaleY:0,           duration:0.3, stagger:0.15, transformOrigin:'top' }, '<')
```

---

## 2. ProjetScene — Codex Manifest

### Layout

- Structure : plus de deux colonnes. Contenu centré, pleine largeur, padding généreux.
- **CSS Module** : `ProjetScene.module.css` — nouveau fichier colocalisé.

### Contenu (ordre de révélation)

**Titre**
- `w-AI-fu` — Cinzel, ~2rem, letterSpacing 0.25em
- Ligne rouge dessous

**Manifeste — révélation ligne par ligne**
- 4 lignes, chacune révélée en séquence GSAP avec stagger 0.15s
- La phrase clé *"Ce site n'est pas une vitrine sur le projet. Il est le projet."* isolée visuellement — `marginTop: '1.2rem'` avant elle, `marginBottom: '1.2rem'` après, même taille que les autres lignes (pas d'exception de font-size).
- La première ligne ("w-AI-fu est un framework...") en parchment plus grand, les suivantes en white-ink italic.

**Stats — 4 blocs "données d'archive" horizontaux**
- Disposition : `display: flex`, `gap` généreux, séparateur vertical `var(--color-ash)` entre chaque
- Chaque bloc : valeur en haut (IM Fell English, parchment), label en dessous (Cinzel fog uppercase, 0.6rem)
- Style : interface codex de jeu, pas tableau corporate
- Révélés après le manifeste, stagger 0.1s

**Lien Twitch** : retiré. Décision : le lien Twitch est dans ContactScene (RuneStele). À reconsidérer pour le footer quand la chaîne est active.

### GSAP Timeline (useGSAP)

```
delay: 0.4s

t = gsap.timeline()
  .from(title,        { opacity:0, y:12,  duration:0.6 })
  .from(rule,         { scaleX:0,         duration:0.4, transformOrigin:'left center' }, '-=0.2')
  .from(manifestLines,{ opacity:0, y:16,  duration:0.5, stagger:0.15, ease:'power2.out' }, '-=0.1')
  .from(statsBlocs,   { opacity:0, y:8,   duration:0.4, stagger:0.1 }, '+=0.15')
```

---

## 3. Règles transversales (non négociables)

- `useGSAP` de `@gsap/react` — cleanup automatique au unmount (pas de `useEffect` manuel pour GSAP)
- `gsap` importé depuis `gsap`, plugins enregistrés si nécessaire
- Framer Motion `motion.div` + `variants` conservés pour l'enveloppe de chaque scène
- Aucune animation CSS keyframe ajoutée — tout passe par GSAP ou Framer Motion
- Pas de `filter` animé, pas de `boxShadow` animé — opacity + transform uniquement

---

## 4. Hors scope

- DevlogScene : audit séparé
- ContactScene : audit séparé
- LibraryScene : enrichissement GSAP particles optionnel, pas dans ce sprint
- Footer Twitch : à traiter dans un sprint dédié polish/footer

---

## 5. Dépendances à installer

```bash
npm install gsap @gsap/react
```

GSAP free tier suffit pour ce scope (pas de ScrollTrigger, pas de plugins premium).

---

## 6. Fichiers impactés

| Fichier | Action |
|---|---|
| `src/components/scenes/NatsumeScene.jsx` | Refonte complète |
| `src/components/scenes/NatsumeScene.module.css` | Nouveau |
| `src/components/scenes/ProjetScene.jsx` | Refonte complète |
| `src/components/scenes/ProjetScene.module.css` | Nouveau |
| `package.json` | Ajout `gsap` + `@gsap/react` |
