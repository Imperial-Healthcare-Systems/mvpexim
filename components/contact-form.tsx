'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, MessageCircle, Phone, Send } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import type { FieldErrors } from '@/lib/enquiry'
import { PRODUCT_CATEGORIES, siteConfig } from '@/lib/site-data'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'sending' | 'sent' | 'error'

/**
 * Field set follows §10.4 of the intake questionnaire exactly. Ticked:
 * Name, Work email*, Phone or WhatsApp*, Product required*, Quantity,
 * Destination port*, Target price. Asterisked fields are compulsory. Company
 * name, Country, Grade, Preferred Incoterm and Preferred payment terms were NOT
 * ticked and are therefore absent.
 *
 * Posts to /api/enquiry, which emails the trade desk and sends the buyer the
 * automatic acknowledgement §10.4 asks for. If delivery is not configured the
 * route returns 503 and we say so plainly — a success screen for an enquiry
 * that went nowhere is worse than no form at all.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [failure, setFailure] = useState<string | null>(null)
  const [product, setProduct] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const payload = Object.fromEntries(new FormData(form).entries())

    setStatus('sending')
    setErrors({})
    setFailure(null)

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await res.json().catch(() => ({}))

      if (res.ok && result.ok) {
        setStatus('sent')
        return
      }

      if (result.error === 'validation') {
        setErrors(result.errors ?? {})
        setFailure('Please check the highlighted fields.')
      } else if (result.error === 'rate_limited') {
        setFailure('That is a lot of enquiries in a short time. Please call us instead.')
      } else {
        setFailure(
          'We could not send that just now. Please call or message us on WhatsApp — we will pick it up straight away.',
        )
      }
      setStatus('error')
    } catch {
      setFailure(
        'We could not reach the server. Please call or message us on WhatsApp instead.',
      )
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <motion.div
        data-motion=""
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-[420px] flex-col items-center justify-center gap-4 rounded-2xl border border-line bg-surface-raised p-8 text-center shadow-card"
      >
        <div className="flex size-14 items-center justify-center rounded-full bg-brand-accent/10 text-brand-accent">
          <CheckCircle2 aria-hidden="true" className="size-7" />
        </div>
        <h2 className="font-serif text-heading font-semibold text-surface-dark">
          Enquiry received
        </h2>
        <p className="max-w-sm text-body text-ink-muted">
          We have emailed you a confirmation. Our trade desk will reply within one
          business day. If it is urgent, call{' '}
          <a
            href={siteConfig.phoneHref}
            className="font-semibold text-brand-accent underline-offset-4 hover:underline"
          >
            {siteConfig.phone}
          </a>
          .
        </p>
      </motion.div>
    )
  }

  const invalid = (field: keyof FieldErrors) =>
    errors[field] ? { 'aria-invalid': true as const, 'aria-describedby': `${field}-error` } : {}

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-line bg-surface-raised p-6 shadow-card md:p-8"
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Full name</FieldLabel>
          <Input id="name" name="name" autoComplete="name" />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="email">Work email *</FieldLabel>
            <Input id="email" name="email" type="email" autoComplete="email" {...invalid('email')} />
            <FieldError id="email-error" message={errors.email} />
          </Field>
          <Field>
            <FieldLabel htmlFor="phone">Phone or WhatsApp *</FieldLabel>
            <Input id="phone" name="phone" type="tel" autoComplete="tel" {...invalid('phone')} />
            <FieldError id="phone-error" message={errors.phone} />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="product">Product required *</FieldLabel>
          {/* The Select is controlled, so its value is mirrored into a hidden
              input — otherwise it never reaches the submitted FormData. */}
          <input type="hidden" name="product" value={product ?? ''} />
          <Select value={product} onValueChange={(v) => setProduct(v as string)}>
            <SelectTrigger id="product" className="w-full" {...invalid('product')}>
              <SelectValue placeholder="Select a product line" />
            </SelectTrigger>
            <SelectContent>
              {PRODUCT_CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError id="product-error" message={errors.product} />
        </Field>

        {/* Destination and quantity are what make an enquiry quotable — the
            questionnaire notes an enquiry omitting them cannot be priced. */}
        <div className="grid gap-5 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="destination">Destination port *</FieldLabel>
            <Input
              id="destination"
              name="destination"
              placeholder="e.g. Jebel Ali"
              {...invalid('destination')}
            />
            <FieldError id="destination-error" message={errors.destination} />
          </Field>
          <Field>
            <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
            <Input id="quantity" name="quantity" placeholder="e.g. 2 × 40ft containers" />
            <FieldDescription>Containers, MT, or your usual unit.</FieldDescription>
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="targetPrice">Target price</FieldLabel>
          <Input id="targetPrice" name="targetPrice" placeholder="Per MT or per container" />
          <FieldDescription>
            Optional — it lets us tell you quickly whether we can meet it.
          </FieldDescription>
        </Field>

        {/* Not ticked in §10.4, kept optional: a form with no free text leaves a
            buyer no way to say anything specific. */}
        <Field>
          <FieldLabel htmlFor="message">Anything else</FieldLabel>
          <Textarea
            id="message"
            name="message"
            placeholder="Grade, timelines, preferred Incoterm or payment terms..."
            className="min-h-28"
          />
        </Field>

        {/* Honeypot — hidden from people, irresistible to bots. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="company_website">Company website</label>
          <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {failure && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4"
          >
            <AlertTriangle aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-destructive" />
            <div>
              <p className="text-body text-ink">{failure}</p>
              <div className="mt-3 flex flex-wrap gap-3">
                <Button size="cta" nativeButton={false} render={<a href={siteConfig.phoneHref} />}>
                  <Phone data-icon="inline-start" />
                  {siteConfig.phone}
                </Button>
                <Button
                  variant="outline"
                  size="cta"
                  nativeButton={false}
                  render={
                    <a href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer" />
                  }
                >
                  <MessageCircle data-icon="inline-start" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        )}

        <Button
          type="submit"
          size="cta-lg"
          disabled={status === 'sending'}
          className="w-full"
        >
          {status === 'sending' ? 'Sending...' : 'Send Enquiry'}
          <Send data-icon="inline-end" />
        </Button>
        <p className="text-caption text-ink-subtle">
          Fields marked * are required. Prefer to talk? Call{' '}
          <a
            href={siteConfig.phoneHref}
            className="font-medium text-brand-accent underline-offset-4 hover:underline"
          >
            {siteConfig.phone}
          </a>
          , {siteConfig.hours}.
        </p>
      </FieldGroup>
    </form>
  )
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className={cn('text-caption font-medium text-destructive')}>
      {message}
    </p>
  )
}
