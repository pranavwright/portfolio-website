import {defineCliConfig} from 'sanity/cli'
import fs from 'node:fs'
import path from 'node:path'

// Attempt loading env vars if available in environment
const potentialEnvPaths = [
  path.resolve(__dirname, '.env'),
  path.resolve(__dirname, '.env.local'),
  path.resolve(__dirname, '../.env'),
  path.resolve(__dirname, '../.env.local'),
  path.resolve(__dirname, '../web/.env.local'),
]

for (const envPath of potentialEnvPaths) {
  if (fs.existsSync(envPath) && typeof process.loadEnvFile === 'function') {
    try {
      process.loadEnvFile(envPath)
    } catch {
      // Ignore
    }
  }
}

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_PROJECT_ID ||
  ''

const dataset =
  process.env.SANITY_STUDIO_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_DATASET ||
  'production'

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  deployment: {
    autoUpdates: true,
  },
  // @ts-expect-error typegen config is supported by Sanity CLI runtime
  typegen: {
    sources: ['../web/src/**/*.{ts,tsx,js,jsx}'],
    schema: './schemaTypes/index.ts',
    generates: '../web/src/sanity/types.ts',
  },
})
