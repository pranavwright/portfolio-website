import React from 'react'
import type {Metadata} from 'next'
import {getAllProjects} from '@/sanity/fetch'
import {ProjectsListClient} from '@/components/projects/ProjectsListClient'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Work & Projects',
  description:
    'Explore featured projects, systems, and product architectures designed and built by Pranav P S.',
}

export default async function ProjectsPage() {
  const projects = await getAllProjects()

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        {/* Page Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>Portfolio Archive</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-foreground uppercase leading-[1.05]">
            Selected Works &amp; <br />
            <span className="text-primary">Architectures</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Software systems, business applications, and product architectures built to solve concrete real-world challenges.
          </p>
        </div>

        {/* Filter & Projects List */}
        <ProjectsListClient initialProjects={projects} />
      </div>
    </div>
  )
}
