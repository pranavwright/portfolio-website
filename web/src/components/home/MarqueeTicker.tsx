'use client'

import React from 'react'

interface MarqueeTickerProps {
  items?: string[]
}

const defaultItems = [
  'FULL-STACK ARCHITECTURE',
  'SCALABLE BACKENDS',
  'NEXT.JS & REACT',
  'FASTIFY & NODE.JS',
  'FLUTTER MOBILE',
  'UI/UX MOTION',
  'CLOUD & DEVOPS',
  'API SYSTEMS',
]

export function MarqueeTicker({items = defaultItems}: MarqueeTickerProps) {
  return (
    <div className="relative w-full py-5 border-y border-border overflow-hidden bg-surface/40 select-none">
      {/* Subtle fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee space-x-8">
        {[...items, ...items].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-6 font-mono text-xs sm:text-sm font-semibold tracking-widest text-text-muted hover:text-accent transition-colors uppercase whitespace-nowrap"
          >
            <span>{item}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          </div>
        ))}
      </div>
    </div>
  )
}
