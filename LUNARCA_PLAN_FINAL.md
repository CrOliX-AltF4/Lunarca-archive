# LUNARCA — PLAN V1 VALIDÉ
> Document de référence final — avril 2026
> Stack : React 18 + Vite + CSS Modules + Framer Motion

---

## RÈGLES INALTÉRABLES

- Pas de TypeScript, pas de Tailwind, pas de dépendances non listées
- Pas de routing multi-page — SPA stricte, hash routing
- Pas de canvas, pas de WebGL, pas de physics engine
- Animations : opacity + transform uniquement, max 2 simultanées fortes
- Tout nouveau composant : CSS Modules colocalisé
- Ton Natsume : jamais explicatif, jamais chaleureux, jamais hostile — toujours ambigu
- DA : monochrome encré, accent rouge yeux uniquement
- localStorage uniquement — pas de backend
- Chaque feature doit cocher au moins 2 critères : renforce Natsume / crédibilise le projet / évite l'effet gimmick

---

## FEATURES VALIDÉES — TOP 15 + BONUS

### 🧱 CORE TECH (crédibilité immédiate)

**A2 — URLs directes vers sections**
`/#natsume`, `/#devlog`, `/#contact` fonctionnent à l'entrée. Lire le hash au mount, bypass SealIntro si hash présent, atterrissage direct dans la bonne section.
Priorité : bloquante déploiement

**A3 — Open Graph soigné**
Meta tags complets OG + Twitter Card. og-preview.jpg 1200x630 : portrait Natsume buste, fond bibliothèque circulaire, logo Lunarca bas droite, titre en Cinzel. Asset à générer sur Leonardo avec refs DA validées.
Priorité : bloquante déploiement

**A5 — Mobile (fix réel, pas audit)**
Pas un audit — des corrections concrètes. Pas de débordement horizontal, zones de tap ≥ 44px, textes lisibles sans zoom, grain et particules désactivés sur mobile (`@media (hover: none)`).
Priorité : bloquante déploiement

**D1 — prefers-reduced-motion**
Dans `globals.css` :
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
Câbler avec toggle animations SystemMenu.
Priorité : bloquante déploiement

**D6 — Contraste texte**
Vérifier ratio WCAG AA sur tous les textes. Blanc `#f5f3ef` sur noir `#0a0a0a` OK. Vérifier gris `--color-fog` et textes sur fond bibliothèque. Corriger si nécessaire.
Priorité : bloquante déploiement

**D8 — Font loading optimisé**
`Cinzel` et `IM Fell English` via `@font-face` avec `font-display: swap`. Préchargement dans `<head>`. Évite le FOUT (flash de texte non stylé).
Priorité : bloquante déploiement

---

### 🧠 CŒUR DU PROJET (sans ça le site est vide)

**C1 — Dialogues Natsume (49 entrées)**
Rédiger tous les dialogues selon le guide de ton. C'est le chantier le plus important du projet.

Guide de ton absolu :
```
JAMAIS explicatif  → TOUJOURS évocateur
JAMAIS chaleureux  → TOUJOURS ambigu
JAMAIS long        → 1 phrase idéale, 2 maximum
Les silences comptent : "..." est une réponse valide

❌ "Je suis surprise que tu aies trouvé ça."
✅ "...Tu as cherché."

❌ "Ce livre parle de mes souvenirs."
✅ "Certains mondes ne se ferment pas vraiment."

❌ "Tu reviens souvent."
✅ "Encore toi."
```
Priorité : bloquante déploiement

**C2 — Textes sections**
Trois sections à rédiger, même ton sobre et distancié.

Natsume (3 blocs) :
- Nature : entité narrative synthétique, ni IA ni personnage fictif
- Mémoire : incarnations, continuité émotionnelle, stabilité progressive
- Présence : pourquoi elle est ici, son rôle dans le projet

Projet (2 blocs) :
- Le projet : framework VTuber IA, Natsume comme instance centrale
- La vision : pourquoi ça existe, lien Twitch, ce qu'on construit

Devlog (6 entrées, arc narratif) :
```
Entrée 1 — L'origine     : pourquoi ce projet
Entrée 2 — La structure  : premières décisions, les doutes
Entrée 3 — La rupture    : ce qu'on a jeté
Entrée 4 — La direction  : quand ça s'est clarifié
Entrée 5 — La construction : ce qui prend forme
Entrée 6 — L'état actuel : où on en est, honnête et sobre
```
Priorité : bloquante déploiement

**C3 — Idle pool enrichi par scène**
Augmenter le pool de dialogues idle. Plus de variété = Natsume vraiment présente. Contenu JSON uniquement, zéro code.
Priorité : haute

**C5 — Natsume commente les actions système**
Ouverture SystemMenu → `onSystemMenuOpen` → idle → "Tu cherches quelque chose."
Reset mémoire → `onMemoryReset` → indifférence → "Comme tu veux."
Toggle grain off → `onGrainOff` → irritation → "Ce n'est pas mieux."
Priorité : moyenne

---

### 🔥 IMMERSION

**B3 — Visite de retour accélérée**
Si `return_visit` en localStorage : SealIntro démarre avec le sceau déjà fissuré, 1 clic au lieu de 3. Natsume : "Encore toi."
Lecture localStorage au mount de `SealIntro.jsx`. `cracksVisible = true` dès le départ, `clicksRequired = 1`.
Priorité : haute

**B4 — Reprise dernière section**
⚠️ Conditionnel : uniquement si aucun hash n'est présent dans l'URL d'entrée. Si hash présent → A2 a la priorité absolue. Si pas de hash + localStorage contient une section → Natsume propose : "Tu étais dans [section]. Tu veux continuer ?"
Priorité : moyenne

**C8 — Animation ouverture de livre**
⚠️ Contrainte stricte : rotation CSS 3D 150ms MAX. Si ça lag sur machine moyenne → revenir au fade immédiatement, sans regret. L'objectif est un snap qui donne du poids, pas une animation visible.
`transform: perspective(800px) rotateY(90deg)` → switch scène → `rotateY(0deg)`. Durée totale 300ms dont 150ms de rotation.
Priorité : moyenne

---

### ✨ POLISH (petits détails, grosse perception)

**A1 — Copie contact en un clic**
Dans RuneStele, bouton "copier" discret à côté de chaque lien dans le parchemin. `navigator.clipboard.writeText()`. Feedback : texte passe à "Copié —" pendant 1.5s puis revient.
Priorité : haute

**A6 — Page 404 stylée**
URL invalide → fond noir, Natsume widget, une ligne sobre. "Cet endroit n'existe pas." + lien retour bibliothèque. Zéro fioriture.
Priorité : moyenne

**D9 — Favicon SVG**
En plus du .ico, un `favicon.svg` pour les navigateurs modernes. Meilleure netteté à toutes les tailles. Si le logo Lunarca est vectorisable → prioritaire.
Priorité : moyenne

---

### 🎯 BONUS (si bien fait — abandon immédiat sinon)

**E5 — onGazeHeld**
Curseur maintenu sur l'œil de Natsume dans NatsumeScene 5 secondes → irritation → "Arrête de me regarder comme ça."
Dépend de E4 (parallax). À implémenter uniquement si le parallax est imperceptible en perf.
Priorité : basse

**E8 — Dialogue minuit**
Visite entre 00h00 et 00h59 → dialogue unique. Trigger déjà câblé, juste le texte à écrire.
Priorité : basse — 5 minutes de travail

**E9 — Console Easter Egg**
Dans `main.jsx` :
```javascript
window.natsume = () => {
  console.log(`
  ╔══════════════════════════════╗
  ║  LUNARCA — ARCHIVE SYSTÈME   ║
  ║  Entité : Natsume Tsurugi    ║
  ╚══════════════════════════════╝
  `)
  console.log('%cTu cherches quelque chose derrière le rideau.', 'color: #8b0000; font-style: italic')
}
```
Parle aux développeurs qui inspectent le code. Signature de craft.
Priorité : basse — 10 minutes

---

### ⚠️ FEATURES CONDITIONNELLES (à bien encadrer)

**B1 — SystemMenu diégétique**
OUI, mais pas un "menu paramètres". L'interface doit parler la langue de l'univers :
```
❌ "Grain de film : ON/OFF"
✅ "Grains de mémoire : actifs / suspendus"

❌ "Réinitialiser"
✅ "Effacer la mémoire"

❌ "Achievements"
✅ "Fragments retrouvés"
```
Bouton d'accès : glyphe discret `position: fixed` bas gauche, toutes scènes sauf SealIntro. Si ça ressemble à un menu générique → abandon.
Priorité : moyenne

**B2 — Achievements**
Ultra discret, jamais central, jamais gamifié. Dans SystemMenu uniquement. Slots verrouillés visibles, contenu masqué. Micro-animation CSS au déverrouillage.
Hook `useRecords.js` avec `unlock(id)` + `getAll()` + `reset()`.
Si ça ressemble à des badges → abandon.
Priorité : basse

**C4 — Typewriter**
Uniquement sur les titres de section à l'entrée. Lent (80ms par caractère minimum). Skippable instantanément au premier clic/tap. Utilisé avec parcimonie — pas sur chaque élément.
Si ça fait "site portfolio 2015" → abandon.
Priorité : basse

**C7 — Curseur custom**
Potentiel fort, risque fort. Une larme lunaire ou un point encré. `cursor: none` + SVG positionné en `fixed` via JS. Désactivé si reduced-motion ou mobile.
Règle absolue : si latence perceptible d'une frame → abandon immédiat sans discussion.
Priorité : basse

**C9 — Particules contextuelles**
Bibliothèque : poussière (déjà en place). Natsume : pétales de lys très lents, maximum 8 simultanés. Autres scènes : aucune.
Désactivable via SystemMenu. Si ça charge → abandon.
Priorité : basse

---

## CORRECTIONS TECHNIQUES (avant déploiement obligatoire)

**D2 — Supprimer fichiers fantômes**
`TheatreCurtain.jsx` et `IntroScreen.jsx` → supprimer.

**D3 — Résoudre trigger twitch RuneStele**
Décision : ajouter rune Twitch dans Contact OU retirer trigger de `dialogues.json`. Un trigger mort = dette technique.

**D4 — natsume_full.png**
Intégrer dans NatsumeScene (portrait plein écran en mode lecture) ou retirer du CONTEXT. Pas de zone grise.

**D5 — CSS audit**
Aucun style inline qui devrait être en module. Passer toutes les scènes en revue.

**D7 — Alt text assets**
Attributs `alt` descriptifs sur tous les `<img>` Natsume et livres.

**A7 — PWA manifest**
10 lignes de JSON. `theme_color: #000000`, `background_color: #000000`. Permet installation mobile. Zéro service worker.

---

## FEATURES ÉCARTÉES (définitivement)

| Feature | Raison |
|---------|--------|
| C10 — navigation entre livres | Casse la structure narrative |
| E6 — 7 clics logo | Gimmick pur |
| E10 — DevTools detect | Pas fiable + gadget |
| C6 — son V1 | Trop risqué, V2 uniquement |
| E4 — parallax œil seul | Dépend de C7 (curseur), différé |

---

## BACKLOG V2 (après déploiement stable)

| Feature | Condition |
|---------|-----------|
| C6 — Son ambiance | Si ressources pour bien faire |
| F1 — Chatbot Natsume | Si budget API Claude |
| F2 — Internationalisation | Si audience internationale |
| F3 — Nouvelles incarnations | Contenu vivant au fil du temps |
| F4 — Devlog auto GitHub | Si setup CI/CD |
| F5 — Version mobile dédiée | Si analytics montrent audience mobile |
| F6 — Analytics privacy-first | Plausible ou Fathom |
| E4 — Parallax œil + C7 curseur | Si V1 stable et perf validée |

---

## ORDRE D'EXÉCUTION

```
SESSION 1 — Corrections bloquantes
  D2 fichiers fantômes
  D3 trigger twitch
  D4 natsume_full décision
  D5 CSS audit
  D7 alt text
  A7 PWA manifest

SESSION 2 — Core tech
  A2 URLs directes + bypass SealIntro
  D1 prefers-reduced-motion
  D6 contraste audit + corrections
  D8 font loading

SESSION 3 — Contenu (chantier principal)
  C1 dialogues Natsume — 49 entrées
  C2 textes Natsume + Projet
  C2 devlog 6 entrées arc narratif
  C3 idle pool enrichi

SESSION 4 — Immersion core
  B3 visite retour accélérée
  B4 reprise section (conditionnel)
  C8 animation ouverture livre (contrainte 150ms)

SESSION 5 — Polish + SystemMenu
  A1 copie contact
  A6 page 404
  D9 favicon SVG
  A3 Open Graph + og-preview
  B1 SystemMenu diégétique
  C5 Natsume commente actions système

SESSION 6 — Mobile
  A5 fix mobile réel

SESSION 7 — Features conditionnelles (si bien faites)
  B2 achievements
  C4 typewriter
  C7 curseur custom
  C9 particules contextuelles

SESSION 8 — Bonus
  E5 onGazeHeld
  E8 dialogue minuit
  E9 console easter egg

SESSION 9 — Déploiement
  Optimisation assets WebP
  Meta tags index.html complets
  vercel.json SPA redirect
  Lighthouse audit
  URL finale dans RuneStele + ProjetScene
```

---

## DIRECTIVES CLAUDE CODE

- Lire ce fichier + `CONTEXT.md` en début de session sans exception
- Ne jamais introduire TypeScript, Tailwind, ou dépendances non listées
- Tout nouveau composant : dossier dédié + `.module.css` colocalisé
- Tout nouveau dialogue : guide de ton section C1 obligatoire
- Tout nouveau achievement : `useRecords.unlock(id)` uniquement
- Tout nouvel asset : `/src/assets/` sous-dossier approprié
- Avant modification `dialogues.json` : vérifier cohérence `useNatsumeWidget.js`
- Avant modification `LibraryScene.jsx` : vérifier triggers `BooksContainer.jsx`
- Effets visuels nouveaux : toujours désactivables via `useSettings`
- Features conditionnelles : si le résultat n'est pas propre → abandon immédiat
- Le contenu (C1, C2) prime sur les features — un site vide bien animé reste vide

---

*Plan validé avril 2026 — mettre à jour après chaque session complétée.*
