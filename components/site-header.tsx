'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import { navLinks, siteConfig } from '@/lib/site-data'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-background/95 shadow-sm backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-10">
        <Link href="#home" className="flex items-center gap-2.5">
          <Image
            src="/logo/mvp-icon.png"
            alt="MVP Exim logo"
            width={40}
            height={40}
            className="h-9 w-9 shrink-0"
            priority
          />
          <span className="flex flex-col leading-none">
            <span className="font-serif text-lg font-semibold tracking-tight text-primary">
              MVP EXIM
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-accent">
              {siteConfig.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            variant="outline"
            nativeButton={false}
            render={
              <a href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer" />
            }
          >
            <MessageCircle data-icon="inline-start" />
            WhatsApp
          </Button>
          <Button nativeButton={false} render={<a href="#contact" />}>
            Get a Quote
          </Button>
        </div>

        <Sheet>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu" />
            }
          >
            <Menu />
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle className="font-serif text-primary">MVP EXIM</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {navLinks.map((link) => (
                <SheetClose key={link.href} render={<a href={link.href} />}>
                  <span className="block rounded-md px-2 py-3 text-base font-medium text-foreground/85 transition-colors hover:bg-secondary hover:text-accent">
                    {link.label}
                  </span>
                </SheetClose>
              ))}
            </nav>
            <div className="mt-4 flex flex-col gap-3 px-4">
              <Button
                variant="outline"
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
                  <Button nativeButton={false} render={<a href="#contact" />}>
                    Get a Quote
                  </Button>
                }
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  )
}
