import { motion } from 'framer-motion'
import bgContact from '../../assets/backgrounds/bg_contact.webp'
import BackButton from '../ui/BackButton.jsx'
import RuneStele from '../contact/RuneStele.jsx'
import styles from './ContactScene.module.css'

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
      className={styles.scene}
      style={{ backgroundImage: `url(${bgContact})` }}
    >
      <div className={styles.vignette} />

      <motion.div
        className={styles.steleWrapper}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.8, delay: 0.6 } }}
      >
        <RuneStele />
      </motion.div>

      <BackButton onClick={onBack} />
    </motion.div>
  )
}
