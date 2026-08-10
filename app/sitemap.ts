import type { MetadataRoute } from 'next'

import { navLinks, products, secondaryLinks, siteConfig } from '@/lib/site-data'

/**
 * Built from the same nav data the site renders, so a new route added to
 * navLinks or secondaryLinks appears here automatically and cannot be
 * forgotten. Product detail pages are derived from the product list.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const paths = [
    { path: '/', priority: 1 },
    ...navLinks.map((link) => ({ path: link.href, priority: 0.8 })),
    ...secondaryLinks.map((link) => ({ path: link.href, priority: 0.6 })),
    ...products
      .filter((product) => product.detailPage)
      // The flagship product page is the one buyers reach by searching an HS
      // code, so it ranks alongside the top-level sections rather than below.
      .map((product) => ({ path: `/products/${product.slug}`, priority: 0.9 })),
  ]

  return paths.map(({ path, priority }) => ({
    url: new URL(path, siteConfig.url).toString(),
    lastModified,
    changeFrequency: 'monthly' as const,
    priority,
  }))
}
