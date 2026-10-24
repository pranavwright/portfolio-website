import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Calendar, MapPin } from 'lucide-react'
import { getSkills, getExperience, getAchievements, getProfile } from '@/sanity/fetch'
import { SanityImage } from '@/components/ui/SanityImage'
import { urlForImage } from '@/sanity/image'
import { formatDate } from '@/lib/utils'
import { SITE } from '@/lib/site'

export const revalidate = 60

export const metadata: Metadata = {
  title: `About — ${SITE.name}`,
  description: `Background, origin story, engineering philosophy, and career history of ${SITE.name}.`,
}

export default async function AboutPage() {
  const [skills, experience, achievements, profile] = await Promise.all([
    getSkills(),
    getExperience(),
    getAchievements(),
    getProfile().catch(() => null),
  ])

  const name = SITE.name


  const storySections = [
    {
      heading: 'The Origin',
      body: 'I started programming out of raw curiosity—wondering how pixels, network packets, and operating systems connected under the hood. Building my first local tools and scripts showed me the power of transforming abstract logic into tangible software.',
    },
    {
      heading: 'From Code to Architecture',
      body: 'As projects grew in scope, my focus expanded from writing standalone algorithms to architecting distributed platforms: designing clean schemas, managing concurrent state, and building resilient API boundaries that hold up under real-world traffic.',
    },
    {
      heading: 'The Engineering Philosophy',
      body: 'I believe the best software is built through empathy and communication. Prototyping in functional code early cuts through ambiguity, validates feasibility, and gives stakeholders a shared, concrete perspective.',
    },
    {
      heading: 'Craft & Motion',
      body: 'Performance is a feature. Fluid 60fps transitions, instant perceived latency, and thoughtful micro-interactions aren’t superficial decorations—they communicate interface hierarchy and make using a digital product an absolute pleasure.',
    },
  ]

  return (
    <div className="pt-[calc(var(--header-height)+clamp(2rem,8vh,5rem))] pb-[clamp(5rem,14vh,10rem)]">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Opening */}
      <section className="grid gap-12 px-5 md:grid-cols-12 md:gap-8 md:px-10">
        <div className="flex flex-col justify-end md:col-span-7">
          <h1 className="display max-w-[12ch] text-[clamp(3.25rem,7.6vw,7.5rem)] leading-[0.86] text-foreground">
            Curiosity brought me here.
          </h1>
          <p className="mt-8 max-w-[44ch] text-[clamp(1.2rem,1.7vw,1.55rem)] leading-snug text-muted-foreground">
            I’m {name}, a full-stack engineer and product builder from Kerala, India. I build practical software, scalable systems, and intuitive user experiences with high craft.
          </p>
        </div>

        <figure className="relative aspect-[4/5] overflow-hidden rounded-[20px] md:col-span-5 shadow-2xl">
          <SanityImage
            image={profile?.aboutImage}
            fallbackSrc="/pranav/about.jpg"
            alt={profile?.aboutImage?.alt || name}
            fill
            sizes="(max-width: 768px) 100vw, 42vw"
            priority
            className="object-cover object-[50%_15%]"
          />
        </figure>
      </section>

      {/* The Story Chapters */}
      <section aria-label="My story" className="px-5 pt-[clamp(5rem,14vh,9rem)] md:px-10">
        {storySections.map((item) => (
          <div
            key={item.heading}
            className="grid gap-4 border-t border-border py-10 md:grid-cols-12 md:gap-8"
          >
            <h2 className="text-[clamp(1.6rem,2.4vw,2.2rem)] font-bold leading-tight tracking-[-0.025em] [font-stretch:108%] text-foreground md:col-span-4">
              {item.heading}
            </h2>
            <p className="max-w-[58ch] text-[clamp(1.1rem,1.35vw,1.3rem)] leading-relaxed text-muted-foreground md:col-span-7 md:col-start-6">
              {item.body}
            </p>
          </div>
        ))}
      </section>

      {/* Career Timeline */}
      <section aria-labelledby="career-title" className="px-5 pt-[clamp(5rem,14vh,9rem)] md:px-10">
        <h2 id="career-title" className="display text-[clamp(2.75rem,5.4vw,5.5rem)] text-foreground">
          Career
        </h2>

        <div className="mt-12 space-y-12">
          {experience.length > 0 ? (
            experience.map((item) => (
              <div
                key={item._id}
                className="grid gap-4 border-t border-border pt-8 md:grid-cols-12 md:gap-8"
              >
                <div className="md:col-span-4">
                  <p className="text-xl font-bold text-foreground">{item.organization}</p>
                  <p className="text-sm font-medium text-muted-foreground tabular mt-1">
                    {item.startDate ? new Date(item.startDate).getFullYear() : '2023'} — {item.isCurrent ? 'Present' : item.endDate ? new Date(item.endDate).getFullYear() : 'Now'}
                  </p>
                </div>
                <div className="md:col-span-7 md:col-start-6">
                  <p className="text-lg font-semibold text-primary">{item.role}</p>
                  {item.achievements && item.achievements.length > 0 ? (
                    <ul className="mt-3 space-y-2 text-muted-foreground text-[16px]">
                      {item.achievements.map((r, i) => (
                        <li key={i} className="pl-4 relative before:absolute before:left-0 before:top-2.5 before:size-1.5 before:bg-primary before:rounded-full">
                          {r}
                        </li>
                      ))}
                    </ul>
                  ) : item.description ? (
                    <p className="mt-2 text-muted-foreground text-[16px] leading-relaxed">
                      {item.description}
                    </p>
                  ) : null}
                </div>
              </div>
            ))
          ) : (
            <div className="border-t border-border pt-8 grid md:grid-cols-12 md:gap-8">
              <div className="md:col-span-4">
                <p className="text-xl font-bold text-foreground">Independent Developer</p>
                <p className="text-sm font-medium text-muted-foreground tabular mt-1">
                  2023 — Present
                </p>
              </div>
              <div className="md:col-span-7 md:col-start-6">
                <p className="text-lg font-semibold text-primary">Full-Stack &amp; Systems Architecture</p>
                <p className="mt-2 text-muted-foreground text-[16px] leading-relaxed">
                  Building distributed web applications, collaborating with teams on critical workflows, and delivering end-to-end software solutions.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Key Milestones & Achievements */}
      {achievements && achievements.length > 0 && (
        <section aria-labelledby="milestones-title" className="px-5 pt-[clamp(5rem,14vh,9rem)] md:px-10">
          <h2 id="milestones-title" className="display text-[clamp(2.75rem,5.4vw,5.5rem)] text-foreground">
            Milestones
          </h2>
          <div className="mt-12 space-y-8">
            {achievements.map((item) => (
              <div
                key={item._id}
                className="grid gap-4 border-t border-border pt-8 md:grid-cols-12 md:gap-8"
              >
                <div className="md:col-span-4">
                  <p className="text-xl font-bold text-foreground">{item.title}</p>
                  <p className="text-sm font-medium text-primary capitalize mt-1">
                    {item.category} {item.date ? `• ${new Date(item.date).getFullYear()}` : ''}
                  </p>
                </div>
                <div className="md:col-span-7 md:col-start-6">
                  {item.description && (
                    <p className="text-muted-foreground text-[16px] leading-relaxed">
                      {item.description}
                    </p>
                  )}
                  {item.evidenceUrl && (
                    <a
                      href={item.evidenceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                    >
                      View verification / evidence <ArrowUpRight className="size-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Media & Moments Gallery (from Sanity CMS) */}
      {profile?.mediaGallery && profile.mediaGallery.length > 0 && (
        <section aria-labelledby="gallery-title" className="px-5 pt-[clamp(5rem,14vh,9rem)] md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-border">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Visual Archive</p>
              <h2 id="gallery-title" className="display text-[clamp(2.5rem,5vw,4.5rem)] text-foreground mt-2">
                Moments & Engagements
              </h2>
            </div>
            <p className="max-w-[40ch] text-[15px] leading-relaxed text-muted-foreground">
              Documented milestones, presentations, technical talks, and engineering highlights.
            </p>
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {profile.mediaGallery.map((item) => (
              <figure
                key={item._key}
                className="group flex flex-col overflow-hidden rounded-[20px] border border-border bg-card p-4 transition-all hover:border-foreground/30 hover:shadow-xl"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[14px]">
                  <SanityImage
                    image={item.image}
                    alt={item.alt || item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {item.category && (
                    <span className="absolute top-3 left-3 rounded-full bg-background/80 backdrop-blur-md px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-foreground border border-border/50">
                      {item.category}
                    </span>
                  )}
                </div>
                <figcaption className="mt-4 flex flex-col flex-grow">
                  <h3 className="text-base font-bold text-foreground leading-snug">
                    {item.title}
                  </h3>
                  {item.caption && (
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-grow">
                      {item.caption}
                    </p>
                  )}
                  <div className="mt-4 flex items-center gap-4 text-xs font-medium text-muted-foreground pt-3 border-t border-border/50">
                    {item.date && (
                      <span className="inline-flex items-center gap-1">
                        <Calendar aria-hidden="true" className="size-3.5" />
                        <span>{formatDate(item.date)}</span>
                      </span>
                    )}
                    {item.location && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin aria-hidden="true" className="size-3.5" />
                        <span>{item.location}</span>
                      </span>
                    )}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Short Version & Resume Callout */}
      <section className="px-5 py-[clamp(5rem,14vh,9rem)] md:px-10">
        <div className="rounded-[28px] border border-border p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8 bg-card">
          <div>
            <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-foreground">
              Looking for the short version?
            </h2>
            <p className="mt-3 max-w-[40ch] text-[17px] leading-relaxed text-muted-foreground">
              Review my skills, experience, and achievements on one concise page with a downloadable PDF.
            </p>
          </div>
          <Link
            href="/resume"
            className="inline-flex h-14 items-center gap-2 rounded-full bg-primary px-8 text-[16px] font-semibold text-primary-foreground transition-transform active:scale-[0.97] shadow-xl hover:opacity-95 whitespace-nowrap self-start md:self-auto"
          >
            Read my resume <ArrowUpRight aria-hidden="true" className="size-5" strokeWidth={2} />
          </Link>
        </div>
      </section>
      </div>

      {/* Structured Schema.org ProfilePage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfilePage',
            '@id': `${SITE.url}/about#profilepage`,
            url: `${SITE.url}/about`,
            name: `About ${SITE.name}`,
            description: profile?.bio || SITE.seo.description,
            primaryImageOfPage: {
              '@type': 'ImageObject',
              url:
                (profile?.aboutImage ? urlForImage(profile.aboutImage)?.url() : null) ||
                `${SITE.url}/pranav/about.jpg`,
              caption: profile?.aboutImage?.caption || `About ${SITE.name}`,
              description: profile?.aboutImage?.alt || SITE.name,
            },
            mainEntity: {
              '@type': 'Person',
              '@id': SITE.aeo.entityId,
              name: SITE.name,
              jobTitle: profile?.headline || SITE.role,
              description: profile?.bio || SITE.seo.description,
              url: SITE.url,
            },
            ...(profile?.mediaGallery && profile.mediaGallery.length > 0
              ? {
                  hasPart: profile.mediaGallery.map((m) => ({
                    '@type': 'ImageObject',
                    name: m.title,
                    caption: m.caption,
                    description: m.alt,
                    contentUrl: urlForImage(m.image)?.url(),
                    datePublished: m.date,
                    contentLocation: m.location,
                  })),
                }
              : {}),
          }),
        }}
      />
    </div>
  )
}

