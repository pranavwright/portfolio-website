import type {StructureResolver} from 'sanity/structure'
import {UserIcon} from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Portfolio Content')
    .items([
      // Personal Profile & Images Singleton
      S.listItem()
        .title('Personal Profile & Images')
        .id('profile')
        .icon(UserIcon)
        .child(
          S.document()
            .schemaType('profile')
            .documentId('profile')
            .title('Personal Profile & Images')
        ),
      S.divider(),
      // Projects
      S.documentTypeListItem('project').title('Projects (All & Building)'),
      S.divider(),
      // Experience, Education, Skills & Achievements
      S.documentTypeListItem('experience').title('Experience & Timeline'),
      S.documentTypeListItem('education').title('Education & Academics'),
      S.documentTypeListItem('skill').title('Skills & Technologies'),
      S.documentTypeListItem('achievement').title('Milestones & Achievements'),
    ])

