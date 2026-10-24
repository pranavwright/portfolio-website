'use client'

import React, { useState, useEffect, useCallback } from 'react'
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Maximize2,
  Camera,
} from 'lucide-react'
import { SanityImage } from '@/components/ui/SanityImage'
import { formatDate } from '@/lib/utils'
import type { MediaGalleryItem } from '@/sanity/types'

interface PhotoGallerySectionProps {
  items?: MediaGalleryItem[]
}

export function PhotoGallerySection({ items = [] }: PhotoGallerySectionProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Lightbox navigation
  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
    document.body.style.overflow = ''
  }, [])

  const nextPhoto = useCallback(() => {
    if (lightboxIndex === null || items.length === 0) return
    setLightboxIndex((prev) => (prev! + 1) % items.length)
  }, [lightboxIndex, items.length])

  const prevPhoto = useCallback(() => {
    if (lightboxIndex === null || items.length === 0) return
    setLightboxIndex((prev) => (prev! - 1 + items.length) % items.length)
  }, [lightboxIndex, items.length])

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextPhoto()
      if (e.key === 'ArrowLeft') prevPhoto()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, closeLightbox, nextPhoto, prevPhoto])

  if (!items || items.length === 0) {
    return null
  }

  const currentLightboxItem = lightboxIndex !== null ? items[lightboxIndex] : null

  return (
    <section
      id="photo-gallery"
      aria-labelledby="gallery-heading"
      className="px-5 pt-[clamp(5rem,14vh,9rem)] md:px-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              <Camera className="size-3.5 text-primary" />
              <span>Adventures &amp; Photoshoots</span>
            </div>
            <h2
              id="gallery-heading"
              className="display text-[clamp(2.75rem,5.6vw,5.5rem)] text-foreground leading-[0.88]"
            >
              Frames &amp; Explorations.
            </h2>
          </div>
          <p className="max-w-[42ch] text-[15px] sm:text-[16px] leading-relaxed text-muted-foreground">
            Moments outside the terminal: outdoor treks, mountain trails, portrait series, and candid visual explorations.
          </p>
        </div>

        {/* Masonry Editorial Collage Layout */}
        <div className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-5 md:gap-6 space-y-5 md:space-y-6">
          {items.map((item, index) => {
            const hasInfo = Boolean(item.title || item.subtitle || item.location || item.date)
            const dimensions = item.image?.asset?.metadata?.dimensions
            const width = dimensions?.width || 1200
            const height = dimensions?.height || 800

            return (
              <figure
                key={item._key || index}
                onClick={() => openLightbox(index)}
                className="group relative break-inside-avoid overflow-hidden rounded-[20px] bg-muted/15 border border-border/60 shadow-md transition-all duration-500 ease-expo hover:-translate-y-1 hover:shadow-2xl hover:border-primary/40 cursor-pointer"
              >
                {/* Image */}
                <SanityImage
                  image={item.image}
                  alt={item.alt || item.title || 'Photograph by Pranav Wright'}
                  width={width}
                  height={height}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="w-full h-auto object-cover block transition-transform duration-700 ease-expo group-hover:scale-[1.025]"
                />

                {/* Subtle Hover Gradient & Details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300 pointer-events-none" />

                {/* Top-Right Expand Icon on Hover */}
                <div className="absolute top-3.5 right-3.5 z-10 pointer-events-none">
                  <span className="grid size-8 place-items-center rounded-full bg-black/60 backdrop-blur-md text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/15">
                    <Maximize2 className="size-3.5" />
                  </span>
                </div>

                {/* Bottom Overlay: Title, Subtitle, Location & Date */}
                {hasInfo && (
                  <figcaption className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-white flex flex-col justify-end pointer-events-none">
                    {item.title && (
                      <h3 className="text-base sm:text-lg font-bold leading-snug tracking-tight text-white drop-shadow-sm">
                        {item.title}
                      </h3>
                    )}

                    {item.subtitle && (
                      <p className="mt-1 text-xs sm:text-sm font-medium text-white/85 leading-snug">
                        {item.subtitle}
                      </p>
                    )}

                    {/* Metadata chips (Location, Date) */}
                    {(item.location || item.date) && (
                      <div className="mt-2.5 flex flex-wrap items-center gap-3 text-[11px] font-medium text-white/70 pt-2 border-t border-white/15">
                        {item.location && (
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="size-3 text-primary" />
                            <span>{item.location}</span>
                          </span>
                        )}
                        {item.date && (
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="size-3 text-white/60" />
                            <span>{formatDate(item.date)}</span>
                          </span>
                        )}
                      </div>
                    )}
                  </figcaption>
                )}
              </figure>
            )
          })}
        </div>
      </div>

      {/* Accessible Full-Screen Lightbox Modal */}
      {currentLightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={currentLightboxItem.title || 'Photo viewer'}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close photo viewer"
            className="absolute top-5 right-5 z-20 grid size-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/15"
          >
            <X className="size-5" />
          </button>

          {/* Previous Button */}
          {items.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                prevPhoto()
              }}
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 grid size-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/15 max-sm:hidden"
            >
              <ChevronLeft className="size-6" />
            </button>
          )}

          {/* Next Button */}
          {items.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                nextPhoto()
              }}
              aria-label="Next photo"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 grid size-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/15 max-sm:hidden"
            >
              <ChevronRight className="size-6" />
            </button>
          )}

          {/* Modal Content */}
          <div
            className="relative flex flex-col items-center max-h-[92vh] max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Box */}
            <div className="relative max-h-[75vh] w-full flex items-center justify-center overflow-hidden rounded-[18px]">
              <SanityImage
                image={currentLightboxItem.image}
                alt={currentLightboxItem.alt || currentLightboxItem.title || 'Adventure photograph'}
                width={1600}
                height={1200}
                priority
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-[18px] shadow-2xl"
              />
            </div>

            {/* Photo Details Footer */}
            <div className="mt-4 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-white px-2">
              <div>
                {currentLightboxItem.title && (
                  <h3 className="text-xl font-bold tracking-tight text-white">
                    {currentLightboxItem.title}
                  </h3>
                )}
                {currentLightboxItem.subtitle && (
                  <p className="text-sm font-medium text-white/80 mt-0.5">
                    {currentLightboxItem.subtitle}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-white/60 whitespace-nowrap self-start sm:self-auto">
                {currentLightboxItem.location && (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-primary" />
                    <span>{currentLightboxItem.location}</span>
                  </span>
                )}
                {currentLightboxItem.date && (
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="size-3.5" />
                    <span>{formatDate(currentLightboxItem.date)}</span>
                  </span>
                )}
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-white/80">
                  {lightboxIndex! + 1} / {items.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
