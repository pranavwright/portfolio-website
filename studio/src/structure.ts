import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Portfolio Content')
    .items([
      // Singleton: Site Settings
      S.listItem()
        .title('Site Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Global Site Settings')
        ),
      S.divider(),
      // Projects & In-progress work
      S.documentTypeListItem('project').title('Projects'),
      S.documentTypeListItem('currentlyBuilding').title('Currently Building (Now)'),
      S.divider(),
      // Skills, Experience & Achievements
      S.documentTypeListItem('skill').title('Skills & Technologies'),
      S.documentTypeListItem('experience').title('Experience & Timeline'),
      S.documentTypeListItem('achievement').title('Milestones & Achievements'),
    ])
