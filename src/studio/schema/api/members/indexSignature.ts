import {defineField, defineType} from 'sanity'

export const apiIndexSignatureType = defineType({
  type: 'object',
  name: 'api.indexSignature',
  title: 'Index signature',
  fields: [
    defineField({
      type: 'api.releaseTag',
      name: 'releaseTag',
      title: 'Release tag',
    }),
  ],

  preview: {
    select: {title: 'name'},
    prepare: ({title}: any) => ({title, subtitle: 'Index signature'}),
  },
})
