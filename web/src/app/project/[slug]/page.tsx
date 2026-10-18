import { redirect } from 'next/navigation'
import { getProjectSlugs } from '@/sanity/fetch'

export async function generateStaticParams() {
  const slugs = await getProjectSlugs()
  return slugs.map((item) => ({ slug: item.slug }))
}

export default function ProjectRedirectPage({
  params,
}: {
  params: { slug: string }
}) {
  redirect(`/projects/${params.slug}`)
}
