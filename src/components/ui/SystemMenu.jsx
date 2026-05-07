import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function dispatch(trigger) {
  window.dispatchEvent(new CustomEvent('natsume:trigger', { detail: { trigger, scene: 'global' } }))
}

function getGrainEnabled() {
  return localStorage.getItem('lunarca_grain') !== 'off'
}

export default function SystemMenu({ open, onClose, onResetSeal, onOpenAchievements }) {
  const [grainOn, setGrainOn] = useState(getGrainEnabled)
  const mountedRef = useRef(false)

  useEffect(() => {
    document.documentElement.classList.toggle('no-grain', !grainOn)
    localStorage.setItem('lunarca_grain', grainOn ? 'on' : 'off')
    if (mountedRef.current) dispatch(grainOn ? 'onGrainOn' : 'onGrainOff')
    else mountedRef.current = true
  }, [grainOn])

  const handleResetSeal = () => {
    localStorage.removeItem('lunarca_seal')
    localStorage.removeItem('lunarca_last_scene')
    dispatch('onSealReset')
    onResetSeal?.()
    onClose()
  }

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
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
            padding: '0 0 3rem 2rem',
            background: 'rgba(0,0,0,0.45)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.22, ease: [0.2, 0, 0.2, 1] } }}
            exit={{ opacity: 0, y: 8, scale: 0.97, transition: { duration: 0.16 } }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'rgba(4,4,4,0.96)',
              border: '1px solid var(--color-ash)',
              padding: '2rem 2.5rem',
              minWidth: '260px',
            }}
          >
            <p style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '0.58rem',
              letterSpacing: '0.3em',
              color: 'var(--color-fog)',
              textTransform: 'uppercase',
              marginBottom: '1.8rem',
            }}>
              Registre du Gardien
            </p>

            <MenuRow
              label="Résidu mémoriel"
              value={grainOn ? 'Présent' : 'Effacé'}
              onClick={() => setGrainOn((v) => !v)}
            />

            <MenuRow
              label="Résonances"
              value="Consulter"
              onClick={() => { onClose(); onOpenAchievements?.() }}
            />

            <MenuRow
              label="Réinitialiser"
              value="Tout effacer"
              danger
              onClick={handleResetSeal}
            />

            <button
              onClick={onClose}
              style={{
                marginTop: '2rem',
                background: 'transparent',
                border: 'none',
                fontFamily: 'Cinzel, serif',
                fontSize: '0.62rem',
                letterSpacing: '0.2em',
                color: 'var(--color-fog)',
                padding: 0,
                opacity: 0.6,
              }}
            >
              Refermer
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function MenuRow({ label, value, onClick, danger }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        padding: '0.75rem 0',
        borderBottom: '1px solid var(--color-ash)',
        gap: '2rem',
      }}
    >
      <span style={{
        fontFamily: 'IM Fell English, serif',
        fontSize: '0.85rem',
        color: hovered ? 'var(--color-white-ink)' : 'var(--color-parchment)',
        transition: 'color 0.2s',
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: 'Cinzel, serif',
        fontSize: '0.6rem',
        letterSpacing: '0.12em',
        color: danger
          ? (hovered ? 'var(--color-accent)' : 'rgba(139,0,0,0.6)')
          : (hovered ? 'var(--color-white-ink)' : 'var(--color-fog)'),
        textTransform: 'uppercase',
        transition: 'color 0.2s',
        whiteSpace: 'nowrap',
      }}>
        {value}
      </span>
    </div>
  )
}
