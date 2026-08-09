'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Target, Compass, ShieldCheck, FileCheck2, Handshake } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { staggerContainer, fadeUp } from '@/lib/motion'
import { values } from '@/lib/site-data'

const icons = [ShieldCheck, FileCheck2, Target, Compass, Handshake]

export function FounderValuesSection() {
  return (
    <section className="bg-secondary/60 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/images/desk-documents.png"
                alt="Reviewing export documentation and shipping paperwork"
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-8">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                The Founder
              </span>
              <h3 className="mt-3 font-serif text-2xl font-semibold text-primary">
                Nikhil
              </h3>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                An accomplished IT professional with work experience across the
                US and India, and a background in Chemical &amp; Materials Science
                Engineering. Ever curious about how products end up on
                supermarket shelves, Nikhil set out to understand the entire
                supply chain behind global trade. Today, he is focused on
                connecting buyers and sellers on a global stage — procuring
                unique, quality products for the world&apos;s most discerning
                customers.
              </p>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                What We Stand For
              </span>
              <h2 className="mt-3 text-balance font-serif text-4xl font-semibold leading-tight text-primary lg:text-5xl">
                Mission, vision and the values that shape every shipment.
              </h2>
              <p className="mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground">
                To bring the best quality products to your hands, and to
                showcase the best produce of India to the world.
              </p>
            </Reveal>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              className="mt-10 grid gap-4 sm:grid-cols-2"
            >
              {values.map((value, i) => {
                const Icon = icons[i % icons.length]
                return (
                  <motion.div
                    key={value.title}
                    variants={fadeUp}
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg"
                  >
                    <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                      <Icon className="size-5" />
                    </div>
                    <h4 className="mt-4 font-serif text-lg font-semibold text-card-foreground">
                      {value.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {value.detail}
                    </p>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
