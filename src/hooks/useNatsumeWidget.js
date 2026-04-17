import { useEffect, useState } from 'react'
import dialogues from '../data/dialogues.json'

export default function useNatsumeWidget(currentScene) {
  const [mood, setMood] = useState('idle')
  const [dialogue, setDialogue] = useState(null)
  const [effect, setEffect] = useState(null)

  useEffect(() => {
    const entry = dialogues.find(
      (d) => d.trigger === 'onEnter' && d.scene === currentScene
    )
    if (entry) {
      setMood(entry.mood)
      setDialogue(entry.text)
      setEffect(entry.effect)

      const timer = setTimeout(() => setDialogue(null), 5000)
      return () => clearTimeout(timer)
    } else {
      setMood('idle')
      setDialogue(null)
      setEffect(null)
    }
  }, [currentScene])

  const triggerDialogue = (trigger, scene) => {
    const entry = dialogues.find((d) => d.trigger === trigger && d.scene === scene)
    if (entry) {
      setMood(entry.mood)
      setDialogue(entry.text)
      setEffect(entry.effect)
      setTimeout(() => setDialogue(null), 5000)
    }
  }

  return { mood, dialogue, effect, triggerDialogue }
}
