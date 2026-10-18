import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Portfolio Content')
    .items([
      // Projects
      S.documentTypeListItem('project').title('Projects (All & Building)'),
      S.divider(),
      // Experience, Education, Skills & Achievements
      S.documentTypeListItem('experience').title('Experience & Timeline'),
      S.documentTypeListItem('education').title('Education & Academics'),
      S.documentTypeListItem('skill').title('Skills & Technologies'),
      S.documentTypeListItem('achievement').title('Milestones & Achievements'),
    ])
