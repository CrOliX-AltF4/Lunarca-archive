import { motion, AnimatePresence } from 'framer-motion'
import { ACHIEVEMENTS, getUnlocked } from '../../data/achievements.js'

const ENTRIES = Object.entries(ACHIEVEMENTS)

export default function AchievementsPanel({ open, onClose }) {
  const unlocked = getUnlocked()

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.2 } }}
          exit={{ opacity: 0, transition: { duration: 0.18 } }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.6)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.25, ease: [0.2, 0, 0.2, 1] } }}
            exit={{ opacity: 0, y: 10, scale: 0.97, transition: { duration: 0.18 } }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'rgba(4,4,4,0.97)',
              border: '1px solid var(--color-ash)',
              padding: '2.5rem 3rem',
              minWidth: '360px',
              maxWidth: '480px',
              width: '90vw',
            }}
          >
            <p style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '0.58rem',
              letterSpacing: '0.3em',
              color: 'var(--color-fog)',
              textTransform: 'uppercase',
              marginBottom: '2rem',
            }}>
              Trophées — {unlocked.size} / {ENTRIES.length}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {ENTRIES.map(([key, { title, description }]) => {
                const done = unlocked.has(key)
                return (
                  <div key={key} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1.2rem',
                    padding: '0.9rem 0',
                    borderBottom: '1px solid var(--color-ash)',
                    opacity: done ? 1 : 0.35,
                  }}>
                    <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: '0.1rem' }}>
                      {done ? '◆' : '◇'}
                    </span>
                    <div>
                      <p style={{
                        fontFamily: 'Cinzel, serif',
                        fontSize: '0.78rem',
                        letterSpacing: '0.08em',
                        color: done ? 'var(--color-parchment)' : 'var(--color-fog)',
                        marginBottom: '0.2rem',
                      }}>
                        {done ? title : '???'}
                      </p>
                      <p style={{
                        fontFamily: 'IM Fell English, serif',
                        fontStyle: 'italic',
                        fontSize: '0.75rem',
                        color: 'var(--color-fog)',
                        lineHeight: '1.5',
                      }}>
                        {done ? description : 'Non débloqué'}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            <button
              onClick={onClose}
              style={{
                marginTop: '1.8rem',
                background: 'transparent',
                border: 'none',
                fontFamily: 'Cinzel, serif',
                fontSize: '0.62rem',
                letterSpacing: '0.2em',
                color: 'var(--color-fog)',
                cursor: 'none',
                padding: 0,
                opacity: 0.6,
              }}
            >
              ✕  Fermer
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
