export default function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'absolute',
        top: '2rem',
        left: '2rem',
        zIndex: 10,
        background: 'transparent',
        border: '1px solid var(--color-fog)',
        color: 'var(--color-white-ink)',
        fontFamily: 'Cinzel, serif',
        padding: '0.5rem 1.2rem',
        cursor: 'pointer',
        letterSpacing: '0.1em',
      }}
    >
      ← Retour
    </button>
  )
}
