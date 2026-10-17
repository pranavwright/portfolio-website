import React from 'react'
import Link from 'next/link'
import {ArrowLeft, HelpCircle} from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl bg-surface border border-border shadow-2xl">
        <div className="w-14 h-14 rounded-full bg-surface-subtle border border-border text-accent mx-auto flex items-center justify-center">
          <HelpCircle className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase text-accent tracking-widest">
            Error 404
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
            Route Not Found
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            The page or project you requested may have been unpublished, relocated, or does not exist.
          </p>
        </div>
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-medium text-background bg-accent hover:bg-accent-hover transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
