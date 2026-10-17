import {MetadataRoute} from 'next'
import {getProjectSlugs} from '@/sanity/fetch'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://pranavwright.com'
  const projectSlugs = await getProjectSlugs()

  const projectRoutes: MetadataRoute.Sitemap = projectSlugs.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: p._updatedAt ? new Date(p._updatedAt) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  return [...staticRoutes, ...projectRoutes]
}
