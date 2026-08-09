/**
 * Single source of truth for every business fact on the site.
 *
 * Everything here is taken either from the previous site copy or from the
 * client's completed intake questionnaire (data/MVP-Exim-Intake-*.docx).
 * Nothing is invented. Where the questionnaire says "TBD", "Not yet" or is
 * blank, the fact is simply absent rather than guessed at.
 *
 * Deliberately NOT published, per the client's answer to "Which of these may we
 * publish?" ("IEC (in process)"): PAN, TAN, and the AD bank name.
 */

export const siteConfig = {
  legalName: 'MVP EXIM (OPC) PRIVATE LIMITED',
  brandName: 'MVP EXIM',
  tagline: 'Our World, Your Product',
  /** From the questionnaire: "What does MVP stand for?" */
  nameMeaning: 'Most Valuable Product',
  entityType: 'One Person Company (Pvt Ltd)',
  incorporated: 'July 2026',
  exporterType: 'Merchant exporter',
  cin: 'U46909KA2026OPC224202',
  iec: 'In process',
  gstin: 'Not yet registered',
  phone: '+91 79759 08063',
  phoneHref: 'tel:+917975908063',
  whatsappHref: 'https://wa.me/917975908063',
  email: 'mvpimpex@gmail.com',
  address: {
    line1: '917, 3rd Cross Rd, HRBR Layout 1st Block',
    line2: 'Kalyananagar, Bangalore North',
    city: 'Bangalore',
    state: 'Karnataka',
    pin: '560043',
    country: 'India',
    mapsQuery: '2J9X+CG Bengaluru, Karnataka',
  },
  hours: '9:00 AM – 9:00 PM IST',
  languages: ['English', 'Hindi'],
  /** Used as the metadataBase and in JSON-LD. Update at launch. */
  url: 'https://mvpexim.com',
}

export const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Global Reach', href: '/global-reach' },
  { label: 'Why Us', href: '/why-us' },
  { label: 'Contact', href: '/contact' },
]

/** Section 5.2 of the intake questionnaire, lightly edited for the page. */
export const story = {
  opening:
    'With the world becoming increasingly flat and a rapidly expanding middle class connected by the internet, quality products from anywhere can now reach anyone. Trade, at its heart, is a human business — people with needs, and people who can meet them.',
  origin:
    'Our story began with a partnership with AVS Exim, exporting semi-husked coconut from Pollachi, Tamil Nadu, to Dubai, UAE. Now, as social media and influencer marketing open new markets for a far wider range of products, we see an exciting opportunity to capture that moment — and to showcase the best produce of India to the world.',
  missionVision:
    'To bring the best quality products to your hands, and to showcase the best produce of India to the world.',
  pullQuote:
    'Our goal is to place in-demand quality products into your hands, on time, at the best possible price.',
}

export const founder = {
  name: 'Nikhil',
  role: 'Founder, MVP Exim',
  bio: 'An accomplished IT professional with work experience across the US and India, and a background in Chemical & Materials Science Engineering. Ever curious about how products end up on supermarket shelves, Nikhil set out to understand the entire supply chain behind global trade. Today, he is focused on connecting buyers and sellers on a global stage — procuring unique, quality products for the world’s most discerning customers.',
}

/**
 * How MVP Exim actually operates. The questionnaire records no warehouse, no
 * processing unit, no cold storage and no overseas office — so the site says
 * plainly that it is a merchant exporter sourcing from vetted producers,
 * rather than implying infrastructure that does not exist.
 */
export const operatingModel = {
  title: 'A merchant exporter, and straightforward about it',
  detail:
    'We do not own farms, processing units or warehouses. We source from vetted producers, verify the grade against what was agreed, and handle the export end to end — documentation, compliance and loading. Our ambition is to grow from merchant exporter into a full trading house as our product range widens.',
}

export const values = [
  {
    title: 'Consistent Quality',
    detail: 'Consistency is our trademark — every shipment matches the last.',
  },
  {
    title: 'Documentation Done Right',
    detail: 'Time is limited, we detest rework — paperwork is right the first time.',
  },
  {
    title: 'Honest Specification',
    detail: 'What you see is what you get. We do not oversell a grade.',
  },
  {
    title: 'Full Regulatory Compliance',
    detail: 'We adhere to the laws of both origin and destination countries.',
  },
  {
    title: 'Fair Dealing',
    detail: 'Transparency with growers, suppliers and buyers is our cornerstone.',
  },
]

export const differentiators = [
  {
    title: 'Radical Transparency',
    detail: 'Clear specifications, clear pricing, no surprises after the container sails.',
  },
  {
    title: 'Ease of Doing Business',
    detail: 'Simple, responsive processes built for buyers who value their time.',
  },
  {
    title: 'Responsible & Accountable',
    detail: 'We stand behind every consignment we ship, from loading to delivery.',
  },
  {
    title: 'Open Communication',
    detail: 'Direct access to the people handling your order, across time zones.',
  },
]

export type Product = {
  id: string
  slug: string
  name: string
  tagline: string
  image: string
  imageAlt: string
  imageLabel: string
  status: 'available' | 'coming-soon'
  /** Only `available` lines have a detail route. */
  detailPage: boolean
  intro?: string
  specs: { label: string; value: string }[]
  markets: string[]
  certifications?: string[]
  incoterms?: string[]
}

export const products: Product[] = [
  {
    id: 'coconut',
    slug: 'semi-husked-coconut',
    name: 'Semi-Husked Coconut',
    tagline:
      'Biscuit-colour grade, sourced fresh from Tamil Nadu, available all year round.',
    image: '/images/product-coconut.png',
    imageAlt:
      'Semi-husked coconuts in biscuit-colour grade, stacked in 12.5 kg mesh bags ready for container loading',
    imageLabel: 'Semi-husked coconut in mesh bags',
    status: 'available',
    detailPage: true,
    intro:
      'Semi-husked coconut is our flagship line and the commodity we started with. We source from growers around Pollachi in Tamil Nadu, grade to biscuit colour, and load 14 MT into a 40ft container. Supply runs all year — there is no closed season to work around.',
    specs: [
      { label: 'HS Code', value: '0801 19 10' },
      { label: 'Grade', value: 'Biscuit colour' },
      { label: 'Packing', value: '12.5 kg mesh bag' },
      { label: 'Container Loading', value: '40ft · 14 MT' },
      { label: 'Minimum Order', value: '1 container' },
      { label: 'Monthly Capacity', value: '3 containers' },
      { label: 'Origin', value: 'Pollachi, Tamil Nadu' },
      { label: 'Seasonality', value: 'Available all year' },
      { label: 'Certification', value: 'Phytosanitary' },
    ],
    markets: ['United Arab Emirates', 'United States', 'China'],
    certifications: ['Phytosanitary'],
    incoterms: ['EXW', 'FOB', 'CIF', 'DDP'],
  },
  {
    id: 'textiles',
    slug: 'textiles-yarn-garments',
    name: 'Textiles, Yarn & Garments',
    tagline: 'Cotton yarn and finished garments — a new line we are actively building out.',
    image: '/images/product-textiles.png',
    imageAlt: 'Rolls of cotton yarn and folded finished garments in an Indian textile facility',
    imageLabel: 'Cotton yarn and garments',
    status: 'coming-soon',
    detailPage: false,
    specs: [],
    markets: [],
  },
  {
    id: 'leather',
    slug: 'leather-footwear',
    name: 'Leather & Footwear',
    tagline: 'Finished leather and footwear sourced from vetted Indian producers.',
    image: '/images/product-leather.png',
    imageAlt: 'Finished leather hides and manufactured footwear at an Indian tannery workshop',
    imageLabel: 'Finished leather and footwear',
    status: 'coming-soon',
    detailPage: false,
    specs: [],
    markets: [],
  },
  {
    id: 'plastics',
    slug: 'plastics-polymers',
    name: 'Plastics & Polymers',
    tagline: 'Industrial-grade polymers and plastic raw materials for export.',
    image: '/images/product-plastics.png',
    imageAlt: 'Industrial polymer granules in bulk sacks at a plastics processing plant',
    imageLabel: 'Polymer granules in bulk',
    status: 'coming-soon',
    detailPage: false,
    specs: [],
    markets: [],
  },
]

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug)
}

export const ports = [
  { name: 'JNPT', type: 'Sea Port', region: 'Nhava Sheva, Maharashtra' },
  { name: 'Mundra', type: 'Sea Port', region: 'Kutch, Gujarat' },
  { name: 'Cochin', type: 'Sea Port', region: 'Kochi, Kerala' },
]

export const markets = ['United Arab Emirates', 'United States', 'China']

export const incoterms = ['EXW', 'FOB', 'CIF', 'DDP']

export const CONTACT_INFO = {
  email: siteConfig.email,
  phone: siteConfig.phone,
  address: `${siteConfig.address.line1}, ${siteConfig.address.line2}, ${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.pin}`,
}

export const PRODUCT_CATEGORIES = [
  'Semi-Husked Coconut',
  'Textiles, Yarn & Garments',
  'Leather & Footwear',
  'Plastics & Polymers',
  'Other / Not Listed',
]

export const TRADE_TERMS = [
  {
    tag: 'Terms',
    label: 'Incoterms',
    detail:
      'We quote on EXW, FOB, CIF or DDP — you choose the level of responsibility that suits your operation.',
  },
  {
    tag: 'MOQ',
    label: 'Minimum Order',
    detail:
      'Standard minimum order is one 40ft container (approx. 14 MT) per product line.',
  },
  {
    tag: 'Payment',
    label: 'Payment Terms',
    detail:
      'Advance payment or Letter of Credit against pre-shipment inspection, negotiated per order.',
  },
  {
    tag: 'Docs',
    label: 'Documentation',
    detail:
      'Commercial invoice, packing list, bill of lading and phytosanitary certificate provided with every shipment.',
  },
]

export const milestones = [
  {
    date: 'Jul 2026',
    title: 'MVP Exim Incorporated',
    detail: 'Registered as a One Person Company in Bengaluru, Karnataka.',
  },
  {
    date: '08 Aug 2026',
    title: 'First Export Consignment',
    detail: 'A 14 MT container of semi-husked coconut shipped to Dubai, UAE.',
  },
]

export const homeStats = [
  { value: '2026', label: 'Exporting Since' },
  { value: '3', label: 'Ports of Loading' },
  { value: '14 MT', label: 'First Container Shipped' },
]
