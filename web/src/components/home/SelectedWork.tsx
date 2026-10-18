'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { gsap, useGSAP, cinematic, motionOk } from '@/lib/gsap'
import { Project as SanityProject } from '@/sanity/types'
import { urlForImage } from '@/sanity/image'

export interface ProjectData {
  id: string
  name: string
  headline: string
  description: string
  role: string
  organization: string
  color: string
  ink: string
  lightColor: string
  lightInk: string
  darkColor: string
  darkInk: string
  cover: string
  metrics: { label: string; value: string }[]
  slug: string
}

export const projectThemePalettes = [
  {
    light: { color: '#eef6f0', ink: '#112217' }, // Soft Sage
    dark: { color: '#0e1f16', ink: '#d2f0db' },
  },
  {
    light: { color: '#eef5fa', ink: '#0e1e32' }, // Soft Ice Blue
    dark: { color: '#101726', ink: '#dbe6ff' },
  },
  {
    light: { color: '#f8f4ed', ink: '#261c14' }, // Soft Sand / Linen
    dark: { color: '#1c1a17', ink: '#faeee0' },
  },
  {
    light: { color: '#f4f0f9', ink: '#221530' }, // Soft Lilac
    dark: { color: '#1e142b', ink: '#eadff7' },
  },
  {
    light: { color: '#faf2eb', ink: '#331a0e' }, // Soft Peach
    dark: { color: '#26160e', ink: '#fae4d7' },
  },
  {
    light: { color: '#f2f6ed', ink: '#1c280e' }, // Soft Matcha
    dark: { color: '#16210f', ink: '#def0d3' },
  },
]

const defaultFeaturedProjects: ProjectData[] = [
  {
    id: 'docflow',
    name: 'DocFlow',
    headline: 'CRDT-powered collaborative editing at zero latency.',
    description:
      'Designed and built a distributed document workspace with conflict-free replicated data types, sub-50ms sync, and instant offline-first local persistence.',
    role: 'Lead Architect & Engineer',
    organization: 'Open Source',
    color: '#eef6f0',
    ink: '#112217',
    lightColor: '#eef6f0',
    lightInk: '#112217',
    darkColor: '#0e1f16',
    darkInk: '#d2f0db',
    cover: '/project/project-1.png',
    metrics: [
      { label: 'Sync Latency', value: '240ms to 38ms' },
      { label: 'Conflict Rate', value: '0.0%' },
    ],
    slug: 'docflow',
  },
  {
    id: 'healthpulse',
    name: 'HealthPulse',
    headline: 'Distributed clinical telemetry and real-time alerts.',
    description:
      'Engineered high-throughput event processing pipelines handling 25,000 events/second with automated anomaly detection, live WebSockets, and zero data loss.',
    role: 'Systems Engineer',
    organization: 'HealthTech',
    color: '#eef5fa',
    ink: '#0e1e32',
    lightColor: '#eef5fa',
    lightInk: '#0e1e32',
    darkColor: '#101726',
    darkInk: '#dbe6ff',
    cover: '/project/project-2.png',
    metrics: [
      { label: 'Throughput', value: '25k evt/s' },
      { label: 'Alert Latency', value: '1.2s to 95ms' },
    ],
    slug: 'healthpulse',
  },
  {
    id: 'devpulse',
    name: 'DevPulse',
    headline: 'Autonomous developer velocity and pipeline telemetry.',
    description:
      'Built an observability dashboard synthesizing Git commits, CI/CD runtimes, and pull request review times into actionable engineering insights.',
    role: 'Full-Stack Developer',
    organization: 'DevPlatform',
    color: '#f8f4ed',
    ink: '#261c14',
    lightColor: '#f8f4ed',
    lightInk: '#261c14',
    darkColor: '#1c1a17',
    darkInk: '#faeee0',
    cover: '/project/project-3.png',
    metrics: [
      { label: 'Review Velocity', value: '+42%' },
      { label: 'Deploy Turnaround', value: '45m to 12m' },
    ],
    slug: 'devpulse',
  },
]

function MetricValue({ value }: { value: string }) {
  const parts = value.split(' to ')
  if (parts.length === 2) {
    return (
      <span className="inline-flex items-center gap-x-[0.2em]">
        <span className="font-medium opacity-85">{parts[0]}</span>
        <ArrowRight aria-hidden="true" className="size-[0.62em] shrink-0" strokeWidth={2.25} />
        <span>{parts[1]}</span>
      </span>
    )
  }
  return <>{value}</>
}

export function SelectedWork({
  sanityProjects = [],
}: {
  sanityProjects?: SanityProject[]
}) {
  const root = useRef<HTMLElement>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const getTheme = () => {
      const active =
        (document.documentElement.dataset.theme as 'light' | 'dark') ||
        (document.documentElement.classList.contains('dark') ? 'dark' : 'light')
      return active || 'light'
    }

    setTheme(getTheme())

    const observer = new MutationObserver(() => {
      setTheme(getTheme())
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    })

    return () => observer.disconnect()
  }, [])

  const isDark = theme === 'dark'

  // Merge Sanity projects if available with default visual metadata
  const projects: ProjectData[] =
    sanityProjects.length > 0
      ? sanityProjects.slice(0, 6).map((sp, idx) => {
        const palette = projectThemePalettes[idx % projectThemePalettes.length]
        const def = defaultFeaturedProjects[idx % defaultFeaturedProjects.length]
        console.log(sp);

        return {
          id: sp._id,
          name: sp.title,
          headline: sp.summary || sp.seoDescription || 'Production engineering project',
          description: sp.problem || sp.summary || '',
          role: sp.role || 'Full-Stack Developer',
          organization: 'Kerala, IN',
          color: isDark ? palette.dark.color : palette.light.color,
          ink: isDark ? palette.dark.ink : palette.light.ink,
          lightColor: palette.light.color,
          lightInk: palette.light.ink,
          darkColor: palette.dark.color,
          darkInk: palette.dark.ink,
          cover: urlForImage(sp.featuredImage)?.width(800).height(500).url() || '/project/project-1.png',
          metrics: [
            { label: 'Impact', value: 'Production' },
            { label: 'Status', value: 'Live' },
          ],
          slug: sp.slug?.current || `project-${idx + 1}`,
        }
      })
      : defaultFeaturedProjects.map((p) => ({
        ...p,
        color: isDark ? p.darkColor : p.lightColor,
        ink: isDark ? p.darkInk : p.lightInk,
      }))

  useGSAP(
    () => {
      const section = root.current
      if (!section) return
      const q = gsap.utils.selector(section)
      const mm = gsap.matchMedia()

      mm.add(
        {
          cinematic,
          stack: '(min-width: 768px) and (min-height: 640px)',
          motion: motionOk,
        },
        (context) => {
          const { cinematic: isCinematic, stack, motion } =
            context.conditions as Record<string, boolean>
          const chapters = q('.chapter') as HTMLElement[]
          const markers = q('.chapter-marker') as HTMLElement[]

          // 1. Camera Aperture Iris expansion from the dot
          if (isCinematic) {
            section.dataset.cinematic = 'true'
            const veil = q('.work-veil')[0] as HTMLElement
            const dot = q('.work-dot')[0] as HTMLElement

            if (veil && dot) {
              const measure = () => {
                const dotRect = dot.getBoundingClientRect()
                const veilRect = veil.getBoundingClientRect()
                const cx = dotRect.left - veilRect.left + dotRect.width / 2
                const cy = dotRect.top - veilRect.top + dotRect.height / 2
                const radius =
                  Math.hypot(
                    Math.max(cx, veilRect.width - cx),
                    Math.max(cy, veilRect.height - cy)
                  ) + 4
                veil.style.setProperty('--iris-x', `${cx}px`)
                veil.style.setProperty('--iris-y', `${cy}px`)
                return radius
              }

              const radius = measure()

              gsap
                .timeline({
                  scrollTrigger: {
                    trigger: q('.chapter-stack')[0],
                    start: 'top top',
                    end: () => `+=${window.innerHeight}`,
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                  },
                })
                .fromTo(
                  veil,
                  { '--iris-r': '0px' },
                  { '--iris-r': `${radius}px`, ease: 'power2.in', duration: 1 },
                  0
                )
                .to(q('.work-veil-content'), { scale: 1.15, ease: 'power1.in', duration: 1 }, 0)
                .set(veil, { autoAlpha: 0 }, 1)
            }
          }

          // 2. Card stacking and scaling on desktop
          if (stack) {
            chapters.slice(0, -1).forEach((chapter, index) => {
              if (markers[index + 1]) {
                gsap
                  .timeline({
                    scrollTrigger: {
                      trigger: markers[index + 1],
                      start: 'top bottom',
                      end: 'top top',
                      scrub: true,
                    },
                  })
                  .to(chapter, { scale: 0.9, borderRadius: 28, ease: 'none' }, 0)
                  .to(chapter.querySelector('.chapter-shade'), { opacity: 0.12, ease: 'none' }, 0)
              }
            })
          }

          // 3. Parallax tilt on mockup images
          if (motion) {
            chapters.forEach((chapter, index) => {
              const art = chapter.querySelector('.chapter-art')
              if (stack && art && !(isCinematic && index === 0) && markers[index]) {
                gsap.fromTo(
                  art,
                  { yPercent: 14, rotate: -3 },
                  {
                    yPercent: 0,
                    rotate: 0,
                    ease: 'none',
                    scrollTrigger: {
                      trigger: markers[index],
                      start: 'top bottom',
                      end: 'top top',
                      scrub: true,
                    },
                  }
                )
              }
            })
          }
        }
      )
    },
    { scope: root }
  )

  return (
    <section
      ref={root}
      id="selected-work"
      aria-labelledby="selected-work-title"
      className="work-sequence relative"
    >
      <div className="chapter-stack relative flow-root">
        {/* Aperture Iris Veil */}
        <div className="work-veil bg-background">
          <div className="work-veil-content mx-auto w-full max-w-7xl flex min-h-[70svh] sm:min-h-[80svh] flex-col items-center justify-center px-5 text-center md:min-h-[100svh]">
            <h2
              id="selected-work-title"
              className="display-wide text-[clamp(2.8rem,13vw,16rem)] leading-[0.85]"
            >
              Selected
              <br />
              work
              <span
                aria-hidden="true"
                className="work-dot ml-[0.04em] inline-block size-[0.16em] rounded-full align-baseline"
                style={{ backgroundColor: '#10b981' }}
              />
            </h2>
            <p className="mt-6 md:mt-8 max-w-md text-base sm:text-lg text-muted-foreground">
              Production engineering systems, real-time engines, and distributed tools.
            </p>
          </div>
        </div>

        {/* Stacking Project Chapters */}
        {projects.map((project, index) => (
          <div key={project.id} className="contents">
            <span
              id={`project-${project.id}`}
              className="chapter-marker block h-0"
              aria-hidden="true"
            />
            <article
              className={`chapter relative overflow-hidden transition-[background-color,color,border-color] duration-500 border-t shadow-[0_-16px_40px_-20px_rgba(0,0,0,0.15)] ${index > 0 ? 'md:rounded-t-[28px]' : ''
                }`}
              style={{
                backgroundColor: isDark ? project.darkColor : project.lightColor,
                color: isDark ? project.darkInk : project.lightInk,
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
              }}
              aria-labelledby={`chapter-${project.id}`}
              data-index={index}
            >
              <div className="mx-auto w-full max-w-7xl relative flex min-h-[auto] py-10 sm:py-14 md:min-h-[100svh] md:py-0 flex-col px-5 sm:px-8 pb-8 pt-[calc(var(--header-height)+1.5rem)] md:px-10 md:pb-10 md:pt-[calc(var(--header-height)+2.5rem)]">
                <div className="relative z-10 flex flex-1 flex-col md:w-[48%] lg:w-[46%] justify-between">
                  <div>
                    <h3
                      id={`chapter-${project.id}`}
                      className="chapter-title display text-[clamp(2.4rem,6vw,7.5rem)]"
                    >
                      {project.name}
                    </h3>
                    <p className="mt-4 sm:mt-5 max-w-[26ch] text-[clamp(1.2rem,1.9vw,2rem)] font-semibold leading-tight tracking-[-0.02em]">
                      {project.headline}
                    </p>
                    <p className="mt-3 sm:mt-4 max-w-[44ch] text-[15px] sm:text-[17px] leading-relaxed opacity-90">
                      {project.description}
                    </p>
                  </div>

                  {/* Mobile & Tablet Mockup Figure */}
                  <figure className="chapter-figure relative my-6 aspect-[16/10] w-full rounded-xl overflow-hidden shadow-2xl md:hidden ring-1 ring-black/20">
                    <Image
                      src={project.cover}
                      alt={project.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </figure>

                  {/* Metrics Row */}
                  <dl className="mt-6 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:gap-x-12 sm:gap-y-6 md:mt-auto md:pt-10">
                    {project.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="flex flex-col-reverse justify-end gap-1.5"
                      >
                        <dt className="max-w-[22ch] text-[13px] sm:text-[14px] font-medium leading-snug opacity-85">
                          {metric.label}
                        </dt>
                        <dd className="whitespace-nowrap text-[clamp(1.35rem,2.2vw,2.4rem)] font-bold leading-none tracking-[-0.035em] tabular">
                          <MetricValue value={metric.value} />
                        </dd>
                      </div>
                    ))}
                  </dl>

                  {/* CTAs */}
                  <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-x-6 sm:gap-y-4">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold transition-all active:scale-[0.97] shadow-lg self-start"
                      style={{
                        backgroundColor: isDark ? project.darkInk : project.lightInk,
                        color: isDark ? project.darkColor : project.lightColor,
                      }}
                    >
                      Read case study{' '}
                      <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={2} />
                    </Link>
                    <p className="text-[14px] sm:text-[15px] font-medium opacity-90">
                      {project.role} · {project.organization}
                    </p>
                  </div>
                </div>

                {/* Desktop Mockup Artwork */}
                <figure
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 right-0 hidden w-[50%] items-center justify-center pr-8 lg:pr-10 pt-[var(--header-height)] md:flex"
                >
                  <div className="relative w-full max-h-[calc(100svh-var(--header-height)-6rem)] aspect-[16/10]">
                    <Image
                      src={project.cover}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 50vw, 45vw"
                      className="chapter-art rounded-xl object-cover shadow-[0_40px_80px_-32px_rgb(0_0_0/0.65)] ring-1 ring-black/20"
                    />
                  </div>
                </figure>
              </div>
              <div
                aria-hidden="true"
                className="chapter-shade pointer-events-none absolute inset-0 bg-black opacity-0"
              />
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}
