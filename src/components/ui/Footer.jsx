import styles from './Footer.module.css'

const SCENE_LABELS = {
  library: 'Bibliothèque',
  natsume: 'Natsume',
  projet:  'Projet',
  devlog:  'Devlog',
  contact: 'Contact',
}

export default function Footer({ currentScene, onSystemMenuOpen }) {
  return (
    <footer className={styles.footer}>
      <span className={styles.logo}>Lunarca</span>
      <span className={styles.sceneLabel}>{SCENE_LABELS[currentScene] ?? ''}</span>
      <button
        className={styles.systemButton}
        onClick={onSystemMenuOpen}
        aria-label="Menu système"
      >
        ◈
      </button>
    </footer>
  )
}
