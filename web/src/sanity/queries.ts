import groq from 'groq'

// All published projects (filters out drafts, allows projects with or without publishedAt)
export const allProjectsQuery = groq`
  *[_type == "project" && !(_id in path("drafts.**")) && (!defined(publishedAt) || publishedAt <= now())] | order(sortOrder asc, coalesce(publishedAt, _createdAt) desc) {
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
  *[_type == "project" && featured == true && !(_id in path("drafts.**")) && (!defined(publishedAt) || publishedAt <= now())] | order(sortOrder asc, coalesce(publishedAt, _createdAt) desc)[0...4] {
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
  *[_type == "project" && slug.current == $slug && !(_id in path("drafts.**")) && (!defined(publishedAt) || publishedAt <= now())][0] {
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
  *[_type == "project" && defined(slug.current) && !(_id in path("drafts.**")) && (!defined(publishedAt) || publishedAt <= now())] {
    "slug": slug.current,
    publishedAt,
    _updatedAt
  }
`

// Skills ordered
export const skillsQuery = groq`
  *[_type == "skill" && !(_id in path("drafts.**"))] | order(sortOrder asc, name asc) {
    _id,
    _type,
    name,
    category,
    sortOrder
  }
`

// Experience timeline
export const experienceQuery = groq`
  *[_type == "experience" && !(_id in path("drafts.**"))] | order(startDate desc, sortOrder asc) {
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
    sortOrder
  }
`

// Author Profile & Media
export const profileQuery = groq`
  *[_type == "profile" && _id == "profile"][0] {
    _id,
    _type,
    avatar {
      ...,
      asset-> {
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      }
    },
    aboutImage {
      ...,
      asset-> {
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      }
    },
    mediaGallery[] {
      _key,
      title,
      subtitle,
      alt,
      date,
      location,
      image {
        ...,
        asset-> {
          _id,
          url,
          metadata {
            lqip,
            dimensions
          }
        }
      }
    }
  }
`

// Milestones & Achievements
export const achievementsQuery = groq`
  *[_type == "achievement" && !(_id in path("drafts.**"))] | order(date desc, sortOrder asc) {
    _id,
    _type,
    title,
    category,
    date,
    description,
    evidenceUrl,
    image {
      ...,
      asset-> {
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      }
    },
    sortOrder
  }
`

// Education & Academic History
export const educationQuery = groq`
  *[_type == "education" && !(_id in path("drafts.**"))] | order(startDate desc, sortOrder asc) {
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
    sortOrder
  }
`
