import type { Metadata } from 'next'
import './globals.css'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { getSiteSettings } from '@/sanity/fetch'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const title = settings?.seoTitle || 'Pranav Wright — Developer, Product Builder & Designer'
  const description =
    settings?.seoDescription ||
    'Software developer, full-stack engineer, and product builder from Kerala, India. Building practical software, web applications, and intuitive user experiences.'

  return {
    title: {
      default: title,
      template: '%s | Pranav Wright',
    },
    description,
    metadataBase: new URL('https://pranavwright.com'),
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_US',
      url: 'https://pranavwright.com',
      siteName: 'Pranav Wright Portfolio',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@pranav_wright',
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: '/icon.png',
      apple: '/icon.png',
    },
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

  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-background text-text-primary selection:bg-accent selection:text-background flex flex-col justify-between">
        <Navigation
          name={settings?.name || 'Pranav Wright'}
          githubUrl={settings?.githubUrl || 'https://github.com/pranavwright'}
        />
        <main className="flex-grow">{children}</main>
        <Footer
          name={settings?.name || 'Pranav Wright'}
          email={settings?.email || process.env.NEXT_PUBLIC_CONTACT_EMAIL || ''}
          githubUrl={settings?.githubUrl || 'https://github.com/pranavwright'}
          linkedinUrl={settings?.linkedinUrl || 'https://linkedin.com/in/Pranav-wright'}
          instagramUrl={settings?.instagramUrl || 'https://instagram.com/pranav.wright'}
          twitterUrl={settings?.twitterUrl || 'https://x.com/pranav_wright'}
        />
      </body>
    </html>
  )
}
