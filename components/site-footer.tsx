import Image from 'next/image'
import Link from 'next/link'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'

import { Container } from '@/components/primitives/container'
import { CONTACT_INFO, navLinks, ports, siteConfig } from '@/lib/site-data'

const linkClass =
  'rounded text-body text-on-dark-muted outline-none transition-colors hover:text-gold focus-visible:ring-2 focus-visible:ring-on-dark'

export function SiteFooter() {
  return (
    <footer className="bg-surface-dark pt-20 pb-10 text-on-dark">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          <div>
            {/* Local asset. The previous footer pulled this from a v0 blob URL,
                which made the logo depend on an external CDN at runtime. */}
            <Image
              src="/logo/mvp-horizontal-light.png"
              alt={`${siteConfig.brandName} — ${siteConfig.tagline}`}
              width={382}
              height={144}
              className="h-12 w-auto"
            />
            <p className="mt-6 max-w-sm text-body text-on-dark-muted">
              An India-based merchant exporter connecting global buyers with quality
              Indian produce and commodities. MVP stands for {siteConfig.nameMeaning}.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={siteConfig.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line-on-dark px-4 py-2 text-caption font-medium text-on-dark outline-none transition-colors hover:bg-on-dark/10 focus-visible:ring-2 focus-visible:ring-on-dark"
              >
                <MessageCircle aria-hidden="true" className="size-4 text-gold" />
                WhatsApp
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-line-on-dark px-4 py-2 text-caption font-medium text-on-dark outline-none transition-colors hover:bg-on-dark/10 focus-visible:ring-2 focus-visible:ring-on-dark"
              >
                <Mail aria-hidden="true" className="size-4 text-gold" />
                Email
              </a>
            </div>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-overline uppercase text-on-dark-subtle">Navigate</h2>
            <ul className="mt-5 flex flex-col gap-3">
              <li>
                <Link href="/" className={linkClass}>
                  Home
                </Link>
              </li>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-overline uppercase text-on-dark-subtle">Ports of Loading</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {ports.map((port) => (
                <li key={port.name} className="text-body text-on-dark-muted">
                  <span className="text-on-dark">{port.name}</span>
                  <span className="block text-caption text-on-dark-subtle">{port.region}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-overline uppercase text-on-dark-subtle">Contact</h2>
            <ul className="mt-5 flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <Mail aria-hidden="true" className="mt-1 size-4 shrink-0 text-gold" />
                <a href={`mailto:${siteConfig.email}`} className={linkClass}>
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone aria-hidden="true" className="mt-1 size-4 shrink-0 text-gold" />
                <a href={siteConfig.phoneHref} className={linkClass}>
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0 text-gold" />
                <address className="text-body not-italic text-on-dark-muted">
                  {siteConfig.address.line1}
                  <br />
                  {siteConfig.address.line2}
                  <br />
                  {siteConfig.address.city}, {siteConfig.address.state}{' '}
                  {siteConfig.address.pin}
                </address>
              </li>
            </ul>
            <p className="mt-5 text-caption text-on-dark-subtle">
              Business hours {siteConfig.hours}
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-line-on-dark pt-8">
          {/* The client's answer to "What should the footer carry?" was:
              legal name, CIN, GSTIN and IEC. GSTIN and IEC are shown with their
              real current status rather than omitted. */}
          <dl className="grid gap-x-10 gap-y-3 text-caption sm:grid-cols-3">
            <div className="flex gap-2">
              <dt className="text-on-dark-subtle">CIN</dt>
              <dd className="tabular text-on-dark-muted">{siteConfig.cin}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-on-dark-subtle">IEC</dt>
              <dd className="text-on-dark-muted">{siteConfig.iec}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-on-dark-subtle">GSTIN</dt>
              <dd className="text-on-dark-muted">{siteConfig.gstin}</dd>
            </div>
          </dl>

          <p className="mt-6 text-caption text-on-dark-subtle">
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
