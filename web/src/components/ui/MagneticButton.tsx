'use client'

import React, {useRef} from 'react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import {cn} from '@/lib/utils'

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  strength?: number
  asLink?: boolean
  href?: string
}

export function MagneticButton({
  children,
  className,
  strength = 0.35,
  asLink = false,
  href,
  onClick,
  ...props
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Respect prefers-reduced-motion
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return
      }

      const container = containerRef.current
      const content = contentRef.current
      if (!container || !content) return

      const xTo = gsap.quickTo(content, 'x', {duration: 0.8, ease: 'elastic.out(1, 0.3)'})
      const yTo = gsap.quickTo(content, 'y', {duration: 0.8, ease: 'elastic.out(1, 0.3)'})

      const handleMouseMove = (e: MouseEvent) => {
        const {clientX, clientY} = e
        const {left, top, width, height} = container.getBoundingClientRect()
        const x = (clientX - (left + width / 2)) * strength
        const y = (clientY - (top + height / 2)) * strength
        xTo(x)
        yTo(y)
      }

      const handleMouseLeave = () => {
        xTo(0)
        yTo(0)
      }

      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
    },
    {scope: containerRef}
  )

  const innerContent = (
    <div ref={contentRef} className="relative z-10 flex items-center justify-center">
      {children}
    </div>
  )

  if (asLink && href) {
    return (
      <div ref={containerRef} className="inline-block">
        <a href={href} className={cn('relative inline-flex items-center justify-center overflow-hidden transition-colors', className)}>
          {innerContent}
        </a>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="inline-block">
      <button
        onClick={onClick}
        className={cn('relative inline-flex items-center justify-center overflow-hidden transition-colors', className)}
        {...props}
      >
        {innerContent}
      </button>
    </div>
  )
}
