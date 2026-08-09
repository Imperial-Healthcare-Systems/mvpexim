import type { Metadata } from 'next'
import { Eye, FileCheck, Handshake, MessageSquareText, ShieldCheck } from 'lucide-react'

import { PageHeader } from '@/components/primitives/page-header'
import { Reveal, Stagger, StaggerItem } from '@/components/primitives/reveal'
import { Section } from '@/components/primitives/section'
import { Card, Pill } from '@/components/primitives/surface'
import { SectionHeading } from '@/components/primitives/typography'
import { CtaBand } from '@/components/sections/cta-band'
import { TRADE_TERMS, differentiators, incoterms, operatingModel, values } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Why Us & Trade Terms',
  description:
    'Incoterms EXW, FOB, CIF and DDP. Minimum order one 40ft container. How MVP Exim works, what we publish upfront, and why buyers open our offers.',
  openGraph: {
    title: 'Why MVP Exim | Trade Terms',
    description:
      'Our Incoterms, MOQ, payment and documentation terms — published plainly so you can qualify us in one read.',
    url: '/why-us',
  },
  alternates: { canonical: '/why-us' },
}

const differentiatorIcons = [Eye, Handshake, ShieldCheck, MessageSquareText]

export default function WhyUsPage() {
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: 'Home', href: '/' }]}
        overline="Why MVP Exim"
        title="A buyer sees a dozen near-identical offers a week. Here is why they open ours."
        lede="We publish our terms, our capacity and our limitations upfront. It saves a round of email on every enquiry — and tells you straight away whether we can serve you."
      />

      <Section>
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {differentiators.map((item, i) => {
            const Icon = differentiatorIcons[i % differentiatorIcons.length]
            return (
              <StaggerItem key={item.title} className="h-full">
                <Card className="h-full">
                  <Icon aria-hidden="true" className="size-6 text-brand-accent" />
                  <h2 className="mt-5 font-serif text-heading-sm font-semibold text-surface-dark">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-body text-pretty text-ink-muted">{item.detail}</p>
                </Card>
              </StaggerItem>
            )
          })}
        </Stagger>

        <Reveal delay={0.1} className="mt-12">
          <Card className="lg:p-10">
            <h2 className="font-serif text-heading font-semibold text-surface-dark">
              {operatingModel.title}
            </h2>
            <p className="mt-3 max-w-3xl text-body-lg text-pretty text-ink-muted">
              {operatingModel.detail}
            </p>
          </Card>
        </Reveal>
      </Section>

      {/* Trade terms */}
      <Section tone="sunken">
        <Reveal>
          <SectionHeading
            overline="Working With Us"
            title="Clear terms, every shipment"
            lede="No surprises in the fine print. Here is exactly how sourcing, payment and delivery work with MVP Exim."
          />
        </Reveal>

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2">
          {TRADE_TERMS.map((term) => (
            <StaggerItem key={term.label} className="h-full">
              <Card className="h-full">
                <div className="flex items-center gap-3">
                  <Pill tone="accent">{term.tag}</Pill>
                  <h3 className="font-serif text-heading-sm font-semibold text-surface-dark">
                    {term.label}
                  </h3>
                </div>
                <p className="mt-4 text-body text-pretty text-ink-muted">{term.detail}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-12">
          <Card className="lg:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-md">
                <div className="flex items-center gap-3">
                  <FileCheck aria-hidden="true" className="size-5 text-brand-accent" />
                  <h3 className="font-serif text-heading font-semibold text-surface-dark">
                    Incoterms we quote on
                  </h3>
                </div>
                <p className="mt-3 text-body text-ink-muted">
                  Choose the level of responsibility that suits your operation, and we
                  will price against it.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {incoterms.map((term) => (
                  <span
                    key={term}
                    className="rounded-full border border-brand-accent/30 bg-brand-accent/5 px-5 py-2 font-serif text-body font-semibold text-brand-accent"
                  >
                    {term}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </Reveal>
      </Section>

      {/* Values */}
      <Section tone="dark">
        <Reveal>
          <SectionHeading
            tone="dark"
            overline="What We Stand For"
            title="Five values, and how each shows up in practice."
          />
        </Reveal>

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <StaggerItem key={value.title} className="h-full">
              <Card tone="dark" className="h-full">
                <h3 className="font-serif text-heading-sm font-semibold text-on-dark">
                  {value.title}
                </h3>
                <p className="mt-2 text-body text-pretty text-on-dark-muted">
                  {value.detail}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <CtaBand />
    </>
  )
}
