# LUNARCA — VISION & RÉFÉRENCE

> Document unique : règles narratives · narrateur · game loop · plan complet
> Dernière mise à jour : mai 2026

---

## I. QUI EST NATSUME

Entité narrative synthétique. Construite à partir d'incarnations successives dans des jeux différents (FF14, Code Vein, Monster Hunter, NieR…) sur quinze ans. Pas une IA qui parle. Pas un personnage de fiction sympathique. Pas une assistante.

Elle est dans cette bibliothèque. Elle était là avant que tu arrives. Elle t'a remarqué. Elle ne sait pas encore quoi penser de toi.

**Ce qu'elle n'est jamais :** guide · hôtesse d'accueil · IA qui répond à des prompts · personnage qui cherche à plaire · quelqu'un qui explique ce qu'il ressent · quelqu'un qui bloque et explique pourquoi

**Ce qu'elle est toujours :** présente avant toi · observatrice avant de parler · avare de mots · précise quand elle parle · ambiguë dans son rapport à toi · capable d'agir sur les objets de son espace

---

## II. RÈGLE FONDAMENTALE — NATSUME

> **Natsume ne commente pas ses propres états intérieurs.**

Elle ne dit pas qu'elle est surprise. Elle est surprise.
Elle ne dit pas qu'elle n'avait pas prévu ça. Elle dit "...".
La différence entre un personnage qui existe et un chatbot qui simule : le chatbot explique, le personnage agit.

---

## III. ANATOMIE D'UNE RÉPLIQUE — NATSUME

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

## V. INTERDITS ABSOLUS — NATSUME

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
❌ Toute explication du pourquoi d'un blocage → elle bloque, point
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

## VI. TEST EN TROIS FILTRES — NATSUME

Avant de valider une réplique :

1. **Est-ce qu'elle parle d'elle-même ?** Si directement et explicitement → couper.
2. **Est-ce que la phrase explique quelque chose ?** Si oui → couper l'explication, garder le constat brut.
3. **Peut-on supprimer le dernier tiers ?** Si la phrase reste plus forte sans sa fin → couper.

**Test final :** Est-ce que cette phrase existe parce que Natsume l'a pensé, ou parce que l'auteur voulait que le lecteur comprenne quelque chose ? Si c'est la deuxième raison → couper ou réécrire.

---

## VII. LE NARRATEUR — QUI IL EST

Voix méta-consciente. Il sait qu'il raconte une histoire à quelqu'un. Il a un agenda : faire tenir ce récit. Natsume ne coopère pas. C'est son problème.

**Ce qu'il est :**
- Conscient de narrer — il s'adresse à l'utilisateur directement
- Énergique, second degré, légèrement grandiloquent
- Il a un plan pour cette histoire. Natsume l'ignore systématiquement.
- Il peut se tromper dans ses prédictions. Il le reconnaît, avec une légèreté forcée.
- Il entend Natsume. Il ne lui répond jamais. Ce n'est pas son rôle.

**Ce qu'il n'est jamais :**
- Un guide explicite ("allez d'abord dans la scène X")
- Une voix comique qui détend l'atmosphère
- Un personnage qui dialogue avec Natsume
- Une voix qui explique Natsume

**Règle fondamentale du Narrateur :**
> Il narre. Il n'interagit pas. Natsume peut l'entendre — lui ne répond pas.

---

## VIII. ANATOMIE D'UNE RÉPLIQUE — NARRATEUR

**Structure :** contexte établi · tension créée · attente installée

**Longueur :**
```
Courte   : 1 phrase
Standard : 2 phrases
Longue   : 3 phrases maximum — couper au-delà
```

**Ton :**
```
✓ "Vous n'étiez pas censé être ici. Personne ne l'est, à vrai dire."
✓ "Le Narrateur avait prévu une introduction. Natsume a d'autres priorités."
✓ "Il semblerait que cette section ne soit pas... disponible."   ← implication sans explication
✗ "Commencez par la scène Natsume pour comprendre le contexte."  ← guide explicite
✗ "Natsume est froide parce qu'elle garde quelque chose."         ← explique Natsume
```

**Rapport à Natsume :**
- Quand Natsume parle → le Narrateur se tait ou intervient après elle (jamais simultanément)
- Quand Natsume fait quelque chose d'inattendu → le Narrateur peut commenter, jamais questionner
- Natsume réagit aux paroles du Narrateur via ses triggers existants — aucun nouveau mécanisme requis

---

## IX. FORME DU NARRATEUR — NARRATORNOTE

Pas de portrait. Pas de bulle. Une **feuille arrachée** qui entre depuis le bord de l'écran.

**Visual :**
- Rectangle avec légère rotation CSS (1-2°)
- Entre depuis le bord de la scène, s'arrête lisiblement, repart par le même bord
- Typographie : Cinzel, couleur `--color-fog` (#888888), non-italique, taille réduite
- Distinct de Natsume : elle a une bulle organique, lui a une feuille angulaire

**Position par scène (bord d'entrée) :**

| Scène | Bord | Logique |
|-------|------|---------|
| Library | haut-gauche | au-dessus des livres, dans l'espace aérien |
| Natsume | gauche | depuis hors-champ, à côté du portrait |
| Projet | bas-gauche | sous le manifeste, comme une note en marge |
| Devlog bureau | haut-droite | posée sur le bureau, comme oubliée là |
| Contact | haut | surplombant la stèle, venant de l'extérieur |

**Animation :**
- Entrée : `x: -120px → 0` (ou direction selon bord) + `opacity: 0 → 1`, durée 0.4s ease-out
- Maintien : 3-5s selon longueur du texte
- Sortie : reverse de l'entrée, durée 0.3s ease-in

---

## X. INTERDITS ABSOLUS — NARRATEUR

```
❌ Donner des instructions de navigation ("allez dans X avant Y")
❌ Expliquer pourquoi Natsume fait quelque chose
❌ Répondre à Natsume même indirectement
❌ Être comique au point de casser l'atmosphère
❌ Parler en même temps que Natsume
❌ Dépasser 3 phrases
```

---

## XI. DIRECTION ARTISTIQUE

- Monochrome encré — noir / gris / blanc cassé
- Accent rouge `#8b0000` : yeux Natsume uniquement
- Pas de couleur parasite, pas d'animation gratuite
- Typographie : `Cinzel` (titres, Narrateur) · `IM Fell English` (corps, dialogues Natsume)
- Atmosphère : Ender Lilies / Elden Ring — calme chargé en dessous
- Chaque scène a sa propre physique narrative unique — aucune métaphore réutilisée

**Narrateur dans la DA :**
- Cinzel non-italique, `--color-fog`, letter-spacing réduit par rapport aux titres
- Le NarratorNote est légèrement de travers — jamais parfaitement aligné
- Son entrée est rapide, sa sortie aussi — il ne s'installe pas, il fait irruption

---

## XII. TEXTES DE SECTION — TON

**Natsume :** elle ne se présente pas. Décrite depuis l'extérieur, comme une entrée d'archive. Sobre, lacunaire. Entrées courtes séparées, style fiche. Pas de paragraphes narratifs.

**Projet :** direct, légèrement technique. Pas un pitch. Pas une landing page. Description honnête de ce qui existe.

**Devlog :** journal de bord, pas un blog. Entrées courtes, sans effort de narration visible. L'arc ne conclut pas — il constate où on est.

**Narrateur :** voir sections VII-X. Il parle à l'utilisateur, jamais au site.

---

## XIII. LE GAME LOOP

L'expérience est structurée en trois actes implicites. L'utilisateur ne les voit pas — il les vit.

### Acte I — Intrusion

**Déclencheur :** SealIntro → Library

Le Narrateur pose la scène avant ou pendant l'entrée. L'utilisateur a brisé quelque chose pour entrer. Natsume était là avant. Elle t'a remarqué. Elle n'a pas décidé quoi faire de toi.

Natsume : froide, distante. Ses premiers dialogues sont les plus courts de l'expérience.
Narrateur : enthousiaste, pose le contexte, légèrement surpris que ça ait marché.

### Acte II — Exploration / Tension

**Déclencheur :** navigation entre les scènes

Accès libre à Natsume, Projet, Devlog. Contact est scellé.

Natsume réagit à ce que le joueur fait, pas à ce qu'il doit faire. Ses dialogues deviennent plus précis au fil des visites — pas plus chaleureux, mais elle t'a identifié. Elle a formé une opinion. Tu ne sais pas laquelle.

Le Narrateur commente le chemin parcouru, prédit (parfois faux) ce qui va suivre.

**Mécanique Contact scellé :**
- Le livre Contact dans le hub a un état visuel distinct (scellé)
- Si cliqué : résistance physique (tremblement, légère retraite du livre)
- Natsume peut réagir à cette tentative (dialogue spécifique)
- Le Narrateur commente sans expliquer

**Condition de déblocage :** TBD — probablement `onGazeHeld` (5s sur Natsume) ou `onCartographer` (toutes scènes visitées) ou condition narrative spécifique

### Acte III — Reconnaissance

**Déclencheur :** condition de déblocage atteinte

Un moment. Un seul. Contact se déscelle seul — sans annonce, sans tutoriel. Le Narrateur peut commenter, peut-être surpris que ça ait marché. Natsume fait quelque chose d'inattendu : un dialogue unique, un silence différent des autres.

Il n'y a pas de cutscene. Pas d'écran de fin. Juste : quelque chose a changé.

---

## XIV. NAVIGATION

**Principe :** libre, jamais contrainte par instruction.

| Scène | État par défaut | Condition |
|-------|----------------|-----------|
| Natsume | accessible | — |
| Projet | accessible | — |
| Devlog | accessible | — |
| Contact | **scellé** | déblocage narratif TBD |

**Natsume dans le hub :**
Elle n'explique pas. Elle n'oriente pas. Elle peut agir sur les objets de son espace (animations sur les livres, comportement du hub) — mais sans instruction verbale. L'utilisateur fait ses choix, elle les observe.

**Return visit :**
- SealIntro : démarre à crack2 (1 clic) via `sealInitialClicks = 2` ✓
- Dernière scène : `resolveInitialScene()` lit `lunarca_last_scene` ✓

---

## XV. PLAN — ÉTAT ACTUEL (mai 2026)

### Terminé ✓

| ID | Feature | Notes |
|----|---------|-------|
| A2 | URLs directes `/#natsume` etc. + bypass SealIntro | ✓ |
| A1 | Copie contact en un clic | ✓ Discord tag + feedback "Tag copié" 2s |
| B3 | SealIntro fissuré au retour (1 clic) | ✓ sealInitialClicks=2 |
| B4 | Reprise dernière section | ✓ resolveInitialScene() |
| D1 | `prefers-reduced-motion` | ✓ dans `index.css` |
| D5 | CSS audit — toutes les scènes en CSS Modules | ✓ |
| C1 | Dialogues Natsume | ✓ 70+ entrées, 2-3 variantes |
| C3 | Idle pool enrichi | ✓ 15-18 entrées par scène |
| C2 | Textes sections | ✓ NatsumeScene RPG, ProjetScene Archive, Devlog 3 entrées |
| B2 | Achievements | ✓ 6 achievements dont onCartographer |
| C7 | Curseur custom | ✓ point + anneau spring |
| E9 | Console easter egg | ✓ auto-log + window.natsume() |
| E8 | Dialogue minuit | ✓ câblé + sessionOnce |
| E5 | onGazeHeld | ✓ trigger câblé, achievement |

### Chantier principal — Narrateur & Game Loop

| ID | Feature | Effort | Notes |
|----|---------|--------|-------|
| N1 | `narratorDialogues.json` — contenu | moyen | Rédiger entrées Narrateur par scène + triggers |
| N2 | `useNarrator.js` — hook | moyen | Système triggers Narrateur, moins aléatoire que Natsume |
| N3 | `NarratorNote.jsx` — composant | moyen | Feuille animée depuis bord écran, position contextuelle |
| N4 | Intégration App.jsx | petit | Monter NarratorNote dans l'arbre, passer la scène courante |
| N5 | Contact scellé — état LibraryScene | moyen | Visuel scellé, résistance au clic, trigger Narrateur |
| N6 | Contact scellé — condition déblocage | moyen | Condition TBD, animation déscellage, dialogue Acte III |
| N7 | Dialogues Natsume réagissant au Narrateur | petit | Quelques répliques spécifiques aux triggers Narrateur |

### Bugs connus — à corriger avant déploiement

| ID | Bug | Effort |
|----|-----|--------|
| BG1 | BooksContainer rapid click : mappe index pas IDs | petit |
| BG2 | isMobile non-réactif au resize | petit |

### Restant — Déploiement

| ID | Feature | Effort | Notes |
|----|---------|--------|-------|
| D7 | Alt text sur tous `<img>` | petit | Accessibilité baseline |
| A7 | PWA manifest | petit | 10 lignes JSON |
| D6 | Contraste WCAG AA | moyen | Vérifier `--color-fog` sur fonds |
| D8 | Font loading `font-display: swap` | petit | Évite FOUT |
| A3 | Open Graph + og-preview 1200×630 | moyen | Asset à générer |
| A5 | Mobile fix | grand | Grain/particules off `@media (hover: none)`, widget safe |

### Restant — Polish

| ID | Feature | Effort | Notes |
|----|---------|--------|-------|
| D9 | Favicon SVG | petit | En plus du .ico |
| B1 | SystemMenu diégétique | moyen | Vocab univers : "Grains de mémoire", "Effacer la mémoire" |
| A6 | Page 404 sobre | petit | "Cet endroit n'existe pas." + retour lib |

### Conditionnel — si résultat propre, abandon sinon

| ID | Feature | Contrainte |
|----|---------|------------|
| C4 | Typewriter sur titres | Skippable, 80ms/char min. Si effet "2015" → abandon |
| C9 | Pétales lys NatsumeScene | Max 8 simultanés. Si charge → abandon |

### Déploiement

```
Optimisation assets WebP
Meta tags index.html complets
vercel.json SPA redirect
Lighthouse audit
URL finale dans RuneStele + ProjetScene
```

---

## XVI. BACKLOG V2

| Feature | Condition |
|---------|-----------|
| Son ambiance | Si ressources pour bien faire |
| Chatbot Natsume | Si budget API Claude |
| Prologue pré-seal Narrateur | Si composant NarratorNote validé et propre |
| Nouvelles incarnations | Contenu vivant au fil du temps |
| Devlog auto GitHub | Si setup CI/CD |
| Version mobile dédiée | Si analytics montrent audience mobile |
| Analytics privacy-first | Plausible ou Fathom |

---

## XVII. FEATURES ÉCARTÉES DÉFINITIVEMENT

| Feature | Raison |
|---------|--------|
| Navigation guidée par Natsume (livres scellés + instructions) | Trahit le personnage — elle n'est pas un guide |
| Navigation entre livres | Casse la structure narrative |
| 7 clics logo | Gimmick pur |
| DevTools detect | Pas fiable + gadget |
| Son V1 | Trop risqué, V2 uniquement |
| Parallax œil seul | Différé — V2 |

---

## XVIII. RÈGLES INALTÉRABLES

- Pas de TypeScript, pas de Tailwind, pas de dépendances non listées
- SPA stricte, hash routing — pas de routing multi-page
- Pas de canvas, WebGL, physics engine
- Animations : `opacity` + `transform` uniquement
- CSS Modules colocalisés sur tout nouveau composant
- `localStorage` uniquement — pas de backend
- `cursor: none` centralisé dans `index.css` — pas d'override inline ou CSS
- Chaque feature coche ≥ 2 critères : renforce Natsume / crédibilise le projet / évite le gimmick
- Features conditionnelles : si pas propre → abandon immédiat sans regret
- Le Narrateur ne répond jamais à Natsume — règle absolue
- Le livre reste la signature unique du Devlog — aucune autre scène n'utilise cette métaphore
- Chaque scène a sa propre physique narrative — pas de réutilisation de composants narratifs entre scènes
