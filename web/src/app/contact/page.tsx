import React from 'react'
import type { Metadata } from 'next'
import { Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react'
import { ContactForm } from '@/components/contact/ContactForm'
import { SITE } from '@/lib/site'

export const revalidate = 300

export const metadata: Metadata = {
  title: `Contact — ${SITE.name}`,
  description: `Get in touch with ${SITE.name}: discuss full-stack engineering, systems architecture, contracts, or technical collaboration.`,
}

export default function ContactPage() {
  const email = SITE.email
  const name = SITE.name

  const profiles = [
    { label: 'GitHub', href: SITE.socials.github },
    { label: 'LinkedIn', href: SITE.socials.linkedin },
    { label: 'X (Twitter)', href: SITE.socials.twitter },
    { label: 'Instagram', href: SITE.socials.instagram },
  ]

  return (
    <div className="pt-[calc(var(--header-height)+clamp(2rem,8vh,5rem))] pb-[clamp(5rem,14vh,10rem)]">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Page Header */}
      <section className="px-5 md:px-10">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary mb-6">
          <span className="size-2 rounded-full bg-primary animate-pulse" />
          <span>Open for collaboration</span>
        </div>
        <h1 className="display max-w-[14ch] text-[clamp(3.5rem,9.5vw,8rem)] leading-[0.86] text-foreground">
          {SITE.contact.headline}
        </h1>
        <p className="mt-8 max-w-[48ch] text-[clamp(1.2rem,1.7vw,1.6rem)] leading-snug text-muted-foreground">
          {SITE.contact.subtext}
        </p>
      </section>

      {/* 2-Column Split: Details & Form */}
      <section className="px-5 pt-[clamp(5rem,14vh,9rem)] md:px-10">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8 items-start">
          {/* Left Column: Direct Reach & Channels */}
          <div className="md:col-span-4 space-y-10">
            <div className="space-y-6">
              <h2 className="text-[clamp(1.6rem,2.4vw,2.2rem)] font-bold leading-tight tracking-[-0.025em] [font-stretch:108%] text-foreground">
                Direct Channels
              </h2>

              <div className="space-y-0">
                {/* Email Row */}
                <a
                  href={`mailto:${email}`}
                  className="group grid gap-4 border-t border-border py-6 md:py-8 transition-colors hover:border-primary/40"
                >
                  <div className="flex items-start gap-4">
                    <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Mail className="size-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Direct Email</p>
                      <p className="text-[17px] font-semibold text-foreground group-hover:text-primary transition-colors mt-1">
                        {email}
                      </p>
                    </div>
                  </div>
                </a>

                {/* Location Row */}
                <div className="grid gap-4 border-t border-border py-6 md:py-8">
                  <div className="flex items-start gap-4">
                    <div className="size-10 rounded-full bg-muted text-foreground flex items-center justify-center shrink-0">
                      <MapPin className="size-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Location &amp; Timezone</p>
                      <p className="text-[17px] font-semibold text-foreground mt-1">
                        Kerala, India · IST (UTC+5:30)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Response Row */}
                <div className="grid gap-4 border-t border-border py-6 md:py-8">
                  <div className="flex items-start gap-4">
                    <div className="size-10 rounded-full bg-muted text-foreground flex items-center justify-center shrink-0">
                      <Clock className="size-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Response Expectation</p>
                      <p className="text-[17px] font-semibold text-foreground mt-1">
                        Replies typically within 24 hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Network Profiles */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Profiles &amp; Code
              </h3>
              <div className="flex flex-wrap gap-2">
                {profiles.map((p) => (
                  <a
                    key={p.label}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-[14px] font-medium text-foreground hover:border-primary/50 hover:text-primary transition-colors"
                  >
                    {p.label}
                    <ArrowUpRight aria-hidden="true" className="size-3.5 opacity-70" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="md:col-span-7 md:col-start-6">
            <ContactForm recipientEmail={email} />
          </div>
        </div>
      </section>
      </div>
    </div>
  )
}
