import { useEffect, useState } from 'react'
import { ACHIEVEMENTS, getUnlocked, saveUnlocked } from '../data/achievements.js'

const EGGS = new Set(['easterEgg_konami', 'easterEgg_lys', 'onGazeHeld'])

export default function useAchievements() {
  const [pending, setPending] = useState(null)

  useEffect(() => {
    const unlocked = getUnlocked()
    const eggsFoundThisSession = new Set()
    let eggTid

    const handler = (e) => {
      const { trigger } = e.detail
      const achievement = ACHIEVEMENTS[trigger]
      if (!achievement || unlocked.has(trigger)) return
      unlocked.add(trigger)
      saveUnlocked(unlocked)
      setPending({ ...achievement, key: trigger })
      setTimeout(() => setPending(null), 4500)

      if (EGGS.has(trigger)) {
        eggsFoundThisSession.add(trigger)
        if (eggsFoundThisSession.size >= EGGS.size && !unlocked.has('onEasterEggComplete')) {
          eggTid = setTimeout(() => {
            window.dispatchEvent(new CustomEvent('natsume:trigger', {
              detail: { trigger: 'onEasterEggComplete', scene: 'global' },
            }))
          }, 1500)
        }
      }
    }

    window.addEventListener('natsume:trigger', handler)
    return () => {
      window.removeEventListener('natsume:trigger', handler)
      clearTimeout(eggTid)
    }
  }, [])

  return pending
}
