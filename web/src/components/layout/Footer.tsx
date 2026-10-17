'use client'

import React from 'react'
import Link from 'next/link'
import {ArrowUp, ArrowUpRight, Github, Linkedin, Instagram, Twitter} from 'lucide-react'
import {LocalTimeClock} from '@/components/ui/LocalTimeClock'

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
  email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'wrightpranav@gmail.com',
  githubUrl = 'https://github.com/pranavwright',
  linkedinUrl = 'https://linkedin.com/in/Pranav-wright',
  instagramUrl = 'https://instagram.com/pranav.wright',
  twitterUrl = 'https://x.com/pranav_wright',
}: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  return (
    <footer className="border-t border-border bg-surface/30 mt-32 pt-20 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 space-y-20">
        {/* Karolina Hess Hallmark: Oversized Let's Work Together CTA */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>Drop me an email</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-text-primary uppercase leading-none">
            Let’s work <br />
            <span className="text-accent underline decoration-white/20 underline-offset-8">
              together.
            </span>
          </h2>

          <div className="pt-4">
            <a
              href={`mailto:${email}`}
              className="group inline-flex items-center gap-3 text-xl sm:text-3xl md:text-4xl font-mono text-text-primary hover:text-accent transition-colors border-b-2 border-border hover:border-accent pb-2"
            >
              <span>{email}</span>
              <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-accent" />
            </a>
          </div>
        </div>

        {/* Navigation & Social Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-12 border-t border-border">
          {/* Col 1: Identity & Time */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 font-mono text-sm uppercase font-semibold text-text-primary">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>{name}</span>
            </div>
            <p className="text-sm text-text-secondary max-w-sm leading-relaxed">
              Crafting scalable software, high-throughput systems, and fluid micro-interactions. Based in Kerala, India — collaborating worldwide.
            </p>
            <div className="pt-2">
              <LocalTimeClock />
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-text-muted">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm font-mono">
              <li>
                <Link href="/" className="text-text-secondary hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-text-secondary hover:text-accent transition-colors">
                  Selected Works
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-text-secondary hover:text-accent transition-colors">
                  About & Background
                </Link>
              </li>
              <li>
                <Link href="/#now" className="text-text-secondary hover:text-accent transition-colors">
                  Currently Building
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-text-secondary hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Social Network */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-text-muted">
              Connect
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm font-mono">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3 rounded-lg bg-surface border border-border hover:border-accent/40 text-text-secondary hover:text-text-primary transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Github className="w-4 h-4" /> GitHub
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3 rounded-lg bg-surface border border-border hover:border-accent/40 text-text-secondary hover:text-text-primary transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}

              {twitterUrl && (
                <a
                  href={twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3 rounded-lg bg-surface border border-border hover:border-accent/40 text-text-secondary hover:text-text-primary transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Twitter className="w-4 h-4" /> X / Twitter
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}

              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3 rounded-lg bg-surface border border-border hover:border-accent/40 text-text-secondary hover:text-text-primary transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Instagram className="w-4 h-4" /> Instagram
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-muted">
          <div>
            &copy; {new Date().getFullYear()} {name} • Built with Next.js, Framer Motion &amp; Sanity.
          </div>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-1.5 text-text-secondary hover:text-accent transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  )
}
