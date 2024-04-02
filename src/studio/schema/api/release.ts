import {RocketIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const apiReleaseType = defineType({
  type: 'document',
  name: 'api.release',
  title: 'Release',
  icon: RocketIcon,
  fields: [
    defineField({
      type: 'string',
      name: 'version',
      title: 'Version',
    }),
    defineField({
      type: 'array',
      name: 'exports',
      title: 'Exports',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'api.export'}],
        }),
      ],
    }),
    defineField({
      type: 'array',
      name: 'memberNames',
      title: 'Member names',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      type: 'reference',
      name: 'package',
      title: 'Package',
      to: [{type: 'api.package'}],
      hidden: true,
    }),
  ],
  preview: {
    select: {
      packageScope: 'package.scope',
      packageName: 'package.name',
      version: 'version',
    },
    prepare: (data: any) => ({
      title: data.version,
      icon: RocketIcon,
      subtitle: [data.packageScope, data.packageName].filter(Boolean).join('/'),
    }),
  },
  readOnly: true,
})
