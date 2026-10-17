import https from 'node:https'
import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load env files
const potentialEnvPaths = [
  path.resolve(__dirname, '../.env.local'),
  path.resolve(__dirname, '../.env'),
  path.resolve(__dirname, '../../web/.env.local'),
  path.resolve(__dirname, '../../.env'),
  path.resolve(process.cwd(), 'studio/.env.local'),
  path.resolve(process.cwd(), 'web/.env.local'),
]

for (const envPath of potentialEnvPaths) {
  if (fs.existsSync(envPath) && typeof process.loadEnvFile === 'function') {
    try {
      process.loadEnvFile(envPath)
    } catch {
      // ignore
    }
  }
}

const PROJECT_ID =
  process.env.SANITY_API_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

const DATASET =
  process.env.SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  'production'

const WRITE_TOKEN =
  process.env.SANITY_API_WRITE_TOKEN ||
  process.env.SANITY_WRITE_TOKEN

const SEED_EMAIL =
  process.env.SANITY_SEED_EMAIL ||
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
  process.env.SANITY_STUDIO_CONTACT_EMAIL ||
  'wrightpranav@gmail.com'

console.log('Project ID:', PROJECT_ID)
console.log('Dataset:', DATASET)
console.log('Has write token:', !!WRITE_TOKEN)

if (!PROJECT_ID || !WRITE_TOKEN) {
  console.error('Missing PROJECT_ID or WRITE_TOKEN.')
  process.exit(1)
}

function uploadAsset(filePath, mimeType) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`)
      return resolve(null)
    }

    const filename = path.basename(filePath)
    const fileBuffer = fs.readFileSync(filePath)

    const req = https.request(
      {
        hostname: `${PROJECT_ID}.api.sanity.io`,
        path: `/v2024-01-01/assets/images/${DATASET}?filename=${encodeURIComponent(filename)}`,
        method: 'POST',
        headers: {
          'Content-Type': mimeType,
          'Authorization': `Bearer ${WRITE_TOKEN}`,
          'Content-Length': fileBuffer.length,
        },
      },
      (res) => {
        let data = ''
        res.on('data', (c) => (data += c))
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data)
            if (res.statusCode >= 200 && res.statusCode < 300) {
              console.log(`✅ Uploaded ${filename} -> ${parsed.document._id}`)
              resolve(parsed.document)
            } else {
              console.error(`❌ Failed to upload ${filename}:`, parsed)
              resolve(null)
            }
          } catch (e) {
            console.error(`Parse error for ${filename}:`, data)
            resolve(null)
          }
        })
      }
    )

    req.on('error', (err) => {
      console.error(`Network error uploading ${filename}:`, err)
      resolve(null)
    })

    req.write(fileBuffer)
    req.end()
  })
}

async function run() {
  const assetsDir = path.resolve(__dirname, '../assets')

  console.log('Uploading images to Sanity...')
  const avatarDoc = await uploadAsset(
    path.join(assetsDir, 'pranav/profile-about.jpg'),
    'image/jpeg'
  )
  const heroPicDoc = await uploadAsset(
    path.join(assetsDir, 'pranav/pranav_pic-removebg-preview.png'),
    'image/png'
  )
  const proj1Doc = await uploadAsset(
    path.join(assetsDir, 'project/project-1.png'),
    'image/png'
  )
  const proj2Doc = await uploadAsset(
    path.join(assetsDir, 'project/project-2.png'),
    'image/png'
  )
  const proj3Doc = await uploadAsset(
    path.join(assetsDir, 'project/project-3.png'),
    'image/png'
  )
  const achieveDoc = await uploadAsset(
    path.join(assetsDir, 'achivements/presentation-KSDMA.jpg'),
    'image/jpeg'
  )

  const documents = [
    // 1. Site Settings with Avatar
    {
      _id: 'siteSettings',
      _type: 'siteSettings',
      name: 'Pranav Wright',
      alternativeName: 'Pranav P.S.',
      headline: 'Creative Developer & Product Architect.',
      roles: [
        'Full-Stack Developer',
        'Product Architect',
        'Web Systems',
        'UI/UX Designer',
      ],
      shortBio:
        'Software developer and product builder from Kerala, India. Focused on creating reliable digital products, solving real-world operational problems, and building software that turns complex requirements into clean, intuitive experiences.',
      location: 'Kerala, India',
      email: SEED_EMAIL,
      githubUrl: 'https://github.com/pranavwright',
      linkedinUrl: 'https://linkedin.com/in/Pranav-wright',
      instagramUrl: 'https://instagram.com/pranav.wright',
      twitterUrl: 'https://x.com/pranav_wright',
      contactHeadline: 'Have an idea worth building?',
      contactSubtext:
        "I'm interested in building useful products, solving interesting technical problems, and collaborating with people who want to turn ideas into reality.",
      seoTitle: 'Pranav Wright — Developer, Product Builder & Designer',
      seoDescription:
        'Software developer, full-stack engineer, and product builder from Kerala, India. Explore featured projects, engineering experience, and technical skills.',
      ...(avatarDoc
        ? {
            avatar: {
              _type: 'image',
              asset: {_type: 'reference', _ref: avatarDoc._id},
            },
          }
        : {}),
    },

    // 2. Project: NowMe.live
    {
      _id: 'project-nowme-live',
      _type: 'project',
      title: 'NowMe.live',
      slug: {_type: 'slug', current: 'nowme-live'},
      summary:
        'An AI-powered business operating system helping small businesses effortlessly manage their online presence, customer operations, inventory, and automation.',
      status: 'in-progress',
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
      ...(proj1Doc
        ? {
            featuredImage: {
              _type: 'image',
              asset: {_type: 'reference', _ref: proj1Doc._id},
            },
          }
        : {}),
    },

    // 3. Project: RealSQ
    {
      _id: 'project-realsq',
      _type: 'project',
      title: 'RealSQ (ResQ)',
      slug: {_type: 'slug', current: 'realsq'},
      summary:
        'Disaster-management platform engineered for emergency response coordination, relief camp logistics, victim registration, and transparent resource distribution.',
      status: 'in-progress',
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
      ...(proj2Doc
        ? {
            featuredImage: {
              _type: 'image',
              asset: {_type: 'reference', _ref: proj2Doc._id},
            },
          }
        : {}),
    },

    // 4. Project: CarryKo
    {
      _id: 'project-carryko',
      _type: 'project',
      title: 'CarryKo',
      slug: {_type: 'slug', current: 'carryko'},
      summary:
        'On-demand vehicle booking application concept designed to simplify vehicle discovery, transit scheduling, and transparent customer-driver communication.',
      status: 'in-progress',
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
      ...(proj3Doc
        ? {
            featuredImage: {
              _type: 'image',
              asset: {_type: 'reference', _ref: proj3Doc._id},
            },
          }
        : {}),
    },

    // 5. Achievement: KSDMA Presentation
    {
      _id: 'achievement-ksdma',
      _type: 'achievement',
      title: 'Disaster-Management System Presentation to KSDMA',
      category: 'presentation',
      date: '2024-03-15',
      description:
        'Presented RealSQ architectural blueprints and emergency response workflows to officials and evaluators at the Kerala State Disaster Management Authority (KSDMA).',
      sortOrder: 1,
    },
    {
      _id: 'achievement-college-exhibition',
      _type: 'achievement',
      title: 'College Technical Exhibition Showcase (NAAC A+ Accreditation)',
      category: 'exhibition',
      date: '2024-02-10',
      description:
        'Exhibited intelligent chatbot and interactive game systems contributing to institutional NAAC A+ accreditation.',
      sortOrder: 2,
    },
  ]

  const mutations = documents.map((doc) => ({
    createOrReplace: doc,
  }))

  const payload = JSON.stringify({mutations})

  console.log(`Sending mutations for ${mutations.length} documents...`)

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
        console.log(`Mutation HTTP Status: ${res.statusCode}`)
        try {
          const json = JSON.parse(data)
          if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log('🎉 Sanity seeded successfully with images!')
            console.log('Transaction ID:', json.transactionId)
          } else {
            console.error('Mutation error:', json)
          }
        } catch (e) {
          console.log('Raw output:', data)
        }
      })
    }
  )

  req.on('error', (err) => {
    console.error('Mutation request failed:', err)
  })

  req.write(payload)
  req.end()
}

run()
