import {defineArrayMember, defineField, defineType} from 'sanity'

export const apiInterfaceType = defineType({
  type: 'document',
  name: 'api.interface',
  title: 'Interface',
  fields: [
    defineField({
      type: 'string',
      name: 'name',
      title: 'Name',
    }),
    defineField({
      type: 'slug',
      name: 'slug',
      title: 'Slug',
    }),

    defineField({
      type: 'api.releaseTag',
      name: 'releaseTag',
      title: 'Release tag',
    }),
    defineField({
      type: 'reference',
      name: 'export',
      title: 'Export',
      to: [{type: 'api.export'}],
      hidden: true,
    }),
    defineField({
      type: 'reference',
      name: 'release',
      title: 'Release',
      to: [{type: 'api.release'}],
      hidden: true,
    }),
    defineField({
      type: 'reference',
      name: 'package',
      title: 'Package',
      to: [{type: 'api.package'}],
      hidden: true,
    }),

    defineField({
      type: 'array',
      name: 'typeParameters',
      title: 'Type parameters',
      of: [defineArrayMember({type: 'api.typeParameter'})],
    }),
    defineField({
      type: 'array',
      name: 'extends',
      title: 'Extends',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'api.extend',
          title: 'Extend',
          fields: [
            defineField({
              type: 'api.tokens',
              name: 'type',
              title: 'Type',
            }),
          ],
          preview: {
            select: {type: 'type'},
            prepare: ({type}: any) => ({title: type.map((t: any) => t.text).join('')}),
          },
        }),
      ],
    }),
    defineField({
      type: 'array',
      name: 'members',
      title: 'Members',
      of: [
        defineArrayMember({type: 'api.callSignature'}),
        defineArrayMember({type: 'api.constructSignature'}),
        defineArrayMember({type: 'api.indexSignature'}),
        defineArrayMember({type: 'api.methodSignature'}),
        defineArrayMember({type: 'api.propertySignature'}),
      ],
    }),
    defineField({
      type: 'tsdoc.docComment',
      name: 'comment',
      title: 'Comment',
    }),
  ],
  preview: {
    select: {title: 'name'},
    prepare: ({title}: any) => ({title, subtitle: 'Interface'}),
  },
  readOnly: true,
})
