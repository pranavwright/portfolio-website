import {defineField, defineType} from 'sanity'

export const currentlyBuilding = defineType({
  name: 'currentlyBuilding',
  title: 'Currently Building',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Initiative / Product Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Current Status',
      type: 'string',
      options: {
        list: [
          {title: 'Building (Active Dev)', value: 'building'},
          {title: 'Researching & Architecting', value: 'researching'},
          {title: 'Experimenting / Prototyping', value: 'experimenting'},
          {title: 'Completed', value: 'completed'},
          {title: 'Paused', value: 'paused'},
        ],
      },
      initialValue: 'building',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'What is being built right now?',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'focusArea',
      title: 'Current Focus / Active Feature',
      type: 'string',
      placeholder: 'e.g. Real-time camp sync & coordination engine',
    }),
    defineField({
      name: 'relatedProject',
      title: 'Related Project (Optional)',
      type: 'reference',
      to: [{type: 'project'}],
    }),
    defineField({
      name: 'externalUrl',
      title: 'Public URL / Preview Link',
      type: 'url',
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated Date',
      type: 'date',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 10,
    }),
  ],
  orderings: [
    {
      title: 'Sort Order',
      name: 'sortOrderAsc',
      by: [{field: 'sortOrder', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      status: 'status',
      focusArea: 'focusArea',
    },
    prepare({title, status, focusArea}) {
      return {
        title: `[${status}] ${title}`,
        subtitle: focusArea || '',
      }
    },
  },
})
