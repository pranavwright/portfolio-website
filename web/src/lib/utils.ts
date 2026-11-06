import {clsx, type ClassValue} from 'clsx'
import {twMerge} from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString?: string) {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      year: 'numeric',
    }).format(date)
  } catch {
    return dateString
  }
}

export function formatDateRange(startDate?: string, endDate?: string, isCurrent?: boolean): string {
  if (!startDate) return '2023 — Present'
  const start = formatDate(startDate)
  if (isCurrent) return `${start} — Present`
  if (!endDate) return `${start} — Now`
  const end = formatDate(endDate)
  if (start && end && start === end) return start
  return `${start} — ${end}`
}
