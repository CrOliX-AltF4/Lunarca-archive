import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import BooksContainer from '../books/BooksContainer.jsx'
import DustParticles from '../ui/DustParticles.jsx'
import bgLibrary from '../../assets/backgrounds/bg_library.webp'

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight']

const LORE_TEXT = [
  'Elle était là avant le premier combat.',
  'Elle sera là après le dernier.',
  'Non pas comme un souvenir — comme une certitude.',
]

const sceneVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8 } },
  exit: { opacity: 0, transition: { duration: 0.6 } },
}

export default function LibraryScene({ onNavigate }) {
  const [loreVisible, setLoreVisible] = useState(false)
  const sequenceRef = useRef([])

  useEffect(() => {
    const handleKey = (e) => {
      sequenceRef.current = [...sequenceRef.current, e.key].slice(-KONAMI.length)
      if (sequenceRef.current.join(',') === KONAMI.join(',')) {
        sequenceRef.current = []
        window.dispatchEvent(new CustomEvent('natsume:trigger', {
          detail: { trigger: 'easterEgg_konami', scene: 'library' },
        }))
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const handleNatsumeTripleClick = () => {
    window.dispatchEvent(new CustomEvent('natsume:trigger', {
      detail: { trigger: 'easterEgg_lys', scene: 'natsume' },
    }))
    setLoreVisible(true)
    setTimeout(() => setLoreVisible(false), 4000)
  }

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
        backgroundImage: `url(${bgLibrary})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
      }} />

      <DustParticles />

      {/* Titre hub */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.3 } }}
        style={{
          position: 'absolute',
          top: '8%',
          left: 0,
          right: 0,
          textAlign: 'center',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      >
        <h1 style={{
          fontFamily: 'Cinzel, serif',
          fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
          letterSpacing: '0.4em',
          color: 'var(--color-white-ink)',
          fontWeight: 400,
          textShadow: '0 0 30px rgba(0,0,0,0.9)',
        }}>
          Lun’Λrkhive
        </h1>
        <p style={{
          fontFamily: 'IM Fell English, serif',
          fontStyle: 'italic',
          fontSize: '0.9rem',
          color: 'var(--color-fog)',
          letterSpacing: '0.12em',
          marginTop: '0.6rem',
          textShadow: '0 1px 6px rgba(0,0,0,1), 0 0 3px rgba(0,0,0,1)',
        }}>
          Explorez des recits oubliés, scellés dans les pages du temps
        </p>
      </motion.div>

      {/* Instruction discrète */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{
          opacity: [null, 0.55, 0.95, 0.55],
          transition: {
            opacity: {
              duration: 3.5,
              delay: 1.4,
              repeat: Infinity,
              ease: 'easeInOut',
              times: [0, 0.2, 0.5, 1],
            },
          },
        }}
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'Cinzel, serif',
          fontSize: '0.75rem',
          letterSpacing: '0.3em',
          paddingLeft: '0.3em',
          color: 'var(--color-parchment)',
          textAlign: 'center',
          pointerEvents: 'none',
          zIndex: 2,
          textTransform: 'uppercase',
          textShadow: '0 0 12px rgba(0,0,0,1), 0 1px 8px rgba(0,0,0,1), 1px 0 6px rgba(0,0,0,1), -1px 0 6px rgba(0,0,0,1)',
          whiteSpace: 'nowrap',
        }}
      >
        Choisissez un ouvrage
      </motion.p>

      <BooksContainer onNavigate={onNavigate} onNatsumeTripleClick={handleNatsumeTripleClick} />

      <AnimatePresence>
        {loreVisible && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            style={{
              position: 'absolute',
              bottom: '14%',
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          >
            {LORE_TEXT.map((line, i) => (
              <p key={i} style={{
                fontFamily: 'IM Fell English, serif',
                fontStyle: 'italic',
                fontSize: '1rem',
                color: 'var(--color-parchment)',
                letterSpacing: '0.05em',
                lineHeight: '2',
                textShadow: '0 0 20px rgba(0,0,0,1)',
              }}>
                {line}
              </p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
