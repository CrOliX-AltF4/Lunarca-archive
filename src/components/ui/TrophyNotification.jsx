import { motion } from 'framer-motion'

export default function TrophyNotification({ title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } }}
      exit={{ opacity: 0, x: -40, transition: { duration: 0.3 } }}
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '2rem',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '0.85rem 1.25rem',
        background: 'var(--color-stone)',
        border: '1px solid var(--color-fog)',
        maxWidth: '320px',
        pointerEvents: 'none',
        boxShadow: '0 4px 24px rgba(0,0,0,0.6)',
      }}
    >
      <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>🏆</span>
      <div>
        <p style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '0.7rem',
          letterSpacing: '0.15em',
          color: 'var(--color-fog)',
          marginBottom: '0.2rem',
          textTransform: 'uppercase',
        }}>
          Trophée débloqué
        </p>
        <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.85rem', color: 'var(--color-parchment)' }}>
          {title}
        </p>
        {description && (
          <p style={{
            fontFamily: 'IM Fell English, serif',
            fontStyle: 'italic',
            fontSize: '0.78rem',
            color: 'var(--color-white-ink)',
            marginTop: '0.2rem',
            lineHeight: '1.4',
          }}>
            {description}
          </p>
        )}
      </div>
    </motion.div>
  )
}
