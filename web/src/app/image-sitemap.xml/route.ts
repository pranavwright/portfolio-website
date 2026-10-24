import { getAllProjects, getProfile, getAchievements } from '@/sanity/fetch'
import { urlForImage } from '@/sanity/image'
import { SITE } from '@/lib/site'

export const dynamic = 'force-static'
export const revalidate = 3600

function escapeXml(unsafe: string | null | undefined): string {
  if (!unsafe) return ''
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

interface ImageEntry {
  loc: string
  title?: string
  caption?: string
}

interface PageImages {
  url: string
  images: ImageEntry[]
}

export async function GET() {
  const baseUrl = SITE.url
  const [profile, projects, achievements] = await Promise.all([
    getProfile().catch(() => null),
    getAllProjects().catch(() => []),
    getAchievements().catch(() => []),
  ])

  const pagesWithImages: PageImages[] = []

  // Helper to extract image entry
  const toImageEntry = (
    source: any,
    defaultTitle?: string,
    defaultCaption?: string
  ): ImageEntry | null => {
    if (!source) return null
    try {
      const url = urlForImage(source)?.url()
      if (!url) return null
      return {
        loc: url,
        title: source.alt || defaultTitle || '',
        caption: source.caption || defaultCaption || source.alt || '',
      }
    } catch {
      return null
    }
  }

  // 1. Home Page Images
  const homeImages: ImageEntry[] = []
  const avatarEntry = toImageEntry(
    profile?.avatar,
    `${SITE.name} Portrait`,
    `${SITE.name} — Full-Stack Developer`
  )
  if (avatarEntry) homeImages.push(avatarEntry)

  const heroEntry = toImageEntry(profile?.heroImage, `${SITE.name} Hero Portrait`)
  if (heroEntry) homeImages.push(heroEntry)

  if (homeImages.length > 0) {
    pagesWithImages.push({ url: `${baseUrl}`, images: homeImages })
  }

  // 2. About Page Images (Editorial Photo + Moments Gallery)
  const aboutImages: ImageEntry[] = []
  const aboutEntry = toImageEntry(
    profile?.aboutImage,
    `About ${SITE.name}`,
    `Editorial portrait of ${SITE.name} in software engineering studio`
  )
  if (aboutEntry) aboutImages.push(aboutEntry)

  if (profile?.mediaGallery && Array.isArray(profile.mediaGallery)) {
    for (const m of profile.mediaGallery) {
      const entry = toImageEntry(m.image, m.title, m.caption || m.alt)
      if (entry) aboutImages.push(entry)
    }
  }

  if (aboutImages.length > 0) {
    pagesWithImages.push({ url: `${baseUrl}/about`, images: aboutImages })
  }

  // 3. Project Detail Images
  if (projects.length > 0) {
    for (const p of projects) {
      const projImages: ImageEntry[] = []
      const featEntry = toImageEntry(
        p.featuredImage,
        `${p.title} Featured Showcase`,
        p.summary
      )
      if (featEntry) projImages.push(featEntry)

      if (p.gallery && Array.isArray(p.gallery)) {
        p.gallery.forEach((g, idx) => {
          const gEntry = toImageEntry(
            g,
            `${p.title} Screenshot ${idx + 1}`,
            g.caption || g.alt
          )
          if (gEntry) projImages.push(gEntry)
        })
      }

      if (projImages.length > 0) {
        pagesWithImages.push({
          url: `${baseUrl}/projects/${p.slug.current}`,
          images: projImages,
        })
      }
    }
  }

  // 4. XML Construction
  const urlXmls = pagesWithImages
    .map((page) => {
      const imagesXml = page.images
        .map(
          (img) => `    <image:image>
      <image:loc>${escapeXml(img.loc)}</image:loc>
      ${img.title ? `<image:title>${escapeXml(img.title)}</image:title>` : ''}
      ${img.caption ? `<image:caption>${escapeXml(img.caption)}</image:caption>` : ''}
    </image:image>`
        )
        .join('\n')

      return `  <url>
    <loc>${escapeXml(page.url)}</loc>
${imagesXml}
  </url>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlXmls}
</urlset>
`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
