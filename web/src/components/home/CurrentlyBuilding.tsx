import React from 'react'
import {StatusBadge} from '@/components/ui/StatusBadge'
import {formatDate} from '@/lib/utils'
import type {CurrentlyBuilding as CurrentlyBuildingType} from '@/sanity/types'
import {Radio, Layers} from 'lucide-react'

interface CurrentlyBuildingProps {
  items: CurrentlyBuildingType[]
}

export function CurrentlyBuilding({items}: CurrentlyBuildingProps) {
  if (!items || items.length === 0) return null

  return (
    <section id="now" className="py-24 border-t border-border/80">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        {/* Header */}
        <div className="space-y-3 pb-2 border-b border-border/60">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent">
            <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
            <span>Active Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
            Currently Building
          </h2>
          <p className="text-sm sm:text-base text-text-secondary max-w-xl leading-relaxed">
            What I am actively shipping, testing, and researching right now — real products in active development.
          </p>
        </div>

        {/* Grid of Active Initiatives */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="group relative flex flex-col justify-between rounded-xl bg-surface border border-border p-6 hover:border-accent-border/60 transition-all duration-300 shadow-md"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <StatusBadge status={item.status} />
                  {item.lastUpdated && (
                    <span className="text-[11px] font-mono text-text-muted">
                      Updated {formatDate(item.lastUpdated)}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-text-primary tracking-tight group-hover:text-accent transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>

              {item.focusArea && (
                <div className="pt-4 mt-6 border-t border-border/70 flex items-center gap-2 text-xs font-mono text-text-muted">
                  <Layers className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                  <span className="truncate">Focus: {item.focusArea}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
