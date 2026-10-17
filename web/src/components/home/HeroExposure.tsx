'use client'

import React, { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '@/lib/gsap'


export function StarTrails() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    const onResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', onResize)

    const poleX = width * 0.95
    const poleY = height * 0.1
    const starCount = 140
    const stars: { radius: number; angle: number; speed: number; alpha: number }[] = []

    for (let i = 0; i < starCount; i++) {
      stars.push({
        radius: Math.random() * (Math.max(width, height) * 1.2),
        angle: Math.random() * Math.PI * 2,
        speed: 0.0004 + Math.random() * 0.0006,
        alpha: 0.2 + Math.random() * 0.6,
      })
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.lineCap = 'round'

      stars.forEach((star) => {
        if (!prefersReducedMotion()) {
          star.angle += star.speed
        }
        const arcLength = 0.08
        ctx.beginPath()
        ctx.arc(poleX, poleY, star.radius, star.angle, star.angle + arcLength)
        ctx.strokeStyle = `rgba(244, 244, 241, ${star.alpha})`
        ctx.lineWidth = 1.2
        ctx.stroke()
      })

      animId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div aria-hidden="true" className="star-trails pointer-events-none absolute inset-0 -z-10">
      <canvas ref={canvasRef} className="absolute inset-0 size-full opacity-60" />
    </div>
  )
}
