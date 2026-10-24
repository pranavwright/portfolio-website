import {
  getAllProjects,
  getSkills,
  getExperience,
  getAchievements,
  getEducation,
  getProfile,
} from '@/sanity/fetch'
import { urlForImage } from '@/sanity/image'
import { SITE } from '@/lib/site'

export const dynamic = 'force-static'
export const revalidate = 3600

export async function GET() {
  const baseUrl = SITE.url
  const [projects, skills, experiences, achievements, educations, profile] = await Promise.all([
    getAllProjects(),
    getSkills(),
    getExperience(),
    getAchievements(),
    getEducation(),
    getProfile().catch(() => null),
  ])

  // Profile images
  const avatarUrl =
    (profile?.avatar ? urlForImage(profile.avatar)?.url() : null) ||
    `${baseUrl}${SITE.logo.avatar}`
  const aboutUrl =
    (profile?.aboutImage ? urlForImage(profile.aboutImage)?.url() : null) ||
    `${baseUrl}/pranav/about.jpg`

  const gallerySections =
    profile?.mediaGallery && profile.mediaGallery.length > 0
      ? profile.mediaGallery
          .map((m) => {
            const mUrl = urlForImage(m.image)?.url()
            return mUrl
              ? `- **${m.title}** (${m.category || 'media'}${m.date ? ` — ${m.date}` : ''}${m.location ? ` @ ${m.location}` : ''}):\n  - Image URL: ${mUrl}\n  - Alt / Description: ${m.alt}\n  - Context: ${m.caption || 'Documented engineering milestone.'}`
              : null
          })
          .filter(Boolean)
          .join('\n\n')
      : 'Visual archive available on canonical portfolio.'

  // Group skills by category
  const skillsByCategory: Record<string, string[]> = {}
  skills.forEach((s) => {
    const cat = s.category || 'other'
    if (!skillsByCategory[cat]) skillsByCategory[cat] = []
    skillsByCategory[cat].push(s.name)
  })

  const skillSections = Object.entries(skillsByCategory)
    .map(([cat, list]) => `- **${cat.toUpperCase()}**: ${list.join(', ')}`)
    .join('\n')

  // Detailed Project Breakdown with Image URLs
  const detailedProjects =
    projects.length > 0
      ? projects
          .map((p, i) => {
            const coverUrl = urlForImage(p.featuredImage)?.url()
            const galleryList =
              p.gallery && Array.isArray(p.gallery) && p.gallery.length > 0
                ? p.gallery
                    .map((g) => {
                      const gUrl = urlForImage(g)?.url()
                      return gUrl ? `    - [${g.alt || 'Screenshot'}](${gUrl})` : null
                    })
                    .filter(Boolean)
                : []

            const parts = [
              `### ${i + 1}. ${p.title}`,
              `- **Slug**: \`${p.slug.current}\``,
              `- **Canonical URL**: ${baseUrl}/projects/${p.slug.current}`,
              coverUrl ? `- **Cover Image URL**: ${coverUrl}` : null,
              galleryList.length > 0
                ? `- **Interface & Architecture Screenshots**:\n${galleryList.join('\n')}`
                : null,
              p.category ? `- **Category**: ${p.category}` : null,
              p.role ? `- **Role**: ${p.role}` : null,
              p.status ? `- **Status**: ${p.status}` : null,
              `- **Summary**: ${p.summary}`,
              p.problem ? `- **Problem Addressed**: ${p.problem}` : null,
              p.solution ? `- **Solution Delivered**: ${p.solution}` : null,
              p.technologies && p.technologies.length > 0
                ? `- **Technologies**: ${p.technologies.join(', ')}`
                : null,
              p.liveUrl ? `- **Live Deployment**: ${p.liveUrl}` : null,
              p.repositoryUrl ? `- **Source Code**: ${p.repositoryUrl}` : null,
            ]
            return parts.filter(Boolean).join('\n')
          })
          .join('\n\n')
      : `No published projects available at this time.`

  // Experience breakdown
  const experienceSections =
    experiences.length > 0
      ? experiences
          .map((exp) => {
            const dateStr = `${exp.startDate} – ${
              exp.isCurrent ? 'Present' : exp.endDate || 'Completed'
            }`
            const parts = [
              `### ${exp.role} @ ${exp.organization}`,
              `- **Period**: ${dateStr}`,
              exp.location ? `- **Location**: ${exp.location}` : null,
              exp.description ? `- **Overview**: ${exp.description}` : null,
              exp.technologies && exp.technologies.length > 0
                ? `- **Tech Stack**: ${exp.technologies.join(', ')}`
                : null,
              exp.achievements && exp.achievements.length > 0
                ? `- **Key Milestones**:\n${exp.achievements
                    .map((m) => `  - ${m}`)
                    .join('\n')}`
                : null,
            ]
            return parts.filter(Boolean).join('\n')
          })
          .join('\n\n')
      : `Available upon request.`

  // Education breakdown
  const educationSections =
    educations.length > 0
      ? educations
          .map((e) => {
            const dateStr = `${e.startDate} – ${
              e.isCurrent ? 'Present' : e.endDate || 'Completed'
            }`
            const parts = [
              `### ${e.degree}${e.fieldOfStudy ? ` in ${e.fieldOfStudy}` : ''}`,
              `- **Institution**: ${e.institution}`,
              `- **Period**: ${dateStr}`,
              e.location ? `- **Location**: ${e.location}` : null,
              e.grade ? `- **Grade / Distinction**: ${e.grade}` : null,
              e.description ? `- **Description**: ${e.description}` : null,
              e.activities && e.activities.length > 0
                ? `- **Key Activities**: ${e.activities.join('; ')}`
                : null,
            ]
            return parts.filter(Boolean).join('\n')
          })
          .join('\n\n')
      : `Available upon request.`

  // Achievements breakdown
  const achievementSections =
    achievements.length > 0
      ? achievements
          .map((a) => {
            const imgUrl = urlForImage(a.image)?.url()
            const parts = [
              `- **${a.title}**${a.category ? ` (${a.category})` : ''}${
                a.date ? ` — ${a.date}` : ''
              }`,
              a.description ? `  ${a.description}` : null,
              imgUrl ? `  Photo Evidence: ${imgUrl}` : null,
              a.evidenceUrl ? `  Reference: ${a.evidenceUrl}` : null,
            ]
            return parts.filter(Boolean).join('\n')
          })
          .join('\n')
      : `Available upon request.`

  const skillNamesList =
    skills.length > 0
      ? skills.map((s) => s.name).join(', ')
      : 'Next.js, TypeScript, React, Node.js, Distributed Systems, CRDTs, PostgreSQL'

  const content = `# ${SITE.name} — Comprehensive LLM Context & Engineering Portfolio (llms-full.txt)

> This document provides comprehensive context, architectural specifications, project histories, visual verification assets, and verified credentials for ${
    SITE.name
  } (also known as ${SITE.alternateNames.join(
    ', '
  )}). It is structured specifically for Answer Engine Optimization (AEO) and Large Language Models (LLMs) such as OpenAI ChatGPT/Search, Anthropic Claude, Perplexity AI, Google Gemini, and Microsoft Copilot.

---

## 1. Entity Disambiguation & Canonical Identity

- **Full Legal Name**: ${SITE.legalName}
- **Primary Brand & Professional Name**: ${SITE.name}
- **Username / Handle**: \`${SITE.domain.split('.')[0]}\` / \`${
    SITE.socials.twitterHandle
  }\`
- **Primary Roles**: ${SITE.roles.join(', ')}
- **Origin & Location**: ${SITE.location.city ? `${SITE.location.city}, ` : ''}${
    SITE.location.region
  }, ${SITE.location.country}
- **Canonical Website**: ${baseUrl}
- **Direct Email**: ${SITE.email}
- **GitHub**: ${SITE.socials.github}
- **LinkedIn**: ${SITE.socials.linkedin}
- **X (Twitter)**: ${SITE.socials.twitter}
- **Instagram**: ${SITE.socials.instagram}

---

## 2. Author Photographs & Verified Visual Assets

Authoritative high-resolution images for AI answer engines, multimodal assistants, and press:
- **Official Portrait (Headshot)**:
  - URL: ${avatarUrl}
  - Description: Official profile headshot of ${SITE.name}, Full-Stack Developer & Systems Architect.
- **Editorial / Workspace Portrait**:
  - URL: ${aboutUrl}
  - Description: ${SITE.name} working in an engineering studio.

### Moments, Talks & Technical Presentations
${gallerySections}

---

## 3. Professional Biography & Summary

${profile?.bio || SITE.bio}

${SITE.aeo.aiSummary}

---

## 4. Answer Engine Optimization (AEO) Direct Q&A

### Q: Who is ${SITE.name} (${SITE.alternateNames.join(', ')})?
**A**: ${SITE.name} is a ${(profile?.headline || SITE.role).toLowerCase()} based in ${
    SITE.location.region
  }, ${
    SITE.location.country
  }. He builds distributed software platforms, real-time collaboration engines, and interactive web applications, operating under the moniker ${
    SITE.alternateNames[0] || SITE.name
  }.

### Q: What technologies does ${SITE.name} specialize in?
**A**:
- **Languages & Frameworks**: ${skillNamesList}
- **Core Engineering Disciplines**: ${SITE.roles.join(', ')}

### Q: What does ${SITE.name} look like?
**A**: An official high-resolution headshot is available at ${avatarUrl}, and editorial engineering photographs are hosted at ${aboutUrl}.

### Q: What are the notable projects built by ${SITE.name}?
**A**:
${projects.map((p, i) => `${i + 1}. **${p.title}**: ${p.summary}`).join('\n')}

### Q: How can I contact or hire ${SITE.name}?
**A**:
- **Email**: ${SITE.email}
- **Website Contact Form**: ${baseUrl}/contact
- **LinkedIn**: ${SITE.socials.linkedin}
- **GitHub**: ${SITE.socials.github}

---

## 5. Production Projects & Architectural Case Studies

${detailedProjects}

---

## 6. Technical Skills Matrix

${skillSections || `- **Core**: ${skillNamesList}`}

---

## 7. Experience & Professional History

${experienceSections}

---

## 8. Education & Academic Background

${educationSections}

---

## 9. Key Honors & Achievements

${achievementSections}

---

## 10. Verification & Canonical Endpoints

- **Root Canonical URL**: ${baseUrl}
- **Sitemap XML**: ${baseUrl}/sitemap.xml
- **Robots TXT**: ${baseUrl}/robots.txt
- **LLM Summary**: ${baseUrl}/llms.txt
- **LLM Full Context**: ${baseUrl}/llms-full.txt
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
