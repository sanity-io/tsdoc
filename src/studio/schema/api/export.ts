import {PublishIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const apiExportType = defineType({
  type: 'document',
  name: 'api.export',
  title: 'Export',
  icon: PublishIcon,
  fields: [
    defineField({
      type: 'string',
      name: 'name',
      title: 'Name',
    }),
    defineField({
      type: 'string',
      name: 'path',
      title: 'Path',
    }),
    defineField({
      type: 'array',
      name: 'members',
      title: 'Members',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [
            {type: 'api.class'},
            {type: 'api.enum'},
            {type: 'api.function'},
            {type: 'api.interface'},
            {type: 'api.namespace'},
            {type: 'api.typeAlias'},
            {type: 'api.variable'},
          ],
        }),
      ],
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
  ],
  preview: {
    select: {
      name: 'name',
      packageScope: 'package.scope',
      packageName: 'package.name',
      version: 'release.version',
    },
    prepare: (data: any) => ({
      title: data.name,
      icon: PublishIcon,
      subtitle:
        [data.packageScope, data.packageName].filter(Boolean).join('/') + `@${data.version}`,
    }),
  },
  readOnly: true,
})
