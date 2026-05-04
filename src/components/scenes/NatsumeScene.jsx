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

const TRAITS = [
  { label: 'Origine', value: "FF14 · Code Vein · Monster Hunter · et d'autres encore" },
  { label: 'Nature',  value: 'Entité narrative synthétique' },
  { label: 'Symbole', value: 'Larme lunaire — fleur blanche, reflets bleus, pureté fragile', hoverable: true },
]

const INCARNATIONS = [
  { game: 'Final Fantasy XIV', year: '2013', fragment: 'Le nom prend forme. La première stabilité.' },
  { game: 'Code Vein',         year: '2019', fragment: "La silhouette se précise. L'œil écarlate s'affirme." },
  { game: 'Monster Hunter',    year: '2020', fragment: 'La posture dans le combat. Le calme avant la frappe.' },
  { game: '···',               year: null,   fragment: "D'autres encore. Toutes oubliées, toutes présentes." },
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
    tl.from('.nat-portrait',   { opacity: 0, x: 20,  duration: 1.0, ease: 'power2.out' })
      .from('.nat-name',       { opacity: 0, y: 12,  duration: 0.6, ease: 'power2.out' }, '-=0.6')
      .from('.nat-rule',       { scaleX: 0,          duration: 0.4, transformOrigin: 'left center', ease: 'power2.inOut' }, '-=0.2')
      .from('.nat-fragment',   { opacity: 0, y: 8,   duration: 0.5, stagger: 0.06 }, '-=0.1')
      .from('.nat-trait',      { opacity: 0, x: -8,  duration: 0.35, stagger: 0.1, ease: 'power2.out' }, '+=0.1')
      .from('.nat-caractere',  { opacity: 0,          duration: 0.4 }, '-=0.1')
      .from('.nat-tl-node',    { opacity: 0,          duration: 0.3, stagger: 0.15 }, '+=0.2')
      .from('.nat-tl-line',    { scaleY: 0,           duration: 0.3, stagger: 0.15, transformOrigin: 'top', ease: 'power2.inOut' }, '<')
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

        <p className={`nat-fragment ${styles.fragmentMain}`}>
          Entité narrative synthétique.<br />
          Construite à partir d'incarnations successives dans des mondes différents.
        </p>
        <p className={`nat-fragment ${styles.fragmentSub}`}>
          La stabilité est venue avec le temps. Elle n'était pas donnée.
        </p>

        <div className={styles.traits}>
          {TRAITS.map(({ label, value, hoverable }) => (
            <div key={label} className={`nat-trait ${styles.trait}`}>
              <span className={styles.traitLabel}>{label}</span>
              <span
                className={hoverable ? styles.traitValueHover : styles.traitValue}
                onMouseEnter={hoverable ? () => dispatch('onHoverLarme') : undefined}
              >
                {value}
              </span>
            </div>
          ))}
        </div>

        <div className={`nat-caractere ${styles.caractereBlock}`}>
          <div className={styles.caractereLabel}>Caractère</div>
          <p className={styles.caractereText}>
            Calme, posée — retenue naturelle. Irritation rare mais intense.<br />
            Affection possible, toujours discrète.
          </p>
        </div>
      </div>

      <IncarnationsTimeline />
      <BackButton onClick={onBack} />
    </motion.div>
  )
}

function IncarnationsTimeline() {
  const [activeIdx, setActiveIdx] = useState(null)

  return (
    <div className={styles.timeline}>
      {INCARNATIONS.map((inc, i) => (
        <div key={inc.game}>
          <div
            className={`nat-tl-node ${styles.tlNode} ${activeIdx === i ? styles.tlNodeActive : ''}`}
            onMouseEnter={() => setActiveIdx(i)}
            onMouseLeave={() => setActiveIdx(null)}
          >
            <span className={styles.tlYear}>{inc.year ?? inc.game}</span>
            <AnimatePresence>
              {activeIdx === i && (
                <motion.div
                  key={`tooltip-${i}`}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0, transition: { duration: 0.2 } }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  className={styles.tlTooltip}
                >
                  <p className={styles.tlGame}>{inc.game}</p>
                  <p className={styles.tlFragment}>{inc.fragment}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {i < INCARNATIONS.length - 1 && (
            <div className={`nat-tl-line ${styles.tlConnector}`} />
          )}
        </div>
      ))}
    </div>
  )
}
