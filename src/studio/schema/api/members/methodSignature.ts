import {defineField, defineType} from 'sanity'

export const apiMethodSignatureType = defineType({
  type: 'object',
  name: 'api.methodSignature',
  title: 'Method signature',
  fields: [
    defineField({
      type: 'api.releaseTag',
      name: 'releaseTag',
      title: 'Release tag',
    }),
  ],

  preview: {
    select: {title: 'name'},
    prepare: ({title}: any) => ({title, subtitle: 'Method signature'}),
  },
})
