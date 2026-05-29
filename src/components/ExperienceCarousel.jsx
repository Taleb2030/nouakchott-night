import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { assetUrl } from '../utils/assetUrl'

const INTERVAL_MS = 6000

const ITEMS = [
  { key: 'dining', image: 'assets/experience/dining.jpg' },
  { key: 'family', image: 'assets/experience/family.jpg' },
  { key: 'events', image: 'assets/experience/events.jpg' },
  { key: 'ambiance', image: 'assets/experience/ambiance.jpg' },
]

const FALLBACK = assetUrl('assets/restaurant.jpg')

export default function ExperienceCarousel() {
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)
  const [failed, setFailed] = useState({})

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % ITEMS.length)
    }, INTERVAL_MS)
    return () => clearInterval(timer)
  }, [])

  const item = ITEMS[index]
  const src = failed[item.key] ? FALLBACK : assetUrl(item.image)

  return (
    <div className="experience__carousel">
      <div className="experience__carousel-media">
        <AnimatePresence mode="wait">
          <motion.img
            key={`${item.key}-${failed[item.key] ? 'fb' : 'img'}`}
            src={src}
            alt={t(`experience.items.${item.key}.title`)}
            className="experience__carousel-image"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onError={() => setFailed((prev) => ({ ...prev, [item.key]: true }))}
          />
        </AnimatePresence>
        <div className="experience__carousel-shade" aria-hidden />
      </div>

      <div className="experience__carousel-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.key}
            className="experience__carousel-text"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="experience__carousel-title">
              {t(`experience.items.${item.key}.title`)}
            </h3>
            <p className="experience__carousel-desc">
              {t(`experience.items.${item.key}.desc`)}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="experience__carousel-dots" role="tablist" aria-label={t('experience.label')}>
          {ITEMS.map((entry, i) => (
            <button
              key={entry.key}
              type="button"
              role="tab"
              className={i === index ? 'active' : ''}
              aria-selected={i === index}
              aria-label={t(`experience.items.${entry.key}.title`)}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
