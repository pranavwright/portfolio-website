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
} from 'lucide-react'
import {getProjectBySlug, getProjectSlugs} from '@/sanity/fetch'
import {StatusBadge} from '@/components/ui/StatusBadge'
import {TechBadge} from '@/components/ui/TechBadge'
import {PortableTextRenderer} from '@/components/ui/PortableTextRenderer'
import {urlForImage} from '@/sanity/image'
import {formatDate} from '@/lib/utils'

export const dynamic = 'force-dynamic'

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

  const featuredImageUrl = urlForImage(project.featuredImage)?.width(1400).height(800).url()

  return (
    <article className="pt-28 pb-32">
      <div className="max-w-4xl mx-auto px-6 space-y-16">
        {/* Back Link */}
        <div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-text-secondary hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all projects</span>
          </Link>
        </div>

        {/* Project Header */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={project.status} />
            {project.category && (
              <span className="text-xs font-mono text-text-muted capitalize">
                {project.category.replace('-', ' ')}
              </span>
            )}
            {project.startDate && (
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  {formatDate(project.startDate)}
                  {project.endDate ? ` — ${formatDate(project.endDate)}` : ' — Present'}
                </span>
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-[1.1]">
            {project.title}
          </h1>

          <p className="text-base sm:text-xl text-text-secondary leading-relaxed">
            {project.summary}
          </p>

          {/* Quick Meta Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-xl bg-surface border border-border">
            {project.role && (
              <div>
                <span className="block text-[11px] font-mono uppercase text-text-muted">Role</span>
                <span className="text-xs sm:text-sm font-medium text-text-primary mt-1 block">
                  {project.role}
                </span>
              </div>
            )}
            {project.status && (
              <div>
                <span className="block text-[11px] font-mono uppercase text-text-muted">Status</span>
                <span className="text-xs sm:text-sm font-medium text-text-primary mt-1 block capitalize">
                  {project.status}
                </span>
              </div>
            )}
            {project.liveUrl && (
              <div>
                <span className="block text-[11px] font-mono uppercase text-text-muted">Deployment</span>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-accent hover:underline mt-1"
                >
                  <span>Live Preview</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
            {project.repositoryUrl && (
              <div>
                <span className="block text-[11px] font-mono uppercase text-text-muted">Code</span>
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-text-secondary hover:text-text-primary mt-1"
                >
                  <Github className="w-3 h-3" />
                  <span>Repository</span>
                </a>
              </div>
            )}
          </div>
        </header>

        {/* Featured Cover Image */}
        {featuredImageUrl && (
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-surface border border-border shadow-2xl">
            <Image
              src={featuredImageUrl}
              alt={project.featuredImage?.alt || project.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        {/* Problem & Solution Comparison */}
        {(project.problem || project.solution) && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.problem && (
              <div className="p-6 rounded-xl bg-surface border border-border space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                  <HelpCircle className="w-4 h-4" />
                  <span>The Real-World Problem</span>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {project.problem}
                </p>
              </div>
            )}

            {project.solution && (
              <div className="p-6 rounded-xl bg-surface border border-border space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>The Engineered Solution</span>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {project.solution}
                </p>
              </div>
            )}
          </section>
        )}

        {/* Key Features */}
        {project.features && project.features.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-text-primary border-b border-border pb-3">
              Core Capabilities &amp; Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-surface/80 border border-border/80 flex items-start gap-3"
                >
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Detailed Portable Text Description */}
        {project.description && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-text-primary border-b border-border pb-3">
              Project Overview
            </h2>
            <PortableTextRenderer value={project.description} />
          </section>
        )}

        {/* Technical Architecture */}
        {project.architecture && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-text-primary border-b border-border pb-3">
              Technical Architecture &amp; Decisions
            </h2>
            <PortableTextRenderer value={project.architecture} />
          </section>
        )}

        {/* Challenges & Solutions */}
        {project.technicalChallenges && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-text-primary border-b border-border pb-3">
              Engineering Challenges &amp; Solutions
            </h2>
            <PortableTextRenderer value={project.technicalChallenges} />
          </section>
        )}

        {/* Results & Milestones */}
        {project.results && (
          <section className="p-6 rounded-xl bg-surface border border-accent-border/40 space-y-3">
            <h3 className="text-sm font-mono uppercase tracking-wider text-accent font-semibold flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>Verified Results &amp; Impact</span>
            </h3>
            <p className="text-sm text-text-primary leading-relaxed">
              {project.results}
            </p>
          </section>
        )}

        {/* Technology Stack Tags */}
        {project.technologies && project.technologies.length > 0 && (
          <section className="space-y-4 pt-4 border-t border-border">
            <h3 className="text-xs font-mono uppercase tracking-wider text-text-muted">
              Technologies &amp; Systems Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <TechBadge key={tech} name={tech} />
              ))}
            </div>
          </section>
        )}

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="space-y-6 pt-4 border-t border-border">
            <h2 className="text-2xl font-bold tracking-tight text-text-primary">
              Interface Gallery &amp; Artifacts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {project.gallery.map((img, idx) => {
                const url = urlForImage(img)?.width(1000).height(650).url()
                if (!url) return null
                return (
                  <div
                    key={idx}
                    className="relative aspect-[16/10] rounded-xl overflow-hidden bg-surface border border-border"
                  >
                    <Image
                      src={url}
                      alt={img.alt || `Screenshot ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <div className="pt-12 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            href="/projects"
            className="text-xs font-mono text-text-secondary hover:text-accent transition-colors"
          >
            ← View all projects
          </Link>

          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-medium text-background bg-accent hover:bg-accent-hover transition-colors"
          >
            <span>Discuss this project</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
