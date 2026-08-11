import Image from 'next/image'
import Link from 'next/link'
import {
  Anchor,
  ArrowRight,
  Eye,
  Globe2,
  Handshake,
  MessageSquareText,
  Phone,
  ShieldCheck,
} from 'lucide-react'

import { PlaceholderImage } from '@/components/primitives/placeholder-image'
import { Reveal, Stagger, StaggerItem } from '@/components/primitives/reveal'
import { Section } from '@/components/primitives/section'
import { Card, Pill, Stat } from '@/components/primitives/surface'
import { Overline, Prose, SectionHeading } from '@/components/primitives/typography'
import { ProductCard } from '@/components/product-card'
import { CtaBand } from '@/components/sections/cta-band'
import { HomeHero } from '@/components/sections/home-hero'
import { Button } from '@/components/ui/button'
import {
  differentiators,
  marketReach,
  operatingModel,
  ports,
  products,
  siteConfig,
  story,
  tradeStatus,
} from '@/lib/site-data'

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
              src="/images/story-farm.jpg"
              alt="A grower opening a freshly harvested coconut by hand at a smallholding"
              label="Coconut harvest, by hand"
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
              lede={`We load through ${ports.map((p) => p.name).join(', ')} and export to ${marketReach.exportTo.join(', ')}, with ${marketReach.openingNext.join(' and ')} opening next.`}
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
                  {marketReach.exportTo.map((market) => (
                    <Pill key={market} tone="outline-dark">
                      {market}
                    </Pill>
                  ))}
                </div>
                <p className="mt-4 text-caption text-on-dark-subtle">
                  {tradeStatus.shipments}.
                </p>
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

      {/* §10.1 ranks "attract suppliers, growers and sourcing partners" as the
          website's number-one job — ahead of buyer enquiries. Everything above
          this point speaks to buyers, so this block speaks to the other side of
          the trade. Built only from answers already given: the fair-dealing
          value (§5.6), the merchant-exporter model (§5.1) and the traceability
          statement (§9). */}
      <Section tone="sunken">
        <Reveal>
          <Card padded={false} className="overflow-hidden">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
              <div className="p-7 lg:p-12">
                <Overline>Growers &amp; Suppliers</Overline>
                <h2 className="mt-3 max-w-xl font-serif text-display-sm font-bold text-balance text-surface-dark">
                  If you grow it or make it, we are looking for you too.
                </h2>
                <p className="mt-5 max-w-xl text-body-lg text-pretty text-ink-muted">
                  We are a merchant exporter — we do not own farms or factories, so
                  every container we ship starts with a producer who does. If you have
                  quality product and want a route to overseas buyers, we would like to
                  hear from you.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button size="cta" nativeButton={false} render={<a href={siteConfig.phoneHref} />}>
                    <Phone data-icon="inline-start" />
                    {siteConfig.phone}
                  </Button>
                  <Button
                    variant="outline"
                    size="cta"
                    nativeButton={false}
                    render={<Link href="/contact" />}
                  >
                    Introduce your product
                    <ArrowRight data-icon="inline-end" />
                  </Button>
                </div>
              </div>

              {/* Was a bare list in a text-only card. Backing it with the
                  produce a grower actually supplies gives the block a subject
                  and balances the column of copy beside it. */}
              <div className="relative isolate min-h-[22rem] lg:min-h-full">
                <Image
                  src="/images/packing-mesh-bags.jpg"
                  alt="Semi-husked coconuts heaped after grading, ready for bagging"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="-z-10 object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-gradient-to-t from-surface-dark/92 via-surface-dark/75 to-surface-dark/45"
                />
                <ul className="flex h-full flex-col justify-center gap-5 p-7 lg:p-10">
                  {[
                    {
                      title: 'Fair dealing, stated plainly',
                      detail:
                        'Transparency with growers, suppliers and buyers is our cornerstone — a value, not a line on a wall.',
                    },
                    {
                      title: 'One shared record',
                      detail:
                        'From source to dispatch we work on a single platform, so you can see where your consignment is.',
                    },
                    {
                      title: 'Honest specification',
                      detail:
                        'We do not oversell a grade to a buyer, so we will not ask you to supply one.',
                    },
                  ].map((item) => (
                    <li key={item.title}>
                      <h3 className="font-serif text-heading-sm font-semibold text-on-dark">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-body text-pretty text-on-dark-muted">
                        {item.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </Reveal>
      </Section>

      <CtaBand />
    </>
  )
}
