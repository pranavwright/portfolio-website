import {defineArrayMember, defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons'

export const profile = defineType({
  name: 'profile',
  title: 'Personal Profile & Images',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'avatar',
      title: 'Primary Avatar / Headshot',
      type: 'image',
      description:
        'Official profile headshot. Used in Schema.org Person markup, site author metadata, and knowledge graph.',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description:
            'Critical for SEO and screen readers. E.g. "Pranav Wright portrait headshot"',
          validation: (rule) =>
            rule.required().warning('Descriptive alt text is crucial for Google Image indexing.'),
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
          placeholder: 'e.g. Pranav Wright — Full-Stack Developer & Product Builder',
        }),
      ],
    }),
    defineField({
      name: 'aboutImage',
      title: 'About Page Editorial Photo',
      type: 'image',
      description: 'The featured portrait showcased on the /about page story.',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'E.g. "Pranav Wright working in engineering studio"',
          validation: (rule) =>
            rule.required().warning('Alt text is required for accessibility and image search.'),
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'mediaGallery',
      title: 'Photoshoots & Adventures Gallery',
      type: 'array',
      description:
        'Curated photos: outdoor adventures, photoshoots, and personal moments displayed on the /about page.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'mediaItem',
          title: 'Photo Entry',
          fields: [
            defineField({
              name: 'image',
              title: 'Photo File',
              type: 'image',
              options: {hotspot: true},
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title (Optional)',
              type: 'string',
              placeholder: 'e.g. Engineering Studio Session',
              description: 'Optional heading displayed on the photo and in full-screen lightbox.',
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle (Optional)',
              type: 'string',
              placeholder: 'e.g. Portraits & Creative Space',
              description: 'Secondary line displayed under the title.',
            }),
            defineField({
              name: 'location',
              title: 'Location (Optional)',
              type: 'string',
              placeholder: 'e.g. Trivandrum, Kerala',
            }),
            defineField({
              name: 'date',
              title: 'Date Taken (Optional)',
              type: 'date',
            }),
            defineField({
              name: 'alt',
              title: 'Alt Text (SEO & AI Description)',
              type: 'string',
              placeholder: 'e.g. Pranav Wright in outdoor photoshoot',
              description:
                'Explains what is in the image for search engines, screen readers, and AI.',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'subtitle',
              media: 'image',
              date: 'date',
              location: 'location',
            },
            prepare({title, subtitle, media, date, location}) {
              const meta = [location, date].filter(Boolean).join(' • ')
              return {
                title: title || 'Untitled Photo',
                subtitle: subtitle || meta || 'Photo Entry',
                media,
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      media: 'avatar',
    },
    prepare({media}) {
      return {
        title: 'Personal Visual Assets',
        subtitle: 'Avatar, Editorial & Photoshoot Gallery',
        media,
      }
    },
  },
})
