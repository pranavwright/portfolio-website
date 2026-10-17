import React from 'react'
import Link from 'next/link'
import {ArrowLeft, HelpCircle} from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl bg-card border border-border shadow-2xl">
        <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 text-primary mx-auto flex items-center justify-center">
          <HelpCircle className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase text-primary tracking-widest font-semibold">
            Error 404
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Route Not Found
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            The page or project you requested may have been unpublished, relocated, or does not exist.
          </p>
        </div>
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-primary-foreground bg-primary hover:opacity-90 active:scale-[0.98] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
