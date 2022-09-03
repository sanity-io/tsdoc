import {TSDoc} from '@sanity/tsdoc'
import {Badge, Inline} from '@sanity/ui'
import {ReactElement} from 'react'
// import {TSDocComment} from '../../../lib/api'

const TAG_TITLES: Record<string, string> = {
  '@alpha': 'Alpha',
  '@beta': 'Beta',
  '@public': 'Public',
  '@sealed': 'Sealed',
}

export function CommentModifierTags(props: {
  modifierTags: TSDoc.Comment['modifierTags']
}): ReactElement {
  const {modifierTags = []} = props

  return (
    <Inline space={1}>
      {modifierTags.map((tag) => {
        const title = TAG_TITLES[tag.name] || tag.name.slice(1)

        if (tag.name === '@alpha') {
          return (
            <Badge fontSize={1} key={tag.name} radius={2} tone="critical">
              {title}
            </Badge>
          )
        }

        if (tag.name === '@beta') {
          return (
            <Badge fontSize={1} key={tag.name} radius={2} tone="caution">
              {title}
            </Badge>
          )
        }

        if (tag.name === '@public') {
          return (
            <Badge fontSize={1} key={tag.name} radius={2} tone="positive">
              {title}
            </Badge>
          )
        }

        if (tag.name === '@sealed') {
          return (
            <Badge fontSize={1} key={tag.name} radius={2} tone="primary">
              {title}
            </Badge>
          )
        }

        return (
          <Badge fontSize={1} key={tag.name}>
            {title}
          </Badge>
        )
      })}
    </Inline>
  )
}
