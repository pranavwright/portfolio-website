import https from 'node:https'
import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables
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

console.log('Project ID:', PROJECT_ID)
console.log('Dataset:', DATASET)
console.log('Has write token:', !!WRITE_TOKEN)

if (!PROJECT_ID || !WRITE_TOKEN) {
  console.error('Missing PROJECT_ID or WRITE_TOKEN. Please ensure your .env.local contains credentials.')
  process.exit(1)
}

function uploadAsset(filePath, mimeType) {
  return new Promise((resolve) => {
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
  const webPublicDir = path.resolve(__dirname, '../../web/public')

  console.log('Uploading profile images to Sanity...')

  // 1. Avatar / Headshot
  const avatarPath = fs.existsSync(path.join(assetsDir, 'pranav/profile-about.jpg'))
    ? path.join(assetsDir, 'pranav/profile-about.jpg')
    : path.join(webPublicDir, 'pranav/profile-about.jpg')
  const avatarDoc = await uploadAsset(avatarPath, 'image/jpeg')

  // 2. About Editorial Photo
  const aboutPath = fs.existsSync(path.join(webPublicDir, 'pranav/about.jpg'))
    ? path.join(webPublicDir, 'pranav/about.jpg')
    : avatarPath
  const aboutDoc = await uploadAsset(aboutPath, 'image/jpeg')

  // 3. KSDMA Presentation Photo
  const ksdmaPath = fs.existsSync(path.join(assetsDir, 'achivements/presentation-KSDMA.jpg'))
    ? path.join(assetsDir, 'achivements/presentation-KSDMA.jpg')
    : path.join(webPublicDir, 'achivements/presentation-KSDMA.jpg')
  const ksdmaDoc = await uploadAsset(ksdmaPath, 'image/jpeg')

  // 4. NAAC A+ Exhibition / Honor Photo
  const naacPath = fs.existsSync(path.join(assetsDir, 'achivements/achivement-h-1.jpg'))
    ? path.join(assetsDir, 'achivements/achivement-h-1.jpg')
    : path.join(webPublicDir, 'achivements/achivement-h-1.jpg')
  const naacDoc = await uploadAsset(naacPath, 'image/jpeg')

  const mediaGallery = []

  if (aboutDoc) {
    mediaGallery.push({
      _key: 'studio-portrait-session',
      title: 'Engineering Studio Session',
      subtitle: 'Portraits & Creative Space',
      location: 'Trivandrum, Kerala',
      date: '2024-04-10',
      alt: 'Pranav Wright in software engineering and creative studio',
      image: {
        _type: 'image',
        asset: {_type: 'reference', _ref: aboutDoc._id},
      },
    })
  }

  if (ksdmaDoc) {
    mediaGallery.push({
      _key: 'ksdma-presentation-2024',
      title: 'Disaster Operations Presentation',
      subtitle: 'State Emergency Center • Technical Talk',
      location: 'Trivandrum, Kerala',
      date: '2024-03-15',
      alt: 'Pranav Wright presenting RealSQ architecture at Kerala State Disaster Management Authority',
      image: {
        _type: 'image',
        asset: {_type: 'reference', _ref: ksdmaDoc._id},
      },
    })
  }

  if (naacDoc) {
    mediaGallery.push({
      _key: 'naac-exhibition-2024',
      title: 'NAAC A+ Technical Showcase',
      subtitle: 'Exhibition & System Demonstrations',
      location: 'Kerala, India',
      date: '2024-02-10',
      alt: 'Pranav Wright exhibiting technical systems contributing to NAAC A+ accreditation',
      image: {
        _type: 'image',
        asset: {_type: 'reference', _ref: naacDoc._id},
      },
    })
  }

  const profileDoc = {
    _id: 'profile',
    _type: 'profile',
    ...(avatarDoc
      ? {
          avatar: {
            _type: 'image',
            alt: 'Pranav Wright official portrait headshot',
            caption: 'Pranav Wright — Full-Stack Developer & Product Builder',
            asset: {_type: 'reference', _ref: avatarDoc._id},
          },
        }
      : {}),
    ...(aboutDoc
      ? {
          aboutImage: {
            _type: 'image',
            alt: 'Pranav Wright in software engineering studio',
            caption: 'Pranav Wright exploring architecture and product design',
            asset: {_type: 'reference', _ref: aboutDoc._id},
          },
        }
      : {}),
    mediaGallery,
  }

  const mutations = [
    {createOrReplace: profileDoc},
  ]

  if (ksdmaDoc) {
    mutations.push({
      patch: {
        id: 'achievement-ksdma',
        set: {
          image: {
            _type: 'image',
            alt: 'Pranav Wright presenting RealSQ disaster-management blueprints at KSDMA',
            caption: 'Presenting to Kerala State Disaster Management Authority evaluators',
            asset: {_type: 'reference', _ref: ksdmaDoc._id},
          },
        },
      },
    })
  }

  const payload = JSON.stringify({mutations})

  console.log(`Sending mutations to Sanity...`)

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
        try {
          const json = JSON.parse(data)
          if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log('🎉 Sanity Profile document and images seeded successfully!')
            console.log('Transaction ID:', json.transactionId)
          } else {
            console.error('Mutation error:', json)
          }
        } catch (e) {
          console.log('Raw response:', data)
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
