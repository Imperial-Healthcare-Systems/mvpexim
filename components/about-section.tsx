import Image from 'next/image'
import { Reveal } from '@/components/reveal'
import { milestones } from '@/lib/site-data'

export function AboutSection() {
  return (
    <section id="about" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Our Story
              </span>
              <h2 className="mt-3 text-balance font-serif text-4xl font-semibold leading-tight text-primary lg:text-5xl">
                A partnership that started with one coconut shipment to Dubai.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
                With the world becoming increasingly flat and a rapidly expanding
                middle class connected by the internet, quality products from
                anywhere can now reach anyone. Trade, at its heart, is a human
                business — people with needs, and people who can meet them.
              </p>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                Our story began with a partnership with AVS Exim, exporting
                semi-husked coconut from Pollachi, Tamil Nadu, to Dubai, UAE.
                Today, as social media opens new markets for a far wider range
                of products, we see an exciting opportunity to capture that
                moment — and to showcase the best produce of India to the world.
              </p>
            </Reveal>

            <Reveal delay={0.2} className="mt-10 space-y-6 border-l-2 border-border pl-6">
              {milestones.map((m) => (
                <div key={m.title} className="relative">
                  <div className="absolute -left-[27px] top-1.5 size-2.5 rounded-full bg-accent" />
                  <div className="text-xs font-semibold uppercase tracking-wide text-accent">
                    {m.date}
                  </div>
                  <div className="mt-1 font-serif text-lg font-semibold text-primary">
                    {m.title}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {m.detail}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>

          <Reveal delay={0.15} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/images/story-farm.png"
                alt="Farmers sorting coconuts at a farm in Tamil Nadu"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-6 w-64 rounded-xl border border-border bg-card p-5 shadow-lg sm:-left-10 sm:w-72">
              <p className="text-sm leading-relaxed text-card-foreground">
                &ldquo;Our goal is to place in-demand quality products into your
                hands, on time, at the best possible price.&rdquo;
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-accent">
                Nikhil — Founder, MVP Exim
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
