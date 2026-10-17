import {defineArrayMember, defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      initialValue: 'Pranav Wright',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alternativeName',
      title: 'Alternative Name / Legal Name',
      type: 'string',
      initialValue: 'Pranav P.S.',
    }),
    defineField({
      name: 'headline',
      title: 'Hero Headline',
      type: 'string',
      initialValue: 'I build software that turns ideas into reality.',
      description: 'The main oversized statement on the homepage',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'roles',
      title: 'Professional Roles',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      initialValue: [
        'Software Developer',
        'Full-Stack Developer',
        'Product Builder',
        'Web Designer',
        'Technology Entrepreneur',
      ],
      description: 'Roles displayed in hero and about sections',
    }),
    defineField({
      name: 'shortBio',
      title: 'Hero Supporting Text',
      type: 'text',
      rows: 3,
      initialValue:
        "I'm a developer and product builder focused on creating useful digital products, solving real-world problems, and turning complex ideas into simple, intuitive experiences.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'aboutBio',
      title: 'About Page Biography (Portable Text)',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
      description: 'In-depth editorial biography for the /about page',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      initialValue: 'Kerala, India',
    }),
    defineField({
      name: 'avatar',
      title: 'Profile Picture / Portrait',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          initialValue: 'Pranav Wright',
        }),
      ],
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      initialValue: () =>
        process.env.SANITY_STUDIO_CONTACT_EMAIL ||
        process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
        undefined,
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
      initialValue: 'https://github.com/pranavwright',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
      initialValue: 'https://linkedin.com/in/Pranav-wright',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
      initialValue: 'https://instagram.com/pranav.wright',
    }),
    defineField({
      name: 'twitterUrl',
      title: 'X / Twitter URL',
      type: 'url',
      initialValue: 'https://x.com/pranav_wright',
    }),
    defineField({
      name: 'resumePdf',
      title: 'Resume / CV File',
      type: 'file',
      description: 'Upload current PDF resume',
    }),
    defineField({
      name: 'contactHeadline',
      title: 'Contact Section Headline',
      type: 'string',
      initialValue: 'Have an idea worth building?',
    }),
    defineField({
      name: 'contactSubtext',
      title: 'Contact Section Subtext',
      type: 'text',
      rows: 2,
      initialValue:
        "I'm interested in building useful products, solving interesting technical problems, and collaborating with people who want to turn ideas into reality.",
    }),
    defineField({
      name: 'seoTitle',
      title: 'Default SEO Title',
      type: 'string',
      initialValue: 'Pranav Wright — Developer, Product Builder & Designer',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Default SEO Description',
      type: 'text',
      rows: 3,
      initialValue:
        'Software developer, full-stack engineer, and product builder from Kerala, India. Building practical software and digital products.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'headline',
      media: 'avatar',
    },
  },
})
