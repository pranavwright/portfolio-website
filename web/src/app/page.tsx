import React from 'react'
import {HeroSection} from '@/components/home/HeroSection'
import {MarqueeTicker} from '@/components/home/MarqueeTicker'
import {FeaturedProjects} from '@/components/home/FeaturedProjects'
import {PhilosophySection} from '@/components/home/PhilosophySection'
import {CurrentlyBuilding} from '@/components/home/CurrentlyBuilding'
import {ContactCta} from '@/components/home/ContactCta'
import {
  getSiteSettings,
  getFeaturedProjects,
  getAllProjects,
  getCurrentlyBuilding,
} from '@/sanity/fetch'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [settings, featuredProjects, allProjects, currentlyBuilding] =
    await Promise.all([
      getSiteSettings(),
      getFeaturedProjects(),
      getAllProjects(),
      getCurrentlyBuilding(),
    ])

  // If no explicitly featured projects, fall back to all projects
  const displayProjects =
    featuredProjects.length > 0 ? featuredProjects : allProjects

  return (
    <div>
      <HeroSection settings={settings} />
      <MarqueeTicker />
      <FeaturedProjects projects={displayProjects} />
      <PhilosophySection />
      <CurrentlyBuilding items={currentlyBuilding} />
      <ContactCta settings={settings} />
    </div>
  )
}
