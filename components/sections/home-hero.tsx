'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle, Phone } from 'lucide-react'

import { Container } from '@/components/primitives/container'
import { Stat } from '@/components/primitives/surface'
import { Button } from '@/components/ui/button'
import { DURATION, EASE_OUT } from '@/lib/motion'
import { homeStats, siteConfig } from '@/lib/site-data'

/** Each block enters a beat after the one above it. */
const rise = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_OUT, delay: 0.08 + i * 0.1 },
  }),
}

export function HomeHero() {
  return (
    <section className="relative isolate flex min-h-[92svh] items-center overflow-hidden bg-surface-dark pt-32 pb-20 lg:pt-40">
      <div className="absolute inset-0 -z-10">
        {/* The LCP element. `priority` emits fetchpriority="high" and a preload
            link; this is the one image on the site that must not lazy-load. */}
        <Image
          src="/images/hero-port.jpg"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-dark/95 via-surface-dark/75 to-surface-dark/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/85 via-transparent to-transparent" />
      </div>

      <Container>
        <div className="max-w-3xl">
          <motion.div data-motion="" custom={0} initial="hidden" animate="show" variants={rise}>
            <span className="inline-flex items-center gap-2 rounded-full border border-line-on-dark bg-on-dark/10 px-4 py-1.5 text-overline uppercase text-on-dark">
              Merchant Exporter · Registered in Bengaluru, India
            </span>
          </motion.div>

          <motion.h1
            data-motion=""
            custom={1}
            initial="hidden"
            animate="show"
            variants={rise}
            className="mt-7 font-serif text-display-xl font-bold text-balance text-on-dark"
          >
            Our World,
            <br />
            <span className="text-gold">Your Product.</span>
          </motion.h1>

          <motion.p
            data-motion=""
            custom={2}
            initial="hidden"
            animate="show"
            variants={rise}
            className="mt-7 max-w-xl text-lede text-pretty text-on-dark-muted"
          >
            MVP Exim sources and ships quality Indian produce to discerning buyers
            worldwide — starting with premium semi-husked coconut from Tamil Nadu,
            with textiles, leather and polymers next in line.
          </motion.p>

          <motion.div
            data-motion=""
            custom={3}
            initial="hidden"
            animate="show"
            variants={rise}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            {/* §10.2: a direct call is the client's first choice of action,
                WhatsApp second, the enquiry form third. */}
            <Button size="cta-lg" nativeButton={false} render={<a href={siteConfig.phoneHref} />}>
              <Phone data-icon="inline-start" />
              {siteConfig.phone}
            </Button>
            <Button
              variant="on-dark"
              size="cta-lg"
              nativeButton={false}
              render={
                <a href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer" />
              }
            >
              <MessageCircle data-icon="inline-start" />
              Chat on WhatsApp
            </Button>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded text-body font-semibold text-on-dark underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-on-dark"
            >
              Or send an enquiry
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </motion.div>

          <motion.dl
            data-motion=""
            custom={4}
            initial="hidden"
            animate="show"
            variants={rise}
            className="mt-16 grid max-w-xl grid-cols-3 gap-6 border-t border-line-on-dark pt-8"
          >
            {homeStats.map((stat) => (
              <Stat key={stat.label} tone="dark" value={stat.value} label={stat.label} />
            ))}
          </motion.dl>
        </div>
      </Container>
    </section>
  )
}
