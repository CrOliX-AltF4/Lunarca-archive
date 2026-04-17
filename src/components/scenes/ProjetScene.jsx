import { motion } from 'framer-motion'
import bgProjet from '../../assets/backgrounds/bg_projet.webp'
import BackButton from '../ui/BackButton.jsx'

const sceneVariants = {
  initial: { opacity: 0, scale: 0.97 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.6 } },
}

export default function ProjetScene({ onBack }) {
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
        backgroundImage: `url(${bgProjet})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }} />
      <div style={{ position: 'relative', zIndex: 1, padding: '4rem' }}>
        <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '2.5rem', marginBottom: '1rem' }}>
          Projet w-AI-fu
        </h1>
        {/* TODO: contenu section Projet */}
      </div>
      <BackButton onClick={onBack} />
    </motion.div>
  )
}
