import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CircleDashed, FileText, Radar, ShieldCheck } from 'lucide-react'

import { PageHeader } from '@/components/primitives/page-header'
import { Reveal, Stagger, StaggerItem } from '@/components/primitives/reveal'
import { Section } from '@/components/primitives/section'
import { Card, Pill } from '@/components/primitives/surface'
import { SectionHeading } from '@/components/primitives/typography'
import { CtaBand } from '@/components/sections/cta-band'
import { Button } from '@/components/ui/button'
import { compliance, documentsProvided, traceability } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Quality & Certifications',
  description:
    'Phytosanitary certification on every coconut consignment, end-to-end traceability on a single shared platform, and a plain statement of what MVP Exim does and does not yet hold.',
  openGraph: {
    title: 'Quality & Certifications | MVP Exim',
    description:
      'What we hold, what is in process, and what we will not claim. Plus full documentation with every shipment.',
    url: '/quality',
  },
  alternates: { canonical: '/quality' },
}

export default function QualityPage() {
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: 'Home', href: '/' }]}
        overline="Quality & Compliance"
        title="What we hold, what is in process, and what we will not claim."
        lede="Certification is the gate a buyer passes through before price is even discussed. Here is our position, stated plainly — including the gaps."
      />

      {/* Traceability */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              overline="Traceability"
              title="End-to-end visibility, source to dispatch"
            />
            <p className="mt-6 text-lede text-pretty text-ink-muted">{traceability}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <Card className="h-full">
              <Radar aria-hidden="true" className="size-6 text-brand-accent" />
              <h2 className="mt-5 font-serif text-heading font-semibold text-surface-dark">
                Why it matters to you
              </h2>
              <p className="mt-3 text-body text-pretty text-ink-muted">
                If a consignment is queried, the answer comes from one record rather
                than from three parties reconstructing it after the fact. That is the
                difference between a claim resolved in days and one resolved in weeks.
              </p>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* Certification status */}
      <Section tone="sunken">
        <Reveal>
          <SectionHeading
            overline="Certification Status"
            title="An honest register"
            lede="We would rather be checked and found accurate than impressive and found wanting."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Card className="h-full">
              <div className="flex items-center gap-3">
                <ShieldCheck aria-hidden="true" className="size-5 text-brand-accent" />
                <h3 className="font-serif text-heading-sm font-semibold text-surface-dark">
                  Held today
                </h3>
              </div>
              <ul className="mt-5 space-y-4">
                {compliance.held.map((item) => (
                  <li key={item.name}>
                    <div className="text-body font-medium text-ink">{item.name}</div>
                    <p className="mt-1 text-caption text-ink-muted">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>

          <Reveal delay={0.08}>
            <Card className="h-full">
              <div className="flex items-center gap-3">
                <CircleDashed aria-hidden="true" className="size-5 text-ink-subtle" />
                <h3 className="font-serif text-heading-sm font-semibold text-surface-dark">
                  In process
                </h3>
              </div>
              <ul className="mt-5 space-y-4">
                {compliance.inProgress.map((item) => (
                  <li key={item.name}>
                    <div className="text-body font-medium text-ink">{item.name}</div>
                    <p className="mt-1 text-caption text-ink-muted">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mt-6">
          <Card className="border-dashed">
            <h3 className="font-serif text-heading-sm font-semibold text-surface-dark">
              What we do not hold
            </h3>
            <p className="mt-3 max-w-3xl text-body text-pretty text-ink-muted">
              {compliance.notHeld}
            </p>
          </Card>
        </Reveal>
      </Section>

      {/* Documentation */}
      <Section tone="dark">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              tone="dark"
              overline="Documentation"
              title="What travels with every shipment"
              lede="Paperwork right the first time is one of our five values — this is the set your bank and forwarder receive."
            />
            <Button
              variant="on-dark"
              size="cta"
              className="mt-8"
              nativeButton={false}
              render={<Link href="/why-us" />}
            >
              See full trade terms
              <ArrowRight data-icon="inline-end" />
            </Button>
          </Reveal>

          <Stagger className="grid gap-4 sm:grid-cols-2">
            {documentsProvided.map((doc) => (
              <StaggerItem key={doc}>
                <Card tone="dark" className="flex h-full items-start gap-3">
                  <FileText aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-gold" />
                  <span className="text-body text-on-dark">{doc}</span>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* Outstanding */}
      <Section>
        <Reveal>
          <Card>
            <h2 className="font-serif text-heading font-semibold text-surface-dark">
              Being formalised
            </h2>
            <p className="mt-3 max-w-3xl text-body text-pretty text-ink-muted">
              Third-party inspection arrangements, pre-shipment testing policy,
              fumigation documentation and laboratory testing are being settled now
              and will be published here as each is confirmed. If your market requires
              any of them on the first shipment, raise it at enquiry stage.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                'Third-party inspection',
                'Pre-shipment testing',
                'Fumigation',
                'Laboratory testing',
              ].map((item) => (
                <Pill key={item}>{item}</Pill>
              ))}
            </div>
          </Card>
        </Reveal>
      </Section>

      <CtaBand />
    </>
  )
}
