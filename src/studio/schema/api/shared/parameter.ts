import {defineField, defineType} from 'sanity'

export const apiParameterType = defineType({
  type: 'object',
  name: 'api.parameter',
  title: 'Parameter',
  fields: [
    defineField({
      type: 'string',
      name: 'name',
      title: 'Name',
    }),
    defineField({
      type: 'api.releaseTag',
      name: 'releaseTag',
      title: 'Release tag',
    }),
    defineField({
      type: 'api.tokens',
      name: 'type',
      title: 'Type',
    }),
  ],
})
