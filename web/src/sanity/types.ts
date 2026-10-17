export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
}

export interface Project {
  _id: string
  _type: 'project'
  title: string
  slug: {
    current: string
  }
  summary: string
  status?: 'in-progress' | 'completed' | 'building' | 'researching' | 'paused' | 'archived'
  category?: 'web-app' | 'mobile' | 'tool' | 'design' | 'experiment'
  role?: string
  featured?: boolean
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

export interface SiteSettings {
  _id: string
  _type: 'siteSettings'
  name: string
  alternativeName?: string
  headline: string
  roles?: string[]
  shortBio: string
  aboutBio?: any[]
  location?: string
  avatar?: SanityImage
  email: string
  githubUrl?: string
  linkedinUrl?: string
  instagramUrl?: string
  twitterUrl?: string
  resumePdf?: {
    asset: {
      url?: string
      _ref?: string
    }
  }
  contactHeadline?: string
  contactSubtext?: string
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

export interface Achievement {
  _id: string
  _type: 'achievement'
  title: string
  category: 'exhibition' | 'contribution' | 'presentation' | 'honor'
  date?: string
  description?: string
  evidenceUrl?: string
  sortOrder?: number
}

export interface CurrentlyBuilding {
  _id: string
  _type: 'currentlyBuilding'
  title: string
  status: 'building' | 'researching' | 'experimenting' | 'completed' | 'paused'
  description: string
  focusArea?: string
  externalUrl?: string
  lastUpdated?: string
  sortOrder?: number
}
