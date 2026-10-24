/**
 * Centralized Site Configuration (SITE)
 * ----------------------------------------------------
 * To personalize this portfolio for another developer:
 * Simply clone the repo and update the constants below.
 * Everything across SEO, AEO (Answer Engine Optimization),
 * metadata, schema.org graphs, navigation, and contact forms
 * will automatically update.
 */

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || ''

export const SITE = {
  // Core Identity
  name: 'Pranav Wright',
  shortName: 'Pranav',
  legalName: 'Pranav P S',
  alternateNames: ['Pranav P S', 'Pranav PS', 'pranavwright', 'Pranav Wright (Pranav P S)'],
  role: 'Full-Stack Developer & Team Lead',
  roles: [
    'Full-Stack Developer',
    'Team Lead',
    'Backend Engineer',
    'Product Builder',
    'Mobile Developer',
    'Technology Entrepreneur',
  ],
  headline: 'I architect scalable web systems, craft tactile user interfaces, and build fast with modern frameworks.',
  bio: 'Full-stack developer and team lead experienced in building scalable web and mobile applications using Node.js (Fastify/Express), React/Next.js, React Native, and MongoDB. Led backend and product strategy for RealSQ.',

  // URLs & Domains
  url: baseUrl,
  domain: baseUrl.replace(/^https?:\/\//, ''),

  // Contact & Inquiries
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'pranav@nowme.live',
  phone: '+91 9048070151',
  contact: {
    headline: 'Have an idea worth building?',
    subtext:
      "I'm interested in building useful products, solving interesting technical problems, and collaborating with people who want to turn ideas into reality.",
  },
  location: {
    city: 'Thiruvananthapuram',
    region: 'Kerala',
    country: 'India',
    countryCode: 'IN',
  },

  // Social Profiles
  socials: {
    github: 'https://github.com/pranavwright',
    linkedin: 'https://linkedin.com/in/Pranav-wright',
    twitter: 'https://x.com/pranav_wright',
    twitterHandle: '@pranav_wright',
    instagram: 'https://instagram.com/pranav.wright',
  },

  // Assets & Branding
  logo: {
    avatar: '/pranav/profile-about.jpg',
    ogImage: '/opengraph-image.png',
    favicon: '/favicon.ico',
    resumePdf: '/Pranav_PS.pdf',
    resumeFileName: 'Pranav_Wright_Resume.pdf',
  },

  // SEO & OpenGraph Defaults
  seo: {
    title: 'Pranav Wright — Full-Stack Developer & Product Builder',
    titleTemplate: '%s | Pranav Wright',
    description:
      'Pranav Wright (Pranav P S) is a software developer, full-stack engineer, and product architect from Kerala, India. Building resilient systems, distributed software, and intuitive user experiences.',
    keywords: [
      'Pranav Wright',
      'pranavwright',
      'Pranav Wright developer',
      'Pranav Wright portfolio',
      'Pranav Wright Kerala',
      'Pranav P S',
      'Pranav PS',
      'Full-Stack Developer',
      'Software Engineer',
      'Systems Architect',
      'Next.js',
      'React',
      'TypeScript',
      'Node.js',
      'Distributed Systems',
      'CRDTs',
      'Kerala Developer',
      'Portfolio',
    ],
    locale: 'en_US',
    siteName: 'Pranav Wright Portfolio',
    googleVerification: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },

  // AEO (Answer Engine Optimization) & Semantic Entity Graph
  // (Skills, experience, education, and achievements are fetched dynamically from Sanity CMS)
  aeo: {
    personType: 'Person',
    entityId: `${baseUrl}/#person`,
    websiteId: `${baseUrl}/#website`,
    jobTitle: 'Full-Stack Developer & Systems Architect',
    aiSummary:
      'Pranav Wright (legal name Pranav P S) is a software engineer, full-stack developer, and product builder based in Kerala, India, specializing in Next.js, distributed backends, TypeScript, CRDT-based real-time systems, and high-performance interactive interfaces.',
  },
} as const

export type SiteConfig = typeof SITE
