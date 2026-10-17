'use client'

import React, {useState, useRef} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {ArrowRight, ArrowUpRight, LayoutGrid, List} from 'lucide-react'
import {motion, AnimatePresence, useMotionValue, useSpring} from 'framer-motion'
import {ProjectCard} from '@/components/projects/ProjectCard'
import {urlForImage} from '@/sanity/image'
import type {Project} from '@/sanity/types'
import {cn} from '@/lib/utils'

interface FeaturedProjectsProps {
  projects: Project[]
}

export function FeaturedProjects({projects}: FeaturedProjectsProps) {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring physics for the floating preview card
  const springConfig = {damping: 24, stiffness: 220, mass: 0.6}
  const previewX = useSpring(mouseX, springConfig)
  const previewY = useSpring(mouseY, springConfig)

  if (!projects || projects.length === 0) return null

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const topProject = projects[0]
  const otherProjects = projects.slice(1)

  return (
    <section id="work" className="py-28 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Section Header in Karolina Hess Editorial Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>Selected Works [{projects.length.toString().padStart(2, '0')}]</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-text-primary tracking-tight uppercase">
              Recent Projects &amp; Products
            </h2>
            <p className="text-sm sm:text-base text-text-secondary max-w-xl leading-relaxed">
              Custom-built digital solutions, resilient backends, and responsive applications engineered from first principles.
            </p>
          </div>

          {/* View Mode Switcher & View All Link */}
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-surface border border-border p-1 rounded-full">
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-colors',
                  viewMode === 'list'
                    ? 'bg-accent text-background font-semibold shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                )}
                aria-label="List View"
              >
                <List className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">List</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-colors',
                  viewMode === 'grid'
                    ? 'bg-accent text-background font-semibold shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                )}
                aria-label="Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
            </div>

            <Link
              href="/projects"
              className="group inline-flex items-center gap-1.5 text-xs font-mono text-text-secondary hover:text-accent transition-colors border border-border px-4 py-2 rounded-full bg-surface"
            >
              <span>Archive ({projects.length}+)</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* LIST VIEW: Karolina Hess Signature Hover Image Follower */}
        {viewMode === 'list' && (
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredProject(null)}
            className="relative divide-y divide-border border-b border-border"
          >
            {/* Floating Image Preview Thumbnail (Desktop) */}
            <AnimatePresence>
              {hoveredProject && (
                <motion.div
                  initial={{opacity: 0, scale: 0.8}}
                  animate={{opacity: 1, scale: 1}}
                  exit={{opacity: 0, scale: 0.8}}
                  transition={{duration: 0.25, ease: 'easeOut'}}
                  style={{
                    x: previewX,
                    y: previewY,
                    translateX: '20px',
                    translateY: '-50%',
                  }}
                  className="pointer-events-none absolute z-30 hidden lg:block w-[360px] aspect-[16/10] rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-surface backdrop-blur-md"
                >
                  {hoveredProject.featuredImage ? (
                    <Image
                      src={
                        urlForImage(hoveredProject.featuredImage)?.width(720).height(450).url() ||
                        ''
                      }
                      alt={hoveredProject.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-surface text-accent font-mono font-bold text-xl">
                      {hoveredProject.title}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                    <span className="text-xs font-mono text-white font-medium">
                      View Case Study ↗
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* List Rows */}
            {projects.map((project, index) => {
              const numStr = (index + 1).toString().padStart(2, '0')
              return (
                <Link
                  key={project._id}
                  href={`/projects/${project.slug.current}`}
                  onMouseEnter={() => setHoveredProject(project)}
                  className="group relative flex flex-col md:flex-row md:items-center justify-between py-8 px-4 transition-all duration-300 hover:bg-surface/60 rounded-xl"
                  data-cursor="interactive"
                  data-cursor-text="VIEW"
                >
                  {/* Left: Number & Title */}
                  <div className="flex items-start md:items-center gap-6 md:gap-10">
                    <span className="font-mono text-sm sm:text-base text-accent font-semibold">
                      [{numStr}]
                    </span>
                    <div className="space-y-1">
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text-primary group-hover:text-accent transition-colors uppercase">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-text-muted line-clamp-1 max-w-xl">
                        {project.summary}
                      </p>
                    </div>
                  </div>

                  {/* Right: Category, Scope & Arrow */}
                  <div className="flex items-center justify-between md:justify-end gap-6 pt-4 md:pt-0">
                    <div className="flex flex-wrap items-center gap-2">
                      {project.category && (
                        <span className="text-xs font-mono text-text-secondary bg-surface border border-border px-2.5 py-1 rounded-full uppercase">
                          {project.category.replace('-', ' ')}
                        </span>
                      )}
                      {project.role && (
                        <span className="text-xs font-mono text-text-muted hidden sm:inline-block">
                          {project.role}
                        </span>
                      )}
                    </div>
                    <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-background transition-all">
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        {/* GRID VIEW: Detailed Editorial Cards */}
        {viewMode === 'grid' && (
          <div className="space-y-8">
            {topProject && (
              <ProjectCard project={topProject} layout="featured" priority={true} />
            )}
            {otherProjects.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {otherProjects.map((p) => (
                  <ProjectCard key={p._id} project={p} layout="standard" />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
