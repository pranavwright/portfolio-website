import React from 'react'
import {cn} from '@/lib/utils'

interface StatusBadgeProps {
  status?: string
  className?: string
}

const statusMap: Record<string, {label: string; dotClass: string; bgClass: string}> = {
  'building': {
    label: 'Building',
    dotClass: 'bg-emerald-400 animate-pulse',
    bgClass: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  },
  'in-progress': {
    label: 'In Progress',
    dotClass: 'bg-amber-400 animate-pulse',
    bgClass: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
  },
  'researching': {
    label: 'Researching',
    dotClass: 'bg-blue-400',
    bgClass: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
  },
  'experimenting': {
    label: 'Experimenting',
    dotClass: 'bg-purple-400',
    bgClass: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
  },
  'completed': {
    label: 'Completed',
    dotClass: 'bg-emerald-400',
    bgClass: 'bg-surface text-text-secondary border-border',
  },
  'paused': {
    label: 'Paused',
    dotClass: 'bg-zinc-500',
    bgClass: 'bg-surface text-text-muted border-border',
  },
  'archived': {
    label: 'Archived',
    dotClass: 'bg-zinc-600',
    bgClass: 'bg-surface text-text-muted border-border',
  },
}

export function StatusBadge({status = 'in-progress', className}: StatusBadgeProps) {
  const current = statusMap[status] || statusMap['in-progress']

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border tracking-wide uppercase',
        current.bgClass,
        className
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full', current.dotClass)} />
      {current.label}
    </span>
  )
}
