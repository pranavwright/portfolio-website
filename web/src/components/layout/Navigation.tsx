'use client'

import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {Github, Menu, X, ArrowUpRight} from 'lucide-react'
import {cn} from '@/lib/utils'

import {LocalTimeClock} from '@/components/ui/LocalTimeClock'

interface NavigationProps {
  githubUrl?: string
  name?: string
}

const navLinks = [
  {name: 'Works', href: '/projects'},
  {name: 'About', href: '/about'},
  {name: 'Now', href: '/#now'},
  {name: 'Contact', href: '/#contact'},
]

export function Navigation({
  githubUrl = 'https://github.com/pranavwright',
  name = 'Pranav Wright',
}: NavigationProps) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-background/85 backdrop-blur-xl border-b border-border py-3 shadow-lg shadow-black/40'
            : 'bg-transparent py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Left: Brand Identity */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-text-primary hover:text-accent transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-semibold tracking-tight text-sm sm:text-base font-mono uppercase">
              {name}
            </span>
            <span className="text-[11px] font-mono text-accent/90 border border-accent/25 bg-accent/10 px-2 py-0.5 rounded-full hidden lg:inline-flex items-center gap-1">
              Available
            </span>
          </Link>

          {/* Center: Desktop Navigation & Live Time */}
          <div className="hidden md:flex items-center gap-4">
            <nav className="flex items-center gap-1 bg-surface/90 border border-border px-3 py-1.5 rounded-full backdrop-blur-md shadow-inner">
              <Link
                href="/"
                className={cn(
                  'px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-wider transition-colors',
                  pathname === '/'
                    ? 'text-text-primary bg-white/10 font-medium'
                    : 'text-text-secondary hover:text-text-primary'
                )}
              >
                Home
              </Link>
              {navLinks.map((link) => {
                const isActive =
                  link.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(link.href) &&
                      link.href !== '/#now' &&
                      link.href !== '/#contact'

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      'px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-wider transition-colors',
                      isActive
                        ? 'text-text-primary bg-white/10 font-medium'
                        : 'text-text-secondary hover:text-text-primary'
                    )}
                  >
                    {link.name}
                  </Link>
                )
              })}
            </nav>

            <div className="hidden xl:block pl-2 border-l border-border/80">
              <LocalTimeClock />
            </div>
          </div>

          {/* Right: Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-text-secondary hover:text-text-primary hover:bg-surface border border-transparent hover:border-border transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            <Link
              href="/#contact"
              className="group inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-semibold text-background bg-accent hover:bg-accent-hover transition-all duration-200 shadow-md shadow-accent/10"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-text-secondary hover:text-text-primary border border-border rounded-lg bg-surface/80 backdrop-blur-md"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-accent" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden pt-24 px-6 flex flex-col justify-between pb-10">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-semibold text-text-primary hover:text-accent transition-colors py-2 border-b border-border/50"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-4 pt-6 border-t border-border">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between text-text-secondary hover:text-text-primary text-sm font-mono"
            >
              <span className="flex items-center gap-2">
                <Github className="w-4 h-4" /> GitHub
              </span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 bg-accent text-background font-semibold rounded-lg text-sm"
            >
              Let&apos;s Connect
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
