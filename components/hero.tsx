'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { siteConfig } from '@/lib/site-data'

const stats = [
  { value: '2026', label: 'Exporting Since' },
  { value: '3', label: 'Ports of Loading' },
  { value: '14 MT', label: 'First Container Shipped' },
]

export function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100vh] items-center overflow-hidden pt-24"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-port.png"
          alt="Export goods being loaded onto a shipping container at an Indian port at golden hour"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/92 via-primary/70 to-primary/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:px-10">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-primary-foreground/90"
          >
            Merchant Exporter · Registered in Bengaluru, India
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-balance font-serif text-5xl font-semibold leading-[1.05] text-primary-foreground sm:text-6xl lg:text-7xl"
          >
            Our World,
            <br />
            <span className="text-highlight">Your Product.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-primary-foreground/85"
          >
            MVP Exim sources and ships quality Indian produce to discerning buyers
            worldwide — starting with premium semi-husked coconut from Tamil Nadu,
            with textiles, leather and polymers next in line.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a href="#contact" className={buttonVariants({ size: 'lg' })}>
              Request a Quote
              <ArrowRight data-icon="inline-end" />
            </a>
            <a
              href={siteConfig.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                size: 'lg',
                variant: 'outline',
                className:
                  'border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground',
              })}
            >
              <MessageCircle data-icon="inline-start" />
              Chat on WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.56, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 grid max-w-xl grid-cols-3 gap-6 border-t border-primary-foreground/20 pt-8"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-serif text-3xl font-semibold text-primary-foreground">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs uppercase tracking-wide text-primary-foreground/65">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
