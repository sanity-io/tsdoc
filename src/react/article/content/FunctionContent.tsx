import {APIFunction} from '@sanity/tsdoc'
import {Card} from '@sanity/ui'
import {ReactElement, useMemo} from 'react'
import {useMemberLink} from '../../app'
import {CommentDeprecatedCallout, CommentExampleBlocks, CommentRemarks} from '../../comment'
import {_fontSize} from '../../helpers'
import {H, P} from '../../typography'
import {Members} from '../members'
import {_getMembers} from '../members/helpers'
import {TSDocCode} from '../TSDocCode'

export function FunctionContent(props: {
  data: APIFunction
  fontSize?: number
  level?: number
}): ReactElement {
  const {data, fontSize = 2, level = 1} = props
  const {comment, name, parameters, propsType, returnType, typeParameters} = data

  const propsTypeMembers = useMemo(() => propsType && _getMembers(propsType), [propsType])

  const codePrefix = useMemo(
    () =>
      [
        `function ${name}`,
        typeParameters.length > 0
          ? `<${typeParameters
              .map((p) => {
                let n = p.name

                if (p.constraintType && p.constraintType.length > 0) {
                  n = `${n} extends ${p.constraintType.map((t) => t.text).join('')}`
                }

                if (p.defaultType.length > 0) {
                  n = `${n} = ${p.defaultType.map((t) => t.text).join('')}`
                }

                return n
              })
              .join(', ')}>`
          : '',
        `(${parameters
          .map((param) => `${param.name}: ${param.type.map((t) => t.text).join('')}`)
          .join(', ')}): `,
      ].join(''),
    [name, parameters, typeParameters]
  )

  const propsTypeLinkParams = useMemo(
    () =>
      propsType && {
        exportPath: propsType.export?.path,
        packageName: propsType.package?.name,
        packageScope: propsType.package?.scope || null,
        memberName: propsType.name,
        releaseVersion: propsType.release?.version,
      },
    [propsType]
  )

  const propsTypeLink = useMemberLink({
    params: propsTypeLinkParams || null,
  })

  return (
    <>
      {comment && <CommentDeprecatedCallout data={comment} fontSize={fontSize} />}

      <H fontSize={fontSize} level={level}>
        Signature
      </H>

      <Card border padding={3} radius={2} overflow="auto" tone="inherit">
        <TSDocCode prefix={codePrefix} size={_fontSize(fontSize, [0, 0, 1])} tokens={returnType} />
      </Card>

      {propsType && propsTypeLinkParams && propsTypeMembers && (
        <>
          <H fontSize={fontSize} level={level}>
            Props
          </H>

          <P fontSize={fontSize}>
            Defined by the{' '}
            <code>
              <a href={propsTypeLink.href} onClick={propsTypeLink?.onClick}>
                {propsType.name}
              </a>
            </code>{' '}
            interface.
          </P>

          {propsTypeMembers.length > 0 && (
            <Members data={propsTypeMembers} fontSize={fontSize} member={data} />
          )}

          {propsTypeMembers.length === 0 && (
            <P fontSize={fontSize}>
              <em>No members.</em>
            </P>
          )}
        </>
      )}

      {comment && <CommentRemarks data={comment} fontSize={fontSize} />}
      {comment && <CommentExampleBlocks data={comment} fontSize={fontSize} level={2} />}
    </>
  )
}
