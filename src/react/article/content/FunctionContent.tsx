import {APIFunction} from '@sanity/tsdoc'
import {TSDocAppParams} from '@sanity/tsdoc/store'
import {Card} from '@sanity/ui'
import {ReactElement, useMemo} from 'react'
import {TSDocSymbol, TSDocSymbolPreview} from '../../app'
import {CommentExampleBlocks, CommentRemarks} from '../../comment'
import {H, P} from '../../lib/ui'
import {Members} from '../members'
import {_getMembers} from '../members/helpers'
import {TSDocCode} from '../TSDocCode'

export function FunctionContent(props: {data: APIFunction}): ReactElement {
  const {data} = props

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

  const propsTypeLinkParams: TSDocAppParams | null = useMemo(
    () =>
      propsType?.export?.path &&
      propsType?.package?.name &&
      propsType?.name &&
      propsType.release?.version
        ? {
            exportPath: propsType.export.path,
            packageName: propsType.package.name,
            packageScope: propsType.package.scope || null,
            memberName: propsType.name,
            releaseVersion: propsType.release.version,
          }
        : null,
    [propsType]
  )

  return (
    <>
      <H size={[-1, 0, 1, 2]}>Signature</H>

      <Card border padding={3} radius={2} overflow="auto" tone="inherit">
        <TSDocCode prefix={codePrefix} tokens={returnType} />
      </Card>

      {propsType && propsTypeLinkParams && propsTypeMembers && (
        <>
          <H size={[-1, 0, 1, 2]}>Props</H>

          <P muted size={[-1, 0, 1]}>
            Defined by the{' '}
            <span
              style={{
                display: 'inline-block',
                verticalAlign: 'middle',
                position: 'relative',
                top: -1,
              }}
            >
              <TSDocSymbol border name={propsType.name} padding={2} radius={3} />
            </span>{' '}
            interface.
          </P>

          {propsTypeMembers.length > 0 && <Members data={propsTypeMembers} member={data} />}

          {propsTypeMembers.length === 0 && (
            <>
              <TSDocSymbolPreview name={propsType.name} />
              <P muted size={[-1, 0, 1]}>
                <em>No members.</em>
              </P>
            </>
          )}
        </>
      )}

      {comment && <CommentRemarks data={comment} />}
      {comment && <CommentExampleBlocks data={comment} />}
    </>
  )
}
