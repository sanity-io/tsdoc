import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  stories: [
    {
      name: 'search',
      title: 'Search',
      component: lazy(() => import('./SearchStory')),
    },
    {
      name: 'symbol',
      title: 'Symbol',
      component: lazy(() => import('./SymbolStory')),
    },
  ],
})
