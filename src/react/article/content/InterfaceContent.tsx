import {
  APICallSignature,
  APIConstructSignature,
  APIIndexSignature,
  APIInterface,
  APIMethodSignature,
  APIPropertySignature,
  SanityArrayItem,
} from '@sanity/tsdoc'
import {Card, Code} from '@sanity/ui'
import {useMemo} from 'react'

import {_compileInterfaceDefinition} from '../../app/lib/_compile'
import {CommentExampleBlocks, CommentRemarks} from '../../comment'
import {H, useTextSize} from '../../lib/ui'
import {Members} from '../members'
import {_getMembers} from '../members/helpers'

function useMembers(data: APIInterface) {
  return useMemo(() => {
    const members = _getMembers(data) as APIInterface['members']

    const ret: {
      callSignatures: SanityArrayItem<APICallSignature>[]
      constructSignatures: SanityArrayItem<APIConstructSignature>[]
      indexSignatures: SanityArrayItem<APIIndexSignature>[]
      methodSignatures: SanityArrayItem<APIMethodSignature>[]
      propertySignatures: SanityArrayItem<APIPropertySignature>[]
    } = {
      callSignatures: [],
      constructSignatures: [],
      indexSignatures: [],
      methodSignatures: [],
      propertySignatures: [],
    }

    for (const m of members) {
      if (m._type === 'api.callSignature') {
        ret.callSignatures.push(m)
      } else if (m._type === 'api.constructSignature') {
        ret.constructSignatures.push(m)
      } else if (m._type === 'api.indexSignature') {
        ret.indexSignatures.push(m)
      } else if (m._type === 'api.methodSignature') {
        ret.methodSignatures.push(m)
      } else if (m._type === 'api.propertySignature') {
        ret.propertySignatures.push(m)
      } else {
        // eslint-disable-next-line
        console.log('WARN: unknown member type:', (m as any)._type)
      }
    }

    return ret
  }, [data])
}

export function InterfaceContent(props: {data: APIInterface}): React.ReactNode {
  const {data} = props
  const {comment} = data

  const {
    callSignatures,
    constructSignatures,
    indexSignatures,
    methodSignatures,
    propertySignatures,
  } = useMembers(data)

  return (
    <>
      <H size={[-1, 0, 1, 2]}>Signature</H>
      <Card border overflow="auto" padding={4} radius={3}>
        <Code language="typescript" size={useTextSize([-1, -1, 0])}>
          {_compileInterfaceDefinition(data)}
        </Code>
      </Card>

      {constructSignatures.length > 0 && (
        <>
          <H size={[-1, 0, 1, 2]}>Construct signatures</H>
          <Members data={constructSignatures} member={data} />
        </>
      )}

      {callSignatures.length > 0 && (
        <>
          <H size={[-1, 0, 1, 2]}>Call signatures</H>
          <Members data={callSignatures} member={data} />
        </>
      )}

      {indexSignatures.length > 0 && (
        <>
          <H size={[-1, 0, 1, 2]}>Index signatures</H>
          <Members data={indexSignatures} member={data} />
        </>
      )}

      {methodSignatures.length > 0 && (
        <>
          <H size={[-1, 0, 1, 2]}>Call signatures</H>
          <Members data={methodSignatures} member={data} />
        </>
      )}

      {propertySignatures.length > 0 && (
        <>
          <H size={[-1, 0, 1, 2]}>Properties</H>
          <Members data={propertySignatures} member={data} />
        </>
      )}

      {comment && <CommentRemarks data={comment} />}
      {comment && <CommentExampleBlocks data={comment} />}
    </>
  )
}
