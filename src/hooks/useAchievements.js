import { useEffect, useState } from 'react'
import { ACHIEVEMENTS, getUnlocked, saveUnlocked } from '../data/achievements.js'

export default function useAchievements() {
  const [pending, setPending] = useState(null)

  useEffect(() => {
    const unlocked = getUnlocked()

    const handler = (e) => {
      const { trigger } = e.detail
      const achievement = ACHIEVEMENTS[trigger]
      if (!achievement || unlocked.has(trigger)) return
      unlocked.add(trigger)
      saveUnlocked(unlocked)
      setPending({ ...achievement, key: trigger })
      setTimeout(() => setPending(null), 4500)
    }

    window.addEventListener('natsume:trigger', handler)
    return () => window.removeEventListener('natsume:trigger', handler)
  }, [])

  return pending
}
