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
    "I'm interested in building useful products, solving interesting technical problems, and collaborating with people who want to turn ideas into reality."
  const email = settings?.email || process.env.NEXT_PUBLIC_CONTACT_EMAIL || ''
  const githubUrl = settings?.githubUrl || 'https://github.com/pranavwright'
  const linkedinUrl = settings?.linkedinUrl || 'https://linkedin.com/in/Pranav-wright'
  const instagramUrl = settings?.instagramUrl || 'https://instagram.com/pranav.wright'
  const twitterUrl = settings?.twitterUrl || 'https://x.com/pranav_wright'

  return (
    <section id="contact" className="py-24 border-t border-border/80">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Socials */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span>Get In Touch</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
                {headline}
              </h2>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                {subtext}
              </p>
            </div>

            {/* Direct Email Card */}
            {email && (
              <div className="p-6 rounded-xl bg-surface border border-border space-y-3 shadow-md">
                <div className="text-xs font-mono uppercase tracking-wider text-text-muted">
                  Direct Contact
                </div>
                <a
                  href={`mailto:${email}`}
                  className="group flex items-center justify-between text-base sm:text-lg font-semibold text-text-primary hover:text-accent transition-colors font-mono"
                >
                  <span className="flex items-center gap-2.5 truncate">
                    <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                    <span className="truncate">{email}</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0" />
                </a>
                <p className="text-xs text-text-muted">
                  Open to product roles, high-impact freelance projects, and technical collaborations.
                </p>
              </div>
            )}

            {/* Social Links */}
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-text-muted">
                Online Presence
              </div>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface border border-border text-xs font-mono text-text-secondary hover:text-text-primary hover:border-accent-border transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                {linkedinUrl && (
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface border border-border text-xs font-mono text-text-secondary hover:text-text-primary hover:border-accent-border transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {instagramUrl && (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface border border-border text-xs font-mono text-text-secondary hover:text-text-primary hover:border-accent-border transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>Instagram</span>
                  </a>
                )}
                {twitterUrl && (
                  <a
                    href={twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface border border-border text-xs font-mono text-text-secondary hover:text-text-primary hover:border-accent-border transition-colors"
                  >
                    <Twitter className="w-3.5 h-3.5" />
                    <span>X / Twitter</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Genuine Formspree Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
