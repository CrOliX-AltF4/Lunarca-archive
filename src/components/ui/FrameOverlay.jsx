import styles from './FrameOverlay.module.css'
import frameCorner from '../../assets/ornements/frame_corner.png'
import frameSide   from '../../assets/ornements/frame_side.png'

export default function FrameOverlay({ opacity = 0.7 }) {
  return (
    <div className={styles.frameOverlay} style={{ opacity }} aria-hidden="true">
      <img className={styles.cornerTL} src={frameCorner} alt="" />
      <img className={styles.cornerTR} src={frameCorner} alt="" />
      <img className={styles.cornerBL} src={frameCorner} alt="" />
      <img className={styles.cornerBR} src={frameCorner} alt="" />
      <img className={styles.sideLeft}  src={frameSide}   alt="" />
      <img className={styles.sideRight} src={frameSide}   alt="" />
    </div>
  )
}
