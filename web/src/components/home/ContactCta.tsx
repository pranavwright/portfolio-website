'use client'

import React from 'react'
import {Mail, Github, Linkedin, Instagram, Twitter, ArrowUpRight} from 'lucide-react'
import {ContactForm} from '@/components/contact/ContactForm'
import type {SiteSettings} from '@/sanity/types'

interface ContactCtaProps {
  settings?: SiteSettings | null
}

export function ContactCta({settings}: ContactCtaProps) {
  const headline = settings?.contactHeadline || 'Have an idea worth building?'
  const subtext =
    settings?.contactSubtext ||
    "I'm interested in building useful products, solving complex technical problems, and collaborating with founders and engineering teams worldwide."
  const email = settings?.email || process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'wrightpranav@gmail.com'
  const githubUrl = settings?.githubUrl || 'https://github.com/pranavwright'
  const linkedinUrl = settings?.linkedinUrl || 'https://linkedin.com/in/Pranav-wright'
  const instagramUrl = settings?.instagramUrl || 'https://instagram.com/pranav.wright'
  const twitterUrl = settings?.twitterUrl || 'https://x.com/pranav_wright'

  return (
    <section id="contact" className="py-28 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Socials */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span>Contact &amp; Inquiries</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-text-primary tracking-tight uppercase">
                {headline}
              </h2>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                {subtext}
              </p>
            </div>

            {/* Direct Email Card */}
            {email && (
              <div className="p-7 rounded-2xl bg-surface border border-border space-y-3 shadow-xl">
                <div className="text-xs font-mono uppercase tracking-wider text-accent">
                  Direct Inquiries
                </div>
                <a
                  href={`mailto:${email}`}
                  className="group flex items-center justify-between text-base sm:text-lg font-semibold text-text-primary hover:text-accent transition-colors font-mono"
                >
                  <span className="flex items-center gap-2.5 truncate">
                    <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                    <span className="truncate">{email}</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0 text-accent" />
                </a>
                <p className="text-xs text-text-muted leading-relaxed">
                  Open for technical contract roles, high-impact product engineering, and full-stack architecture discussions.
                </p>
              </div>
            )}

            {/* Social Links Matrix */}
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-text-muted">
                Online Profiles
              </div>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border text-xs font-mono text-text-secondary hover:text-text-primary hover:border-accent/40 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                {linkedinUrl && (
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border text-xs font-mono text-text-secondary hover:text-text-primary hover:border-accent/40 transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {twitterUrl && (
                  <a
                    href={twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border text-xs font-mono text-text-secondary hover:text-text-primary hover:border-accent/40 transition-colors"
                  >
                    <Twitter className="w-3.5 h-3.5" />
                    <span>X / Twitter</span>
                  </a>
                )}
                {instagramUrl && (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border text-xs font-mono text-text-secondary hover:text-text-primary hover:border-accent/40 transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>Instagram</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Genuine Formspree Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-2xl bg-surface border border-border shadow-2xl">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
