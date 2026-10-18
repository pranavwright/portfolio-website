import React from 'react'
import type { Metadata } from 'next'
import { Download } from 'lucide-react'
import { getExperience, getSkills, getEducation } from '@/sanity/fetch'
import { SITE } from '@/lib/site'

export const revalidate = 60

export const metadata: Metadata = {
  title: `Resume — ${SITE.name}`,
  description: `Full-stack developer resume: career experience, technical skills, systems architecture, and downloadable PDF.`,
}

const fallbackExperience = [
  {
    company: 'Freelance & Independent Product Builder',
    role: 'Full-Stack Developer & Systems Architect',
    dates: '2023 — Present',
    highlights: [
      'Architected and shipped distributed web platforms with Next.js, Node.js, and PostgreSQL for clients across multiple domains.',
      'Implemented real-time collaboration engines using CRDTs and WebSocket channels, achieving sub-50ms peer sync.',
      'Designed responsive design systems and motion choreography with Tailwind CSS and GSAP, ensuring 60fps frame budgets.',
    ],
  },
  {
    company: 'Software Engineering Practice',
    role: 'Backend & Cloud Infrastructure Developer',
    dates: '2022 — 2023',
    highlights: [
      'Engineered high-throughput event processing microservices with Redis, Kafka, and Docker containers.',
      'Streamlined database queries and indexing strategies, reducing median API response times from 340ms to 48ms.',
      'Built automated CI/CD deployment pipelines on Cloudflare and Vercel with comprehensive integration testing.',
    ],
  },
]

const fallbackSkills = [
  {
    group: 'Languages & Core',
    items: ['TypeScript', 'JavaScript (ESNext)', 'Python', 'SQL', 'HTML5', 'CSS3 / PostCSS'],
  },
  {
    group: 'Frameworks & Libraries',
    items: ['Next.js 14 (App Router)', 'React 18', 'Node.js', 'Express', 'Tailwind CSS', 'GSAP', 'Framer Motion'],
  },
  {
    group: 'Databases & Infrastructure',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Prisma', 'Cloudflare Pages', 'Sanity CMS', 'Git & GitHub'],
  },
  {
    group: 'Architecture & Craft',
    items: ['Distributed Systems', 'REST & GraphQL APIs', 'CRDTs & Real-time WebSockets', 'Performance Profiling', 'Figma'],
  },
]

const categoryLabels: Record<string, string> = {
  frontend: 'Frontend & UI Engineering',
  backend: 'Backend & Distributed Systems',
  databases: 'Databases & Infrastructure',
  mobile: 'Mobile Applications',
  'product-design': 'Product & Interaction Design',
  tools: 'Developer Tools & Architecture',
}

export default async function ResumePage() {
  const [sanityExp, sanitySkills, sanityEducation] = await Promise.all([
    getExperience(),
    getSkills(),
    getEducation(),
  ])

  const experience =
    sanityExp.length > 0
      ? sanityExp.map((exp) => ({
          company: exp.organization || 'Independent Engineering',
          role: exp.role,
          dates: exp.startDate
            ? `${new Date(exp.startDate).getFullYear()} — ${exp.isCurrent ? 'Present' : exp.endDate ? new Date(exp.endDate).getFullYear() : 'Now'}`
            : '2023 — Present',
          highlights: exp.achievements && exp.achievements.length > 0
            ? exp.achievements
            : exp.description
            ? [exp.description]
            : [
                'Architected full-stack features with high performance and test coverage.',
                'Collaborated closely with design and stakeholder teams to ship product iterations.',
              ],
        }))
      : fallbackExperience

  const skillsList =
    sanitySkills.length > 0
      ? Object.entries(
          sanitySkills.reduce<Record<string, string[]>>((acc, s) => {
            const groupName = categoryLabels[s.category] || s.category || 'Technologies'
            if (!acc[groupName]) acc[groupName] = []
            acc[groupName].push(s.name)
            return acc
          }, {})
        ).map(([group, items]) => ({ group, items }))
      : fallbackSkills

  return (
    <div className="pt-[calc(var(--header-height)+clamp(2rem,8vh,5rem))] pb-[clamp(5rem,14vh,10rem)]">
      <div className="max-w-7xl mx-auto">
        <section className="px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-8">
          <h1 className="display text-[clamp(4rem,15vw,15rem)] leading-[0.8] text-foreground">
            Resume
          </h1>
          <a
            href={SITE.logo.resumePdf}
            download={SITE.logo.resumeFileName}
            className="inline-flex h-14 items-center gap-2.5 rounded-full bg-primary px-7 text-[16px] font-semibold text-primary-foreground transition-transform active:scale-[0.97] shadow-xl hover:opacity-95"
          >
            <Download aria-hidden="true" className="size-5" strokeWidth={2} />
            Download PDF
          </a>
        </div>
        <p className="mt-10 max-w-[48ch] text-[clamp(1.2rem,1.7vw,1.6rem)] leading-snug text-muted-foreground">
          Full-stack developer and product architect with a strong foundation in distributed systems,
          high-performance web applications, and intuitive user interfaces. I build from the ground
          up—from data modeling and API contracts to fluid, accessible interactions.
        </p>
      </section>

      {/* Experience Section */}
      <section aria-labelledby="resume-experience" className="px-5 pt-[clamp(5rem,14vh,9rem)] md:px-10">
        <h2 id="resume-experience" className="display text-[clamp(2.75rem,5.4vw,5.5rem)] text-foreground">
          Experience
        </h2>
        <div className="mt-10">
          {experience.map((job) => (
            <article
              key={job.company}
              className="grid gap-6 border-t border-border py-10 md:grid-cols-12 md:gap-8"
            >
              <div className="md:col-span-4">
                <h3 className="text-[clamp(1.6rem,2.4vw,2.2rem)] font-bold leading-tight tracking-[-0.03em] [font-stretch:108%] text-foreground">
                  {job.company}
                </h3>
                <p className="mt-2 text-[17px] font-semibold text-primary">{job.role}</p>
                <p className="mt-1 text-[15px] text-muted-foreground tabular">{job.dates}</p>
              </div>
              <ul className="grid gap-4 md:col-span-7 md:col-start-6">
                {job.highlights.map((highlight, idx) => (
                  <li
                    key={idx}
                    className="relative max-w-[64ch] pl-6 text-[17px] leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-3 before:bg-primary"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Skills & Education */}
      <section
        aria-label="Skills and education"
        className="grid gap-14 px-5 py-[clamp(5rem,14vh,9rem)] md:grid-cols-12 md:gap-8 md:px-10"
      >
        <div className="md:col-span-7">
          <h2 className="text-[clamp(1.6rem,2.4vw,2.2rem)] font-bold tracking-[-0.025em] [font-stretch:108%] text-foreground">
            Skills &amp; Technologies
          </h2>
          <div className="mt-6 grid gap-7">
            {skillsList.map(({ group, items }) => (
              <div key={group}>
                <h3 className="text-[15px] font-semibold text-muted-foreground">{group}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-border px-3.5 py-1.5 text-[14px] font-medium text-foreground hover:border-primary/50 transition-colors"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-5">
          <h2 className="text-[clamp(1.6rem,2.4vw,2.2rem)] font-bold tracking-[-0.025em] [font-stretch:108%] text-foreground">
            Education &amp; Background
          </h2>
          <div className="mt-6 space-y-6">
            {sanityEducation.length > 0 ? (
              sanityEducation.map((edu) => (
                <div key={edu._id} className="border-t border-border pt-4">
                  <p className="text-lg font-semibold text-foreground">
                    {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                  </p>
                  <p className="text-[15px] font-medium text-primary mt-0.5">{edu.institution}</p>
                  <p className="text-[14px] text-muted-foreground mt-0.5 tabular">
                    {edu.startDate ? new Date(edu.startDate).getFullYear() : ''} — {edu.isCurrent ? 'Present' : edu.endDate ? new Date(edu.endDate).getFullYear() : 'Completed'}
                    {edu.location ? ` • ${edu.location}` : ''}
                    {edu.grade ? ` • ${edu.grade}` : ''}
                  </p>
                  {edu.description && (
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                  {edu.activities && edu.activities.length > 0 && (
                    <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                      {edu.activities.map((act, i) => (
                        <li key={i} className="pl-3 relative before:absolute before:left-0 before:top-2 before:size-1 before:bg-primary before:rounded-full">
                          {act}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            ) : (
              <>
                <div className="border-t border-border pt-4">
                  <p className="text-lg font-semibold text-foreground">Computer Science &amp; Engineering</p>
                  <p className="text-[16px] text-muted-foreground">Kerala, India</p>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-lg font-semibold text-foreground">Autonomous Problem Solving &amp; Design</p>
                  <p className="text-[16px] text-muted-foreground">Continuous research, open-source building, and production software delivery.</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      </div>
    </div>
  )
}
