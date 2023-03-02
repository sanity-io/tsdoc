import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'components',
  title: 'Components',
  stories: [
    {
      name: 'release-badge',
      title: 'ReleaseBadge',
      component: lazy(() => import('./releaseBadge')),
    },
    {
      name: 'syntax-text',
      title: 'SyntaxTest',
      component: lazy(() => import('./syntaxText')),
    },
  ],
})
