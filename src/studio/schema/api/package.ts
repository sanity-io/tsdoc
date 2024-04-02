import {PackageIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const apiPackageType = defineType({
  type: 'document',
  name: 'api.package',
  title: 'Package',
  icon: PackageIcon,
  fields: [
    defineField({
      type: 'string',
      name: 'scope',
      title: 'Scope',
    }),
    defineField({
      type: 'string',
      name: 'name',
      title: 'Name',
    }),
    defineField({
      type: 'reference',
      name: 'latestRelease',
      title: 'Latest release',
      to: [{type: 'api.release'}],
    }),
    defineField({
      type: 'array',
      name: 'releases',
      title: 'Releases',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'api.release'}],
        }),
      ],
    }),
  ],
  readOnly: true,
  preview: {
    select: {
      scope: 'scope',
      name: 'name',
    },
    prepare(data: any) {
      return {
        title: [data.scope, data.name].filter(Boolean).join('/'),
      }
    },
  },
})
