import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  stories: [
    {
      name: 'search',
      title: 'Search',
      component: lazy(() => import('./search')),
    },
    {
      name: 'symbol',
      title: 'Symbol',
      component: lazy(() => import('./symbol')),
    },
    {
      name: 'symbol-preview',
      title: 'Symbol preview',
      component: lazy(() => import('./symbolPreview')),
    },
  ],
})
