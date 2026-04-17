import BookItem from './BookItem.jsx'
import { SCENES } from '../../App.jsx'
import bookNatsume from '../../assets/books/book_natsume.png'
import bookProjet from '../../assets/books/book_projet.png'
import bookDevlog from '../../assets/books/book_devlog.png'
import bookContact from '../../assets/books/book_contact.png'

const BOOKS_CONFIG = [
  {
    id: SCENES.NATSUME,
    label: 'Natsume',
    asset: bookNatsume,
    position: { left: '20%', top: '35%' },
    floatDelay: 0,
  },
  {
    id: SCENES.PROJET,
    label: 'Projet w-AI-fu',
    asset: bookProjet,
    position: { left: '37%', top: '30%' },
    floatDelay: 0.8,
  },
  {
    id: SCENES.DEVLOG,
    label: 'Devlog',
    asset: bookDevlog,
    position: { left: '54%', top: '30%' },
    floatDelay: 1.6,
  },
  {
    id: SCENES.CONTACT,
    label: 'Contact',
    asset: bookContact,
    position: { left: '71%', top: '35%' },
    floatDelay: 2.4,
  },
]

export default function BooksContainer({ onNavigate }) {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {BOOKS_CONFIG.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          onClick={() => onNavigate(book.id)}
        />
      ))}
    </div>
  )
}
