/**
 * Centralized Site Configuration (SITE)
 * ----------------------------------------------------
 * To personalize this portfolio for another developer:
 * Simply clone the repo and update the constants below.
 * Everything across SEO, AEO (Answer Engine Optimization),
 * metadata, schema.org graphs, navigation, and contact forms
 * will automatically update.
 */

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pranavwright.com'

export const SITE = {
  // Core Identity
  name: 'Pranav P S',
  shortName: 'Pranav',
  legalName: 'Pranav P S',
  alternateNames: ['Pranav Wright', 'pranavwright'],
  role: 'Full-Stack Developer & Product Builder',
  roles: [
    'Software Developer',
    'Full-Stack Developer',
    'Product Builder',
    'Web Designer',
    'Technology Entrepreneur',
  ],
  headline: 'I architect scalable web systems, craft tactile user interfaces, and build fast with modern frameworks.',
  bio: 'Software developer, full-stack engineer, and product architect from Kerala, India. Building resilient systems, distributed software, and intuitive user experiences.',

  // URLs & Domains
  url: baseUrl,
  domain: baseUrl.replace(/^https?:\/\//, ''),

  // Contact & Inquiries
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'wrightpranav@gmail.com',
  contact: {
    headline: 'Have an idea worth building?',
    subtext:
      "I'm interested in building useful products, solving interesting technical problems, and collaborating with people who want to turn ideas into reality.",
  },
  location: {
    city: 'Trivandrum',
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
    resumePdf: '/pranav.pdf',
    resumeFileName: 'Pranav_PS_Resume.pdf',
  },

  // SEO & OpenGraph Defaults
  seo: {
    title: 'Pranav P S — Full-Stack Developer & Product Builder',
    titleTemplate: '%s | Pranav P S',
    description:
      'Software developer, full-stack engineer, and product architect from Kerala, India. Building resilient systems, distributed software, and intuitive user experiences.',
    keywords: [
      'Pranav P S',
      'Pranav Wright',
      'Full-Stack Developer',
      'Software Engineer',
      'Systems Architect',
      'Next.js 14',
      'React',
      'TypeScript',
      'Node.js',
      'Distributed Systems',
      'CRDTs',
      'Kerala Developer',
      'Portfolio',
    ],
    locale: 'en_US',
    siteName: 'Pranav P S Portfolio',
    googleVerification: 'iTJSpHmrrm5pwboorqL8Abf2tzkMTTx8WmsEDiBG5CU',
  },

  // AEO (Answer Engine Optimization) & Semantic Entity Graph
  // (Skills, experience, education, and achievements are fetched dynamically from Sanity CMS)
  aeo: {
    personType: 'Person',
    entityId: `${baseUrl}/#person`,
    websiteId: `${baseUrl}/#website`,
    jobTitle: 'Full-Stack Developer & Systems Architect',
    aiSummary:
      'Pranav P S (also known as Pranav Wright) is a software engineer, full-stack developer, and product builder based in Kerala, India, specializing in Next.js, distributed backends, TypeScript, CRDT-based real-time systems, and high-performance interactive interfaces.',
  },
} as const

export type SiteConfig = typeof SITE
