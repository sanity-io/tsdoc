import {defineType} from 'sanity'

export const tsdocReturnsBlockType = defineType({
  type: 'object',
  name: 'tsdoc.returnsBlock',
  title: 'Returns block',
  fields: [
    {
      type: 'array',
      name: 'content',
      title: 'Content',
      of: [
        {
          type: 'block',
        },
        {
          type: 'code',
          name: 'code',
          title: 'Code',
        },
      ],
    },
  ],
})
