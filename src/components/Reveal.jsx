import { motion } from 'framer-motion'
import { fadeUp, viewport, transition } from '../animations/motion'

export default function Reveal({
  children,
  className = '',
  variants = fadeUp,
  delay = 0,
  as = 'div',
  once = true,
  amount,
}) {
  const Component = motion[as] ?? motion.div

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...viewport, once, ...(amount != null && { amount }) }}
      variants={variants}
      transition={{ ...transition, delay }}
    >
      {children}
    </Component>
  )
}
