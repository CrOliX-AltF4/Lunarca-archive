import { useRef } from 'react'
import BookItem from './BookItem.jsx'
import { SCENES } from '../../constants/scenes.js'
import bookNatsume from '../../assets/books/book_natsume.png'
import bookProjet  from '../../assets/books/book_projet.png'
import bookDevlog  from '../../assets/books/book_devlog.png'
import bookContact from '../../assets/books/book_contact.png'

const BOOKS_CONFIG = [
  { id: SCENES.NATSUME, label: 'Natsume',      asset: bookNatsume, position: { left: '20%', top: '35%' }, floatDelay: 0   },
  { id: SCENES.PROJET,  label: 'Projet w-AI-fu',asset: bookProjet,  position: { left: '37%', top: '30%' }, floatDelay: 0.8 },
  { id: SCENES.DEVLOG,  label: 'Devlog',        asset: bookDevlog,  position: { left: '54%', top: '30%' }, floatDelay: 1.6 },
  { id: SCENES.CONTACT, label: 'Contact',       asset: bookContact, position: { left: '71%', top: '35%' }, floatDelay: 2.4 },
]

const RAPID_WINDOW = 1500

export default function BooksContainer({ onNavigate, onNatsumeTripleClick, isContactSealed = true }) {
  const rapidRef = useRef({ clicks: [], fired: false })

  const handleBookClick = (id) => {
    const state = rapidRef.current
    const now = Date.now()
    state.clicks = state.clicks.filter((c) => now - c.time < RAPID_WINDOW)
    state.clicks.push({ time: now, id })

    const uniqueIds = new Set(state.clicks.map((c) => c.id))
    if (!state.fired && uniqueIds.size >= BOOKS_CONFIG.length) {
      state.fired = true
      window.dispatchEvent(new CustomEvent('natsume:trigger', {
        detail: { trigger: 'onBooksRapidClick', scene: 'library' },
      }))
      setTimeout(() => { state.fired = false }, 5000)
    }

    onNavigate(id)
  }

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {BOOKS_CONFIG.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          onClick={() => handleBookClick(book.id)}
          onTripleClick={book.id === SCENES.NATSUME ? onNatsumeTripleClick : undefined}
          sealed={book.id === SCENES.CONTACT && isContactSealed}
        />
      ))}
    </div>
  )
}
