import { useMemo } from 'react'

export default function DustParticles({ count = 35 }) {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 90,
      size: Math.random() * 1.8 + 0.4,
      duration: Math.random() * 10 + 8,
      delay: -(Math.random() * 18),
      opacity: Math.random() * 0.22 + 0.04,
    }))
  , [count])

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            background: 'var(--color-white-ink)',
            opacity: p.opacity,
            animation: `floatDust ${p.duration}s ${p.delay}s infinite ease-in-out`,
          }}
        />
      ))}
    </div>
  )
}
