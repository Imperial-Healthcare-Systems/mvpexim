'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, MessageCircle, Phone } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import { navLinks, secondaryLinks, siteConfig } from '@/lib/site-data'
import { cn } from '@/lib/utils'

/** Scroll distance after which the header swaps to its solid state. */
const SOLID_AFTER_PX = 80
const MOBILE_MENU_ID = 'site-mobile-menu'

/** `/products/semi-husked-coconut` should still light up "Products". */
function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
  // `false` on the server and on the first client render alike, so the SSR
  // markup and the hydrated markup always agree. Every route opens over a dark
  // masthead (Home's hero, or PageHeader elsewhere), so transparent is always
  // the correct initial state; `window` is never read during render.
  const [solid, setSolid] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Close the mobile sheet when the route changes — Base UI keeps it open
  // across a client-side navigation otherwise.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Solid vs transparent. We observe an 80px-tall sentinel pinned to the top of
  // the document rather than the masthead itself: it stops intersecting the
  // viewport at exactly SOLID_AFTER_PX regardless of masthead height, and it
  // keeps the header decoupled from whatever a page opens with.
  // IntersectionObserver fires once on observe, so a restored scroll position
  // or a deep link resolves on the first frame, not on the first scroll event.
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || typeof IntersectionObserver === 'undefined') {
      const onScroll = () => setSolid(window.scrollY > SOLID_AFTER_PX)
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
    }

    const observer = new IntersectionObserver(
      ([entry]) => setSolid(!entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Scroll sentinel — invisible, sits in document flow at the very top. */}
      <div
        ref={sentinelRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 h-20 w-px"
      />

      <motion.header
        data-motion=""
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 isolate border-b',
          'motion-safe:transition-[background-color,border-color,box-shadow] motion-safe:duration-300 motion-safe:ease-out',
          solid
            ? 'border-line bg-surface/85 shadow-card backdrop-blur-md supports-backdrop-filter:bg-surface/75'
            : 'border-transparent bg-transparent',
        )}
      >
        {/* Contrast scrim. The masthead behind the header is navy but not
            uniformly dark (Home's hero thins to primary/30 on the right), so
            this guarantees 4.5:1 for white nav text without reading as a bar. */}
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-surface-dark/50 via-surface-dark/25 to-transparent',
            'motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-out',
            solid ? 'opacity-0' : 'opacity-100',
          )}
        />

        <div
          className={cn(
            'mx-auto flex max-w-page items-center justify-between gap-4 px-6 lg:px-10',
            'motion-safe:transition-[padding] motion-safe:duration-300 motion-safe:ease-out',
            solid ? 'py-2.5' : 'py-4',
          )}
        >
          <Link
            href="/"
            className={cn(
              'flex items-center gap-2.5 rounded-md outline-none',
              'focus-visible:ring-2',
              solid ? 'focus-visible:ring-ring' : 'focus-visible:ring-on-dark',
            )}
          >
            {/* Two inks of the same lockup, cross-faded rather than swapped by
                src so the change rides the same curve as the header colour.
                Only the colour copy carries alt, so the link is named once. */}
            <span
              className={cn(
                'relative block aspect-[382/144] shrink-0',
                'motion-safe:transition-[height] motion-safe:duration-300 motion-safe:ease-out',
                solid ? 'h-11' : 'h-12',
              )}
            >
              <Image
                src="/logo/mvp-horizontal-light.png"
                alt=""
                aria-hidden="true"
                fill
                sizes="128px"
                priority
                className={cn(
                  'object-contain motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-out',
                  solid ? 'opacity-0' : 'opacity-100',
                )}
              />
              <Image
                src="/logo/mvp-horizontal-dark.png"
                alt={`${siteConfig.brandName} — ${siteConfig.tagline}`}
                fill
                sizes="128px"
                priority
                className={cn(
                  'object-contain motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-out',
                  solid ? 'opacity-100' : 'opacity-0',
                )}
              />
            </span>
          </Link>

          {/* xl, not lg: six nav items plus the phone CTA overflow a 1024px
              viewport. Below xl the sheet takes over. */}
          <nav aria-label="Primary" className="hidden items-center gap-7 xl:flex">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative rounded-md px-0.5 py-1 text-body font-medium outline-none',
                    'motion-safe:transition-colors motion-safe:duration-300',
                    'focus-visible:ring-2',
                    solid ? 'focus-visible:ring-ring' : 'focus-visible:ring-on-dark',
                    solid
                      ? active
                        ? 'text-brand-accent'
                        : 'text-surface-dark hover:text-brand-accent'
                      : active
                        ? 'text-gold'
                        : 'text-on-dark hover:text-gold',
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute -bottom-0.5 left-0 h-px w-full origin-left bg-current',
                      'motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out',
                      active ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                </Link>
              )
            })}
          </nav>

          {/* §10.2 ranks a direct call as the primary action, so the header
              carries the number itself rather than a form link. WhatsApp is
              always reachable via the floating button. */}
          <div className="hidden items-center gap-3 xl:flex">
            <Button
              size="cta"
              nativeButton={false}
              className={cn(
                'motion-safe:transition-[box-shadow] motion-safe:duration-300',
                !solid && 'ring-1 ring-on-dark/35 focus-visible:ring-on-dark/70',
              )}
              render={<a href={siteConfig.phoneHref} />}
            >
              <Phone data-icon="inline-start" />
              {siteConfig.phone}
            </Button>
          </div>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls={MOBILE_MENU_ID}
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    'xl:hidden motion-safe:transition-colors motion-safe:duration-300',
                    solid
                      ? 'text-surface-dark hover:bg-muted hover:text-surface-dark'
                      : 'text-on-dark hover:bg-on-dark/15 hover:text-on-dark aria-expanded:bg-on-dark/15 aria-expanded:text-on-dark focus-visible:ring-on-dark/70',
                  )}
                />
              }
            >
              <Menu />
            </SheetTrigger>
            <SheetContent id={MOBILE_MENU_ID} side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="font-serif text-surface-dark">
                  {siteConfig.brandName}
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Primary" className="flex flex-col gap-1 px-4">
                {navLinks.map((link) => {
                  const active = isActive(pathname, link.href)
                  return (
                    <SheetClose key={link.href} render={<Link href={link.href} />}>
                      <span
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'block rounded-md px-2 py-3 text-body-lg font-medium transition-colors hover:bg-surface-sunken hover:text-brand-accent',
                          active ? 'text-brand-accent' : 'text-ink',
                        )}
                      >
                        {link.label}
                      </span>
                    </SheetClose>
                  )
                })}
              </nav>
              <div className="mt-2 border-t border-line px-4 pt-4">
                {secondaryLinks.map((link) => (
                  <SheetClose key={link.href} render={<Link href={link.href} />}>
                    <span className="block rounded-md px-2 py-3 text-body font-medium text-ink-muted transition-colors hover:bg-surface-sunken hover:text-brand-accent">
                      {link.label}
                    </span>
                  </SheetClose>
                ))}
              </div>
              <div className="mt-4 flex flex-col gap-3 px-4">
                <Button size="cta" nativeButton={false} render={<a href={siteConfig.phoneHref} />}>
                  <Phone data-icon="inline-start" />
                  {siteConfig.phone}
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
                  WhatsApp
                </Button>
                <SheetClose
                  render={
                    <Button variant="ghost" size="cta" nativeButton={false} render={<Link href="/contact" />}>
                      Send an enquiry
                    </Button>
                  }
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </motion.header>
    </>
  )
}
