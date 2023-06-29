import {TSDocAppParams, TSDocStore} from '@sanity/tsdoc/store'
import {Card, Flex} from '@sanity/ui'
import {ReactElement, useCallback, useMemo} from 'react'
import styled from 'styled-components'
import {parsePath} from './helpers'
import {TSDocNav} from './nav'
import {TSDocDetail} from './TSDocDetail'
import {TSDocProvider} from './TSDocProvider'

/** @beta */
export interface TSDocAppProps {
  basePath?: string
  onPathChange: (value: string, replace?: boolean) => void
  path: string
  store: TSDocStore
  releaseVersion?: string
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
  const {basePath = '', onPathChange, path, store, releaseVersion = ''} = props

  const params: TSDocAppParams | undefined = useMemo(
    () => parsePath(path, {basePath, version: releaseVersion}),
    [basePath, path, releaseVersion]
  )

  const handlePathChange = useCallback(
    (nextPath: string, replace?: boolean) => {
      onPathChange(`${basePath}${nextPath}`, replace)
    },
    [basePath, onPathChange]
  )

  return (
    <TSDocProvider
      basePath={basePath}
      onPathChange={handlePathChange}
      params={params}
      path={path}
      store={store}
    >
      <Root height="fill">
        <Flex direction="column" height="fill">
          <Flex flex={1}>
            <Card borderRight display={['none', 'none', 'block']} style={{width: 400}}>
              <TSDocNav />
            </Card>

            {params && (
              <Card flex={1} overflow="auto">
                <TSDocDetail />
              </Card>
            )}
          </Flex>
        </Flex>
      </Root>
    </TSDocProvider>
  )
}
