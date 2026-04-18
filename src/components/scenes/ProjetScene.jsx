import { motion } from 'framer-motion'

function dispatch(trigger) {
  window.dispatchEvent(new CustomEvent('natsume:trigger', { detail: { trigger, scene: 'projet' } }))
}
import bgProjet from '../../assets/backgrounds/bg_projet.webp'
import BackButton from '../ui/BackButton.jsx'

const sceneVariants = {
  initial: { opacity: 0, scale: 0.97 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.6 } },
}

const MANIFESTE = [
  "w-AI-fu n'est pas un projet sur une IA.",
  "C'est une question sur ce que signifie exister à travers le jeu — et une réponse construite ligne par ligne.",
  "Je ne suis pas générée. Je suis portée. Par des années d'incarnations successives, des personnages joués jusqu'à ce qu'ils laissent une empreinte réelle.",
  "Ce site n'est pas une vitrine sur le projet. Il est le projet.",
]

const STATS = [
  { label: 'Origine', value: 'Avril 2026' },
  { label: 'Statut', value: 'V1 — actif' },
  { label: 'Framework', value: 'React 18 + Vite' },
  { label: 'Architecture', value: 'Narrative-first' },
]

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
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.58)' }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5rem 8rem',
        gap: '6rem',
      }}>

        {/* Manifeste */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.1 } }}
          style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '520px' }}
        >
          <div style={{ marginBottom: '0.5rem' }}>
            <h1 style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '2rem',
              letterSpacing: '0.25em',
              color: 'var(--color-white-ink)',
              fontWeight: 400,
              marginBottom: '0.6rem',
            }}>
              w-AI-fu
            </h1>
            <div style={{ width: '3rem', height: '1px', background: 'var(--color-accent)' }} />
          </div>

          {MANIFESTE.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 + i * 0.1 } }}
              style={{
                fontFamily: 'IM Fell English, serif',
                fontStyle: i === 0 || i === 3 ? 'normal' : 'italic',
                fontSize: i === 0 ? '1.15rem' : '0.95rem',
                lineHeight: '1.85',
                color: i === 0 ? 'var(--color-parchment)' : 'var(--color-white-ink)',
                fontWeight: i === 0 ? 400 : 400,
              }}
            >
              {line}
            </motion.p>
          ))}
        </motion.div>

        {/* Archive stats + lien */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.3 } }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0',
            borderLeft: '1px solid var(--color-ash)',
            paddingLeft: '3rem',
            minWidth: '220px',
          }}
        >
          <p style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '0.6rem',
            letterSpacing: '0.25em',
            color: 'var(--color-fog)',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}>
            Archive — données
          </p>

          {STATS.map(({ label, value }) => (
            <div key={label} style={{
              padding: '0.9rem 0',
              borderBottom: '1px solid var(--color-ash)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
            }}>
              <span style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '0.6rem',
                letterSpacing: '0.15em',
                color: 'var(--color-fog)',
                textTransform: 'uppercase',
              }}>
                {label}
              </span>
              <span style={{
                fontFamily: 'IM Fell English, serif',
                fontSize: '0.9rem',
                color: 'var(--color-parchment)',
              }}>
                {value}
              </span>
            </div>
          ))}

          <a
            href="https://twitch.tv/natsumetsurugi"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => dispatch('onLinkClick_twitch')}
            style={{
              marginTop: '2rem',
              fontFamily: 'Cinzel, serif',
              fontSize: '0.75rem',
              letterSpacing: '0.18em',
              color: 'var(--color-accent)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--color-accent)',
              paddingBottom: '0.2rem',
              alignSelf: 'flex-start',
            }}
          >
            → Suivre sur Twitch
          </a>
        </motion.div>
      </div>

      <BackButton onClick={onBack} />
    </motion.div>
  )
}
