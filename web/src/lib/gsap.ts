import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
  gsap.defaults({ ease: 'power3.out' })
}

export { gsap, ScrollTrigger, useGSAP }

export const motionOk = '(prefers-reduced-motion: no-preference)'
export const cinematic = '(min-width: 1024px) and (min-height: 620px) and (prefers-reduced-motion: no-preference)'

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
