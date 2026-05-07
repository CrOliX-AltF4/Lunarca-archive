import { useCallback, useEffect, useRef, useState } from 'react'
import narratorData from '../data/narratorDialogues.json'

const NARRATOR_COOLDOWN    = 3000
const NARRATOR_ENTRY_DELAY = 800
const INACTIVITY_DELAY     = 45000

function findEntry(trigger, scene, index) {
  const candidates = narratorData.filter(
    (e) => e.trigger === trigger && (e.scene === scene || e.scene === 'global')
  )
  if (!candidates.length) return null

  const entry = candidates[0]

  if (entry.sessionOnce) {
    const key = `narrator_once_${trigger}`
    if (sessionStorage.getItem(key)) return null
    sessionStorage.setItem(key, '1')
  }

  const pool = entry.entries
  const chosen = index !== undefined
    ? pool[Math.min(index, pool.length - 1)]
    : pool[Math.floor(Math.random() * pool.length)]

  if (!chosen) return null

  return {
    text: chosen.text,
    type: entry.type ?? 'announce',
    side: entry.side ?? 'left',
  }
}

export default function useNarrator(currentScene) {
  const [note, setNote]     = useState(null) // { text, type, side }
  const cooldownRef         = useRef(0)
  const inactivityTimer     = useRef(null)
  const entryTimer          = useRef(null)

  const fire = useCallback((trigger, scene, index) => {
    const now = Date.now()
    if (now < cooldownRef.current) return

    const entry = findEntry(trigger, scene ?? currentScene, index)
    if (!entry || !entry.text) return

    cooldownRef.current = now + NARRATOR_COOLDOWN
    setNote(entry)
  }, [currentScene])

  const clear = useCallback(() => setNote(null), [])

  useEffect(() => {
    clearTimeout(entryTimer.current)
    entryTimer.current = setTimeout(() => {
      fire(`intro_${currentScene}`, currentScene)
    }, NARRATOR_ENTRY_DELAY)
    return () => clearTimeout(entryTimer.current)
  }, [currentScene, fire])

  useEffect(() => {
    const reset = () => {
      clearTimeout(inactivityTimer.current)
      inactivityTimer.current = setTimeout(() => {
        fire('onPlayerInactive', 'global')
      }, INACTIVITY_DELAY)
    }
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'wheel']
    events.forEach((ev) => window.addEventListener(ev, reset, { passive: true }))
    reset()
    return () => {
      events.forEach((ev) => window.removeEventListener(ev, reset))
      clearTimeout(inactivityTimer.current)
    }
  }, [fire])

  useEffect(() => {
    const handler = (e) => {
      const { trigger, scene, index } = e.detail ?? {}
      if (trigger) fire(trigger, scene, index)
    }
    window.addEventListener('narrator:trigger', handler)
    return () => window.removeEventListener('narrator:trigger', handler)
  }, [fire])

  return { text: note?.text ?? null, type: note?.type ?? 'announce', side: note?.side ?? 'left', clear }
}
