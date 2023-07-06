import {APIMember} from '@sanity/tsdoc'
import {Card, Stack, Text} from '@sanity/ui'
import {ReactElement} from 'react'
import {useSpace, useTextSize} from '../../lib/ui'
import {APIMemberWithInheritance} from './_types'
import {TSCallSignatureMember} from './TSCallSignatureMember'
import {TSContructorMember} from './TSConstructorMember'
import {TSConstructSignatureMember} from './TSConstructSignatureMember'
import {TSEnumMember} from './TSEnumMember'
import {TSIndexSignatureMember} from './TSIndexSignatureMember'
import {TSMethodMember} from './TSMethodMember'
import {TSMethodSignatureMember} from './TSMethodSignatureMember'
import {TSPropertyMember} from './TSPropertyMember'
import {TSPropertySignatureMember} from './TSPropertySignatureMember'

export function Members(props: {
  data: APIMemberWithInheritance[]
  member: APIMember
}): ReactElement {
  const {data, member} = props

  return (
    <Stack marginTop={useSpace([1, 1, 3])} space={useSpace([1, 2, 3])}>
      {data.map((m) => (
        <Member data={m} key={m._key} member={member} />
      ))}
    </Stack>
  )
}

function Member(props: {data: APIMemberWithInheritance; member: APIMember}) {
  const {data, member} = props
  const textSize = useTextSize([-1, 0, 1])

  if (data._type === 'api.callSignature') {
    return <TSCallSignatureMember data={data} />
  }

  if (data._type === 'api.constructor') {
    return <TSContructorMember data={data} member={member} />
  }

  if (data._type === 'api.method') {
    return <TSMethodMember data={data} member={member} />
  }

  if (data._type === 'api.property') {
    return <TSPropertyMember data={data} />
  }

  if (data._type === 'api.propertySignature') {
    return <TSPropertySignatureMember data={data} />
  }

  if (data._type === 'api.methodSignature') {
    return <TSMethodSignatureMember data={data} member={member} />
  }

  if (data._type === 'api.constructSignature') {
    return <TSConstructSignatureMember data={data} />
  }

  if (data._type === 'api.indexSignature') {
    return <TSIndexSignatureMember data={data} />
  }

  if (data._type === 'api.enumMember') {
    return <TSEnumMember data={data} />
  }

  return (
    <Card padding={4} radius={2} tone="critical">
      <Text size={textSize}>
        Unexpected member type: <code>{data._type}</code>
      </Text>
    </Card>
  )
}
