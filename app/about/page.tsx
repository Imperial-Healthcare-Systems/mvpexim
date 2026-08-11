import type { Metadata } from 'next'
import { Compass, FileCheck2, Handshake, ShieldCheck, Target } from 'lucide-react'

import { PageHeader } from '@/components/primitives/page-header'
import { PlaceholderImage } from '@/components/primitives/placeholder-image'
import { Reveal, Stagger, StaggerItem } from '@/components/primitives/reveal'
import { Section } from '@/components/primitives/section'
import { Card } from '@/components/primitives/surface'
import { Prose, SectionHeading } from '@/components/primitives/typography'
import { CtaBand } from '@/components/sections/cta-band'
import { founder, milestones, operatingModel, siteConfig, story, values } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'About',
  description:
    'MVP Exim is a Bengaluru-registered merchant exporter founded in July 2026. Our story began exporting semi-husked coconut from Pollachi, Tamil Nadu to Dubai, UAE.',
  openGraph: {
    title: 'About MVP Exim',
    description:
      'A Bengaluru-registered merchant exporter. Our story, our founder, and the values behind every shipment.',
    url: '/about',
  },
  alternates: { canonical: '/about' },
}

const valueIcons = [ShieldCheck, FileCheck2, Target, Compass, Handshake]

export default function AboutPage() {
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: 'Home', href: '/' }]}
        overline="Our Story"
        title="A partnership that started with one coconut shipment to Dubai."
        lede={`MVP stands for ${siteConfig.nameMeaning} — a reminder of what we are actually in business to do.`}
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <Prose>
              <p>{story.opening}</p>
              <p>{story.origin}</p>
            </Prose>

            <figure className="mt-10 border-l-2 border-brand-accent pl-6">
              <blockquote className="font-serif text-display-sm font-medium text-balance text-surface-dark">
                “{story.pullQuote}”
              </blockquote>
              <figcaption className="mt-4 text-caption font-semibold uppercase tracking-wide text-brand-accent">
                {founder.name} — {founder.role}
              </figcaption>
            </figure>

            <div className="mt-12">
              <h2 className="font-serif text-heading font-semibold text-surface-dark">
                Milestones
              </h2>
              <ol className="mt-6 space-y-7 border-l-2 border-line pl-6">
                {milestones.map((milestone) => (
                  <li key={milestone.title} className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[31px] top-1.5 size-2.5 rounded-full bg-brand-accent ring-4 ring-surface"
                    />
                    <div className="text-overline uppercase text-brand-accent">
                      {milestone.date}
                    </div>
                    <div className="mt-1 font-serif text-heading-sm font-semibold text-surface-dark">
                      {milestone.title}
                    </div>
                    <p className="mt-1 text-body text-ink-muted">{milestone.detail}</p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <PlaceholderImage
              src="/images/story-farm.jpg"
              alt="A grower opening a freshly harvested coconut by hand at a smallholding"
              label="Coconut harvest, by hand"
              width={1200}
              height={1500}
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="shadow-lift"
            />
            <Card className="mt-8">
              <h2 className="font-serif text-heading-sm font-semibold text-surface-dark">
                {operatingModel.title}
              </h2>
              <p className="mt-3 text-body text-pretty text-ink-muted">
                {operatingModel.detail}
              </p>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* Founder */}
      <Section tone="sunken">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            {/* Alt deliberately does not name Nikhil. This slot currently holds
                a generated, faceless image; captioning a synthetic person as a
                real named founder would be fabricating their likeness. Restore
                the naming when a real photograph replaces it. */}
            <PlaceholderImage
              src="/images/desk-documents.jpg"
              alt="Export documentation and shipping paperwork under review at a desk"
              label="Export documentation"
              width={1200}
              height={900}
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="shadow-lift"
            />
          </Reveal>

          <Reveal delay={0.1}>
            <SectionHeading overline="The Founder" title={founder.name} size="display-sm" />
            <p className="mt-2 text-caption uppercase tracking-wide text-ink-subtle">
              {founder.role}
            </p>
            <Prose className="mt-6">
              <p>{founder.bio}</p>
            </Prose>

            <div className="mt-12">
              <SectionHeading
                overline="Mission & Vision"
                title={story.missionVision}
                size="display-sm"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Values */}
      <Section>
        <Reveal>
          <SectionHeading
            overline="What We Stand For"
            title="The values that shape every shipment."
            lede="Five, not twelve — and each one with a line on how it shows up in practice."
          />
        </Reveal>

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, i) => {
            const Icon = valueIcons[i % valueIcons.length]
            return (
              <StaggerItem key={value.title} className="h-full">
                <Card className="h-full">
                  <div className="flex size-11 items-center justify-center rounded-lg bg-surface-dark/8 text-surface-dark">
                    <Icon aria-hidden="true" className="size-5" />
                  </div>
                  <h3 className="mt-5 font-serif text-heading-sm font-semibold text-surface-dark">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-body text-pretty text-ink-muted">{value.detail}</p>
                </Card>
              </StaggerItem>
            )
          })}
        </Stagger>
      </Section>

      <CtaBand />
    </>
  )
}
