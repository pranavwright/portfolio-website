'use client'

import React from 'react'
import Link from 'next/link'
import {ArrowDown, ArrowUpRight, Github, FileText, Sparkles} from 'lucide-react'
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
    'Full-stack developer and product builder focused on scalable backend systems, modern web architectures, and bespoke interactive user experiences.'
  const githubUrl = settings?.githubUrl || 'https://github.com/pranavwright'
  const resumeUrl = settings?.resumePdf?.asset?.url || '/pranav.pdf'

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Background subtle radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-accent/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Bold Editorial Typography & Statement */}
          <div className="lg:col-span-7 space-y-8 z-10">
            {/* Live status badge */}
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-surface border border-border text-xs font-mono">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="text-text-primary font-medium tracking-wide uppercase">
                {name} <span className="text-text-muted lowercase">({altName})</span>
              </span>
              <span className="text-text-muted">•</span>
              <span className="text-accent flex items-center gap-1 font-semibold">
                <Sparkles className="w-3 h-3" /> Available Worldwide
              </span>
            </div>

            {/* Oversized Karolina Hess-style Statement Typography */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-text-primary leading-[1.02] uppercase">
                Creative <br />
                <span className="text-accent">Developer</span> <br />
                &amp; System Architect
              </h1>
              <p className="text-xs sm:text-sm font-mono text-text-muted uppercase tracking-widest pt-1">
                Based in Kerala, India • Working worldwide
              </p>
            </div>

            {/* Philosophy quote / supporting text */}
            <div className="border-l-2 border-accent/40 pl-4 py-1 space-y-2">
              <p className="text-base sm:text-lg text-text-primary font-medium leading-relaxed">
                &ldquo;I design and engineer with care. No templates, no shortcuts.&rdquo;
              </p>
              <p className="text-sm text-text-secondary leading-relaxed max-w-xl">
                {shortBio}
              </p>
            </div>

            {/* Role & Capabilities Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {[
                'Full-Stack Architecture',
                'Fastify & Node.js',
                'Next.js & React',
                'Flutter Mobile',
                'UI/UX Micro-Interactions',
              ].map((role) => (
                <span
                  key={role}
                  className="px-3 py-1 rounded-full bg-surface border border-border text-xs font-mono text-text-secondary hover:text-text-primary hover:border-accent/40 transition-colors"
                >
                  {role}
                </span>
              ))}
            </div>

            {/* Magnetic Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <MagneticButton>
                <a
                  href="#work"
                  className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-mono font-semibold text-background bg-accent hover:bg-accent-hover transition-all duration-200 shadow-lg shadow-accent/10"
                >
                  <span>Selected Works</span>
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </a>
              </MagneticButton>

              <MagneticButton>
                <Link
                  href="/#contact"
                  className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-mono font-medium text-text-primary bg-surface hover:bg-surface-hover border border-border hover:border-accent/40 transition-colors"
                >
                  <span>Let&apos;s Connect</span>
                  <ArrowUpRight className="w-4 h-4 text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </MagneticButton>

              <div className="flex items-center gap-2 pl-2">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full text-text-secondary hover:text-text-primary bg-surface hover:bg-surface-hover border border-border transition-colors"
                  aria-label="GitHub Profile"
                  title="GitHub Profile"
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

          {/* Right Column: Interactive System Diagram in Glass Frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[520px] rounded-2xl bg-surface/40 border border-border/80 p-4 sm:p-6 backdrop-blur-sm shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-border/60 text-xs font-mono text-text-muted">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  System Blueprint &amp; Topology
                </span>
                <span>Active</span>
              </div>
              <SystemDiagram />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
