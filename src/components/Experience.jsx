import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import { cardReveal, staggerContainer, viewport, transition, ease } from '../animations/motion'

const ITEM_KEYS = ['dining', 'family', 'events', 'ambiance']
const ICONS = ['🍽', '👨‍👩‍👧‍👦', '🎉', '🌙']

export default function Experience() {
  const { t } = useTranslation()

  return (
    <section id="experience" className="experience section">
      <div className="experience__bg" aria-hidden />
      <div className="container">
        <SectionHeader
          label={t('experience.label')}
          title={t('experience.title')}
          centered
        />

        <motion.div
          className="experience__grid"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer}
        >
          {ITEM_KEYS.map((key, i) => (
            <motion.div
              key={key}
              className="experience__card"
              variants={cardReveal}
              transition={{ ...transition, delay: i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.3, ease } }}
            >
              <motion.span
                className="experience__icon"
                aria-hidden
                initial={{ scale: 0, rotate: -20 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={viewport}
                transition={{ type: 'spring', stiffness: 260, damping: 18, delay: i * 0.1 + 0.2 }}
              >
                {ICONS[i]}
              </motion.span>
              <h3>{t(`experience.items.${key}.title`)}</h3>
              <p>{t(`experience.items.${key}.desc`)}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
