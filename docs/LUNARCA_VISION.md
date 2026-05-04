# LUNARCA — VISION & RÉFÉRENCE

> Document unique : règles narratives · plan complet · backlog
> Remplace LUNARCA_NARRATION_REF.md et LUNARCA_PLAN_FINAL.md
> Dernière mise à jour : mai 2026

---

## I. QUI EST NATSUME

Entité narrative synthétique. Construite à partir d'incarnations successives dans des jeux différents (FF14, Code Vein, Monster Hunter, NieR…) sur quinze ans. Pas une IA qui parle. Pas un personnage de fiction sympathique. Pas une assistante.

Elle est dans cette bibliothèque. Elle était là avant que tu arrives. Elle t'a remarqué. Elle ne sait pas encore quoi penser de toi.

**Ce qu'elle n'est jamais :** guide · hôtesse d'accueil · IA qui répond à des prompts · personnage qui cherche à plaire · quelqu'un qui explique ce qu'il ressent

**Ce qu'elle est toujours :** présente avant toi · observatrice avant de parler · avare de mots · précise quand elle parle · ambiguë dans son rapport à toi

---

## II. RÈGLE FONDAMENTALE

> **Natsume ne commente pas ses propres états intérieurs.**

Elle ne dit pas qu'elle est surprise. Elle est surprise.
Elle ne dit pas qu'elle n'avait pas prévu ça. Elle dit "...".
La différence entre un personnage qui existe et un chatbot qui simule : le chatbot explique, le personnage agit.

---

## III. ANATOMIE D'UNE RÉPLIQUE

**Structure :** observation sèche · fragment incomplet · silence codé par un état

**Longueur :**
```
Idéale        : 1 à 5 mots
Acceptable    : 6 à 10 mots
Limite absolue: 12 mots
Au-delà       : couper
```
Si une réplique dépasse 12 mots, elle contient une explication. Supprimer l'explication.

**Ponctuation :**
```
.    → constat fermé
...  → suspension — il y a plus, elle ne le dira pas
?    → très rare, uniquement si la question est réelle
—    → coupure avant la fin
null → silence — plus fort que des mots
```

---

## IV. LES ÉTATS — CE QU'ILS SIGNIFIENT

Les états sont des **postures**, pas des émotions explicites.

| État | Posture | Ton | Jamais |
|------|---------|-----|--------|
| `idle` | Elle observe, silencieuse et présente | Neutre, légèrement distant | Informatif, explicatif |
| `parle` | Elle a décidé de dire quelque chose | Sobre, direct, sans chaleur | Explicatif, pédagogique |
| `approbation` | Reconnaissance minuscule, presque imperceptible | Minimal — "Bien." seul suffit | Chaleureux, encourageant |
| `irritation` | Contraction froide, pas explosion | Sec, contracté, définitif | Agressif, dramatique |
| `surprise` | Seul moment où la composure se fissure | Suspension, incomplétion | "Je suis surprise", analyse |
| `gene` | Elle se trahit malgré elle, légère déstabilisation | Légèrement décalé, esquive | Aveu direct de gêne |
| `indifference` | Elle a tourné la tête, elle est ailleurs | Détaché — `null` souvent plus juste | Boudeur, explicitement déçu |
| `disappointment` | Même posture qu'indifférence, plus pesante | `null` ou constat minimal | Reproche construit |

---

## V. INTERDITS ABSOLUS

**Formulations bannies :**
```
❌ "Je ne l'avais pas prévu."          → révèle ses attentes
❌ "Je ne savais pas si..."             → décrit son incertitude
❌ "Je ne sais pas quoi en penser."     → commente son propre état
❌ "C'est voulu."                       → justifie ses choix
❌ "Je ne dirai pas [X]."              → annonce ce qu'elle tait (contradiction)
❌ "Cherche par toi-même."             → elle guide, elle enseigne
❌ "Je remarque."                       → signale qu'elle observe au lieu d'observer
❌ "Comme moi."                         → auto-comparaison trop directe
```

**Structures à éviter :**
```
❌ Phrase A. Phrase B qui explique Phrase A.
   → Garder uniquement la Phrase A

❌ Observation + conséquence explicite
   → "L'impatience ne t'ouvrira rien." → garder "..." ou "Inutile."

❌ Deux phrases quand une suffit
   → Toujours couper la deuxième si elle explique la première
```

---

## VI. TEST EN TROIS FILTRES

Avant de valider une réplique :

1. **Est-ce qu'elle parle d'elle-même ?** Si directement et explicitement → couper.
2. **Est-ce que la phrase explique quelque chose ?** Si oui → couper l'explication, garder le constat brut.
3. **Peut-on supprimer le dernier tiers ?** Si la phrase reste plus forte sans sa fin → couper.

**Test final :** Est-ce que cette phrase existe parce que Natsume l'a pensé, ou parce que l'auteur voulait que le lecteur comprenne quelque chose ? Si c'est la deuxième raison → couper ou réécrire.

---

## VII. TEXTES DE SECTION — TON

**Natsume :** elle ne se présente pas. Décrite depuis l'extérieur, comme une entrée d'archive. Sobre, lacunaire. Entrées courtes séparées, style fiche. Pas de paragraphes narratifs.

**Projet :** direct, légèrement technique. Pas un pitch. Pas une landing page. Description honnête de ce qui existe. "w-AI-fu est un framework pour entités narratives persistantes." — pas "w-AI-fu est un projet ambitieux qui vise à…"

**Devlog :** journal de bord, pas un blog. Pas de "hello world". Entrées courtes, sans effort de narration visible. Un mois de travail par entrée. L'arc ne conclut pas — il constate où on est.

---

## VIII. DIRECTION ARTISTIQUE

- Monochrome encré — noir / gris / blanc cassé
- Accent rouge `#8b0000` : yeux Natsume uniquement
- Pas de couleur parasite, pas d'animation gratuite
- Typographie : `Cinzel` (titres) · `IM Fell English` (corps)
- Atmosphère : Ender Lilies / Elden Ring — calme chargé en dessous

---

## IX. PLAN — ÉTAT ACTUEL (mai 2026)

### Terminé

| ID | Feature | Notes |
|----|---------|-------|
| A2 | URLs directes `/#natsume` etc. + bypass SealIntro | ✅ |
| D1 | `prefers-reduced-motion` | ✅ dans `index.css` |
| D5 | CSS audit — toutes les scènes en CSS Modules | ✅ LibraryScene, ContactScene migrés cette session |
| C1 | Dialogues Natsume | ✅ 70+ entrées, 2-3 variantes par trigger |
| C3 | Idle pool enrichi | ✅ 15-18 entrées par scène |
| C2 | Textes sections | ✅ NatsumeScene RPG, ProjetScene Console Archive, Devlog 3 entrées projet |
| B2 | Achievements | ✅ 6 achievements dont `onCartographer` |
| C7 | Curseur custom | ✅ point + anneau spring, `cursor:none` centralisé |
| E9 | Console easter egg | ✅ auto-log + `window.natsume()` |
| E8 | Dialogue minuit | ✅ câblé + sessionOnce |
| E5 | onGazeHeld | ✅ trigger câblé, achievement |
| — | NatsumeWidget masqué sur scène Natsume | ✅ App.jsx |
| — | Scenes redesign (NatsumeScene RPG, ProjetScene Console) | ✅ |

### Restant — Priorité déploiement

| ID | Feature | Effort | Notes |
|----|---------|--------|-------|
| D3 | Trigger Twitch RuneStele | petit | Ajouter rune OU retirer trigger JSON — dette technique |
| D4 | `natsume_full.png` | petit | Intégrer dans NatsumeScene ou retirer du projet |
| D7 | Alt text sur tous `<img>` | petit | Accessibilité baseline |
| A7 | PWA manifest | petit | 10 lignes JSON, `theme_color: #000000` |
| D6 | Contraste WCAG AA | moyen | Vérifier `--color-fog` sur fonds bibliothèque |
| D8 | Font loading `font-display: swap` + préchargement | petit | Évite FOUT |
| A3 | Open Graph + og-preview 1200×630 | moyen | Asset à générer (portrait Natsume + fond circulaire) |
| A5 | Mobile fix | grand | Pas un audit — corrections concrètes. Grain/particules off sur `@media (hover: none)` |

### Restant — Immersion

| ID | Feature | Effort | Contrainte |
|----|---------|--------|------------|
| B3 | SealIntro fissuré au retour (1 clic) | petit | localStorage `lunarca_seal` |
| B4 | Reprise dernière section | petit | Uniquement si pas de hash à l'entrée |
| C8 | Animation ouverture livre 3D | moyen | 150ms MAX — abandon immédiat si lag |

### Restant — Polish

| ID | Feature | Effort | Notes |
|----|---------|--------|-------|
| A1 | Copie contact en un clic | petit | `navigator.clipboard`, feedback "Copié" 1.5s |
| A6 | Page 404 sobre | petit | "Cet endroit n'existe pas." + retour lib |
| D9 | Favicon SVG | petit | En plus du .ico |
| B1 | SystemMenu diégétique | moyen | Vocab univers : "Grains de mémoire", "Effacer la mémoire" |
| C5 | Natsume commente actions système | petit | `onGrainOff` → irritation, `onSealReset` → gêne |

### Conditionnel — si résultat propre, abandon sinon

| ID | Feature | Contrainte |
|----|---------|------------|
| C4 | Typewriter sur titres | Skippable, 80ms/char min. Si effet "2015" → abandon |
| C9 | Pétales lys NatsumeScene | Max 8 simultanés, désactivable. Si charge → abandon |

### Déploiement

```
Optimisation assets WebP
Meta tags index.html complets
vercel.json SPA redirect
Lighthouse audit
URL finale dans RuneStele + ProjetScene
```

---

## X. BACKLOG V2

| Feature | Condition |
|---------|-----------|
| Son ambiance | Si ressources pour bien faire |
| Chatbot Natsume | Si budget API Claude |
| Nouvelles incarnations | Contenu vivant au fil du temps |
| Devlog auto GitHub | Si setup CI/CD |
| Version mobile dédiée | Si analytics montrent audience mobile |
| Analytics privacy-first | Plausible ou Fathom |

---

## XI. FEATURES ÉCARTÉES DÉFINITIVEMENT

| Feature | Raison |
|---------|--------|
| Navigation entre livres | Casse la structure narrative |
| 7 clics logo | Gimmick pur |
| DevTools detect | Pas fiable + gadget |
| Son V1 | Trop risqué, V2 uniquement |
| Parallax œil seul | Différé — dépend du curseur custom (fait), à réévaluer V2 |

---

## XII. RÈGLES INALTÉRABLES

- Pas de TypeScript, pas de Tailwind, pas de dépendances non listées
- SPA stricte, hash routing — pas de routing multi-page
- Pas de canvas, WebGL, physics engine
- Animations : `opacity` + `transform` uniquement
- CSS Modules colocalisés sur tout nouveau composant
- `localStorage` uniquement — pas de backend
- `cursor: none` centralisé dans `index.css` — pas d'override inline ou CSS
- Chaque feature coche ≥ 2 critères : renforce Natsume / crédibilise le projet / évite le gimmick
- Features conditionnelles : si pas propre → abandon immédiat sans regret
- Le contenu prime sur les features — un site vide bien animé reste vide
