'use client'

import React, {useRef} from 'react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'

export function SystemDiagram() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return
      }

      const paths = containerRef.current?.querySelectorAll('.network-path')
      const nodes = containerRef.current?.querySelectorAll('.network-node')
      const pings = containerRef.current?.querySelectorAll('.network-pulse')

      if (!paths || !nodes) return

      const tl = gsap.timeline({defaults: {ease: 'power2.out'}})

      tl.fromTo(
        paths,
        {strokeDashoffset: 400, opacity: 0},
        {strokeDashoffset: 0, opacity: 0.65, duration: 2, stagger: 0.2}
      )
        .fromTo(
          nodes,
          {scale: 0, opacity: 0},
          {scale: 1, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'back.out(1.7)'},
          '-=1.2'
        )

      if (pings) {
        gsap.to(pings, {
          scale: 2.2,
          opacity: 0,
          duration: 2.4,
          repeat: -1,
          stagger: 0.8,
          ease: 'power1.out',
        })
      }
    },
    {scope: containerRef}
  )

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[560px] aspect-[4/3] flex items-center justify-center pointer-events-none select-none opacity-85"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 560 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#a38221" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#222228" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1e24" />
            <stop offset="100%" stopColor="#111114" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Subtle grid background */}
        <line x1="40" y1="210" x2="520" y2="210" stroke="#1c1c22" strokeWidth="1" strokeDasharray="4 8" />
        <line x1="280" y1="40" x2="280" y2="380" stroke="#1c1c22" strokeWidth="1" strokeDasharray="4 8" />

        {/* Network connection paths */}
        <path
          d="M 120 140 Q 200 90 280 120"
          stroke="url(#lineGrad)"
          strokeWidth="1.5"
          strokeDasharray="400"
          className="network-path"
        />
        <path
          d="M 280 120 Q 360 150 440 140"
          stroke="url(#lineGrad)"
          strokeWidth="1.5"
          strokeDasharray="400"
          className="network-path"
        />
        <path
          d="M 280 120 L 280 260"
          stroke="url(#lineGrad)"
          strokeWidth="1.5"
          strokeDasharray="400"
          className="network-path"
        />
        <path
          d="M 120 140 Q 180 240 280 260"
          stroke="url(#lineGrad)"
          strokeWidth="1.5"
          strokeDasharray="400"
          className="network-path"
        />
        <path
          d="M 440 140 Q 380 240 280 260"
          stroke="url(#lineGrad)"
          strokeWidth="1.5"
          strokeDasharray="400"
          className="network-path"
        />
        <path
          d="M 280 260 L 200 340"
          stroke="url(#lineGrad)"
          strokeWidth="1.5"
          strokeDasharray="400"
          className="network-path"
        />
        <path
          d="M 280 260 L 360 340"
          stroke="url(#lineGrad)"
          strokeWidth="1.5"
          strokeDasharray="400"
          className="network-path"
        />

        {/* Pulses */}
        <circle cx="280" cy="120" r="14" stroke="#d4af37" strokeWidth="1" className="network-pulse origin-center" />
        <circle cx="280" cy="260" r="18" stroke="#d4af37" strokeWidth="1" className="network-pulse origin-center" />

        {/* Node 1: Client Interfaces */}
        <g className="network-node origin-center" transform-origin="120 140">
          <circle cx="120" cy="140" r="28" fill="url(#nodeGrad)" stroke="#2f2f38" strokeWidth="1.5" />
          <circle cx="120" cy="140" r="4" fill="#d4af37" />
          <text x="120" y="185" fill="#8a8782" fontSize="11" fontFamily="monospace" textAnchor="middle">
            CLIENT & UI
          </text>
        </g>

        {/* Node 2: API Gateway / Core Systems */}
        <g className="network-node origin-center" transform-origin="280 120">
          <circle cx="280" cy="120" r="34" fill="url(#nodeGrad)" stroke="#d4af37" strokeWidth="1.5" filter="url(#glow)" />
          <circle cx="280" cy="120" r="6" fill="#d4af37" />
          <text x="280" y="75" fill="#f5f2eb" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
            SYSTEM CORE
          </text>
        </g>

        {/* Node 3: Cloud & Services */}
        <g className="network-node origin-center" transform-origin="440 140">
          <circle cx="440" cy="140" r="28" fill="url(#nodeGrad)" stroke="#2f2f38" strokeWidth="1.5" />
          <circle cx="440" cy="140" r="4" fill="#d4af37" />
          <text x="440" y="185" fill="#8a8782" fontSize="11" fontFamily="monospace" textAnchor="middle">
            SERVICES & API
          </text>
        </g>

        {/* Node 4: Data Engine & Sync */}
        <g className="network-node origin-center" transform-origin="280 260">
          <rect
            x="245"
            y="225"
            width="70"
            height="70"
            rx="16"
            fill="url(#nodeGrad)"
            stroke="#3a3a46"
            strokeWidth="1.5"
          />
          <circle cx="280" cy="260" r="5" fill="#d4af37" />
          <text x="280" y="315" fill="#f5f2eb" fontSize="11" fontFamily="monospace" textAnchor="middle">
            DATA & EVENT BUS
          </text>
        </g>

        {/* Node 5: Real-time Dispatch */}
        <g className="network-node origin-center" transform-origin="200 340">
          <circle cx="200" cy="340" r="20" fill="url(#nodeGrad)" stroke="#282830" strokeWidth="1" />
          <circle cx="200" cy="340" r="3" fill="#8a8782" />
          <text x="200" y="375" fill="#66645e" fontSize="10" fontFamily="monospace" textAnchor="middle">
            REAL-TIME
          </text>
        </g>

        {/* Node 6: Intelligent Workflows */}
        <g className="network-node origin-center" transform-origin="360 340">
          <circle cx="360" cy="340" r="20" fill="url(#nodeGrad)" stroke="#282830" strokeWidth="1" />
          <circle cx="360" cy="340" r="3" fill="#8a8782" />
          <text x="360" y="375" fill="#66645e" fontSize="10" fontFamily="monospace" textAnchor="middle">
            AUTOMATION
          </text>
        </g>
      </svg>
    </div>
  )
}
