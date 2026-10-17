import React from 'react'
import Link from 'next/link'
import {ArrowLeft} from 'lucide-react'

export default function NotFound() {
  return (
    <div className="pt-[calc(var(--header-height)+clamp(2rem,8vh,5rem))] pb-[clamp(5rem,14vh,10rem)]">
      <div className="max-w-7xl mx-auto">
        <section className="px-5 md:px-10 flex flex-col items-center text-center">
          {/* Large Display 404 */}
          <p className="display text-[clamp(8rem,30vw,22rem)] leading-[0.8] text-foreground opacity-10 select-none">
            404
          </p>

          {/* Editorial Heading */}
          <h1 className="display text-[clamp(2.75rem,5.4vw,5.5rem)] text-foreground -mt-8 md:-mt-14">
            Route Not Found
          </h1>

          <p className="mt-8 max-w-[42ch] text-[clamp(1.2rem,1.7vw,1.6rem)] leading-snug text-muted-foreground">
            The page or project you requested may have been unpublished, relocated, or does not exist.
          </p>

          {/* CTA */}
          <Link
            href="/"
            className="mt-12 inline-flex h-14 items-center gap-2 rounded-full bg-primary px-8 text-[16px] font-semibold text-primary-foreground transition-transform active:scale-[0.97] shadow-xl hover:opacity-95"
          >
            <ArrowLeft aria-hidden="true" className="size-5" strokeWidth={2} />
            Return to Portfolio
          </Link>

          {/* Helpful Nav Links */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[15px] font-medium">
            <Link href="/work" className="text-muted-foreground hover:text-foreground transition-colors underline decoration-1 underline-offset-[6px] hover:decoration-2">
              Work
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors underline decoration-1 underline-offset-[6px] hover:decoration-2">
              About
            </Link>
            <Link href="/resume" className="text-muted-foreground hover:text-foreground transition-colors underline decoration-1 underline-offset-[6px] hover:decoration-2">
              Resume
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors underline decoration-1 underline-offset-[6px] hover:decoration-2">
              Contact
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
