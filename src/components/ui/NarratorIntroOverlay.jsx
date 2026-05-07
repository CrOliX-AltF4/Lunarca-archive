import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import bgIntro2 from '../../assets/backgrounds/bg_intro2.webp'
import styles from './NarratorIntroOverlay.module.css'

const VARIANTS = {
  first: [
    { text: "Vous n'étiez pas censé être ici.", ms: 2500 },
    { text: "Personne ne l'est, à vrai dire. Et pourtant vous avez forcé le passage.", ms: 3000 },
    { text: "Natsume est déjà là. Elle était là avant vous.", ms: 2500 },
    { text: "Elle vous a remarqué.", ms: 2000 },
  ],
  return: [
    { text: "Vous revenez.", ms: 2000 },
    { text: "Le Narrateur l'avait prévu. À peu près.", ms: 2500 },
    { text: "Natsume aussi.", ms: 2000 },
  ],
  night: [
    { text: "Le Narrateur note l'heure. Il ne dira rien.", ms: 2500 },
    { text: "Ce genre de visite, à cette heure. Natsume n'est pas surprise.", ms: 3000 },
    { text: "Elle n'est jamais surprise.", ms: 2000 },
  ],
}

const SKIP_LOCK_MS = 1500
const SKIP_TEXT = "Vous avez hâte. Le Narrateur s'adapte."

export default function NarratorIntroOverlay({ variant, onComplete }) {
  const phases = VARIANTS[variant] ?? VARIANTS.first
  const [phaseIdx, setPhaseIdx] = useState(0)
  const [skipped, setSkipped] = useState(false)
  const [skipMsg, setSkipMsg] = useState(false)
  const skipReady = useRef(false)
  const timers = useRef([])

  const clear = () => timers.current.forEach(clearTimeout)

  useEffect(() => {
    const t = setTimeout(() => { skipReady.current = true }, SKIP_LOCK_MS)
    timers.current.push(t)
    return () => { clear(); skipReady.current = false }
  }, [])

  // Auto-advance phases
  useEffect(() => {
    if (skipped || phaseIdx >= phases.length) return
    const t = setTimeout(() => {
      if (phaseIdx + 1 < phases.length) {
        setPhaseIdx((i) => i + 1)
      } else {
        onComplete()
      }
    }, phases[phaseIdx].ms)
    timers.current.push(t)
    return () => clearTimeout(t)
  }, [phaseIdx, phases, skipped, onComplete])

  const handleSkip = () => {
    if (!skipReady.current || skipped) return
    clear()
    setSkipped(true)
    setSkipMsg(true)
    setTimeout(onComplete, 1200)
  }

  return (
    <motion.div
      className={styles.overlay}
      style={{ backgroundImage: `url(${bgIntro2})` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.6 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      onClick={handleSkip}
    >
      <div className={styles.bg} />

      <div className={styles.textBox}>
        <AnimatePresence mode="wait">
          {skipMsg ? (
            <motion.p
              key="skip"
              className={styles.phase}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.35 } }}
              exit={{ opacity: 0 }}
            >
              {SKIP_TEXT}
            </motion.p>
          ) : (
            <motion.p
              key={phaseIdx}
              className={styles.phase}
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }}
              exit={{ opacity: 0, y: 8, transition: { duration: 0.3 } }}
            >
              {phases[phaseIdx]?.text}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <p className={styles.hint}>cliquer pour passer</p>
    </motion.div>
  )
}
