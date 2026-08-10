'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { ArrowRight, MessageCircle, Phone } from 'lucide-react'

import { Container } from '@/components/primitives/container'
import { Overline } from '@/components/primitives/typography'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/site-data'

/**
 * Route-level error boundary. A marketing site that throws should still leave a
 * buyer able to reach us — hence the phone and WhatsApp routes rather than a
 * bare "something went wrong".
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[route error]', error)
  }, [error])

  return (
    <section className="flex min-h-[70svh] items-center bg-surface-dark pt-32 pb-20">
      <Container>
        <Overline tone="dark">Something went wrong</Overline>
        <h1 className="mt-4 max-w-2xl font-serif text-display-lg font-bold text-balance text-on-dark">
          This page failed to load.
        </h1>
        <p className="mt-5 max-w-xl text-lede text-on-dark-muted">
          Our apologies. Try again, or reach us directly — we would rather hear from
          you than have you leave.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button size="cta-lg" onClick={reset}>
            Try again
          </Button>
          <Button
            variant="on-dark"
            size="cta-lg"
            nativeButton={false}
            render={<a href={siteConfig.phoneHref} />}
          >
            <Phone data-icon="inline-start" />
            {siteConfig.phone}
          </Button>
          <Button
            variant="on-dark"
            size="cta-lg"
            nativeButton={false}
            render={
              <a href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer" />
            }
          >
            <MessageCircle data-icon="inline-start" />
            WhatsApp
          </Button>
        </div>

        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-1.5 rounded text-body font-semibold text-on-dark underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-on-dark"
        >
          Back to home
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>

        {error.digest && (
          <p className="mt-8 text-caption text-on-dark-subtle">
            Reference: <span className="tabular">{error.digest}</span>
          </p>
        )}
      </Container>
    </section>
  )
}
