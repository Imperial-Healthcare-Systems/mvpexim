import type { ElementType, ReactNode } from 'react'

import { cn } from '@/lib/utils'

/**
 * Small uppercase kicker above a headline, with a short rule to its left.
 * The rule is a traditional editorial device — §11.1 marks the brand
 * "established and traditional" 1/5 and "craft and selectivity" 5/5.
 * Rust on light surfaces, gold on navy.
 */
export function Overline({
  children,
  className,
  tone = 'light',
}: {
  children: ReactNode
  className?: string
  tone?: 'light' | 'dark'
}) {
  return (
    <p
      className={cn(
        'flex items-center gap-3 text-overline uppercase',
        tone === 'dark' ? 'text-gold' : 'text-brand-accent',
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-7 shrink-0 bg-current opacity-70" />
      {children}
    </p>
  )
}

/**
 * The standard section opener: kicker, headline, optional lede. Used on every
 * page so headline sizing never drifts between routes.
 */
export function SectionHeading({
  overline,
  title,
  lede,
  tone = 'light',
  align = 'start',
  as: Tag = 'h2',
  size = 'display-md',
  className,
}: {
  overline?: string
  title: ReactNode
  lede?: ReactNode
  tone?: 'light' | 'dark'
  align?: 'start' | 'center'
  as?: ElementType
  size?: 'display-sm' | 'display-md' | 'display-lg'
  className?: string
}) {
  const sizeClass = {
    'display-sm': 'text-display-sm',
    'display-md': 'text-display-md',
    'display-lg': 'text-display-lg',
  }[size]

  return (
    <div
      className={cn(
        align === 'center' && 'flex flex-col items-center text-center',
        className,
      )}
    >
      {overline && <Overline tone={tone}>{overline}</Overline>}
      <Tag
        className={cn(
          'font-serif font-bold text-balance',
          sizeClass,
          overline && 'mt-3',
          tone === 'dark' ? 'text-on-dark' : 'text-surface-dark',
        )}
      >
        {title}
      </Tag>
      {lede && (
        <p
          className={cn(
            'mt-5 max-w-2xl text-lede text-pretty',
            tone === 'dark' ? 'text-on-dark-muted' : 'text-ink-muted',
            align === 'center' && 'mx-auto',
          )}
        >
          {lede}
        </p>
      )}
    </div>
  )
}

/** Long-form body copy with consistent measure and paragraph rhythm. */
export function Prose({
  children,
  className,
  tone = 'light',
}: {
  children: ReactNode
  className?: string
  tone?: 'light' | 'dark'
}) {
  return (
    <div
      className={cn(
        'text-body-lg [&>p+p]:mt-5 [&>p]:text-pretty',
        tone === 'dark' ? 'text-on-dark-muted' : 'text-ink-muted',
        className,
      )}
    >
      {children}
    </div>
  )
}
