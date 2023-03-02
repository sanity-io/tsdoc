import {ComponentIcon, TokenIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const apiVariableType = defineType({
  type: 'document',
  name: 'api.variable',
  title: 'Variable',
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
      type: 'reference',
      name: 'propsType',
      title: 'Props type',
      to: [{type: 'api.interface'}, {type: 'api.typeAlias'}],
    }),
    defineField({
      type: 'boolean',
      name: 'isReactComponentType',
      title: 'This is a React component',
      options: {layout: 'checkbox'},
    }),
    defineField({
      type: 'boolean',
      name: 'isReactHook',
      title: 'This is a React hook',
      options: {layout: 'checkbox'},
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
        return {title: `<${title}>`, subtitle: 'Component · Variable', icon: ComponentIcon}
      }

      return {title, subtitle: 'Variable', icon: TokenIcon}
    },
  },
  readOnly: true,
})
