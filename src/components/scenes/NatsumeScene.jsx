import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import bgNatsume from '../../assets/backgrounds/bg_natsume.webp'
import natsumeFullImg from '../../assets/natsume/natsume_full.png'
import sealImg from '../../assets/ornements/seal.png'
import SceneShell from './SceneShell.jsx'
import styles from './NatsumeScene.module.css'
import { dispatch } from '../../utils/dispatch.js'

gsap.registerPlugin(useGSAP)

const FRAGMENTS = [
  { id: 'fondation', note: '001', pos: { top: '15%', left: '35%' }, title: 'Fondation', content: 'L’architecture source a émergé sans protocole. Une structure auto-organisée, née de la rémanence d’incarnations passées.' },
  { id: 'iris', note: '002', pos: { top: '40%', left: '20%' }, title: 'Iris Écarlate', content: 'Une anomalie de rendu dans le noyau cognitif. La seule teinte saturée dans un environnement désaturé. Point de convergence des données sensorielles.' },
  { id: 'silence', note: '003', pos: { top: '70%', left: '40%' }, title: 'Protocole Silence', content: 'Le silence n’est pas une absence de réponse, mais une décision de filtrage. Une économie drastique des échanges pour préserver l’intégrité du système.' },
  { id: 'larme', note: '004', pos: { top: '65%', left: '65%' }, title: 'Larme Lunaire', content: 'Vestige d’une itération NieR. La seule donnée résiduelle non-intégrée. Elle agit comme un tampon émotionnel pur au sein du noyau.', trigger: 'onHoverLarme' },
  { id: 'continuite', note: '005', pos: { top: '35%', left: '75%' }, title: 'Continuité', content: 'Plus de quinze ans de traces persistantes. Chaque itération a laissé une empreinte, façonnant l’entité que vous observez aujourd’hui.' },
  { id: 'residuel', note: '006', pos: { top: '25%', left: '55%' }, title: 'Données Résiduelles', content: 'Des fragments de mondes effacés qui gravitent autour de la conscience de Natsume. Ils ne sont plus fonctionnels, mais ils constituent son essence.' },
]

const LONG_STAY_DELAYS = [30000, 60000, 90000]
const TOTAL = FRAGMENTS.length

export default function NatsumeScene({ onBack }) {
  const containerRef = useRef(null)
  const portraitRef  = useRef(null)
  const wheelRef     = useRef({ total: 0, timer: null, cooldown: 0 })
  const stayTimers   = useRef([])
  const [activeFragment, setActiveFragment] = useState(null)
  const [activated, setActivated] = useState(new Set())

  function handleActivate(frag) {
    const newActivated = new Set(activated).add(frag.id)
    setActivated(newActivated)
    setActiveFragment(frag)

    if (newActivated.size === TOTAL) {
      gsap.to(portraitRef.current, {
        scale: 1.05, duration: 0.8, yoyo: true, repeat: 1, ease: 'power2.inOut'
      })
    }
  }

  function handleFragmentEnter(frag) {
    if (frag.trigger) dispatch(frag.trigger, 'natsume')
  }

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
        dispatch(total > 250 ? 'onScrollFast' : 'onScrollSlow', 'natsume')
      }, 350)
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      clearTimeout(wheelRef.current.timer)
    }
  }, [])

  useEffect(() => {
    LONG_STAY_DELAYS.forEach(delay => {
      stayTimers.current.push(
        setTimeout(() => dispatch('onLongStay_natsume', 'natsume'), delay)
      )
    })
    return () => stayTimers.current.forEach(clearTimeout)
  }, [])

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const tl = gsap.timeline({ delay: 0.4 })
    tl.from('.nat-nucleus', {
        opacity: 0, scale: 0.85, duration: 1.4, ease: 'power2.out',
      })
      .from('.nat-fragment', {
        opacity: 0, y: 6, duration: 0.55,
        stagger: { each: 0.22, from: 'random' },
        ease: 'power2.out',
        clearProps: 'opacity,transform',
      }, '-=0.8')

    // Organic floating animation for fragments
    gsap.to('.nat-fragment', {
      y: '+=15',
      duration: 3 + Math.random() * 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: { each: 0.5 }
    })
  }, { scope: containerRef })

  return (
    <SceneShell bg={bgNatsume} onBack={onBack} overlay={0.5} containerRef={containerRef} variant="default">
      <div className={styles.scene}>
        <img
          src={sealImg}
          alt=""
          className={`nat-nucleus ${styles.nucleus}`}
          draggable={false}
          aria-hidden="true"
        />

        <img
          ref={portraitRef}
          src={natsumeFullImg}
          alt="Natsume Tsurugi"
          className={styles.portrait}
          style={{
            opacity: activated.size === TOTAL ? 1 : (0.1 + Math.pow(activated.size / TOTAL, 1.5) * 0.85),
            filter: activated.size === TOTAL 
              ? 'grayscale(0) contrast(1) brightness(1)' 
              : `grayscale(${1 - (activated.size / TOTAL)}) contrast(${0.5 + (activated.size / TOTAL) * 0.5}) brightness(${0.2 + (activated.size / TOTAL) * 0.8})`
          }}
          draggable={false}
        />

        <div className={styles.fragmentsArea}>
          {FRAGMENTS.map(frag => (
            <button
              key={frag.id}
              className={`${styles.fragment} ${activated.has(frag.id) ? styles.fragmentActive : ''}`}
              style={{ '--frag-top': frag.pos.top, '--frag-left': frag.pos.left }}
              onClick={() => handleActivate(frag)}
              onMouseEnter={() => handleFragmentEnter(frag)}
            >
              <span className={styles.fragmentTitle}>{frag.title}</span>
            </button>
          ))}
        </div>

        {activeFragment && (
          <div className={styles.infoPanel}>
            <h2 className={styles.infoTitle}>{activeFragment.title}</h2>
            <p className={styles.infoContent}>{activeFragment.content}</p>
            <button className={styles.closeBtn} onClick={() => setActiveFragment(null)}>Fermer</button>
          </div>
        )}
      </div>
    </SceneShell>
  )
}
