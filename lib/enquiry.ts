import { siteConfig } from '@/lib/site-data'

/**
 * Shape of an export enquiry. Fields and required-ness follow §10.4 of the
 * intake questionnaire exactly — the asterisked ones there are required here.
 */
export type Enquiry = {
  name: string
  email: string
  phone: string
  product: string
  destination: string
  quantity: string
  targetPrice: string
  message: string
}

export type FieldErrors = Partial<Record<keyof Enquiry, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function clean(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

/**
 * Server-side validation. The browser does its own, but a form post can be
 * replayed with anything, so nothing is trusted here.
 */
export function parseEnquiry(input: unknown): {
  data: Enquiry
  errors: FieldErrors
} {
  const raw = (input ?? {}) as Record<string, unknown>

  const data: Enquiry = {
    name: clean(raw.name, 120),
    email: clean(raw.email, 200),
    phone: clean(raw.phone, 60),
    product: clean(raw.product, 120),
    destination: clean(raw.destination, 160),
    quantity: clean(raw.quantity, 120),
    targetPrice: clean(raw.targetPrice, 120),
    message: clean(raw.message, 4000),
  }

  const errors: FieldErrors = {}
  if (!data.email) errors.email = 'A work email is required.'
  else if (!EMAIL_RE.test(data.email)) errors.email = 'That email address does not look right.'
  if (!data.phone) errors.phone = 'A phone or WhatsApp number is required.'
  if (!data.product) errors.product = 'Please choose the product you need.'
  if (!data.destination) errors.destination = 'A destination port or country is required.'

  return { data, errors }
}

const line = (label: string, value: string) => (value ? `${label}: ${value}\n` : '')

/** Plain text — trade desks forward these into email threads and CRMs. */
export function enquiryNotificationText(data: Enquiry) {
  return (
    `New export enquiry from ${siteConfig.url}\n\n` +
    line('Name', data.name) +
    line('Email', data.email) +
    line('Phone / WhatsApp', data.phone) +
    line('Product required', data.product) +
    line('Destination port', data.destination) +
    line('Quantity', data.quantity) +
    line('Target price', data.targetPrice) +
    (data.message ? `\nMessage:\n${data.message}\n` : '')
  )
}

/**
 * The automatic acknowledgement §10.4 asks for. The questionnaire flags the
 * time-zone problem explicitly: an enquiry arriving overnight from the Americas
 * would otherwise sit unanswered until morning IST with no signal it landed.
 */
export function enquiryAckText(data: Enquiry) {
  const greeting = data.name ? `Dear ${data.name},` : 'Hello,'
  return (
    `${greeting}\n\n` +
    `Thank you for your enquiry to ${siteConfig.brandName}. This is an automatic ` +
    `acknowledgement to confirm it reached us.\n\n` +
    `A member of our trade desk will reply within one business day. Our hours are ` +
    `${siteConfig.hours}, so if you wrote to us overnight we will come back to you ` +
    `in the morning IST.\n\n` +
    `What we received:\n` +
    line('Product required', data.product) +
    line('Destination port', data.destination) +
    line('Quantity', data.quantity) +
    `\nIf it is urgent, call or message us on ${siteConfig.phone}.\n\n` +
    `${siteConfig.brandName}\n${siteConfig.tagline}\n${siteConfig.legalName}\n`
  )
}
