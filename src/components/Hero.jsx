import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Logo from './Logo'
import { ease } from '../animations/motion'
import { assetUrl } from '../utils/assetUrl'

const HERO_VIDEO = assetUrl('assets/videos/video1.mp4')

const heroStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
}

const heroItem = {
  hidden: { opacity: 0, y: 32, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease },
  },
}

const heroLogo = {
  hidden: { opacity: 0, y: 20, scale: 0.88, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 1, ease },
  },
}

export default function Hero() {
  const { t } = useTranslation()
  const videoRef = useRef(null)
  const [useVideo, setUseVideo] = useState(true)

  return (
    <section id="home" className="hero">
      <motion.div
        className="hero__media"
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease }}
      >
        {useVideo ? (
          <video
            ref={videoRef}
            className="hero__video"
            autoPlay
            muted
            loop
            playsInline
            onError={() => setUseVideo(false)}
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
        ) : null}
        <div className={`hero__fallback ${useVideo ? '' : 'hero__fallback--visible'}`} aria-hidden />
        <div className="hero__overlay" />
        <div className="hero__grain" aria-hidden />
      </motion.div>

      <motion.div
        className="hero__content container"
        variants={heroStagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="hero__logo-stage" variants={heroLogo}>
          <span className="hero__logo-glow" aria-hidden />
          <span className="hero__logo-ring hero__logo-ring--outer" aria-hidden />
          <span className="hero__logo-ring hero__logo-ring--inner" aria-hidden />
          <div className="hero__logo-glass">
            <Logo className="hero__logo" variant="hero" />
          </div>
          <span className="hero__logo-spark hero__logo-spark--left" aria-hidden />
          <span className="hero__logo-spark hero__logo-spark--right" aria-hidden />
        </motion.div>

        <motion.p className="hero__tagline" variants={heroItem}>
          {t('hero.tagline')}
        </motion.p>
        <motion.h1 className="hero__title" variants={heroItem}>
          {t('hero.title')}
        </motion.h1>
        <motion.p className="hero__subtitle" variants={heroItem}>
          {t('hero.subtitle')}
        </motion.p>
        <motion.div className="hero__actions" variants={heroItem}>
          <motion.a
            href="#contact"
            className="btn btn--gold btn--lg"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.25 }}
          >
            {t('hero.cta')}
          </motion.a>
          <motion.a
            href="#about"
            className="btn btn--outline"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.25 }}
          >
            {t('hero.scroll')}
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        className="hero__scroll"
        aria-label={t('hero.scroll')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span className="hero__scroll-line" />
      </motion.a>
    </section>
  )
}
