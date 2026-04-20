import { useEffect } from 'react'

export default function useBookAnimation(state, setState) {
  useEffect(() => {
    if (state === 'OPENING') {
      const t = setTimeout(() => setState('ENCODED'), 650)
      return () => clearTimeout(t)
    }
    if (state === 'DECODING') {
      const t = setTimeout(() => setState('SUMMARY'), 1600)
      return () => clearTimeout(t)
    }
    if (state === 'CLOSING') {
      const t = setTimeout(() => setState('CLOSED'), 550)
      return () => clearTimeout(t)
    }
  }, [state, setState])
}
