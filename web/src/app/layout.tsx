import type { Metadata } from 'next'
import './globals.css'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { LenisProvider } from '@/components/layout/LenisProvider'
import { LoadingScreen } from '@/components/layout/LoadingScreen'
import { SITE } from '@/lib/site'
import { getSkills, getProfile } from '@/sanity/fetch'
import { urlForImage } from '@/sanity/image'

export const revalidate = 300 // Revalidate layout every 5 minutes

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile().catch(() => null)
  const title = SITE.seo.title
  const description = SITE.seo.description

  const ogUrl =
    (profile?.avatar ? urlForImage(profile.avatar)?.width(1200).height(630).fit('crop').url() : null) ||
    SITE.logo.ogImage

  const ogAlt =
    profile?.avatar?.alt ||
    `${SITE.name} — ${SITE.headline || SITE.role}`

  return {
    title: {
      default: title,
      template: SITE.seo.titleTemplate,
    },
    description,
    keywords: [...SITE.seo.keywords],
    authors: [{ name: SITE.name, url: SITE.url }],
    creator: SITE.name,
    metadataBase: new URL(SITE.url),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: SITE.seo.locale,
      url: SITE.url,
      siteName: SITE.seo.siteName,
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
          alt: ogAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: SITE.socials.twitterHandle,
      images: [ogUrl],
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
      shortcut: SITE.logo.favicon,
    },
    manifest: '/site.webmanifest',
    verification: {
      google: SITE.seo.googleVerification,
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sanitySkills, profile] = await Promise.all([
    getSkills(),
    getProfile().catch(() => null),
  ])
  const skillNames = sanitySkills.map((s) => s.name)

  const avatarUrl =
    (profile?.avatar ? urlForImage(profile.avatar)?.width(1200).height(1200).fit('crop').url() : null) ||
    `${SITE.url}${SITE.logo.avatar}`

  const avatarAlt = profile?.avatar?.alt || `${SITE.name} — ${SITE.headline || SITE.role}`
  const avatarCaption = profile?.avatar?.caption || SITE.aeo.aiSummary

  const imageObject = {
    '@type': 'ImageObject',
    '@id': `${SITE.url}/#primaryimage`,
    url: avatarUrl,
    contentUrl: avatarUrl,
    caption: avatarCaption,
    description: avatarAlt,
    representativeOfPage: true,
    author: {
      '@type': 'Person',
      name: SITE.name,
    },
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': SITE.aeo.personType,
        '@id': SITE.aeo.entityId,
        name: SITE.name,
        givenName: 'Pranav',
        familyName: 'Wright',
        additionalName: 'P S',
        legalName: SITE.legalName,
        alternateName: [...SITE.alternateNames],
        url: SITE.url,
        image: imageObject,
        jobTitle: SITE.role || SITE.roles[0] || SITE.aeo.jobTitle,
        description: SITE.seo.description,
        disambiguatingDescription: SITE.aeo.aiSummary,
        address: {
          '@type': 'PostalAddress',
          addressRegion: SITE.location.region,
          addressCountry: SITE.location.countryCode,
        },
        sameAs: [
          SITE.socials.github,
          SITE.socials.linkedin,
          SITE.socials.twitter,
          SITE.socials.instagram,
        ],
        knowsAbout: skillNames,
      },
      {
        '@type': 'ProfilePage',
        '@id': `${SITE.url}/#profilepage`,
        url: SITE.url,
        name: `${SITE.name} — Developer Profile`,
        primaryImageOfPage: {
          '@id': `${SITE.url}/#primaryimage`,
        },
        mainEntity: {
          '@id': SITE.aeo.entityId,
        },
      },
      {
        '@type': 'WebSite',
        '@id': SITE.aeo.websiteId,
        url: SITE.url,
        name: `${SITE.name} Portfolio`,
        description: SITE.seo.description,
        inLanguage: 'en-US',
        publisher: {
          '@id': SITE.aeo.entityId,
        },
      },
    ],
  }


  return (
    <html lang="en" data-theme="light">
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Context (llms.txt)" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="Full LLM Context (llms-full.txt)" />
        <meta name="ai-content-declaration" content="unconditioned" />
      </head>
      <body className="min-h-screen bg-background text-foreground flex flex-col justify-between relative selection:bg-primary selection:text-primary-foreground font-sans">
        <LoadingScreen />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[100] px-4 py-2 bg-primary text-primary-foreground rounded-full shadow-lg text-sm font-semibold"
        >
          Skip to main content
        </a>
        <LenisProvider>
          <SiteHeader name={SITE.name} email={SITE.email} />
          <main id="main-content" className="flex-grow">
            {children}
          </main>
          <SiteFooter
            name={SITE.name}
            email={SITE.email}
            githubUrl={SITE.socials.github}
            linkedinUrl={SITE.socials.linkedin}
            instagramUrl={SITE.socials.instagram}
            twitterUrl={SITE.socials.twitter}
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
