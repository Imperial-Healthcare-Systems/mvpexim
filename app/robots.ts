import type { MetadataRoute } from 'next'

import { siteConfig } from '@/lib/site-data'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Nothing to index behind the enquiry endpoint, and crawling a POST
      // route is wasted budget.
      disallow: ['/api/'],
    },
    sitemap: new URL('/sitemap.xml', siteConfig.url).toString(),
  }
}
