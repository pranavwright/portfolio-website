import {defineArrayMember, defineField, defineType} from 'sanity'

export const education = defineType({
  name: 'education',
  title: 'Education & Academics',
  type: 'document',
  fields: [
    defineField({
      name: 'degree',
      title: 'Degree / Certificate',
      type: 'string',
      placeholder: 'e.g. Bachelor of Technology (B.Tech)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'fieldOfStudy',
      title: 'Field of Study / Major',
      type: 'string',
      placeholder: 'e.g. Computer Science & Engineering',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'institution',
      title: 'Institution / University / School',
      type: 'string',
      placeholder: 'e.g. APJ Abdul Kalam Technological University',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      placeholder: 'e.g. Kerala, India',
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
      title: 'Currently Studying Here',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'grade',
      title: 'Grade / CGPA / Honours',
      type: 'string',
      placeholder: 'e.g. CGPA: 8.4 / 10 or First Class with Distinction',
    }),
    defineField({
      name: 'description',
      title: 'Description & Focus Areas',
      type: 'text',
      rows: 3,
      description: 'Core coursework, research areas, or academic thesis',
    }),
    defineField({
      name: 'activities',
      title: 'Extracurricular Activities & Leadership',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      description: 'Clubs, hackathons, academic societies, or leadership roles',
    }),
    defineField({
      name: 'supportingUrl',
      title: 'Institution / Verification URL',
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
      title: 'degree',
      subtitle: 'institution',
      fieldOfStudy: 'fieldOfStudy',
      startDate: 'startDate',
      endDate: 'endDate',
      isCurrent: 'isCurrent',
    },
    prepare({title, subtitle, fieldOfStudy, startDate, endDate, isCurrent}) {
      const dates = `${startDate ? new Date(startDate).getFullYear() : ''} — ${
        isCurrent ? 'Present' : endDate ? new Date(endDate).getFullYear() : 'Completed'
      }`
      return {
        title: `${title}${fieldOfStudy ? ` in ${fieldOfStudy}` : ''}`,
        subtitle: `${subtitle} (${dates})`,
      }
    },
  },
})
