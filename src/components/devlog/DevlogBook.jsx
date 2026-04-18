import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ornementCoin from '../../assets/ornements/ornement_coin.png'
import ornementVignette from '../../assets/ornements/ornement_vignette.png'
import ornementBordure from '../../assets/ornements/ornement_bordure.png'
import devlogData from '../../data/devlog.json'
import TrophyNotification from '../ui/TrophyNotification.jsx'

const CORNERS = [
  { key: 'tl', style: { top: 0, left: 0 }, rotation: '0deg' },
  { key: 'tr', style: { top: 0, right: 0 }, rotation: '90deg' },
  { key: 'br', style: { bottom: 0, right: 0 }, rotation: '180deg' },
  { key: 'bl', style: { bottom: 0, left: 0 }, rotation: '270deg' },
]

function dispatchDevlog(trigger) {
  window.dispatchEvent(new CustomEvent('natsume:trigger', { detail: { trigger, scene: 'devlog' } }))
}

export default function DevlogBook() {
  const [selectedId, setSelectedId] = useState(devlogData[0]?.id ?? null)
  const [trophyVisible, setTrophyVisible] = useState(false)
  const trophyShownRef  = useRef(false)
  const readRef         = useRef(new Set([devlogData[0]?.id].filter(Boolean)))
  const allReadFiredRef = useRef(false)
  const scrollRef       = useRef({ lastTop: 0, lastTime: 0, cooldown: 0 })
  const selectedEntry = devlogData.find((e) => e.id === selectedId)

  const handleEntryClick = (id) => {
    setSelectedId(id)
    readRef.current.add(id)
    if (!allReadFiredRef.current && readRef.current.size >= devlogData.length) {
      allReadFiredRef.current = true
      dispatchDevlog('onAllDevlogRead')
    }
  }

  const handleScroll = (e) => {
    const el = e.currentTarget
    const now = Date.now()
    const s = scrollRef.current

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
    s.lastTop = el.scrollTop
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
    <>
      <div style={{
        display: 'flex',
        width: '780px',
        height: '520px',
        background: 'var(--color-ink)',
        border: '1px solid var(--color-ash)',
        position: 'relative',
        boxShadow: '0 0 40px rgba(0,0,0,0.8)',
      }}>
        {/* Bordures latérales extérieures */}
        <img
          src={ornementBordure}
          alt=""
          style={{
            position: 'absolute',
            left: '-22px',
            top: 0,
            height: '100%',
            width: '22px',
            objectFit: 'cover',
            objectPosition: 'right',
            mixBlendMode: 'multiply',
            opacity: 0.55,
            pointerEvents: 'none',
            zIndex: 3,
          }}
        />
        <img
          src={ornementBordure}
          alt=""
          style={{
            position: 'absolute',
            right: '-22px',
            top: 0,
            height: '100%',
            width: '22px',
            objectFit: 'cover',
            objectPosition: 'left',
            mixBlendMode: 'multiply',
            opacity: 0.55,
            transform: 'scaleX(-1)',
            pointerEvents: 'none',
            zIndex: 3,
          }}
        />

        {CORNERS.map(({ key, style, rotation }) => (
          <img
            key={key}
            src={ornementCoin}
            alt=""
            style={{
              position: 'absolute',
              width: '48px',
              transform: `rotate(${rotation})`,
              mixBlendMode: 'multiply',
              pointerEvents: 'none',
              zIndex: 2,
              ...style,
            }}
          />
        ))}

        {/* Page gauche — liste des entrées */}
        <div style={{
          flex: 1,
          padding: '3rem 2rem 3rem 3rem',
          borderRight: '1px solid var(--color-ash)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          overflow: 'hidden',
        }}>
          <h2 style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '1.1rem',
            letterSpacing: '0.15em',
            color: 'var(--color-parchment)',
            borderBottom: '1px solid var(--color-ash)',
            paddingBottom: '0.75rem',
          }}>
            Journal de Développement
          </h2>
          {devlogData.map((entry) => {
            const isSelected = entry.id === selectedId
            return (
              <div
                key={entry.id}
                onClick={() => handleEntryClick(entry.id)}
                style={{
                  fontSize: '0.8rem',
                  fontFamily: 'Cinzel, serif',
                  color: isSelected ? 'var(--color-white-ink)' : 'var(--color-fog)',
                  cursor: 'pointer',
                  paddingLeft: '0.75rem',
                  borderLeft: isSelected
                    ? '2px solid var(--color-parchment)'
                    : '2px solid transparent',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
              >
                <span style={{ color: isSelected ? 'var(--color-parchment)' : 'var(--color-fog)' }}>
                  {entry.date}
                </span>
                <br />
                {entry.title}
              </div>
            )
          })}
        </div>

        {/* Reliure centrale */}
        <div style={{ width: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={ornementVignette} alt="" style={{ width: '100%', mixBlendMode: 'multiply' }} />
        </div>

        {/* Page droite — contenu scrollable */}
        <div
          onScroll={handleScroll}
          style={{
            flex: 1.2,
            padding: '3rem 3rem 3rem 2rem',
            overflowY: 'auto',
            position: 'relative',
          }}
        >
          <AnimatePresence mode="wait">
            {selectedEntry && (
              <motion.div
                key={selectedEntry.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
                exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
              >
                <div style={{ borderBottom: '1px solid var(--color-ash)', paddingBottom: '0.75rem', marginBottom: '0.25rem' }}>
                  <h3 style={{
                    fontFamily: 'Cinzel, serif',
                    fontSize: '1rem',
                    color: 'var(--color-parchment)',
                    marginBottom: '0.25rem',
                  }}>
                    {selectedEntry.title}
                  </h3>
                  <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.7rem', color: 'var(--color-fog)', letterSpacing: '0.1em' }}>
                    {selectedEntry.date}
                  </span>
                </div>
                <p style={{
                  fontFamily: 'IM Fell English, serif',
                  fontSize: '0.9rem',
                  lineHeight: '1.8',
                  color: 'var(--color-white-ink)',
                }}>
                  {selectedEntry.content}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {trophyVisible && (
          <TrophyNotification
            title="Lecteur du Scriptorium"
            description="Tu as lu jusqu'au bout. Natsume a remarqué."
          />
        )}
      </AnimatePresence>
    </>
  )
}
