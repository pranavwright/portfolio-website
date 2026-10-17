'use client'

import React from 'react'
import {StatusBadge} from '@/components/ui/StatusBadge'
import {formatDate} from '@/lib/utils'
import type {CurrentlyBuilding as CurrentlyBuildingType} from '@/sanity/types'
import {Radio, Layers, ExternalLink} from 'lucide-react'

interface CurrentlyBuildingProps {
  items: CurrentlyBuildingType[]
}

export function CurrentlyBuilding({items}: CurrentlyBuildingProps) {
  if (!items || items.length === 0) return null

  return (
    <section id="now" className="py-28 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Header in Karolina Hess Editorial Style */}
        <div className="space-y-3 pb-6 border-b border-border">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent font-semibold">
            <Radio className="w-3.5 h-3.5 animate-pulse text-accent" />
            <span>Active Engineering Log</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-text-primary tracking-tight uppercase">
            Currently Building
          </h2>
          <p className="text-sm sm:text-base text-text-secondary max-w-xl leading-relaxed">
            Real products, experiments, and systems actively under engineering, testing, and research.
          </p>
        </div>

        {/* Grid of Active Initiatives */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div
              key={item._id}
              className="group relative flex flex-col justify-between rounded-2xl bg-surface border border-border p-7 hover:border-accent/50 transition-all duration-300 shadow-xl space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-accent font-semibold">
                      [0{idx + 1}]
                    </span>
                    <StatusBadge status={item.status} />
                  </div>
                  {item.lastUpdated && (
                    <span className="text-[11px] font-mono text-text-muted">
                      {formatDate(item.lastUpdated)}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-text-primary tracking-tight uppercase group-hover:text-accent transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-mono text-text-muted">
                {item.focusArea && (
                  <div className="flex items-center gap-2 truncate">
                    <Layers className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                    <span className="truncate">{item.focusArea}</span>
                  </div>
                )}
                {item.externalUrl && (
                  <a
                    href={item.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-accent hover:underline ml-auto"
                  >
                    <span>Inspect</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
