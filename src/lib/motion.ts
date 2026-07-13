import type { Variants } from 'framer-motion'

/**
 * Signature easing — matches the brand's --ease-out token
 * (cubic-bezier(0.16, 1, 0.3, 1)). Quick, confident, never bouncy.
 */
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]
export const EASE_STANDARD: [number, number, number, number] = [0.4, 0, 0.2, 1]

/** Fade + rise. The core storytelling reveal used across the site. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: EASE_OUT } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
}

/** Parent that staggers its children into view. */
export const staggerContainer = (stagger = 0.1, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
})

/** Shared viewport config so reveals fire once, slightly before fully in view. */
export const viewportOnce = { once: true, amount: 0.25, margin: '0px 0px -80px 0px' } as const
