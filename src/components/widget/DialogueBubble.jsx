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
      {/* pointe de bulle BD */}
      <div style={{
        position: 'absolute',
        bottom: '-8px',
        right: '24px',
        width: 0,
        height: 0,
        borderLeft: '8px solid transparent',
        borderRight: '8px solid transparent',
        borderTop: '8px solid var(--color-fog)',
      }} />
    </motion.div>
  )
}
