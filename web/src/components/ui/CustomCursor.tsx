'use client'

import React, {useEffect, useState} from 'react'
import {motion, useMotionValue, useSpring} from 'framer-motion'

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [cursorText, setCursorText] = useState('')

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Spring physics for trailing ring
  const springConfig = {damping: 24, stiffness: 300, mass: 0.5}
  const ringX = useSpring(mouseX, springConfig)
  const ringY = useSpring(mouseY, springConfig)

  useEffect(() => {
    // Check if mouse/pointer device and not reduced motion
    const hasPointer = window.matchMedia('(pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!hasPointer || prefersReducedMotion) return

    setEnabled(true)
    document.body.classList.add('custom-cursor-active')

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const interactive = target.closest('a, button, [data-cursor="interactive"], [role="button"]')
      if (interactive) {
        setHovered(true)
        const customLabel = interactive.getAttribute('data-cursor-text')
        setCursorText(customLabel || '')
      } else {
        setHovered(false)
        setCursorText('')
      }
    }

    window.addEventListener('mousemove', handleMouseMove, {passive: true})
    document.addEventListener('mouseover', handleMouseOver, {passive: true})

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [mouseX, mouseY])

  if (!enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Outer smoothing follower ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-accent/80 flex items-center justify-center pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: hovered ? (cursorText ? 72 : 46) : 28,
          height: hovered ? (cursorText ? 72 : 46) : 28,
          backgroundColor: hovered
            ? cursorText
              ? 'rgba(191, 219, 57, 0.9)'
              : 'rgba(191, 219, 57, 0.18)'
            : 'rgba(191, 219, 57, 0)',
          borderColor: hovered ? 'rgba(191, 219, 57, 0.9)' : 'rgba(191, 219, 57, 0.5)',
        }}
        transition={{type: 'spring', damping: 20, stiffness: 260}}
      >
        {cursorText && (
          <span className="text-[10px] font-mono font-bold tracking-tight text-background uppercase">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Center sharp dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-accent pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: hovered ? (cursorText ? 0 : 0.5) : 1,
          opacity: cursorText ? 0 : 1,
        }}
        transition={{duration: 0.15}}
      />
    </div>
  )
}
