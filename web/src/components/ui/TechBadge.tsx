import React from 'react'
import {cn} from '@/lib/utils'

interface TechBadgeProps {
  name: string
  className?: string
}

export function TechBadge({name, className}: TechBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono text-text-secondary bg-surface border border-border/80 hover:border-accent-border/60 hover:text-text-primary transition-all duration-200 select-none',
        className
      )}
    >
      {name}
    </span>
  )
}
