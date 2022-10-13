import {APITypeAlias} from '@sanity/tsdoc'
import {Card} from '@sanity/ui'
import {ReactElement} from 'react'
import {_compileTypeParameters} from '../../app/lib/_compile'
import {CommentDeprecatedCallout, CommentExampleBlocks, CommentRemarks} from '../../comment'
import {H} from '../../typography'
import {TSDocCode} from '../TSDocCode'

export function TypeAliasContent(props: {
  data: APITypeAlias
  fontSize?: number
  level?: number
}): ReactElement {
  const {data, fontSize = 2, level = 1} = props
  const {comment, name, type, typeParameters = []} = data

  return (
    <>
      {comment && <CommentDeprecatedCallout data={comment} fontSize={fontSize} level={level} />}

      {type && (
        <>
          <H fontSize={fontSize} level={level}>
            Signature
          </H>

          <Card border overflow="auto" padding={3} radius={2} tone="inherit">
            <TSDocCode
              fontSize={fontSize}
              prefix={`type ${name}${_compileTypeParameters(typeParameters)} = `}
              tokens={type}
            />
          </Card>
        </>
      )}

      {comment && <CommentRemarks data={comment} fontSize={fontSize} level={level} />}

      {comment && <CommentExampleBlocks data={comment} fontSize={fontSize} level={level} />}
    </>
  )
}
