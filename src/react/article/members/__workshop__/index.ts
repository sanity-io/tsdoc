import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'members',
  title: 'Members',
  stories: [
    {
      name: 'all',
      title: 'All',
      component: lazy(() => import('./all')),
    },
  ],
})
