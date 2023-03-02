import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'ui',
  title: 'UI',
  stories: [
    {
      name: 'size',
      title: 'Size',
      component: lazy(() => import('./SizeStory')),
    },
  ],
})
