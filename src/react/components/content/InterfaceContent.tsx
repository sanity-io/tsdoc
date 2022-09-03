import {APICallSignature, APIInterface, APIPropertySignature, Sanity} from '@sanity/tsdoc'
import {Box, Code, Heading, Stack} from '@sanity/ui'
import {ReactElement, useMemo} from 'react'
import {CommentDeprecatedCallout, CommentRemarks, CommentSummary} from '../comment'
import {Members} from '../members'
import {_getMembers} from '../members/helpers'
// import {ReferenceReferrers} from '../ReferenceReferrers'

function useMembers(data: APIInterface) {
  return useMemo(() => {
    const members = _getMembers(data) as APIInterface['members']

    const ret: {
      callSignatures: Sanity.ArrayItem<APICallSignature>[]
      propertySignatures: Sanity.ArrayItem<APIPropertySignature>[]
    } = {
      callSignatures: [],
      propertySignatures: [],
    }

    for (const m of members) {
      if (m._type === 'api.callSignature') {
        ret.callSignatures.push(m)
      } else if (m._type === 'api.propertySignature') {
        ret.propertySignatures.push(m)
      } else {
        // eslint-disable-next-line
        console.log('WARN: unknown member type:', m._type)
      }
    }

    return ret
  }, [data])
}

export function InterfaceContent(props: {data: APIInterface}): ReactElement {
  const {data} = props
  const {comment, extends: _extends, typeParameters} = data

  const {callSignatures, propertySignatures} = useMembers(data)

  // data.extends

  return (
    <Stack>
      {comment && <CommentDeprecatedCallout data={comment} />}
      {comment && <CommentSummary data={comment} />}
      {comment && <CommentRemarks data={comment} />}

      {callSignatures.length > 0 && (
        <Stack marginTop={6} space={4}>
          <Heading as="h2" size={1}>
            Call signatures
          </Heading>
          <Members data={callSignatures} member={data} />
        </Stack>
      )}

      {propertySignatures.length > 0 && (
        <Stack marginTop={6} space={4}>
          <Heading as="h2" size={1}>
            Properties
          </Heading>
          <Members data={propertySignatures} member={data} />
        </Stack>
      )}

      {_extends && (
        <Box marginTop={6}>
          <Heading as="h2" size={1}>
            Extends
          </Heading>

          <Box marginTop={4}>
            <Code language="json" size={1}>
              {JSON.stringify(_extends, null, 2)}
            </Code>
          </Box>
        </Box>
      )}

      {typeParameters && (
        <Box marginTop={6}>
          <Heading as="h2" size={1}>
            Type parameters
          </Heading>

          <Box marginTop={4}>
            <Code language="json" size={1}>
              {JSON.stringify(typeParameters, null, 2)}
            </Code>
          </Box>
        </Box>
      )}

      {/* {data.referrers.length > 0 && <ReferenceReferrers referrers={data.referrers} />} */}
    </Stack>
  )
}
