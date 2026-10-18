import React from 'react'
import type {Metadata} from 'next'
import {getAllProjects} from '@/sanity/fetch'
import {ProjectsListClient} from '@/components/projects/ProjectsListClient'
import {SITE} from '@/lib/site'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Work & Projects',
  description: `Explore featured projects, systems, and product architectures designed and built by ${SITE.name}.`,
}

export default async function ProjectsPage() {
  const projects = await getAllProjects()

  return (
    <div className="pt-[calc(var(--header-height)+clamp(2rem,8vh,5rem))] pb-[clamp(5rem,14vh,10rem)]">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Page Header */}
        <section className="px-5 md:px-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary mb-6">
            <span className="size-2 rounded-full bg-primary" />
            <span>Portfolio Archive</span>
          </div>
          <h1 className="display text-[clamp(4rem,15vw,15rem)] leading-[0.8] text-foreground">
            Projects
          </h1>
          <p className="mt-10 max-w-[48ch] text-[clamp(1.2rem,1.7vw,1.6rem)] leading-snug text-muted-foreground">
            Software systems, business applications, and product architectures built to solve concrete real-world challenges.
          </p>
        </section>

        {/* Filter & Projects List */}
        <section className="px-5 pt-[clamp(5rem,14vh,9rem)] md:px-10">
          <ProjectsListClient initialProjects={projects} />
        </section>
      </div>
    </div>
  )
}
