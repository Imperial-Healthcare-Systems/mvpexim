import type { Metadata } from 'next'
import Image from 'next/image'
import { Clock, Languages, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'

import { PageHeader } from '@/components/primitives/page-header'
import { Reveal } from '@/components/primitives/reveal'
import { Section } from '@/components/primitives/section'
import { Card } from '@/components/primitives/surface'
import { ContactForm } from '@/components/contact-form'
import { siteConfig } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Send an export enquiry to MVP Exim. Office at HRBR Layout, Kalyananagar, Bangalore 560043. Reachable on +91 79759 08063 and WhatsApp, 9:00 AM – 9:00 PM IST.',
  openGraph: {
    title: 'Contact MVP Exim',
    description:
      'Send an export enquiry, or reach us on WhatsApp. Bengaluru, India — 9:00 AM to 9:00 PM IST.',
    url: '/contact',
  },
  alternates: { canonical: '/contact' },
}

const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  siteConfig.address.mapsQuery,
)}`

export default function ContactPage() {
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: 'Home', href: '/' }]}
        overline="Get In Touch"
        title="Start your next shipment with us"
        lede="Tell us what you need to source or ship. Our team responds to every enquiry within one business day with pricing, MOQ and lead-time guidance."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <div className="flex flex-col gap-4">
              <ContactRow
                icon={Mail}
                label="Email"
                value={siteConfig.email}
                href={`mailto:${siteConfig.email}`}
              />
              <ContactRow
                icon={Phone}
                label="Phone"
                value={siteConfig.phone}
                href={siteConfig.phoneHref}
              />
              <ContactRow
                icon={MessageCircle}
                label="WhatsApp"
                value={siteConfig.phone}
                href={siteConfig.whatsappHref}
                external
              />
              <ContactRow icon={Clock} label="Business hours" value={siteConfig.hours} />
              <ContactRow
                icon={Languages}
                label="Languages"
                value={siteConfig.languages.join(', ')}
              />
            </div>

            {/* Map-ready block: swap this Card for an <iframe> or map component
                without touching the surrounding layout. */}
            <Card className="mt-8" padded={false}>
              <div className="flex items-start gap-4 p-6">
                <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-accent" />
                <div>
                  <h2 className="text-overline uppercase text-ink-subtle">Registered office</h2>
                  <address className="mt-2 text-body not-italic text-ink">
                    {siteConfig.address.line1}
                    <br />
                    {siteConfig.address.line2}
                    <br />
                    {siteConfig.address.city}, {siteConfig.address.state}{' '}
                    {siteConfig.address.pin}
                    <br />
                    {siteConfig.address.country}
                  </address>
                  <a
                    href={mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex rounded text-body font-semibold text-brand-accent outline-none transition-colors hover:text-surface-dark focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
              {/* Was an empty grey "map embed slot". Until a real map is
                  embedded this carries a photograph of the city we trade from,
                  with the Plus Code overlaid — the slot still reads as
                  location, but it looks intentional. Swap the <Image> for an
                  <iframe> and the layout is unchanged. */}
              <div className="relative isolate h-48 border-t border-line">
                <Image
                  src="/images/contact-city.jpg"
                  alt="The Bengaluru skyline at dusk, the city MVP Exim trades from"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="-z-10 object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-gradient-to-t from-surface-dark/85 via-surface-dark/40 to-surface-dark/10"
                />
                <div className="flex h-full flex-col justify-end p-5">
                  <p className="text-caption font-semibold uppercase tracking-wide text-gold">
                    {siteConfig.address.city}, {siteConfig.address.state}
                  </p>
                  <p className="tabular mt-1 text-caption text-on-dark-muted">
                    Plus Code {siteConfig.address.mapsQuery}
                  </p>
                </div>
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </Section>
    </>
  )
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  external = false,
}: {
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' }>
  label: string
  value: string
  href?: string
  external?: boolean
}) {
  const body = (
    <div className="flex items-start gap-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-dark/8 text-surface-dark">
        <Icon aria-hidden="true" className="size-4" />
      </div>
      <div>
        <div className="text-overline uppercase text-ink-subtle">{label}</div>
        <div className="mt-0.5 text-body text-ink">{value}</div>
      </div>
    </div>
  )

  if (!href) return body

  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="rounded-lg outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring"
    >
      {body}
    </a>
  )
}
