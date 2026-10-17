import type { Metadata } from 'next'
import './globals.css'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { LenisProvider } from '@/components/layout/LenisProvider'
import { getSiteSettings } from '@/sanity/fetch'

export const revalidate = 300 // Revalidate layout every 5 minutes

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const title = settings?.seoTitle || 'Pranav P S — Full-Stack Developer & Product Builder'
  const description =
    settings?.seoDescription ||
    'Software developer, full-stack engineer, and product architect from Kerala, India. Building resilient systems, distributed software, and intuitive user experiences.'

  return {
    title: {
      default: title,
      template: '%s | Pranav P S',
    },
    description,
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
    authors: [{ name: 'Pranav P S', url: 'https://pranavwright.com' }],
    creator: 'Pranav P S',
    metadataBase: new URL('https://pranavwright.com'),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_US',
      url: 'https://pranavwright.com',
      siteName: 'Pranav P S Portfolio',
      images: [
        {
          url: '/opengraph-image.png',
          width: 1200,
          height: 630,
          alt: 'Pranav P S — Full-Stack Developer & Product Builder',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@pranav_wright',
      images: ['/opengraph-image.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      shortcut: '/favicon.ico',
    },
    manifest: '/site.webmanifest',
    verification: {
      google: 'iTJSpHmrrm5pwboorqL8Abf2tzkMTTx8WmsEDiBG5CU',
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSiteSettings()
  const name = settings?.name || 'Pranav P S'
  const email = settings?.email || process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'pranavwright@gmail.com'
  const description =
    settings?.seoDescription ||
    'Software developer, full-stack engineer, and product architect from Kerala, India.'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://pranavwright.com/#person',
        name: 'Pranav P S',
        alternateName: ['Pranav Wright', 'pranavwright'],
        url: 'https://pranavwright.com',
        image: 'https://pranavwright.com/pranav/profile-about.jpg',
        jobTitle: 'Full-Stack Developer & Product Builder',
        description,
        address: {
          '@type': 'PostalAddress',
          addressRegion: 'Kerala',
          addressCountry: 'IN',
        },
        sameAs: [
          'https://github.com/pranavwright',
          'https://linkedin.com/in/Pranav-wright',
          'https://x.com/pranav_wright',
          'https://instagram.com/pranav.wright',
        ],
        knowsAbout: [
          'Next.js',
          'React',
          'TypeScript',
          'Node.js',
          'Distributed Systems',
          'CRDTs',
          'PostgreSQL',
          'Sanity CMS',
          'Cloudflare',
          'UI/UX Design',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://pranavwright.com/#website',
        url: 'https://pranavwright.com',
        name: 'Pranav P S Portfolio',
        description,
        publisher: {
          '@id': 'https://pranavwright.com/#person',
        },
      },
    ],
  }

  return (
    <html lang="en" data-theme="light">
      <body className="min-h-screen bg-background text-foreground flex flex-col justify-between relative selection:bg-primary selection:text-primary-foreground font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[100] px-4 py-2 bg-primary text-primary-foreground rounded-full shadow-lg text-sm font-semibold"
        >
          Skip to main content
        </a>
        <LenisProvider>
          <SiteHeader name={name} email={email} />
          <main id="main-content" className="flex-grow">
            {children}
          </main>
          <SiteFooter
            name={name}
            email={email}
            githubUrl={settings?.githubUrl || 'https://github.com/pranavwright'}
            linkedinUrl={settings?.linkedinUrl || 'https://linkedin.com/in/Pranav-wright'}
            instagramUrl={settings?.instagramUrl || 'https://instagram.com/pranav.wright'}
            twitterUrl={settings?.twitterUrl || 'https://x.com/pranav_wright'}
          />
        </LenisProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
