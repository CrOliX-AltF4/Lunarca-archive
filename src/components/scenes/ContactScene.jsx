import { motion } from 'framer-motion'
import bgContact from '../../assets/backgrounds/bg_contact.webp'
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
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }} />
      <div style={{
        position: 'relative',
        zIndex: 1,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <RuneStele />
      </div>
      <BackButton onClick={onBack} />
    </motion.div>
  )
}
