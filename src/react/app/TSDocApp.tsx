import {Card, Flex} from '@sanity/ui'
import {ReactElement, useMemo} from 'react'
import styled from 'styled-components'
import {TSDocStore} from '../store'
import {TSDocAppParams} from '../types'
import {TSDocDetail} from './TSDocDetail'
import {TSDocNav} from './TSDocNav'
import {TSDocProvider} from './TSDocProvider'

/** @public */
export interface TSDocAppProps {
  onPathChange: (value: string, replace?: boolean) => void
  path: string
  store: TSDocStore
}

const Root = styled(Card)({
  lineHeight: 0,
})

/**
 * @example
 * ```tsx
 * import {TSDocApp, createTSDocMemoryStore} from '@sanity/tsdoc/react'
 * import {useState} from 'react'
 *
 * const store = createTSDocMemoryStore({docs: []})
 * const [path, setPath] = useState<string | null>(null)
 *
 * <TSDocApp path={path} onPathChange={setPath} store={store} />
 * ```
 *
 * @public
 * */
export function TSDocApp(props: TSDocAppProps): ReactElement {
  const {onPathChange, path, store} = props

  const params: TSDocAppParams | null = useMemo(() => {
    const segments = path.split('/').filter(Boolean)

    if (segments.length === 0) return null

    const hasScope = segments[0].slice(0, 1) === '@'
    const packageScope = (hasScope && segments.shift()) || null
    const packageName = segments[0]
    const releaseVersion = segments[1]
    const exportPath = segments[2] === 'index' ? '.' : segments[2]
    const memberName = segments[3]

    return {
      exportPath,
      memberName,
      packageName,
      packageScope,
      releaseVersion,
    }
  }, [path])

  return (
    <TSDocProvider onPathChange={onPathChange} params={params} path={path} store={store}>
      <Root height="fill">
        <Flex height="fill">
          <TSDocNav />
          {params && <TSDocDetail />}
        </Flex>
      </Root>
    </TSDocProvider>
  )
}
