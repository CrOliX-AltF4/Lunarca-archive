export const ACHIEVEMENTS = {
  easterEgg_konami:  { title: 'Séquence ancienne',      description: 'Tu as su.' },
  onAllLinksClicked: { title: 'Toutes les portes',      description: 'Chaque lien franchi.' },
  onAllDevlogRead:   { title: 'Lecteur du Scriptorium', description: 'Tu as lu jusqu\'au bout.' },
  easterEgg_lys:     { title: 'Ce n\'est pas pour toi', description: 'Elle t\'a prévenu.' },
  onGazeHeld:        { title: 'Regard fixe',            description: 'Cinq secondes de trop.' },
  onCartographer:    { title: 'Cartographe',            description: 'Chaque section visitée.' },
  onEasterEggComplete: { title: 'Tu as cherché',        description: 'Tout trouvé. Elle l\'a noté.' },
}

const KEY = 'lunarca_achievements'

export function getUnlocked() {
  try { return new Set(JSON.parse(localStorage.getItem(KEY) || '[]')) }
  catch { return new Set() }
}

export function saveUnlocked(set) {
  localStorage.setItem(KEY, JSON.stringify([...set]))
}
