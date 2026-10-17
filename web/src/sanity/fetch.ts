import {client} from './client'
import {
  siteSettingsQuery,
  allProjectsQuery,
  featuredProjectsQuery,
  projectBySlugQuery,
  skillsQuery,
  experienceQuery,
  achievementsQuery,
  currentlyBuildingQuery,
  projectSlugsQuery,
} from './queries'
import type {
  SiteSettings,
  Project,
  Skill,
  Experience,
  Achievement,
  CurrentlyBuilding,
} from './types'

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await client.fetch<SiteSettings | null>(siteSettingsQuery)
  } catch (err) {
    console.error('Error fetching siteSettings:', err)
    return null
  }
}

export async function getAllProjects(): Promise<Project[]> {
  try {
    return await client.fetch<Project[]>(allProjectsQuery)
  } catch (err) {
    console.error('Error fetching projects:', err)
    return []
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    return await client.fetch<Project[]>(featuredProjectsQuery)
  } catch (err) {
    console.error('Error fetching featured projects:', err)
    return []
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    return await client.fetch<Project | null>(projectBySlugQuery, {slug})
  } catch (err) {
    console.error(`Error fetching project ${slug}:`, err)
    return null
  }
}

export async function getProjectSlugs(): Promise<{slug: string; publishedAt?: string; _updatedAt?: string}[]> {
  try {
    return await client.fetch(projectSlugsQuery)
  } catch (err) {
    console.error('Error fetching project slugs:', err)
    return []
  }
}

export async function getSkills(): Promise<Skill[]> {
  try {
    return await client.fetch<Skill[]>(skillsQuery)
  } catch (err) {
    console.error('Error fetching skills:', err)
    return []
  }
}

export async function getExperience(): Promise<Experience[]> {
  try {
    return await client.fetch<Experience[]>(experienceQuery)
  } catch (err) {
    console.error('Error fetching experience:', err)
    return []
  }
}

export async function getAchievements(): Promise<Achievement[]> {
  try {
    return await client.fetch<Achievement[]>(achievementsQuery)
  } catch (err) {
    console.error('Error fetching achievements:', err)
    return []
  }
}

export async function getCurrentlyBuilding(): Promise<CurrentlyBuilding[]> {
  try {
    return await client.fetch<CurrentlyBuilding[]>(currentlyBuildingQuery)
  } catch (err) {
    console.error('Error fetching currently building:', err)
    return []
  }
}
