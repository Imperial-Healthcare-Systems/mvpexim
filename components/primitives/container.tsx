import type { ElementType, ReactNode } from 'react'

import { cn } from '@/lib/utils'

/**
 * The single source of horizontal rhythm. Every page uses this — nothing sets
 * its own max-width or gutter, so columns line up across routes.
 */
export function Container({
  children,
  className,
  width = 'page',
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  /** `reading` narrows to a comfortable measure for long-form copy. */
  width?: 'page' | 'reading'
  as?: ElementType
}) {
  return (
    <Tag
      className={cn(
        'mx-auto w-full px-6 lg:px-10',
        width === 'reading' ? 'max-w-reading' : 'max-w-page',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
