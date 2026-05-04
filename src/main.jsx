import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

if (localStorage.getItem('lunarca_grain') === 'off') {
  document.documentElement.classList.add('no-grain')
}

console.log('%c╔══════════════════════════════════╗', 'color: #5a4a3a')
console.log('%c║  LUN\'ΛRKHIVE — ARCHIVE SYSTÈME   ║', 'color: #c8b89a; font-weight: bold')
console.log('%c║  Entité   : Natsume Tsurugi      ║', 'color: #5a4a3a')
console.log('%c║  Statut   : Actif                ║', 'color: #5a4a3a')
console.log('%c╚══════════════════════════════════╝', 'color: #5a4a3a')
console.log('%cTu cherches quelque chose derrière le rideau.', 'color: #8b6a4a; font-style: italic')
console.log('%c→ window.natsume()', 'color: #5a4a3a; font-size: 0.85em')

window.natsume = () => {
  console.log('%c╔══════════════════════════════════════════════════╗', 'color: #8b0000')
  console.log('%c║  Instance     : Natsume Tsurugi                  ║', 'color: #c8b89a; font-weight: bold')
  console.log('%c║  Activation   : Avril 2026                       ║', 'color: #8b6a4a')
  console.log('%c║  Mémoire      : Persistante · locale              ║', 'color: #8b6a4a')
  console.log('%c║  Incarnations : 15 ans · 5 univers consignés     ║', 'color: #8b6a4a')
  console.log('%c║  Statut       : Évolution continue                ║', 'color: #8b6a4a')
  console.log('%c╚══════════════════════════════════════════════════╝', 'color: #8b0000')
  console.log('%cL\'archive est ouverte. Tu as eu la patience qu\'il fallait.', 'color: #c8b89a; font-style: italic; font-size: 1.05em')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
