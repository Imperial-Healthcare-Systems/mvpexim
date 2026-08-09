'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

import { siteConfig } from '@/lib/site-data'
import { cn } from '@/lib/utils'

/** Height of the reveal sentinel: the button appears once it scrolls away. */
const REVEAL_AFTER = '70vh'
/** Routes that already put WhatsApp in front of the visitor. */
const SUPPRESSED_ROUTES = ['/contact']

export function WhatsAppFab() {
  const [pastFold, setPastFold] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Same sentinel technique as the header: hidden while the hero (which owns
  // its own WhatsApp CTA) is still on screen, so the two don't compete.
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || typeof IntersectionObserver === 'undefined') {
      const onScroll = () => setPastFold(window.scrollY > window.innerHeight * 0.7)
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
    }

    const observer = new IntersectionObserver(
      ([entry]) => setPastFold(!entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  // Stand down on /contact: on a phone the button lands exactly on the
  // "Send Enquiry" submit control, and that page already lists every contact
  // route including WhatsApp. Route-based now that the site is multi-page —
  // the old version observed a #contact element that only one page has.
  const visible = pastFold && !SUPPRESSED_ROUTES.includes(pathname)

  return (
    <>
      <div
        ref={sentinelRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 w-px"
        style={{ height: REVEAL_AFTER }}
      />

      <motion.div
        // `initial={false}` keeps SSR and first client render identical, and
        // stops the button flying in on load before `visible` is known.
        initial={false}
        animate={
          visible
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 0, scale: 0.8, y: 12 }
        }
        // Reduced motion is handled globally by <MotionConfig reducedMotion="user">
        // in the root layout, which snaps transforms to their target values.
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed right-5 z-40 print:hidden',
          !visible && 'pointer-events-none',
        )}
        // Clears the iOS home indicator without shifting on other devices.
        style={{ bottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}
      >
        <a
          href={siteConfig.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Chat with ${siteConfig.brandName} on WhatsApp`}
          aria-hidden={!visible}
          tabIndex={visible ? undefined : -1}
          className={cn(
            'group flex items-center rounded-full bg-primary shadow-lg shadow-primary/25 outline-none',
            'transition-shadow hover:shadow-xl hover:shadow-primary/30',
            'focus-visible:ring-4 focus-visible:ring-[#25D366]/50',
          )}
        >
          {/* Label rides on the navy pill, not on the green: white on #25D366
              is only ~2:1. White on navy is ~13:1. Collapsed, the pill is
              exactly circle-sized and hidden behind the green disc. */}
          <span
            className={cn(
              'hidden grid-cols-[0fr] sm:grid',
              'motion-safe:transition-[grid-template-columns] motion-safe:duration-300 motion-safe:ease-out',
              'group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr]',
            )}
          >
            <span className="overflow-hidden">
              <span className="block whitespace-nowrap pl-5 pr-2 text-sm font-semibold text-primary-foreground">
                Chat on WhatsApp
              </span>
            </span>
          </span>

          <span
            className={cn(
              'grid size-14 shrink-0 place-items-center rounded-full bg-[#25D366] text-white',
              'transition-colors group-hover:bg-[#1EBE5A]',
            )}
          >
            {/* WhatsApp glyph. A brand mark, so WCAG 1.4.11 non-text contrast
                does not apply to it — the wordmark above carries the label. */}
            <svg
              viewBox="0 0 24 24"
              className="size-7"
              fill="currentColor"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.463-8.457" />
            </svg>
          </span>
        </a>
      </motion.div>
    </>
  )
}
