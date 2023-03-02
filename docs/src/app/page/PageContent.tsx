import {Text} from '@sanity/ui'
import {Article} from './article'
import {PageData} from './types'

export function PageContent(props: {data: PageData | null}) {
  const {data} = props

  if (!data) {
    return <Text>No data</Text>
  }

  if (data._type === 'article') {
    return <Article data={data} />
  }

  return <Text>Unknown page document type: {data._type}</Text>
}
