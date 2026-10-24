import {defineArrayMember, defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons'

export const profile = defineType({
  name: 'profile',
  title: 'Personal Profile & Images',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      initialValue: 'Pranav Wright',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Headline / Role',
      type: 'string',
      placeholder: 'e.g. Full-Stack Developer & Systems Architect',
    }),
    defineField({
      name: 'bio',
      title: 'Short Bio',
      type: 'text',
      rows: 3,
      description: 'Used for search meta descriptions, AI summaries, and intro text.',
    }),
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
      name: 'heroImage',
      title: 'Hero Cutout / Portrait',
      type: 'image',
      description: 'Subject portrait cutout displayed on the home page hero stage.',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'E.g. "Pranav Wright hero portrait"',
        }),
      ],
    }),
    defineField({
      name: 'heroBackground',
      title: 'Hero Ambient Background',
      type: 'image',
      description: 'Background environment image layered in the home page hero.',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'socialOgImage',
      title: 'Social Share / Open Graph Image (1200x630)',
      type: 'image',
      description:
        'Custom social card shown when sharing the website on Twitter/X, LinkedIn, Discord, and Slack.',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'E.g. "Pranav Wright Portfolio and Systems Architecture"',
        }),
      ],
    }),
    defineField({
      name: 'mediaGallery',
      title: 'Press, Speaking & Moments Gallery',
      type: 'array',
      description:
        'Curated public photos (conference talks, awards, exhibitions, workshops, team moments) indexed by search engines and cited by AI engines.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'mediaItem',
          title: 'Media Photo',
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
              title: 'Photo Title',
              type: 'string',
              placeholder: 'e.g. Presenting Disaster-Management Systems to KSDMA',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alt Text (SEO & AI Description)',
              type: 'string',
              description:
                'Descriptive explanation of who and what is visible in the photo for Google Images and multimodal AI.',
              validation: (rule) =>
                rule
                  .required()
                  .warning('Alt text is required for AI answer engines and search engines to understand the photo.'),
            }),
            defineField({
              name: 'caption',
              title: 'Caption / Context',
              type: 'text',
              rows: 2,
              placeholder:
                'e.g. Explaining real-time coordination architecture at the state emergency operations center.',
            }),
            defineField({
              name: 'category',
              title: 'Category',
              type: 'string',
              options: {
                list: [
                  {title: 'Speaking & Presentations', value: 'speaking'},
                  {title: 'Awards & Honors', value: 'award'},
                  {title: 'Technical Exhibitions', value: 'exhibition'},
                  {title: 'Workspace & Engineering', value: 'workspace'},
                  {title: 'Portraits & Press', value: 'portrait'},
                  {title: 'Candid & Events', value: 'event'},
                ],
              },
              initialValue: 'speaking',
            }),
            defineField({
              name: 'date',
              title: 'Date Taken',
              type: 'date',
            }),
            defineField({
              name: 'location',
              title: 'Location',
              type: 'string',
              placeholder: 'e.g. Trivandrum, Kerala',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'category',
              media: 'image',
              date: 'date',
            },
            prepare({title, subtitle, media, date}) {
              return {
                title: title || 'Untitled Photo',
                subtitle: `${subtitle || 'photo'} ${date ? `• ${date}` : ''}`,
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
      title: 'fullName',
      subtitle: 'headline',
      media: 'avatar',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Personal Profile',
        subtitle: subtitle || 'Profile & Media Management',
        media,
      }
    },
  },
})
