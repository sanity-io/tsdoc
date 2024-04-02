import {APIClass, APIConstructor, APIMethod, APIProperty, SanityArrayItem} from '@sanity/tsdoc'
import {Box} from '@sanity/ui'
import {ReactElement, useMemo} from 'react'

import {CommentRemarks} from '../../comment'
import {H} from '../../lib/ui'
import {Members} from '../members'
import {_getMembers} from '../members/helpers'

function useMembers(data: APIClass) {
  return useMemo(() => {
    const members = _getMembers(data) as APIClass['members']

    const ret: {
      constructors: SanityArrayItem<APIConstructor>[]
      methods: SanityArrayItem<APIMethod>[]
      properties: SanityArrayItem<APIProperty>[]
      staticMethods: SanityArrayItem<APIMethod>[]
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

export function ClassContent(props: {data: APIClass}): ReactElement {
  const {data} = props
  const {comment} = data
  const {constructors, methods, properties, staticMethods} = useMembers(data)

  return (
    <>
      {comment?.remarks?.content && (
        <Box marginTop={6}>
          <CommentRemarks data={comment} />
        </Box>
      )}

      {/* <Referrers data={referrers} /> */}

      {constructors.length > 0 && (
        <>
          <H size={[-1, 0, 1, 2]}>Constructor</H>
          <Members data={constructors} member={data} />
        </>
      )}

      {properties.length > 0 && (
        <>
          <H size={[-1, 0, 1, 2]}>Properties</H>
          <Members data={properties} member={data} />
        </>
      )}

      {staticMethods.length > 0 && (
        <>
          <H size={[-1, 0, 1, 2]}>Static methods</H>
          <Members data={staticMethods} member={data} />
        </>
      )}

      {methods.length > 0 && (
        <>
          <H size={[-1, 0, 1, 2]}>Methods</H>
          <Members data={methods} member={data} />
        </>
      )}
    </>
  )
}
