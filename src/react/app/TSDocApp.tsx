import {Card, Flex} from '@sanity/ui'
import {ReactElement, useCallback, useMemo} from 'react'
import styled from 'styled-components'
import {TSDocStore} from '../store'
import {TSDocAppParams} from '../types'
import {parsePath} from './helpers'
import {TSDocDetail} from './TSDocDetail'
import {TSDocNav} from './TSDocNav'
import {TSDocProvider} from './TSDocProvider'

/** @beta */
export interface TSDocAppProps {
  basePath?: string
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
 * @beta
 * */
export function TSDocApp(props: TSDocAppProps): ReactElement {
  const {basePath = '', onPathChange, path, store} = props

  const params: TSDocAppParams | null = useMemo(() => parsePath(path, {basePath}), [basePath, path])

  const handlePathChange = useCallback(
    (nextPath: string, replace?: boolean) => {
      onPathChange(`${basePath}${nextPath}`, replace)
    },
    [basePath, onPathChange]
  )

  return (
    <TSDocProvider onPathChange={handlePathChange} params={params} path={path} store={store}>
      <Root height="fill">
        <Flex height="fill">
          <TSDocNav />
          {params && <TSDocDetail />}
        </Flex>
      </Root>
    </TSDocProvider>
  )
}
