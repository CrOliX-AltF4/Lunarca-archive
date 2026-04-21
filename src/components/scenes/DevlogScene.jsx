import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import bgDevlog from '../../assets/backgrounds/bg_devlog.webp'
import bgBook from '../../assets/backgrounds/bg_book.webp'
import bookMementoOpen from '../../assets/books/book_memento_open.png'
import BackButton from '../ui/BackButton.jsx'
import DevlogBook from '../devlog/DevlogBook.jsx'
import styles from './DevlogScene.module.css'

/* ─── VUE BUREAU ─────────────────────────────────────────── */

function DeskView({ onOpenBook, onBack }) {
  return (
    <motion.div
      className={styles.deskScene}
      style={{ backgroundImage: `url(${bgDevlog})` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.7 } }}
      exit={{ opacity: 0, transition: { duration: 0.4, ease: 'easeIn' } }}
    >
      <div className={styles.overlay} />

      {/* Livre posé sur la table — wrapper CSS perspective, pas de float */}
      <div className={styles.bookOnDesk} onClick={onOpenBook}>
        <motion.div
          className={styles.deskPulse}
          animate={{ opacity: [0, 0.45, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.img
          src={bookMementoOpen}
          alt="Journal de développement — cliquer pour lire"
          className={styles.bookOnDeskImg}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1, delay: 0.4 } }}
        />
        <motion.p
          className={styles.bookHint}
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3.5, delay: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          Approchez-vous
        </motion.p>
      </div>

      <BackButton onClick={onBack} />
    </motion.div>
  )
}

/* ─── VUE LECTURE ────────────────────────────────────────── */

function ReadingView({ onClose }) {
  return (
    <motion.div
      className={styles.readingScene}
      style={{ backgroundImage: `url(${bgBook})` }}
      initial={{ opacity: 0, scale: 1.06 }}
      animate={{ opacity: 1, scale: 1, transition: { duration: 0.55 } }}
      exit={{ opacity: 0, transition: { duration: 0.35 } }}
    >
      <DevlogBook onClose={onClose} />
    </motion.div>
  )
}

/* ─── COMPOSANT PRINCIPAL ────────────────────────────────── */

export default function DevlogScene({ onBack, onViewChange }) {
  const [view, setView] = useState('desk')

  useEffect(() => {
    onViewChange?.(view === 'reading')
    return () => onViewChange?.(false)
  }, [view, onViewChange])

  return (
    <motion.div
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
    >
      <AnimatePresence mode="wait">
        {view === 'desk' && (
          <DeskView
            key="desk"
            onOpenBook={() => setView('reading')}
            onBack={onBack}
          />
        )}
        {view === 'reading' && (
          <ReadingView
            key="reading"
            onClose={() => setView('desk')}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
