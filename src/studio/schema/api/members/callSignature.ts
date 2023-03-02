import {defineArrayMember, defineField, defineType} from 'sanity'

export const apiCallSignatureType = defineType({
  type: 'object',
  name: 'api.callSignature',
  title: 'Call signature',
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
      type: 'api.tokens',
      name: 'returnType',
      title: 'Return type',
    }),
    defineField({
      type: 'array',
      name: 'typeParameters',
      title: 'Type parameters',
      of: [defineArrayMember({type: 'api.typeParameter'})],
    }),
    defineField({
      type: 'tsdoc.docComment',
      name: 'comment',
      title: 'Comment',
    }),
  ],

  preview: {
    select: {title: 'name'},
    prepare: ({title}: any) => ({title, subtitle: 'Call signature'}),
  },
})
