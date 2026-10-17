'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {ArrowUpRight, Github, ExternalLink} from 'lucide-react'
import {StatusBadge} from '@/components/ui/StatusBadge'
import {TechBadge} from '@/components/ui/TechBadge'
import {urlForImage} from '@/sanity/image'
import type {Project} from '@/sanity/types'
import {cn} from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  layout?: 'featured' | 'standard' | 'compact'
  priority?: boolean
}

export function ProjectCard({
  project,
  layout = 'standard',
  priority = false,
}: ProjectCardProps) {
  const imageUrl = urlForImage(project.featuredImage)?.width(1200).height(675).url()

  if (layout === 'featured') {
    return (
      <article className="group relative rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 lg:p-10">
          {/* Info */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">
                  Featured Case Study
                </span>
                <span className="text-muted-foreground">•</span>
                <StatusBadge status={project.status} />
                {project.category && (
                  <span className="text-xs font-mono text-muted-foreground capitalize">
                    {project.category.replace('-', ' ')}
                  </span>
                )}
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
                <Link href={`/projects/${project.slug.current}`} className="focus:outline-none">
                  {project.title}
                </Link>
              </h3>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {project.summary}
              </p>

              {/* Problem & Solution Callout */}
              {project.problem && (
                <div className="p-4 rounded-xl bg-background/60 border border-border space-y-2 text-xs">
                  <div className="text-foreground font-medium flex items-center gap-1.5 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Problem Addressed:
                  </div>
                  <p className="text-muted-foreground leading-relaxed line-clamp-2">
                    {project.problem}
                  </p>
                </div>
              )}

              {/* Role */}
              {project.role && (
                <div className="text-xs font-mono text-muted-foreground">
                  <span className="text-foreground">Role:</span> {project.role}
                </div>
              )}
            </div>

            {/* Technologies & Links */}
            <div className="space-y-4 pt-4 border-t border-border">
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 6).map((tech) => (
                    <TechBadge key={tech} name={tech} />
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4 pt-2">
                <Link
                  href={`/projects/${project.slug.current}`}
                  className="inline-flex items-center gap-2 text-xs font-mono font-medium text-primary hover:opacity-85 transition-opacity"
                >
                  <span>Explore Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Live Demo</span>
                  </a>
                )}

                {project.repositoryUrl && (
                  <a
                    href={project.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github className="w-3 h-3" />
                    <span>Source</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Visual Preview / Screenshot Mockup */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <Link
              href={`/projects/${project.slug.current}`}
              className="w-full relative aspect-[16/10] rounded-xl overflow-hidden bg-background border border-border group/img block"
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={project.featuredImage?.alt || project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  priority={priority}
                  className="object-cover group-hover/img:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-card to-background">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-3 font-mono font-bold text-lg">
                    {project.title.charAt(0)}
                  </div>
                  <span className="font-semibold text-foreground text-base font-mono">
                    {project.title}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono mt-1">
                    Architectural Blueprint & Case Study
                  </span>
                </div>
              )}
            </Link>
          </div>
        </div>
      </article>
    )
  }

  // Standard Card Layout
  return (
    <article className="group relative flex flex-col justify-between rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 p-6 sm:p-7 shadow-lg">
      <div className="space-y-4">
        {/* Header tags */}
        <div className="flex items-center justify-between gap-2">
          <StatusBadge status={project.status} />
          {project.category && (
            <span className="text-xs font-mono text-muted-foreground capitalize">
              {project.category.replace('-', ' ')}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
          <Link href={`/projects/${project.slug.current}`}>
            {project.title}
          </Link>
        </h3>

        {/* Summary */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {project.summary}
        </p>

        {/* Role */}
        {project.role && (
          <p className="text-xs font-mono text-muted-foreground">
            <span className="text-foreground">Role:</span> {project.role}
          </p>
        )}
      </div>

      {/* Footer tags and links */}
      <div className="space-y-4 pt-6 mt-6 border-t border-border">
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-1">
          <Link
            href={`/projects/${project.slug.current}`}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-primary hover:opacity-85 transition-opacity"
          >
            <span>Read Details</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                title="Live Demo"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.repositoryUrl && (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                title="Source Code"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
