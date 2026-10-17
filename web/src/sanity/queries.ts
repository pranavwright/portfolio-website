import {groq} from 'next-sanity'

// Global site settings singleton
export const siteSettingsQuery = groq`
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    _id,
    _type,
    name,
    alternativeName,
    headline,
    roles,
    shortBio,
    aboutBio,
    location,
    avatar {
      ...,
      asset->
    },
    email,
    githubUrl,
    linkedinUrl,
    instagramUrl,
    twitterUrl,
    resumePdf {
      asset-> {
        url,
        originalFilename
      }
    },
    contactHeadline,
    contactSubtext,
    seoTitle,
    seoDescription
  }
`

// All published projects
export const allProjectsQuery = groq`
  *[_type == "project" && defined(publishedAt) && publishedAt <= now()] | order(sortOrder asc, publishedAt desc) {
    _id,
    _type,
    title,
    slug,
    summary,
    status,
    category,
    role,
    featured,
    featuredImage {
      ...,
      asset->
    },
    technologies,
    features,
    liveUrl,
    repositoryUrl,
    startDate,
    endDate,
    sortOrder,
    publishedAt
  }
`

// Featured projects for home page
export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true && defined(publishedAt) && publishedAt <= now()] | order(sortOrder asc, publishedAt desc)[0...4] {
    _id,
    _type,
    title,
    slug,
    summary,
    status,
    category,
    role,
    featured,
    featuredImage {
      ...,
      asset->
    },
    technologies,
    features,
    problem,
    solution,
    liveUrl,
    repositoryUrl
  }
`

// Single project detail by slug
export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug && defined(publishedAt) && publishedAt <= now()][0] {
    _id,
    _type,
    title,
    slug,
    summary,
    status,
    category,
    role,
    featured,
    featuredImage {
      ...,
      asset->
    },
    gallery[] {
      ...,
      asset->
    },
    technologies,
    features,
    problem,
    solution,
    description,
    architecture,
    technicalChallenges,
    results,
    liveUrl,
    repositoryUrl,
    startDate,
    endDate,
    publishedAt,
    seoTitle,
    seoDescription
  }
`

// All published project slugs (for static paths / sitemap)
export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()] {
    "slug": slug.current,
    publishedAt,
    _updatedAt
  }
`

// Skills ordered
export const skillsQuery = groq`
  *[_type == "skill"] | order(sortOrder asc, name asc) {
    _id,
    _type,
    name,
    category,
    description,
    sortOrder
  }
`

// Experience timeline
export const experienceQuery = groq`
  *[_type == "experience"] | order(startDate desc, sortOrder asc) {
    _id,
    _type,
    role,
    organization,
    location,
    startDate,
    endDate,
    isCurrent,
    description,
    achievements,
    technologies,
    supportingUrl,
    sortOrder
  }
`

// Milestones & Achievements
export const achievementsQuery = groq`
  *[_type == "achievement"] | order(date desc, sortOrder asc) {
    _id,
    _type,
    title,
    category,
    date,
    description,
    evidenceUrl,
    sortOrder
  }
`

// Currently Building (Now)
export const currentlyBuildingQuery = groq`
  *[_type == "currentlyBuilding"] | order(sortOrder asc, _updatedAt desc) {
    _id,
    _type,
    title,
    status,
    description,
    focusArea,
    externalUrl,
    lastUpdated,
    sortOrder
  }
`
