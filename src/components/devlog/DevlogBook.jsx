import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import styles from './DevlogBook.module.css'
import useBookAnimation from '../../hooks/useBookAnimation.js'
import bookMementoOpen from '../../assets/books/book_memento_open.png'
import devlogData      from '../../data/devlog.json'
import TrophyNotification from '../ui/TrophyNotification.jsx'

function dispatchDevlog(trigger) {
  window.dispatchEvent(new CustomEvent('natsume:trigger', { detail: { trigger, scene: 'devlog' } }))
}

/* ─── SOUS-COMPOSANTS ─────────────────────────────────────── */

function SummaryPage({ onSelect }) {
  return (
    <>
      <h2 className={styles.summaryTitle}>Journal de<br />Développement</h2>
      <div className={styles.summaryDivider} />
      <ul className={styles.summaryList}>
        {devlogData.map((entry) => (
          <li key={entry.id} className={styles.summaryEntry} onClick={() => onSelect(entry)}>
            <span className={styles.summaryEntryDate}>{entry.date}</span>
            <span className={styles.summaryEntryTitle}>{entry.title}</span>
          </li>
        ))}
      </ul>
    </>
  )
}

function SummaryIllustration() {
  return (
    <div className={styles.illustration}>
      <p className={styles.illustrationQuote}>Chaque entrée a coûté quelque chose.</p>
    </div>
  )
}

function EntryMeta({ entry, onSelect, activeId }) {
  return (
    <div className={styles.entryMeta}>
      <span className={styles.entryMetaDate}>{entry.date}</span>
      <h3 className={styles.entryMetaTitle}>{entry.title}</h3>
      <div className={styles.entryMetaDivider} />
      <nav className={styles.entryMetaNav}>
        {devlogData.map((e) => (
          <button
            key={e.id}
            className={`${styles.entryNavItem} ${e.id === activeId ? styles.active : ''}`}
            onClick={() => onSelect(e)}
          >
            {e.title}
          </button>
        ))}
      </nav>
    </div>
  )
}

function EntryContent({ entry, onScroll }) {
  return (
    <div className={styles.entryContentWrap} onScroll={onScroll}>
      <p className={styles.entryContent}>{entry.content}</p>
    </div>
  )
}

/* ─── COMPOSANT PRINCIPAL ─────────────────────────────────── */

export default function DevlogBook({ onClose }) {
  const [bookState, setBookState]     = useState('ENCODED')
  const [activeEntry, setActiveEntry] = useState(null)
  const [trophyVisible, setTrophyVisible] = useState(false)

  const trophyShownRef  = useRef(false)
  const readRef         = useRef(new Set())
  const allReadFiredRef = useRef(false)
  const scrollRef       = useRef({ lastTop: 0, lastTime: 0, cooldown: 0 })

  useBookAnimation(bookState, setBookState)

  const handleDecipher = () => {
    dispatchDevlog('onDevlogOpen')
    setBookState('DECODING')
  }

  const handleSelect = (entry) => {
    setActiveEntry(entry)
    setBookState('READING')
    readRef.current.add(entry.id)
    if (!allReadFiredRef.current && readRef.current.size >= devlogData.length) {
      allReadFiredRef.current = true
      dispatchDevlog('onAllDevlogRead')
    }
  }

  const handleScroll = (e) => {
    const el  = e.currentTarget
    const now = Date.now()
    const s   = scrollRef.current
    if (now > s.cooldown) {
      const elapsed = now - s.lastTime
      if (elapsed > 0 && elapsed < 500) {
        const speed = Math.abs(el.scrollTop - s.lastTop) / elapsed
        if (speed > 1.2) {
          s.cooldown = now + 5000
          dispatchDevlog('onScrollFast')
        }
      }
    }
    s.lastTop  = el.scrollTop
    s.lastTime = now

    if (trophyShownRef.current) return
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 8
    if (atBottom) {
      trophyShownRef.current = true
      setTrophyVisible(true)
      setTimeout(() => setTrophyVisible(false), 4000)
    }
  }

  return (
    <div className={styles.scene}>

      <motion.div
        className={styles.bookContainer}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
      >
        {/* Spread asset — définit la hauteur du conteneur */}
        <img src={bookMementoOpen} className={styles.bookSpread} alt="" />

        {/* Pulse continu en état ENCODED */}
        {bookState === 'ENCODED' && (
          <motion.div
            className={styles.runeGlowPulse}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {/* Zone cliquable ENCODED — au-dessus de tout sauf overlays/nav */}
        {bookState === 'ENCODED' && (
          <div className={styles.bookEncoded} onClick={handleDecipher} />
        )}

        {/* Overlays texte — SUMMARY / READING */}
        {(bookState === 'SUMMARY' || bookState === 'READING') && (
          <AnimatePresence>
            <motion.div
              key="page-overlays"
              className={styles.overlays}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.6 } }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
            >
              <div className={styles.pageLeft}>
                <AnimatePresence mode="wait">
                  {bookState === 'SUMMARY' && (
                    <motion.div key="sl" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.35 } }} exit={{ opacity: 0 }} style={{ height: '100%' }}>
                      <SummaryPage onSelect={handleSelect} />
                    </motion.div>
                  )}
                  {bookState === 'READING' && activeEntry && (
                    <motion.div key={`m${activeEntry.id}`} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.35 } }} exit={{ opacity: 0 }} style={{ height: '100%' }}>
                      <EntryMeta entry={activeEntry} onSelect={handleSelect} activeId={activeEntry.id} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className={styles.pageRight}>
                <AnimatePresence mode="wait">
                  {bookState === 'SUMMARY' && (
                    <motion.div key="sr" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.15 } }} exit={{ opacity: 0 }} style={{ height: '100%' }}>
                      <SummaryIllustration />
                    </motion.div>
                  )}
                  {bookState === 'READING' && activeEntry && (
                    <motion.div key={`c${activeEntry.id}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.35 } }} exit={{ opacity: 0, y: -6 }} style={{ height: '100%' }}>
                      <EntryContent entry={activeEntry} onScroll={handleScroll} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Navigation — hors overlays, z-index propre */}
        {(bookState === 'SUMMARY' || bookState === 'READING') && (
          <div className={styles.nav}>
            {bookState === 'READING' && (
              <button className={styles.navBtn} onClick={() => setBookState('SUMMARY')}>
                ← Sommaire
              </button>
            )}
            <button className={styles.navBtn} onClick={onClose}>
              Fermer
            </button>
          </div>
        )}

      </motion.div>

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
