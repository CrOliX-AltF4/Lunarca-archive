import { motion } from 'framer-motion'
import BooksContainer from '../books/BooksContainer.jsx'
import bgLibrary from '../../assets/backgrounds/bg_library.webp'

const sceneVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0, transition: { duration: 0.6 } },
}

export default function LibraryScene({ onNavigate }) {
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
        backgroundImage: `url(${bgLibrary})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
      }} />
      <BooksContainer onNavigate={onNavigate} />
    </motion.div>
  )
}
