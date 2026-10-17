import {defineArrayMember, defineField, defineType} from 'sanity'

export const experience = defineType({
  name: 'experience',
  title: 'Experience & Timeline',
  type: 'document',
  fields: [
    defineField({
      name: 'role',
      title: 'Role / Position',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'organization',
      title: 'Organization / Company / Initiative',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date (leave blank if current)',
      type: 'date',
    }),
    defineField({
      name: 'isCurrent',
      title: 'Currently Ongoing',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'description',
      title: 'Overview',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'achievements',
      title: 'Key Milestones & Contributions',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      description: 'Concrete verified milestones (no fabricated claims)',
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'supportingUrl',
      title: 'Supporting Link / Verification',
      type: 'url',
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
      title: 'Start Date (Newest first)',
      name: 'startDateDesc',
      by: [{field: 'startDate', direction: 'desc'}],
    },
    {
      title: 'Sort Order',
      name: 'sortOrderAsc',
      by: [{field: 'sortOrder', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'role',
      subtitle: 'organization',
      startDate: 'startDate',
      endDate: 'endDate',
      isCurrent: 'isCurrent',
    },
    prepare({title, subtitle, startDate, endDate, isCurrent}) {
      const dates = `${startDate || ''} — ${isCurrent ? 'Present' : endDate || ''}`
      return {
        title,
        subtitle: `${subtitle} (${dates})`,
      }
    },
  },
})
