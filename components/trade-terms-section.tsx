"use client"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Reveal } from "@/components/reveal"
import { TRADE_TERMS } from "@/lib/site-data"

export function TradeTermsSection() {
  return (
    <section className="bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-xl">
          <p className="font-sans text-sm font-semibold tracking-[0.2em] text-accent uppercase">
            Working With Us
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium text-balance text-foreground md:text-4xl">
            Clear terms, every shipment
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            No surprises in the fine print. Here is exactly how sourcing,
            payment, and delivery work with MVP Exim.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {TRADE_TERMS.map((term, i) => (
            <Reveal key={term.label} delay={i * 0.06}>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="border-none bg-accent/10 text-accent">
                    {term.tag}
                  </Badge>
                  <h3 className="font-serif text-lg font-medium text-foreground">
                    {term.label}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {term.detail}
                </p>
              </div>
              {i < TRADE_TERMS.length - 2 && (
                <Separator className="mt-8 sm:hidden" />
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
