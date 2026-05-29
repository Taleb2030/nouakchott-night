import { motion } from 'framer-motion'
import {
  fadeUpSoft,
  staggerContainer,
  lineReveal,
  viewport,
  transition,
  ease,
} from '../animations/motion'

export default function SectionHeader({ label, title, subtitle, centered = false }) {
  const className = `section-header ${centered ? 'section-header--center' : ''}`

  return (
    <motion.header
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer}
    >
      <motion.span className="section-label" variants={fadeUpSoft} transition={transition}>
        {label}
      </motion.span>
      <motion.h2 className="section-title" variants={fadeUpSoft} transition={transition}>
        {title}
      </motion.h2>
      <motion.span
        className="section-header__line"
        variants={lineReveal}
        transition={{ duration: 0.9, ease, delay: 0.1 }}
        aria-hidden
      />
      {subtitle && (
        <motion.p
          className="section-subtitle"
          variants={fadeUpSoft}
          transition={{ ...transition, delay: 0.05 }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.header>
  )
}
