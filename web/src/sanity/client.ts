import {createClient} from '@sanity/client'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = '2024-01-01'

if (!projectId && typeof window === 'undefined' && process.env.NODE_ENV !== 'production') {
  console.warn(
    'Warning: NEXT_PUBLIC_SANITY_PROJECT_ID is not configured. Please define it in your .env or .env.local file.'
  )
}

export const client = createClient({
  projectId: projectId || 'unconfigured',
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
})
