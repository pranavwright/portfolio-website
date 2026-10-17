import React from 'react'
import type { Metadata } from 'next'
import { Mail, MapPin, ArrowUpRight, Clock, ShieldCheck } from 'lucide-react'
import { ContactForm } from '@/components/contact/ContactForm'
import { getSiteSettings } from '@/sanity/fetch'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Contact — Pranav P S',
  description:
    'Get in touch with Pranav P S: discuss full-stack engineering, systems architecture, contracts, or technical collaboration.',
}

export default async function ContactPage() {
  const settings = await getSiteSettings()
  const email = settings?.email || 'pranavwright@gmail.com'
  const name = settings?.name || 'Pranav P S'

  const profiles = [
    { label: 'GitHub', href: settings?.githubUrl || 'https://github.com/pranavwright' },
    { label: 'LinkedIn', href: settings?.linkedinUrl || 'https://linkedin.com/in/Pranav-wright' },
    { label: 'X (Twitter)', href: settings?.twitterUrl || 'https://x.com/pranav_wright' },
    { label: 'Instagram', href: settings?.instagramUrl || 'https://instagram.com/pranav.wright' },
  ]

  return (
    <div className="pt-[calc(var(--header-height)+clamp(2rem,8vh,5rem))] pb-[clamp(5rem,14vh,10rem)]">
      <div className="px-5 md:px-10 max-w-7xl mx-auto space-y-16">
        {/* Editorial Page Header */}
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <span className="size-2 rounded-full bg-primary animate-pulse" />
            <span>Open for collaboration</span>
          </div>
          <h1 className="display text-[clamp(3.5rem,9.5vw,8rem)] leading-[0.86] text-foreground">
            Let’s build something enduring.
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Have a complex engineering challenge, an ambitious product to launch, or want to explore collaboration? Send a note below or reach out directly.
          </p>
        </div>

        {/* 2-Column Split: Details & Form */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column: Direct Reach & Channels */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-6">
              <h2 className="text-xl font-bold tracking-tight text-foreground border-b border-border pb-4">
                Direct Channels
              </h2>

              <div className="space-y-5">
                <a
                  href={`mailto:${email}`}
                  className="group flex items-start gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
                >
                  <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Direct Email</p>
                    <p className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                      {email}
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card">
                  <div className="size-10 rounded-full bg-muted text-foreground flex items-center justify-center shrink-0">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Location &amp; Timezone</p>
                    <p className="text-base font-semibold text-foreground">
                      Kerala, India · IST (UTC+5:30)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card">
                  <div className="size-10 rounded-full bg-muted text-foreground flex items-center justify-center shrink-0">
                    <Clock className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Response Expectation</p>
                    <p className="text-base font-semibold text-foreground">
                      Replies typically within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Network Profiles */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Profiles &amp; Code
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {profiles.map((p) => (
                  <a
                    key={p.label}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:border-primary/50 hover:text-primary transition-colors"
                  >
                    {p.label}
                    <ArrowUpRight className="size-3.5 opacity-70" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <ContactForm recipientEmail={email} />
          </div>
        </div>
      </div>
    </div>
  )
}
