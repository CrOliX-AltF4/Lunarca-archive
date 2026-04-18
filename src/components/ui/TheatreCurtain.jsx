import { useState } from 'react'
import { motion } from 'framer-motion'

export default function TheatreCurtain({ onComplete }) {
  const [pulled, setPulled] = useState(false)

  const handlePull = () => {
    if (pulled) return
    setPulled(true)
    setTimeout(onComplete, 1100)
  }

  return (
    <motion.div
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      style={{ position: 'fixed', inset: 0, zIndex: 1000 }}
    >
      {/* Rideau */}
      <motion.div
        animate={pulled ? { y: '-100%' } : { y: '0%' }}
        transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: 'absolute',
          inset: 0,
          background: `repeating-linear-gradient(
            90deg,
            #040404 0px,
            #0a0a0a 35px,
            #161616 58px,
            #0a0a0a 80px,
            #040404 115px
          )`,
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
        }}
      >
        {/* Ombre de profondeur en bas */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '12%',
          background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.5))',
          pointerEvents: 'none',
        }} />

        {/* Barre de tringle en haut */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '8px',
          background: 'linear-gradient(to bottom, #2a2a2a, #1a1a1a)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.8)',
        }} />

        {/* Titre */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: pulled ? 0 : 1, transition: { duration: 0.8, delay: 0.4 } }}
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            letterSpacing: '0.35em',
            paddingLeft: '0.35em',
            color: 'rgba(245,243,239,0.20)',
            fontWeight: 400,
            userSelect: 'none',
          }}
        >
          w-AI-fu
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: pulled ? 0 : 1, scaleX: 1, transition: { duration: 0.6, delay: 0.9 } }}
          style={{
            width: '3rem',
            height: '1px',
            background: 'rgba(245,243,239,0.2)',
            transformOrigin: 'center',
          }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: pulled ? 0 : 1, transition: { duration: 0.6, delay: 1.3 } }}
          style={{
            fontFamily: 'IM Fell English, serif',
            fontStyle: 'italic',
            fontSize: '0.85rem',
            color: 'rgba(245,243,239,0.18)',
            letterSpacing: '0.1em',
            userSelect: 'none',
          }}
        >
          Archive de Natsume Tsurugi
        </motion.p>
      </motion.div>

      {/* Corde */}
      <motion.div
        animate={pulled ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.3 }}
        onClick={handlePull}
        style={{
          position: 'absolute',
          right: '14%',
          top: 0,
          zIndex: 2,
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transformOrigin: 'top center',
          animation: 'ropeSwing 2.5s ease-in-out infinite',
        }}
      >
        {/* Corps de la corde */}
        <div style={{
          width: '4px',
          height: '32vh',
          background: 'linear-gradient(to bottom, #c4b090, #8a7858, #c4b090, #8a7858)',
          borderRadius: '2px',
        }} />

        {/* Nœud */}
        <div style={{
          width: '18px',
          height: '18px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #d4c8a8, #7a6848)',
          boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
          margin: '-2px 0',
        }} />

        {/* Pompon / frange */}
        <div style={{
          width: '16px',
          height: '28px',
          background: 'linear-gradient(to bottom, #8a7858, #c4b090 40%, #8a7858)',
          borderRadius: '0 0 8px 8px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
        }} />

        {/* Label hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5, delay: 1.6 } }}
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '0.58rem',
            letterSpacing: '0.2em',
            color: 'rgba(245,243,239,0.45)',
            marginTop: '0.6rem',
            textTransform: 'uppercase',
            userSelect: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          Tirez
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
