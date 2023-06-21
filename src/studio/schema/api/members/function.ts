import {ComponentIcon, TokenIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const apiFunctionType = defineType({
  type: 'document',
  name: 'api.function',
  title: 'Function',
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
      type: 'boolean',
      name: 'isOverloading',
      title: 'This function is overloaded',
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
        return {title: `<${title}>`, subtitle: 'Component · Function', icon: ComponentIcon}
      }

      return {title, subtitle: 'Function', icon: TokenIcon}
    },
  },
  readOnly: true,
})
