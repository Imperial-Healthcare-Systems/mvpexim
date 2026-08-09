'use client'

import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
import { motion } from 'framer-motion'
import { ArrowUpRight, Clock } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Badge } from '@/components/ui/badge'
import { Reveal } from '@/components/reveal'
import { products } from '@/lib/site-data'

export function ProductsSection() {
  return (
    <section id="products" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              What We Trade
            </span>
            <h2 className="mt-3 text-balance font-serif text-4xl font-semibold leading-tight text-primary lg:text-5xl">
              Products &amp; commodities
            </h2>
            <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              Semi-husked coconut is our flagship line today. Textiles,
              leather and polymers are next, as we grow from merchant exporter
              toward a full trading house.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          <Carousel
            opts={{ align: 'start', loop: true }}
            plugins={[Autoplay({ delay: 4500, stopOnInteraction: true })]}
            className="w-full"
          >
            <CarouselContent className="-ml-6">
              {products.map((product) => (
                <CarouselItem key={product.id} className="pl-6 sm:basis-1/2 lg:basis-1/3">
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="group h-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-2xl"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="absolute right-4 top-4">
                        {product.status === 'available' ? (
                          <Badge className="bg-accent text-accent-foreground">Available Now</Badge>
                        ) : (
                          <Badge variant="secondary" className="gap-1">
                            <Clock className="size-3" />
                            Coming Soon
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-serif text-xl font-semibold text-card-foreground">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {product.tagline}
                      </p>

                      {product.specs.length > 0 && (
                        <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-5">
                          {product.specs.slice(0, 4).map((spec) => (
                            <div key={spec.label}>
                              <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">
                                {spec.label}
                              </dt>
                              <dd className="mt-0.5 text-sm font-medium text-card-foreground">
                                {spec.value}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      )}

                      {product.markets.length > 0 && (
                        <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-5">
                          {product.markets.map((m) => (
                            <Badge key={m} variant="outline">
                              {m}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <a
                        href="#contact"
                        className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent transition-colors group-hover:text-primary"
                      >
                        Enquire about this product
                        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-8 flex items-center justify-end gap-3">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
        </Reveal>
      </div>
    </section>
  )
}
