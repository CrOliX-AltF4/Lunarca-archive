import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import LibraryScene from './components/scenes/LibraryScene.jsx'
import NatsumeScene from './components/scenes/NatsumeScene.jsx'
import ProjetScene from './components/scenes/ProjetScene.jsx'
import DevlogScene from './components/scenes/DevlogScene.jsx'
import ContactScene from './components/scenes/ContactScene.jsx'
import NatsumeWidget from './components/widget/NatsumeWidget.jsx'

export const SCENES = {
  LIBRARY: 'library',
  NATSUME: 'natsume',
  PROJET: 'projet',
  DEVLOG: 'devlog',
  CONTACT: 'contact',
}

export default function App() {
  const [currentScene, setCurrentScene] = useState(SCENES.LIBRARY)

  const navigate = (scene) => setCurrentScene(scene)
  const goBack = () => setCurrentScene(SCENES.LIBRARY)

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <AnimatePresence mode="wait">
        {currentScene === SCENES.LIBRARY && (
          <LibraryScene key="library" onNavigate={navigate} />
        )}
        {currentScene === SCENES.NATSUME && (
          <NatsumeScene key="natsume" onBack={goBack} />
        )}
        {currentScene === SCENES.PROJET && (
          <ProjetScene key="projet" onBack={goBack} />
        )}
        {currentScene === SCENES.DEVLOG && (
          <DevlogScene key="devlog" onBack={goBack} />
        )}
        {currentScene === SCENES.CONTACT && (
          <ContactScene key="contact" onBack={goBack} />
        )}
      </AnimatePresence>

      <NatsumeWidget currentScene={currentScene} />
    </div>
  )
}
