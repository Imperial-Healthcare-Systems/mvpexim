export const siteConfig = {
  legalName: 'MVP EXIM (OPC) PRIVATE LIMITED',
  brandName: 'MVP EXIM',
  tagline: 'Our World, Your Product',
  cin: 'U46909KA2026OPC224202',
  iec: 'In process',
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
    mapsQuery: '2J9X+CG Bengaluru, Karnataka',
  },
  hours: '9:00 AM – 9:00 PM IST',
  languages: ['English', 'Hindi'],
}

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Global Reach', href: '#markets' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Contact', href: '#contact' },
]

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
  name: string
  tagline: string
  image: string
  status: 'available' | 'coming-soon'
  specs: { label: string; value: string }[]
  markets: string[]
}

export const products: Product[] = [
  {
    id: 'coconut',
    name: 'Semi-Husked Coconut',
    tagline: 'Biscuit-colour grade, sourced fresh from Tamil Nadu, available all year round.',
    image: '/images/product-coconut.png',
    status: 'available',
    specs: [
      { label: 'HS Code', value: '0801 19 10' },
      { label: 'Grade', value: 'Biscuit colour' },
      { label: 'Packing', value: '12.5 kg mesh bag' },
      { label: 'Loading', value: '40ft container · 14 MT' },
      { label: 'MOQ', value: '1 container' },
      { label: 'Monthly Capacity', value: '3 containers' },
      { label: 'Origin', value: 'Tamil Nadu, India' },
      { label: 'Certification', value: 'Phytosanitary' },
      { label: 'Incoterms', value: 'EXW · FOB · CIF · DDP' },
    ],
    markets: ['UAE', 'USA', 'China'],
  },
  {
    id: 'textiles',
    name: 'Textiles, Yarn & Garments',
    tagline: 'Cotton yarn and finished garments — a new line we are actively building out.',
    image: '/images/product-textiles.png',
    status: 'coming-soon',
    specs: [],
    markets: [],
  },
  {
    id: 'leather',
    name: 'Leather & Footwear',
    tagline: 'Finished leather and footwear sourced from vetted Indian producers.',
    image: '/images/product-leather.png',
    status: 'coming-soon',
    specs: [],
    markets: [],
  },
  {
    id: 'plastics',
    name: 'Plastics & Polymers',
    tagline: 'Industrial-grade polymers and plastic raw materials for export.',
    image: '/images/product-plastics.png',
    status: 'coming-soon',
    specs: [],
    markets: [],
  },
]

export const ports = [
  { name: 'JNPT', type: 'Sea Port' },
  { name: 'Mundra', type: 'Sea Port' },
  { name: 'Cochin', type: 'Sea Port' },
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
    detail: 'We quote on EXW, FOB, CIF or DDP — you choose the level of responsibility that suits your operation.',
  },
  {
    tag: 'MOQ',
    label: 'Minimum Order',
    detail: 'Standard minimum order is one 40ft container (approx. 14 MT) per product line.',
  },
  {
    tag: 'Payment',
    label: 'Payment Terms',
    detail: 'Advance payment or Letter of Credit against pre-shipment inspection, negotiated per order.',
  },
  {
    tag: 'Docs',
    label: 'Documentation',
    detail: 'Commercial invoice, packing list, bill of lading and phytosanitary certificate provided with every shipment.',
  },
]

export const milestones = [
  {
    date: 'Jul 2026',
    title: 'MVP Exim Incorporated',
    detail: 'Registered as a private limited company in Bengaluru, Karnataka.',
  },
  {
    date: '08 Aug 2026',
    title: 'First Export Consignment',
    detail: 'A 14 MT container of semi-husked coconut shipped to Dubai, UAE.',
  },
]
