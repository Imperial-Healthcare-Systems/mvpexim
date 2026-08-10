import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

/**
 * The card surface used across products, values, differentiators and stats.
 * `tone` must match the section it sits in — a light card on a navy Section
 * will fail contrast.
 */
export function Card({
  children,
  className,
  tone = 'light',
  padded = true,
}: {
  children: ReactNode
  className?: string
  tone?: 'light' | 'dark'
  padded?: boolean
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border',
        padded && 'p-6 lg:p-7',
        tone === 'dark'
          ? 'border-line-on-dark bg-on-dark/[0.04]'
          : 'border-line bg-surface-raised shadow-card',
        className,
      )}
    >
      {children}
    </div>
  )
}

/** Small rounded label — status, market, Incoterm. */
export function Pill({
  children,
  className,
  tone = 'neutral',
}: {
  children: ReactNode
  className?: string
  tone?: 'neutral' | 'accent' | 'gold' | 'outline-dark'
}) {
  const tones = {
    neutral: 'border-line bg-surface-sunken text-ink-muted',
    accent: 'border-brand-accent/25 bg-brand-accent/8 text-brand-accent',
    gold: 'border-gold/35 bg-gold/10 text-gold',
    'outline-dark': 'border-line-on-dark bg-on-dark/5 text-on-dark-muted',
  }[tone]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-caption font-medium',
        tones,
        className,
      )}
    >
      {children}
    </span>
  )
}

/** A single headline number with its label. */
export function Stat({
  value,
  label,
  tone = 'light',
  className,
}: {
  value: ReactNode
  label: string
  tone?: 'light' | 'dark'
  className?: string
}) {
  return (
    <div className={className}>
      <div
        className={cn(
          'tabular font-serif text-display-sm font-bold',
          tone === 'dark' ? 'text-on-dark' : 'text-surface-dark',
        )}
      >
        {value}
      </div>
      <div
        className={cn(
          'mt-1 text-caption uppercase tracking-wide',
          tone === 'dark' ? 'text-on-dark-subtle' : 'text-ink-subtle',
        )}
      >
        {label}
      </div>
    </div>
  )
}

/**
 * Label/value table used for product specifications. Rendered as a real <dl>
 * so a buyer copying specs into an RFQ gets structured text.
 */
export function SpecList({
  items,
  columns = 2,
  tone = 'light',
  className,
}: {
  items: { label: string; value: string }[]
  columns?: 1 | 2 | 3
  tone?: 'light' | 'dark'
  className?: string
}) {
  const cols = {
    1: '',
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
  }[columns]

  return (
    <dl className={cn('grid gap-x-8 gap-y-5', cols, className)}>
      {items.map((item) => (
        <div
          key={item.label}
          className={cn(
            'border-t pt-3',
            tone === 'dark' ? 'border-line-on-dark' : 'border-line',
          )}
        >
          <dt
            className={cn(
              'text-overline uppercase',
              tone === 'dark' ? 'text-on-dark-subtle' : 'text-ink-subtle',
            )}
          >
            {item.label}
          </dt>
          <dd
            className={cn(
              'tabular mt-1.5 text-body font-medium',
              tone === 'dark' ? 'text-on-dark' : 'text-ink',
            )}
          >
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}
