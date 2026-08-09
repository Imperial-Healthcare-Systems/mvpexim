import Image from "next/image"
import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { navLinks, siteConfig, CONTACT_INFO } from "@/lib/site-data"

export function SiteFooter() {
  return (
    <footer className="bg-primary pt-16 pb-8 text-primary-foreground">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MVP%20Icon_PNG-srEJbscZkqlG647BYUmi4FPRWhbHKn.png"
                alt=""
                width={36}
                height={36}
                className="size-9"
              />
              <span className="font-serif text-lg font-medium">
                {siteConfig.brandName}
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-foreground/60">
              {siteConfig.tagline} — an Indian export house shipping
              agricultural commodities and industrial goods to buyers across
              the globe.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide uppercase text-primary-foreground/50">
              Navigate
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/75 transition-colors hover:text-highlight"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide uppercase text-primary-foreground/50">
              Contact
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li className="flex items-start gap-2 text-sm text-primary-foreground/75">
                <Mail className="mt-0.5 size-4 shrink-0 text-highlight" />
                <span>{CONTACT_INFO.email}</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-primary-foreground/75">
                <Phone className="mt-0.5 size-4 shrink-0 text-highlight" />
                <span>{CONTACT_INFO.phone}</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-primary-foreground/75">
                <MapPin className="mt-0.5 size-4 shrink-0 text-highlight" />
                <span>{CONTACT_INFO.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-primary-foreground/10" />

        <div className="flex flex-col gap-3 text-xs text-primary-foreground/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights
            reserved.
          </p>
          <p>CIN: {siteConfig.cin}</p>
        </div>
      </div>
    </footer>
  )
}
