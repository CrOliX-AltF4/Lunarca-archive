import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import sealImg       from '../../assets/ornements/seal.png'
import sealCrack1Img from '../../assets/ornements/seal_crack1.png'
import sealCrack2Img from '../../assets/ornements/seal_crack2.png'
import bgIntro  from '../../assets/backgrounds/bg_intro.webp'
import bgIntro2 from '../../assets/backgrounds/bg_intro2.webp'

const SEAL_SIZE = 210
// Centre absolu : left/top calcul statique pour éviter conflit avec Framer Motion transform
const SEAL_LEFT = `calc(50% - ${SEAL_SIZE / 2}px)`
const SEAL_TOP  = `calc(54.5% - ${SEAL_SIZE / 2}px)`

const STATES = [
  { img: sealImg,       opacity: 1,    rotate: 0  },
  { img: sealCrack1Img, opacity: 1,    rotate: 0  },
  { img: sealCrack2Img, opacity: 0.85, rotate: 0  },
]

const HINTS = [
  { text: 'Briser le sceau',                  size: '0.68rem', color: 'rgba(245,243,239,0.72)', glow: false },
  { text: 'Archive scellée — Accès interdit', size: '0.75rem', color: 'rgba(245,243,239,0.92)', glow: false },
  { text: "Les défenses s'effritent\u2026",   size: '0.82rem', color: 'rgba(245,243,239,1.00)', glow: true  },
]

const FRAGMENTS = [
  { angle: 20,  dist: 200, size: 3 },
  { angle: 75,  dist: 220, size: 2 },
  { angle: 130, dist: 190, size: 4 },
  { angle: 185, dist: 215, size: 2 },
  { angle: 240, dist: 200, size: 3 },
  { angle: 295, dist: 180, size: 2 },
  { angle: 340, dist: 210, size: 3 },
  { angle: 50,  dist: 170, size: 2 },
]

export default function SealIntro({ onComplete }) {
  const [clicks, setClicks] = useState(0)
  const [shaking, setShaking] = useState(false)
  const [doorOpen, setDoorOpen] = useState(false)
  const broken = clicks === 3

  const handleClick = () => {
    if (shaking || broken) return
    setShaking(true)
    setTimeout(() => setShaking(false), 340)
    const next = clicks + 1
    setClicks(next)
    if (next === 3) {
      setTimeout(() => setDoorOpen(true), 500)
      setTimeout(onComplete, 1800)
    }
  }

  const hint = HINTS[Math.min(clicks, 2)]
  const sealState = STATES[Math.min(clicks, 2)]

  return (
    <motion.div
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      onClick={handleClick}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        backgroundImage: `url(${bgIntro})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        cursor: broken ? 'default' : 'pointer',
        overflow: 'hidden',
      }}
    >
      {/* Porte ouverte — crossfade après brisage */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: doorOpen ? 1 : 0, transition: { duration: 0.7, ease: 'easeInOut' } }}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${bgIntro2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Voile léger */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,0.28)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* Halo qui s'intensifie autour du médaillon */}
      <motion.div
        animate={broken
          ? { opacity: 0, scale: 4, transition: { duration: 0.6 } }
          : { opacity: clicks === 0 ? 0.5 : clicks === 1 ? 0.75 : 1, transition: { duration: 0.7 } }
        }
        style={{
          position: 'absolute',
          left: SEAL_LEFT,
          top: SEAL_TOP,
          width: SEAL_SIZE,
          height: SEAL_SIZE,
          borderRadius: '50%',
          boxShadow: '0 0 80px 40px rgba(245,243,239,0.07)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Flash blanc */}
      <AnimatePresence>
        {broken && (
          <motion.div
            key="flash"
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 0, transition: { duration: 0.6, ease: 'easeOut' } }}
            style={{ position: 'absolute', inset: 0, background: 'white', pointerEvents: 'none', zIndex: 10 }}
          />
        )}
      </AnimatePresence>

      {/* Seal — left/top statiques, seul x est animé par Framer Motion */}
      <motion.div
        animate={shaking ? { x: [-6, 6, -5, 5, -3, 3, 0], transition: { duration: 0.32 } } : { x: 0 }}
        style={{
          position: 'absolute',
          left: SEAL_LEFT,
          top: SEAL_TOP,
          zIndex: 2,
          width: SEAL_SIZE,
          height: SEAL_SIZE,
        }}
      >
        {/* Swap d'image selon l'état — AnimatePresence pour crossfade */}
        <AnimatePresence mode="wait">
          {!broken && (
            <motion.img
              key={clicks}
              src={sealState.img}
              alt=""
              initial={{ opacity: 0 }}
              animate={{ opacity: sealState.opacity, transition: { duration: 0.25 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                mixBlendMode: 'screen',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
              draggable={false}
            />
          )}
        </AnimatePresence>

        {/* Onde de choc */}
        <AnimatePresence>
          {broken && (
            <motion.div
              key="wave"
              initial={{ scale: 0.4, opacity: 0.9 }}
              animate={{ scale: 3.5, opacity: 0, transition: { duration: 0.7, ease: 'easeOut' } }}
              style={{
                position: 'absolute',
                top: '50%', left: '50%',
                width: SEAL_SIZE, height: SEAL_SIZE,
                borderRadius: '50%',
                border: '1.5px solid rgba(245,243,239,0.8)',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
              }}
            />
          )}
        </AnimatePresence>

        {/* Éclats */}
        <AnimatePresence>
          {broken && FRAGMENTS.map((f, i) => {
            const rad = (f.angle * Math.PI) / 180
            return (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: Math.cos(rad) * f.dist,
                  y: Math.sin(rad) * f.dist,
                  opacity: 0, scale: 0,
                  transition: { duration: 0.7, delay: i * 0.03, ease: [0.2, 0, 0.8, 1] },
                }}
                style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  width: f.size, height: f.size,
                  borderRadius: '50%',
                  background: 'rgba(245,243,239,0.85)',
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none',
                }}
              />
            )
          })}
        </AnimatePresence>
      </motion.div>

      {/* Texte narratif */}
      <AnimatePresence mode="wait">
        {!broken && (
          <motion.p
            key={clicks}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: clicks === 0 ? 1.4 : 0.1 } }}
            exit={{ opacity: 0, y: -5, transition: { duration: 0.18 } }}
            style={{
              position: 'absolute',
              top: `calc(54.5% + ${SEAL_SIZE / 2 + 24}px)`,
              left: 0,
              right: 0,
              textAlign: 'center',
              zIndex: 3,
              fontFamily: 'Cinzel, serif',
              fontSize: hint.size,
              letterSpacing: '0.22em',
              paddingLeft: '0.22em',
              color: hint.color,
              textShadow: hint.glow
                ? '0 0 18px rgba(245,243,239,0.5), 0 0 40px rgba(245,243,239,0.2)'
                : '0 2px 12px rgba(0,0,0,0.8)',
              userSelect: 'none',
            }}
          >
            {hint.text}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
