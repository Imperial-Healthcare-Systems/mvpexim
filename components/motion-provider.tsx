'use client'

import { MotionConfig } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * `reducedMotion="user"` makes Framer honour the OS setting globally: transform
 * and layout animations are skipped and elements snap to their target values.
 * It pairs with the `[data-motion]` rule in globals.css, which covers the
 * styles Framer serialises into the SSR markup before any JS runs.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
