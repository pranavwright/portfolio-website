'use client'

import React, { useRef } from 'react'
import { gsap, useGSAP, motionOk } from '@/lib/gsap'

interface Endorsement {
  text: string
  highlight: string
  role: string
  more?: string
}

const endorsements: Endorsement[] = [
  {
    role: 'Engineering Lead',
    text: 'Pranav consistently engineers resilient solutions, cutting latency and eliminating regressions across critical workflows.',
    highlight: 'consistently engineers resilient solutions',
    more: 'He has an exceptional ability to grasp complex backend logic and translate it into clean, maintainable systems without cutting corners.',
  },
  {
    role: 'Product Manager',
    text: 'One of the most proactive and reliable developers I have worked with. He asks the right architectural questions before writing code.',
    highlight: 'asks the right architectural questions',
  },
  {
    role: 'Senior Frontend Dev',
    text: 'His attention to interaction craft, framerate stability, and micro-interactions sets his work apart in every deliverable.',
    highlight: 'attention to interaction craft',
  },
  {
    role: 'Technical Architect',
    text: 'Pranav took ownership of our distributed sync pipeline and delivered zero-data-loss guarantees under intense load.',
    highlight: 'delivered zero-data-loss guarantees',
  },
  {
    role: 'Full-Stack Collaborator',
    text: 'He bridges design and deep engineering seamlessly, building functional prototypes that accelerate team consensus.',
    highlight: 'bridges design and deep engineering',
  },
]

const tilts = [-1.1, 1.3, -0.8, 1.1, -1.2]
const spans = [
  'md:col-span-6 lg:col-span-7 lg:row-span-2',
  'md:col-span-6 lg:col-span-5',
  'md:col-span-6 lg:col-span-5',
  'md:col-span-6 lg:col-span-6',
  'md:col-span-6 lg:col-span-6',
]

function Marked({ text, highlight }: { text: string; highlight: string }) {
  const at = text.indexOf(highlight)
  if (at < 0) return <>{text}</>
  return (
    <>
      {text.slice(0, at)}
      <mark className="word-mark">{highlight}</mark>
      {text.slice(at + highlight.length)}
    </>
  )
}

export function InTheirWords() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      const mm = gsap.matchMedia()

      mm.add(motionOk, () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: q('.words-board')[0],
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          })
          .from(q('.word-card'), {
            y: 80,
            opacity: 0,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.08,
          })
          .fromTo(
            q('.word-mark'),
            { '--mark': '0%' },
            { '--mark': '100%', duration: 0.7, ease: 'power2.inOut', stagger: 0.12 },
            0.5
          )
      })
    },
    { scope: root }
  )

  return (
    <section
      ref={root}
      id="in-their-words"
      aria-labelledby="words-title"
      className="px-5 py-[clamp(6rem,16vh,11rem)] md:px-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-8">
          <h2 id="words-title" className="display text-[clamp(2.75rem,5.4vw,5.5rem)] md:col-span-7">
            In their words.
          </h2>
          <p className="max-w-[36ch] text-[17px] leading-relaxed text-muted-foreground md:col-span-4 md:col-start-9">
            Feedback and observations from engineers, product leads, and partners I collaborate with.
          </p>
        </div>

        <div className="words-board mt-[clamp(3rem,8vh,5rem)] rounded-[28px] border border-border p-4 sm:p-6 md:p-10">
          <ul className="grid gap-5 md:grid-cols-6 md:gap-6 lg:grid-cols-12">
            {endorsements.map((card, index) => (
              <li
                key={card.text}
                className={`word-card ${spans[index]}`}
                style={{ '--tilt': `${tilts[index % tilts.length]}deg` } as React.CSSProperties}
              >
                <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-xl transition-[transform] duration-500 ease-expo md:rotate-[var(--tilt)] md:p-7 md:hover:-translate-y-1.5 md:hover:rotate-0">
                  <figcaption>
                    <span className="inline-block rounded-[4px] bg-primary px-2 py-1 text-[12px] font-semibold leading-none text-primary-foreground">
                      {card.role}
                    </span>
                  </figcaption>
                  <blockquote
                    className={`mt-5 ${
                      index === 0
                        ? 'text-[clamp(1.5rem,2.4vw,2.2rem)] font-semibold leading-[1.18] tracking-[-0.02em]'
                        : 'text-[17px] leading-relaxed'
                    }`}
                  >
                    “<Marked text={card.text} highlight={card.highlight} />”
                  </blockquote>
                  {card.more && (
                    <p className="mt-auto pt-6 text-[16px] leading-relaxed text-muted-foreground">
                      “{card.more}”
                    </p>
                  )}
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
