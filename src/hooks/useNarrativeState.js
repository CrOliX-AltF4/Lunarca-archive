import { useCallback, useRef, useState } from 'react'
import { SCENES } from '../constants/scenes.js'

const SECONDARY_SCENES = new Set([SCENES.NATSUME, SCENES.PROJET, SCENES.DEVLOG, SCENES.CONTACT])

export default function useNarrativeState() {
  const state = useRef({
    firstScene:      null,
    contactAttempts: 0,
    returnCount:     0,
    devlogProgress:  0,
    gazeHeld:        false,
    scenesVisited:   new Set(),
  })

  // unsealingRef prevents double-dispatch if checkUnlock fires twice before state update
  const unsealingRef        = useRef(false)
  const cartographerFired   = useRef(false)

  const [isContactSealed, setIsContactSealed] = useState(
    () => !localStorage.getItem('lunarca_contact_unsealed')
  )

  const checkUnlock = useCallback(() => {
    if (unsealingRef.current) return
    const s = state.current
    const hasNatsume    = s.scenesVisited.has(SCENES.NATSUME)
    const hasEngagement = s.devlogProgress >= 2 || s.gazeHeld
    if (hasNatsume && hasEngagement) {
      unsealingRef.current = true
      localStorage.setItem('lunarca_contact_unsealed', '1')
      setIsContactSealed(false)
      window.dispatchEvent(new CustomEvent('narrator:trigger', {
        detail: { trigger: 'contact_unsealed', scene: 'library' },
      }))
      window.dispatchEvent(new CustomEvent('natsume:trigger', {
        detail: { trigger: 'onContactUnsealed', scene: 'library' },
      }))
    }
  }, [])

  const recordScene = useCallback((scene) => {
    const s = state.current
    const alreadyVisited = s.scenesVisited.has(scene)

    // Track return to library
    if (scene === SCENES.LIBRARY && s.scenesVisited.has(SCENES.LIBRARY)) {
      s.returnCount += 1
      const idx = Math.min(s.returnCount, 3)
      window.dispatchEvent(new CustomEvent('narrator:trigger', {
        detail: { trigger: `onReturnToLibrary_${idx}`, scene: 'global' },
      }))
    }

    s.scenesVisited.add(scene)

    // First non-library scene clicked
    if (s.firstScene === null && scene !== SCENES.LIBRARY) {
      s.firstScene = scene
      window.dispatchEvent(new CustomEvent('narrator:trigger', {
        detail: { trigger: `onFirstClick_${scene}`, scene: 'library' },
      }))
    }

    // Cartographer: all 4 secondary scenes visited
    if (!cartographerFired.current) {
      const allSeen = [...SECONDARY_SCENES].every(sc => s.scenesVisited.has(sc))
      if (allSeen) {
        cartographerFired.current = true
        window.dispatchEvent(new CustomEvent('natsume:trigger', {
          detail: { trigger: 'onCartographer', scene: 'global' },
        }))
        window.dispatchEvent(new CustomEvent('narrator:trigger', {
          detail: { trigger: 'onAllScenesVisited', scene: 'global' },
        }))
      }
    }

    if (!alreadyVisited) checkUnlock()
  }, [checkUnlock])

  const recordDevlogProgress = useCallback(() => {
    state.current.devlogProgress += 1
    checkUnlock()
  }, [checkUnlock])

  const recordGazeHeld = useCallback(() => {
    if (state.current.gazeHeld) return
    state.current.gazeHeld = true
    checkUnlock()
  }, [checkUnlock])

  const recordContactAttempt = useCallback(() => {
    state.current.contactAttempts += 1
    return state.current.contactAttempts
  }, [])

  const resetAll = useCallback(() => {
    localStorage.removeItem('lunarca_contact_unsealed')
    unsealingRef.current = false
    cartographerFired.current = false
    state.current = {
      firstScene: null, contactAttempts: 0, returnCount: 0,
      devlogProgress: 0, gazeHeld: false, scenesVisited: new Set(),
    }
    setIsContactSealed(true)
  }, [])

  return { isContactSealed, recordScene, recordDevlogProgress, recordGazeHeld, recordContactAttempt, resetAll }
}
