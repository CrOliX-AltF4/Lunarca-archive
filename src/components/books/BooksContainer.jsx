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

export default function BooksContainer({ onNavigate, onNatsumeTripleClick }) {
  const rapidRef = useRef({ clicks: [], fired: false })

  const handleBookClick = (id) => {
    const state = rapidRef.current
    const now = Date.now()
    state.clicks = state.clicks.filter((t) => now - t < RAPID_WINDOW)
    state.clicks.push(now)

    const uniqueBooks = new Set(state.clicks.map((_, i) => i))
    if (!state.fired && state.clicks.length >= BOOKS_CONFIG.length) {
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
        />
      ))}
    </div>
  )
}
