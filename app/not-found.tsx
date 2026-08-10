import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Container } from '@/components/primitives/container'
import { Overline } from '@/components/primitives/typography'
import { Button } from '@/components/ui/button'
import { navLinks } from '@/lib/site-data'

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] items-center bg-surface-dark pt-32 pb-20">
      <Container>
        <Overline tone="dark">Error 404</Overline>
        <h1 className="mt-4 max-w-2xl font-serif text-display-lg font-bold text-balance text-on-dark">
          We could not find that page.
        </h1>
        <p className="mt-5 max-w-xl text-lede text-on-dark-muted">
          The link may be out of date. Everything on the site is one step away from
          here.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button size="cta-lg" nativeButton={false} render={<Link href="/" />}>
            Back to home
            <ArrowRight data-icon="inline-end" />
          </Button>
          <Button
            variant="on-dark"
            size="cta-lg"
            nativeButton={false}
            render={<Link href="/contact" />}
          >
            Contact us
          </Button>
        </div>

        <nav aria-label="Site" className="mt-12 border-t border-line-on-dark pt-8">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded text-body text-on-dark-muted outline-none transition-colors hover:text-gold focus-visible:ring-2 focus-visible:ring-on-dark"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  )
}
