'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

import { DURATION, EASE_OUT } from '@/lib/motion'

/**
 * Route transition.
 *
 * `template.tsx` (not `layout.tsx`) is the right hook for this: Next remounts
 * a template on every navigation, so the enter animation replays per route
 * without any keying of our own.
 *
 * Deliberately enter-only. AnimatePresence exit animations need the outgoing
 * tree to stay mounted, which the App Router does not do for route segments —
 * the usual workarounds fight the router and break scroll restoration. A short
 * fade-in on arrival gives the polish without that cost.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      data-motion=""
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.base, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  )
}
