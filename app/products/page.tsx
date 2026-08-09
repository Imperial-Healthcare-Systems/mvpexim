import type { Metadata } from 'next'

import { PageHeader } from '@/components/primitives/page-header'
import { Reveal, Stagger, StaggerItem } from '@/components/primitives/reveal'
import { Section } from '@/components/primitives/section'
import { Card, Pill } from '@/components/primitives/surface'
import { SectionHeading } from '@/components/primitives/typography'
import { ProductCard } from '@/components/product-card'
import { CtaBand } from '@/components/sections/cta-band'
import { incoterms, products } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Products & Commodities',
  description:
    'Semi-husked coconut (HS 0801 19 10) is our flagship export line. Textiles and yarn, leather and footwear, and plastics and polymers are in development.',
  openGraph: {
    title: 'Products & Commodities | MVP Exim',
    description:
      'Semi-husked coconut from Tamil Nadu, HS code 0801 19 10 — plus the lines we are building next.',
    url: '/products',
  },
  alternates: { canonical: '/products' },
}

export default function ProductsPage() {
  const available = products.filter((p) => p.status === 'available')
  const upcoming = products.filter((p) => p.status === 'coming-soon')

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: 'Home', href: '/' }]}
        overline="What We Trade"
        title="Products & commodities"
        lede="Semi-husked coconut is our flagship line today. Textiles, leather and polymers are next, as we grow from merchant exporter toward a full trading house."
      >
        <div className="flex flex-wrap gap-2">
          {incoterms.map((term) => (
            <Pill key={term} tone="gold">
              {term}
            </Pill>
          ))}
        </div>
      </PageHeader>

      <Section>
        <Reveal>
          <SectionHeading
            overline="Shipping Now"
            title="Available lines"
            lede="Full specifications, container loading and certification are published on each product page."
          />
        </Reveal>

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {available.map((product, i) => (
            <StaggerItem key={product.id} className="h-full">
              <ProductCard product={product} priority={i === 0} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section tone="sunken">
        <Reveal>
          <SectionHeading
            overline="In Development"
            title="Lines we are building next"
            lede="These are planned product groups, not current stock. Specifications, HS codes and capacity are not yet confirmed — register your interest and we will come to you when they are."
          />
        </Reveal>

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((product) => (
            <StaggerItem key={product.id} className="h-full">
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-10">
          <Card>
            <p className="text-body text-ink-muted">
              Looking for something not listed here? As a merchant exporter we can
              often source against a specific requirement. Tell us the product, grade
              and destination, and we will tell you plainly whether we can serve it.
            </p>
          </Card>
        </Reveal>
      </Section>

      <CtaBand />
    </>
  )
}
