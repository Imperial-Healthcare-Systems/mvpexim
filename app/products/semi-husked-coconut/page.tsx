import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Globe2, MessageCircle, ShieldCheck, Ship } from 'lucide-react'

import { PageHeader } from '@/components/primitives/page-header'
import { PlaceholderImage } from '@/components/primitives/placeholder-image'
import { Reveal } from '@/components/primitives/reveal'
import { Section } from '@/components/primitives/section'
import { Card, Pill, SpecList } from '@/components/primitives/surface'
import { Prose, SectionHeading } from '@/components/primitives/typography'
import { CtaBand } from '@/components/sections/cta-band'
import { Button } from '@/components/ui/button'
import { getProductBySlug, ports, siteConfig } from '@/lib/site-data'

const product = getProductBySlug('semi-husked-coconut')

export const metadata: Metadata = {
  title: 'Semi-Husked Coconut — HS Code 0801 19 10',
  description:
    'Biscuit-colour semi-husked coconut from Pollachi, Tamil Nadu. HS 0801 19 10, 12.5 kg mesh bag, 14 MT per 40ft container, MOQ one container, phytosanitary certified. EXW, FOB, CIF and DDP.',
  openGraph: {
    title: 'Semi-Husked Coconut (HS 0801 19 10) | MVP Exim',
    description:
      'Biscuit-colour grade from Tamil Nadu. 12.5 kg mesh bag, 14 MT per 40ft container, available all year.',
    url: '/products/semi-husked-coconut',
  },
  alternates: { canonical: '/products/semi-husked-coconut' },
}

export default function SemiHuskedCoconutPage() {
  if (!product) notFound()

  /**
   * Product JSON-LD. No `offers`, `price` or `aggregateRating` — we have no
   * published price and no reviews, and inventing them would be both false and
   * a structured-data policy violation.
   */
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.intro,
    category: 'Coconuts, fresh or dried',
    countryOfOrigin: 'IN',
    brand: { '@type': 'Brand', name: siteConfig.brandName },
    additionalProperty: product.specs.map((spec) => ({
      '@type': 'PropertyValue',
      name: spec.label,
      value: spec.value,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <PageHeader
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
        ]}
        overline="Flagship Line · Available Now"
        title="Semi-Husked Coconut"
        lede={product.tagline}
      >
        <div className="flex flex-wrap gap-2">
          <Pill tone="gold">HS 0801 19 10</Pill>
          {product.incoterms?.map((term) => (
            <Pill key={term} tone="outline-dark">
              {term}
            </Pill>
          ))}
        </div>
      </PageHeader>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              overline="The Product"
              title="Biscuit-colour grade, sourced fresh, shipped all year."
            />
            <Prose className="mt-6">
              <p>{product.intro}</p>
            </Prose>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button size="cta" nativeButton={false} render={<Link href="/contact" />}>
                Request a quotation
                <ArrowRight data-icon="inline-end" />
              </Button>
              <Button
                variant="outline"
                size="cta"
                nativeButton={false}
                render={
                  <a href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer" />
                }
              >
                <MessageCircle data-icon="inline-start" />
                Ask on WhatsApp
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <PlaceholderImage
              src={product.image}
              alt={product.imageAlt}
              label={product.imageLabel}
              width={1200}
              height={900}
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="shadow-lift"
            />
          </Reveal>
        </div>
      </Section>

      {/* Specifications */}
      <Section tone="sunken">
        <Reveal>
          <SectionHeading
            overline="Specifications"
            title="Everything a buyer asks before price"
            lede="Published plainly so you can check fit against your requirement without a round of email."
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <Card padded={false} className="p-7 lg:p-10">
            <SpecList items={product.specs} columns={3} />
          </Card>
        </Reveal>
      </Section>

      {/* Markets, ports, certification */}
      <Section tone="dark">
        <div className="grid gap-10 lg:grid-cols-3">
          <Reveal>
            <Card tone="dark" className="h-full">
              <Globe2 aria-hidden="true" className="size-6 text-gold" />
              <h2 className="mt-5 font-serif text-heading-sm font-semibold text-on-dark">
                Markets for this line
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {product.markets.map((market) => (
                  <Pill key={market} tone="outline-dark">
                    {market}
                  </Pill>
                ))}
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.08}>
            <Card tone="dark" className="h-full">
              <Ship aria-hidden="true" className="size-6 text-gold" />
              <h2 className="mt-5 font-serif text-heading-sm font-semibold text-on-dark">
                Ports of loading
              </h2>
              <ul className="mt-4 space-y-2">
                {ports.map((port) => (
                  <li key={port.name} className="text-body text-on-dark-muted">
                    <span className="text-on-dark">{port.name}</span> · {port.region}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>

          <Reveal delay={0.16}>
            <Card tone="dark" className="h-full">
              <ShieldCheck aria-hidden="true" className="size-6 text-gold" />
              <h2 className="mt-5 font-serif text-heading-sm font-semibold text-on-dark">
                Certification
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {product.certifications?.map((cert) => (
                  <Pill key={cert} tone="outline-dark">
                    {cert}
                  </Pill>
                ))}
              </div>
              <p className="mt-4 text-caption text-on-dark-subtle">
                Additional certification can be discussed against a specific market
                requirement.
              </p>
            </Card>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        title="Need a quote on semi-husked coconut?"
        lede="Send us your destination port, quantity and preferred Incoterm and we will come back with pricing and the nearest loading window."
      />
    </>
  )
}
