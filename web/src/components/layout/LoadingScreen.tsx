'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import { SITE } from '@/lib/site'

// Critical assets to preload before revealing the site
const CRITICAL_IMAGES = [
  '/pranav/hero-bg.webp',
  '/pranav/hero.webp',
  '/project/project-1.png',
  '/project/project-2.png',
]

const statusStages = [
  { threshold: 0, text: 'SCANNING ENVIRONMENT' },
  { threshold: 25, text: 'PRELOADING FONTS & ASSETS' },
  { threshold: 55, text: 'DECODING HIGH-RES MEDIA' },
  { threshold: 85, text: 'SYNCHRONIZING SCENERY' },
  { threshold: 100, text: 'SYSTEM READY' },
]

export function LoadingScreen() {
  const [percent, setPercent] = useState(0)
  const [statusText, setStatusText] = useState('INITIALIZING ENVIRONMENT')
  const [isCompleted, setIsCompleted] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const mainCurtainRef = useRef<HTMLDivElement>(null)
  const trailCurtainRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Immediate bypass for users requesting reduced motion
    if (prefersReducedMotion()) {
      setIsCompleted(true)
      return
    }

    // Lock page scrolling while assets are actively loading
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    let isExiting = false
    const progressState = { current: 0, target: 10 } // Start with 10% for initial bootstrap

    // Update status text based on percentage
    const updateStatus = (val: number) => {
      let matchedText = statusStages[0].text
      for (const stage of statusStages) {
        if (val >= stage.threshold) {
          matchedText = stage.text
        }
      }
      setStatusText(matchedText)
    }

    // Trigger the exit curtain animation once 100% is reached
    const triggerExit = () => {
      if (isExiting) return
      isExiting = true

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = originalOverflow
          setIsCompleted(true)
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('resize'))
          }
        },
      })

      // 1. Fade content slightly upward
      tl.to(
        contentRef.current,
        {
          opacity: 0,
          y: -25,
          duration: 0.35,
          ease: 'power3.in',
        },
        '+=0.15'
      )

      // 2. Lift main obsidian curtain
      tl.to(
        mainCurtainRef.current,
        {
          yPercent: -100,
          duration: 0.85,
          ease: 'expo.inOut',
        },
        '-=0.05'
      )

      // 3. Trail emerald accent curtain for multi-plane depth
      tl.to(
        trailCurtainRef.current,
        {
          yPercent: -100,
          duration: 0.85,
          ease: 'expo.inOut',
        },
        '-=0.78'
      )
    }

    // Smoothly interpolate displayed counter towards target percentage
    const tween = gsap.to(progressState, {
      current: '+=0', // Initial dummy
      duration: 0.3,
      ease: 'power1.out',
      paused: true,
    })

    const updateProgressDisplay = (newTarget: number) => {
      progressState.target = Math.min(100, Math.max(progressState.target, newTarget))
      tween.kill()

      gsap.to(progressState, {
        current: progressState.target,
        duration: progressState.target === 100 ? 0.4 : 0.6,
        ease: 'power2.out',
        onUpdate: () => {
          const rounded = Math.floor(progressState.current)
          setPercent(rounded)
          updateStatus(rounded)
          if (barRef.current) {
            barRef.current.style.width = `${rounded}%`
          }

          if (rounded >= 100) {
            triggerExit()
          }
        },
      })
    }

    // Asset Tracking Architecture
    let loadedWeight = 0
    const weights = {
      windowLoad: 25,
      fonts: 20,
      imageEach: Math.floor(55 / Math.max(1, CRITICAL_IMAGES.length)),
    }
    const totalPossibleWeight =
      weights.windowLoad + weights.fonts + weights.imageEach * CRITICAL_IMAGES.length

    const onItemLoaded = (weight: number) => {
      loadedWeight += weight
      const calculated = Math.min(
        100,
        Math.round((loadedWeight / totalPossibleWeight) * 100)
      )
      updateProgressDisplay(calculated)
    }

    // 1. Preload fonts
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready
        .then(() => onItemLoaded(weights.fonts))
        .catch(() => onItemLoaded(weights.fonts))
    } else {
      onItemLoaded(weights.fonts)
    }

    // 2. Preload critical images with HTMLImageElement & decode()
    CRITICAL_IMAGES.forEach((src) => {
      const img = new Image()
      img.src = src

      const handleImageComplete = () => {
        // If supported, wait for GPU decode so image renders instantly without jank
        if ('decode' in img) {
          img
            .decode()
            .then(() => onItemLoaded(weights.imageEach))
            .catch(() => onItemLoaded(weights.imageEach))
        } else {
          onItemLoaded(weights.imageEach)
        }
      }

      if (img.complete) {
        handleImageComplete()
      } else {
        img.onload = handleImageComplete
        img.onerror = () => onItemLoaded(weights.imageEach)
      }
    })

    // 3. Track full window load event
    if (typeof document !== 'undefined') {
      if (document.readyState === 'complete') {
        onItemLoaded(weights.windowLoad)
      } else {
        const handleWindowLoad = () => {
          onItemLoaded(weights.windowLoad)
          window.removeEventListener('load', handleWindowLoad)
        }
        window.addEventListener('load', handleWindowLoad)
      }
    }

    // 4. Safety maximum timeout (ensure preloader never hangs indefinitely)
    const safetyTimer = setTimeout(() => {
      updateProgressDisplay(100)
    }, 4500)

    return () => {
      clearTimeout(safetyTimer)
      document.body.style.overflow = originalOverflow
    }
  }, [])

  if (isCompleted) {
    return null
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 z-[99999] pointer-events-none select-none overflow-hidden"
    >
      {/* Trailing Accent Curtain (Emerald) */}
      <div
        ref={trailCurtainRef}
        className="pointer-events-auto absolute inset-0 z-10 bg-primary rounded-b-[40px] md:rounded-b-[80px]"
      />

      {/* Main Obsidian Preloader Curtain */}
      <div
        ref={mainCurtainRef}
        className="pointer-events-auto absolute inset-0 z-20 flex flex-col justify-between bg-[#0a0d0b] text-[#f4f4f1] p-6 sm:p-10 md:p-14 rounded-b-[40px] md:rounded-b-[80px] shadow-2xl"
      >
        {/* Interior Animated Content Wrapper */}
        <div ref={contentRef} className="size-full flex flex-col justify-between">
          {/* Top Metadata Row */}
          <header className="flex items-center justify-between text-xs font-mono tracking-widest uppercase text-white/50">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#f4f4f1]">
                ps<span className="text-primary">.</span>
              </span>
              <span className="hidden sm:inline text-white/30">/</span>
              <span className="hidden sm:inline text-white/70">{SITE.name}</span>
            </div>

            <div className="flex items-center gap-2 text-white/40">
              <span className="inline-block size-1.5 rounded-full bg-primary animate-pulse" />
              <span>ASSET PRELOADER</span>
            </div>
          </header>

          {/* Center Stage: Real-Time Percentage Counter & Progress Line */}
          <main className="flex flex-col items-center justify-center text-center my-auto">
            {/* Real-time Status Stage */}
            <p className="text-[11px] sm:text-xs font-mono font-medium tracking-[0.25em] text-primary uppercase transition-all duration-300 mb-2">
              {statusText}
            </p>

            {/* Crisp Tabular Numeric Counter */}
            <div className="display-wide text-[clamp(4.5rem,14vw,11rem)] leading-none text-white tracking-tight tabular">
              {percent}
              <span className="text-[clamp(1.5rem,4vw,3.5rem)] text-primary ml-1 font-mono font-light opacity-80">
                %
              </span>
            </div>

            {/* Precision Progress Bar */}
            <div className="mt-6 w-48 sm:w-72 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <div
                ref={barRef}
                className="h-full bg-gradient-to-r from-emerald-500 via-primary to-emerald-300 rounded-full transition-all duration-100 ease-out"
                style={{ width: `${percent}%` }}
              />
            </div>
          </main>

          {/* Bottom Telemetry Row */}
          <footer className="flex items-center justify-between text-xs font-mono tracking-wider text-white/40">
            <span className="hidden sm:inline">
              {SITE.location.city.toUpperCase()}, {SITE.location.countryCode} // 60FPS
            </span>
            <span className="sm:hidden">
              {SITE.location.countryCode} // PRELOADER
            </span>

            <div className="flex items-center gap-2 text-white/60">
              <span>LOADING FILES</span>
              <span className="text-primary">[{percent}%]</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
