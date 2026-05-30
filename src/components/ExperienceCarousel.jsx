import { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { assetUrl } from '../utils/assetUrl'
import { useRtl } from '../hooks/useRtl'

const DISPLAY_MS = 3000
const SLIDE_DURATION = 1.2

const ITEMS = [
  { key: 'dining', image: 'assets/experience/dining.jpg' },
  { key: 'family', image: 'assets/experience/family.jpg' },
  { key: 'events', image: 'assets/experience/events.jpg' },
  { key: 'ambiance', image: 'assets/experience/ambiance.jpg' },
]

const FALLBACK = assetUrl('assets/restaurant.jpg')
const slideEase = [0.45, 0.05, 0.15, 1]

function slideVariants(rtl) {
  return {
    enter: (dir) => ({
      x: rtl ? `${-dir * 100}%` : `${dir * 100}%`,
      opacity: 0.6,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({
      x: rtl ? `${dir * 100}%` : `${-dir * 100}%`,
      opacity: 0.6,
    }),
  }
}

export default function ExperienceCarousel() {
  const { t } = useTranslation()
  const isRtl = useRtl()
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [failed, setFailed] = useState({})
  const [paused, setPaused] = useState(false)
  const indexRef = useRef(0)
  const resumeTimerRef = useRef(null)

  const goTo = useCallback((next) => {
    const current = indexRef.current
    const count = ITEMS.length
    const normalized = ((next % count) + count) % count
    if (normalized === current) return
    setDirection(normalized > current ? 1 : -1)
    indexRef.current = normalized
    setIndex(normalized)
  }, [])

  const goNext = useCallback(() => {
    goTo(indexRef.current + 1)
  }, [goTo])

  const goPrev = useCallback(() => {
    goTo(indexRef.current - 1)
  }, [goTo])

  useEffect(() => {
    indexRef.current = index
  }, [index])

  useEffect(() => {
    if (paused) return
    const timer = setInterval(goNext, DISPLAY_MS)
    return () => clearInterval(timer)
  }, [paused, goNext])

  const item = ITEMS[index]
  const src = failed[item.key] ? FALLBACK : assetUrl(item.image)
  const imageMotion = slideVariants(isRtl)

  return (
    <div
      className="experience__carousel"
      onMouseEnter={() => {
        clearTimeout(resumeTimerRef.current)
        setPaused(true)
      }}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => {
        clearTimeout(resumeTimerRef.current)
        setPaused(true)
      }}
      onTouchEnd={() => {
        resumeTimerRef.current = setTimeout(() => setPaused(false), 12000)
      }}
    >
      <div className="experience__carousel-media">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={`${item.key}-${failed[item.key] ? 'fb' : 'img'}`}
            src={src}
            alt={t(`experience.items.${item.key}.title`)}
            className="experience__carousel-image"
            custom={direction}
            variants={imageMotion}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: SLIDE_DURATION, ease: slideEase }}
            onError={() => setFailed((prev) => ({ ...prev, [item.key]: true }))}
          />
        </AnimatePresence>

        <div className="experience__carousel-shade" aria-hidden />

        <button
          type="button"
          className="experience__carousel-arrow experience__carousel-arrow--prev"
          onClick={goPrev}
          aria-label={t('experience.prev')}
        >
          ‹
        </button>
        <button
          type="button"
          className="experience__carousel-arrow experience__carousel-arrow--next"
          onClick={goNext}
          aria-label={t('experience.next')}
        >
          ›
        </button>

        {paused && <span className="experience__carousel-paused">.</span>}
      </div>

      <div className="experience__carousel-content">
        <div className="experience__carousel-text-slot">
          <motion.div
            key={item.key}
            className="experience__carousel-text"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: slideEase, delay: 0.25 }}
          >
            <h3 className="experience__carousel-title">
              {t(`experience.items.${item.key}.title`)}
            </h3>
            <p className="experience__carousel-desc">
              {t(`experience.items.${item.key}.desc`)}
            </p>
          </motion.div>
        </div>

        <div className="experience__carousel-dots" role="tablist" aria-label={t('experience.label')}>
          {ITEMS.map((entry, i) => (
            <button
              key={entry.key}
              type="button"
              role="tab"
              className={i === index ? 'active' : ''}
              aria-selected={i === index}
              aria-label={t(`experience.items.${entry.key}.title`)}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
