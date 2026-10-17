'use client'

import React from 'react'
import Link from 'next/link'
import {ArrowUp, Github, Linkedin, Instagram, Twitter} from 'lucide-react'

interface FooterProps {
  name?: string
  email?: string
  githubUrl?: string
  linkedinUrl?: string
  instagramUrl?: string
  twitterUrl?: string
}

export function Footer({
  name = 'Pranav Wright',
  email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || '',
  githubUrl = 'https://github.com/pranavwright',
  linkedinUrl = 'https://linkedin.com/in/Pranav-wright',
  instagramUrl = 'https://instagram.com/pranav.wright',
  twitterUrl = 'https://x.com/pranav_wright',
}: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  return (
    <footer className="border-t border-border bg-surface/40 mt-32">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Identity */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="font-semibold text-text-primary tracking-tight font-mono">
                {name}
              </span>
            </div>
            <p className="text-sm text-text-secondary max-w-md leading-relaxed">
              Software developer, full-stack engineer, and product builder. Focused on practical software, resilient systems, and intuitive user experiences.
            </p>
            <div className="pt-2 text-xs font-mono text-text-muted">
              Based in Kerala, India
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-text-muted tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-text-secondary hover:text-text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-text-secondary hover:text-text-primary transition-colors">
                  Featured Work
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-text-secondary hover:text-text-primary transition-colors">
                  About & Background
                </Link>
              </li>
              <li>
                <Link href="/#now" className="text-text-secondary hover:text-text-primary transition-colors">
                  Currently Building
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-text-secondary hover:text-text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials & Connect */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-text-muted tracking-wider">
              Network
            </h4>
            <ul className="space-y-2 text-sm font-mono">
              {email && (
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="text-text-secondary hover:text-accent transition-colors flex items-center gap-2"
                  >
                    <span>Email</span>
                  </a>
                </li>
              )}
              <li>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              </li>
              {linkedinUrl && (
                <li>
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>
                </li>
              )}
              {instagramUrl && (
                <li>
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>Instagram</span>
                  </a>
                </li>
              )}
              {twitterUrl && (
                <li>
                  <a
                    href={twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2"
                  >
                    <Twitter className="w-3.5 h-3.5" />
                    <span>X / Twitter</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-muted">
          <div>
            &copy; {new Date().getFullYear()} {name}. Content managed via Sanity CMS.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-text-secondary hover:text-accent transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
