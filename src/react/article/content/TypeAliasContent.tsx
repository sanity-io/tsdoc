import {APITypeAlias, APITypeParameter, SanityArrayItem} from '@sanity/tsdoc'
import {Card} from '@sanity/ui'
import {ReactElement} from 'react'
import {CommentDeprecatedCallout, CommentExampleBlocks, CommentRemarks} from '../../comment'
import {_fontSize} from '../../helpers'
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
              prefix={`type ${name}${_compileTypeParameters(typeParameters)} = `}
              size={_fontSize(fontSize, [0, 0, 1])}
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

function _compileTypeParameters(typeParameters: SanityArrayItem<APITypeParameter>[]) {
  if (typeParameters.length === 0) return ''

  return `<${typeParameters
    .map((p) => {
      let code = `${p.name}`

      if (p.constraintType?.length) {
        code += ` extends ${p.constraintType.map((t) => t.text).join('')}`
      }

      if (p.defaultType?.length) {
        code += ` = ${p.defaultType.map((t) => t.text).join('')}`
      }

      return code
    })
    .join(', ')}>`
}
