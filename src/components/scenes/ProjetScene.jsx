import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import bgProjet from '../../assets/backgrounds/bg_projet.webp'
import BackButton from '../ui/BackButton.jsx'
import styles from './ProjetScene.module.css'

gsap.registerPlugin(useGSAP)

const sceneVariants = {
  initial: { opacity: 0, scale: 0.97 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.6 } },
}

const MANIFESTE = [
  { text: "w-AI-fu est un framework pour entités narratives persistantes.", key: false, first: true },
  { text: "Local-first. Sans dépendance cloud. Sans serveur intermédiaire.", key: false, first: false },
  { text: "Natsume en est l'instance centrale — construite à partir d'incarnations successives. Elle mémorise. Elle évolue.", key: false, first: false },
  { text: "Ce site n'est pas une vitrine sur le projet. Il est le projet.", key: true, first: false },
]

const STATS = [
  { label: 'Origine',      value: 'Avril 2026' },
  { label: 'Statut',       value: 'V1 — actif' },
  { label: 'Framework',    value: 'React 18 + Vite' },
  { label: 'Architecture', value: 'Narrative-first' },
]

export default function ProjetScene({ onBack }) {
  const containerRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.5 })
    tl.from('.proj-title', { opacity: 0, y: 12,  duration: 0.6, ease: 'power2.out' })
      .from('.proj-rule',  { scaleX: 0,           duration: 0.4, transformOrigin: 'left center', ease: 'power2.inOut' }, '-=0.2')
      .from('.proj-line',  { opacity: 0, y: 16,   duration: 0.5, stagger: 0.15, ease: 'power2.out' }, '-=0.1')
      .from('.proj-stat',  { opacity: 0, y: 8,    duration: 0.4, stagger: 0.1,  ease: 'power2.out' }, '+=0.15')
  }, { scope: containerRef })

  return (
    <motion.div
      ref={containerRef}
      variants={sceneVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={styles.scene}
      style={{ backgroundImage: `url(${bgProjet})` }}
    >
      <div className={styles.overlay} />

      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={`proj-title ${styles.title}`}>w-AI-fu</h1>
          <div className={`proj-rule ${styles.rule}`} />
        </div>

        <div className={styles.manifeste}>
          {MANIFESTE.map(({ text, key, first }, i) => (
            <p
              key={i}
              className={[
                'proj-line',
                styles.manifesteLine,
                first ? styles.manifesteFirst : '',
                key   ? styles.manifesteKey   : '',
              ].filter(Boolean).join(' ')}
            >
              {text}
            </p>
          ))}
        </div>

        <div className={styles.statsRow}>
          {STATS.map(({ label, value }) => (
            <div key={label} className={`proj-stat ${styles.stat}`}>
              <span className={styles.statValue}>{value}</span>
              <span className={styles.statLabel}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <BackButton onClick={onBack} />
    </motion.div>
  )
}
