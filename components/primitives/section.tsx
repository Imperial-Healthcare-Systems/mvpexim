import type { ReactNode } from 'react'

import { Container } from '@/components/primitives/container'
import { cn } from '@/lib/utils'

const tones = {
  /** Warm off-white — the default page surface. */
  light: 'bg-surface text-ink',
  /** One step down, for alternating bands. */
  sunken: 'bg-surface-sunken text-ink',
  /** Brand navy. Text inside must use on-dark tokens, never `ink`. */
  dark: 'bg-surface-dark text-on-dark',
} as const

const sizes = {
  sm: 'py-14 lg:py-20',
  base: 'py-section lg:py-section-lg',
  lg: 'py-section-lg lg:py-40',
} as const

/**
 * Vertical rhythm + surface tone in one place. Pages alternate tones rather
 * than inventing backgrounds, which is what keeps the whole site feeling like
 * one document.
 */
export function Section({
  children,
  className,
  innerClassName,
  tone = 'light',
  size = 'base',
  width = 'page',
  id,
  bleed = false,
}: {
  children: ReactNode
  className?: string
  innerClassName?: string
  tone?: keyof typeof tones
  size?: keyof typeof sizes
  width?: 'page' | 'reading'
  id?: string
  /** Skip the Container — for sections that manage their own full-bleed layout. */
  bleed?: boolean
}) {
  return (
    <section id={id} className={cn(tones[tone], sizes[size], className)}>
      {bleed ? (
        children
      ) : (
        <Container width={width} className={innerClassName}>
          {children}
        </Container>
      )}
    </section>
  )
}
