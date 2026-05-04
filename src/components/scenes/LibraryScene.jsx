import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import BooksContainer from '../books/BooksContainer.jsx'
import DustParticles from '../ui/DustParticles.jsx'
import bgLibrary from '../../assets/backgrounds/bg_library.webp'
import styles from './LibraryScene.module.css'

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
      className={styles.scene}
      style={{ backgroundImage: `url(${bgLibrary})` }}
    >
      <div className={styles.vignette} />

      <DustParticles />

      <motion.div
        className={styles.titleBlock}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.3 } }}
      >
        <h1 className={styles.hubTitle}>Lun'Λrkhive</h1>
        <p className={styles.hubSub}>
          Explorez des récits oubliés, scellés dans les pages du temps
        </p>
      </motion.div>

      <motion.p
        className={styles.hint}
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
      >
        Choisissez un ouvrage
      </motion.p>

      <BooksContainer onNavigate={onNavigate} onNatsumeTripleClick={handleNatsumeTripleClick} />

      <AnimatePresence>
        {loreVisible && (
          <motion.div
            className={styles.loreOverlay}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            {LORE_TEXT.map((line, i) => (
              <p key={i} className={styles.loreLine}>{line}</p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
