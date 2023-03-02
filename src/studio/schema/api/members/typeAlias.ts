import {defineArrayMember, defineField, defineType} from 'sanity'

export const apiTypeAliasType = defineType({
  type: 'document',
  name: 'api.typeAlias',
  title: 'Type alias',
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
      type: 'api.tokens',
      name: 'type',
      title: 'Type',
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
    prepare: ({title}: any) => ({title, subtitle: 'Type alias'}),
  },
  readOnly: true,
})
