import type { MetadataRoute } from 'next'

import { siteConfig } from '@/lib/site-data'

/**
 * Completes the icon set: without a manifest, Android home-screen shortcuts
 * fall back to a screenshot of the page rather than the brand mark.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.brandName} — ${siteConfig.tagline}`,
    short_name: siteConfig.brandName,
    description:
      'India-based merchant exporter connecting global buyers with quality Indian produce and commodities.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fcf5ea',
    theme_color: '#152a4d',
    icons: [
      { src: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  }
}
