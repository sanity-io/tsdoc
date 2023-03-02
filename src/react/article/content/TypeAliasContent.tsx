import {APITypeAlias} from '@sanity/tsdoc'
import {Card} from '@sanity/ui'
import {ReactElement} from 'react'
import {_compileTypeParameters} from '../../app/lib/_compile'
import {CommentExampleBlocks, CommentRemarks} from '../../comment'
import {H} from '../../lib/ui'
import {TSDocCode} from '../TSDocCode'

export function TypeAliasContent(props: {data: APITypeAlias}): ReactElement {
  const {data} = props
  const {comment, name, type, typeParameters = []} = data

  return (
    <>
      {type && (
        <>
          <H size={[-1, 0, 1, 2]}>Signature</H>

          <Card border overflow="auto" padding={3} radius={3} tone="inherit">
            <TSDocCode
              prefix={`type ${name}${_compileTypeParameters(typeParameters)} = `}
              tokens={type}
            />
          </Card>
        </>
      )}

      {comment && <CommentRemarks data={comment} />}

      {comment && <CommentExampleBlocks data={comment} />}
    </>
  )
}
