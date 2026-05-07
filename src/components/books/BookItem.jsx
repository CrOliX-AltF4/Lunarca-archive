import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { dispatch } from '../../utils/dispatch.js'

export default function BookItem({ book, onClick, onTripleClick, sealed = false }) {
  const clickDataRef = useRef({ count: 0, timer: null })
  const hoverLongRef = useRef(null)
  const shakeRef = useRef(null)
  const containerRef = useRef(null)
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 767px)').matches)
  const [isHovered, setIsHovered] = useState(false)
  const imgWidth = isMobile ? '90px' : '120px'

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)')
    const handler = (e) => setIsMobile(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  useGSAP(() => {
    gsap.set(containerRef.current, { clipPath: 'inset(0% 0% 0% 0%)' })
    gsap.to(containerRef.current, {
      y: '+=10',
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })
  }, { scope: containerRef })

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

        // Dispersion animation: rotate and shrink towards center
        gsap.timeline({ onComplete: () => onClick() })
          .to(containerRef.current, { 
            rotate: 15,
            scale: 0.5,
            clipPath: 'inset(50% 50% 50% 50%)',
            duration: 0.5, 
            ease: 'power2.inOut' 
          })
          .to(containerRef.current, { 
            opacity: 0, 
            duration: 0.1 
          }, '-=0.1')
      }
      data.count = 0
    }, 300)
  }

  const handleHoverStart = () => {
    if (sealed) return
    setIsHovered(true)
    dispatch('onBookHover', book.id)
    hoverLongRef.current = setTimeout(() => {
      dispatch('onBookHoverLong', book.id)
    }, 3000)
  }

  const handleHoverEnd = () => {
    setIsHovered(false)
    clearTimeout(hoverLongRef.current)
  }
  return (
    <div ref={shakeRef} style={{ position: 'absolute', left: book.position.left, top: book.position.top }}>
      <motion.div
        ref={containerRef}
        onClick={handleClick}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        style={{ transformOrigin: 'bottom center', perspective: '500px' }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          filter: isHovered && !sealed ? 'drop-shadow(0 0 14px rgba(245,243,239,0.5)) brightness(1.2)' : 'drop-shadow(0 0 0px rgba(0,0,0,0))'
        }}
        whileTap={{ scale: sealed ? 1 : 0.97 }}
      >
        <img
          src={sealed && book.lockedAsset ? book.lockedAsset : book.asset}
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
        }}>
          {book.label}
        </p>
      </motion.div>
    </div>
  )
}
