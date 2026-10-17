import React from 'react'
import { HeroSequence } from '@/components/home/HeroSequence'
import { ApproachSection } from '@/components/home/ApproachSection'
import { SelectedWork } from '@/components/home/SelectedWork'
import { InTheirWords } from '@/components/home/InTheirWords'
import { ExperienceSection } from '@/components/home/ExperienceSection'
import { BeyondSection } from '@/components/home/BeyondSection'
import {
  getSiteSettings,
  getFeaturedProjects,
  getAllProjects,
  getExperience,
} from '@/sanity/fetch'

export const revalidate = 60 // ISR: revalidate every minute

export default async function HomePage() {
  const [settings, featuredProjects, allProjects, experience] = await Promise.all([
    getSiteSettings(),
    getFeaturedProjects(),
    getAllProjects(),
    getExperience(),
  ])

  const displayProjects = featuredProjects.length > 0 ? featuredProjects : allProjects

  return (
    <>
      <HeroSequence />
      <ApproachSection />
      <SelectedWork sanityProjects={displayProjects} />
      <InTheirWords />
      <ExperienceSection sanityExperience={experience} />
      <BeyondSection />
    </>
  )
}
