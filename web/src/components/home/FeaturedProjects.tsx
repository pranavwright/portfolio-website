import React from 'react'
import Link from 'next/link'
import {ArrowRight} from 'lucide-react'
import {ProjectCard} from '@/components/projects/ProjectCard'
import type {Project} from '@/sanity/types'

interface FeaturedProjectsProps {
  projects: Project[]
}

export function FeaturedProjects({projects}: FeaturedProjectsProps) {
  if (!projects || projects.length === 0) return null

  const topProject = projects[0]
  const otherProjects = projects.slice(1)

  return (
    <section id="work" className="py-24 border-t border-border/80">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-2 border-b border-border/60">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>Selected Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
              Products, Systems &amp; Architecture
            </h2>
            <p className="text-sm sm:text-base text-text-secondary max-w-xl leading-relaxed">
              Real-world problems converted into functioning software, scalable backends, and intuitive client applications.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-text-secondary hover:text-accent transition-colors pb-1"
          >
            <span>View All ({projects.length}+)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Editorial Showcase Layout */}
        <div className="space-y-8">
          {/* Top Featured Project (Full Width) */}
          {topProject && (
            <ProjectCard project={topProject} layout="featured" priority={true} />
          )}

          {/* Secondary Projects Grid */}
          {otherProjects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {otherProjects.map((p) => (
                <ProjectCard key={p._id} project={p} layout="standard" />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
