'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Github, ExternalLink, Sparkles, Layers } from 'lucide-react'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { TechBadge } from '@/components/ui/TechBadge'
import { urlForImage } from '@/sanity/image'
import type { Project } from '@/sanity/types'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  layout?: 'featured' | 'standard' | 'compact'
  priority?: boolean
}

const fallbackGradients: Record<string, string> = {
  'web-app': 'from-emerald-950/40 via-background to-card',
  'mobile': 'from-cyan-950/40 via-background to-card',
  'tool': 'from-amber-950/40 via-background to-card',
  'experiment': 'from-purple-950/40 via-background to-card',
  'design': 'from-rose-950/40 via-background to-card',
}

const projectFallbackImages: Record<string, string> = {
  'nowme-live': '/project/project-1.png',
  'realsq': '/project/project-2.png',
  'carryko': '/project/project-3.png',
}

export function ProjectCard({
  project,
  layout = 'standard',
  priority = false,
}: ProjectCardProps) {
  const [imageError, setImageError] = useState(false)
  const slug = project.slug?.current || project._id || 'project'
  const projectHref = `/projects/${slug}`

  // Safe image resolution with fallbacks
  const sanityImageUrl = project.featuredImage
    ? urlForImage(project.featuredImage)?.width(1400).height(800).url()
    : null
  const imageUrl =
    (!imageError && sanityImageUrl) ||
    projectFallbackImages[slug] ||
    null

  const category = project.category || 'web-app'
  const gradientClass = fallbackGradients[category] || 'from-primary/10 via-background to-card'
  const technologies = Array.isArray(project.technologies) ? project.technologies : []

  // FEATURED LAYOUT (Editorial 2-Column Showcase)
  if (layout === 'featured') {
    return (
      <article className="group relative rounded-[24px] sm:rounded-[28px] border border-border bg-card p-6 sm:p-8 lg:p-10 shadow-xl transition-all duration-500 ease-expo hover:border-primary/50 hover:shadow-2xl overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-primary/5 blur-3xl transition-opacity duration-700 group-hover:bg-primary/10"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Deep Content & Context */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Meta Tags Row */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/25 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  <Sparkles className="size-3" />
                  Featured Project
                </span>
                <StatusBadge status={project.status || 'completed'} />
                {project.category && (
                  <span className="rounded-full border border-border bg-card px-3 py-1 text-xs font-mono text-muted-foreground capitalize">
                    {project.category.replace('-', ' ')}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="display text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.95] text-foreground tracking-tight transition-colors group-hover:text-primary">
                <Link href={projectHref} className="focus-visible:outline-none focus-visible:underline">
                  {project.title}
                </Link>
              </h3>

              {/* Summary */}
              <p className="max-w-[52ch] text-[15px] sm:text-[17px] leading-relaxed text-muted-foreground">
                {project.summary || 'Production engineering project engineered with scalable architecture and refined interactions.'}
              </p>

              {/* Problem / Engineering Highlight */}
              {project.problem && (
                <div className="rounded-2xl border border-border/80 bg-background/60 p-4 sm:p-5 space-y-1.5 backdrop-blur-sm">
                  <p className="text-xs font-semibold uppercase tracking-wider text-foreground flex items-center gap-1.5 font-mono">
                    <span className="size-1.5 rounded-full bg-primary" />
                    Problem Solved
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {project.problem}
                  </p>
                </div>
              )}

              {/* Role & Impact */}
              {project.role && (
                <p className="text-xs font-mono text-muted-foreground">
                  <span className="font-semibold text-foreground">Role:</span> {project.role}
                </p>
              )}
            </div>

            {/* Tech Stack & Action Links */}
            <div className="space-y-5 pt-4 border-t border-border/60">
              {technologies.length > 0 && (
                <div className="flex flex-wrap gap-2" aria-label="Technologies used">
                  {technologies.slice(0, 6).map((tech) => (
                    <TechBadge key={tech} name={tech} />
                  ))}
                  {technologies.length > 6 && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono text-muted-foreground bg-muted border border-border">
                      +{technologies.length - 6} more
                    </span>
                  )}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href={projectHref}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md transition-all duration-300 ease-expo hover:opacity-95 active:scale-[0.97]"
                >
                  <span>Explore Case Study</span>
                  <ArrowUpRight className="size-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
                </Link>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-1.5 rounded-full border border-border bg-card px-5 text-xs font-semibold text-foreground hover:border-primary/50 hover:text-primary transition-colors"
                  >
                    <span>Live Preview</span>
                    <ExternalLink className="size-3.5 opacity-70" />
                  </a>
                )}

                {project.repositoryUrl && (
                  <a
                    href={project.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-1.5 rounded-full border border-border bg-card px-5 text-xs font-semibold text-foreground hover:border-primary/50 hover:text-primary transition-colors"
                  >
                    <Github className="size-3.5 opacity-70" />
                    <span>Source</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Visual Mockup Showcase */}
          <div className="lg:col-span-5">
            <Link
              href={projectHref}
              tabIndex={-1}
              aria-hidden="true"
              className="block relative aspect-[16/10] w-full rounded-[20px] overflow-hidden border border-border bg-muted/30 shadow-2xl group/media"
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={project.featuredImage?.alt || project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  priority={priority}
                  onError={() => setImageError(true)}
                  className="object-cover transition-transform duration-700 ease-expo group-hover/media:scale-[1.04]"
                />
              ) : (
                <div className={cn('size-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br', gradientClass)}>
                  <div className="size-16 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary mb-3">
                    <Layers className="size-8" />
                  </div>
                  <p className="font-bold text-foreground text-xl tracking-tight">
                    {project.title}
                  </p>
                  <p className="text-xs font-mono text-muted-foreground mt-1">
                    Architectural Blueprint &amp; Case Study
                  </p>
                </div>
              )}
            </Link>
          </div>
        </div>
      </article>
    )
  }

  // STANDARD LAYOUT (Magazine-Grade Grid Card)
  return (
    <article className="group relative flex flex-col justify-between rounded-[24px] sm:rounded-[28px] border border-border bg-card p-6 sm:p-7 shadow-xl transition-all duration-500 ease-expo hover:border-primary/50 hover:shadow-2xl overflow-hidden hover:-translate-y-1">
      <div className="space-y-5">
        {/* Visual Preview Banner */}
        <Link
          href={projectHref}
          tabIndex={-1}
          aria-hidden="true"
          className="block relative aspect-[16/10] w-full rounded-[18px] overflow-hidden border border-border/80 bg-muted/40 shadow-md group/img"
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={project.featuredImage?.alt || project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
              onError={() => setImageError(true)}
              className="object-cover transition-transform duration-700 ease-expo group-hover/img:scale-[1.04]"
            />
          ) : (
            <div className={cn('size-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br', gradientClass)}>
              <div className="size-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary mb-2">
                <Layers className="size-6" />
              </div>
              <p className="font-semibold text-foreground text-sm tracking-tight line-clamp-1">
                {project.title}
              </p>
              <p className="text-[11px] font-mono text-muted-foreground mt-0.5">
                Case Study
              </p>
            </div>
          )}
        </Link>

        {/* Tags Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <StatusBadge status={project.status || 'completed'} />
          {project.category && (
            <span className="rounded-full border border-border bg-card px-2.5 py-0.5 text-xs font-mono text-muted-foreground capitalize">
              {project.category.replace('-', ' ')}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
          <Link href={projectHref} className="focus-visible:outline-none focus-visible:underline">
            {project.title}
          </Link>
        </h3>

        {/* Summary */}
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {project.summary || 'Production engineering project engineered with scalable architecture and refined interactions.'}
        </p>

        {/* Role snippet */}
        {project.role && (
          <p className="text-xs font-mono text-muted-foreground">
            <span className="font-semibold text-foreground">Role:</span> {project.role}
          </p>
        )}
      </div>

      {/* Footer Area: Technologies + Actions */}
      <div className="space-y-4 pt-6 mt-6 border-t border-border/60">
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5" aria-label="Technologies used">
            {technologies.slice(0, 4).map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
            {technologies.length > 4 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-mono text-muted-foreground bg-muted border border-border">
                +{technologies.length - 4}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-1">
          <Link
            href={projectHref}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:opacity-85 transition-opacity"
          >
            <span>Read Details</span>
            <ArrowUpRight className="size-3.5 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
          </Link>

          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="grid size-8 place-items-center rounded-full border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors"
                title="Live Demo"
                aria-label={`${project.title} live preview`}
              >
                <ExternalLink className="size-3.5" />
              </a>
            )}
            {project.repositoryUrl && (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="grid size-8 place-items-center rounded-full border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors"
                title="Source Code"
                aria-label={`${project.title} source code on GitHub`}
              >
                <Github className="size-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
