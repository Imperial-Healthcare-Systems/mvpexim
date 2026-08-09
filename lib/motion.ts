import type { Variants } from 'framer-motion'

/**
 * The site's motion vocabulary. Everything animated pulls its timing from here
 * so the whole site moves with one hand.
 *
 * Reduced motion is handled in two places, neither of which is a JS branch
 * inside a component:
 *   1. <MotionConfig reducedMotion="user"> in the root layout, which stops
 *      Framer animating transforms at all.
 *   2. A `[data-motion]` rule in globals.css that pins elements to their
 *      resting state.
 * Branching on useReducedMotion() during render would change the markup Framer
 * serialises for SSR and break hydration, so we deliberately don't.
 */

export const EASE_OUT = [0.22, 1, 0.36, 1] as const
export const EASE_SOFT = [0.4, 0, 0.2, 1] as const

export const DURATION = {
  fast: 0.2,
  base: 0.32,
  slow: 0.45,
} as const

/** Fire once, a little before the element is fully on screen. */
export const VIEWPORT = { once: true, margin: '-10% 0px -8% 0px' } as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.slow, ease: EASE_OUT } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DURATION.slow, ease: EASE_OUT } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: DURATION.slow, ease: EASE_OUT } },
}

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
}

/** Route change: a short fade with a barely-there rise. No exit animation — see PageTransition. */
export const pageEnter: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE_OUT } },
}

/** Shared spring for card/button lift. Tuned to feel crisp, not bouncy. */
export const LIFT_SPRING = { type: 'spring', stiffness: 300, damping: 24 } as const
