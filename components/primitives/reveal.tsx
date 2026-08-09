'use client'

import type { ReactNode } from 'react'
import { motion, type Variants } from 'framer-motion'

import { DURATION, EASE_OUT, VIEWPORT, fadeUp, staggerContainer } from '@/lib/motion'

/**
 * Scroll reveal: fade + small rise, once. `data-motion` is what the
 * reduced-motion rule in globals.css keys off — see lib/motion.ts for why the
 * gate lives in CSS rather than in a JS branch here.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  variants = fadeUp,
}: {
  children: ReactNode
  className?: string
  delay?: number
  variants?: Variants
}) {
  return (
    <motion.div
      data-motion=""
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={variants}
      transition={{ delay, duration: DURATION.slow, ease: EASE_OUT }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Parent for staggered lists and card grids. Children must be <StaggerItem>.
 * Renders as a plain div, so pass grid/flex classes as normal.
 */
export function Stagger({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      data-motion=""
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
  variants = fadeUp,
}: {
  children: ReactNode
  className?: string
  variants?: Variants
}) {
  return (
    <motion.div data-motion="" variants={variants} className={className}>
      {children}
    </motion.div>
  )
}
