import {ComponentIcon, TokenIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const apiClassType = defineType({
  type: 'document',
  name: 'api.class',
  title: 'Class',
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
      type: 'boolean',
      name: 'isReactComponentType',
      title: 'This is a React component',
      options: {layout: 'checkbox'},
    }),
    defineField({
      type: 'array',
      name: 'typeParameters',
      title: 'Type parameters',
      of: [defineArrayMember({type: 'api.typeParameter'})],
    }),
    defineField({
      type: 'array',
      name: 'members',
      title: 'Members',
      of: [
        defineArrayMember({type: 'api.constructor'}),
        defineArrayMember({type: 'api.method'}),
        defineArrayMember({type: 'api.property'}),
      ],
    }),
    defineField({
      type: 'tsdoc.docComment',
      name: 'comment',
      title: 'Comment',
    }),
  ],

  preview: {
    select: {title: 'name', isReactComponentType: 'isReactComponentType'},
    prepare({isReactComponentType, title}: any) {
      if (isReactComponentType) {
        return {title: `<${title}>`, subtitle: 'Component · Class', icon: ComponentIcon}
      }

      return {title, subtitle: 'Class', icon: TokenIcon}
    },
  },
  readOnly: true,
})
