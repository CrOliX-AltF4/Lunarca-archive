import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import NatsumeWidget from './components/widget/NatsumeWidget.jsx'
import SealIntro from './components/ui/SealIntro.jsx'
import { SCENES } from './constants/scenes.js'

const LibraryScene = lazy(() => import('./components/scenes/LibraryScene.jsx'))
const NatsumeScene = lazy(() => import('./components/scenes/NatsumeScene.jsx'))
const ProjetScene  = lazy(() => import('./components/scenes/ProjetScene.jsx'))
const DevlogScene  = lazy(() => import('./components/scenes/DevlogScene.jsx'))
const ContactScene = lazy(() => import('./components/scenes/ContactScene.jsx'))

export { SCENES }

function SceneFallback() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'var(--color-void)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <span style={{
        fontFamily: 'Cinzel, serif',
        fontSize: '0.7rem',
        letterSpacing: '0.3em',
        color: 'var(--color-fog)',
      }}>
        ···
      </span>
    </div>
  )
}

export default function App() {
  const [introComplete, setIntroComplete] = useState(false)
  const [currentScene, setCurrentScene] = useState(() => {
    const hash = window.location.hash.replace('#', '')
    return Object.values(SCENES).includes(hash) ? hash : SCENES.LIBRARY
  })

  const navigate = (scene) => setCurrentScene(scene)
  const goBack = () => setCurrentScene(SCENES.LIBRARY)
  const handleIntroComplete = useCallback(() => setIntroComplete(true), [])

  useEffect(() => {
    window.location.hash = currentScene
  }, [currentScene])

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <AnimatePresence mode="wait">
        {!introComplete && (
          <SealIntro key="seal" onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {introComplete && (
        <Suspense fallback={<SceneFallback />}>
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
        </Suspense>
      )}
    </div>
  )
}
