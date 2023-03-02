import {defineArrayMember, defineField, defineType} from 'sanity'

export const apiConstructorType = defineType({
  type: 'object',
  name: 'api.constructor',
  title: 'Constructor',
  fields: [
    defineField({
      type: 'api.releaseTag',
      name: 'releaseTag',
      title: 'Release tag',
    }),
    defineField({
      type: 'array',
      name: 'parameters',
      title: 'Parameters',
      of: [defineArrayMember({type: 'api.parameter'})],
    }),
    defineField({
      type: 'tsdoc.docComment',
      name: 'comment',
      title: 'Comment',
    }),
  ],

  preview: {
    select: {},
    prepare: () => ({title: '(constructor)'}),
  },
})
