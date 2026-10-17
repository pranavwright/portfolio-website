'use client'

import React, { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP, motionOk } from '@/lib/gsap'
import { Experience as SanityExperience } from '@/sanity/types'

const defaultExperiences = [
  {
    company: 'Full-Stack Developer & Product Builder',
    role: 'Autonomous Engineering & Client Systems',
    dates: '2023 — Present',
  },
  {
    company: 'Lead Platform Architect',
    role: 'Distributed Cloud Services & Microservices',
    dates: '2022 — 2023',
  },
  {
    company: 'Software Engineer',
    role: 'Web Application Development & UI Motion',
    dates: '2021 — 2022',
  },
]

const toolkit = [
  'Next.js 14',
  'TypeScript',
  'React',
  'Node.js',
  'PostgreSQL',
  'Docker',
  'Tailwind CSS',
  'GSAP & Motion',
  'Sanity CMS',
  'Python',
  'GraphQL',
  'Cloudflare Pages',
  'Figma',
  'REST APIs',
]

export function ExperienceSection({
  sanityExperience = [],
}: {
  sanityExperience?: SanityExperience[]
}) {
  const root = useRef<HTMLElement>(null)

  const experiences =
    sanityExperience.length > 0
      ? sanityExperience.map((exp) => ({
          company: exp.organization || 'Independent Engineering',
          role: exp.role,
          dates: exp.startDate
            ? `${new Date(exp.startDate).getFullYear()} — ${exp.isCurrent ? 'Present' : exp.endDate ? new Date(exp.endDate).getFullYear() : 'Now'}`
            : '2023 — Present',
        }))
      : defaultExperiences

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      const mm = gsap.matchMedia()

      mm.add(motionOk, () => {
        gsap.from(q('.job'), {
          yPercent: 40,
          opacity: 0,
          duration: 1,
          ease: 'expo.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: q('.jobs')[0],
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        })

        const track = q('.marquee-track')[0] as HTMLElement
        if (track) {
          const loop = gsap.to(track, {
            xPercent: -50,
            duration: 38,
            ease: 'none',
            repeat: -1,
            paused: false,
          })

          ScrollTrigger.create({
            trigger: q('.marquee')[0],
            start: 'top bottom',
            end: 'bottom top',
            onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
            onUpdate: (self) => {
              const direction = self.direction
              const boost = Math.min(Math.abs(self.getVelocity()) / 250, 4)
              gsap.to(loop, {
                timeScale: direction * (1 + boost),
                duration: 0.25,
                overwrite: true,
                onComplete: () => {
                  gsap.to(loop, {
                    timeScale: direction,
                    duration: 0.9,
                    ease: 'power2.out',
                  })
                },
              })
            },
          })
        }
      })
    },
    { scope: root }
  )

  return (
    <section
      ref={root}
      id="experience"
      aria-labelledby="experience-title"
      className="overflow-hidden py-[clamp(6rem,16vh,11rem)]"
    >
      <div className="grid gap-10 px-5 md:grid-cols-12 md:px-10">
        <div className="md:col-span-4">
          <h2 id="experience-title" className="display text-[clamp(2.75rem,5.4vw,5.5rem)]">
            Experience
          </h2>
          <p className="mt-5 max-w-[30ch] text-[17px] leading-relaxed text-muted-foreground">
            Years of delivering reliable full-stack applications, scalable backend microservices, and
            polished user interfaces.
          </p>
        </div>

        <ol className="jobs md:col-span-8 md:col-start-5">
          {experiences.map((job) => (
            <li
              key={job.company}
              className="job grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-b border-border py-7 first:pt-0 md:grid-cols-[1.3fr_1fr_auto]"
            >
              <p className="text-[clamp(1.5rem,2.5vw,2.5rem)] font-bold leading-tight tracking-[-0.035em] [font-stretch:108%] text-foreground">
                {job.company}
              </p>
              <p className="tabular text-[15px] font-medium text-muted-foreground md:order-last">
                {job.dates}
              </p>
              <p className="col-span-2 text-[17px] text-muted-foreground md:col-span-1">{job.role}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Infinite Marquee Ticker with Velocity Boost */}
      <div className="marquee mt-[clamp(4rem,10vh,7rem)] select-none">
        <div aria-hidden="true" className="marquee-track flex w-max">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {toolkit.map((tool) => (
                <span
                  key={tool}
                  className="flex items-center whitespace-nowrap text-[clamp(2.5rem,6.5vw,6rem)] font-bold leading-[1.1] tracking-[-0.04em] [font-stretch:115%] text-foreground/80"
                >
                  <span className="px-[0.35em]">{tool}</span>
                  <span className="text-primary">/</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
