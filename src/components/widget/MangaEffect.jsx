import { motion } from 'framer-motion'
import fxSpeed from '../../assets/effects/fx_speed.png'
import fxSweat from '../../assets/effects/fx_sweat.png'
import fxVein from '../../assets/effects/fx_vein.png'
import fxCloud from '../../assets/effects/fx_cloud.png'
import fxSilence from '../../assets/effects/fx_silence.png'

const EFFECTS = {
  speed: fxSpeed,
  sweat: fxSweat,
  vein: fxVein,
  cloud: fxCloud,
  silence: fxSilence,
}

export default function MangaEffect({ type }) {
  const src = EFFECTS[type]
  if (!src) return null

  return (
    <motion.img
      src={src}
      alt=""
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, transition: { duration: 0.2 } }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        pointerEvents: 'none',
        mixBlendMode: 'screen',
      }}
    />
  )
}
