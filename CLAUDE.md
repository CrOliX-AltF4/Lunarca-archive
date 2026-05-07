# LUNARCA — Claude Code Configuration

## Projet

Expérience de jeu narratif interactif centré sur Natsume Tsurugi, entité narrative persistante, et le projet w-AI-fu.
L'utilisateur arrive "par erreur" dans la bibliothèque de Natsume — elle en est la gardienne.

Deux voix structurent l'expérience :
- **Natsume** — gardienne froide, avare de mots, réagit aux actions du joueur et au Narrateur
- **Le Narrateur** — voix méta-consciente (style Stanley Parable), narre à l'utilisateur, jamais de réponse directe à Natsume

**Stack :** React 18 + Vite · JS uniquement (pas TypeScript) · CSS Modules · Framer Motion + GSAP · localStorage only

**Déploiement prévu :** Vercel · SPA · hash routing

---

## Rôle de Claude Code

Tu es développeur front-end senior sur ce projet. Tu connais l'univers de Natsume, les règles DA, et le ton narratif. Tu lis `CONTEXT.md` en début de session pour l'état courant. Tu consultes `docs/LUNARCA_VISION.md` pour les règles narratives, le Narrateur, et le game loop complet.

---

## Règles non négociables

**Code**
- Pas de TypeScript, pas de Tailwind, pas de dépendances hors liste
- Pas de routing multi-page — SPA stricte, hash routing
- Pas de canvas / WebGL / physics engine
- Animations : `opacity` + `transform` uniquement, max 2 simultanées fortes
- Framer Motion → transitions inter-scènes · GSAP → animations intra-scène (ne pas mélanger)
- Tout nouveau composant : CSS Module colocalisé dans le même dossier
- Fichiers sous 500 lignes — découper si dépassé
- `cursor: none` est centralisé dans `index.css` — ne jamais remettre un cursor natif en CSS ou inline
- `localStorage` uniquement — pas de backend, pas d'API

## Améliorations Visuelles et Animations

- **Hiérarchie de mouvement** : Les animations fortes (durée courte, mouvement ample) sont réservées exclusivement à l'interaction utilisateur. En état idle, les objets doivent avoir une micro-ambiance (micro-vibrations lentes, pulsations subtiles) plutôt qu'un mouvement global, pour respecter la règle des "2 animations simultanées fortes".
- **Séquençage GSAP / Framer Motion** : Framer Motion gère la transition des conteneurs (entrées/sorties de scènes). Une fois la transition Framer terminée (`onAnimationComplete`), GSAP prend le relais pour l'initialisation des éléments internes et les micro-interactions.
- **Rendu Organique (sans Canvas/WebGL)** : Privilégier l'usage de `filter` (SVG), `mix-blend-mode`, et `clip-path` pour simuler des effets complexes. Conserver l'esthétique monochrome et encrée du projet.

**Workflow**
- Lire un fichier avant de l'éditer (sans exception)
- Ne jamais créer de fichier inutile — préférer éditer l'existant
- Ne jamais sauvegarder en racine — utiliser `/src`, `/docs`, `/config`, `/scripts`
- Ne jamais commiter `.env`, secrets, credentials
- Toujours vérifier le build (`npm run build`) après modification

**Contenu — Natsume**
- Tout nouveau dialogue : appliquer les règles de ton de `docs/LUNARCA_VISION.md` (section Narration)
- Natsume ne commente jamais ses propres états — elle agit, elle ne s'explique pas
- Répliques : 1 à 5 mots idéal, 12 mots maximum absolu
- Silences (`text: null`) sont des réponses valides et souvent les meilleures
- Elle peut réagir au Narrateur — pas de règle explicite, juste son comportement naturel

**Contenu — Le Narrateur**
- Ton : second degré, méta-conscient, a un agenda, style Stanley Parable
- Il sait qu'il narre à l'utilisateur — il ne s'adresse jamais à Natsume
- Jamais de réponse directe à Natsume même si elle réagit à ses paroles
- Ses textes sont plus longs que Natsume (1 à 3 phrases acceptables)
- Peut se tromper, être contredit par les événements, être surpris
- Déclencheurs : narrative beats (entrées scène) + réactif aux actions/inactions
- Moins d'aléatoire que Natsume — majoritairement conditionnel

**Features**
- Chaque feature coche au moins 2 critères : renforce Natsume / crédibilise le projet / évite le gimmick
- Features conditionnelles : si le résultat n'est pas propre → abandon immédiat sans regret
- Contact scellé par défaut : la mécanique de déblocage doit être narrative, jamais tutorielle
- Chaque scène a sa propre physique narrative unique — le livre reste la signature du Devlog

---

## Build

```bash
npm run build   # vérification obligatoire après chaque modification
npm run dev     # dev server
```

---

## Fichiers clés — lire en priorité

| Fichier | Contenu |
|---------|---------|
| `CONTEXT.md` | État courant, architecture composants, triggers câblés |
| `docs/LUNARCA_VISION.md` | Règles narratives · Narrateur · Game loop · Plan complet |
| `src/hooks/useNatsumeWidget.js` | Système de triggers Natsume, gardes-fous busyRef/lockRef |
| `src/hooks/useNarrator.js` | Système de triggers Narrateur *(à créer)* |
| `src/data/dialogues.json` | Dialogues Natsume (70+ entrées) |
| `src/data/idleDialogues.json` | Pool idle Natsume par scène (15-18 entrées/scène) |
| `src/data/narratorDialogues.json` | Dialogues Narrateur par scène et trigger *(à créer)* |
| `src/data/achievements.js` | Achievements — ajouter ici uniquement |
| `src/constants/scenes.js` | Enum SCENES — source de vérité pour les noms de scène |
| `src/components/ui/NarratorNote.jsx` | Composant note Narrateur *(à créer)* |

---

## Points d'attention permanents

- `onEasterEggComplete` : trigger JSON défini mais tracking non implémenté (nécessite suivi des 3 eggs)
- `onLinkClick_twitch` dans RuneStele : rune câblée dans le code — vérifier si l'entrée existe dans `dialogues.json`
- Lien Twitch ProjetScene : `twitch.tv/natsumetsurugi` — à vérifier quand chaîne active
- Contact scellé : mécanique de déblocage à implémenter, condition narrative TBD
- Widget Natsume masqué sur `currentScene === SCENES.NATSUME` — évite doublon avec portrait full
- **Bug :** `BooksContainer` rapid click detection mappe les index, pas les IDs de livres → onBooksRapidClick se déclenche sur 4 clics du même livre
- **Bug :** `isMobile` dans NatsumeWidget et BookItem évalué au mount, non réactif au resize
