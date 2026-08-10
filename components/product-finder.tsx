'use client'

import { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'

import { ProductCard } from '@/components/product-card'
import { Card, Pill } from '@/components/primitives/surface'
import { Input } from '@/components/ui/input'
import type { Product } from '@/lib/site-data'
import { cn } from '@/lib/utils'

type Filter = 'all' | 'available' | 'coming-soon'

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All lines' },
  { id: 'available', label: 'Shipping now' },
  { id: 'coming-soon', label: 'In development' },
]

/** Digits only, so "0801 19 10", "08011910" and "0801-19-10" all match. */
function normalise(value: string) {
  return value.toLowerCase().replace(/[\s-]/g, '')
}

/**
 * Search and filter by category and HS code (§10.6 of the intake
 * questionnaire). With four lines this is light work, but it is wired to the
 * product data rather than hardcoded, so it scales as the catalogue grows.
 */
export function ProductFinder({ products }: { products: Product[] }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('all')

  const results = useMemo(() => {
    const q = normalise(query.trim())
    return products.filter((product) => {
      if (filter !== 'all' && product.status !== filter) return false
      if (!q) return true

      const haystack = [
        product.name,
        product.tagline,
        product.intro ?? '',
        ...product.specs.map((s) => `${s.label} ${s.value}`),
        ...product.markets,
      ]
        .map(normalise)
        .join(' ')

      return haystack.includes(q)
    })
  }, [products, query, filter])

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full max-w-md">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-subtle"
          />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search product or HS code — e.g. 0801 19 10"
            aria-label="Search products by name or HS code"
            className="pl-9"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute top-1/2 right-2 grid size-6 -translate-y-1/2 place-items-center rounded-full text-ink-subtle outline-none transition-colors hover:bg-surface-sunken hover:text-ink focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X aria-hidden="true" className="size-3.5" />
            </button>
          )}
        </div>

        <div role="group" aria-label="Filter by availability" className="flex flex-wrap gap-2">
          {FILTERS.map((option) => {
            const active = filter === option.id
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setFilter(option.id)}
                aria-pressed={active}
                className={cn(
                  'rounded-full border px-4 py-1.5 text-caption font-medium outline-none transition-colors',
                  'focus-visible:ring-2 focus-visible:ring-ring',
                  active
                    ? 'border-surface-dark bg-surface-dark text-on-dark'
                    : 'border-line bg-surface-raised text-ink-muted hover:border-line-strong hover:text-ink',
                )}
              >
                {option.label}
              </button>
            )
          })}
        </div>
      </div>

      <p aria-live="polite" className="mt-5 text-caption text-ink-subtle">
        {results.length} of {products.length} lines
        {query && (
          <>
            {' '}
            matching <span className="text-ink">“{query}”</span>
          </>
        )}
      </p>

      {results.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <Card className="mt-8">
          <h3 className="font-serif text-heading-sm font-semibold text-surface-dark">
            Nothing matches that yet
          </h3>
          <p className="mt-2 max-w-2xl text-body text-ink-muted">
            We list only what we can actually supply. As a merchant exporter we can
            often source against a specific requirement — tell us the product, grade
            and destination and we will say plainly whether we can serve it.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {products.map((product) => (
              <Pill key={product.id}>{product.name}</Pill>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
