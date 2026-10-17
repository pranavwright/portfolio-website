'use client'

import React, {useState, useMemo} from 'react'
import {ProjectCard} from '@/components/projects/ProjectCard'
import type {Project} from '@/sanity/types'
import {cn} from '@/lib/utils'

interface ProjectsListClientProps {
  initialProjects: Project[]
}

const categories = [
  {id: 'all', label: 'All Projects'},
  {id: 'web-app', label: 'Web Systems'},
  {id: 'mobile', label: 'Mobile Apps'},
  {id: 'tool', label: 'Developer Tools'},
  {id: 'experiment', label: 'Experiments'},
]

export function ProjectsListClient({initialProjects}: ProjectsListClientProps) {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return initialProjects
    return initialProjects.filter((p) => p.category === activeCategory)
  }, [activeCategory, initialProjects])

  return (
    <div className="space-y-10">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 pb-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              'px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 border',
              activeCategory === cat.id
                ? 'bg-accent text-background font-semibold border-accent shadow-sm'
                : 'bg-surface text-text-secondary border-border hover:border-accent-border/60 hover:text-text-primary'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="py-20 text-center rounded-2xl bg-surface border border-border space-y-3">
          <p className="text-text-primary font-medium">No projects in this category yet</p>
          <p className="text-xs text-text-muted">
            Check back soon or select another category above.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project._id}
              project={project}
              layout={idx === 0 && activeCategory === 'all' ? 'featured' : 'standard'}
            />
          ))}
        </div>
      )}
    </div>
  )
}
