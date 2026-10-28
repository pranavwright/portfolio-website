import {getAllProjects} from '@/sanity/fetch'
import {SITE} from '@/lib/site'

export const revalidate = 3600

type SitemapEntry = {
  url: string
  lastModified: Date
  changeFrequency: 'weekly' | 'monthly'
  priority: number
}

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

const toSitemapUrlNode = ({
  url,
  lastModified,
  changeFrequency,
  priority,
}: SitemapEntry): string => `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${lastModified.toISOString()}</lastmod>
    <changefreq>${changeFrequency}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`

export async function GET() {
  const baseUrl = SITE.url
  const now = new Date()

  const staticRoutes: SitemapEntry[] = [
    {url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1.0},
    {
      url: `${baseUrl}/work`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/llms.txt`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/llms-full.txt`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  const dynamicRoutes: SitemapEntry[] = []

  try {
    const allProjects = await getAllProjects()

    for (const project of allProjects) {
      const slug = project.slug?.current
      if (!slug) continue

      dynamicRoutes.push({
        url: `${baseUrl}/projects/${slug}`,
        lastModified: project._updatedAt ? new Date(project._updatedAt) : now,
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    }
  } catch (err) {
    console.error('Sitemap project fetch error:', err)
  }

  const sitemapEntries = [...staticRoutes, ...dynamicRoutes]
  const sitemapBody = sitemapEntries.map(toSitemapUrlNode).join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapBody}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=UTF-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
