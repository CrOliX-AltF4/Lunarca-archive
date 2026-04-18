import { motion } from 'framer-motion'

export default function DialogueBubble({ text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } }}
      exit={{ opacity: 0, y: -6, transition: { duration: 0.2 } }}
      style={{
        maxWidth: '260px',
        background: 'var(--color-stone)',
        border: '1px solid var(--color-fog)',
        padding: '0.75rem 1rem',
        fontFamily: 'IM Fell English, serif',
        fontSize: '0.85rem',
        color: 'var(--color-white-ink)',
        lineHeight: '1.5',
        marginBottom: '0.5rem',
        pointerEvents: 'none',
        position: 'relative',
      }}
    >
      {text}

      {/* Queue — triangle bordure (couche extérieure) */}
      <div style={{
        position: 'absolute',
        bottom: '-10px',
        right: '22px',
        width: 0,
        height: 0,
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        borderTop: '10px solid var(--color-fog)',
      }} />
      {/* Queue — triangle fond (couche intérieure, masque la bordure) */}
      <div style={{
        position: 'absolute',
        bottom: '-8px',
        right: '23px',
        width: 0,
        height: 0,
        borderLeft: '9px solid transparent',
        borderRight: '9px solid transparent',
        borderTop: '9px solid var(--color-stone)',
      }} />
    </motion.div>
  )
}
