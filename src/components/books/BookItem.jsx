import { motion } from 'framer-motion'

export default function BookItem({ book, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      style={{
        position: 'absolute',
        left: book.position.left,
        top: book.position.top,
        cursor: 'pointer',
        transformOrigin: 'bottom center',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: [0, -8, 0],
        transition: {
          opacity: { duration: 0.8, delay: book.floatDelay * 0.3 },
          y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: book.floatDelay },
        },
      }}
      whileHover={{
        scale: 1.05,
        filter: 'drop-shadow(0 0 8px rgba(245,243,239,0.4))',
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.97 }}
    >
      <img
        src={book.asset}
        alt={book.label}
        style={{ width: '120px', height: 'auto', display: 'block' }}
      />
      <p style={{
        textAlign: 'center',
        fontFamily: 'Cinzel, serif',
        fontSize: '0.75rem',
        letterSpacing: '0.12em',
        marginTop: '0.5rem',
        color: 'var(--color-parchment)',
        textShadow: '0 0 8px rgba(0,0,0,0.8)',
      }}>
        {book.label}
      </p>
    </motion.div>
  )
}
