export interface SanityImageAsset {
  _id?: string
  _ref?: string
  _type?: string
  url?: string
  metadata?: {
    lqip?: string
    dimensions?: {
      width: number
      height: number
      aspectRatio: number
    }
  }
}

export interface SanityImage {
  _type?: 'image'
  asset?: SanityImageAsset
  alt?: string
  caption?: string
}

export interface MediaGalleryItem {
  _key: string
  title: string
  alt: string
  caption?: string
  category?: 'speaking' | 'award' | 'exhibition' | 'workspace' | 'portrait' | 'event'
  date?: string
  location?: string
  image: SanityImage
}

export interface Profile {
  _id: string
  _type: 'profile'
  fullName?: string
  headline?: string
  bio?: string
  avatar?: SanityImage
  aboutImage?: SanityImage
  heroImage?: SanityImage
  heroBackground?: SanityImage
  socialOgImage?: SanityImage
  mediaGallery?: MediaGalleryItem[]
}


export interface Project {
  _id: string
  _type: 'project'
  _createdAt?: string
  _updatedAt?: string
  title: string
  slug: {
    current: string
  }
  summary: string
  status?: 'in-progress' | 'completed' | 'building' | 'researching' | 'paused' | 'archived'
  category?: 'web-app' | 'mobile' | 'tool' | 'design' | 'experiment'
  role?: string
  featured?: boolean
  currentlyBuilding?: boolean
  focusArea?: string
  featuredImage?: SanityImage
  gallery?: SanityImage[]
  technologies?: string[]
  features?: string[]
  problem?: string
  solution?: string
  description?: any[]
  architecture?: any[]
  technicalChallenges?: any[]
  results?: string
  liveUrl?: string
  repositoryUrl?: string
  startDate?: string
  endDate?: string
  sortOrder?: number
  publishedAt?: string
  seoTitle?: string
  seoDescription?: string
}

export interface Skill {
  _id: string
  _type: 'skill'
  name: string
  category: 'frontend' | 'backend' | 'databases' | 'mobile' | 'product-design' | 'tools'
  description?: string
  sortOrder?: number
}

export interface Experience {
  _id: string
  _type: 'experience'
  role: string
  organization: string
  location?: string
  startDate: string
  endDate?: string
  isCurrent?: boolean
  description?: string
  achievements?: string[]
  technologies?: string[]
  supportingUrl?: string
  sortOrder?: number
}

export interface Education {
  _id: string
  _type: 'education'
  degree: string
  fieldOfStudy?: string
  institution: string
  location?: string
  startDate: string
  endDate?: string
  isCurrent?: boolean
  grade?: string
  description?: string
  activities?: string[]
  supportingUrl?: string
  sortOrder?: number
}

export interface Achievement {
  _id: string
  _type: 'achievement'
  title: string
  category: 'exhibition' | 'contribution' | 'presentation' | 'honor'
  date?: string
  description?: string
  evidenceUrl?: string
  image?: SanityImage
  sortOrder?: number
}


