# w-AI-fu — Site Vitrine

Site vitrine du projet **w-AI-fu**, centré sur le personnage de Natsume Tsurugi.  
L'univers narratif et le code sont indissociables — le site *est* le projet.

---

## Stack

| Outil | Usage |
|-------|-------|
| React 18 + Vite | Framework + bundler |
| Tailwind CSS v4 | Styles utilitaires |
| Framer Motion | Animations (opacity + transform uniquement) |
| JavaScript pur | Pas de TypeScript — choix assumé |

---

## Lancer le projet

```bash
npm install
npm run dev
```

```bash
npm run build    # build production
npm run preview  # prévisualiser le build
```

---

## Structure

```
src/
├── assets/          # Backgrounds, portraits, effets manga, ornements
├── components/
│   ├── scenes/      # Une scène par section (Library, Natsume, Projet, Devlog, Contact)
│   ├── books/       # Livres flottants — navigation principale
│   ├── widget/      # Widget Natsume persistant (portrait + bulles BD)
│   ├── devlog/      # Composant livre physique avec ornements
│   ├── contact/     # Stèle runique avec parchemin contextuel
│   └── ui/          # Composants partagés
├── data/
│   ├── dialogues.json   # Dialogues Natsume par trigger/scène
│   └── devlog.json      # Entrées du journal de développement
├── hooks/
│   └── useNatsumeWidget.js
└── App.jsx          # Orchestrateur de scènes (SPA stricte)
```

---

## Contraintes techniques

- **SPA stricte** — pas de routing multi-page
- **Pas de Canvas / WebGL / physics engine**
- **Animations** : opacity + transform uniquement, max 2 simultanées fortes
- **Assets** : backgrounds en WebP, sprites en PNG sans fond

---

## Natsume Widget

Natsume apparaît en bas à droite en présence persistante. Ses dialogues sont scriptés dans `dialogues.json` — ce n'est pas un chatbot temps réel.

États disponibles : `idle` · `parle` · `approbation` · `irritation` · `surprise` · `gene` · `indifference`

---

## Ajouter une entrée devlog

Éditer `src/data/devlog.json` :

```json
{
  "id": 4,
  "date": "Avril 2026",
  "title": "Titre de l'entrée",
  "content": "Contenu de l'entrée..."
}
```

---

## Licence

MIT — voir [LICENSE](./LICENSE).  
Les assets visuels (illustrations, portraits de Natsume) sont la propriété de leurs auteurs respectifs et ne sont pas couverts par cette licence.
