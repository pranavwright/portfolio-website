'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { TypographyVortex } from '@/components/ui/TypographyVortex'
import { Magnetic } from '@/components/ui/Magnetic'

interface SiteFooterProps {
  name?: string
  email?: string
  githubUrl?: string
  linkedinUrl?: string
  instagramUrl?: string
  twitterUrl?: string
}

export function SiteFooter({
  name = 'Pranav P S',
  email = 'pranavwright@gmail.com',
  githubUrl = 'https://github.com/pranavwright',
  linkedinUrl = 'https://linkedin.com/in/Pranav-wright',
  instagramUrl = 'https://instagram.com/pranav.wright',
  twitterUrl = 'https://x.com/pranav_wright',
}: SiteFooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const profiles = [
    { label: 'GitHub', href: githubUrl },
    { label: 'LinkedIn', href: linkedinUrl },
    { label: 'Instagram', href: instagramUrl },
    { label: 'X (Twitter)', href: twitterUrl },
  ]

  return (
    <footer
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden bg-background text-foreground"
    >
      {/* Background Typography Vortex Canvas */}
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <TypographyVortex phrase={`${name.toUpperCase()} / FULL-STACK DEVELOPER / PRODUCT BUILDER / `} />
      </div>

      {/* Radial Gradient Fog Scrim */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_50%_at_50%_50%,var(--background)_35%,transparent_100%)]"
      />

      {/* Center Hero CTA */}
      <div className="flex flex-1 flex-col items-center justify-center px-5 pb-10 pt-[calc(var(--header-height)+3rem)] text-center">
        <h2
          id="contact-title"
          className="display-wide max-w-[12ch] text-[clamp(2.6rem,8vw,8rem)]"
        >
          Bring me a hard problem.
        </h2>

        <Magnetic className="mt-12">
          <a
            href={`mailto:${email}`}
            className="grid size-36 place-items-center rounded-full bg-primary text-[17px] font-semibold text-primary-foreground transition-transform duration-500 ease-expo hover:scale-[1.05] active:scale-[0.97] md:size-44 md:text-lg shadow-2xl"
          >
            Get in touch
          </a>
        </Magnetic>

        <a
          href={`mailto:${email}`}
          className="mt-8 text-lg font-medium text-foreground underline decoration-1 underline-offset-[6px] hover:decoration-2"
        >
          {email}
        </a>

        <ul
          aria-label="Other ways to reach me"
          className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[15px] font-medium sm:gap-x-8 sm:text-[16px]"
        >
          {profiles.map((profile) => (
            <li key={profile.label}>
              <a
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors underline decoration-1 underline-offset-[6px] hover:decoration-2"
              >
                {profile.label}
                <ArrowUpRight
                  aria-hidden="true"
                  className="ml-0.5 inline size-4 align-[-0.15em]"
                  strokeWidth={1.75}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Subfooter Bar */}
      <div className="border-t border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-5 py-5 text-[15px] md:px-10">
          <p className="text-muted-foreground">© {new Date().getFullYear()} {name}</p>
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/work" className="text-muted-foreground hover:text-foreground transition-colors">
              Work
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/resume" className="text-muted-foreground hover:text-foreground transition-colors">
              Resume
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              Back to top <ArrowUp aria-hidden="true" className="size-4" strokeWidth={1.75} />
            </button>
          </nav>
        </div>
      </div>
    </footer>
  )
}
