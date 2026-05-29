/** Shared motion presets — smooth, elegant reveal on scroll */
export const ease = [0.22, 1, 0.36, 1]

export const viewport = {
  once: true,
  margin: '-50px',
  amount: 0.2,
}

export const transition = {
  duration: 0.8,
  ease,
}

export const transitionFast = {
  duration: 0.55,
  ease,
}

export const fadeUp = {
  hidden: { opacity: 0, y: 36, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

export const fadeUpSoft = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9, filter: 'blur(8px)' },
  visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
}

export const slideFromStart = (rtl = false) => ({
  hidden: { opacity: 0, x: rtl ? 56 : -56, filter: 'blur(8px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
})

export const slideFromEnd = (rtl = false) => ({
  hidden: { opacity: 0, x: rtl ? -56 : 56, filter: 'blur(8px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
})

export const imageReveal = {
  hidden: {
    opacity: 0,
    scale: 1.06,
    y: 24,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
  },
}

export const cardReveal = {
  hidden: { opacity: 0, y: 48, scale: 0.96, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
}

export const staggerContainerSlow = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
}

export const lineReveal = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 1 },
}
