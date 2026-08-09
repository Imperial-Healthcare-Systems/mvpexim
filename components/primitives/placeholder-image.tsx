'use client'

import Image from 'next/image'
import { ImageIcon } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/lib/utils'

/**
 * Every photographic slot on the site goes through this component.
 *
 * It always paints an on-brand placeholder underneath, then lays the real file
 * on top. If the file at `src` exists you see the photo; if it doesn't (or
 * fails to load) the placeholder stays visible with its label instead of a
 * broken-image icon. That is what makes swapping in artwork a one-step change:
 * drop the file at the path listed in IMAGES.md and it appears — no code edit,
 * no import, no config.
 *
 * `width`/`height` are the intended pixel dimensions and drive the container's
 * aspect-ratio box, so the space is reserved before load and nothing shifts.
 */
export function PlaceholderImage({
  src,
  alt,
  width,
  height,
  label,
  priority = false,
  sizes = '100vw',
  className,
  imageClassName,
  rounded = 'rounded-2xl',
}: {
  src: string
  /** Written for the real intended photograph, not the placeholder. */
  alt: string
  width: number
  height: number
  /** Short caption shown only while the real file is absent. */
  label?: string
  priority?: boolean
  sizes?: string
  className?: string
  imageClassName?: string
  rounded?: string
}) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  return (
    <div
      className={cn(
        'relative isolate overflow-hidden bg-surface-dark/[0.06]',
        rounded,
        className,
      )}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {/* Placeholder treatment. Sits at the bottom of the stack, so a loaded
          photo simply covers it. */}
      <div
        aria-hidden="true"
        className={cn(
          'absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center',
          'bg-[linear-gradient(135deg,oklch(0.27_0.065_258/0.10),oklch(0.27_0.065_258/0.03))]',
          'transition-opacity duration-300',
          loaded && !failed ? 'opacity-0' : 'opacity-100',
        )}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.5] [background-image:repeating-linear-gradient(45deg,oklch(0.27_0.065_258/0.05)_0_1px,transparent_1px_10px)]"
        />
        <ImageIcon className="relative size-5 text-surface-dark/35" />
        {label && (
          <span className="relative max-w-[22ch] text-caption font-medium text-surface-dark/45">
            {label}
          </span>
        )}
      </div>

      {!failed && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn('object-cover', imageClassName)}
        />
      )}
    </div>
  )
}
