import https from 'node:https'
import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load env files if running directly via node
const potentialEnvPaths = [
  path.resolve(__dirname, '../../.env'),
  path.resolve(__dirname, '../.env'),
  path.resolve(__dirname, '../.env.local'),
  path.resolve(__dirname, '../../web/.env.local'),
  path.resolve(process.cwd(), '.env'),
  path.resolve(process.cwd(), '.env.local'),
  path.resolve(process.cwd(), 'web/.env.local'),
]

for (const envPath of potentialEnvPaths) {
  if (fs.existsSync(envPath) && typeof process.loadEnvFile === 'function') {
    try {
      process.loadEnvFile(envPath)
    } catch {
      // Ignore syntax or load errors from already loaded files
    }
  }
}

const PROJECT_ID =
  process.env.SANITY_API_PROJECT_ID ||
  process.env.SANITY_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID

const DATASET =
  process.env.SANITY_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  'production'

const WRITE_TOKEN =
  process.env.SANITY_API_WRITE_TOKEN ||
  process.env.SANITY_WRITE_TOKEN

const SEED_EMAIL =
  process.env.SANITY_SEED_EMAIL ||
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
  process.env.SANITY_STUDIO_CONTACT_EMAIL ||
  ''

if (!PROJECT_ID) {
  console.error('\x1b[31m%s\x1b[0m', 'Error: Missing Sanity Project ID.')
  console.error('Please define SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID in your .env file.')
  process.exit(1)
}

if (!WRITE_TOKEN) {
  console.error('\x1b[31m%s\x1b[0m', 'Error: Missing Sanity Write API Token.')
  console.error('Please define SANITY_API_WRITE_TOKEN in your .env file.')
  process.exit(1)
}

const documents = [
  // 2. Project: NowMe.live
  {
    _id: 'project-nowme-live',
    _type: 'project',
    title: 'NowMe.live',
    slug: {_type: 'slug', current: 'nowme-live'},
    summary:
      'An AI-powered business operating system helping small businesses effortlessly manage their online presence, customer operations, inventory, and automation.',
    status: 'building',
    currentlyBuilding: true,
    focusArea: 'Merchant Dashboard & AI Workflows',
    category: 'web-app',
    role: 'Product Builder & Full-Stack Architect',
    featured: true,
    sortOrder: 1,
    publishedAt: '2024-01-10T00:00:00.000Z',
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'AI Automations', 'Tailwind CSS', 'REST APIs'],
    features: [
      'Automated online storefront and landing page generation',
      'Integrated customer and booking pipeline',
      'Order processing and inventory management',
      'Marketing automation and intelligent message routing',
    ],
    problem:
      'Small business owners often juggle half a dozen disconnected tools — website builders, payment links, spreadsheet inventories, and messaging apps. This fragmentation leads to lost orders, missed customer follow-ups, and overwhelming operational overhead.',
    solution:
      'NowMe.live unifies storefront creation, customer engagement, payments, and workflow automation into a cohesive business operating system tailored for independent merchants.',
    results: 'Active development phase focusing on core merchant workflows and automated setup experience.',
    startDate: '2023-11-01',
  },

  // 3. Project: RealSQ
  {
    _id: 'project-realsq',
    _type: 'project',
    title: 'RealSQ (ResQ)',
    slug: {_type: 'slug', current: 'realsq'},
    summary:
      'Disaster-management platform engineered for emergency response coordination, relief camp logistics, victim registration, and transparent resource distribution.',
    status: 'building',
    currentlyBuilding: true,
    focusArea: 'Fastify API & Camp Logistics Engine',
    category: 'web-app',
    role: 'Backend & Systems Developer',
    featured: true,
    sortOrder: 2,
    publishedAt: '2024-02-01T00:00:00.000Z',
    technologies: ['Fastify', 'Flutter', 'React', 'MongoDB', 'Node.js', 'REST APIs'],
    features: [
      'Real-time relief camp coordination & capacity tracking',
      'Victim registration and family reunification database',
      'Donation intake and resource requirement matching',
      'High-throughput disaster response backend architecture',
    ],
    problem:
      'During regional disasters and floods, communication breakdowns and chaotic supply distribution cause bottlenecks. Relief camps often receive surplus of items they do not need while suffering acute shortages of life-saving essentials.',
    solution:
      'RealSQ bridges ground volunteers, relief camp directors, and state agencies with a fast Fastify backend, responsive Flutter mobile app for field officers, and a comprehensive React administration portal.',
    results: 'Architected high-throughput backend with Fastify and MongoDB schemas optimized for rapid field querying.',
    startDate: '2024-01-01',
  },

  // 4. Project: CarryKo
  {
    _id: 'project-carryko',
    _type: 'project',
    title: 'CarryKo',
    slug: {_type: 'slug', current: 'carryko'},
    summary:
      'On-demand vehicle booking application concept designed to simplify vehicle discovery, transit scheduling, and transparent customer-driver communication.',
    status: 'building',
    currentlyBuilding: true,
    focusArea: 'Flutter Mobile Prototype',
    category: 'mobile',
    role: 'Product Designer & Full-Stack Developer',
    featured: false,
    sortOrder: 3,
    publishedAt: '2024-03-01T00:00:00.000Z',
    technologies: ['Flutter', 'Node.js', 'Mobile UI/UX', 'REST APIs'],
    features: [
      'Frictionless vehicle discovery and trip scheduling',
      'Direct customer-to-driver communication interface',
      'Transparent booking receipts and status tracking',
    ],
    problem:
      'Regional transport logistics frequently suffer from opaque booking terms, slow confirmation steps, and complex multi-screen checkout processes.',
    solution:
      'CarryKo provides a streamlined, touch-friendly booking experience with clear trip stages, direct communication channels, and real-time ride tracking.',
    startDate: '2024-02-15',
  },

  // 5. Education
  {
    _id: 'education-btech-cse',
    _type: 'education',
    degree: 'Bachelor of Technology (B.Tech)',
    fieldOfStudy: 'Computer Science & Engineering',
    institution: 'APJ Abdul Kalam Technological University',
    location: 'Kerala, India',
    startDate: '2020-08-01',
    endDate: '2024-06-01',
    isCurrent: false,
    grade: 'First Class',
    description:
      'Rigorous foundation in computer science: algorithms, operating systems, distributed architectures, database management, and network protocols.',
    activities: [
      'Engineered interactive exhibitions and software demonstrations',
      'Technical symposium coordinator and open-source contributor',
    ],
    sortOrder: 1,
  },

  // 6. Skills
  {
    _id: 'skill-react',
    _type: 'skill',
    name: 'React',
    category: 'frontend',
    description: 'Component architecture, hooks, state management, and modern patterns',
    sortOrder: 1,
  },
  {
    _id: 'skill-nextjs',
    _type: 'skill',
    name: 'Next.js',
    category: 'frontend',
    description: 'App Router, Server Components, Edge rendering, and SEO optimization',
    sortOrder: 2,
  },
  {
    _id: 'skill-typescript',
    _type: 'skill',
    name: 'TypeScript',
    category: 'frontend',
    description: 'Strict type safety, generic types, and end-to-end interface contracts',
    sortOrder: 3,
  },
  {
    _id: 'skill-tailwind',
    _type: 'skill',
    name: 'Tailwind CSS',
    category: 'frontend',
    description: 'Responsive design systems, design tokens, and clean utility layouts',
    sortOrder: 4,
  },
  {
    _id: 'skill-nodejs',
    _type: 'skill',
    name: 'Node.js',
    category: 'backend',
    description: 'Event-driven server runtimes, microservices, and asynchronous architectures',
    sortOrder: 5,
  },
  {
    _id: 'skill-fastify',
    _type: 'skill',
    name: 'Fastify',
    category: 'backend',
    description: 'High-performance HTTP API development, schema validation, and plugin systems',
    sortOrder: 6,
  },
  {
    _id: 'skill-rest-api',
    _type: 'skill',
    name: 'REST APIs',
    category: 'backend',
    description: 'Resource-oriented API design, authentication, and robust error handling',
    sortOrder: 7,
  },
  {
    _id: 'skill-mongodb',
    _type: 'skill',
    name: 'MongoDB',
    category: 'databases',
    description: 'Document data modeling, aggregation pipelines, and indexing strategies',
    sortOrder: 8,
  },
  {
    _id: 'skill-postgresql',
    _type: 'skill',
    name: 'PostgreSQL',
    category: 'databases',
    description: 'Relational modeling, transactions, foreign keys, and performant SQL queries',
    sortOrder: 9,
  },
  {
    _id: 'skill-linux',
    _type: 'skill',
    name: 'Linux',
    category: 'databases',
    description: 'Server administration, shell scripting, Kali Linux, and security auditing',
    sortOrder: 10,
  },
  {
    _id: 'skill-flutter',
    _type: 'skill',
    name: 'Flutter',
    category: 'mobile',
    description: 'Cross-platform mobile applications, reactive widgets, and state architectures',
    sortOrder: 11,
  },
  {
    _id: 'skill-ui-ux',
    _type: 'skill',
    name: 'UI / UX Design',
    category: 'product-design',
    description: 'Information architecture, wireframing, high-fidelity prototypes, and typography',
    sortOrder: 12,
  },
  {
    _id: 'skill-product-arch',
    _type: 'skill',
    name: 'Product Architecture',
    category: 'product-design',
    description: 'Translating business requirements into intuitive workflows and scalable systems',
    sortOrder: 13,
  },

  // 7. Experience
  {
    _id: 'exp-college-exhibition',
    _type: 'experience',
    role: 'Lead Developer & Project Coordinator',
    organization: 'College Technical Exhibition',
    location: 'Kerala, India',
    startDate: '2023-08-01',
    endDate: '2024-03-01',
    isCurrent: false,
    description:
      'Developed and exhibited software systems, games, and an intelligent chatbot as part of the college exhibition program, contributing to the institution receiving an NAAC A+ accreditation.',
    achievements: [
      'Designed and engineered interactive games and chatbot systems demonstrated to visiting evaluators',
      'Conducted rigorous testing and debugging across client-server architectures',
      'Presented technical solutions clearly to faculty, students, and accreditation committee',
    ],
    technologies: ['JavaScript', 'HTML/CSS', 'Python', 'Java', 'Linux'],
    sortOrder: 1,
  },
]

async function seed() {
  const mutations = documents.map((doc) => ({
    createOrReplace: doc,
  }))

  const payload = JSON.stringify({mutations})

  const req = https.request(
    {
      hostname: `${PROJECT_ID}.api.sanity.io`,
      path: `/v2024-01-01/data/mutate/${DATASET}?returnIds=true`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${WRITE_TOKEN}`,
        'Content-Length': Buffer.byteLength(payload),
      },
    },
    (res) => {
      let data = ''
      res.on('data', (chunk) => (data += chunk))
      res.on('end', () => {
        console.log(`HTTP Status: ${res.statusCode}`)
        try {
          const json = JSON.parse(data)
          if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log('✅ Seed successful!')
            console.log(`Mutated ${mutations.length} documents. Transaction ID:`, json.transactionId)
          } else {
            console.error('❌ Mutation error:', json)
          }
        } catch (e) {
          console.log('Raw output:', data)
        }
      })
    }
  )

  req.on('error', (err) => {
    console.error('Request failed:', err)
  })

  req.write(payload)
  req.end()
}

seed()
