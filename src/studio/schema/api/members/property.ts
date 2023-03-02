import {defineField, defineType} from 'sanity'

export const apiPropertyType = defineType({
  type: 'object',
  name: 'api.property',
  title: 'Property',
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
      type: 'boolean',
      name: 'isEventProperty',
      title: 'Is event property',
      options: {layout: 'checkbox'},
    }),
    defineField({
      type: 'boolean',
      name: 'isOptional',
      title: 'Is optional',
      options: {layout: 'checkbox'},
    }),
    defineField({
      type: 'boolean',
      name: 'isStatic',
      title: 'Is static',
      options: {layout: 'checkbox'},
    }),
    defineField({
      type: 'api.tokens',
      name: 'type',
      title: 'Type',
    }),
    defineField({
      type: 'tsdoc.docComment',
      name: 'comment',
      title: 'Comment',
    }),
  ],

  preview: {
    select: {title: 'name'},
    prepare: ({title}: any) => ({title, subtitle: 'Property'}),
  },
})
