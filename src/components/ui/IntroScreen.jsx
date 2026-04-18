import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function IntroScreen({ onComplete }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 3600)
    return () => clearTimeout(t)
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1, ease: 'easeInOut' } }}
      onClick={onComplete}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'var(--color-void)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
        cursor: 'pointer',
      }}
    >
      <motion.h1
        initial={{ opacity: 0, letterSpacing: '0.6em' }}
        animate={{ opacity: 1, letterSpacing: '0.35em', transition: { duration: 1.2, ease: 'easeOut' } }}
        style={{
          fontFamily: 'Cinzel, serif',
          fontSize: 'clamp(2rem, 6vw, 4rem)',
          color: 'var(--color-white-ink)',
          fontWeight: 400,
        }}
      >
        w-AI-fu
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1, transition: { duration: 0.8, delay: 0.8, ease: 'easeOut' } }}
        style={{
          width: '4rem',
          height: '1px',
          background: 'var(--color-accent)',
          transformOrigin: 'center',
        }}
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.8, delay: 1.2 } }}
        style={{
          fontFamily: 'IM Fell English, serif',
          fontStyle: 'italic',
          fontSize: '0.9rem',
          color: 'var(--color-fog)',
          letterSpacing: '0.08em',
        }}
      >
        Archive de Natsume Tsurugi
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.6, delay: 2 } }}
        style={{
          position: 'absolute',
          bottom: '6%',
          fontFamily: 'Cinzel, serif',
          fontSize: '0.58rem',
          letterSpacing: '0.25em',
          color: 'var(--color-ash)',
          textTransform: 'uppercase',
        }}
      >
        Cliquer pour continuer
      </motion.p>
    </motion.div>
  )
}
