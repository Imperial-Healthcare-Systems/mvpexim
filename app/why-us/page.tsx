import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Banknote,
  Eye,
  FileCheck,
  Handshake,
  MessageSquareText,
  ShieldCheck,
} from 'lucide-react'

import { PageHeader } from '@/components/primitives/page-header'
import { Reveal, Stagger, StaggerItem } from '@/components/primitives/reveal'
import { Section } from '@/components/primitives/section'
import { Card, Pill, SpecList } from '@/components/primitives/surface'
import { SectionHeading } from '@/components/primitives/typography'
import { CtaBand } from '@/components/sections/cta-band'
import { Button } from '@/components/ui/button'
import {
  TRADE_TERMS,
  differentiators,
  documentsProvided,
  incotermsDetail,
  operations,
  operatingModel,
  paymentTerms,
  values,
} from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Trade Terms & How We Work',
  description:
    'Incoterms EXW, FOB, CIF (default) and DDP. Payment by advance TT, LC at sight, DP or usance LC. 30–45 day lead time, MOQ one 40ft container, full documentation with every shipment.',
  openGraph: {
    title: 'Trade Terms | MVP Exim',
    description:
      'Incoterms, payment terms, lead time and documentation — published plainly so you can qualify us in one read.',
    url: '/why-us',
  },
  alternates: { canonical: '/why-us' },
}

const differentiatorIcons = [Eye, Handshake, ShieldCheck, MessageSquareText]

export default function WhyUsPage() {
  return (
    <>
      <PageHeader
        image="/images/page-header-bg.jpg"
        imageAlt="A harbour gantry crane silhouetted against a low sun"
        breadcrumb={[{ label: 'Home', href: '/' }]}
        overline="Trade Terms & Why Us"
        title="A buyer sees a dozen near-identical offers a week. Here is why they open ours."
        lede="We publish our terms, our capacity and our limitations upfront. It saves a round of email on every enquiry — and tells you straight away whether we can serve you."
      >
        <div className="flex flex-wrap gap-2">
          {incotermsDetail.map((term) => (
            <Pill key={term.code} tone={term.isDefault ? 'gold' : 'outline-dark'}>
              {term.code}
              {term.isDefault && <span className="opacity-80">· default</span>}
            </Pill>
          ))}
        </div>
      </PageHeader>

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

      {/* Trade terms grid */}
      <Section tone="sunken">
        <Reveal>
          <SectionHeading
            overline="Working With Us"
            title="Clear terms, every shipment"
            lede="No surprises in the fine print. Here is exactly how sourcing, payment and delivery work with MVP Exim."
          />
        </Reveal>

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
      </Section>

      {/* Incoterms + payment */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="flex items-center gap-3">
              <FileCheck aria-hidden="true" className="size-5 text-brand-accent" />
              <h2 className="font-serif text-heading font-semibold text-surface-dark">
                Incoterms we quote on
              </h2>
            </div>
            <p className="mt-3 text-body text-ink-muted">
              Choose the level of responsibility that suits your operation and we will
              price against it. CIF is our default where you have no preference.
            </p>
            <ul className="mt-6 space-y-3">
              {incotermsDetail.map((term) => (
                <li
                  key={term.code}
                  className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-line pt-3"
                >
                  <span className="font-serif text-heading-sm font-semibold text-brand-accent">
                    {term.code}
                  </span>
                  <span className="text-body text-ink">{term.name}</span>
                  {term.isDefault && <Pill tone="accent">Our default</Pill>}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex items-center gap-3">
              <Banknote aria-hidden="true" className="size-5 text-brand-accent" />
              <h2 className="font-serif text-heading font-semibold text-surface-dark">
                Payment terms we accept
              </h2>
            </div>
            <p className="mt-3 text-body text-ink-muted">
              Agreed per order. Terms marked for established buyers are available once
              we have traded together.
            </p>
            <ul className="mt-6 space-y-3">
              {paymentTerms.map((item) => (
                <li
                  key={item.term}
                  className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-line pt-3"
                >
                  <span className="text-body text-ink">{item.term}</span>
                  {item.note && <Pill>{item.note}</Pill>}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* Operations + documents */}
      <Section tone="dark">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              tone="dark"
              overline="Operations"
              title="The numbers behind a shipment"
            />
            <div className="mt-10">
              <SpecList items={operations} columns={2} tone="dark" />
            </div>

            <Card tone="dark" className="mt-10">
              <h2 className="font-serif text-heading-sm font-semibold text-on-dark">
                Documents with every shipment
              </h2>
              <ul className="mt-5 space-y-2">
                {documentsProvided.map((doc) => (
                  <li key={doc} className="text-body text-on-dark-muted">
                    {doc}
                  </li>
                ))}
              </ul>
              <Button
                variant="on-dark"
                size="cta"
                className="mt-7"
                nativeButton={false}
                render={<Link href="/quality" />}
              >
                Quality &amp; certifications
                <ArrowRight data-icon="inline-end" />
              </Button>
            </Card>
          </Reveal>

          {/* This page is otherwise an unbroken run of cards and lists — the
              longest on the site. One image gives the eye somewhere to rest. */}
          <Reveal delay={0.1}>
            <div className="relative isolate overflow-hidden rounded-2xl shadow-lift">
              <Image
                src="/images/trade-operations.jpg"
                alt="Containers stacked and lit alongside a cargo vessel during night loading operations"
                width={1400}
                height={1050}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-surface-dark/80 via-surface-dark/10 to-transparent"
              />
              <p className="absolute inset-x-0 bottom-0 p-6 text-caption text-on-dark-muted">
                Loading windows are confirmed with your quotation, 30–45 days from a
                confirmed order.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Values */}
      <Section tone="sunken">
        <Reveal>
          <SectionHeading
            overline="What We Stand For"
            title="Five values, and how each shows up in practice."
          />
        </Reveal>

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <StaggerItem key={value.title} className="h-full">
              <Card className="h-full">
                <h3 className="font-serif text-heading-sm font-semibold text-surface-dark">
                  {value.title}
                </h3>
                <p className="mt-2 text-body text-pretty text-ink-muted">{value.detail}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <CtaBand />
    </>
  )
}
