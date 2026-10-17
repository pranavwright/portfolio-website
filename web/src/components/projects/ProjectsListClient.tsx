'use client'

import React, { useState, useMemo } from 'react'
import { ProjectCard } from '@/components/projects/ProjectCard'
import type { Project } from '@/sanity/types'
import { cn } from '@/lib/utils'
import { Sparkles, RotateCcw } from 'lucide-react'

interface ProjectsListClientProps {
  initialProjects: Project[]
}

const categoryDefinitions = [
  { id: 'all', label: 'All Projects' },
  { id: 'web-app', label: 'Web Systems' },
  { id: 'mobile', label: 'Mobile Apps' },
  { id: 'tool', label: 'Developer Tools' },
  { id: 'experiment', label: 'Experiments' },
]

export function ProjectsListClient({ initialProjects }: ProjectsListClientProps) {
  const [activeCategory, setActiveCategory] = useState('all')

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: initialProjects.length }
    initialProjects.forEach((p) => {
      if (p.category) {
        counts[p.category] = (counts[p.category] || 0) + 1
      }
    })
    return counts
  }, [initialProjects])

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return initialProjects
    return initialProjects.filter((p) => p.category === activeCategory)
  }, [activeCategory, initialProjects])

  return (
    <div className="space-y-12">
      {/* Category Filter Navigation Bar */}
      <nav aria-label="Project categories" className="flex flex-wrap items-center gap-2.5 pb-2">
        {categoryDefinitions.map((cat) => {
          const isActive = activeCategory === cat.id
          const count = categoryCounts[cat.id] || 0

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 ease-expo border active:scale-[0.97]',
                isActive
                  ? 'bg-foreground text-background border-foreground shadow-md'
                  : 'bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
              )}
            >
              <span>{cat.label}</span>
              <span
                className={cn(
                  'rounded-full px-1.5 py-0.2 text-[11px] font-mono tabular',
                  isActive
                    ? 'bg-background text-foreground'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                {count}
              </span>
            </button>
          )
        })}
      </nav>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="rounded-[28px] border border-border bg-card p-12 sm:p-16 text-center space-y-4 shadow-xl">
          <div className="size-14 rounded-full bg-muted text-muted-foreground mx-auto flex items-center justify-center">
            <Sparkles className="size-6" />
          </div>
          <h3 className="text-xl font-bold text-foreground">No projects found</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            There are currently no published projects in this specific category.
          </p>
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className="mt-4 inline-flex h-11 items-center gap-2 rounded-full border border-border px-6 text-sm font-semibold text-foreground hover:bg-muted transition-colors active:scale-[0.97]"
          >
            <RotateCcw className="size-4" />
            <span>Reset filters</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project, idx) => {
            const isFeatured = idx === 0 && activeCategory === 'all'
            return (
              <div key={project._id} className={isFeatured ? 'md:col-span-2' : ''}>
                <ProjectCard
                  project={project}
                  layout={isFeatured ? 'featured' : 'standard'}
                  priority={idx === 0}
                />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
