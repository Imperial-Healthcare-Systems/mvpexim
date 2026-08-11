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
}: {
  overline?: string
  title: ReactNode
  lede?: ReactNode
  breadcrumb?: { label: string; href: string }[]
  children?: ReactNode
  /** Masthead backdrop. Override per route where a more specific shot exists. */
  image?: string
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
    <header className="relative isolate overflow-hidden bg-surface-dark pt-32 pb-16 lg:pt-40 lg:pb-24">
      {breadcrumbJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      )}

      {/* Masthead photography. Held at 18% over navy so it reads as texture
          rather than a picture — the headline still sits on effectively solid
          brand navy, which is what keeps on-dark text at its measured contrast.
          `priority` because this is above the fold on every inner route. */}
      <Image
        src={image}
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="pointer-events-none -z-20 object-cover opacity-[0.18]"
      />

      {/* Navy wash over the photograph: heavier on the left where the copy
          sits, lifting to the right so the image still reads. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-surface-dark via-surface-dark/90 to-surface-dark/60"
      />
      {/* Soft radial lift so the flat navy doesn't read as a solid slab. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(90rem_40rem_at_15%_-10%,oklch(0.42_0.08_258/0.55),transparent_60%)]"
      />
      {/* Fade into whatever section follows. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-b from-transparent to-surface-dark"
      />

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
    </header>
  )
}
