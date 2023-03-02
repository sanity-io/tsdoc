import {defineField, defineType} from 'sanity'
import {APIPropertySignaturePreview} from '../components/APIPropertySignaturePreview'

export const apiPropertySignatureType = defineType({
  type: 'object',
  name: 'api.propertySignature',
  title: 'Property signature',

  components: {
    preview: APIPropertySignaturePreview,
  },

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
      name: 'isOptional',
      title: 'Is optional',
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
    select: {name: 'name', isOptional: 'isOptional', type: 'type'},
    // prepare: ({isOptional, name, type}: any) => ({
    //   title: `${name}${isOptional ? '?' : ''}: ${type?.map((t) => t.text).join('')})}`,
    //   subtitle: 'Property signature',
    // }),
  },
})
