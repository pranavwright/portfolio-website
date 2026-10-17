'use client'

import React from 'react'
import {CheckCircle2, Compass, Cpu, Layers, Sparkles} from 'lucide-react'

export function PhilosophySection() {
  const pillars = [
    {
      number: '01',
      title: 'Design & Architecture',
      description:
        'I specialize in digital architecture that is both thoughtful and scalable. Every schema, API route, and state machine is planned with rigor before code is written.',
      icon: <Compass className="w-5 h-5 text-accent" />,
      tags: ['Data Modeling', 'API Design', 'System Boundaries'],
    },
    {
      number: '02',
      title: 'Full-Stack Engineering',
      description:
        'I build end-to-end systems with high-throughput Fastify/Node backends, Next.js App Router frontends, and native-grade Flutter mobile applications.',
      icon: <Cpu className="w-5 h-5 text-accent" />,
      tags: ['TypeScript', 'Fastify', 'Next.js', 'Flutter'],
    },
    {
      number: '03',
      title: 'Craft & Motion',
      description:
        'From concept to execution. That is what sets modern software apart. Purposeful micro-interactions, spring physics, and accessible controls that delight users.',
      icon: <Sparkles className="w-5 h-5 text-accent" />,
      tags: ['Framer Motion', 'GSAP', 'Micro-Interactions'],
    },
  ]

  const values = [
    {
      title: 'The Messy Middle',
      description:
        'Always curious, always learning, and enjoying every phase of building. Complex problems require patience and rigorous experimentation.',
    },
    {
      title: 'Logic Rooted in Empathy',
      description:
        'Good software is not just an attractive layout. It is a coherent system of decisions rooted in real user workflows and clear outcomes.',
    },
    {
      title: 'Systems Over Chaos',
      description:
        'Maintainable architectures, automated testing, structured CMS workflows, and transparent documentation triumph over quick hacks every time.',
    },
    {
      title: 'Never Settle',
      description:
        'Patience for craftsmanship. Sweating the edge cases, query latencies, keyboard accessibility, and subtle interaction details.',
    },
  ]

  return (
    <section className="py-28 border-t border-border bg-surface/20">
      <div className="max-w-7xl mx-auto px-6 space-y-24">
        {/* 1. Approach / Pillars (01, 02, 03) */}
        <div className="space-y-12">
          <div className="space-y-3 pb-6 border-b border-border">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>Approach &amp; Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-text-primary tracking-tight uppercase">
              How I Build &amp; Deliver
            </h2>
            <p className="text-sm sm:text-base text-text-secondary max-w-xl leading-relaxed">
              Tailor-made solutions that push creative boundaries while keeping engineering reliability at the core.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar) => (
              <div
                key={pillar.number}
                className="group relative flex flex-col justify-between p-8 rounded-2xl bg-surface border border-border hover:border-accent/50 transition-all duration-300 space-y-8"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-bold text-accent">
                      {pillar.number}
                    </span>
                    <div className="p-2.5 rounded-xl bg-background border border-border">
                      {pillar.icon}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-text-primary tracking-tight uppercase group-hover:text-accent transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-text-secondary leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-border flex flex-wrap gap-2">
                  {pillar.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-background border border-border text-[11px] font-mono text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Values & Philosophy Grid */}
        <div className="space-y-12">
          <div className="space-y-3 pb-6 border-b border-border">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>Core Principles</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-text-primary tracking-tight uppercase">
              Values That Drive The Work
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-surface/60 border border-border hover:border-accent/40 transition-colors space-y-3"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-accent">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                  <span>Principle 0{i + 1}</span>
                </div>
                <h4 className="text-lg font-bold text-text-primary tracking-tight uppercase">
                  {v.title}
                </h4>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
