import { useEffect, useRef, useState } from 'react'
import dialogues from '../data/dialogues.json'
import idleDialogues from '../data/idleDialogues.json'

const TRANSITION_LOCK   = 700   // durée verrou après changement de scène (ms)
const TRIGGER_COOLDOWN  = 500   // cooldown entre deux triggers (ms)
const IDLE_TIMEOUT      = 30000
const INDIFFERENCE_DELAY= 60000
const CURSOR_IDLE_DELAY = 120000

function findEntry(trigger, scene) {
  return (
    dialogues.find((d) => d.trigger === trigger && d.scene === scene) ||
    dialogues.find((d) => d.trigger === trigger && d.scene === 'global')
  )
}

export default function useNatsumeWidget(currentScene) {
  const [mood,     setMood]     = useState('idle')
  const [dialogue, setDialogue] = useState(null)

  const timerRef        = useRef(null)
  const moodResetRef    = useRef(null)
  const idleTimerRef    = useRef(null)
  const indiffTimerRef  = useRef(null)
  const cursorTimerRef  = useRef(null)
  const enterTimerRef   = useRef(null)
  const lockRef         = useRef(0)
  const busyRef         = useRef(false) // true pendant toute la durée d'une interaction
  const usedIdleRef     = useRef(new Set())
  const currentSceneRef = useRef(currentScene)

  useEffect(() => {
    currentSceneRef.current = currentScene
    usedIdleRef.current.clear()
  }, [currentScene])

  function release() {
    busyRef.current = false
    setMood('idle')
  }

  // applyEntry — garde-fou busyRef + verrou transition + sync timing
  function applyEntry(entry, { force = false } = {}) {
    if (!entry) return
    if (!force && (busyRef.current || Date.now() < lockRef.current)) return

    clearTimeout(timerRef.current)
    clearTimeout(moodResetRef.current)
    busyRef.current = true
    lockRef.current = Date.now() + TRIGGER_COOLDOWN

    setMood(entry.mood)
    setDialogue(entry.text ?? null)

    if (entry.text) {
      // dialogue 5s → efface + reset idle simultanément → libère après anim exit (300ms)
      timerRef.current = setTimeout(() => {
        setDialogue(null)
        setMood('idle')
        moodResetRef.current = setTimeout(() => { busyRef.current = false }, 350)
      }, 5000)
    } else {
      // mood silencieux : reset idle après 2.5s
      moodResetRef.current = setTimeout(release, 2500)
    }
  }

  // Scène enter — verrou pendant la transition, onEnter après
  useEffect(() => {
    clearTimeout(enterTimerRef.current)
    clearTimeout(idleTimerRef.current)
    clearTimeout(indiffTimerRef.current)

    // Verrouille toute la durée de transition
    lockRef.current = Date.now() + TRANSITION_LOCK

    enterTimerRef.current = setTimeout(() => {
      // Reset complet avant onEnter
      busyRef.current = false
      lockRef.current = 0
      const entry = findEntry('onEnter', currentScene)
      if (entry) applyEntry(entry, { force: true })
      else { setMood('idle'); setDialogue(null) }
    }, TRANSITION_LOCK)

    return () => {
      clearTimeout(enterTimerRef.current)
      clearTimeout(timerRef.current)
      clearTimeout(moodResetRef.current)
      busyRef.current = false
    }
  }, [currentScene])

  // Idle pool + indifférence à 2 niveaux
  useEffect(() => {
    function fireIdle() {
      const scene = currentSceneRef.current
      const pool  = idleDialogues[scene] || []
      if (!pool.length) return
      if (usedIdleRef.current.size >= pool.length) usedIdleRef.current.clear()
      const unused = pool.map((e, i) => ({ e, i })).filter(({ i }) => !usedIdleRef.current.has(i))
      if (!unused.length) return
      const pick = unused[Math.floor(Math.random() * unused.length)]
      usedIdleRef.current.add(pick.i)
      applyEntry(pick.e)
      scheduleIdle()
    }

    function fireIndifference() {
      if (busyRef.current || Date.now() < lockRef.current) return
      clearTimeout(timerRef.current)
      clearTimeout(moodResetRef.current)
      busyRef.current = true
      lockRef.current = Date.now() + TRIGGER_COOLDOWN
      setMood('indifference')
      setDialogue('...')
      timerRef.current = setTimeout(() => {
        setDialogue(null)
        setMood('idle')
        moodResetRef.current = setTimeout(() => { busyRef.current = false }, 350)
      }, 4000)
    }

    function scheduleIdle() {
      clearTimeout(idleTimerRef.current)
      clearTimeout(indiffTimerRef.current)
      idleTimerRef.current   = setTimeout(fireIdle, IDLE_TIMEOUT)
      indiffTimerRef.current = setTimeout(fireIndifference, INDIFFERENCE_DELAY)
    }

    const onActivity = () => scheduleIdle()
    window.addEventListener('mousemove', onActivity, { passive: true })
    window.addEventListener('keydown',   onActivity, { passive: true })
    window.addEventListener('click',     onActivity, { passive: true })
    scheduleIdle()

    return () => {
      clearTimeout(idleTimerRef.current)
      clearTimeout(indiffTimerRef.current)
      window.removeEventListener('mousemove', onActivity)
      window.removeEventListener('keydown',   onActivity)
      window.removeEventListener('click',     onActivity)
    }
  }, [])

  // Curseur immobile 2min
  useEffect(() => {
    function fireCursorIdle() {
      applyEntry(findEntry('onCursorIdle_2min', currentSceneRef.current))
    }
    function reset() {
      clearTimeout(cursorTimerRef.current)
      cursorTimerRef.current = setTimeout(fireCursorIdle, CURSOR_IDLE_DELAY)
    }
    window.addEventListener('mousemove', reset, { passive: true })
    reset()
    return () => {
      clearTimeout(cursorTimerRef.current)
      window.removeEventListener('mousemove', reset)
    }
  }, [])

  // Triggers one-shot au montage
  useEffect(() => {
    const visited = localStorage.getItem('w_ai_fu_visited')
    if (visited) {
      setTimeout(() => applyEntry(findEntry('onReturnVisit', currentSceneRef.current)), TRANSITION_LOCK + 500)
    } else {
      localStorage.setItem('w_ai_fu_visited', '1')
    }

    const hour = new Date().getHours()
    if (hour === 0) {
      setTimeout(() => applyEntry(findEntry('onMidnight', currentSceneRef.current)), TRANSITION_LOCK + 800)
    }
  }, [])

  // Double clic
  useEffect(() => {
    const handler = () => applyEntry(findEntry('onDoubleClick', currentSceneRef.current))
    window.addEventListener('dblclick', handler)
    return () => window.removeEventListener('dblclick', handler)
  }, [])

  // Copie de texte
  useEffect(() => {
    const handler = () => applyEntry(findEntry('onCopyText', currentSceneRef.current))
    window.addEventListener('copy', handler)
    return () => window.removeEventListener('copy', handler)
  }, [])

  // Custom events
  useEffect(() => {
    const handler = (e) => {
      const entry = findEntry(e.detail.trigger, e.detail.scene ?? currentSceneRef.current)
      applyEntry(entry)
    }
    window.addEventListener('natsume:trigger', handler)
    return () => window.removeEventListener('natsume:trigger', handler)
  }, [])

  return { mood, dialogue }
}
