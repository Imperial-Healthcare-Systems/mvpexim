import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'

import { Container } from '@/components/primitives/container'
import { Overline } from '@/components/primitives/typography'
import { siteConfig } from '@/lib/site-data'
import { cn } from '@/lib/utils'

/**
 * The navy masthead that opens every route except Home.
 *
 * This is load-bearing, not decorative: the site header is transparent with
 * WHITE text until you scroll 80px, which only reads against a dark backdrop.
 * Home gets that from its hero; every other page gets it from here. A light
 * page top would render white nav links on near-white.
 */
export function PageHeader({
  overline,
  title,
  lede,
  breadcrumb,
  children,
  image = '/images/page-header-bg.jpg',
  imageAlt = '',
  scrim = true,
}: {
  overline?: string
  title: ReactNode
  lede?: ReactNode
  breadcrumb?: { label: string; href: string }[]
  children?: ReactNode
  /** Masthead backdrop. Override per route where a more specific shot exists. */
  image?: string
  /** Describes the banner photograph. It is content, not decoration. */
  imageAlt?: string
  /** Set false to show the photograph raw. Text will fail contrast where bright. */
  scrim?: boolean
}) {
  /**
   * BreadcrumbList structured data, derived from the same array that renders
   * the visible trail — so the two can never drift. The current page is
   * appended as the final item, which is what Google expects for a rich
   * breadcrumb result. `title` is used only when it is a plain string;
   * ReactNode titles are skipped rather than stringified into markup.
   */
  const breadcrumbJsonLd =
    breadcrumb && breadcrumb.length > 0 && typeof title === 'string'
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            ...breadcrumb.map((crumb, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: crumb.label,
              item: new URL(crumb.href, siteConfig.url).toString(),
            })),
            {
              '@type': 'ListItem',
              position: breadcrumb.length + 1,
              name: title,
            },
          ],
        }
      : null

  return (
    <header>
      {breadcrumbJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      )}

      {/* The photograph is the masthead background; the copy sits on it.
          `bg-surface-dark` underneath means the band is navy for the instant
          before the image paints, so text is never briefly unreadable. */}
      <div className="relative isolate overflow-hidden bg-surface-dark pt-32 pb-16 lg:pt-40 lg:pb-24">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />

        {/* Legibility scrim.
            White heading text over these photographs measures 2.0:1 in the nav
            band and 3.3:1 in the headline zone; AA needs 4.5:1, and worst-case
            patches hit 1.0:1. Compositing shows ~55-90% navy is what it takes
            to clear the threshold, so that is what this is — no more.
            Set `scrim={false}` on any page to strip it entirely and show the
            photograph raw; the text will fail contrast where the image is
            bright. */}
        {scrim && (
          <>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-surface-dark/85 via-surface-dark/66 to-surface-dark/38"
            />
            {/* The fixed site header sits over the top of this band with white
                nav links, and that strip is the brightest part of several
                images. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-surface-dark/70 to-transparent"
            />
          </>
        )}

        <Container>
          {breadcrumb && breadcrumb.length > 0 && (
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-1.5 text-caption text-on-dark-subtle">
                {breadcrumb.map((crumb, i) => (
                  <li key={crumb.href} className="flex items-center gap-1.5">
                    {i > 0 && <ChevronRight aria-hidden="true" className="size-3.5" />}
                    <Link
                      href={crumb.href}
                      className={cn(
                        'rounded outline-none transition-colors hover:text-on-dark',
                        'focus-visible:ring-2 focus-visible:ring-on-dark',
                      )}
                    >
                      {crumb.label}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {overline && <Overline tone="dark">{overline}</Overline>}

          <h1
            className={cn(
              'max-w-4xl font-serif text-display-lg font-bold text-balance text-on-dark',
              overline && 'mt-4',
            )}
          >
            {title}
          </h1>

          {lede && (
            <p className="mt-6 max-w-2xl text-lede text-pretty text-on-dark-muted">{lede}</p>
          )}

          {children && <div className="mt-10">{children}</div>}
        </Container>
      </div>
    </header>
  )
}
