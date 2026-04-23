import { motion } from 'framer-motion'
import bgContact from '../../assets/backgrounds/bg_contact.webp'
import sealImg from '../../assets/ornements/seal.png'
import BackButton from '../ui/BackButton.jsx'
import RuneStele from '../contact/RuneStele.jsx'

const sceneVariants = {
  initial: { opacity: 0, scale: 0.97 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.6 } },
}

export default function ContactScene({ onBack }) {
  return (
    <motion.div
      variants={sceneVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${bgContact})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Vignette globale légère */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(0,0,0,0.5) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Runes interactives — centrées sur la face de la stèle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.8, delay: 0.6 } }}
        style={{
          position: 'absolute',
          top: '35%',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          zIndex: 3,
        }}
      >
        <RuneStele />
      </motion.div>

      <BackButton onClick={onBack} />
    </motion.div>
  )
}
