'use client'

import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {Github, Menu, X, ArrowUpRight} from 'lucide-react'
import {cn} from '@/lib/utils'

interface NavigationProps {
  githubUrl?: string
  name?: string
}

const navLinks = [
  {name: 'Home', href: '/'},
  {name: 'Work', href: '/projects'},
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
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
          scrolled
            ? 'bg-background/80 backdrop-blur-md border-border/80 py-3 shadow-lg shadow-black/20'
            : 'bg-transparent border-transparent py-5'
        )}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo / Brand */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-text-primary hover:text-accent transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse-subtle" />
            <span className="font-semibold tracking-tight text-sm md:text-base font-mono">
              {name}
            </span>
            <span className="text-xs text-text-muted hidden sm:inline-block font-mono border border-border px-1.5 py-0.5 rounded">
              builder
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-surface/80 border border-border/80 px-3 py-1.5 rounded-full backdrop-blur-sm">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href) && link.href !== '/#now' && link.href !== '/#contact'

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'relative px-3.5 py-1.5 rounded-full text-xs font-mono transition-colors',
                    isActive
                      ? 'text-text-primary bg-border/60 font-medium'
                      : 'text-text-secondary hover:text-text-primary'
                  )}
                >
                  {link.name}
                </Link>
              )
            })}
          </nav>

          {/* Action CTAs */}
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
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-text-primary bg-surface hover:bg-surface-hover border border-border hover:border-accent-border transition-all"
            >
              <span>Let&apos;s Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-accent" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-text-secondary hover:text-text-primary border border-border rounded-lg bg-surface"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
