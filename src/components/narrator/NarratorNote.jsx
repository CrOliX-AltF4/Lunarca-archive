import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import styles from './NarratorNote.module.css'

const TYPE_CONFIG = {
  announce: {
    ms: 4500,
    style: { top: '12%', left: '3%' },
    initial: { x: -100, opacity: 0 },
    exit:    { x: -100, opacity: 0 },
  },
  comment: {
    ms: 3500,
    style: null, // résolu via side
    initial: null,
    exit:    null,
  },
  aside: {
    ms: 3500,
    style: { bottom: '12%', left: '50%', transform: 'translateX(-50%)' },
    initial: { y: 40, opacity: 0 },
    exit:    { y: 40, opacity: 0 },
  },
  alert: {
    ms: 4000,
    style: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
    initial: { scale: 0.92, opacity: 0 },
    exit:    { opacity: 0 },
  },
  whisper: {
    ms: 3000,
    style: { bottom: '18%', right: '4%' },
    initial: { opacity: 0 },
    exit:    { opacity: 0 },
  },
}

function resolveConfig(type, side) {
  const cfg = TYPE_CONFIG[type] ?? TYPE_CONFIG.announce

  if (type === 'comment') {
    const fromRight = side === 'right'
    return {
      ...cfg,
      style: fromRight
        ? { top: '30%', right: '3%' }
        : { top: '30%', left: '3%' },
      initial: { x: fromRight ? 80 : -80, opacity: 0 },
      exit:    { x: fromRight ? 80 : -80, opacity: 0 },
    }
  }

  return cfg
}

export default function NarratorNote({ text, type = 'announce', side = 'left', onDone }) {
  const [visible, setVisible] = useState(false)
  const cfg = resolveConfig(type, side)

  useEffect(() => {
    if (!text) return
    setVisible(true)
    const t = setTimeout(() => {
      setVisible(false)
      setTimeout(() => onDone?.(), 350)
    }, cfg.ms)
    return () => clearTimeout(t)
  }, [text, onDone, cfg.ms])

  return (
    <AnimatePresence>
      {visible && text && (
        <motion.div
          className={styles.note}
          style={cfg.style ?? undefined}
          initial={{ ...cfg.initial }}
          animate={{ x: 0, y: 0, scale: 1, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } }}
          exit={{ ...cfg.exit, transition: { duration: 0.3, ease: 'easeIn' } }}
          aria-live="polite"
          aria-atomic="true"
        >
          {text}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
