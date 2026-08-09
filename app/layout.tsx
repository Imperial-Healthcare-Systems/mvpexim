import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter } from 'next/font/google'

import { MotionProvider } from '@/components/motion-provider'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { WhatsAppFab } from '@/components/whatsapp-fab'
import { siteConfig } from '@/lib/site-data'
import './globals.css'

// next/font/google self-hosts these at build time — no runtime request to
// Google, and no layout shift from a swap.
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const description =
  'MVP Exim is an India-based merchant exporter connecting global buyers with quality Indian produce and commodities — starting with semi-husked coconut from Tamil Nadu. Consistent quality, honest specification, full regulatory compliance.'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.brandName} | ${siteConfig.tagline} — Indian Merchant Exporter`,
    template: `%s | ${siteConfig.brandName}`,
  },
  description,
  applicationName: siteConfig.brandName,
  authors: [{ name: siteConfig.legalName }],
  keywords: [
    'semi-husked coconut exporter',
    'HS code 0801 19 10',
    'Indian merchant exporter',
    'coconut exporter India',
    'MVP Exim',
    'export from Bangalore',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: siteConfig.brandName,
    title: `${siteConfig.brandName} — ${siteConfig.tagline}`,
    description,
    url: siteConfig.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.brandName} — ${siteConfig.tagline}`,
    description,
  },
  robots: { index: true, follow: true },
  icons: {
    // Generated from public/logo/mvp-icon.png. The previous set was the v0
    // scaffold's own logo, including an icon.svg that browsers preferred over
    // everything else — that file is gone rather than left to win the cascade.
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
      { url: '/icon-light-32x32.png', type: 'image/png', sizes: '32x32', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', type: 'image/png', sizes: '32x32', media: '(prefers-color-scheme: dark)' },
    ],
    apple: { url: '/apple-icon.png', sizes: '180x180' },
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#152a4d',
  userScalable: true,
}

/**
 * Organization JSON-LD. Every field is a verified fact from the intake
 * questionnaire — no invented ratings, employee counts or founding claims.
 */
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.brandName,
  legalName: siteConfig.legalName,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo/mvp-horizontal-dark.png`,
  description,
  slogan: siteConfig.tagline,
  foundingDate: '2026-07',
  identifier: { '@type': 'PropertyValue', name: 'CIN', value: siteConfig.cin },
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.state,
    postalCode: siteConfig.address.pin,
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    telephone: siteConfig.phone,
    email: siteConfig.email,
    availableLanguage: siteConfig.languages,
    areaServed: ['AE', 'US', 'CN'],
  },
  founder: { '@type': 'Person', name: 'Nikhil' },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-surface ${fraunces.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          // Static, developer-authored object — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-surface-dark focus:px-4 focus:py-2 focus:text-on-dark"
        >
          Skip to content
        </a>
        <MotionProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <WhatsAppFab />
        </MotionProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
