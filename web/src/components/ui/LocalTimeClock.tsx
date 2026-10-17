'use client'

import React, {useState, useEffect} from 'react'

interface LocalTimeClockProps {
  className?: string
}

export function LocalTimeClock({className = ''}: LocalTimeClockProps) {
  const [timeStr, setTimeStr] = useState<string>('')

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date()
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
        setTimeStr(formatter.format(now))
      } catch {
        setTimeStr('')
      }
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!timeStr) return null

  return (
    <div
      className={`inline-flex items-center gap-2 font-mono text-xs text-text-secondary ${className}`}
      title="Current local time in Kerala, India (IST)"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
      <span>Kerala, IN</span>
      <span className="text-text-muted">•</span>
      <span className="text-text-primary font-medium tracking-wide">{timeStr} IST</span>
    </div>
  )
}
