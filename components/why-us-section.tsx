'use client'

import { motion } from 'framer-motion'
import { Eye, Zap, ShieldCheck, MessageSquareText, FileCheck } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { staggerContainer, fadeUp } from '@/lib/motion'
import { differentiators, incoterms } from '@/lib/site-data'

const icons = [Eye, Zap, ShieldCheck, MessageSquareText]

export function WhyUsSection() {
  return (
    <section id="why-us" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Why MVP Exim
          </span>
          <h2 className="mt-3 max-w-2xl text-balance font-serif text-4xl font-semibold leading-tight text-primary lg:text-5xl">
            A buyer sees a dozen near-identical offers a week. Here is why they open ours.
          </h2>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {differentiators.map((item, i) => {
            const Icon = icons[i % icons.length]
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                whileHover={{ y: -8, scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-sm transition-shadow hover:shadow-xl"
              >
                <div className="absolute -right-6 -top-6 size-24 rounded-full bg-accent/0 transition-colors duration-500 group-hover:bg-accent/10" />
                <Icon className="size-7 text-accent" />
                <h3 className="mt-5 font-serif text-lg font-semibold text-card-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.detail}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        <Reveal delay={0.1} className="mt-20 rounded-2xl border border-border bg-secondary/50 p-8 lg:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <FileCheck className="size-5 text-accent" />
                <h3 className="font-serif text-xl font-semibold text-primary">
                  Trade terms we quote on
                </h3>
              </div>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                Publishing our terms plainly saves a round of email on every
                enquiry — and tells you upfront whether we can serve you.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {incoterms.map((term) => (
                <span
                  key={term}
                  className="rounded-full border border-accent/30 bg-accent/5 px-5 py-2 font-serif text-sm font-semibold text-accent"
                >
                  {term}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
