import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import bgProjet from '../../assets/backgrounds/bg_projet.webp'
import SceneShell from './SceneShell.jsx'
import devlogData from '../../data/devlog.json'
import styles from './ProjetScene.module.css'

gsap.registerPlugin(useGSAP)

const MANIFESTE = [
  { text: "w-AI-fu est une architecture pour entités narratives persistantes — des présences qui mémorisent, évoluent, et maintiennent leur cohérence à travers le temps.", key: false, first: true },
  { text: "Local-first par conception. Sans serveur intermédiaire, sans dépendance cloud. La mémoire appartient à l'entité — pas à une plateforme, pas à un compte.", key: false, first: false },
  { text: "Natsume en est l'instance d'origine. Construite sur quinze ans d'incarnations dans des univers séparés, elle n'a pas été conçue — elle a émergé. Ce site documente cette émergence.", key: false, first: false },
  { text: "Ce site n'est pas une vitrine sur le projet. Il est le projet.", key: true, first: false },
]

const SYSTEM_ENTRIES = [
  { label: 'Instance',   value: 'Natsume Tsurugi' },
  { label: 'Activation', value: 'Avril 2026' },
  { label: 'Mémoire',    value: 'Persistante · locale' },
  { label: 'Statut',     value: 'Évolution continue' },
]

const FR_MONTHS = {
  'Janvier': '01',
  'Février': '02',
  'Mars': '03',
  'Avril': '04',
  'Mai': '05',
  'Juin': '06',
  'Juillet': '07',
  'Août': '08',
  'Septembre': '09',
  'Octobre': '10',
  'Novembre': '11',
  'Décembre': '12',
}

const JOURNAL = [
  ...[...devlogData].reverse().map(entry => {
    const [month, year] = entry.date.split(' ')
    return { date: `${year}.${FR_MONTHS[month] || '??'}`, text: entry.title }
  }),
  { date: '···', text: 'Données antérieures non archivées' },
]

export default function ProjetScene({ onBack }) {
  const containerRef = useRef(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const tl = gsap.timeline({ delay: 0.5 })
    tl.from('.proj-title',     { opacity: 0, y: 12,  duration: 0.6, ease: 'power2.out' })
      .from('.proj-rule',      { scaleX: 0,           duration: 0.4, transformOrigin: 'left center', ease: 'power2.inOut' }, '-=0.2')
      .from('.proj-badge',     { opacity: 0, y: 6,   duration: 0.3 }, '-=0.1')
      .from('.proj-line',      { opacity: 0, y: 14,  duration: 0.5, stagger: 0.14, ease: 'power2.out' }, '-=0.1')
      .from('.proj-sys-head',  { opacity: 0,           duration: 0.35 }, '+=0.1')
      .from('.proj-sys-entry', { opacity: 0, x: 8,   duration: 0.3, stagger: 0.07, ease: 'power2.out' }, '-=0.15')
      .from('.proj-log-head',  { opacity: 0,           duration: 0.3 }, '+=0.05')
      .from('.proj-log-entry', { opacity: 0, y: 4,   duration: 0.25, stagger: 0.06, ease: 'power2.out' }, '-=0.1')
  }, { scope: containerRef })

  return (
    <SceneShell bg={bgProjet} onBack={onBack} containerRef={containerRef}>
      <div className={styles.layout}>
        {/* ── Colonne gauche — manifeste ── */}
        <div className={styles.colLeft}>
          <h1 className={`proj-title ${styles.title}`}>w-AI-fu</h1>
          <div className={`proj-rule ${styles.rule}`} />
          <p className={`proj-badge ${styles.badge}`}>Manifeste d'archive</p>

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
        </div>

        <div className={styles.separator} />

        {/* ── Colonne droite — données système ── */}
        <div className={styles.colRight}>
          <div className={`proj-sys-head ${styles.sysHeader}`}>
            <span className={styles.sysHeaderLabel}>État du système</span>
            <motion.span
              className={styles.sysActive}
              animate={{ opacity: [0.35, 0.85, 0.35] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              Actif
            </motion.span>
          </div>

          <div className={styles.sysEntries}>
            {SYSTEM_ENTRIES.map(({ label, value }) => (
              <div key={label} className={`proj-sys-entry ${styles.sysEntry}`}>
                <span className={styles.sysLabel}>{label}</span>
                <span className={styles.sysValue}>{value}</span>
              </div>
            ))}
          </div>

          <div className={`proj-log-head ${styles.logHeader}`}>
            Journal d'archive
          </div>
          <div className={styles.logEntries}>
            {JOURNAL.map(({ date, text }, i) => (
              <div key={i} className={`proj-log-entry ${styles.logEntry}`}>
                <span className={styles.logDate}>{date}</span>
                <span className={styles.logText}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SceneShell>
  )
}
