import { motion } from 'framer-motion'
import bgContact from '../../assets/backgrounds/bg_contact.webp'
import SceneShell from './SceneShell.jsx'
import RuneStele from '../contact/RuneStele.jsx'
import styles from './ContactScene.module.css'

export default function ContactScene({ onBack }) {
  return (
    <SceneShell bg={bgContact} onBack={onBack} overlay={0}>
      <div className={styles.vignette} />

      <motion.div
        className={styles.steleWrapper}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.8, delay: 0.6 } }}
      >
        <RuneStele />
      </motion.div>
    </SceneShell>
  )
}
