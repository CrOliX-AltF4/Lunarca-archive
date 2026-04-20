import { useState } from 'react'

export default function BackButton({ onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'absolute',
        top: '3rem',
        left: '60px',
        zIndex: 10,
        background: hovered ? 'rgba(232,228,220,0.06)' : 'transparent',
        border: `1px solid ${hovered ? 'var(--color-parchment)' : 'var(--color-fog)'}`,
        color: hovered ? 'var(--color-parchment)' : 'var(--color-fog)',
        fontFamily: 'Cinzel, serif',
        fontSize: '0.72rem',
        letterSpacing: '0.15em',
        padding: '0.5rem 1.2rem',
        cursor: 'pointer',
        transition: 'background 0.2s, border-color 0.2s, color 0.2s',
      }}
    >
      ← Retour
    </button>
  )
}
