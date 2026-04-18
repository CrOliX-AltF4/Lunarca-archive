import { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const RUNE_LINKS = [
  {
    id: 'github',
    runes: 'ᚷᛁᛏᚺᚢᛒ',
    label: 'GitHub',
    category: 'Archives',
    description: 'Archives du code source. Chaque commit, une pierre gravée dans le temps.',
    href: 'https://github.com/CrOliX-AltF4/',
  },
  {
    id: 'twitter',
    runes: 'ᛏᚹᛁᛏᛏᛖᚱ',
    label: 'Twitter / X',
    category: 'Transmissions',
    description: 'Transmissions brèves. Pensées qui traversent le voile.',
    href: 'https://x.com/NatsumeTsurugi',
  },
  {
    id: 'twitch',
    runes: 'ᛏᚹᛁᛏᚳᚺ',
    label: 'Twitch',
    category: 'Flux en direct',
    description: 'Là où le projet prend vie. Séances de création, en temps réel.',
    href: 'https://twitch.tv/natsumetsurugi',
  },
  {
    id: 'discord',
    runes: 'ᛞᛁᛋᚳᚩᚱᛞ',
    label: 'CrOliχ',
    category: 'Contact direct',
    description: 'Présence fragmentée dans le vide numérique. Une voix accessible derrière le sceau.',
    discord: { tag: '4nne_0nyme', pseudo: 'CrOliχ' },
  },
]

function dispatch(trigger, scene = 'contact') {
  window.dispatchEvent(new CustomEvent('natsume:trigger', { detail: { trigger, scene } }))
}

export default function RuneStele() {
  const [activeId, setActiveId] = useState(null)
  const firstClickFiredRef = useRef(false)
  const clickedLinksRef    = useRef(new Set())
  const active = RUNE_LINKS.find((l) => l.id === activeId)

  const handleToggle = (id, e) => {
    e.stopPropagation()
    if (!firstClickFiredRef.current) {
      firstClickFiredRef.current = true
      dispatch('onFirstRuneClick')
    }
    setActiveId(activeId === id ? null : id)
  }

  const handleLinkClick = (id) => {
    const triggerMap = {
      github:  'onLinkClick_github',
      twitter: 'onLinkClick_twitter',
      twitch:  'onLinkClick_twitch',
    }
    if (triggerMap[id]) dispatch(triggerMap[id])

    clickedLinksRef.current.add(id)
    const allIds = RUNE_LINKS.filter((l) => !l.discord).map((l) => l.id)
    if (allIds.every((id) => clickedLinksRef.current.has(id))) {
      dispatch('onAllLinksClicked')
    }
  }

  return (
    <>
      <div
        style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.8rem' }}
        onClick={() => setActiveId(null)}
      >
        {RUNE_LINKS.map((link) => (
          <RuneLine
            key={link.id}
            link={link}
            isActive={activeId === link.id}
            onToggle={(e) => handleToggle(link.id, e)}
            onHover={() => dispatch('onRuneHover')}
          />
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <ItemPanel
            key={active.id}
            link={active}
            onClose={() => setActiveId(null)}
            onLinkClick={() => handleLinkClick(active.id)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

function RuneLine({ link, isActive, onToggle, onHover }) {
  return (
    <motion.button
      onClick={onToggle}
      onHoverStart={onHover}
      animate={{
        color: isActive ? 'rgba(232,228,220,0.88)' : 'rgba(232,228,220,0.36)',
        textShadow: isActive
          ? '1px 1px 3px rgba(0,0,0,0.95), -1px -1px 3px rgba(0,0,0,0.95), 0 0 16px rgba(245,243,239,0.3)'
          : '1px 1px 4px rgba(0,0,0,0.98), -1px -1px 4px rgba(0,0,0,0.98), 0 2px 6px rgba(0,0,0,0.98)',
      }}
      whileHover={{
        color: 'rgba(232,228,220,0.65)',
        textShadow: '1px 1px 4px rgba(0,0,0,0.95), -1px -1px 4px rgba(0,0,0,0.95), 0 0 12px rgba(245,243,239,0.2)',
        scale: 1.03,
        transition: { duration: 0.15 },
      }}
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'Cinzel, serif',
        fontSize: '2rem',
        letterSpacing: '0.9em',
        paddingLeft: '0.9em',
        display: 'block',
      }}
    >
      {link.runes}
    </motion.button>
  )
}

function ItemPanel({ link, onClose, onLinkClick }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(link.discord.tag)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.25 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.55)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: [0.2, 0, 0.2, 1] } }}
        exit={{ opacity: 0, y: 10, scale: 0.97, transition: { duration: 0.2 } }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(500px, 82vw)',
          background: 'rgba(4,4,4,0.96)',
          border: '1px solid rgba(245,243,239,0.1)',
          padding: '3rem 3.5rem 2.5rem',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        {/* Catégorie */}
        <p style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '0.6rem',
          letterSpacing: '0.35em',
          paddingLeft: '0.35em',
          color: 'rgba(245,243,239,0.38)',
          marginBottom: '0.8rem',
          textTransform: 'uppercase',
        }}>
          {link.category}
        </p>

        {/* Titre */}
        <h2 style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '1.5rem',
          fontWeight: 400,
          color: 'rgba(245,243,239,0.92)',
          marginBottom: '1.4rem',
          letterSpacing: '0.08em',
        }}>
          {link.label}
        </h2>

        {/* Séparateur */}
        <div style={{
          width: '3rem',
          height: '1px',
          background: 'rgba(245,243,239,0.18)',
          margin: '0 auto 1.6rem',
        }} />

        {/* Description */}
        <p style={{
          fontFamily: 'IM Fell English, serif',
          fontStyle: 'italic',
          fontSize: '0.88rem',
          color: 'rgba(245,243,239,0.6)',
          lineHeight: 1.85,
          marginBottom: '2.2rem',
        }}>
          {link.description}
        </p>

        {/* Discord — tag à copier */}
        {link.discord && (
          <p style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '0.72rem',
            letterSpacing: '0.1em',
            color: 'rgba(245,243,239,0.45)',
            marginBottom: '1.4rem',
          }}>
            {link.discord.tag}
          </p>
        )}

        {/* Bouton action avec coins */}
        {link.discord ? (
          <CornerButton
            label={copied ? '✓  Tag copié' : '→  Copier le tag'}
            onClick={handleCopy}
            muted={copied}
          />
        ) : (
          <CornerButton
            label="→  Accéder"
            href={link.href}
            onNavigate={onLinkClick}
          />
        )}
      </motion.div>
    </motion.div>
  )
}

function CornerButton({ label, href, onClick, onNavigate, muted }) {
  const base = {
    position: 'relative',
    display: 'inline-block',
    fontFamily: 'Cinzel, serif',
    fontSize: '0.72rem',
    letterSpacing: '0.2em',
    paddingLeft: '0.2em',
    color: muted ? 'rgba(180,220,170,0.85)' : 'rgba(245,243,239,0.75)',
    padding: '0.65rem 2rem',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: 'color 0.3s',
  }

  const corners = (
    <>
      <span style={{ position:'absolute', top:0,    left:0,  width:10, height:10, borderTop:`1px solid rgba(245,243,239,${muted?'0.4':'0.5'})`,  borderLeft:`1px solid rgba(245,243,239,${muted?'0.4':'0.5'})` }} />
      <span style={{ position:'absolute', top:0,    right:0, width:10, height:10, borderTop:`1px solid rgba(245,243,239,${muted?'0.4':'0.5'})`,  borderRight:`1px solid rgba(245,243,239,${muted?'0.4':'0.5'})` }} />
      <span style={{ position:'absolute', bottom:0, left:0,  width:10, height:10, borderBottom:`1px solid rgba(245,243,239,${muted?'0.4':'0.5'})`, borderLeft:`1px solid rgba(245,243,239,${muted?'0.4':'0.5'})` }} />
      <span style={{ position:'absolute', bottom:0, right:0, width:10, height:10, borderBottom:`1px solid rgba(245,243,239,${muted?'0.4':'0.5'})`, borderRight:`1px solid rgba(245,243,239,${muted?'0.4':'0.5'})` }} />
    </>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={onNavigate} style={{ ...base, textDecoration: 'none' }}>
        {corners}
        {label}
      </a>
    )
  }
  return (
    <button onClick={onClick} style={base}>
      {corners}
      {label}
    </button>
  )
}
