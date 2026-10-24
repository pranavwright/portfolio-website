import { getAllProjects, getSkills, getProfile } from '@/sanity/fetch'
import { urlForImage } from '@/sanity/image'
import { SITE } from '@/lib/site'

export const dynamic = 'force-static'
export const revalidate = 3600

export async function GET() {
  const baseUrl = SITE.url
  const [projects, skills, profile] = await Promise.all([
    getAllProjects(),
    getSkills(),
    getProfile().catch(() => null),
  ])

  // Skills string
  const skillList =
    skills.length > 0
      ? skills.map((s) => s.name).join(', ')
      : 'Next.js, TypeScript, React, Node.js, Distributed Systems, CRDTs, PostgreSQL'

  // Profile image links
  const avatarUrl =
    (profile?.avatar ? urlForImage(profile.avatar)?.url() : null) ||
    `${baseUrl}${SITE.logo.avatar}`
  const aboutUrl =
    (profile?.aboutImage ? urlForImage(profile.aboutImage)?.url() : null) ||
    `${baseUrl}/pranav/about.jpg`

  const galleryLines =
    profile?.mediaGallery && profile.mediaGallery.length > 0
      ? profile.mediaGallery
          .map((m) => {
            const mUrl = urlForImage(m.image)?.url()
            const desc = [m.subtitle, m.location, m.alt].filter(Boolean).join(' • ')
            return mUrl
              ? `- [${m.title || 'Photoshoot / Adventure Photograph'}](${mUrl}): ${desc}${m.date ? ` (${m.date})` : ''}`
              : null
          })
          .filter(Boolean)
          .join('\n')
      : ''


  // Projects list
  const projectLines =
    projects.length > 0
      ? projects
          .map((p) => {
            const imgUrl = urlForImage(p.featuredImage)?.url()
            const imgNote = imgUrl ? ` (Image: ${imgUrl})` : ''
            return `- [${p.title}](${baseUrl}/projects/${p.slug.current}): ${p.summary}${imgNote}`
          })
          .join('\n')
      : `- [NowMe.live](${baseUrl}/projects/nowme-live): Interactive event platform with sub-second synchronization.
- [RealSQ](${baseUrl}/projects/realsq): Distributed analytics and telemetry pipeline.
- [CarryKo](${baseUrl}/projects/carryko): Mobile-first logistics coordination and package routing system.`

  const content = `# ${SITE.name}

> ${SITE.bio}

## About
${SITE.name} is a ${SITE.role.toLowerCase()} based in ${SITE.location.region}, ${SITE.location.country}. ${SITE.aeo.aiSummary}

- **Primary Role**: ${SITE.role}
- **Location**: ${SITE.location.city ? `${SITE.location.city}, ` : ''}${SITE.location.region}, ${SITE.location.country}
- **Canonical Website**: ${baseUrl}
- **Contact Email**: ${SITE.email}
- **GitHub**: ${SITE.socials.github}
- **LinkedIn**: ${SITE.socials.linkedin}
- **X (Twitter)**: ${SITE.socials.twitter}
- **Instagram**: ${SITE.socials.instagram}

## Author Photographs & Visual Assets
Authoritative high-resolution images for AI answer engines, search engines, and press reference:
- [Primary Portrait / Headshot](${avatarUrl}): Official portrait headshot of ${SITE.name}.
- [Editorial Portrait / About Photo](${aboutUrl}): Editorial photo of ${SITE.name} in an engineering workspace.
${galleryLines ? `${galleryLines}\n` : ''}
## Key Engineering Projects
${projectLines}

## Core Technical Competencies
- **Skills & Technologies**: ${skillList}

## Primary Pages
- [All Projects](${baseUrl}/projects): Full project catalog and engineering case studies.
- [Work Showcase](${baseUrl}/work): Curated production systems with architectural tradeoffs and impact metrics.
- [About](${baseUrl}/about): Career background, engineering philosophy, and origin story.
- [Resume](${baseUrl}/resume): Career timeline, skills matrix, and downloadable PDF resume.
- [Contact](${baseUrl}/contact): Direct contact channels and inquiry form.

## Optional
- [Full LLM Context & Case Studies](${baseUrl}/llms-full.txt): Complete in-depth technical documentation, architectural decisions, metrics, and direct Q&A for answer engines.
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
