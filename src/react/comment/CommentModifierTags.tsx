import {TSDocComment} from '@sanity/tsdoc'
import {Inline, Text} from '@sanity/ui'
import {ReactElement} from 'react'

import {ReleaseTag} from '../components/ReleaseTag'

export function CommentModifierTags(props: {
  modifierTags: TSDocComment['modifierTags']
}): ReactElement {
  const {modifierTags = []} = props

  return (
    <Inline space={1}>
      {modifierTags.map((tag) => {
        return (
          <Text key={tag.name} size={1}>
            <ReleaseTag $tag={tag.name}>{tag.name}</ReleaseTag>
          </Text>
        )
      })}
    </Inline>
  )
}
