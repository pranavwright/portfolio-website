import {MetadataRoute} from 'next'
import {SITE} from '@/lib/site'

/**
 * PWA Web App Manifest, generated from the central SITE config so the
 * installable app name stays in sync with the rest of the site identity.
 * Next.js emits this at /manifest.webmanifest and injects the <link> tag
 * automatically — do not also set `manifest` in layout metadata.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — Portfolio`,
    short_name: SITE.shortName,
    description: SITE.seo.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
