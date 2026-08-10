import Link from 'next/link'
import { ArrowRight, MessageCircle, Phone } from 'lucide-react'

import { Container } from '@/components/primitives/container'
import { Reveal } from '@/components/primitives/reveal'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/site-data'

/**
 * The closing call to action. Appears at the foot of every page except
 * /contact, so there is always one obvious next step.
 *
 * Order follows §10.2 of the intake questionnaire: the client's first choice
 * for "the main action a visitor should take" is a direct call, with WhatsApp
 * marked as second. The enquiry form comes third.
 */
export function CtaBand({
  title = 'Start your next shipment with us',
  lede = 'Call, message us on WhatsApp, or send an enquiry. We reply within one business day with pricing, MOQ and lead times.',
}: {
  title?: string
  lede?: string
}) {
  return (
    <section className="border-t border-line bg-surface-sunken py-section">
      <Container>
        <Reveal className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="font-serif text-display-sm font-bold text-balance text-surface-dark">
              {title}
            </h2>
            <p className="mt-4 text-body-lg text-pretty text-ink-muted">{lede}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button size="cta-lg" nativeButton={false} render={<a href={siteConfig.phoneHref} />}>
              <Phone data-icon="inline-start" />
              {siteConfig.phone}
            </Button>
            <Button
              variant="outline"
              size="cta-lg"
              nativeButton={false}
              render={
                <a href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer" />
              }
            >
              <MessageCircle data-icon="inline-start" />
              WhatsApp
            </Button>
            <Button variant="ghost" size="cta-lg" nativeButton={false} render={<Link href="/contact" />}>
              Send an enquiry
              <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
