import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)

  const sx = useSpring(mx, { stiffness: 160, damping: 18, mass: 0.5 })
  const sy = useSpring(my, { stiffness: 160, damping: 18, mass: 0.5 })

  useEffect(() => {
    const move = (e) => { mx.set(e.clientX); my.set(e.clientY) }
    window.addEventListener('mousemove', move)
    document.documentElement.style.cursor = 'none'
    return () => {
      window.removeEventListener('mousemove', move)
      document.documentElement.style.cursor = ''
    }
  }, [mx, my])

  return (
    <>
      {/* Point central — suit exactement */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0, left: 0,
          x: mx,
          y: my,
          translateX: '-50%',
          translateY: '-50%',
          width: 4,
          height: 4,
          borderRadius: '50%',
          background: 'var(--color-parchment)',
          pointerEvents: 'none',
          zIndex: 9998,
          mixBlendMode: 'difference',
        }}
      />
      {/* Anneau — suit avec spring */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0, left: 0,
          x: sx,
          y: sy,
          translateX: '-50%',
          translateY: '-50%',
          width: 22,
          height: 22,
          borderRadius: '50%',
          border: '1px solid rgba(232,228,220,0.55)',
          pointerEvents: 'none',
          zIndex: 9997,
        }}
      />
    </>
  )
}
