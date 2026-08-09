import type { Metadata } from 'next'
import { Anchor, Clock, Globe2, Languages } from 'lucide-react'

import { PageHeader } from '@/components/primitives/page-header'
import { PlaceholderImage } from '@/components/primitives/placeholder-image'
import { Reveal, Stagger, StaggerItem } from '@/components/primitives/reveal'
import { Section } from '@/components/primitives/section'
import { Card, Pill } from '@/components/primitives/surface'
import { SectionHeading } from '@/components/primitives/typography'
import { CtaBand } from '@/components/sections/cta-band'
import { markets, ports, siteConfig } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Global Reach',
  description:
    'MVP Exim loads through JNPT, Mundra and Cochin, serving buyers in the United Arab Emirates, the United States and China. Reachable 9:00 AM – 9:00 PM IST in English and Hindi.',
  openGraph: {
    title: 'Global Reach | MVP Exim',
    description:
      'Ports of loading: JNPT, Mundra, Cochin. Active buyer markets: UAE, USA, China.',
    url: '/global-reach',
  },
  alternates: { canonical: '/global-reach' },
}

export default function GlobalReachPage() {
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: 'Home', href: '/' }]}
        overline="Global Reach"
        title="Shipping from Indian ports to buyers across the world."
        lede={`We load through ${ports.map((p) => p.name).join(', ')} and serve buyers in ${markets.join(', ')}.`}
      />

      {/* Ports */}
      <Section>
        <Reveal>
          <SectionHeading
            overline="Ports of Loading"
            title="Three ports, chosen for the lanes we run"
            lede="Which port a consignment loads from depends on origin and destination — we will confirm it with your quotation."
          />
        </Reveal>

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ports.map((port) => (
            <StaggerItem key={port.name} className="h-full">
              <Card className="h-full">
                <Anchor aria-hidden="true" className="size-6 text-brand-accent" />
                <h3 className="mt-5 font-serif text-heading font-semibold text-surface-dark">
                  {port.name}
                </h3>
                <p className="mt-1 text-body text-ink-muted">{port.region}</p>
                <Pill className="mt-4">{port.type}</Pill>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-12">
          <PlaceholderImage
            src="/images/containers-aerial.png"
            alt="Aerial view of a shipping container yard at an Indian port, with stacked containers and gantry cranes"
            label="Container yard at an Indian port"
            width={2400}
            height={900}
            sizes="(min-width: 1024px) 80rem, 100vw"
            className="shadow-lift"
          />
        </Reveal>
      </Section>

      {/* Markets */}
      <Section tone="dark">
        <Reveal>
          <SectionHeading
            tone="dark"
            overline="Markets We Serve"
            title="Where our containers go today"
            lede="These are the markets we actively ship to. We are building relationships in others as the product range widens — we would rather name three honestly than imply thirty."
          />
        </Reveal>

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {markets.map((market) => (
            <StaggerItem key={market} className="h-full">
              <Card tone="dark" className="h-full">
                <Globe2 aria-hidden="true" className="size-5 text-gold" />
                <h3 className="mt-4 font-serif text-heading-sm font-semibold text-on-dark">
                  {market}
                </h3>
                <p className="mt-1 text-caption uppercase tracking-wide text-on-dark-subtle">
                  Active buyer market
                </p>
              </Card>
            </StaggerItem>
          ))}
          <StaggerItem className="h-full">
            <div className="flex h-full flex-col justify-center rounded-2xl border border-dashed border-line-on-dark p-6 lg:p-7">
              <h3 className="font-serif text-heading-sm font-semibold text-on-dark-muted">
                Opening next
              </h3>
              <p className="mt-2 text-caption text-on-dark-subtle">
                We are actively building relationships in new markets as our product
                range grows.
              </p>
            </div>
          </StaggerItem>
        </Stagger>
      </Section>

      {/* Working with us across time zones */}
      <Section tone="sunken">
        <div className="grid gap-6 sm:grid-cols-2">
          <Reveal>
            <Card className="h-full">
              <Clock aria-hidden="true" className="size-6 text-brand-accent" />
              <h2 className="mt-5 font-serif text-heading font-semibold text-surface-dark">
                Business hours
              </h2>
              <p className="mt-3 text-body-lg text-ink-muted">
                {siteConfig.hours}. An enquiry arriving overnight from the Americas is
                answered the following morning IST.
              </p>
            </Card>
          </Reveal>
          <Reveal delay={0.08}>
            <Card className="h-full">
              <Languages aria-hidden="true" className="size-6 text-brand-accent" />
              <h2 className="mt-5 font-serif text-heading font-semibold text-surface-dark">
                Languages
              </h2>
              <p className="mt-3 text-body-lg text-ink-muted">
                We correspond in {siteConfig.languages.join(' and ')}.
              </p>
            </Card>
          </Reveal>
        </div>
      </Section>

      <CtaBand />
    </>
  )
}
