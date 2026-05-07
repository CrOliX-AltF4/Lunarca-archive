import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import bgProjet from '../../assets/backgrounds/bg_projet.webp'
import SceneShell from './SceneShell.jsx'
import styles from './ProjetScene.module.css'

const STREAMS = [
  { id: 1, text: 'INIT_SEQUENCE: 0x04F2', detail: 'Initialisation du noyau narratif.' },
  { id: 2, text: 'SYNC_STATUS: 98%', detail: 'Synchronisation des états locaux stable.' },
  { id: 3, text: 'ERR_MEM: 0x000', detail: 'Aucune corruption détectée en mémoire vive.' },
  { id: 4, text: 'PROC_LOAD: 12ms', detail: 'Temps de cycle de traitement optimisé.' },
]

export default function ProjetScene({ onBack }) {
  const containerRef = useRef(null)
  const [activeData, setActiveData] = useState(null)

  useGSAP(() => {
    // Infinite stream animation
    gsap.to(`.${styles.packet}`, {
      x: '110vw',
      duration: 10 + Math.random() * 5,
      repeat: -1,
      ease: 'none',
      stagger: 2
    })
  }, { scope: containerRef })

  return (
    <SceneShell bg={bgProjet} onBack={onBack} overlay={0.3} containerRef={containerRef} variant="fade">
      <div className={styles.streamRoom}>
        {STREAMS.map((packet, i) => (
          <div 
            key={packet.id} 
            className={styles.packet}
            style={{ top: `${15 + i * 20}%` }}
            onMouseEnter={() => setActiveData(packet)}
            onMouseLeave={() => setActiveData(null)}
          >
            {packet.text}
          </div>
        ))}

        {activeData && (
          <div className={styles.syncDisplay}>
            <p className={styles.syncText}>{activeData.detail}</p>
          </div>
        )}
      </div>
    </SceneShell>
  )
}
