import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { dispatch } from '../../utils/dispatch.js'

export default function BookItem({ book, onClick, onTripleClick, sealed = false }) {
  const clickDataRef = useRef({ count: 0, timer: null })
  const hoverLongRef = useRef(null)
  const shakeRef = useRef(null)
  const [flipping, setFlipping] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 767px)').matches)
  const imgWidth = isMobile ? '90px' : '120px'

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)')
    const handler = (e) => setIsMobile(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  const handleClick = () => {
    if (sealed) {
      if (shakeRef.current) {
        gsap.killTweensOf(shakeRef.current)
        gsap.timeline()
          .to(shakeRef.current, { x: -6, rotation: -2, duration: 0.06, ease: 'power2.out' })
          .to(shakeRef.current, { x: 7, rotation: 2, duration: 0.06, ease: 'power2.out' })
          .to(shakeRef.current, { x: -5, rotation: -1.5, duration: 0.06, ease: 'power2.out' })
          .to(shakeRef.current, { x: 4, rotation: 1, duration: 0.06, ease: 'power2.out' })
          .to(shakeRef.current, { x: 0, rotation: 0, duration: 0.1, ease: 'power2.inOut' })
      }
      dispatch('onContactSealAttempt', 'library')
      window.dispatchEvent(new CustomEvent('narrator:trigger', {
        detail: { trigger: 'intro_contact_sealed', scene: 'library' },
      }))
      return
    }

    const data = clickDataRef.current
    data.count += 1
    clearTimeout(data.timer)

    if (data.count >= 3 && onTripleClick) {
      data.count = 0
      onTripleClick()
      return
    }

    data.timer = setTimeout(() => {
      if (data.count === 1) {
        dispatch('onBookClick', book.id)
        setFlipping(true)
        setTimeout(() => onClick(), 150)
      }
      data.count = 0
    }, 300)
  }

  const handleHoverStart = () => {
    if (sealed) return
    dispatch('onBookHover', book.id)
    hoverLongRef.current = setTimeout(() => {
      dispatch('onBookHoverLong', book.id)
    }, 3000)
  }

  const handleHoverEnd = () => {
    clearTimeout(hoverLongRef.current)
  }

  return (
    <div ref={shakeRef} style={{ position: 'absolute', left: book.position.left, top: book.position.top }}>
      <motion.div
        onClick={handleClick}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        style={{ transformOrigin: 'bottom center', perspective: '500px' }}
        initial={{ opacity: 0, y: 20 }}
        animate={flipping ? {
          rotateY: -28, scaleX: 0.82, opacity: 0.6, y: 0,
          transition: { duration: 0.14, ease: 'easeIn' },
        } : {
          opacity: sealed ? 0.35 : 1,
          y: sealed ? 0 : [0, -8, 0],
          filter: sealed
            ? 'grayscale(0.7) drop-shadow(0 0 0px rgba(0,0,0,0))'
            : 'drop-shadow(0 0 0px rgba(245,243,239,0))',
          transition: {
            opacity: { duration: 0.8, delay: book.floatDelay * 0.3 },
            y: sealed ? {} : { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: book.floatDelay },
            filter: { duration: 0.3 },
          },
        }}
        whileHover={flipping || sealed ? {} : {
          scale: 1.05,
          filter: 'drop-shadow(0 0 14px rgba(245,243,239,0.5))',
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: sealed ? 1 : 0.97 }}
      >
        <img
          src={book.asset}
          alt={book.label}
          style={{ width: imgWidth, height: 'auto', display: 'block' }}
        />
        <p style={{
          textAlign: 'center',
          fontFamily: 'Cinzel, serif',
          fontSize: '0.75rem',
          letterSpacing: '0.12em',
          marginTop: '0.5rem',
          color: sealed ? 'var(--color-fog)' : 'var(--color-parchment)',
          textShadow: '0 0 8px rgba(0,0,0,0.8)',
          opacity: sealed ? 0.5 : 1,
        }}>
          {book.label}
        </p>
      </motion.div>
    </div>
  )
}
