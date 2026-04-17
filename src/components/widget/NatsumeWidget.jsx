import { AnimatePresence, motion } from 'framer-motion'
import useNatsumeWidget from '../../hooks/useNatsumeWidget.js'
import DialogueBubble from './DialogueBubble.jsx'
import MangaEffect from './MangaEffect.jsx'

import natsumeIdle from '../../assets/natsume/natsume_idle.png'
import natsumeParle from '../../assets/natsume/natsume_parle.png'
import natsumeApprobation from '../../assets/natsume/natsume_approbation.png'
import natsumeIrritation from '../../assets/natsume/natsume_irritation.png'
import natsumeFull from '../../assets/natsume/natsume_full.png'

const PORTRAITS = {
  idle: natsumeIdle,
  parle: natsumeParle,
  approbation: natsumeApprobation,
  irritation: natsumeIrritation,
  surprise: natsumeFull,
  gene: natsumeFull,
  indifference: natsumeIdle,
}

export default function NatsumeWidget({ currentScene }) {
  const { mood, dialogue, effect } = useNatsumeWidget(currentScene)

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      right: '2rem',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      pointerEvents: 'none',
    }}>
      <AnimatePresence>
        {dialogue && <DialogueBubble key={dialogue} text={dialogue} />}
      </AnimatePresence>

      <div style={{ position: 'relative' }}>
        <AnimatePresence>
          {effect && <MangaEffect key={effect} type={effect} />}
        </AnimatePresence>

        <motion.img
          key={mood}
          src={PORTRAITS[mood] ?? natsumeIdle}
          alt="Natsume"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.4 } }}
          exit={{ opacity: 0, x: 20 }}
          style={{ width: '220px', height: 'auto', display: 'block' }}
        />
      </div>
    </div>
  )
}
