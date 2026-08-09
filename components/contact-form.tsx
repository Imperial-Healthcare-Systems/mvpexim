'use client'

import { useState, useTransition } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Send } from 'lucide-react'

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
import { PRODUCT_CATEGORIES } from '@/lib/site-data'

/**
 * NOTE: this form does not submit anywhere yet. `handleSubmit` simulates a
 * round trip and shows the success state — there is no API route, no email and
 * no database, so enquiries are NOT captured. Wiring it up is a separate
 * piece of work.
 */
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [interest, setInterest] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 900))
      setSubmitted(true)
    })
  }

  if (submitted) {
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
          Thank you for reaching out. A member of our trade desk will contact you
          shortly — usually within one business day.
        </p>
      </motion.div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-line bg-surface-raised p-6 shadow-card md:p-8"
    >
      <FieldGroup>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="name">Full name</FieldLabel>
            <Input id="name" name="name" autoComplete="name" required />
          </Field>
          <Field>
            <FieldLabel htmlFor="company">Company</FieldLabel>
            <Input id="company" name="company" autoComplete="organization" />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="email">Work email</FieldLabel>
            <Input id="email" name="email" type="email" autoComplete="email" required />
          </Field>
          <Field>
            <FieldLabel htmlFor="phone">Phone or WhatsApp</FieldLabel>
            <Input id="phone" name="phone" type="tel" autoComplete="tel" />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="interest">Product interest</FieldLabel>
          {/* The Select is controlled, so its value is mirrored into a hidden
              input — otherwise it never reaches the submitted FormData. */}
          <input type="hidden" name="interest" value={interest ?? ''} />
          <Select value={interest} onValueChange={(v) => setInterest(v as string)}>
            <SelectTrigger id="interest" className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {PRODUCT_CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldDescription>Choose the closest matching category.</FieldDescription>
        </Field>

        {/* Destination and quantity are what make an enquiry quotable — without
            them a reply can only ask for them, costing a round trip. */}
        <div className="grid gap-5 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="destination">Destination port or country</FieldLabel>
            <Input id="destination" name="destination" autoComplete="country-name" />
          </Field>
          <Field>
            <FieldLabel htmlFor="quantity">Quantity required</FieldLabel>
            <Input id="quantity" name="quantity" placeholder="e.g. 2 × 40ft containers" />
            <FieldDescription>Containers, MT, or your usual unit.</FieldDescription>
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="message">Message</FieldLabel>
          <Textarea
            id="message"
            name="message"
            placeholder="Tell us about grade, timelines, and preferred Incoterm..."
            className="min-h-32"
            required
          />
        </Field>

        <Button type="submit" size="cta-lg" disabled={isPending} className="w-full">
          {isPending ? 'Sending...' : 'Send Enquiry'}
          <Send data-icon="inline-end" />
        </Button>
      </FieldGroup>
    </form>
  )
}
