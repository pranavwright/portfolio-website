import React from 'react'
import type {Metadata} from 'next'
import Link from 'next/link'
import {
  Code2,
  Terminal,
  Database,
  Smartphone,
  Palette,
  Wrench,
  Calendar,
  Award,
  ArrowRight,
  ExternalLink,
} from 'lucide-react'
import {getSiteSettings, getSkills, getExperience, getAchievements} from '@/sanity/fetch'
import {PortableTextRenderer} from '@/components/ui/PortableTextRenderer'
import {TechBadge} from '@/components/ui/TechBadge'
import {formatDate} from '@/lib/utils'
import type {Skill} from '@/sanity/types'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'About & Background',
  description:
    'Learn about Pranav Wright (Pranav P.S.) — background in software engineering, systems design, product building, and technical skills.',
}

const categoryIcons: Record<string, React.ReactNode> = {
  frontend: <Code2 className="w-4 h-4 text-accent" />,
  backend: <Terminal className="w-4 h-4 text-accent" />,
  databases: <Database className="w-4 h-4 text-accent" />,
  mobile: <Smartphone className="w-4 h-4 text-accent" />,
  'product-design': <Palette className="w-4 h-4 text-accent" />,
  tools: <Wrench className="w-4 h-4 text-accent" />,
}

const categoryLabels: Record<string, string> = {
  frontend: 'Frontend Systems & Web',
  backend: 'Backend & High-Throughput APIs',
  databases: 'Databases & Infrastructure',
  mobile: 'Mobile Applications',
  'product-design': 'Product & UI/UX Design',
  tools: 'Security & Developer Tools',
}

export default async function AboutPage() {
  const [settings, skills, experience, achievements] = await Promise.all([
    getSiteSettings(),
    getSkills(),
    getExperience(),
    getAchievements(),
  ])

  // Group skills by category
  const skillsByCategory = skills.reduce<Record<string, Skill[]>>((acc, s) => {
    if (!acc[s.category]) acc[s.category] = []
    acc[s.category].push(s)
    return acc
  }, {})

  const name = settings?.name || 'Pranav Wright'
  const altName = settings?.alternativeName || 'Pranav P.S.'

  return (
    <div className="pt-32 pb-32">
      <div className="max-w-4xl mx-auto px-6 space-y-20">
        {/* Header */}
        <header className="space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>Background &amp; Philosophy</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-text-primary leading-[1.1]">
            Engineering software. <br />
            Designing products that work.
          </h1>

          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            I am {name} ({altName}), a developer and product builder from Kerala, India. I focus on creating reliable digital products, solving real-world operational problems, and building software that turns complex requirements into clean, intuitive experiences.
          </p>
        </header>

        {/* Editorial Narrative / Approach */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 sm:p-8 rounded-2xl bg-surface border border-border">
          <div className="space-y-2">
            <h3 className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
              01. The Problem First
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Software is only as valuable as the pain it relieves. I start by breaking down real user workflows, operational bottlenecks, and system constraints.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
              02. Thoughtful Architecture
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              From Fastify backends and MongoDB document models to Next.js App Router frontends and Flutter clients, I engineer maintainable, testable architectures.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
              03. Craft &amp; Interaction
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Performance, clear typographic hierarchy, purposeful animations (GSAP &amp; Framer Motion), and accessible controls that respect user intent.
            </p>
          </div>
        </section>

        {/* Long Biography (if provided in Sanity) */}
        {settings?.aboutBio && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-text-primary border-b border-border pb-3">
              About
            </h2>
            <PortableTextRenderer value={settings.aboutBio} />
          </section>
        )}

        {/* Technical Skills Categorized */}
        <section className="space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>Capabilities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
              Skills &amp; Technologies
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary">
              Tools and technologies I build with. Grouped by architectural area without arbitrary proficiency meters.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Object.entries(skillsByCategory).map(([catKey, catSkills]) => (
              <div
                key={catKey}
                className="p-6 rounded-xl bg-surface border border-border space-y-4 shadow-sm"
              >
                <div className="flex items-center gap-2.5 border-b border-border/70 pb-3">
                  {categoryIcons[catKey] || <Code2 className="w-4 h-4 text-accent" />}
                  <h3 className="text-sm font-semibold text-text-primary font-mono tracking-tight">
                    {categoryLabels[catKey] || catKey}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {catSkills.map((s) => (
                    <TechBadge key={s._id} name={s.name} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience & Timeline */}
        {experience.length > 0 && (
          <section className="space-y-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span>Track Record</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
                Experience &amp; Milestones
              </h2>
            </div>

            <div className="space-y-6 relative border-l border-border/80 pl-6 sm:pl-8 ml-2">
              {experience.map((exp) => (
                <div key={exp._id} className="relative space-y-3 group">
                  {/* Timeline dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3 h-3 rounded-full bg-surface border-2 border-accent" />

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-bold text-text-primary tracking-tight">
                      {exp.role}
                    </h3>
                    <span className="text-xs font-mono text-text-muted flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {formatDate(exp.startDate)} —{' '}
                        {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </span>
                  </div>

                  <div className="text-xs font-mono text-accent">
                    {exp.organization} {exp.location && `• ${exp.location}`}
                  </div>

                  {exp.description && (
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {exp.description}
                    </p>
                  )}

                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="space-y-1.5 pt-1 text-xs text-text-secondary list-disc list-inside">
                      {exp.achievements.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {exp.technologies && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {exp.technologies.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded bg-background border border-border text-[11px] font-mono text-text-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {exp.supportingUrl && (
                    <div className="pt-1">
                      <a
                        href={exp.supportingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono text-accent hover:underline"
                      >
                        <span>Evidence / Reference</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Milestones & Achievements (if any) */}
        {achievements.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-text-primary border-b border-border pb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-accent" />
              <span>Recognitions &amp; Impact</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievements.map((ach) => (
                <div key={ach._id} className="p-5 rounded-xl bg-surface border border-border space-y-2">
                  <span className="text-[11px] font-mono uppercase text-accent font-semibold block">
                    {ach.category} {ach.date && `• ${formatDate(ach.date)}`}
                  </span>
                  <h3 className="font-semibold text-text-primary text-sm">
                    {ach.title}
                  </h3>
                  {ach.description && (
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {ach.description}
                    </p>
                  )}
                  {ach.evidenceUrl && (
                    <a
                      href={ach.evidenceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono text-accent hover:underline pt-1"
                    >
                      <span>Verification</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA Footer */}
        <div className="p-8 rounded-2xl bg-surface border border-border flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-text-primary">
              Interested in collaborating or hiring?
            </h3>
            <p className="text-xs text-text-secondary">
              Let&apos;s talk about technical challenges, product roadmaps, or building solutions.
            </p>
          </div>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-medium text-background bg-accent hover:bg-accent-hover transition-colors"
          >
            <span>Let&apos;s Connect</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
