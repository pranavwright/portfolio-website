import React from 'react'
import { HeroSequence } from '@/components/home/HeroSequence'
import { ApproachSection } from '@/components/home/ApproachSection'
import { SelectedWork } from '@/components/home/SelectedWork'
import { InTheirWords } from '@/components/home/InTheirWords'
import { ExperienceSection } from '@/components/home/ExperienceSection'
import { BeyondSection } from '@/components/home/BeyondSection'
import {
  getFeaturedProjects,
  getAllProjects,
  getExperience,
  getProfile,
  getAchievements,
} from '@/sanity/fetch'

export const revalidate = 60 // ISR: revalidate every minute

export default async function HomePage() {
  const [featuredProjects, allProjects, experience, profile, achievements] = await Promise.all([
    getFeaturedProjects(),
    getAllProjects(),
    getExperience(),
    getProfile().catch(() => null),
    getAchievements().catch(() => []),
  ])

  const displayProjects = featuredProjects.length > 0 ? featuredProjects : allProjects

  const beyondPhoto =
    achievements.find((a) => a.image)?.image ||
    profile?.mediaGallery?.find((m) => m.category === 'speaking' || m.category === 'exhibition')?.image ||
    profile?.mediaGallery?.[0]?.image

  return (
    <>
      <HeroSequence />
      <ApproachSection />
      <SelectedWork sanityProjects={displayProjects} />
      <InTheirWords />
      <ExperienceSection sanityExperience={experience} />
      <BeyondSection photo={beyondPhoto} />
    </>
  )
}
