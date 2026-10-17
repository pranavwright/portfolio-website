import {defineArrayMember, defineField, defineType} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Short Summary',
      type: 'text',
      rows: 3,
      description: 'A crisp 1-2 sentence description for previews and cards',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      initialValue: false,
      description: 'Highlight prominently on the home page showcase',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'In Progress', value: 'in-progress'},
          {title: 'Completed', value: 'completed'},
          {title: 'Building', value: 'building'},
          {title: 'Researching', value: 'researching'},
          {title: 'Paused', value: 'paused'},
          {title: 'Archived', value: 'archived'},
        ],
        layout: 'radio',
      },
      initialValue: 'in-progress',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Web Application', value: 'web-app'},
          {title: 'Mobile App', value: 'mobile'},
          {title: 'Developer Tool', value: 'tool'},
          {title: 'Product & Design', value: 'design'},
          {title: 'Experiment / Open Source', value: 'experiment'},
        ],
      },
      initialValue: 'web-app',
    }),
    defineField({
      name: 'role',
      title: 'My Role',
      type: 'string',
      placeholder: 'e.g. Lead Developer, Full-Stack & UI Architect',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Important for SEO and screen readers',
        }),
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies & Tools',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      description: 'Concrete product capabilities implemented',
    }),
    defineField({
      name: 'problem',
      title: 'The Problem',
      type: 'text',
      rows: 4,
      description: 'What real-world problem does this project solve?',
    }),
    defineField({
      name: 'solution',
      title: 'The Solution',
      type: 'text',
      rows: 4,
      description: 'How does this project address and solve that problem?',
    }),
    defineField({
      name: 'description',
      title: 'Detailed Overview (Portable Text)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
        }),
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'architecture',
      title: 'Technical Architecture & Decisions',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
      description: 'Key technical decisions, patterns, protocols, and data models',
    }),
    defineField({
      name: 'technicalChallenges',
      title: 'Challenges & Engineering Solutions',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'results',
      title: 'Results & Impact',
      type: 'text',
      rows: 3,
      description: 'Verified milestones, metrics, or outcomes (do not fabricate)',
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live Demo URL',
      type: 'url',
    }),
    defineField({
      name: 'repositoryUrl',
      title: 'Source Code Repository URL',
      type: 'url',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date (leave blank if ongoing)',
      type: 'date',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 100,
      description: 'Lower numbers display first',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      description: 'Set this date to make the project publicly visible. Leaving empty keeps it as a draft.',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title Override',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description Override',
      type: 'text',
      rows: 2,
    }),
  ],
  orderings: [
    {
      title: 'Sort Order',
      name: 'sortOrderAsc',
      by: [{field: 'sortOrder', direction: 'asc'}],
    },
    {
      title: 'Publication Date',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'summary',
      media: 'featuredImage',
      status: 'status',
      featured: 'featured',
    },
    prepare({title, subtitle, media, status, featured}) {
      const tag = featured ? '★ ' : ''
      return {
        title: `${tag}${title}`,
        subtitle: `[${status || 'draft'}] ${subtitle || ''}`,
        media,
      }
    },
  },
})
