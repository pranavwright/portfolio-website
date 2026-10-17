'use client'

import React from 'react'
import {PortableText, type PortableTextComponents} from '@portabletext/react'
import Image from 'next/image'
import {urlForImage} from '@/sanity/image'

const components: PortableTextComponents = {
  block: {
    h2: ({children}) => (
      <h2 className="text-2xl font-bold text-text-primary tracking-tight mt-8 mb-4 border-b border-border pb-2">
        {children}
      </h2>
    ),
    h3: ({children}) => (
      <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
        {children}
      </h3>
    ),
    normal: ({children}) => (
      <p className="text-text-secondary leading-relaxed mb-4 text-base">
        {children}
      </p>
    ),
    blockquote: ({children}) => (
      <blockquote className="border-l-2 border-accent pl-4 my-6 italic text-text-primary/90 bg-surface/50 py-2 pr-4 rounded-r">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({children}) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-text-secondary">
        {children}
      </ul>
    ),
    number: ({children}) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-text-secondary">
        {children}
      </ol>
    ),
  },
  types: {
    image: ({value}) => {
      const url = urlForImage(value)?.width(1200).url()
      if (!url) return null
      return (
        <figure className="my-8 rounded-lg overflow-hidden border border-border bg-surface">
          <Image
            src={url}
            alt={value.alt || 'Project illustration'}
            width={1200}
            height={675}
            className="w-full object-cover"
          />
          {value.caption && (
            <figcaption className="text-xs text-text-muted text-center py-2 px-4 border-t border-border">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}

export function PortableTextRenderer({value}: {value: any}) {
  if (!value || !Array.isArray(value) || value.length === 0) return null
  return (
    <div className="prose prose-invert max-w-none">
      <PortableText value={value} components={components} />
    </div>
  )
}
