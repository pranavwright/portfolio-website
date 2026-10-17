import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { getAllProjects } from '@/sanity/fetch'
import { urlForImage } from '@/sanity/image'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Work — Selected Engineering Projects',
  description:
    'Production software systems, distributed backends, and full-stack web applications engineered by Pranav P S.',
}

const fallbackProjects = [
  {
    id: 'docflow',
    title: 'DocFlow',
    summary:
      'Distributed real-time document collaboration engine built with CRDTs, sub-50ms peer sync, and multi-tenant authorization.',
    category: 'Distributed Systems',
    role: 'Lead Architect & Engineer',
    metricLabel: 'Sync Latency',
    metricValue: '240ms to 38ms',
    color: '#0e1f16',
    ink: '#d2f0db',
    cover: '/project/project-1.png',
    slug: 'docflow',
  },
  {
    id: 'healthpulse',
    title: 'HealthPulse',
    summary:
      'High-throughput clinical monitoring and telemetry pipelines processing 25,000 events/second with automated anomaly alerts.',
    category: 'Healthcare & Telemetry',
    role: 'Systems Engineer',
    metricLabel: 'Throughput',
    metricValue: '25k evt/s',
    color: '#101726',
    ink: '#dbe6ff',
    cover: '/project/project-2.png',
    slug: 'healthpulse',
  },
  {
    id: 'devpulse',
    title: 'DevPulse',
    summary:
      'Autonomous engineering analytics platform unifying GitHub commits, CI/CD runtimes, and pull request velocity insights.',
    category: 'Developer Platform',
    role: 'Full-Stack Developer',
    metricLabel: 'Review Velocity',
    metricValue: '+42%',
    color: '#1c1a17',
    ink: '#faeee0',
    cover: '/project/project-3.png',
    slug: 'devpulse',
  },
]

export default async function WorkPage() {
  const sanityProjects = await getAllProjects()

  const projects =
    sanityProjects.length > 0
      ? sanityProjects.map((sp, idx) => ({
          id: sp._id,
          title: sp.title,
          summary: sp.summary || sp.seoDescription || 'Production engineering project',
          category: sp.category || 'Software Engineering',
          role: sp.role || 'Full-Stack Developer',
          metricLabel: 'Impact',
          metricValue: 'Production Ready',
          color: fallbackProjects[idx % fallbackProjects.length].color,
          ink: fallbackProjects[idx % fallbackProjects.length].ink,
          cover: sp.featuredImage
            ? urlForImage(sp.featuredImage)?.width(800).height(500).url() || fallbackProjects[idx % 3].cover
            : fallbackProjects[idx % 3].cover,
          slug: sp.slug?.current || `project-${idx + 1}`,
        }))
      : fallbackProjects

  return (
    <div className="pt-[calc(var(--header-height)+clamp(2rem,8vh,5rem))] pb-[clamp(5rem,14vh,10rem)]">
      <div className="max-w-7xl mx-auto">
        <section className="px-5 pb-[clamp(3rem,8vh,6rem)] md:px-10">
        <h1 className="display text-[clamp(4.5rem,18vw,18rem)] leading-[0.8] text-foreground">
          Work
        </h1>
        <p className="mt-10 max-w-[42ch] text-[clamp(1.2rem,1.7vw,1.6rem)] leading-snug text-muted-foreground">
          Selected engineering projects, distributed backend systems, and interactive product
          architectures. Each distilled to what I built, the architecture choices that mattered, and
          the concrete results.
        </p>
      </section>

      <ol className="px-5 md:px-10 space-y-12" aria-label="Projects">
        {projects.map((project) => (
          <li
            key={project.id}
            className="group relative grid gap-6 border-t border-border py-8 md:grid-cols-12 md:gap-8 md:py-12 transition-colors hover:border-primary/40"
          >
            {/* Visual Cover Container */}
            <div
              className="flex aspect-[16/10] items-center justify-center overflow-hidden rounded-[20px] p-[6%] md:col-span-5 relative"
              style={{ backgroundColor: project.color }}
            >
              <div className="relative size-full">
                <Image
                  src={project.cover}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 42vw"
                  className="rounded-lg object-contain shadow-2xl transition-transform duration-700 ease-expo group-hover:scale-[1.04]"
                />
              </div>
            </div>

            {/* Description & Link */}
            <div className="flex flex-col md:col-span-7 justify-between">
              <div>
                <p className="text-[15px] font-semibold tracking-wide text-primary uppercase">
                  {project.category}
                </p>
                <h2 className="display mt-3 text-[clamp(2.5rem,5.2vw,5.5rem)] text-foreground">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="hover:underline focus-visible:outline-none"
                  >
                    {project.title}
                  </Link>
                </h2>
                <p className="mt-4 max-w-[44ch] text-[clamp(1.1rem,1.4vw,1.3rem)] leading-snug text-muted-foreground">
                  {project.summary}
                </p>
              </div>

              <dl className="mt-8 grid grid-cols-2 gap-6 pt-6 border-t border-border/50">
                <div>
                  <dt className="text-[14px] font-medium text-muted-foreground">My role</dt>
                  <dd className="mt-1 text-[17px] font-semibold text-foreground">
                    {project.role}
                  </dd>
                </div>
                <div>
                  <dt className="text-[14px] font-medium text-muted-foreground">
                    {project.metricLabel}
                  </dt>
                  <dd className="mt-1 text-[clamp(1.5rem,2.2vw,2.2rem)] font-bold leading-none tracking-[-0.03em] tabular text-primary">
                    {project.metricValue}
                  </dd>
                </div>
              </dl>
            </div>

            <ArrowUpRight
              aria-hidden="true"
              className="absolute right-0 top-8 size-7 transition-transform duration-500 ease-expo group-hover:-translate-y-1.5 group-hover:translate-x-1.5 text-muted-foreground group-hover:text-foreground md:top-10 md:size-9"
              strokeWidth={1.5}
            />
          </li>
        ))}
      </ol>
      </div>
    </div>
  )
}
