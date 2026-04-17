import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const RUNE_LINKS = [
  {
    id: 'github',
    runes: 'ᚷᛁᛏᚺᚢᛒ',
    label: 'GitHub',
    description: 'Les archives du code source. Chaque commit, une pierre gravée.',
    href: 'https://github.com/',
  },
  {
    id: 'twitter',
    runes: 'ᛏᚹᛁᛏᛏᛖᚱ',
    label: 'Twitter / X',
    description: 'Transmissions brèves. Pensées qui traversent le voile.',
    href: 'https://twitter.com/',
  },
  {
    id: 'twitch',
    runes: 'ᛏᚹᛁᛏᚳᚺ',
    label: 'Twitch',
    description: 'Flux en direct. Là où le projet prend vie.',
    href: 'https://twitch.tv/',
  },
]

export default function RuneStele() {
  const [activeLink, setActiveLink] = useState(null)

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        padding: '3rem 4rem',
        border: '1px solid var(--color-fog)',
        background: 'rgba(10,10,10,0.7)',
        minWidth: '320px',
        alignItems: 'center',
      }}>
        <h2 style={{ fontFamily: 'Cinzel, serif', letterSpacing: '0.2em', fontSize: '1rem', color: 'var(--color-parchment)' }}>
          ᛋᛏᛖᛚᛖ ᛞᚢ ᚳᛟᚾᛏᚪᚳᛏ
        </h2>
        <div style={{ width: '100%', height: '1px', background: 'var(--color-fog)' }} />

        {RUNE_LINKS.map((link) => (
          <RuneLine
            key={link.id}
            link={link}
            isActive={activeLink === link.id}
            onToggle={() => setActiveLink(activeLink === link.id ? null : link.id)}
          />
        ))}
      </div>

      <AnimatePresence>
        {activeLink && (
          <Parchment link={RUNE_LINKS.find((l) => l.id === activeLink)} />
        )}
      </AnimatePresence>
    </div>
  )
}

function RuneLine({ link, isActive, onToggle }) {
  return (
    <button
      onClick={onToggle}
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'Cinzel, serif',
        fontSize: '1.5rem',
        letterSpacing: '0.3em',
        color: isActive ? 'var(--color-white-ink)' : 'var(--color-fog)',
        transition: 'color 0.3s',
        padding: '0.25rem 0',
      }}
    >
      {link.runes}
    </button>
  )
}

function Parchment({ link }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
      exit={{ opacity: 0, y: 8, transition: { duration: 0.2 } }}
      style={{
        position: 'absolute',
        top: 'calc(100% + 1rem)',
        background: 'var(--color-stone)',
        border: '1px solid var(--color-fog)',
        padding: '1.25rem 1.75rem',
        minWidth: '280px',
        textAlign: 'center',
      }}
    >
      <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.9rem', color: 'var(--color-parchment)', marginBottom: '0.5rem' }}>
        {link.label}
      </p>
      <p style={{ fontFamily: 'IM Fell English, serif', fontSize: '0.85rem', color: 'var(--color-white-ink)', lineHeight: '1.6', marginBottom: '1rem' }}>
        {link.description}
      </p>
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          color: 'var(--color-accent)',
          textDecoration: 'none',
        }}
      >
        → Accéder
      </a>
    </motion.div>
  )
}
