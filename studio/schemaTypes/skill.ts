import {defineArrayMember, defineField, defineType} from 'sanity'

export const skill = defineType({
  name: 'skill',
  title: 'Skill & Technology',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Skill / Technology Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Frontend Development', value: 'frontend'},
          {title: 'Backend & APIs', value: 'backend'},
          {title: 'Databases & Infrastructure', value: 'databases'},
          {title: 'Mobile Development', value: 'mobile'},
          {title: 'Product & UX/UI Design', value: 'product-design'},
          {title: 'Tools & Security', value: 'tools'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Brief Context / Practical Experience',
      type: 'string',
      description: 'e.g. Next.js 14 App Router, Server Actions, Edge runtime',
    }),
    defineField({
      name: 'relatedProjects',
      title: 'Related Projects',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'project'}]})],
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
      title: 'name',
      subtitle: 'category',
    },
  },
})
