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

if (!PROJECT_ID) {
  console.error('\x1b[31m%s\x1b[0m', 'Error: Missing Sanity Project ID.')
  process.exit(1)
}

if (!WRITE_TOKEN) {
  console.error('\x1b[31m%s\x1b[0m', 'Error: Missing Sanity Write API Token.')
  process.exit(1)
}

const documents = [
  // =========================================================================
  // 1. PROFESSIONAL EXPERIENCES (From Resume)
  // =========================================================================
  {
    _id: 'exp-kerala-dma',
    _type: 'experience',
    role: 'Team Lead',
    organization: 'Kerala Disaster Management Authority',
    location: 'Remote',
    startDate: '2025-09-01',
    isCurrent: true,
    description:
      'Leading product and technical strategy for RealSQ, an offline-first disaster management platform that enables real-time tracking of victims, camp resources, and logistics without continuous internet access.',
    achievements: [
      'Manage stakeholder engagement and presentations; prepared and presented solution briefs and reports to Wayanad DDMA and KSDMA; currently coordinating approvals with Kerala Startup Mission and planning pilot deployments.',
      'Aim to reduce response times, minimize resource wastage through smart allocation, and ensure tamper-proof digital registries for accountability.',
      'MVP developed and deployed on VPS from DigitalOcean.',
    ],
    technologies: ['Node.js', 'Fastify', 'MongoDB', 'DigitalOcean', 'Linux', 'GCP'],
    sortOrder: 1,
  },
  {
    _id: 'exp-freelance-psinteriors',
    _type: 'experience',
    role: 'Website Building (Full-Stack Engineer)',
    organization: 'Freelance',
    location: 'Remote',
    startDate: '2026-04-01',
    endDate: '2026-04-30',
    isCurrent: false,
    description:
      'Designed and engineered an animated showcase website for an interior works business (psinteriors.works) featuring responsive layouts, interactive animations, and Supabase integration.',
    achievements: [
      'Created an animated website for an interior works business, including responsive design and interactive animations.',
      'Implemented customer feedback management, basic SEO, and portfolio gallery management using Supabase for content and data storage.',
    ],
    technologies: ['Next.js', 'React', 'Supabase', 'Tailwind CSS', 'GSAP'],
    sortOrder: 2,
  },
  {
    _id: 'exp-necttos',
    _type: 'experience',
    role: 'Full Stack Developer (Part Time)',
    organization: 'Necttos',
    location: 'Pattambi, Palakkad',
    startDate: '2024-09-01',
    endDate: '2025-09-01',
    isCurrent: false,
    description:
      'Engineered cross-platform web and mobile interfaces, converting Figma designs into responsive implementations, optimizing API usage with TanStack Query, and building custom form tooling.',
    achievements: [
      'Converted Figma designs into responsive React and React Native interfaces, delivering pixel-accurate UI implementations.',
      'Optimized API usage with TanStack Query in React and React Native, reducing redundant requests by ~35% and improving load performance.',
      'Designed and developed a dynamic form-management feature (similar to Google Forms) for flexible data collection and configuration.',
      'Implemented keyboard shortcuts and small UX enhancements to increase user efficiency.',
      'Performed maintenance, bug fixes, and database backups for web and mobile applications to improve stability and uptime.',
    ],
    technologies: ['React', 'React Native', 'TanStack Query', 'Node.js', 'MongoDB', 'Figma'],
    sortOrder: 3,
  },
  {
    _id: 'exp-wayanad-ddma',
    _type: 'experience',
    role: 'Data Collection & Consolidation',
    organization: 'Wayanad DDMA',
    location: 'Kalpetta, Wayanad',
    startDate: '2024-07-01',
    endDate: '2024-08-01',
    isCurrent: false,
    description:
      'Consolidated scattered disaster relief datasets and automated survey data collection workflows for district administration officials.',
    achievements: [
      'Built a centralized master Google Sheet to consolidate scattered datasets and enable collaborative editing and version control.',
      'Developed a custom survey form integrated with Google Sheets to automate data capture and reduce manual entry, improving data accuracy and turnaround time.',
    ],
    technologies: ['Google Sheets API', 'Data Consolidation', 'JavaScript', 'Workflow Automation'],
    sortOrder: 4,
  },
  {
    _id: 'exp-google-solution-challenge',
    _type: 'experience',
    role: 'Team Lead, Backend Developer',
    organization: 'Google Solution Challenge',
    location: 'Remote',
    startDate: '2024-01-01',
    endDate: '2024-03-01',
    isCurrent: false,
    description:
      'Led backend development and offline-first architecture for RealSQ disaster-management platform in the Google Solution Challenge.',
    achievements: [
      'Led backend development for a full-stack disaster-management application using Node.js (Fastify) and integrated Flutter frontend, with AI-assisted features.',
      'Architected an offline-first platform enabling field officers to track victims, camp resources, and logistics in real time without continuous internet connectivity.',
      'Deployed and managed cloud infrastructure on Google Cloud Platform (GCP).',
    ],
    technologies: ['Fastify', 'Node.js', 'Flutter', 'MongoDB', 'GCP', 'REST APIs'],
    sortOrder: 5,
  },
  {
    _id: 'exp-college-works',
    _type: 'experience',
    role: 'Team Lead, Frontend Developer',
    organization: "College Works, St. Mary's College",
    location: 'Sulthan Bathery, Wayanad',
    startDate: '2023-06-01',
    endDate: '2023-12-01',
    isCurrent: false,
    description:
      'Led frontend development for college exhibition applications, interactive AI chatbots, and commercial client websites.',
    achievements: [
      'Developed and implemented several interactive games and an intelligent chatbot as part of the college exhibition program, resulting in the college receiving an NAAC A+ cycle accreditation.',
      'Developed a commercial jewelry e-commerce website (tpgoldanddiamonds.in) as part of the College Digital Wing Club.',
    ],
    technologies: ['React', 'JavaScript', 'Tailwind CSS', 'Chatbot AI'],
    sortOrder: 6,
  },

  // =========================================================================
  // 2. EDUCATION & ACADEMICS (From Resume)
  // =========================================================================
  {
    _id: 'edu-bca-stmarys',
    _type: 'education',
    degree: 'Bachelor of Computer Applications (BCA)',
    fieldOfStudy: 'Computer Applications',
    institution: "St. Mary's College",
    location: 'Sulthan Bathery, Wayanad',
    startDate: '2023-08-01',
    endDate: '2026-04-01',
    isCurrent: true,
    grade: 'Expected Graduation 2026',
    description:
      'Rigorous foundation in computer science and application development: algorithms, database architecture, mobile application programming, operating systems, and distributed networks.',
    activities: [
      'Lead Developer, College Digital Wing Club',
      'Exhibition Project Lead contributing to NAAC A+ Institutional Accreditation',
    ],
    sortOrder: 1,
  },
  {
    _id: 'edu-hss-kulathummal',
    _type: 'education',
    degree: 'Higher Secondary (+2)',
    fieldOfStudy: 'Commerce',
    institution: 'Govt. HSS Kulathummal',
    location: 'Kattakada, Thiruvananthapuram',
    startDate: '2021-06-01',
    endDate: '2023-03-01',
    isCurrent: false,
    description:
      'Completed Higher Secondary education with focus on business mathematics, commerce, and computer fundamentals.',
    sortOrder: 2,
  },

  // =========================================================================
  // 3. SKILLS & AREAS OF EXPERTISE (From Resume)
  // =========================================================================
  {
    _id: 'skill-nextjs',
    _type: 'skill',
    name: 'Next.js',
    category: 'frontend',
    sortOrder: 1,
  },
  {
    _id: 'skill-react',
    _type: 'skill',
    name: 'React.js',
    category: 'frontend',
    sortOrder: 2,
  },
  {
    _id: 'skill-typescript',
    _type: 'skill',
    name: 'TypeScript',
    category: 'frontend',
    sortOrder: 3,
  },
  {
    _id: 'skill-tailwind',
    _type: 'skill',
    name: 'Tailwind CSS',
    category: 'frontend',
    sortOrder: 4,
  },
  {
    _id: 'skill-tanstack-query',
    _type: 'skill',
    name: 'TanStack Query',
    category: 'frontend',
    sortOrder: 5,
  },
  {
    _id: 'skill-nodejs',
    _type: 'skill',
    name: 'Node.js',
    category: 'backend',
    sortOrder: 6,
  },
  {
    _id: 'skill-fastify',
    _type: 'skill',
    name: 'Fastify.js',
    category: 'backend',
    sortOrder: 7,
  },
  {
    _id: 'skill-express',
    _type: 'skill',
    name: 'Express.js',
    category: 'backend',
    sortOrder: 8,
  },
  {
    _id: 'skill-rest-api',
    _type: 'skill',
    name: 'REST APIs',
    category: 'backend',
    sortOrder: 9,
  },
  {
    _id: 'skill-mongodb',
    _type: 'skill',
    name: 'MongoDB',
    category: 'databases',
    sortOrder: 10,
  },
  {
    _id: 'skill-supabase',
    _type: 'skill',
    name: 'Supabase',
    category: 'databases',
    sortOrder: 11,
  },
  {
    _id: 'skill-linux',
    _type: 'skill',
    name: 'Linux',
    category: 'databases',
    sortOrder: 12,
  },
  {
    _id: 'skill-vps',
    _type: 'skill',
    name: 'VPS (GCP, Digital Ocean)',
    category: 'databases',
    sortOrder: 13,
  },
  {
    _id: 'skill-react-native',
    _type: 'skill',
    name: 'React Native',
    category: 'mobile',
    sortOrder: 14,
  },
  {
    _id: 'skill-flutter',
    _type: 'skill',
    name: 'Flutter',
    category: 'mobile',
    sortOrder: 15,
  },
  {
    _id: 'skill-git',
    _type: 'skill',
    name: 'Git & GitHub',
    category: 'tools',
    sortOrder: 16,
  },
  {
    _id: 'skill-project-mgmt',
    _type: 'skill',
    name: 'Project Management',
    category: 'tools',
    sortOrder: 17,
  },
  {
    _id: 'skill-stakeholder',
    _type: 'skill',
    name: 'Stakeholder Presentation & Briefing',
    category: 'product-design',
    sortOrder: 18,
  },

  // =========================================================================
  // 4. PROJECTS (From Resume + Existing Showcases)
  // =========================================================================
  {
    _id: 'project-realsq',
    _type: 'project',
    title: 'RealSQ (ResQ)',
    slug: {_type: 'slug', current: 'realsq'},
    summary:
      'Offline-first disaster management platform enabling real-time tracking of victims, relief camp resources, and logistics without continuous internet connectivity.',
    status: 'building',
    category: 'web-app',
    role: 'Team Lead & Backend Developer',
    featured: true,
    sortOrder: 1,
    publishedAt: '2024-02-01T00:00:00.000Z',
    technologies: ['Fastify', 'Node.js', 'MongoDB', 'Flutter', 'React', 'GCP', 'DigitalOcean'],
    features: [
      'Offline-first data synchronization and local-first storage enabling reliable field operations in low-connectivity zones (~40% availability gain)',
      'Real-time relief camp capacity tracking, victim registries, and family reunification database',
      'Scalable REST APIs using Node.js (Fastify) and optimized MongoDB schemas reducing data duplication by ~30%',
      'Stakeholder-ready solution briefs and presentations prepared for Wayanad DDMA and KSDMA evaluators',
    ],
    problem:
      'During regional disasters and floods, communication breakdowns and chaotic supply distribution cause bottlenecks. Relief camps often receive surplus of items they do not need while suffering acute shortages of life-saving essentials.',
    solution:
      'RealSQ bridges ground volunteers, relief camp directors, and state agencies with a fast Fastify backend, responsive Flutter mobile app for field officers, and a comprehensive React administration portal deployed on DigitalOcean and GCP.',
    results:
      'Architected high-throughput backend with Fastify and MongoDB schemas; presented solution briefs to Wayanad DDMA and KSDMA; currently coordinating approvals with Kerala Startup Mission.',
    startDate: '2024-01-01',
  },
  {
    _id: 'project-nowme-live',
    _type: 'project',
    title: 'NowMe.live',
    slug: {_type: 'slug', current: 'nowme-live'},
    summary:
      'An AI-powered business operating system helping independent merchants and businesses effortlessly manage their online presence, customer operations, and automated workflows.',
    status: 'building',
    category: 'web-app',
    role: 'Product Builder & Full-Stack Architect',
    featured: true,
    sortOrder: 2,
    publishedAt: '2024-01-10T00:00:00.000Z',
    liveUrl: 'https://nowme.live',
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'AI Automations', 'Tailwind CSS', 'REST APIs'],
    features: [
      'Automated online storefront and landing page generation for businesses',
      'Integrated customer and booking pipeline with intelligent message routing',
      'Order processing and inventory management dashboard',
      'Marketing automation and customer relationship workflows',
    ],
    problem:
      'Small business owners often juggle half a dozen disconnected tools — website builders, payment links, spreadsheet inventories, and messaging apps. This fragmentation leads to lost orders, missed customer follow-ups, and overwhelming operational overhead.',
    solution:
      'NowMe.live unifies storefront creation, customer engagement, payments, and workflow automation into a cohesive business operating system tailored for independent merchants.',
    results:
      'Active production platform (nowme.live) empowering businesses with streamlined digital operations and automated client engagement.',
    startDate: '2023-11-01',
  },
  {
    _id: 'project-psinteriors',
    _type: 'project',
    title: 'PS Interiors Showcase',
    slug: {_type: 'slug', current: 'psinteriors'},
    summary:
      'Animated showcase and portfolio website for an interior design and architecture works business featuring interactive animations and Supabase data management.',
    status: 'completed',
    category: 'web-app',
    role: 'Full-Stack Engineer & UI Designer',
    featured: true,
    sortOrder: 3,
    publishedAt: '2026-04-01T00:00:00.000Z',
    liveUrl: 'https://psinteriors.works',
    technologies: ['Next.js', 'React', 'Supabase', 'Tailwind CSS', 'GSAP', 'Responsive UI'],
    features: [
      'Tactile interactive animations and 60fps responsive layout design',
      'Dynamic project gallery management powered by Supabase storage',
      'Automated customer feedback intake and inquiry management pipeline',
      'SEO optimization and fast edge delivery',
    ],
    problem:
      'Interior works businesses require visually stunning, tactile websites that demonstrate high craft and visual sophistication while allowing non-technical owners to update project galleries easily.',
    solution:
      'Engineered an animated portfolio website with smooth GSAP micro-interactions and a Supabase backend for effortless content and feedback management.',
    results: 'Live production deployment at psinteriors.works with automated inquiry processing.',
    startDate: '2026-04-01',
    endDate: '2026-04-30',
  },
  {
    _id: 'project-tpgold',
    _type: 'project',
    title: 'TP Gold and Diamonds',
    slug: {_type: 'slug', current: 'tpgoldanddiamonds'},
    summary:
      'Commercial jewelry showcase and e-commerce platform developed as part of the College Digital Wing Club.',
    status: 'completed',
    category: 'web-app',
    role: 'Lead Frontend Developer',
    featured: false,
    sortOrder: 4,
    publishedAt: '2023-10-01T00:00:00.000Z',
    liveUrl: 'https://tpgoldanddiamonds.in',
    technologies: ['React', 'JavaScript', 'Tailwind CSS', 'E-commerce UI'],
    features: [
      'Comprehensive product catalog with high-resolution jewelry showcases',
      'Category browsing and real-time inquiry channels',
      'Mobile-first responsive interface for high-ticket client engagement',
    ],
    problem:
      'Regional jewelry brands need clear, trustworthy digital storefronts that load rapidly and display intricate craftsmanship across mobile and desktop devices.',
    solution:
      'Built a clean, modern e-commerce showcase deployed at tpgoldanddiamonds.in.',
    results: 'Successfully deployed and handed over to brand stakeholders.',
    startDate: '2023-08-01',
    endDate: '2023-12-01',
  },
  {
    _id: 'project-carryko',
    _type: 'project',
    title: 'CarryKo',
    slug: {_type: 'slug', current: 'carryko'},
    summary:
      'On-demand vehicle booking application concept designed to simplify vehicle discovery, transit scheduling, and transparent customer-driver communication.',
    status: 'building',
    category: 'mobile',
    role: 'Product Designer & Full-Stack Developer',
    featured: false,
    sortOrder: 5,
    publishedAt: '2024-03-01T00:00:00.000Z',
    technologies: ['Flutter', 'Node.js', 'Mobile UI/UX', 'REST APIs'],
    features: [
      'Frictionless vehicle discovery and trip scheduling interface',
      'Direct customer-to-driver communication channel',
      'Transparent booking receipts and status tracking',
    ],
    problem:
      'Regional transport logistics frequently suffer from opaque booking terms, slow confirmation steps, and complex checkout processes.',
    solution:
      'CarryKo provides a streamlined, touch-friendly booking experience with clear trip stages and real-time ride tracking.',
    startDate: '2024-02-15',
  },

  // =========================================================================
  // 5. ACCOMPLISHMENTS & MILESTONES (From Resume)
  // =========================================================================
  {
    _id: 'achievement-ksdma',
    _type: 'achievement',
    title: 'Disaster-Management System Presentation & DDMA/KSDMA Pilot',
    category: 'presentation',
    date: '2024-03-15',
    description:
      'Presented RealSQ architectural blueprints and emergency response workflows to Wayanad DDMA and KSDMA evaluators; currently coordinating approvals with Kerala Startup Mission.',
    evidenceUrl: 'https://nowme.live',
    sortOrder: 1,
  },
  {
    _id: 'achievement-offline-sync',
    _type: 'achievement',
    title: 'Offline-First Sync Engine (~40% Field Data Availability Gain)',
    category: 'contribution',
    date: '2024-04-10',
    description:
      'Designed offline-first data synchronization and local-first storage for RealSQ, enabling reliable real-time tracking of victims and camp resources in low-connectivity disaster environments.',
    sortOrder: 2,
  },
  {
    _id: 'achievement-api-opt',
    _type: 'achievement',
    title: 'API & TanStack Query Optimization (35% Call Reduction)',
    category: 'contribution',
    date: '2025-02-20',
    description:
      'Optimized client-server communication using TanStack Query in React and React Native, cutting redundant API calls by ~35% and improving application responsiveness.',
    sortOrder: 3,
  },
  {
    _id: 'achievement-college-exhibition',
    _type: 'achievement',
    title: 'College Technical Exhibition Showcase (NAAC A+ Accreditation)',
    category: 'honor',
    date: '2023-11-20',
    description:
      'Developed interactive exhibition software, games, and an intelligent chatbot as part of the college exhibition program, contributing to the institution receiving an NAAC A+ accreditation.',
    evidenceUrl: 'https://tpgoldanddiamonds.in',
    sortOrder: 4,
  },
]

async function seed() {
  console.log(`Starting Sanity resume data sync for project: ${PROJECT_ID}, dataset: ${DATASET}...`)
  
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
            console.log('✅ Sanity Resume Data Sync Successful!')
            console.log(`Synchronized ${mutations.length} resume documents. Transaction ID:`, json.transactionId)
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
