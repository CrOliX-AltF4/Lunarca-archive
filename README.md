# Lunarca — Natsume Archive

Lunarca is not a portfolio.

It is an interactive archive built around **Natsume Tsurugi** — the core of w-AI-fu, a private AI/VTuber framework project.

---

## Concept

Most personal sites present information. Lunarca presents a space.

Navigation is diegetic — the user enters a library, discovers books, opens sections. There is no nav bar, no scroll, no conventional UI. Every interaction is a deliberate choice inside the narrative.

Natsume is present throughout. She does not guide. She observes, reacts, occasionally speaks. Her presence is ambient — a signal that this place was inhabited before you arrived.

> The goal is simple: break the boundary of a "portfolio" and create a presence.

---

## Experience Design

- Calm, controlled pacing — no noise, no gamification
- Subtle interactions over explicit UI
- Narrative tone inspired by contemplative RPGs
- The user is not guided — exploration is intentional
- Return visits are remembered

---

## Stack

```
React 18 + Vite     SPA, no routing library
CSS Modules         custom properties, no utility framework
Framer Motion       scene transitions, AnimatePresence
Plain JS            no TypeScript
```

Deliberately minimal. No heavy framework, no abstraction layer between the code and the experience.

---

## Architecture

```
SPA → SealIntro (seal break) → Library (hub)
Library → scene navigation via book clicks
Each scene is isolated, loaded lazily
Natsume widget persists across all scenes
```

Core systems:
- Scene-based navigation (library → sections)
- Contextual dialogue engine (Natsume reactions per trigger)
- Persistent state via localStorage (return visits, memory)
- Lightweight interaction layer — scroll speed, hover duration, idle detection

---

## Artistic Direction

```
Palette     monochrome cold — black, dark grey, off-white
Accent      deep red — symbolic, reserved for Natsume's eye only
Linework    ink-based, franco-belgian BD influence
Atmosphere  Ender Lilies × Gravity Rush × NieR:Automata
```

Every visual decision serves atmosphere over aesthetics. The constraint is simple:

> Technology should never overpower the atmosphere.

---

## Natsume

Natsume Tsurugi is not an AI assistant and not a fictional character in the traditional sense.

She is a **composite identity** — the same name used across different games (FF14, Code Vein, Monster Hunter, others), each instance carrying its own memories, its own world. What remains constant: silver hair, a sealed right eye, a calm that is not indifference.

Her character did not come from a design document. It accumulated.

---

## Status

Work in progress.

Current focus:
- Narrative writing (dialogues, section texts, devlog)
- Interaction refinement
- Visual consistency across scenes

---

## Author

Built by **CrOliX-AltF4** — full-stack developer

Part of a broader personal project exploring the intersection of narrative design, character identity, and web development.

→ [lunarca-archive.vercel.app](https://lunarca-archive.vercel.app)
