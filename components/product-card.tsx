'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Clock } from 'lucide-react'

import { PlaceholderImage } from '@/components/primitives/placeholder-image'
import { Pill } from '@/components/primitives/surface'
import { LIFT_SPRING } from '@/lib/motion'
import type { Product } from '@/lib/site-data'
import { cn } from '@/lib/utils'

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product
  priority?: boolean
}) {
  const available = product.status === 'available'
  const href = product.detailPage ? `/products/${product.slug}` : '/contact'

  return (
    <motion.article
      data-motion=""
      whileHover={{ y: -6 }}
      transition={LIFT_SPRING}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface-raised shadow-card transition-shadow hover:shadow-lift"
    >
      <div className="relative">
        <PlaceholderImage
          src={product.image}
          alt={product.imageAlt}
          label={product.imageLabel}
          width={1200}
          height={900}
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          rounded="rounded-none"
          imageClassName="transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4">
          {available ? (
            <Pill tone="accent" className="bg-surface-raised">
              Available Now
            </Pill>
          ) : (
            <Pill tone="neutral" className="bg-surface-raised">
              <Clock aria-hidden="true" className="size-3.5" />
              Coming Soon
            </Pill>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-heading font-semibold text-surface-dark">
          {product.name}
        </h3>
        <p className="mt-2 text-body text-pretty text-ink-muted">{product.tagline}</p>

        {product.specs.length > 0 && (
          <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-5">
            {product.specs.slice(0, 4).map((spec) => (
              <div key={spec.label}>
                <dt className="text-overline uppercase text-ink-subtle">{spec.label}</dt>
                <dd className="tabular mt-0.5 text-body font-medium text-ink">{spec.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {product.markets.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-5">
            {product.markets.map((market) => (
              <Pill key={market}>{market}</Pill>
            ))}
          </div>
        )}

        <Link
          href={href}
          className={cn(
            'mt-6 inline-flex items-center gap-1.5 self-start rounded text-body font-semibold text-brand-accent outline-none',
            'transition-colors hover:text-surface-dark focus-visible:ring-2 focus-visible:ring-ring',
          )}
        >
          {product.detailPage ? 'View specifications' : 'Register your interest'}
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
          <span className="sr-only"> — {product.name}</span>
        </Link>
      </div>
    </motion.article>
  )
}
