import { NextResponse } from 'next/server'

import {
  enquiryAckText,
  enquiryNotificationText,
  parseEnquiry,
  type Enquiry,
} from '@/lib/enquiry'
import { siteConfig } from '@/lib/site-data'

export const runtime = 'nodejs'
/** Never cached — this route has side effects. */
export const dynamic = 'force-dynamic'

const RESEND_ENDPOINT = 'https://api.resend.com/emails'

/**
 * Best-effort rate limit. This lives in module memory, so it resets on cold
 * start and is per-instance rather than global — enough to stop a bot hammering
 * one warm instance, not a substitute for a real limiter (Upstash, Vercel KV)
 * if abuse becomes a problem.
 */
const WINDOW_MS = 60 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > MAX_PER_WINDOW
}

async function sendEmail(payload: {
  from: string
  to: string
  subject: string
  text: string
  replyTo?: string
}) {
  const res = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: payload.from,
      to: [payload.to],
      subject: payload.subject,
      text: payload.text,
      ...(payload.replyTo ? { reply_to: payload.replyTo } : {}),
    }),
  })

  if (!res.ok) {
    throw new Error(`Resend responded ${res.status}: ${await res.text()}`)
  }
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  // Honeypot: a field hidden from humans. Anything that fills it is a bot, and
  // we return a plausible success so it does not learn to try again.
  if (typeof (body as Record<string, unknown>)?.company_website === 'string' &&
      (body as Record<string, unknown>).company_website !== '') {
    return NextResponse.json({ ok: true })
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 })
  }

  const { data, errors } = parseEnquiry(body)
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, error: 'validation', errors }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.ENQUIRY_FROM_EMAIL
  const to = process.env.ENQUIRY_TO_EMAIL ?? siteConfig.email

  // Not configured: fail loudly rather than showing a success screen for an
  // enquiry that went nowhere. The form turns this into "call or WhatsApp us".
  if (!apiKey || !from) {
    console.error(
      '[enquiry] Delivery is not configured — set RESEND_API_KEY and ENQUIRY_FROM_EMAIL. Enquiry NOT delivered:\n' +
        enquiryNotificationText(data),
    )
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 })
  }

  try {
    await sendEmail({
      from,
      to,
      replyTo: data.email,
      subject: `Export enquiry — ${data.product} to ${data.destination}`,
      text: enquiryNotificationText(data),
    })
  } catch (error) {
    console.error('[enquiry] Failed to deliver to the trade desk:', error)
    return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 })
  }

  // The acknowledgement is secondary: if it fails, the enquiry still reached
  // the desk, so we do not tell the buyer their message was lost.
  try {
    await sendEmail({
      from,
      to: data.email,
      subject: `We received your enquiry — ${siteConfig.brandName}`,
      text: enquiryAckText(data as Enquiry),
    })
  } catch (error) {
    console.error('[enquiry] Delivered, but the acknowledgement failed:', error)
  }

  return NextResponse.json({ ok: true })
}
