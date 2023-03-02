import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  stories: [
    {
      name: 'article',
      title: 'Article',
      component: lazy(() => import('./ArticleStory')),
    },
  ],
})
