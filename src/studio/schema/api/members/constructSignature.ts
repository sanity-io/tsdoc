import {defineField, defineType} from 'sanity'

export const apiConstructSignatureType = defineType({
  type: 'object',
  name: 'api.constructSignature',
  title: 'Construct signature',
  fields: [
    defineField({
      type: 'api.releaseTag',
      name: 'releaseTag',
      title: 'Release tag',
    }),
  ],

  preview: {
    select: {title: 'name'},
    prepare: ({title}: any) => ({title, subtitle: 'Construct signature'}),
  },
})
