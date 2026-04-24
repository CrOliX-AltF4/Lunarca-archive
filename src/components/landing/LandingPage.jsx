import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './LandingPage.module.css'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

function AssetPlaceholder({ label, caption }) {
  return (
    <div className={styles.assetPlaceholder}>
      <div className={styles.placeholderBlock}>
        <span>{label}</span>
      </div>
      <p className={styles.placeholderCaption}>{caption}</p>
    </div>
  )
}

export default function LandingPage({ onEnterArchive, onNavigateHome, onNavigateContact }) {
  const [scrolled, setScrolled] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    const container = rootRef.current?.parentElement
    if (!container) return

    const handler = () => setScrolled(container.scrollTop > 24)
    container.addEventListener('scroll', handler, { passive: true })
    return () => container.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div ref={rootRef} className={styles.root}>
      <div className={styles.pageFrame}>
        <header className={`${styles.header} ${scrolled ? styles.headerSticky : ''}`}>
          <div className={styles.brand}>LUNARCA</div>
          <nav className={styles.nav}>
            <button onClick={onNavigateHome}>HOME</button>
            <button onClick={() => scrollTo('family')}>FAMILY</button>
            <button onClick={() => scrollTo('chat')}>GET NOWA CHAT</button>
            <button onClick={onNavigateContact}>CONTACT</button>
          </nav>
          <button className={styles.shopButton}>SHOP</button>
        </header>

        <section className={styles.hero} id="hero">
          <div className={styles.heroGrid}>
            <motion.div className={styles.heroCopy} initial="hidden" animate="visible" variants={stagger}>
              <motion.p className={styles.heroSubtitle} variants={fadeUp}>
                Hi, boss!
              </motion.p>
              <motion.h1 className={styles.heroTitle} variants={fadeUp}>
                How can I help you today?
              </motion.h1>
              <motion.div className={styles.heroNotes} variants={fadeUp}>
                <span className={styles.noteBadge}>Virtual Idol</span>
                <span className={styles.noteBadgeLight}>Virtual Assistant</span>
                <span className={styles.noteBadgeMuted}>3 stars</span>
              </motion.div>
              <motion.p className={styles.heroText} variants={fadeUp}>
                A playful front door for the project, built as a bright, interactive landing page that hides the archive behind a single click.
              </motion.p>
              <motion.div className={styles.heroActions} variants={fadeUp}>
                <button className={styles.primaryButton} onClick={() => scrollTo('family')}>
                  Learn More About NOWA AI
                </button>
                <button className={styles.secondaryButton} onClick={() => scrollTo('chat')}>
                  Virtual Idol
                </button>
              </motion.div>
            </motion.div>

            <motion.div className={styles.heroVisual} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: 'easeOut' }}>
              <AssetPlaceholder
                label="Hero illustration placeholder"
                caption="Large character artwork — 520x520 or wider, rounded rectangle"
              />
            </motion.div>
          </div>
        </section>

        <section className={styles.section} id="family">
          <div className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>Meet the Family</p>
            <h2 className={styles.sectionTitle}>Meet the Family!</h2>
          </div>

          <div className={styles.familyGrid}>
            <motion.article className={styles.familyCard} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <AssetPlaceholder label="NOWA-Mirai portrait" caption="Avatar placeholder — square, first character" />
              <h3>NOWA-Mirai</h3>
              <p>Our first customized AI character, built to engage and connect with an audience as an interactive brand ambassador.</p>
            </motion.article>

            <motion.article className={styles.familyCard} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <AssetPlaceholder label="Unknown character" caption="Secondary character placeholder — hidden / unrevealed" />
              <h3>???</h3>
              <p>Secret family member. Placeholder until the project reveals their identity and role.</p>
            </motion.article>

            <motion.article className={styles.familyCard} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <AssetPlaceholder label="Unknown character" caption="Secondary character placeholder — hidden / unrevealed" />
              <h3>???</h3>
              <p>Another mysterious presence from the archive, waiting for future discovery.</p>
            </motion.article>
          </div>
        </section>

        <section className={styles.sectionAlt} id="chat">
          <div className={styles.featureCardBlue}>
            <div>
              <p className={styles.featureLabel}>NOWA Chat</p>
              <h3>VTubing Tool</h3>
              <p>NOWA Chat is a tool for controlling the VTuber model by text. Try it for free.</p>
              <button className={styles.buttonGhost} onClick={() => scrollTo('live')}>
                learn more
              </button>
            </div>
            <AssetPlaceholder label="Chat illustration" caption="Illustration placeholder — simplified monochrome style" />
          </div>
        </section>

        <section className={styles.sectionLight} id="live">
          <div className={styles.featureCardLight}>
            <AssetPlaceholder label="Live illustration" caption="Illustration placeholder — live feature, stack of books" />
            <div>
              <p className={styles.featureLabel}>NOWA Live</p>
              <h3>Your daily task manager, designed to inspire exploration and discovery.</h3>
              <button className={styles.buttonGhost} onClick={() => scrollTo('news')}>
                learn more
              </button>
            </div>
          </div>
        </section>

        <section className={styles.sectionNews} id="news">
          <div className={styles.sectionHeaderCentered}>
            <h2>See the latest news in our World!</h2>
          </div>
          <div className={styles.newsGrid}>
            <div className={styles.newsCard}>
              <h3>New official YouTube channel</h3>
              <p>We’re excited to announce the launch of our new YouTube channel dedicated to NOVA’s story.</p>
              <button className={styles.primaryButton} onClick={() => onEnterArchive()}>
                View the launch
              </button>
            </div>
            <AssetPlaceholder label="News card asset" caption="Media or screenshot placeholder — news highlight" />
          </div>
        </section>

        <section className={styles.sectionSubscribe} id="subscribe">
          <div className={styles.subscriberPanel}>
            <div>
              <h2>Join us and subscribe for exclusive perks!</h2>
              <p>Subscribe to the newsletter, join the community and be first in line for every update.</p>
            </div>
            <div className={styles.subscribeButtons}>
              <button className={styles.primaryButton}>subscribe to our Patreon</button>
              <button className={styles.secondaryButton}>or join our Community!</button>
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <div className={styles.footerBrand}>LUNARCA</div>
          <div className={styles.footerLinks}>
            <a href="#hero">Home</a>
            <a href="#family">Family</a>
            <a href="#chat">Get NOWA Chat</a>
            <a href="#news">News</a>
          </div>
          <div className={styles.footerNote}>
            © 2026 Lunarca — A narrative archive for Project Natsume.
          </div>
        </footer>
      </div>
    </div>
  )
}
