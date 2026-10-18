import groq from 'groq'

// All published projects
export const allProjectsQuery = groq`
  *[_type == "project" && defined(publishedAt) && publishedAt <= now()] | order(sortOrder asc, publishedAt desc) {
    _id,
    _type,
    title,
    slug,
    summary,
    status,
    currentlyBuilding,
    focusArea,
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

// Education & Academic History
export const educationQuery = groq`
  *[_type == "education"] | order(startDate desc, sortOrder asc) {
    _id,
    _type,
    degree,
    fieldOfStudy,
    institution,
    location,
    startDate,
    endDate,
    isCurrent,
    grade,
    description,
    activities,
    supportingUrl,
    sortOrder
  }
`

// Projects Currently Being Built
export const currentlyBuildingProjectsQuery = groq`
  *[_type == "project" && (currentlyBuilding == true || status in ["building", "in-progress"]) && defined(publishedAt) && publishedAt <= now()] | order(sortOrder asc, publishedAt desc) {
    _id,
    _type,
    title,
    slug,
    summary,
    status,
    currentlyBuilding,
    focusArea,
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
