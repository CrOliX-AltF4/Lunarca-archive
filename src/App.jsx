import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import SealIntro              from './components/ui/SealIntro.jsx'
import NarratorIntroOverlay   from './components/ui/NarratorIntroOverlay.jsx'
import NatsumeWidget          from './components/widget/NatsumeWidget.jsx'
import NarratorNote           from './components/narrator/NarratorNote.jsx'
import FrameOverlay           from './components/ui/FrameOverlay.jsx'
import Footer                 from './components/ui/Footer.jsx'
import SystemMenu             from './components/ui/SystemMenu.jsx'
import CustomCursor           from './components/ui/CustomCursor.jsx'
import TrophyNotification     from './components/ui/TrophyNotification.jsx'
import AchievementsPanel      from './components/ui/AchievementsPanel.jsx'
import useAchievements        from './hooks/useAchievements.js'
import useNarrator            from './hooks/useNarrator.js'
import useNarrativeState      from './hooks/useNarrativeState.js'
import { SCENES }             from './constants/scenes.js'

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

function resolveHashScene() {
  const h = window.location.hash.replace('#', '')
  return Object.values(SCENES).includes(h) ? h : null
}

function resolveIntroVariant() {
  const hasVisited = !!localStorage.getItem('lunarca_has_visited')
  if (!hasVisited) return 'first'
  if (new Date().getHours() === 0) return 'night'
  return 'return'
}

export default function App() {
  const hashScene = resolveHashScene()

  const [introPhase, setIntroPhase]         = useState(hashScene ? 'archive' : 'seal')
  const [currentScene, setCurrentScene]     = useState(hashScene ?? SCENES.LIBRARY)
  const [devlogReading, setDevlogReading]   = useState(false)
  const [systemMenuOpen, setSystemMenuOpen] = useState(false)
  const [achievementsOpen, setAchievementsOpen] = useState(false)

  const introVariant = useRef(resolveIntroVariant())
  const archiveOpen  = introPhase === 'archive'

  const {
    isContactSealed,
    recordScene,
    recordDevlogProgress,
    recordGazeHeld,
    recordContactAttempt,
    resetAll,
  } = useNarrativeState()

  const achievement = useAchievements()
  const { text: narratorText, type: narratorType, side: narratorSide, clear: clearNarrator } = useNarrator(currentScene)

  // Transitions d'intro
  const handleSealComplete  = useCallback(() => setIntroPhase('narrator'), [])
  const handleIntroComplete = useCallback(() => {
    localStorage.setItem('lunarca_has_visited', Date.now().toString())
    setIntroPhase('archive')
  }, [])

  // Navigation — recordScene ici uniquement (évite le double-appel via useEffect)
  const navigate = useCallback((scene) => {
    recordScene(scene)
    setCurrentScene(scene)
  }, [recordScene])

  const goBack = useCallback(() => {
    recordScene(SCENES.LIBRARY)
    setCurrentScene(SCENES.LIBRARY)
  }, [recordScene])

  // Enregistrement initial (Library) quand l'archive s'ouvre
  useEffect(() => {
    if (archiveOpen) recordScene(SCENES.LIBRARY)
  }, [archiveOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  // Hash + last scene persistence
  useEffect(() => {
    if (!archiveOpen) return
    window.location.hash = currentScene
    localStorage.setItem('lunarca_last_scene', currentScene)
  }, [currentScene, archiveOpen])

  // Reset seal
  const handleResetSeal = useCallback(() => {
    resetAll()
    setCurrentScene(SCENES.LIBRARY)
    setIntroPhase('seal')
  }, [resetAll])

  // Natsume events → narrative state
  useEffect(() => {
    const handler = (e) => {
      const { trigger } = e.detail ?? {}
      if (trigger === 'onGazeHeld')      recordGazeHeld()
      if (trigger === 'onDevlogProgress') recordDevlogProgress()
      if (trigger === 'onContactSealAttempt') {
        const idx = recordContactAttempt() - 1
        window.dispatchEvent(new CustomEvent('narrator:trigger', {
          detail: { trigger: 'intro_contact_sealed', scene: 'library', index: idx },
        }))
      }
    }
    window.addEventListener('natsume:trigger', handler)
    return () => window.removeEventListener('natsume:trigger', handler)
  }, [recordGazeHeld, recordDevlogProgress, recordContactAttempt])

  return (
    <div style={{ width: '100vw', height: '100dvh', position: 'relative', overflow: 'hidden' }}>
      <CustomCursor />

      <AnimatePresence>
        {introPhase === 'seal' && (
          <SealIntro key="seal" initialClicks={0} onComplete={handleSealComplete} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {introPhase === 'narrator' && (
          <NarratorIntroOverlay
            key="narrator-intro"
            variant={introVariant.current}
            onComplete={handleIntroComplete}
          />
        )}
      </AnimatePresence>

      {archiveOpen && (
        <Suspense fallback={<SceneFallback />}>
          <AnimatePresence mode="wait">
            {currentScene === SCENES.LIBRARY && (
              <LibraryScene key="library" onNavigate={navigate} isContactSealed={isContactSealed} />
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

          <NatsumeWidget currentScene={currentScene} />
          <NarratorNote
            text={narratorText}
            type={narratorType}
            side={narratorSide}
            onDone={clearNarrator}
          />
          {!devlogReading && <FrameOverlay />}
          <Footer currentScene={currentScene} onSystemMenuOpen={() => setSystemMenuOpen(true)} />
          <SystemMenu
            open={systemMenuOpen}
            onClose={() => setSystemMenuOpen(false)}
            onResetSeal={handleResetSeal}
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
