'use client'

import React from 'react'
import Link from 'next/link'
import {ArrowRight, Github, FileText, Sparkles} from 'lucide-react'
import {MagneticButton} from '@/components/ui/MagneticButton'
import {SystemDiagram} from '@/components/ui/SystemDiagram'
import type {SiteSettings} from '@/sanity/types'

interface HeroSectionProps {
  settings?: SiteSettings | null
}

export function HeroSection({settings}: HeroSectionProps) {
  const name = settings?.name || 'Pranav Wright'
  const altName = settings?.alternativeName || 'Pranav P.S.'
  const headline = settings?.headline || 'I build software that turns ideas into reality.'
  const shortBio =
    settings?.shortBio ||
    "I'm a developer and product builder focused on creating useful digital products, solving real-world problems, and turning complex ideas into simple, intuitive experiences."
  const githubUrl = settings?.githubUrl || 'https://github.com/pranavwright'
  const resumeUrl = settings?.resumePdf?.asset?.url || '/pranav.pdf'

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & Intent */}
          <div className="lg:col-span-7 space-y-8 z-10">
            {/* Status pill & name */}
            <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-surface border border-border text-xs font-mono">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-text-primary font-medium">{name}</span>
              <span className="text-text-muted">({altName})</span>
              <span className="text-text-muted">•</span>
              <span className="text-accent flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Product Builder
              </span>
            </div>

            {/* Oversized Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary leading-[1.08]">
              {headline}
            </h1>

            {/* Supporting paragraph */}
            <p className="text-base sm:text-lg text-text-secondary max-w-xl leading-relaxed">
              {shortBio}
            </p>

            {/* Roles tags */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {[
                'Full-Stack Developer',
                'Product Architect',
                'Web Systems',
                'UI/UX Designer',
              ].map((role) => (
                <span
                  key={role}
                  className="px-2.5 py-1 rounded bg-surface/70 border border-border/70 text-xs font-mono text-text-muted"
                >
                  {role}
                </span>
              ))}
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <MagneticButton>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-semibold text-background bg-accent hover:bg-accent-hover transition-colors shadow-lg shadow-accent/10"
                >
                  <span>Explore My Work</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </MagneticButton>

              <MagneticButton>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-text-primary bg-surface hover:bg-surface-hover border border-border hover:border-accent-border transition-colors"
                >
                  <span>Let&apos;s Connect</span>
                </Link>
              </MagneticButton>

              <div className="flex items-center gap-2 pl-2">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full text-text-secondary hover:text-text-primary bg-surface hover:bg-surface-hover border border-border transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>

                {resumeUrl && (
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full text-text-secondary hover:text-text-primary bg-surface hover:bg-surface-hover border border-border transition-colors"
                    aria-label="Download CV"
                    title="Download CV"
                  >
                    <FileText className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Visual Identity (GSAP Network) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <SystemDiagram />
          </div>
        </div>
      </div>
    </section>
  )
}
