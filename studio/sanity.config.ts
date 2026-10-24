import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {RocketIcon} from '@sanity/icons'
import {schemaTypes} from './schemaTypes'
import {structure} from './src/structure'
import {DeployTool} from './src/tools/DeployTool'

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  ''

const dataset =
  process.env.SANITY_STUDIO_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  'production'

export default defineConfig({
  name: 'default',
  title: 'Pranav Wright — Studio',

  projectId,
  dataset,

  plugins: [
    structureTool({structure}),
    visionTool(),
  ],

  tools: (prev) => [
    ...prev,
    {
      name: 'deploy',
      title: 'Deploy to Cloudflare',
      icon: RocketIcon,
      component: DeployTool,
    },
  ],

  schema: {
    types: schemaTypes,
  },
})
