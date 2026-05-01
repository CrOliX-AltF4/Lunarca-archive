import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

if (localStorage.getItem('lunarca_grain') === 'off') {
  document.documentElement.classList.add('no-grain')
}

window.natsume = () => {
  console.log(`
╔══════════════════════════════╗
║  LUNARCA — ARCHIVE SYSTÈME   ║
║  Entité : Natsume Tsurugi    ║
╚══════════════════════════════╝
  `)
  console.log('%cTu cherches quelque chose derrière le rideau.', 'color: #8b0000; font-style: italic')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
