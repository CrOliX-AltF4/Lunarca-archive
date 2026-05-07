import { motion } from 'framer-motion'
import BackButton from '../ui/BackButton.jsx'

const VARIANTS = {
  default: {
    initial: { opacity: 0, scale: 0.97 },
    animate: { opacity: 1, scale: 1,    transition: { duration: 0.6 } },
    exit:    { opacity: 0, scale: 0.97, transition: { duration: 0.5 } },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6 } },
    exit:    { opacity: 0, transition: { duration: 0.5 } },
  },
  plunge: {
    initial: { opacity: 0, scale: 0.985 },
    animate: { opacity: 1, scale: 1,     transition: { duration: 0.7 } },
    exit:    { opacity: 0, scale: 0.985, transition: { duration: 0.5 } },
  },
  compress: {
    initial: { opacity: 0, scale: 1.04 },
    animate: { opacity: 1, scale: 1,    transition: { duration: 0.75 } },
    exit:    { opacity: 0,              transition: { duration: 0.5 } },
  },
}

export default function SceneShell({ bg, onBack, overlay = 0.48, containerRef, variant = 'default', children }) {
  const v = VARIANTS[variant] ?? VARIANTS.default
  return (
    <motion.div
      ref={containerRef}
      variants={v}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        inset: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url(${bg})`,
      }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `rgba(0, 0, 0, ${overlay})`,
        pointerEvents: 'none',
        zIndex: 1,
      }} />
      <div style={{ position: 'relative', zIndex: 2, width: '100%', height: '100%' }}>
        {children}
      </div>
      <BackButton onClick={onBack} />
    </motion.div>
  )
}
