import { redirect } from 'next/navigation'

export default function ProjectRedirectPage({
  params,
}: {
  params: { slug: string }
}) {
  redirect(`/projects/${params.slug}`)
}
