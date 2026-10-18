import React from 'react'
import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  Layers,
  CheckCircle,
  HelpCircle,
  ShieldCheck,
  ArrowUpRight,
} from 'lucide-react'
import {getProjectBySlug, getProjectSlugs} from '@/sanity/fetch'
import {StatusBadge} from '@/components/ui/StatusBadge'
import {TechBadge} from '@/components/ui/TechBadge'
import {PortableTextRenderer} from '@/components/ui/PortableTextRenderer'
import {urlForImage} from '@/sanity/image'
import {formatDate} from '@/lib/utils'
import {SITE} from '@/lib/site'

export const revalidate = 60

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({params}: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug)
  if (!project) return {}

  const title = project.seoTitle || `${project.title} — Case Study`
  const description = project.seoDescription || project.summary
  const imageUrl = urlForImage(project.featuredImage)?.width(1200).height(630).url()

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      images: imageUrl ? [{url: imageUrl, width: 1200, height: 630, alt: project.title}] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

export async function generateStaticParams() {
  const slugs = await getProjectSlugs()
  return slugs.map((item) => ({slug: item.slug}))
}

export default async function ProjectDetailPage({params}: ProjectPageProps) {
  const project = await getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  const projectFallbackImages: Record<string, string> = {
    'nowme-live': '/project/project-1.png',
    'realsq': '/project/project-2.png',
    'carryko': '/project/project-3.png',
  }

  const featuredImageUrl =
    (project.featuredImage ? urlForImage(project.featuredImage)?.width(1400).height(800).url() : null) ||
    projectFallbackImages[project.slug?.current] ||
    '/project/project-1.png'

  return (
    <article className="pt-[calc(var(--header-height)+clamp(2rem,8vh,5rem))] pb-[clamp(5rem,14vh,10rem)]">
      <div className="max-w-7xl mx-auto">
        {/* Back Link */}
      <section className="px-5 md:px-10">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={2} />
          <span>Back to all projects</span>
        </Link>
      </section>

      {/* Project Header */}
      <header className="px-5 pt-[clamp(2rem,4vh,3rem)] md:px-10">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <StatusBadge status={project.status} />
          {project.category && (
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground capitalize">
              {project.category.replace('-', ' ')}
            </span>
          )}
          {project.startDate && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Calendar aria-hidden="true" className="size-4" />
              <span>
                {formatDate(project.startDate)}
                {project.endDate ? ` — ${formatDate(project.endDate)}` : ' — Present'}
              </span>
            </span>
          )}
        </div>

        <h1 className="display text-[clamp(3.25rem,7.6vw,7.5rem)] leading-[0.86] text-foreground">
          {project.title}
        </h1>

        <p className="mt-8 max-w-[48ch] text-[clamp(1.2rem,1.7vw,1.6rem)] leading-snug text-muted-foreground">
          {project.summary}
        </p>
      </header>

      {/* Quick Meta Row */}
      <section className="px-5 pt-[clamp(3rem,6vh,5rem)] md:px-10">
        <div className="grid gap-4 border-t border-border py-10 md:grid-cols-12 md:gap-8">
          {project.role && (
            <div className="md:col-span-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Role</p>
              <p className="text-[17px] font-semibold text-foreground mt-2">
                {project.role}
              </p>
            </div>
          )}
          {project.status && (
            <div className="md:col-span-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</p>
              <p className="text-[17px] font-semibold text-foreground mt-2 capitalize">
                {project.status}
              </p>
            </div>
          )}
          {project.liveUrl && (
            <div className="md:col-span-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Deployment</p>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[17px] font-semibold text-primary hover:opacity-85 transition-opacity mt-2"
              >
                <span>Live Preview</span>
                <ExternalLink aria-hidden="true" className="size-4" />
              </a>
            </div>
          )}
          {project.repositoryUrl && (
            <div className="md:col-span-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Code</p>
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[17px] font-semibold text-muted-foreground hover:text-foreground mt-2 transition-colors"
              >
                <Github aria-hidden="true" className="size-4" />
                <span>Repository</span>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Featured Cover Image */}
      {featuredImageUrl && (
        <section className="px-5 md:px-10">
          <figure className="relative aspect-[16/9] overflow-hidden rounded-[20px] shadow-2xl">
            <Image
              src={featuredImageUrl}
              alt={project.featuredImage?.alt || project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 100vw"
              priority
              className="object-cover"
            />
          </figure>
        </section>
      )}

      {/* Problem & Solution Comparison */}
      {(project.problem || project.solution) && (
        <section className="px-5 pt-[clamp(5rem,14vh,9rem)] md:px-10">
          <div className="grid gap-8 md:grid-cols-12">
            {project.problem && (
              <div className="md:col-span-6 grid gap-4 border-t border-border py-10">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500">
                  <HelpCircle aria-hidden="true" className="size-4" />
                  <span>The Real-World Problem</span>
                </div>
                <p className="text-[17px] text-muted-foreground leading-relaxed max-w-[48ch]">
                  {project.problem}
                </p>
              </div>
            )}

            {project.solution && (
              <div className="md:col-span-6 grid gap-4 border-t border-border py-10">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                  <ShieldCheck aria-hidden="true" className="size-4" />
                  <span>The Engineered Solution</span>
                </div>
                <p className="text-[17px] text-muted-foreground leading-relaxed max-w-[48ch]">
                  {project.solution}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Key Features */}
      {project.features && project.features.length > 0 && (
        <section aria-labelledby="features-title" className="px-5 pt-[clamp(5rem,14vh,9rem)] md:px-10">
          <h2 id="features-title" className="display text-[clamp(2.75rem,5.4vw,5.5rem)] text-foreground">
            Core Capabilities
          </h2>
          <div className="mt-10 space-y-0">
            {project.features.map((feat, idx) => (
              <div
                key={idx}
                className="grid gap-4 border-t border-border py-6 md:grid-cols-12 md:gap-8"
              >
                <div className="md:col-span-1 flex items-start">
                  <CheckCircle aria-hidden="true" className="size-5 text-primary mt-0.5" />
                </div>
                <p className="md:col-span-10 text-[17px] text-muted-foreground leading-relaxed max-w-[64ch]">
                  {feat}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Detailed Portable Text Description */}
      {project.description && (
        <section aria-labelledby="overview-title" className="px-5 pt-[clamp(5rem,14vh,9rem)] md:px-10">
          <h2 id="overview-title" className="display text-[clamp(2.75rem,5.4vw,5.5rem)] text-foreground">
            Overview
          </h2>
          <div className="mt-10 grid md:grid-cols-12 md:gap-8">
            <div className="md:col-span-7 md:col-start-1">
              <PortableTextRenderer value={project.description} />
            </div>
          </div>
        </section>
      )}

      {/* Technical Architecture */}
      {project.architecture && (
        <section aria-labelledby="arch-title" className="px-5 pt-[clamp(5rem,14vh,9rem)] md:px-10">
          <h2 id="arch-title" className="display text-[clamp(2.75rem,5.4vw,5.5rem)] text-foreground">
            Architecture
          </h2>
          <div className="mt-10 grid md:grid-cols-12 md:gap-8">
            <div className="md:col-span-7 md:col-start-1">
              <PortableTextRenderer value={project.architecture} />
            </div>
          </div>
        </section>
      )}

      {/* Challenges & Solutions */}
      {project.technicalChallenges && (
        <section aria-labelledby="challenges-title" className="px-5 pt-[clamp(5rem,14vh,9rem)] md:px-10">
          <h2 id="challenges-title" className="display text-[clamp(2.75rem,5.4vw,5.5rem)] text-foreground">
            Challenges
          </h2>
          <div className="mt-10 grid md:grid-cols-12 md:gap-8">
            <div className="md:col-span-7 md:col-start-1">
              <PortableTextRenderer value={project.technicalChallenges} />
            </div>
          </div>
        </section>
      )}

      {/* Results & Milestones */}
      {project.results && (
        <section className="px-5 pt-[clamp(5rem,14vh,9rem)] md:px-10">
          <div className="rounded-[28px] border border-primary/30 p-8 md:p-12 bg-card">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
              <Layers aria-hidden="true" className="size-4" />
              <span>Verified Results &amp; Impact</span>
            </div>
            <p className="text-[clamp(1.2rem,1.7vw,1.6rem)] leading-snug text-foreground max-w-[48ch]">
              {project.results}
            </p>
          </div>
        </section>
      )}

      {/* Technology Stack Tags */}
      {project.technologies && project.technologies.length > 0 && (
        <section aria-label="Technologies used" className="px-5 pt-[clamp(5rem,14vh,9rem)] md:px-10">
          <div className="border-t border-border pt-10">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-6">
              Technologies &amp; Systems Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <TechBadge key={tech} name={tech} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section aria-labelledby="gallery-title" className="px-5 pt-[clamp(5rem,14vh,9rem)] md:px-10">
          <h2 id="gallery-title" className="display text-[clamp(2.75rem,5.4vw,5.5rem)] text-foreground">
            Gallery
          </h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {project.gallery.map((img, idx) => {
              const url = urlForImage(img)?.width(1000).height(650).url()
              if (!url) return null
              return (
                <figure
                  key={idx}
                  className="relative aspect-[16/10] overflow-hidden rounded-[20px] shadow-2xl"
                >
                  <Image
                    src={url}
                    alt={img.alt || `${project.title} Screenshot ${idx + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 440px"
                    className="object-cover"
                  />
                </figure>
              )
            })}
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="px-5 pt-[clamp(5rem,14vh,9rem)] md:px-10">
        <div className="rounded-[28px] border border-border p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8 bg-card">
          <div>
            <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-foreground">
              Interested in this project?
            </h2>
            <p className="mt-3 max-w-[40ch] text-[17px] leading-relaxed text-muted-foreground">
              Let's discuss the architecture, technical decisions, or explore working together.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link
              href="/projects"
              className="inline-flex h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
            >
              ← All projects
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-14 items-center gap-2 rounded-full bg-primary px-8 text-[16px] font-semibold text-primary-foreground transition-transform active:scale-[0.97] shadow-xl hover:opacity-95"
            >
              Discuss this project
              <ArrowUpRight aria-hidden="true" className="size-5" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>
      </div>

      {/* Project JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: project.title,
            description: project.summary,
            image: featuredImageUrl ? [featuredImageUrl] : [],
            datePublished: project.startDate,
            dateModified: project._updatedAt || project.startDate,
            author: {
              '@type': 'Person',
              name: SITE.name,
              url: SITE.url,
            },
            publisher: {
              '@type': 'Person',
              name: SITE.name,
            },
          }),
        }}
      />
    </article>
  )
}
