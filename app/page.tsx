import Link from 'next/link'
import { Anchor, ArrowRight, Eye, Globe2, Handshake, MessageSquareText, ShieldCheck } from 'lucide-react'

import { PlaceholderImage } from '@/components/primitives/placeholder-image'
import { Reveal, Stagger, StaggerItem } from '@/components/primitives/reveal'
import { Section } from '@/components/primitives/section'
import { Card, Pill, Stat } from '@/components/primitives/surface'
import { Prose, SectionHeading } from '@/components/primitives/typography'
import { ProductCard } from '@/components/product-card'
import { CtaBand } from '@/components/sections/cta-band'
import { HomeHero } from '@/components/sections/home-hero'
import { Button } from '@/components/ui/button'
import { differentiators, markets, operatingModel, ports, products, story } from '@/lib/site-data'

const differentiatorIcons = [Eye, Handshake, ShieldCheck, MessageSquareText]

export default function HomePage() {
  return (
    <>
      <HomeHero />

      {/* Story teaser */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading
              overline="Our Story"
              title="A partnership that started with one coconut shipment to Dubai."
              lede={story.opening}
            />
            <Prose className="mt-6">
              <p>{story.origin}</p>
            </Prose>
            <Button
              size="cta"
              variant="outline"
              className="mt-8"
              nativeButton={false}
              render={<Link href="/about" />}
            >
              Read our story
              <ArrowRight data-icon="inline-end" />
            </Button>
          </Reveal>

          <Reveal delay={0.1}>
            <PlaceholderImage
              src="/images/story-farm.png"
              alt="Growers sorting freshly harvested coconuts at a farm near Pollachi, Tamil Nadu"
              label="Coconut sorting at a Pollachi farm"
              width={1200}
              height={1500}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="shadow-lift"
            />
          </Reveal>
        </div>
      </Section>

      {/* Products */}
      <Section tone="sunken">
        <Reveal>
          <SectionHeading
            overline="What We Trade"
            title="Products & commodities"
            lede="Semi-husked coconut is our flagship line today. Textiles, leather and polymers are next, as we grow from merchant exporter toward a full trading house."
          />
        </Reveal>

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <StaggerItem key={product.id} className="h-full">
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-12">
          <Button size="cta" variant="outline" nativeButton={false} render={<Link href="/products" />}>
            View all product lines
            <ArrowRight data-icon="inline-end" />
          </Button>
        </Reveal>
      </Section>

      {/* Global reach strip */}
      <Section tone="dark">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              tone="dark"
              overline="Global Reach"
              title="Shipping from Indian ports to buyers across the world."
              lede={`We load through ${ports.map((p) => p.name).join(', ')} and currently serve ${markets.length} active buyer markets.`}
            />
            <Button
              variant="on-dark"
              size="cta"
              className="mt-8"
              nativeButton={false}
              render={<Link href="/global-reach" />}
            >
              See ports and markets
              <ArrowRight data-icon="inline-end" />
            </Button>
          </Reveal>

          <Stagger className="grid gap-4 sm:grid-cols-2">
            {ports.map((port) => (
              <StaggerItem key={port.name}>
                <Card tone="dark" className="h-full">
                  <Anchor aria-hidden="true" className="size-5 text-gold" />
                  <div className="mt-4 font-serif text-heading-sm font-semibold text-on-dark">
                    {port.name}
                  </div>
                  <div className="mt-1 text-caption text-on-dark-subtle">{port.region}</div>
                </Card>
              </StaggerItem>
            ))}
            <StaggerItem>
              <Card tone="dark" className="h-full">
                <Globe2 aria-hidden="true" className="size-5 text-gold" />
                <div className="mt-4 font-serif text-heading-sm font-semibold text-on-dark">
                  Markets served
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {markets.map((market) => (
                    <Pill key={market} tone="outline-dark">
                      {market}
                    </Pill>
                  ))}
                </div>
              </Card>
            </StaggerItem>
          </Stagger>
        </div>
      </Section>

      {/* Why us */}
      <Section>
        <Reveal>
          <SectionHeading
            overline="Why MVP Exim"
            title="A buyer sees a dozen near-identical offers a week. Here is why they open ours."
          />
        </Reveal>

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {differentiators.map((item, i) => {
            const Icon = differentiatorIcons[i % differentiatorIcons.length]
            return (
              <StaggerItem key={item.title} className="h-full">
                <Card className="h-full">
                  <Icon aria-hidden="true" className="size-6 text-brand-accent" />
                  <h3 className="mt-5 font-serif text-heading-sm font-semibold text-surface-dark">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-body text-pretty text-ink-muted">{item.detail}</p>
                </Card>
              </StaggerItem>
            )
          })}
        </Stagger>

        <Reveal delay={0.1} className="mt-14">
          <Card className="lg:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <h3 className="font-serif text-heading font-semibold text-surface-dark">
                  {operatingModel.title}
                </h3>
                <p className="mt-3 text-body-lg text-pretty text-ink-muted">
                  {operatingModel.detail}
                </p>
              </div>
              <Button
                size="cta"
                variant="outline"
                className="shrink-0"
                nativeButton={false}
                render={<Link href="/why-us" />}
              >
                How we work
                <ArrowRight data-icon="inline-end" />
              </Button>
            </div>
          </Card>
        </Reveal>
      </Section>

      <CtaBand />
    </>
  )
}
