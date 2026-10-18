'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { gsap, ScrollTrigger, useGSAP, cinematic, motionOk } from '@/lib/gsap'
import { splitText } from '@/lib/split-text'
import { StarTrails } from './HeroExposure'
import { pranavNotes, NoteMarks, NoteCards } from './HeroNotes'
import { SITE } from '@/lib/site'

export function HeroSequence() {
  const root = useRef<HTMLElement>(null)
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null)

  const nameParts = SITE.name.trim().split(' ')
  const firstName = nameParts[0] || SITE.name
  const lastName = nameParts.slice(1).join(' ') || ''

  useEffect(() => {
    document.documentElement.dataset.headerTone = 'clear'
    return () => {
      delete document.documentElement.dataset.headerTone
    }
  }, [])

  useGSAP(
    () => {
      const sequence = root.current
      if (!sequence) return
      const q = gsap.utils.selector(sequence)
      const mm = gsap.matchMedia()

      mm.add(
        {
          cinematic,
          motion: motionOk,
          pointer: '(hover: hover) and (pointer: fine)',
        },
        (context) => {
          const { cinematic: isCinematic, motion, pointer } =
            context.conditions as Record<string, boolean>

          // Name rise animation
          const namePart = q('.hero-name-part')
          if (namePart.length > 0 && motion) {
            const split = splitText(namePart[0] as HTMLElement, {
              type: 'chars',
              charsClass: 'split-char',
            })
            gsap.from(split.chars, {
              yPercent: 140,
              duration: 1.25,
              ease: 'expo.out',
              stagger: 0.035,
              delay: 0.2,
            })
          }

          // Initial hero-fade lead in
          if (motion) {
            gsap.fromTo(
              q('.hero-fade'),
              { y: 26, opacity: 0 },
              { y: 0, opacity: 1, duration: 1.1, ease: 'expo.out', delay: 0.6 }
            )
          }

          // Mouse parallax on fine pointers
          if (motion && pointer) {
            const stage = q('.hero-stage')[0] as HTMLElement
            const photoLayers = q('.cover-photo')
            const typeLayers = q('.cover-type')

            const typeX = gsap.quickTo(typeLayers, 'x', { duration: 1.2, ease: 'power3.out' })
            const typeY = gsap.quickTo(typeLayers, 'y', { duration: 1.2, ease: 'power3.out' })
            const photoX = gsap.quickTo(photoLayers, 'x', { duration: 1.4, ease: 'power3.out' })
            const photoY = gsap.quickTo(photoLayers, 'y', { duration: 1.4, ease: 'power3.out' })

            const onMove = (event: PointerEvent) => {
              const box = stage.getBoundingClientRect()
              const nx = ((event.clientX - box.left) / box.width) * 2 - 1
              const ny = ((event.clientY - box.top) / box.height) * 2 - 1
              typeX(nx * -18)
              typeY(ny * -8)
              photoX(nx * 8)
              photoY(ny * 4)
            }

            const onLeave = () => {
              typeX(0)
              typeY(0)
              photoX(0)
              photoY(0)
            }

            stage.addEventListener('pointermove', onMove)
            stage.addEventListener('pointerleave', onLeave)
          }

          // Scroll Trigger for header clear tone
          ScrollTrigger.create({
            trigger: q('.hero-stage')[0],
            start: 'top top',
            end: 'bottom 10%',
            onToggle: (self) => {
              if (self.isActive) {
                document.documentElement.dataset.headerTone = 'clear'
              } else {
                delete document.documentElement.dataset.headerTone
              }
            },
          })

          if (!isCinematic) return

          // Cinematic scroll contraction: contracts into window, splits name, and brings in story
          sequence.dataset.cinematic = 'true'
          const timeline = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: q('.hero-pin')[0],
              start: 'top top',
              end: '+=160%',
              pin: true,
              scrub: 0.9,
              anticipatePin: 1,
            },
          })

          timeline
            .to(q('.hero-frame'), { clipPath: 'inset(9% 32% 9% 32% round 28px)', duration: 1 }, 0)
            .fromTo(q('.hero-image'), { scale: 1.1 }, { scale: 1, duration: 1 }, 0)
            .to(q('.hero-first'), { xPercent: -55, opacity: 0, duration: 0.6, ease: 'power2.in' }, 0)
            .to(q('.hero-last'), { xPercent: 55, opacity: 0, duration: 0.6, ease: 'power2.in' }, 0)
            .to(q('.hero-lead'), { y: -30, opacity: 0, duration: 0.3, ease: 'power1.in' }, 0)
            .to(q('.note-overlay'), { autoAlpha: 0, duration: 0.2, ease: 'power1.in' }, 0)
            .to(q('.hero-scrim'), { autoAlpha: 0, duration: 0.6 }, 0.15)
            .fromTo(
              q('.statement-then .statement-line'),
              { y: 60, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.35, ease: 'power3.out' },
              0.6
            )
            .fromTo(
              q('.statement-now .statement-line'),
              { y: 60, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.35, ease: 'power3.out' },
              0.68
            )
            .fromTo(
              q('.statement-detail'),
              { y: 28, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' },
              0.88
            )
            .to({}, { duration: 0.3 })

          return () => {
            delete sequence.dataset.cinematic
          }
        }
      )
    },
    { scope: root }
  )

  return (
    <section
      ref={root}
      className="hero-sequence relative"
      aria-labelledby="home-title"
      data-note={activeNoteId || undefined}
    >
      <div className="hero-pin relative bg-background">
        <div className="hero-stage relative h-[100svh] min-h-[560px] overflow-hidden">
          {/* Main Hero Stage */}
          <div className="hero-media absolute inset-0">
            <div className="hero-frame absolute inset-0 overflow-hidden bg-[#0a0d0b]">
              {/* Layer 1: Background Scene & Star Trails */}
              <div className="hero-image absolute inset-0 z-0">
                <div className="cover-photo absolute inset-x-0 -top-[14%] h-[124%]">
                  <Image
                    src="/pranav/hero-bg.jpg"
                    alt={SITE.name}
                    fill
                    sizes="100vw"
                    priority
                    className="cover-layer object-cover object-[50%_0%] opacity-90"
                  />
                </div>
              </div>

              {/* <StarTrails /> */}

              {/* Layer 2: Display Typography (behind cutout portrait) */}
              <div className="cover-type pointer-events-none absolute inset-x-0 px-5 text-[#f4f4f1] md:px-10 z-10">
                <h1
                  id="home-title"
                  className="whitespace-nowrap text-[15vw] font-[820] uppercase leading-[0.8] tracking-[-0.02em] [font-stretch:125%] md:text-center md:text-[calc((100vw-6rem)/10.45)]"
                >
                  <span className="sr-only normal-case">{SITE.name}</span>
                  <span aria-hidden="true" className="hero-first block md:inline-block">
                    <span className="hero-name-part block md:inline-block">{firstName.toUpperCase()}</span>
                  </span>{' '}
                  {lastName && (
                    <span aria-hidden="true" className="hero-last block md:inline-block">
                      <span className="hero-name-part block md:inline-block">{lastName.toUpperCase()}</span>
                    </span>
                  )}
                </h1>
              </div>

              {/* Layer 3: Foreground Cutout Subject */}
              <div className="hero-image pointer-events-none absolute inset-0 z-20">
                <div className="cover-photo absolute inset-x-0 -top-[14%] h-[124%]">
                  <Image
                    src="/pranav/hero.png"
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="100vw"
                    priority
                    className="cover-layer object-cover object-[50%_0%]"
                  />
                </div>
              </div>

              {/* Scrim Gradient */}
              <div className="hero-scrim pointer-events-none absolute inset-0 z-[25] bg-[linear-gradient(180deg,rgb(10_13_11/0.4)_0%,rgb(10_13_11/0)_20%,rgb(10_13_11/0)_50%,rgb(10_13_11/0.88)_100%)]" />

              {/* Note Marks */}
              <div
                aria-hidden="true"
                className="note-pins hero-image pointer-events-none absolute inset-0 z-30 hidden lg:block"
              >
                <div className="cover-photo absolute inset-x-0 -top-[14%] h-[124%]">
                  <div className="absolute inset-[-2%] size-[104%] [container-type:size]">
                    <div className="note-fit absolute">
                      {/* <NoteMarks notes={pranavNotes}  /> */}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Hero Lead Text & CTAs */}
          <div className="cover-copy pointer-events-none relative z-40 flex h-full flex-col justify-end px-5 pt-[calc(var(--header-height)+1.25rem)] text-[#f4f4f1] md:px-10 md:pb-10">
            <div className="mx-auto w-full max-w-7xl">
              <div className="hero-lead pointer-events-auto md:w-[28rem]">
                <div className="hero-fade">
                  <p className="mb-4 text-[15px] font-semibold md:text-base">
                    {SITE.role}{' '}
                    <span className="inline-block rounded-full bg-primary/20 px-2.5 py-0.5 text-xs text-primary font-bold">
                      {SITE.location.region}, {SITE.location.countryCode}
                    </span>
                  </p>
                  <p className="text-lg leading-snug md:text-[1.35rem]">
                    {SITE.headline}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="#selected-work"
                      className="inline-flex h-12 items-center gap-2 rounded-full bg-[#f4f4f1] px-6 text-[15px] font-semibold text-[#111315] transition-transform active:scale-[0.97] hover:bg-white"
                    >
                      View work <ArrowDown aria-hidden="true" className="size-4" strokeWidth={2} />
                    </Link>
                    <Link
                      href="/resume"
                      className="inline-flex h-12 items-center gap-2 rounded-full border border-[#f4f4f1]/60 px-6 text-[15px] font-semibold backdrop-blur-sm transition-colors hover:bg-[#f4f4f1]/12 active:scale-[0.97]"
                    >
                      Resume <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={2} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <NoteCards
            notes={pranavNotes}
            activeId={activeNoteId}
            onSelect={setActiveNoteId}
          />
        </div>

        {/* Narrative Statement flanking the contracted window on scroll */}
        <div id="my-story" className="hero-statement relative z-50 px-5 py-[clamp(5rem,14vh,9rem)] md:px-10">
          <div className="statement-then pointer-events-auto">
            <h2 className="statement-line display max-w-[12ch] text-[clamp(2.6rem,8vw,4.75rem)] tracking-[-0.03em] lg:text-[clamp(2.25rem,3.55vw,4.5rem)]">
              I began by exploring code &amp; computers.
            </h2>
          </div>
          <span aria-hidden="true" className="statement-spacer hidden" />
          <div className="statement-now pointer-events-auto mt-6 lg:mt-0">
            <p className="statement-line display max-w-[12ch] text-[clamp(2.6rem,8vw,4.75rem)] tracking-[-0.03em] text-primary lg:text-[clamp(2.25rem,3.55vw,4.5rem)]">
              Now I architect production software.
            </p>
            <div className="statement-detail mt-8 max-w-[24rem]">
              <p className="text-[17px] leading-relaxed text-muted-foreground">
                From microservices and distributed databases to fluid 60fps web applications, I bring
                clarity and momentum to complex problems.
              </p>
              <Link
                href="/work"
                className="mt-5 inline-flex items-center gap-1.5 text-[17px] font-semibold text-foreground underline decoration-1 underline-offset-[6px] hover:decoration-2 cursor-pointer pointer-events-auto relative z-10"
              >
                Explore all engineering work{' '}
                <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
