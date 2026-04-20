import { AnimatePresence, motion } from 'framer-motion'
import useNatsumeWidget from '../../hooks/useNatsumeWidget.js'
import DialogueBubble from './DialogueBubble.jsx'

import natsumeIdle           from '../../assets/natsume/natsume_idle.png'
import natsumeParle          from '../../assets/natsume/natsume_parle.png'
import natsumeApprobation    from '../../assets/natsume/natsume_approbation.png'
import natsumeIrritation     from '../../assets/natsume/natsume_irritation.png'
import natsumeSurprise       from '../../assets/natsume/natsume_surprise.png'
import natsumeGene           from '../../assets/natsume/natsume_gene.png'
import natsumeDisappointment from '../../assets/natsume/natsume_disappointment.png'

const PORTRAITS = {
  idle:           natsumeIdle,
  parle:          natsumeParle,
  approbation:    natsumeApprobation,
  irritation:     natsumeIrritation,
  surprise:       natsumeSurprise,
  gene:           natsumeGene,
  indifference:   natsumeDisappointment,
  disappointment: natsumeDisappointment,
}

export default function NatsumeWidget({ currentScene }) {
  const { mood, dialogue } = useNatsumeWidget(currentScene)

  return (
    <div style={{
      position: 'fixed',
      bottom: '50px',
      right: '10px',
      zIndex: 80,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      pointerEvents: 'none',
    }}>
      <AnimatePresence>
        {dialogue && <DialogueBubble key={dialogue} text={dialogue} />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.img
          key={mood}
          src={PORTRAITS[mood] ?? natsumeIdle}
          alt="Natsume"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.35 } }}
          exit={{ opacity: 0, x: 20, transition: { duration: 0.25 } }}
          style={{ width: '220px', height: 'auto', display: 'block' }}
        />
      </AnimatePresence>
    </div>
  )
}
