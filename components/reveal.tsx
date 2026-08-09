'use client'

import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp } from '@/lib/motion'

export function Reveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  variants?: Variants
  delay?: number
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
