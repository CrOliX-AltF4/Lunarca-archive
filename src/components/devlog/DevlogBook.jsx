import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import styles from './DevlogBook.module.css'
import devlogData from '../../data/devlog.json'
import TrophyNotification from '../ui/TrophyNotification.jsx'

function dispatchDevlog(trigger) {
  window.dispatchEvent(new CustomEvent('natsume:trigger', { detail: { trigger, scene: 'devlog' } }))
}

const pageVariants = {
  enter: (dir) => ({ x: dir >= 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir) => ({ x: dir >= 0 ? -40 : 40, opacity: 0 }),
}
const pageTransition = { duration: 0.3, ease: 'easeInOut' }

/* ─── SOMMAIRE ────────────────────────────────────────────── */

function SummaryLeft({ onSelect }) {
  return (
    <div className={styles.summaryLeft}>
      <h2 className={styles.summaryTitle}>Journal de<br />Développement</h2>
      <div className={styles.summaryDivider} />
      <ul className={styles.summaryList}>
        {devlogData.map((entry, i) => (
          <li key={entry.id} className={styles.summaryEntry} onClick={() => onSelect(entry, i)}>
            <span className={styles.summaryEntryNum}>0{entry.id}</span>
            <span className={styles.summaryEntryTitle}>{entry.title}</span>
            <span className={styles.summaryEntryDate}>{entry.date}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SummaryRight() {
  return (
    <div className={styles.summaryRight}>
      <p className={styles.summaryQuote}>Chaque entrée<br />a coûté quelque chose.</p>
    </div>
  )
}

/* ─── COMPOSANT PRINCIPAL ─────────────────────────────────── */

export default function DevlogBook({ onClose }) {
  const [bookState, setBookState]     = useState('SUMMARY')
  const [activeEntry, setActiveEntry] = useState(null)
  const [activeIdx, setActiveIdx]     = useState(-1)
  const [direction, setDirection]     = useState(1)
  const [trophyVisible, setTrophyVisible] = useState(false)

  const trophyShownRef  = useRef(false)
  const readRef         = useRef(new Set())
  const allReadFiredRef = useRef(false)

  const openEntry = (entry, idx, dir = 1) => {
    setDirection(dir)
    setActiveEntry(entry)
    setActiveIdx(idx)
    setBookState('READING')
    readRef.current.add(entry.id)
    if (!allReadFiredRef.current && readRef.current.size >= devlogData.length) {
      allReadFiredRef.current = true
      dispatchDevlog('onAllDevlogRead')
    }
  }

  const handleBackToSummary = () => { setDirection(-1); setBookState('SUMMARY') }
  const goNext = () => { if (activeIdx < devlogData.length - 1) openEntry(devlogData[activeIdx + 1], activeIdx + 1, 1) }
  const goPrev = () => { if (activeIdx > 0) openEntry(devlogData[activeIdx - 1], activeIdx - 1, -1) }

  const hasPrev = bookState === 'READING' && activeIdx > 0
  const hasNext = bookState === 'READING' && activeIdx < devlogData.length - 1

  return (
    <div className={styles.overlay}>

      {/* ── SOMMAIRE — pages séparées ── */}
      {bookState === 'SUMMARY' && (
        <>
          <div className={styles.pageLeft}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div key="sl" custom={direction} variants={pageVariants}
                initial="enter" animate="center" exit="exit"
                transition={pageTransition} style={{ height: '100%' }}>
                <SummaryLeft onSelect={(e, i) => openEntry(e, i, 1)} />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className={styles.pageRight}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div key="sr" custom={direction} variants={pageVariants}
                initial="enter" animate="center" exit="exit"
                transition={{ ...pageTransition, delay: 0.06 }} style={{ height: '100%' }}>
                <SummaryRight />
              </motion.div>
            </AnimatePresence>
          </div>
        </>
      )}

      {/* ── LECTURE — spread 2 colonnes ── */}
      {bookState === 'READING' && (
        <AnimatePresence mode="wait" custom={direction}>
          {activeEntry && (
            <motion.div
              key={`spread${activeEntry.id}`}
              className={styles.entrySpread}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={pageTransition}
            >
              {/* En-tête : break-inside avoid pour ne jamais couper sur 2 colonnes */}
              <div className={styles.entrySpreadHeader}>
                <span className={styles.entryNum}>
                  Entrée {activeIdx + 1} / {devlogData.length}
                </span>
                <span className={styles.entryDate}>{activeEntry.date}</span>
                <h3 className={styles.entryTitle}>{activeEntry.title}</h3>
                <div className={styles.entryDivider} />
              </div>
              {/* Contenu — coule naturellement vers la 2e colonne */}
              {activeEntry.content.split('\n\n').filter(Boolean).map((p, i) => (
                <p key={i} className={styles.entryContent}>{p}</p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* ── Navigation bas de page ── */}
      <div className={styles.navLeft}>
        {bookState === 'READING' && <button className={styles.navBtn} onClick={handleBackToSummary}>Sommaire</button>}
        {hasPrev && <button className={styles.navBtn} onClick={goPrev}>← Précédent</button>}
      </div>
      <div className={styles.navRight}>
        {hasNext && <button className={styles.navBtn} onClick={goNext}>Suivant →</button>}
        <button className={styles.navBtnClose} onClick={onClose}>Fermer</button>
      </div>

      <AnimatePresence>
        {trophyVisible && (
          <TrophyNotification
            title="Lecteur du Scriptorium"
            description="Tu as lu jusqu'au bout. Natsume a remarqué."
          />
        )}
      </AnimatePresence>

    </div>
  )
}
