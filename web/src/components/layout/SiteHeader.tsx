'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Mail, Moon, Sun, Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { SITE } from '@/lib/site'

interface SiteHeaderProps {
  name?: string
  email?: string
}

const navItems = [
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/resume', label: 'Resume' },
  { href: '/contact', label: 'Contact' },
]

export function SiteHeader({
  name = SITE.name,
  email = SITE.email,
}: SiteHeaderProps) {
  const pathname = usePathname()
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null
    if (saved) {
      setTheme(saved)
      document.documentElement.dataset.theme = saved
    } else {
      setTheme('light')
      document.documentElement.dataset.theme = 'light'
    }
  }, [])

  // Lock scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.dataset.theme = next
    localStorage.setItem('theme', next)
  }

  return (
    <>
      <header className="site-header fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 text-foreground backdrop-blur-xl transition-[background-color,border-color,color] duration-500">
        <div className="mx-auto flex h-[var(--header-height)] max-w-7xl items-center justify-between gap-4 px-5 md:px-10">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center text-[1.35rem] font-extrabold tracking-[-0.04em] [font-stretch:115%]"
          >
            <span>
              ps<span className="header-brand-dot text-primary transition-colors">.</span>
            </span>
            <span className="ml-3 text-[14px] sm:text-[15px] font-medium tracking-normal [font-stretch:100%] max-sm:hidden text-muted-foreground">
              {name}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav aria-label="Primary" className="hidden md:flex items-center gap-1 text-[15px] font-medium">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative rounded-full px-3.5 py-2 transition-all hover:opacity-100 ${
                    isActive ? 'opacity-100 font-semibold text-foreground' : 'opacity-70 text-foreground'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3.5 bottom-1 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Actions: Theme Toggle, CTA, and Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop CTA */}
            <Link
              href="/contact"
              className="header-cta hidden h-10 items-center rounded-full bg-foreground px-5 text-[15px] font-medium text-background transition-transform active:scale-[0.97] md:inline-flex hover:opacity-90 shadow-sm"
            >
              Get in touch
            </Link>

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'evening' : 'daylight'} theme`}
              title={`Switch to ${theme === 'light' ? 'evening' : 'daylight'} theme`}
              className="grid size-11 place-items-center rounded-full border border-border/60 bg-card/60 transition-transform active:scale-[0.94] text-foreground hover:bg-muted"
            >
              {theme === 'light' ? (
                <Moon aria-hidden="true" className="size-[18px]" strokeWidth={1.75} />
              ) : (
                <Sun aria-hidden="true" className="size-[18px]" strokeWidth={1.75} />
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="grid size-11 place-items-center rounded-full border border-border/60 bg-card/60 md:hidden text-foreground hover:bg-muted transition-transform active:scale-[0.94]"
            >
              {mobileMenuOpen ? (
                <X aria-hidden="true" className="size-5" strokeWidth={2} />
              ) : (
                <Menu aria-hidden="true" className="size-5" strokeWidth={2} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="fixed inset-0 top-[var(--header-height)] z-40 md:hidden flex flex-col justify-between bg-background/98 backdrop-blur-2xl px-6 py-8 border-b border-border animate-in fade-in slide-in-from-top-4 duration-300"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-4 pt-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-2xl font-bold py-2 border-b border-border/40 transition-colors flex items-center justify-between ${
                    isActive ? 'text-primary' : 'text-foreground hover:text-primary'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="size-2 rounded-full bg-primary" />}
                </Link>
              )
            })}
          </nav>

          <div className="space-y-6 pt-6 border-t border-border">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-12 w-full items-center justify-center rounded-full bg-primary text-[16px] font-semibold text-primary-foreground shadow-lg active:scale-[0.98] transition-transform"
            >
              Get in touch
            </Link>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{name}</span>
              <a href={`mailto:${email}`} className="text-primary hover:underline">
                {email}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
