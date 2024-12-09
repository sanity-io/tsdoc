import {Text} from '@sanity/ui'

import {_fontSize} from '../../helpers'

export function MemberInheritedFrom(props: {
  data: {name: string; slug?: string}
  fontSize?: number
}): React.ReactNode {
  const {data, fontSize = 2} = props

  return (
    <Text as="p" muted size={_fontSize(fontSize, [1, 1, 2])}>
      Inherited from{' '}
      {data.slug && (
        <code>
          <a>{data.name}</a>
        </code>
      )}
      {!data.slug && <code>{data.name}</code>}.
    </Text>
  )
}
