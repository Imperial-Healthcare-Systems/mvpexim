import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Container as ContainerIcon, Package, Scale } from 'lucide-react'

import { PageHeader } from '@/components/primitives/page-header'
import { PlaceholderImage } from '@/components/primitives/placeholder-image'
import { Reveal, Stagger, StaggerItem } from '@/components/primitives/reveal'
import { Section } from '@/components/primitives/section'
import { Card, Pill, SpecList } from '@/components/primitives/surface'
import { SectionHeading } from '@/components/primitives/typography'
import { CtaBand } from '@/components/sections/cta-band'
import { Button } from '@/components/ui/button'
import { packagingSpec, ports } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Packaging & Container Loading',
  description:
    'Semi-husked coconut packs in 12.5 kg mesh bags and loads 14 MT to a 40ft container. MOQ one container, monthly capacity three. 20ft, 40ft and 40ft HC handled.',
  openGraph: {
    title: 'Packaging & Container Loading | MVP Exim',
    description:
      '12.5 kg mesh bags, 14 MT per 40ft container, MOQ one container. How your cargo is packed and stuffed.',
    url: '/packaging',
  },
  alternates: { canonical: '/packaging' },
}

const loadingSpecs = [
  { label: 'Packing Unit', value: packagingSpec.packing },
  { label: 'Container Loading', value: packagingSpec.containerLoading },
  { label: 'Minimum Order', value: packagingSpec.moq },
  { label: 'Monthly Capacity', value: packagingSpec.monthlyCapacity },
]

export default function PackagingPage() {
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: 'Home', href: '/' }]}
        overline="Packaging & Loading"
        title="How your cargo is packed, stuffed and sealed."
        lede="Buyers ask what fits a container before they ask anything else. Here are the numbers, published so you can plan against them."
      >
        <div className="flex flex-wrap gap-2">
          {packagingSpec.containerTypes.map((type) => (
            <Pill key={type} tone="gold">
              {type}
            </Pill>
          ))}
        </div>
      </PageHeader>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              overline="Semi-Husked Coconut"
              title="12.5 kg mesh bags, 14 MT to a 40ft container"
              lede="Mesh keeps the load ventilated in transit, which matters over a long sea leg. One 40ft container is our standard minimum order."
            />
            <div className="mt-10">
              <SpecList items={loadingSpecs} columns={2} />
            </div>
            <Button
              size="cta"
              variant="outline"
              className="mt-10"
              nativeButton={false}
              render={<Link href="/products/semi-husked-coconut" />}
            >
              Full product specifications
              <ArrowRight data-icon="inline-end" />
            </Button>
          </Reveal>

          <Reveal delay={0.1}>
            <PlaceholderImage
              src="/images/packing-mesh-bags.jpg"
              alt="Semi-husked coconuts heaped after grading, ready for bagging"
              label="Graded coconut, ready for bagging"
              width={1200}
              height={1500}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="shadow-lift"
            />
          </Reveal>
        </div>
      </Section>

      {/* Container types */}
      <Section tone="sunken">
        <Reveal>
          <SectionHeading
            overline="Container Types"
            title="What we handle"
            lede="Which unit suits your order depends on volume and destination — we will confirm it with your quotation."
          />
        </Reveal>

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-3">
          {packagingSpec.containerTypes.map((type) => (
            <StaggerItem key={type} className="h-full">
              <Card className="h-full">
                <ContainerIcon aria-hidden="true" className="size-6 text-brand-accent" />
                <h3 className="mt-5 font-serif text-heading font-semibold text-surface-dark">
                  {type}
                </h3>
                {type === '40ft' && (
                  <p className="mt-2 text-body text-ink-muted">
                    Our standard unit for coconut at 14 MT.
                  </p>
                )}
              </Card>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-10">
          <Card className="border-dashed">
            <p className="text-body text-pretty text-ink-muted">
              Private-label packing under a buyer&apos;s own brand is not yet
              confirmed as a service. If you need it, ask at enquiry stage and we will
              give you a straight answer rather than a maybe.
            </p>
          </Card>
        </Reveal>
      </Section>

      {/* Loading ports */}
      <Section tone="dark">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              tone="dark"
              overline="Stuffing & Sailing"
              title="Loaded at three Indian ports"
              lede={`Cargo is stuffed and sealed for loading at ${ports
                .map((p) => p.name)
                .join(', ')}. Lead time is 30–45 days from confirmed order to loading.`}
            />
            <Button
              variant="on-dark"
              size="cta"
              className="mt-8"
              nativeButton={false}
              render={<Link href="/global-reach" />}
            >
              Ports and markets
              <ArrowRight data-icon="inline-end" />
            </Button>
          </Reveal>

          <Stagger className="grid gap-4 sm:grid-cols-2">
            {ports.map((port) => (
              <StaggerItem key={port.name}>
                <Card tone="dark" className="h-full">
                  <Package aria-hidden="true" className="size-5 text-gold" />
                  <div className="mt-4 font-serif text-heading-sm font-semibold text-on-dark">
                    {port.name}
                  </div>
                  <div className="mt-1 text-caption text-on-dark-subtle">{port.region}</div>
                </Card>
              </StaggerItem>
            ))}
            <StaggerItem>
              <Card tone="dark" className="h-full">
                <Scale aria-hidden="true" className="size-5 text-gold" />
                <div className="mt-4 font-serif text-heading-sm font-semibold text-on-dark">
                  14 MT
                </div>
                <div className="mt-1 text-caption text-on-dark-subtle">
                  Per 40ft container
                </div>
              </Card>
            </StaggerItem>
          </Stagger>
        </div>
      </Section>

      <CtaBand />
    </>
  )
}
