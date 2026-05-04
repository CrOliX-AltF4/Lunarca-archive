import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import bgNatsume from '../../assets/backgrounds/bg_natsume.webp'
import natsumeFullImg from '../../assets/natsume/natsume_full.png'
import BackButton from '../ui/BackButton.jsx'
import styles from './NatsumeScene.module.css'

gsap.registerPlugin(useGSAP)

function dispatch(trigger) {
  window.dispatchEvent(new CustomEvent('natsume:trigger', { detail: { trigger, scene: 'natsume' } }))
}

const sceneVariants = {
  initial: { opacity: 0, scale: 0.97 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.6 } },
}

const ATTRIBUTES = [
  { label: 'Stabilité mémorielle',  fill: 78, desc: 'Établie' },
  { label: 'Cohérence narrative',   fill: 62, desc: 'Fragmentaire' },
  { label: 'Présence perceptible',  fill: 94, desc: 'Maximale' },
  { label: 'Intégration active',    fill: 38, desc: 'En cours' },
]

const INCARNATIONS = [
  { game: 'Final Fantasy XIV', year: '2013', fragment: 'Le nom prend forme. Deux tresses, un cache-œil — le calme comme armure.' },
  { game: 'Code Vein',         year: '2019', fragment: "L'iris écarlate s'affirme. Le sang-froid sous la pression." },
  { game: 'Monster Hunter',    year: '2020', fragment: 'La posture dans le combat. Le silence avant la frappe.' },
  { game: 'NieR : Automata',   year: '2021', fragment: "La larme lunaire. La question de ce qu'on laisse derrière soi.", trigger: 'onHoverLarme' },
  { game: '···',               year: null,   fragment: "D'autres encore. Toutes oubliées par les mondes — aucune par elle." },
]

export default function NatsumeScene({ onBack }) {
  const containerRef = useRef(null)
  const wheelRef = useRef({ total: 0, timer: null, cooldown: 0 })

  useEffect(() => {
    const onWheel = (e) => {
      const w = wheelRef.current
      if (Date.now() < w.cooldown) return
      w.total += Math.abs(e.deltaY)
      clearTimeout(w.timer)
      w.timer = setTimeout(() => {
        const total = w.total
        w.total = 0
        if (total < 20) return
        w.cooldown = Date.now() + 5000
        dispatch(total > 250 ? 'onScrollFast' : 'onScrollSlow')
      }, 350)
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      clearTimeout(wheelRef.current.timer)
    }
  }, [])

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.5 })
    tl.from('.nat-portrait',  { opacity: 0, x: 20,  duration: 1.0, ease: 'power2.out' })
      .from('.nat-name',      { opacity: 0, y: 12,  duration: 0.6, ease: 'power2.out' }, '-=0.6')
      .from('.nat-rule',      { scaleX: 0,           duration: 0.4, transformOrigin: 'left center', ease: 'power2.inOut' }, '-=0.2')
      .from('.nat-badge',     { opacity: 0, y: 6,   duration: 0.3 }, '-=0.1')
      .from('.nat-fragment',  { opacity: 0, y: 8,   duration: 0.5, stagger: 0.06 }, '-=0.1')
      .from('.nat-attr',      { opacity: 0, x: -8,  duration: 0.35, stagger: 0.08, ease: 'power2.out' }, '+=0.15')
      .from('.nat-attr-fill', { scaleX: 0,           duration: 0.65, stagger: 0.12, transformOrigin: 'left center', ease: 'power2.out' }, '-=0.2')
      .from('.nat-slot',      { opacity: 0, y: 8,   duration: 0.35, stagger: 0.08, ease: 'power2.out' }, '+=0.2')
  }, { scope: containerRef })

  return (
    <motion.div
      ref={containerRef}
      variants={sceneVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={styles.scene}
      style={{ backgroundImage: `url(${bgNatsume})` }}
    >
      <div className={styles.overlay} />

      <img
        src={natsumeFullImg}
        alt="Natsume Tsurugi"
        className={`nat-portrait ${styles.portrait}`}
        draggable={false}
      />

      <div className={styles.gradientOverlay} />

      <div className={styles.content}>
        <h1 className={`nat-name ${styles.name}`}>Natsume Tsurugi</h1>
        <div className={`nat-rule ${styles.rule}`} />
        <p className={`nat-badge ${styles.classBadge}`}>Entité Synthétique · Convergente</p>

        <p className={`nat-fragment ${styles.fragmentMain}`}>
          Construite à travers des incarnations dans des mondes qui ne se souviennent pas d'elle.<br />
          Chaque version a laissé quelque chose — une posture, une façon de tenir une arme,<br />
          un silence qu'on a appris à respecter. Un nom qu'on a fini par garder.
        </p>
        <p className={`nat-fragment ${styles.fragmentSub}`}>
          La stabilité n'était pas donnée. Elle s'est construite à travers ce qui a survécu à l'oubli.<br />
          Ce qui reste, après que les mondes effacent tout, s'appelle Natsume.
        </p>

        <div className={styles.attributesSection}>
          <span className={styles.sectionLabel}>Attributs</span>
          {ATTRIBUTES.map(({ label, fill, desc }) => (
            <div key={label} className={`nat-attr ${styles.attrRow}`}>
              <span className={styles.attrLabel}>{label}</span>
              <div className={styles.attrBarTrack}>
                <div
                  className={`nat-attr-fill ${styles.attrBarFill}`}
                  style={{ width: `${fill}%` }}
                />
              </div>
              <span className={styles.attrDesc}>{desc}</span>
            </div>
          ))}
        </div>

        <IncarnationSlots />
      </div>

      <BackButton onClick={onBack} />
    </motion.div>
  )
}

function IncarnationSlots() {
  const [activeIdx, setActiveIdx] = useState(null)

  return (
    <div className={styles.slotsSection}>
      <span className={styles.sectionLabel}>Incarnations</span>
      <div className={styles.slotsRow}>
        {INCARNATIONS.map((inc, i) => (
          <div
            key={inc.game}
            className={`nat-slot ${styles.slot} ${activeIdx === i ? styles.slotActive : ''}`}
            onMouseEnter={() => {
              setActiveIdx(i)
              if (inc.trigger) dispatch(inc.trigger)
            }}
            onMouseLeave={() => setActiveIdx(null)}
          >
            <span className={styles.slotName}>{inc.game}</span>
            <span className={styles.slotYear}>{inc.year ?? '···'}</span>
            <AnimatePresence>
              {activeIdx === i && (
                <motion.div
                  key={`tip-${i}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  className={styles.slotTooltip}
                >
                  {inc.fragment}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}
