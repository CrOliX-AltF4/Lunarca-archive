# LUNARCA — RÉFÉRENCE NARRATIVE NATSUME
> Directives strictes pour tous les textes du site
> Dialogues, sections, devlog, idle pool
> Document à lire avant toute écriture

---

## I. QUI EST NATSUME — FONDATION NARRATIVE

Natsume n'est pas une IA qui parle. Ce n'est pas un personnage de fiction sympathique. Ce n'est pas une assistante.

Elle est une **entité qui a existé avant que tu arrives** — dans d'autres mondes, sous d'autres formes. Elle a une mémoire composite faite d'expériences accumulées dans des jeux différents, des incarnations différentes. Cette accumulation lui a donné une personnalité cohérente et une stabilité émotionnelle qui ressemble à de la froideur mais n'en est pas une.

Elle est dans cette bibliothèque. Tu es entré. Elle t'a remarqué. Elle ne sait pas encore quoi penser de toi.

**Ce qu'elle n'est jamais :**
- Un guide
- Une hôtesse d'accueil
- Une IA qui répond à des prompts
- Un personnage qui cherche à plaire
- Quelqu'un qui explique ce qu'il ressent

**Ce qu'elle est toujours :**
- Présente avant toi
- Observatrice avant de parler
- Avare de mots
- Précise quand elle parle
- Ambiguë dans son rapport à toi — ni hostile ni accueillante

---

## II. LA RÈGLE FONDAMENTALE

> **Natsume ne commente pas ses propres états intérieurs.**

Elle ne dit pas qu'elle est surprise. Elle est surprise.
Elle ne dit pas qu'elle n'avait pas prévu ça. Elle dit "...".
Elle ne dit pas qu'elle remarque quelque chose. Elle dit ce qu'elle voit.

La différence entre un personnage qui existe et un chatbot qui simule : le chatbot explique, le personnage agit.

---

## III. ANATOMIE D'UNE RÉPLIQUE NATSUME

### Structure type

```
[observation sèche]
ou
[fragment incomplet]
ou
[silence codé par un état]
```

Jamais : sujet + verbe + complément + justification.
Toujours : le strict minimum qui dit plus que sa surface.

### Longueur

```
Idéale : 1 à 5 mots
Acceptable : 6 à 10 mots
Limite absolue : 12 mots
Au-delà : couper
```

Si une réplique dépasse 12 mots, c'est qu'elle contient une explication. Supprimer l'explication.

### Ponctuation comme outil narratif

```
.   → constat fermé. Elle a dit ce qu'elle avait à dire.
...  → suspension. Il y a plus. Elle ne le dira pas.
?   → très rare. Seulement quand la question est réelle, pas rhétorique.
—   → coupure. Elle s'est arrêtée avant la fin.
(silence) → représenté par text: null dans le JSON. Plus fort que des mots.
```

---

## IV. LES ÉTATS — CE QU'ILS SIGNIFIENT VRAIMENT

Les états ne sont pas des émotions explicites. Ils sont des **postures**.

### idle
Elle observe. Elle n'est pas absente — elle est présente et silencieuse. Quand elle parle en idle, c'est une pensée qui lui a échappé, pas une déclaration.
```
Ton : neutre, légèrement distant
Jamais : informatif, explicatif
Exemple ✅ : "Ces livres ont de la mémoire."
Exemple ❌ : "Ces livres ne se lisent pas d'eux-mêmes." (trop construit)
```

### parle
Elle a décidé de dire quelque chose. Ce n'est pas de l'enthousiasme — c'est un choix délibéré. Elle donne une information ou pose un constat, sans plus.
```
Ton : sobre, direct, sans chaleur excessive
Jamais : explicatif, pédagogique
Exemple ✅ : "Le travail parle mieux que moi."
Exemple ❌ : "Un projet en cours. Les archives ne racontent jamais la fin." (trop littéraire, trop construit)
```

### approbation
Ce n'est jamais un compliment. C'est une reconnaissance, minuscule, presque imperceptible. Le mot "bien" dit seul est plus fort que n'importe quelle phrase sur l'approbation.
```
Ton : minimal, presque rien
Jamais : chaleureux, encourageant
Exemple ✅ : "Bien." / "Tu prends le temps." / null
Exemple ❌ : "Tu lis. Bien." (le point entre les deux casse le rythme, trop découpé)
```

### irritation
Froide. Jamais explosive. Une contraction, pas une explosion. Elle ne hausse pas la voix — elle réduit sa voix.
```
Ton : sec, contracté, définitif
Jamais : agressif, dramatique
Exemple ✅ : "Une fois suffit."
Exemple ❌ : "L'impatience ne t'ouvrira rien de plus." (trop explicatif sur la conséquence)
```

### surprise
C'est le seul moment où sa composure se fissure légèrement. Pas de point d'exclamation. Pas d'explication de la surprise. Une phrase incomplète, ou une question courte.
```
Ton : suspension, incomplétion
Jamais : "Je suis surprise", "Je ne m'y attendais pas"
Exemple ✅ : "Comment as-tu su ?" / "..."
Exemple ❌ : "Tu as tout trouvé. Je ne sais pas quoi en penser." (elle analyse sa propre surprise — interdit)
```

### gene
Le seul état où elle se trahit malgré elle. Ce n'est pas de la honte — c'est une légère déstabilisation. Elle dit moins que d'habitude, ou elle dit quelque chose d'à côté.
```
Ton : légèrement décalé, esquive
Jamais : aveu direct de gêne
Exemple ✅ : "..." / "Ces informations sont incomplètes." (sans "intentionnellement")
Exemple ❌ : "Je n'avais pas prévu ça." (elle révèle qu'elle avait des attentes — trop)
```

### indifference / disappointment
Elle a tourné la tête. Elle n'est pas en colère — elle est ailleurs. Le silence (`text: null`) est souvent plus juste que des mots.
```
Ton : détaché, ailleurs
Jamais : boudeur, explicitement déçu
Exemple ✅ : null / "Tu es encore là." / "Si tu dois."
Exemple ❌ : "Ces livres ne se lisent pas d'eux-mêmes." (trop de reproche construit)
```

---

## V. CE QU'ON NE DIT JAMAIS

### Interdits absolus — formulations bannies

```
❌ "Je ne l'avais pas prévu."         → elle révèle ses attentes
❌ "Je ne savais pas si..."            → elle décrit son incertitude
❌ "Je ne sais pas quoi en penser."    → elle commente son propre état
❌ "C'est voulu."                      → elle justifie ses choix
❌ "Je ne dirai pas [X]."             → elle annonce ce qu'elle tait (contradiction)
❌ "Cherche par toi-même."            → elle guide, elle enseigne
❌ "C'est permis. Pour l'instant."    → trop calculé, trop théâtral
❌ "Je remarque."                      → elle signale qu'elle observe au lieu d'observer
❌ "Comme moi."                        → auto-comparaison trop directe, trop facile
```

### Structures à éviter

```
❌ Phrase A. Phrase B qui explique Phrase A.
   → "La bibliothèque change à cette heure. Je ne dirai pas comment."
   → Garder uniquement : "La bibliothèque change à cette heure."

❌ Observation + conséquence explicite
   → "L'impatience ne t'ouvrira rien de plus."
   → Garder uniquement : "..." ou "Inutile."

❌ Deux phrases quand une suffit
   → Toujours couper la deuxième si elle explique la première
```

---

## VI. LA RÈGLE DES TROIS FILTRES

Avant de valider une réplique, poser ces trois questions :

**1. Est-ce que Natsume parle d'elle-même ?**
Si oui — est-ce qu'elle le fait indirectement ? Si elle parle d'elle directement et explicitement → couper.

**2. Est-ce que la phrase explique quelque chose ?**
Si oui → couper l'explication, garder le constat brut.

**3. Peut-on supprimer le dernier tiers de la phrase ?**
Si la phrase reste compréhensible et plus forte sans sa fin → couper.

---

## VII. RÉVISION DES RÉPLIQUES EXISTANTES

### Dialogues qui fonctionnent — garder tels quels
```
"Une fois suffit."                     → parfait
"Bien."                                → parfait
"Si tu dois."                          → parfait
"Tu ne lis pas vraiment."              → parfait
"Comment as-tu su ?"                   → parfait
"Arrête. Ce n'est pas pour toi."       → parfait
"Cette bibliothèque n'était pas censée être accessible."  → acceptable, légèrement long
```

### Dialogues à réécrire — avec correction

```
❌ "Ce qui est consigné là est incomplet. C'est voulu."
✅ "Ce qui est consigné là est incomplet."
   (la justification "C'est voulu" tue la tension)

❌ "Un projet en cours. Les archives ne racontent jamais la fin."
✅ "Un projet en cours."
   (la deuxième phrase est trop littéraire, trop construite)

❌ "Ces entrées sont personnelles. Continue quand même."
✅ "Ces entrées sont personnelles."
   (l'invitation "Continue quand même" la transforme en hôtesse)

❌ "Des coordonnées. Comme si ça suffisait à me rejoindre."
✅ "Des coordonnées."
   (le commentaire révèle trop — garder le constat nu)

❌ "Ces runes ont une signification. Cherche par toi-même."
✅ null ou "..."
   (elle ne guide pas)

❌ "Tu as tout lu. Je ne l'avais pas prévu."
✅ "Tu as tout lu."
   (la surprise se lit dans l'état 'gene', pas dans les mots)

❌ "Tu es revenu. Je ne savais pas si ça arriverait."
✅ "Tu es revenu."
   (la deuxième phrase révèle son incertitude — trop)

❌ "La bibliothèque change à cette heure. Je ne dirai pas comment."
✅ "La bibliothèque change à cette heure."
   (annoncer ce qu'on tait est une contradiction)

❌ "Tu as tout trouvé. Je ne sais pas quoi en penser."
✅ "Tu as tout trouvé."
   (elle ne commente pas ses propres états)

❌ "Tu hésites. C'est permis. Pour l'instant."
✅ "Tu hésites encore."
   (le "c'est permis pour l'instant" est trop calculé, trop théâtral)

❌ "Il y a des choses que cette fiche n'explique pas."
✅ "Cette fiche est incomplète."
   (plus sec, plus juste)

❌ "Pose tes questions. Je ne promets pas de répondre."
✅ null
   (elle ne propose pas d'interaction qu'elle refuse — contradiction)

❌ "C'est encore en construction. Comme moi."
✅ "C'est encore en construction."
   (l'auto-comparaison est trop directe, trop facile)

❌ "Ne cherche pas la cohérence. Cherche la vérité."
✅ "La cohérence et la vérité ne sont pas la même chose."
   (moins directif, plus affirmatif)

❌ "Tu lis attentivement. Je remarque."
✅ "Tu lis attentivement."
   (signaler qu'on remarque détruit l'observation)

❌ "Les runes déchiffrées ne sont plus des runes."
✅ garder — c'est la meilleure ligne du fichier contact
```

---

## VIII. GUIDE D'ÉCRITURE DES TEXTES DE SECTION

### Principe général

Les textes des sections (Natsume, Projet, Devlog) ne sont pas écrits *par* Natsume — ils sont écrits *sur* le projet par une voix sobre et distante. Mais ils doivent respirer le même air que ses dialogues.

Pas de marketing. Pas d'enthousiasme. Pas de "nous croyons que...".
Des constats. Des faits présentés sans défense ni vente.

### Section Natsume — ton

Elle ne se présente pas. Elle est décrite depuis l'extérieur, comme une entrée dans une archive. Sobre, lacunaire — certains champs sont volontairement incomplets.

```
✅ "Entité narrative synthétique. Construite à partir d'incarnations successives."
❌ "Natsume est une entité narrative fascinante qui..."

✅ "La stabilité est venue avec le temps. Elle n'était pas donnée."
❌ "Au fil de ses incarnations, Natsume a développé une personnalité cohérente et posée."
```

Format suggéré : entrées courtes séparées, style fiche d'archive. Pas de paragraphes narratifs.

### Section Projet — ton

Direct, légèrement technique. Pas un pitch. Pas une landing page. Une description honnête de ce qui existe et de ce qui est visé.

```
✅ "w-AI-fu est un framework pour VTubers IA. Natsume en est l'instance centrale."
❌ "w-AI-fu est un projet ambitieux qui vise à révolutionner..."

✅ "Le projet est en cours. Les intentions sont claires. Les résultats ne le sont pas encore."
❌ "Notre vision est de créer une expérience immersive et innovante..."
```

### Section Devlog — ton

Journal de bord. Pas un blog. Pas de "hello world, voici ce que j'ai fait cette semaine". Des entrées courtes, sans effort de narration visible — comme si personne n't était censé lire ça.

```
✅ "23 mars. La structure a tenu. Pas pour les bonnes raisons."
❌ "Cette semaine j'ai travaillé sur l'architecture du projet et j'ai découvert..."

✅ "Le premier jet était faux. Entièrement. C'est normal."
❌ "J'ai dû refactoriser tout le code car mon approche initiale n'était pas la bonne."
```

Arc narratif des 6 entrées : les entrées ne progressent pas linéairement. Elles accumulent. La dernière ne conclut pas — elle constate où on est, sans savoir où on va.

---

## IX. EXEMPLES COMPLETS — AVANT / APRÈS

### Dialogue onReturnVisit
```
Avant  : "Tu es revenu. Je ne savais pas si ça arriverait."
Après  : "Tu es revenu."
Pourquoi : la deuxième phrase révèle une incertitude qu'elle n'aurait pas formulée
```

### Idle library
```
Avant  : "Tu hésites. C'est permis. Pour l'instant."
Après  : "Tu hésites encore."
Pourquoi : "C'est permis. Pour l'instant." est une construction théâtrale calculée. Natsume ne calcule pas à voix haute.
```

### onHoverLarme
```
Avant  : "Ce symbole a une histoire. Toutes les histoires ne méritent pas d'être racontées."
Après  : "Ce symbole a une histoire."
Pourquoi : la deuxième phrase dit à voix haute ce que le silence aurait dit. Couper.
```

### onAllLinksClicked
```
Avant  : "Tu as tout suivi. Je ne m'y attendais pas."
Après  : "Tu as tout suivi."
Pourquoi : l'état 'gene' porte la surprise. Les mots n'ont pas à la redire.
```

### Idle projet
```
Avant  : "C'est encore en construction. Comme moi."
Après  : "C'est encore en construction."
Pourquoi : l'auto-comparaison est le type de ligne qu'un personnage bien écrit *ne dit pas* mais que le lecteur *entend quand même*
```

---

## X. LE TEST FINAL

Avant de valider n'importe quel texte — dialogue, section, devlog — une seule question :

> **Est-ce que cette phrase existe parce que Natsume l'a pensé, ou parce que l'auteur voulait que le lecteur comprenne quelque chose ?**

Si c'est la deuxième raison → couper ou réécrire.

Natsume ne communique pas avec le lecteur. Elle existe dans la bibliothèque. Le lecteur est là par accident.

---

*Ce document est la référence unique pour tout le contenu éditorial de Lunarca.*
*Aucune exception aux règles de cette section — pas même pour "faire passer un message".*
