import {Box, Heading, Stack, Text} from '@sanity/ui'
// import {useRouter} from 'next/router'
import {ReactElement, useCallback} from 'react'
// import {FIXME, useAPIMember} from '../../lib/api'

export function Referrers(props: {data: any[]}): ReactElement {
  const {data} = props

  return (
    <>
      {data && data.length > 0 && (
        <Stack space={4}>
          <Heading as="h2" size={1}>
            Used by
          </Heading>

          <Stack as="ul" space={3}>
            {data.map((referrer) => (
              <Referrer key={referrer.name} name={referrer.name} />
            ))}
          </Stack>
        </Stack>
      )}
    </>
  )
}

function Referrer(props: {name: string}) {
  const {name} = props
  // const {push} = useRouter()
  // const {exportName, packageScope, packageName, version} = useAPIMember()
  // const path = [packageScope, packageName, version, exportName, name].filter(Boolean).join('/')
  const path = 'unknown'
  const href = `/reference/${path}`

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault()
      // push(href)
    },
    [
      href,
      // push
    ]
  )

  return (
    <Box as="li">
      <Text size={1}>
        <code>
          <a href={href} onClick={handleClick}>
            {name}
          </a>
        </code>
      </Text>
    </Box>
  )
}
