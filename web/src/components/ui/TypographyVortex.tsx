'use client'

import React, { useRef, useEffect } from 'react'
import { prefersReducedMotion } from '@/lib/gsap'

export function TypographyVortex({
  phrase = 'PRANAV P S / FULL-STACK DEVELOPER / PRODUCT ARCHITECT / ',
}: {
  phrase?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId = 0
    let isVisible = false

    const render = () => {
      if (!isVisible) {
        animId = 0
        return
      }

      if (!prefersReducedMotion()) {
        const isDark = document.documentElement.dataset.theme === 'dark'
        ctx.clearRect(0, 0, width, height)
        const cx = width / 2
        const cy = height / 2

        ctx.font = '700 13px "Mona Sans Variable", sans-serif'
        ctx.fillStyle = isDark ? 'rgba(238, 238, 236, 0.14)' : 'rgba(17, 19, 21, 0.1)'

        rings.forEach((ring) => {
          ring.offset += ring.speed
          const circum = 2 * Math.PI * ring.radius
          const charAngle = (2 * Math.PI) / (circum / 14)

          ctx.save()
          ctx.translate(cx, cy)
          ctx.rotate(ring.offset)

          for (let i = 0; i < fullPhrase.length; i++) {
            const angle = i * charAngle
            if (angle > 2 * Math.PI) break
            ctx.save()
            ctx.rotate(angle)
            ctx.fillText(fullPhrase[i], 0, -ring.radius)
            ctx.restore()
          }

          ctx.restore()
        })
      }

      animId = requestAnimationFrame(render)
    }

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
      if (isVisible && !animId) {
        animId = requestAnimationFrame(render)
      }
    })
    observer.observe(canvas)

    let width = 0
    let height = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      if (!canvas) return
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener('resize', resize)

    const rings = [
      { radius: 100, speed: 0.003, offset: 0 },
      { radius: 180, speed: -0.0022, offset: Math.PI / 4 },
      { radius: 270, speed: 0.0018, offset: Math.PI / 2 },
      { radius: 370, speed: -0.0014, offset: Math.PI / 3 },
      { radius: 480, speed: 0.001, offset: 0 },
      { radius: 600, speed: -0.0008, offset: Math.PI / 6 },
    ]

    const fullPhrase = phrase.repeat(4)

    return () => {
      if (animId) cancelAnimationFrame(animId)
      observer.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [phrase])

  return (
    <div className="absolute inset-0 size-full overflow-hidden pointer-events-none select-none">
      <canvas ref={canvasRef} className="size-full block" />
    </div>
  )
}
