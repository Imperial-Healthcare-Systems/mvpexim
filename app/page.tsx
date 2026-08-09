import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { AboutSection } from "@/components/about-section"
import { FounderValuesSection } from "@/components/founder-values-section"
import { ProductsSection } from "@/components/products-section"
import { MarketsSection } from "@/components/markets-section"
import { WhyUsSection } from "@/components/why-us-section"
import { TradeTermsSection } from "@/components/trade-terms-section"
import { ContactSection } from "@/components/contact-section"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <AboutSection />
        <FounderValuesSection />
        <ProductsSection />
        <MarketsSection />
        <WhyUsSection />
        <TradeTermsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}
