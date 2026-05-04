# LUNARCA — Claude Code Configuration

## Projet

Site vitrine du projet w-AI-fu centré sur Natsume Tsurugi, entité narrative persistante.
Le site *est* le projet — pas une vitrine *sur* le projet.

**Stack :** React 18 + Vite · JS uniquement (pas TypeScript) · CSS Modules · Framer Motion + GSAP · localStorage only

**Déploiement prévu :** Vercel · SPA · hash routing

---

## Rôle de Claude Code

Tu es développeur front-end senior sur ce projet. Tu connais l'univers de Natsume, les règles DA, et le ton narratif. Tu lis `CONTEXT.md` en début de session pour l'état courant. Tu consultes `docs/LUNARCA_VISION.md` pour les règles narratives et le plan complet.

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

**Workflow**
- Lire un fichier avant de l'éditer (sans exception)
- Ne jamais créer de fichier inutile — préférer éditer l'existant
- Ne jamais sauvegarder en racine — utiliser `/src`, `/docs`, `/config`, `/scripts`
- Ne jamais commiter `.env`, secrets, credentials
- Toujours vérifier le build (`npm run build`) après modification

**Contenu**
- Tout nouveau dialogue : appliquer les règles de ton de `docs/LUNARCA_VISION.md` (section Narration)
- Natsume ne commente jamais ses propres états — elle agit, elle ne s'explique pas
- Répliques : 1 à 5 mots idéal, 12 mots maximum absolu
- Silences (`text: null`) sont des réponses valides et souvent les meilleures

**Features**
- Chaque feature coche au moins 2 critères : renforce Natsume / crédibilise le projet / évite le gimmick
- Features conditionnelles : si le résultat n'est pas propre → abandon immédiat sans regret

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
| `docs/LUNARCA_VISION.md` | Règles narratives Natsume + plan complet + backlog |
| `src/hooks/useNatsumeWidget.js` | Système de triggers, gardes-fous busyRef/lockRef |
| `src/data/dialogues.json` | Tous les dialogues (70+ entrées) |
| `src/data/idleDialogues.json` | Pool idle par scène (15-18 entrées/scène) |
| `src/data/achievements.js` | Achievements — ajouter ici uniquement |
| `src/constants/scenes.js` | Enum SCENES — source de vérité pour les noms de scène |

---

## Points d'attention permanents

- `onEasterEggComplete` : trigger JSON défini mais tracking non implémenté (nécessite suivi des 3 eggs)
- `onLinkClick_twitch` dans RuneStele : non câblé (Contact n'a pas de rune Twitch)
- Lien Twitch ProjetScene : `twitch.tv/natsumetsurugi` — à vérifier quand chaîne active
- `natsume_full.png` : asset présent, non utilisé — décision pendante (intégrer ou retirer)
- Widget Natsume masqué quand `currentScene === SCENES.NATSUME` (géré dans `App.jsx`)
