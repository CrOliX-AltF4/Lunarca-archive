import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import SealIntro     from './components/ui/SealIntro.jsx'
import NatsumeWidget from './components/widget/NatsumeWidget.jsx'
import FrameOverlay  from './components/ui/FrameOverlay.jsx'
import Footer        from './components/ui/Footer.jsx'
import SystemMenu    from './components/ui/SystemMenu.jsx'
import CustomCursor        from './components/ui/CustomCursor.jsx'
import TrophyNotification  from './components/ui/TrophyNotification.jsx'
import AchievementsPanel   from './components/ui/AchievementsPanel.jsx'
import useAchievements     from './hooks/useAchievements.js'
import { SCENES }          from './constants/scenes.js'

const LibraryScene = lazy(() => import('./components/scenes/LibraryScene.jsx'))
const NatsumeScene = lazy(() => import('./components/scenes/NatsumeScene.jsx'))
const ProjetScene  = lazy(() => import('./components/scenes/ProjetScene.jsx'))
const DevlogScene  = lazy(() => import('./components/scenes/DevlogScene.jsx'))
const ContactScene = lazy(() => import('./components/scenes/ContactScene.jsx'))

export { SCENES }

function SceneFallback() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'var(--color-void)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <span style={{
        fontFamily: 'Cinzel, serif', fontSize: '0.7rem',
        letterSpacing: '0.3em', color: 'var(--color-fog)',
      }}>···</span>
    </div>
  )
}

// Résout le hash d'entrée — null si invalide ou absent
function resolveHashScene() {
  const h = window.location.hash.replace('#', '')
  return Object.values(SCENES).includes(h) ? h : null
}

function resolveInitialScene(hashScene) {
  if (hashScene) return hashScene
  const returning = parseInt(localStorage.getItem('lunarca_seal') || '0') > 0
  if (returning) {
    const last = localStorage.getItem('lunarca_last_scene')
    if (last && Object.values(SCENES).includes(last)) return last
  }
  return SCENES.LIBRARY
}

export default function App() {
  const hashScene = resolveHashScene()

  // Direct URL (A2) → bypass SealIntro, atterrissage direct
  const [archiveOpen, setArchiveOpen] = useState(!!hashScene)
  const [currentScene, setCurrentScene] = useState(() => resolveInitialScene(hashScene))
  const [devlogReading, setDevlogReading] = useState(false)
  const [systemMenuOpen, setSystemMenuOpen] = useState(false)
  const [achievementsOpen, setAchievementsOpen] = useState(false)
  const achievement = useAchievements()

  const sealInitialClicks = parseInt(localStorage.getItem('lunarca_seal') || '0') >= 3 ? 2 : 0
  const visitedScenesRef  = useRef(new Set())
  const cartographerFired = useRef(false)

  const handleSealComplete = useCallback(() => setArchiveOpen(true), [])
  const navigate = useCallback((scene) => setCurrentScene(scene), [])
  const goBack   = useCallback(() => setCurrentScene(SCENES.LIBRARY), [])

  useEffect(() => {
    if (!archiveOpen) return
    window.location.hash = currentScene
    localStorage.setItem('lunarca_last_scene', currentScene)
  }, [currentScene, archiveOpen])

  useEffect(() => {
    if (!archiveOpen || cartographerFired.current) return
    const sections = [SCENES.NATSUME, SCENES.PROJET, SCENES.DEVLOG, SCENES.CONTACT]
    visitedScenesRef.current.add(currentScene)
    if (sections.every(s => visitedScenesRef.current.has(s))) {
      cartographerFired.current = true
      window.dispatchEvent(new CustomEvent('natsume:trigger', {
        detail: { trigger: 'onCartographer', scene: 'global' },
      }))
    }
  }, [currentScene, archiveOpen])

  return (
    <div style={{ width: '100vw', height: '100dvh', position: 'relative', overflow: 'hidden' }}>

      <CustomCursor />

      <AnimatePresence>
        {!archiveOpen && (
          <SealIntro
            key="seal"
            initialClicks={sealInitialClicks}
            onComplete={handleSealComplete}
          />
        )}
      </AnimatePresence>

      {archiveOpen && (
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
              <DevlogScene key="devlog" onBack={goBack} onViewChange={setDevlogReading} />
            )}
            {currentScene === SCENES.CONTACT && (
              <ContactScene key="contact" onBack={goBack} />
            )}
          </AnimatePresence>
          {currentScene !== SCENES.NATSUME && <NatsumeWidget currentScene={currentScene} />}
          {!devlogReading && <FrameOverlay />}
          <Footer currentScene={currentScene} onSystemMenuOpen={() => setSystemMenuOpen(true)} />
          <SystemMenu
            open={systemMenuOpen}
            onClose={() => setSystemMenuOpen(false)}
            onResetSeal={() => setArchiveOpen(false)}
            onOpenAchievements={() => setAchievementsOpen(true)}
          />
          <AchievementsPanel
            open={achievementsOpen}
            onClose={() => setAchievementsOpen(false)}
          />
          <AnimatePresence>
            {achievement && (
              <TrophyNotification
                key={achievement.key}
                title={achievement.title}
                description={achievement.description}
              />
            )}
          </AnimatePresence>
        </Suspense>
      )}

    </div>
  )
}
