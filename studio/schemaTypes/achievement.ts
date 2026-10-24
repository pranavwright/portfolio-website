import {defineField, defineType} from 'sanity'

export const achievement = defineType({
  name: 'achievement',
  title: 'Milestone & Achievement',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Milestone / Achievement Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Exhibition & Showcase', value: 'exhibition'},
          {title: 'Contribution & Impact', value: 'contribution'},
          {title: 'Talk / Presentation', value: 'presentation'},
          {title: 'Recognition / Honor', value: 'honor'},
        ],
      },
      initialValue: 'exhibition',
    }),
    defineField({
      name: 'date',
      title: 'Date Achieved',
      type: 'date',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Accurate description of the milestone or event',
    }),
    defineField({
      name: 'evidenceUrl',
      title: 'Supporting Evidence / Link',
      type: 'url',
    }),
    defineField({
      name: 'image',
      title: 'Milestone / Event Photo',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text (SEO & AI Description)',
          type: 'string',
          description: 'Explain who and what is visible in the photo for search engines and AI.',
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 10,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      date: 'date',
      media: 'image',
    },
    prepare({title, subtitle, date, media}) {
      return {
        title,
        subtitle: `${subtitle || ''} ${date ? `• ${date}` : ''}`,
        media,
      }
    },
  },
})
