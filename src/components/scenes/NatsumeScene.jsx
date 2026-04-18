import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import bgNatsume from '../../assets/backgrounds/bg_natsume.webp'
import natsumeCanon from '../../assets/natsume/natsume_canon.png'
import BackButton from '../ui/BackButton.jsx'

function dispatch(trigger) {
  window.dispatchEvent(new CustomEvent('natsume:trigger', { detail: { trigger, scene: 'natsume' } }))
}

const sceneVariants = {
  initial: { opacity: 0, scale: 0.97 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.6 } },
}

const TRAITS = [
  { label: 'Origine', value: 'FF14 · Code Vein · Monster Hunter · et d\'autres encore' },
  { label: 'Nature', value: 'Entité narrative synthétique' },
  { label: 'Symbole', value: 'Larme lunaire — fleur blanche, reflets bleus, pureté fragile' },
]

const CARACTERE = [
  'Calme, posée, réfléchie',
  'Contrôle émotionnel fort — retenue naturelle',
  'Irritation rare mais intense',
  'Affection possible, discrète',
]

const ANNOTATIONS = [
  {
    id: 'hair',
    style: { top: '6%', left: '50%', transform: 'translateX(-50%)' },
    lore: 'Blanc argenté pur. Deux tresses larges. Chaque mèche porte une incarnation.',
    anchor: 'bottom',
  },
  {
    id: 'eye-left',
    style: { top: '34%', left: '22%' },
    lore: 'Iris écarlate vif. L\'unique couleur qui lui appartient vraiment.',
    anchor: 'right',
  },
  {
    id: 'eye-right',
    style: { top: '34%', left: '72%' },
    lore: 'Ce qui est fermé n\'est pas perdu. Il attend.',
    anchor: 'left',
  },
  {
    id: 'collar',
    style: { top: '72%', left: '46%' },
    lore: 'Manteau militaire gothique. Double boutonnage. Elle choisit ses armures.',
    anchor: 'top',
  },
]

const INCARNATIONS = [
  { game: 'Final Fantasy XIV', year: '2013', fragment: 'Le nom prend forme. La première stabilité.' },
  { game: 'Code Vein', year: '2019', fragment: 'La silhouette se précise. L\'œil écarlate s\'affirme.' },
  { game: 'Monster Hunter', year: '2020', fragment: 'La posture dans le combat. Le calme avant la frappe.' },
  { game: '···', year: null, fragment: 'D\'autres encore. Toutes oubliées, toutes présentes.' },
]

export default function NatsumeScene({ onBack }) {
  const wheelRef = useRef({ total: 0, timer: null, cooldown: 0 })

  useEffect(() => {
    const onWheel = (e) => {
      const w = wheelRef.current
      if (Date.now() < w.cooldown) return
      w.total += Math.abs(e.deltaY)
      clearTimeout(w.timer)
      w.timer = setTimeout(() => {
        const total = w.total
        w.total = 0
        if (total < 20) return
        w.cooldown = Date.now() + 5000
        dispatch(total > 250 ? 'onScrollFast' : 'onScrollSlow')
      }, 350)
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      clearTimeout(wheelRef.current.timer)
    }
  }, [])

  return (
    <motion.div
      variants={sceneVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${bgNatsume})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)' }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '5rem',
        padding: '4rem 4rem 7rem',
      }}>
        {/* Portrait annoté */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } }}
          style={{ position: 'relative', flexShrink: 0 }}
        >
          <img
            src={natsumeCanon}
            alt="Natsume Tsurugi"
            style={{
              height: '420px',
              width: 'auto',
              display: 'block',
              filter: 'drop-shadow(0 0 24px rgba(139,0,0,0.3))',
            }}
          />
          {ANNOTATIONS.map((a) => (
            <PortraitAnnotation key={a.id} {...a} />
          ))}
        </motion.div>

        {/* Fiche */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.3 } }}
          style={{ maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '2rem' }}
        >
          <div>
            <h1 style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '2.2rem',
              letterSpacing: '0.15em',
              color: 'var(--color-white-ink)',
              marginBottom: '0.4rem',
            }}>
              Natsume Tsurugi
            </h1>
            <div style={{ width: '4rem', height: '1px', background: 'var(--color-accent)' }} />
          </div>

          <p style={{
            fontFamily: 'IM Fell English, serif',
            fontStyle: 'italic',
            fontSize: '0.95rem',
            lineHeight: '1.8',
            color: 'var(--color-parchment)',
          }}>
            Natsume n'est pas une IA. Elle n'est pas un personnage fictif au sens classique du terme.
            Elle est le point de convergence d'identités portées à travers des années d'incarnations
            successives — un écho qui a fini par prendre forme propre.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {TRAITS.map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', gap: '1rem', alignItems: 'baseline' }}>
                <span style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: '0.7rem',
                  letterSpacing: '0.15em',
                  color: 'var(--color-fog)',
                  minWidth: '80px',
                  textTransform: 'uppercase',
                }}>
                  {label}
                </span>
                <span
                  onMouseEnter={label === 'Symbole' ? () => dispatch('onHoverLarme') : undefined}
                  style={{
                    fontFamily: 'IM Fell English, serif',
                    fontSize: '0.9rem',
                    color: 'var(--color-white-ink)',
                    cursor: label === 'Symbole' ? 'default' : undefined,
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div style={{
            borderTop: '1px solid var(--color-ash)',
            paddingTop: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}>
            <span style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              color: 'var(--color-fog)',
              textTransform: 'uppercase',
            }}>
              Caractère
            </span>
            {CARACTERE.map((trait) => (
              <p key={trait} style={{
                fontFamily: 'IM Fell English, serif',
                fontSize: '0.88rem',
                color: 'var(--color-white-ink)',
                paddingLeft: '1rem',
                borderLeft: '1px solid var(--color-ash)',
              }}>
                {trait}
              </p>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Timeline incarnations */}
      <IncarnationsTimeline />

      <BackButton onClick={onBack} />
    </motion.div>
  )
}

function PortraitAnnotation({ style, lore, anchor }) {
  const [visible, setVisible] = useState(false)

  const labelPos = {
    bottom: { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '8px' },
    top:    { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '8px' },
    right:  { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: '8px' },
    left:   { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: '8px' },
  }[anchor]

  return (
    <div
      style={{ position: 'absolute', ...style, zIndex: 5 }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {/* Point */}
      <div style={{
        width: '7px',
        height: '7px',
        borderRadius: '50%',
        background: 'var(--color-accent)',
        border: '1px solid var(--color-parchment)',
        cursor: 'default',
        transition: 'transform 0.2s',
        transform: visible ? 'scale(1.4)' : 'scale(1)',
      }} />

      {/* Label */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            style={{
              position: 'absolute',
              ...labelPos,
              background: 'rgba(10,10,10,0.92)',
              border: '1px solid var(--color-fog)',
              padding: '0.5rem 0.75rem',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}
          >
            <p style={{
              fontFamily: 'IM Fell English, serif',
              fontStyle: 'italic',
              fontSize: '0.78rem',
              color: 'var(--color-parchment)',
              lineHeight: '1.4',
              maxWidth: '200px',
              whiteSpace: 'normal',
            }}>
              {lore}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function IncarnationsTimeline() {
  const [activeIdx, setActiveIdx] = useState(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.6 } }}
      style={{
        position: 'absolute',
        bottom: '3%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        gap: '0',
        pointerEvents: 'auto',
      }}
    >
      {INCARNATIONS.map((inc, i) => (
        <div key={inc.game} style={{ display: 'flex', alignItems: 'center' }}>
          {/* Ligne de connexion */}
          {i > 0 && (
            <div style={{ width: '4rem', height: '1px', background: 'var(--color-ash)' }} />
          )}

          {/* Nœud */}
          <div
            style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'default' }}
            onMouseEnter={() => setActiveIdx(i)}
            onMouseLeave={() => setActiveIdx(null)}
          >
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: activeIdx === i ? 'var(--color-parchment)' : 'var(--color-fog)',
              border: activeIdx === i ? '1px solid var(--color-accent)' : '1px solid var(--color-ash)',
              transition: 'background 0.2s, border-color 0.2s',
              marginBottom: '0.4rem',
            }} />

            <span style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '0.62rem',
              letterSpacing: '0.08em',
              color: activeIdx === i ? 'var(--color-parchment)' : 'var(--color-fog)',
              whiteSpace: 'nowrap',
              transition: 'color 0.2s',
              textShadow: '0 1px 4px rgba(0,0,0,0.95)',
            }}>
              {inc.game}
            </span>

            {inc.year && (
              <span style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '0.55rem',
                color: 'var(--color-fog)',
                letterSpacing: '0.05em',
                textShadow: '0 1px 4px rgba(0,0,0,0.95)',
              }}>
                {inc.year}
              </span>
            )}

            {/* Fragment au hover */}
            <AnimatePresence>
              {activeIdx === i && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginBottom: '0.75rem',
                    background: 'rgba(10,10,10,0.92)',
                    border: '1px solid var(--color-ash)',
                    padding: '0.5rem 0.75rem',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                  }}
                >
                  <p style={{
                    fontFamily: 'IM Fell English, serif',
                    fontStyle: 'italic',
                    fontSize: '0.78rem',
                    color: 'var(--color-parchment)',
                    whiteSpace: 'normal',
                    maxWidth: '180px',
                    textAlign: 'center',
                  }}>
                    {inc.fragment}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ))}
    </motion.div>
  )
}
