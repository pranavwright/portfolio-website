'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { gsap, useGSAP, motionOk } from '@/lib/gsap'
import { SanityImage } from '@/components/ui/SanityImage'
import type { SanityImage as SanityImageType } from '@/sanity/types'

const interests = [
  {
    title: 'Photography & Framing',
    text: 'Deciding what belongs inside the frame and what to leave out trains my eye for layout clarity.',
  },
  {
    title: 'Autonomous Systems & AI',
    text: 'Prototyping agentic workflows, MCP server tools, and LLM-assisted codebases.',
  },
  {
    title: 'Distributed Systems',
    text: 'Exploring CRDTs, consensus protocols, and offline-first edge database replication.',
  },
  {
    title: 'Physical Discipline',
    text: 'Staying active keeps my mind razor-sharp and resilient for tackling hard problems.',
  },
]

interface BeyondSectionProps {
  photo?: SanityImageType | null
  alt?: string
}

export function BeyondSection({ photo, alt }: BeyondSectionProps = {}) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      const mm = gsap.matchMedia()

      mm.add(motionOk, () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: q('.beyond-photo')[0],
              start: 'top 88%',
              end: 'top 30%',
              scrub: 0.8,
            },
          })
          .fromTo(
            q('.beyond-photo'),
            { clipPath: 'inset(18% 10% 18% 10% round 20px)' },
            { clipPath: 'inset(0% 0% 0% 0% round 20px)', ease: 'none' },
            0
          )
          .fromTo(q('.beyond-photo-img'), { scale: 1.25 }, { scale: 1, ease: 'none' }, 0)

        gsap.from(q('.interest'), {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: q('.interests')[0],
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    },
    { scope: root }
  )

  return (
    <section
      ref={root}
      id="beyond-work"
      aria-labelledby="beyond-title"
      className="px-5 py-[clamp(5rem,14vh,10rem)] md:px-10"
    >
      <div className="max-w-7xl mx-auto grid gap-12 md:grid-cols-12 md:items-center md:gap-8">
        <figure className="beyond-photo relative overflow-hidden rounded-[20px] aspect-[4/3] md:col-span-5 md:w-full shadow-2xl">
          <SanityImage
            image={photo}
            fallbackSrc="/achivements/presentation-KSDMA.jpg"
            alt={alt || photo?.alt || 'Pranav presenting at technical conference'}
            fill
            sizes="(max-width: 768px) 100vw, 42vw"
            className="beyond-photo-img object-cover object-[50%_35%]"
          />
        </figure>

        <div className="md:col-span-6 md:col-start-7">
          <h2 id="beyond-title" className="display text-[clamp(3rem,7vw,6.5rem)]">
            Still curious.
          </h2>
          <p className="mt-6 max-w-[34ch] text-[clamp(1.2rem,1.6vw,1.5rem)] leading-snug text-muted-foreground">
            Not everything needs to become a client project. Some problems are just worth a closer look.
          </p>

          <dl className="interests mt-12 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
            {interests.map((interest) => (
              <div key={interest.title} className="interest border-t border-foreground/30 pt-4">
                <dt className="text-xl font-bold tracking-[-0.02em] [font-stretch:108%] text-foreground">
                  {interest.title}
                </dt>
                <dd className="mt-1.5 text-[16px] leading-relaxed text-muted-foreground">
                  {interest.text}
                </dd>
              </div>
            ))}
          </dl>

          <Link
            href="/about"
            className="mt-12 inline-flex items-center gap-1.5 text-[17px] font-semibold text-foreground underline decoration-1 underline-offset-[6px] hover:decoration-2"
          >
            More about my background{' '}
            <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  )
}
