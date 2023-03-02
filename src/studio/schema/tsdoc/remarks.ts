import {defineType} from 'sanity'

export const tsdocRemarksBlockType = defineType({
  type: 'object',
  name: 'tsdoc.remarksBlock',
  title: 'Remarks',
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
