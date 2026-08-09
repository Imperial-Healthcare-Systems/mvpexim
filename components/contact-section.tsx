"use client"

import { useState, useTransition } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Reveal } from "@/components/reveal"
import { PRODUCT_CATEGORIES, CONTACT_INFO } from "@/lib/site-data"

export function ContactSection() {
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

  return (
    <section id="contact" className="border-t border-border bg-primary py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <Reveal>
              <p className="font-sans text-sm font-semibold tracking-[0.2em] text-highlight uppercase">
                Get In Touch
              </p>
              <h2 className="mt-3 font-serif text-3xl font-medium text-balance text-primary-foreground md:text-4xl">
                Start your next shipment with us
              </h2>
              <p className="mt-4 max-w-md text-pretty leading-relaxed text-primary-foreground/70">
                Tell us what you need to source or ship. Our team responds to
                every enquiry within one business day with pricing, MOQ, and
                lead-time guidance.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-10 flex flex-col gap-5">
              <ContactRow
                icon={Mail}
                label="Email"
                value={CONTACT_INFO.email}
                href={`mailto:${CONTACT_INFO.email}`}
              />
              <ContactRow
                icon={Phone}
                label="Phone"
                value={CONTACT_INFO.phone}
                href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
              />
              <ContactRow icon={MapPin} label="Office" value={CONTACT_INFO.address} />
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:col-span-3">
            <div className="rounded-2xl bg-card p-6 shadow-xl shadow-black/20 md:p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex min-h-[360px] flex-col items-center justify-center gap-4 text-center"
                >
                  <div className="flex size-14 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <CheckCircle2 className="size-7" />
                  </div>
                  <h3 className="font-serif text-2xl font-medium text-card-foreground">
                    Enquiry received
                  </h3>
                  <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                    Thank you for reaching out. A member of our trade desk will
                    contact you shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <FieldGroup>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field>
                        <FieldLabel htmlFor="name">Full name</FieldLabel>
                        <Input id="name" name="name" placeholder="Jordan Lee" required />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="company">Company</FieldLabel>
                        <Input id="company" name="company" placeholder="Your company" />
                      </Field>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@company.com"
                          required
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="phone">Phone</FieldLabel>
                        <Input id="phone" name="phone" type="tel" placeholder="+1 555 000 0000" />
                      </Field>
                    </div>

                    <Field>
                      <FieldLabel htmlFor="interest">Product interest</FieldLabel>
                      <Select
                        value={interest}
                        onValueChange={(v) => setInterest(v as string)}
                      >
                        <SelectTrigger id="interest" className="w-full">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {PRODUCT_CATEGORIES.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FieldDescription>
                        Choose the closest matching category.
                      </FieldDescription>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="message">Message</FieldLabel>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about volumes, destination port, and timelines..."
                        className="min-h-28"
                        required
                      />
                    </Field>

                    <Button type="submit" size="lg" disabled={isPending} className="w-full">
                      {isPending ? "Sending..." : "Send Enquiry"}
                      <Send data-icon="inline-end" />
                    </Button>
                  </FieldGroup>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  href?: string
}) {
  const content = (
    <div className="flex items-start gap-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-foreground/10 text-highlight">
        <Icon className="size-4" />
      </div>
      <div>
        <p className="text-xs font-medium tracking-wide text-primary-foreground/50 uppercase">
          {label}
        </p>
        <p className="text-sm text-primary-foreground/90">{value}</p>
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} className="transition-opacity hover:opacity-80">
        {content}
      </a>
    )
  }

  return content
}
