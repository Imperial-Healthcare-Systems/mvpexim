'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Anchor, Plane, Globe2 } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { staggerContainer, fadeUp } from '@/lib/motion'
import { ports, markets, siteConfig } from '@/lib/site-data'

export function MarketsSection() {
  return (
    <section id="markets" className="relative overflow-hidden bg-primary py-24 lg:py-32">
      <div className="absolute inset-0">
        <Image
          src="/images/containers-aerial.png"
          alt="Aerial view of a shipping container yard at an Indian port"
          fill
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-primary" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-highlight">
            Global Reach
          </span>
          <h2 className="mt-3 max-w-2xl text-balance font-serif text-4xl font-semibold leading-tight text-primary-foreground lg:text-5xl">
            Shipping from Indian ports to buyers across the world.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal delay={0.1}>
            <div className="flex items-center gap-3">
              <Anchor className="size-5 text-highlight" />
              <h3 className="font-serif text-lg font-semibold text-primary-foreground">
                Ports of Loading
              </h3>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              {ports.map((port) => (
                <div
                  key={port.name}
                  className="rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 px-4 py-3"
                >
                  <div className="font-serif text-base font-semibold text-primary-foreground">
                    {port.name}
                  </div>
                  <div className="text-xs text-primary-foreground/60">{port.type}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-3">
              <Plane className="size-5 text-highlight" />
              <h3 className="font-serif text-lg font-semibold text-primary-foreground">
                Business Hours
              </h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">
              {siteConfig.hours} · We reply across time zones and speak{' '}
              {siteConfig.languages.join(' & ')}.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex items-center gap-3">
              <Globe2 className="size-5 text-highlight" />
              <h3 className="font-serif text-lg font-semibold text-primary-foreground">
                Markets We Serve
              </h3>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              className="mt-5 grid gap-4 sm:grid-cols-3"
            >
              {markets.map((market) => (
                <motion.div
                  key={market}
                  variants={fadeUp}
                  whileHover={{ y: -6, backgroundColor: 'rgba(255,255,255,0.08)' }}
                  className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/[0.03] p-6 transition-colors"
                >
                  <div className="font-serif text-xl font-semibold text-primary-foreground">
                    {market}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-wide text-primary-foreground/55">
                    Active Buyer Market
                  </div>
                </motion.div>
              ))}
              <motion.div
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="flex flex-col items-start justify-center rounded-xl border border-dashed border-primary-foreground/25 p-6"
              >
                <div className="font-serif text-lg font-semibold text-primary-foreground/80">
                  Opening Next
                </div>
                <p className="mt-1 text-xs leading-relaxed text-primary-foreground/55">
                  We are actively building relationships in new markets as our
                  product range grows.
                </p>
              </motion.div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
