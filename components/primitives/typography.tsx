import type { ElementType, ReactNode } from 'react'

import { cn } from '@/lib/utils'

/** Small uppercase kicker above a headline. Rust on light, gold on navy. */
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
        'text-overline uppercase',
        tone === 'dark' ? 'text-gold' : 'text-brand-accent',
        className,
      )}
    >
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
          'font-serif font-semibold text-balance',
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
