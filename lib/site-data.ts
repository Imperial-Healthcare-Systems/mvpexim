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
  { label: 'Products', href: '/products' },
  { label: 'Quality', href: '/quality' },
  { label: 'Trade Terms', href: '/why-us' },
  { label: 'Global Reach', href: '/global-reach' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

/** Secondary routes — linked in context and from the footer, not the top nav. */
export const secondaryLinks = [
  { label: 'Packaging & Container Loading', href: '/packaging' },
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
    'We own no farms, factories or warehouses. We source from vetted producers, check the grade against what was agreed, and handle the export end to end. The ambition is to grow into a full trading house.',
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
    image: '/images/product-coconut.jpg',
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
    image: '/images/product-textiles.jpg',
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
    image: '/images/product-leather.jpg',
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
    image: '/images/product-plastics.jpg',
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

/**
 * Shown on cards for lines that are planned but not yet confirmed. The intake
 * questionnaire marks textiles, leather and polymers with a "P" (planned) and
 * leaves every specification field as TBD, so there is genuinely nothing to
 * publish yet — this says so plainly rather than leaving a blank card.
 */
export const plannedLineNote =
  'We publish HS code, packing and capacity only once a line is confirmed. Register your interest and we will come to you when it is.'

export const ports = [
  { name: 'JNPT', type: 'Sea Port', region: 'Nhava Sheva, Maharashtra' },
  { name: 'Mundra', type: 'Sea Port', region: 'Kutch, Gujarat' },
  { name: 'Cochin', type: 'Sea Port', region: 'Kochi, Kerala' },
]

/**
 * Questionnaire §7. Note this is the COMPANY-level picture and differs from the
 * product-level answer in §6, which lists UAE/USA/China as the main markets for
 * coconut. §7 lists Africa rather than China as an export destination. Both are
 * reproduced as given rather than reconciled by us.
 */
export const marketReach = {
  exportTo: ['United States', 'United Arab Emirates', 'Africa'],
  strongest: 'United Arab Emirates',
  openingNext: ['European Union'],
  importFrom: ['Australia'],
}

/** Kept for the product-level market list (§6). */
export const markets = marketReach.exportTo

/**
 * §7: "Shipments completed so far — First consignment in progress" and
 * "Target volumes for year one — First year".
 *
 * The questionnaire is explicit that an honest "first consignments in progress"
 * beats an implied track record a buyer can check, and that volume claims will
 * not go on the site. Both are load-bearing: the earlier copy stated the first
 * container HAD shipped, which overstates the position.
 */
export const tradeStatus = {
  shipments: 'First consignment in progress',
  yearOne: 'First year of operation',
}

export const incoterms = ['EXW', 'FOB', 'CIF', 'DDP']

/** §8.1 — every Incoterm quoted on, with the client's default marked 'D'. */
export const incotermsDetail = [
  { code: 'EXW', name: 'Ex Works', isDefault: false },
  { code: 'FOB', name: 'Free On Board', isDefault: false },
  { code: 'CIF', name: 'Cost, Insurance and Freight', isDefault: true },
  { code: 'DDP', name: 'Delivered Duty Paid', isDefault: false },
]

/** §8.2 — exactly the terms ticked. DA and open account were NOT ticked. */
export const paymentTerms = [
  { term: '100% advance TT' },
  { term: 'Partial advance, balance against documents' },
  { term: 'Letter of Credit at sight' },
  { term: 'Usance LC — 30, 60 or 90 days', note: 'Established buyers only' },
  { term: 'Documents against Payment (DP)' },
]

/** §8.3 */
export const operations = [
  { label: 'Lead Time', value: '30–45 days', note: 'From confirmed order to loading' },
  { label: 'Container Types', value: '20ft · 40ft · 40ft HC' },
  { label: 'Invoicing Currencies', value: 'Any major currency' },
  { label: 'Claims Cover', value: 'ECGC backed' },
]

/** §8.3 "Documents you provide" — Certificate of Origin was missing before. */
export const documentsProvided = [
  'Commercial invoice',
  'Packing list',
  'Bill of Lading',
  'Certificate of Origin',
  'Phytosanitary certificate',
]

/** §9 — the only quality answer given; everything else in that section is TBD. */
export const traceability =
  'From source to dispatch, we operate on a single platform with shared, real-time data. The result is end-to-end visibility across the supply chain.'

/**
 * §2 + §9. Only the IEC is publishable per "Which of these may we publish?".
 * Everything else in §9 came back TBD, so the page says what is outstanding
 * rather than implying accreditation that does not exist.
 */
export const compliance = {
  held: [
    { name: 'Phytosanitary certificate', detail: 'Issued per consignment for our coconut line.' },
  ],
  inProgress: [
    { name: 'IEC — Importer-Exporter Code', detail: 'Issued by DGFT. Application in process.' },
  ],
  notHeld:
    'We hold no FSSAI, APEDA, ISO, organic, Halal or Kosher certification, and will not claim otherwise. If your market needs one, tell us at enquiry stage — we will say plainly whether we can arrange it.',
}

/** §6 packing/loading answers, surfaced as their own page per §10.3. */
export const packagingSpec = {
  packing: '12.5 kg mesh bag',
  containerLoading: '40ft container · 14 MT',
  containerTypes: ['20ft', '40ft', '40ft HC'],
  moq: '1 container',
  monthlyCapacity: '3 containers',
}

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
      'We quote on EXW, FOB, CIF or DDP. CIF is our default — you choose the level of responsibility that suits your operation.',
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
      'Advance TT, partial advance against documents, LC at sight, or DP. Usance LC of 30–90 days for established buyers.',
  },
  {
    tag: 'Docs',
    label: 'Documentation',
    detail:
      'Commercial invoice, packing list, Bill of Lading, Certificate of Origin and phytosanitary certificate with every shipment.',
  },
  {
    tag: 'Lead Time',
    label: 'Order to Loading',
    detail:
      '30–45 days from confirmed order to loading. We confirm the sailing window with your quotation.',
  },
  {
    tag: 'Cover',
    label: 'Claims & Disputes',
    detail:
      'Consignments are ECGC backed. The full claims procedure is being formalised and will be published here.',
  },
]

export const milestones = [
  {
    date: 'Jul 2026',
    title: 'MVP Exim Incorporated',
    detail: 'Registered as a One Person Company in Bengaluru, Karnataka.',
  },
  {
    date: 'Aug 2026',
    title: 'First Export Consignment',
    detail:
      'A 14 MT container of semi-husked coconut to Dubai, UAE — currently in progress.',
  },
]

/**
 * No volume or track-record claims: §7 records the first consignment as still
 * in progress and year-one volumes as unknown, and the questionnaire is
 * explicit that volume claims will not be published.
 */
export const homeStats = [
  { value: '2026', label: 'Incorporated in Bengaluru' },
  { value: '3', label: 'Ports of Loading' },
  { value: '30–45', label: 'Days Order to Loading' },
]
