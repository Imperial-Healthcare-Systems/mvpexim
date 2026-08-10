import Script from 'next/script'

/**
 * Google Analytics 4 (§10.6 — "Google Analytics and Search Console" ticked for
 * the first release).
 *
 * Renders nothing until NEXT_PUBLIC_GA_ID is set, so the site ships without a
 * tracker until the client creates the property (§12 records analytics as
 * "to be created"). Add the ID to .env.local — no code change needed:
 *
 *   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
 *
 * Search Console needs no code: verify via the DNS TXT record at bigrock.in,
 * which is the more robust method anyway.
 */
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  if (!gaId) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  )
}
