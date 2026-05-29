import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import ExperienceCarousel from './ExperienceCarousel'
import { viewport, ease } from '../animations/motion'

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
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.8, ease }}
        >
          <ExperienceCarousel />
        </motion.div>
      </div>
    </section>
  )
}
