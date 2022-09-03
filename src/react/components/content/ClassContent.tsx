import {APIClass, APIConstructor, APIMethod, APIProperty, Sanity} from '@sanity/tsdoc'
import {Box, Heading, Stack} from '@sanity/ui'
import {ReactElement, useMemo} from 'react'
import {CommentDeprecatedCallout, CommentRemarks, CommentSummary} from '../comment'
import {Members} from '../members'
import {_getMembers} from '../members/helpers'

function useMembers(data: APIClass) {
  return useMemo(() => {
    const members = _getMembers(data) as APIClass['members']

    const ret: {
      constructors: Sanity.ArrayItem<APIConstructor>[]
      methods: Sanity.ArrayItem<APIMethod>[]
      properties: Sanity.ArrayItem<APIProperty>[]
      staticMethods: Sanity.ArrayItem<APIMethod>[]
    } = {
      constructors: [],
      methods: [],
      properties: [],
      staticMethods: [],
    }

    for (const m of members) {
      if (m._type === 'api.constructor') {
        ret.constructors.push(m)
      } else if (m._type === 'api.method') {
        if (m.isStatic) {
          ret.staticMethods.push(m)
        } else {
          ret.methods.push(m)
        }
      } else if (m._type === 'api.property') {
        ret.properties.push(m)
      } else {
        // eslint-disable-next-line
        console.log('unknown member type:', (m as any)._type)
      }
    }

    return ret
  }, [data])
}

export function ClassContent(props: {member: APIClass}): ReactElement {
  const {member} = props
  const {comment} = member
  const {constructors, methods, properties, staticMethods} = useMembers(member)

  return (
    <Stack>
      {comment?.deprecated?.content && (
        <Box marginTop={4}>
          <CommentDeprecatedCallout data={comment} />
        </Box>
      )}

      {comment?.summary && (
        <Box marginTop={4}>
          <CommentSummary data={comment} />
        </Box>
      )}

      {comment?.remarks?.content && (
        <Box marginTop={6}>
          <CommentRemarks data={comment} />
        </Box>
      )}

      {/* <Referrers data={referrers} /> */}

      {constructors.length > 0 && (
        <Stack marginTop={6} space={4}>
          <Heading as="h2" size={1}>
            Constructor
          </Heading>
          <Members data={constructors} member={member} />
        </Stack>
      )}

      {staticMethods.length > 0 && (
        <Stack marginTop={6} space={4}>
          <Heading as="h2" size={1}>
            Static methods
          </Heading>
          <Members data={staticMethods} member={member} />
        </Stack>
      )}

      {methods.length > 0 && (
        <Stack marginTop={6} space={4}>
          <Heading as="h2" size={1}>
            Methods
          </Heading>
          <Members data={methods} member={member} />
        </Stack>
      )}

      {properties.length > 0 && (
        <Stack marginTop={6} space={4}>
          <Heading as="h2" size={1}>
            Properties
          </Heading>
          <Members data={properties} member={member} />
        </Stack>
      )}
    </Stack>
  )
}
