import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { PageHeader } from '@/components/primitives/page-header'
import { Reveal } from '@/components/primitives/reveal'
import { Section } from '@/components/primitives/section'
import { Card, Pill } from '@/components/primitives/surface'
import { SectionHeading } from '@/components/primitives/typography'
import { ProductFinder } from '@/components/product-finder'
import { CtaBand } from '@/components/sections/cta-band'
import { Button } from '@/components/ui/button'
import { incotermsDetail, products } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Products & Commodities',
  description:
    'Semi-husked coconut (HS 0801 19 10) is our flagship export line — biscuit-colour grade from Tamil Nadu. Textiles and yarn, leather and footwear, and plastics and polymers are in development.',
  openGraph: {
    title: 'Products & Commodities | MVP Exim',
    description:
      'Semi-husked coconut from Tamil Nadu, HS code 0801 19 10 — plus the lines we are building next.',
    url: '/products',
  },
  alternates: { canonical: '/products' },
}

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: 'Home', href: '/' }]}
        overline="What We Trade"
        title="Products & commodities"
        lede="Semi-husked coconut is our flagship line today. Textiles, leather and polymers are next, as we grow from merchant exporter toward a full trading house."
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
        <Reveal>
          <SectionHeading
            overline="Find a Line"
            title="Search by product or HS code"
            lede="Full specifications, container loading and certification are published on each product page."
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <ProductFinder products={products} />
        </Reveal>
      </Section>

      <Section tone="sunken">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Card className="h-full">
              <h2 className="font-serif text-heading font-semibold text-surface-dark">
                Packing and container loading
              </h2>
              <p className="mt-3 text-body text-pretty text-ink-muted">
                12.5 kg mesh bags, 14 MT to a 40ft container, minimum one container.
                We handle 20ft, 40ft and 40ft HC.
              </p>
              <Button
                size="cta"
                variant="outline"
                className="mt-6"
                nativeButton={false}
                render={<Link href="/packaging" />}
              >
                Packaging details
                <ArrowRight data-icon="inline-end" />
              </Button>
            </Card>
          </Reveal>

          <Reveal delay={0.08}>
            <Card className="h-full">
              <h2 className="font-serif text-heading font-semibold text-surface-dark">
                Looking for something not listed?
              </h2>
              <p className="mt-3 text-body text-pretty text-ink-muted">
                As a merchant exporter we can often source against a specific
                requirement. Tell us the product, grade and destination, and we will
                tell you plainly whether we can serve it.
              </p>
              <Button
                size="cta"
                variant="outline"
                className="mt-6"
                nativeButton={false}
                render={<Link href="/contact" />}
              >
                Send a sourcing request
                <ArrowRight data-icon="inline-end" />
              </Button>
            </Card>
          </Reveal>
        </div>
      </Section>

      <CtaBand />
    </>
  )
}
