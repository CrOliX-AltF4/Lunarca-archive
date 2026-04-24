import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './LandingPage.module.css'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
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

function LogoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const logos = [
    { name: 'React', icon: '⚛️' },
    { name: 'Vite', icon: '⚡' },
    { name: 'Framer Motion', icon: '🎭' },
    { name: 'CSS Modules', icon: '🎨' },
    { name: 'GitHub', icon: '🐙' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % logos.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [logos.length])

  return (
    <div className={styles.logoCarousel}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className={styles.logoItem}
        >
          <span className={styles.logoIcon}>{logos[currentIndex].icon}</span>
          <span className={styles.logoName}>{logos[currentIndex].name}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function LandingContact({ onBack }) {
  return (
    <div className={styles.root}>
      <div className={styles.pageFrame}>
        <header className={`${styles.header} ${styles.headerSticky}`}>
          <div className={styles.brand}>LUNARCA</div>
          <nav className={styles.nav}>
            <button onClick={onBack}>HOME</button>
          </nav>
          <button className={styles.shopButton} onClick={onBack}>
            Back
          </button>
        </header>

        <motion.section className={styles.contactHero} initial="hidden" animate="visible" variants={fadeUp}>
          <div className={styles.contactHeroContent}>
            <p className={styles.sectionLabel}>Contact Us</p>
            <h1 className={styles.contactHeroTitle}>Let's Connect</h1>
            <p className={styles.contactHeroText}>
              Reach out to the Lunarca team. Whether you're interested in collaboration, have questions about our work, or just want to say hello.
            </p>
            <AssetPlaceholder
              label="Hero illustration placeholder"
              caption="Contact hero illustration — 800x400, professional contact theme"
            />
          </div>
        </motion.section>

        <motion.section className={styles.contactGrid} initial="hidden" animate="visible" variants={stagger}>
          <motion.div className={styles.contactCard} variants={fadeUp}>
            <AssetPlaceholder label="Email icon" caption="Email contact icon — 64x64, envelope style" />
            <h3>Email</h3>
            <p>Get in touch directly via email for inquiries, partnerships, or support.</p>
            <button className={styles.primaryButton}>Send Email</button>
          </motion.div>

          <motion.div className={styles.contactCard} variants={fadeUp}>
            <AssetPlaceholder label="Discord icon" caption="Discord community icon — 64x64, chat bubble style" />
            <h3>Discord</h3>
            <p>Join our community server for real-time discussions and updates.</p>
            <button className={styles.secondaryButton}>Join Server</button>
          </motion.div>

          <motion.div className={styles.contactCard} variants={fadeUp}>
            <AssetPlaceholder label="Social media icon" caption="Social media icon — 64x64, share/network style" />
            <h3>Social Media</h3>
            <p>Follow us on Twitter/X for the latest news and behind-the-scenes content.</p>
            <button className={styles.buttonGhost}>Follow Us</button>
          </motion.div>
        </motion.section>

        <motion.section className={styles.contactLogos} initial="hidden" animate="visible" variants={fadeUp}>
          <div className={styles.logosSection}>
            <h2>Built with</h2>
            <LogoCarousel />
          </div>
        </motion.section>

        <motion.section className={styles.contactForm} initial="hidden" animate="visible" variants={fadeUp}>
          <div className={styles.contactFormPanel}>
            <AssetPlaceholder
              label="Contact form illustration"
              caption="Form illustration — 400x200, contact/message theme"
            />
            <h2>Send us a message</h2>
            <form className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="subject">Subject</label>
                <select id="subject" name="subject">
                  <option value="general">General Inquiry</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="support">Support</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" required></textarea>
              </div>
              <button type="submit" className={styles.primaryButton}>Send Message</button>
            </form>
          </div>
        </motion.section>

        <motion.section className={styles.contactAssets} initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp}>
            <AssetPlaceholder
              label="Team photo placeholder"
              caption="Team photo — 600x400, professional group shot"
            />
          </motion.div>
          <motion.div variants={fadeUp}>
            <AssetPlaceholder
              label="Office/workspace placeholder"
              caption="Workspace photo — 600x400, creative environment"
            />
          </motion.div>
        </motion.section>
      </div>
    </div>
  )
}
