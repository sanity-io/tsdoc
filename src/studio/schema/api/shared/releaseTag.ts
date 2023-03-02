import {defineType} from 'sanity'

export const apiReleaseTagType = defineType({
  type: 'string',
  name: 'api.releaseTag',
  title: 'Release tag',
  options: {
    list: [
      {title: 'Public', value: 'public'},
      {title: 'Beta', value: 'beta'},
    ],
  },
})
