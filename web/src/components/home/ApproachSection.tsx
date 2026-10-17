'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { gsap, useGSAP, motionOk } from '@/lib/gsap'
import { splitText } from '@/lib/split-text'

const practiceItems = [
  {
    title: 'Architecture & Systems',
    text: 'I design robust data models, clear API boundaries, and distributed services that remain fast as product complexity scales.',
    tools: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'GraphQL'],
  },
  {
    title: 'Full-Stack Engineering',
    text: 'Building end-to-end features with high velocity—from database queries and caching layers to responsive UI components.',
    tools: ['React', 'Python', 'Tailwind CSS', 'Sanity CMS', 'REST APIs', 'Cloudflare'],
  },
  {
    title: 'Interface & Motion Craft',
    text: 'Every transition should communicate state and reduce cognitive load. Thoughtful micro-interactions make software a pleasure to use.',
    tools: ['GSAP', 'Framer Motion', 'Three.js', 'Lenis', 'Figma', 'Web APIs'],
  },
]

export function ApproachSection() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      const mm = gsap.matchMedia()

      mm.add(motionOk, () => {
        const titleEl = q('.approach-text')[0] as HTMLElement
        if (titleEl) {
          const split = splitText(titleEl, {
            type: 'words',
            wordsClass: 'split-word',
          })

          gsap.fromTo(
            split.words,
            { opacity: 0.14 },
            {
              opacity: 1,
              ease: 'none',
              stagger: 0.1,
              scrollTrigger: {
                trigger: titleEl,
                start: 'top 82%',
                end: 'bottom 58%',
                scrub: 0.6,
              },
            }
          )
        }

        gsap.from(q('.approach-chip'), {
          scale: 0.4,
          rotate: -8,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: q('.approach-chip')[0],
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.6,
          },
        })

        gsap.from(q('.practice-item'), {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: 'expo.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: q('.practice')[0],
            start: 'top 80%',
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
      id="my-approach"
      aria-labelledby="approach-title"
      className="px-5 py-[clamp(6rem,18vh,13rem)] md:px-10"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          id="approach-title"
          className="approach-text max-w-[22ch] text-[clamp(2.1rem,5.3vw,5.8rem)] font-[640] leading-[1.02] tracking-[-0.038em]"
        >
          Engineering is communication. I build functional prototypes early, so everyone in the room
          sees the product through the same{' '}
          <span className="approach-chip relative -top-[0.06em] mx-[0.08em] inline-block h-[0.82em] w-[1.5em] overflow-hidden rounded-full align-middle border border-border shadow-md">
            <Image
              src="/pranav/pranav-v-1-STYLE.jpg"
              alt=""
              fill
              className="size-full object-cover"
            />
          </span>{' '}
          lens.
        </h2>

        <div className="practice mt-[clamp(4.5rem,12vh,9rem)] grid gap-12 md:grid-cols-3 md:gap-8">
          {practiceItems.map((item) => (
            <article key={item.title} className="practice-item border-t border-foreground/30 pt-6">
              <h3 className="text-[clamp(1.75rem,2.6vw,2.4rem)] font-bold tracking-[-0.03em] [font-stretch:110%] text-foreground">
                {item.title}
              </h3>
              <p className="mt-4 max-w-[34ch] text-[17px] leading-relaxed text-muted-foreground">
                {item.text}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${item.title} toolkit`}>
                {item.tools.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-full border border-border px-3 py-1.5 text-[13px] font-medium text-foreground/80 hover:border-primary/50 transition-colors"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
