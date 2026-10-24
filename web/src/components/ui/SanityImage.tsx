import React from 'react'
import Image, {ImageProps} from 'next/image'
import {urlForImage} from '@/sanity/image'
import type {SanityImage as SanityImageType} from '@/sanity/types'

export interface SanityImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  image?: SanityImageType | null
  fallbackSrc?: string
  alt?: string
  width?: number
  height?: number
  aspectRatio?: number
  className?: string
  priority?: boolean
  sizes?: string
}

export function SanityImage({
  image,
  fallbackSrc = '/placeholder.png',
  alt,
  width,
  height,
  aspectRatio,
  className,
  priority = false,
  sizes,
  fill,
  ...rest
}: SanityImageProps) {
  // Determine alt text: explicit prop > image.alt > empty string
  const resolvedAlt = alt || image?.alt || ''

  // Determine LQIP placeholder if available from asset metadata
  const lqip = image?.asset?.metadata?.lqip
  const dimensions = image?.asset?.metadata?.dimensions

  // Resolve dimensions if not explicitly passed
  let resolvedWidth = width
  let resolvedHeight = height

  if (!fill) {
    if (!resolvedWidth && dimensions?.width) {
      resolvedWidth = dimensions.width
    }
    if (!resolvedHeight) {
      if (dimensions?.height) {
        resolvedHeight = dimensions.height
      } else if (resolvedWidth && aspectRatio) {
        resolvedHeight = Math.round(resolvedWidth / aspectRatio)
      } else if (resolvedWidth) {
        resolvedHeight = Math.round(resolvedWidth * 0.625) // 16:10 default
      }
    }
  }

  // Build optimized Sanity image URL
  let src = fallbackSrc
  if (image && image.asset) {
    const builder = urlForImage(image)
    if (builder) {
      if (resolvedWidth && !fill) {
        builder.width(resolvedWidth)
      }
      if (resolvedHeight && !fill) {
        builder.height(resolvedHeight)
      }
      builder.fit('crop').auto('format')
      const url = builder.url()
      if (url) {
        src = url
      }
    }
  }

  const imageProps: ImageProps = {
    src,
    alt: resolvedAlt,
    className,
    priority,
    sizes: sizes || (fill ? '100vw' : undefined),
    ...(lqip
      ? {
          placeholder: 'blur' as const,
          blurDataURL: lqip,
        }
      : {}),
    ...(fill
      ? {fill: true}
      : {
          width: resolvedWidth || 800,
          height: resolvedHeight || 600,
        }),
    ...rest,
  }

  return <Image {...imageProps} />
}
