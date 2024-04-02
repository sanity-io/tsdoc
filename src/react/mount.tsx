import {APIDocument} from '@sanity/tsdoc'
import {createTSDocMemoryStore, TSDocAPIMember, TSDocAppParams} from '@sanity/tsdoc/store'
import {studioTheme, ThemeColorSchemeKey, ThemeProvider, usePrefersDark} from '@sanity/ui'
import {createBrowserHistory} from 'history'
import {StrictMode, useEffect, useMemo, useState} from 'react'
import {createRoot} from 'react-dom/client'

import {parsePath, TSDocApp} from './app'

const EMPTY_ARRAY: never[] = []

function Root(props: {docs?: APIDocument[]; releaseVersion?: string}) {
  const {docs = EMPTY_ARRAY, releaseVersion = '0.0.0'} = props
  const store = useMemo(() => createTSDocMemoryStore({docs}), [docs])
  const history = useMemo(() => createBrowserHistory(), [])
  const scheme: ThemeColorSchemeKey = usePrefersDark() ? 'dark' : 'light'
  const [path, setPath] = useState<string>(() => history.location.pathname)
  const basePath = undefined
  const params: TSDocAppParams | undefined = useMemo(
    () => parsePath(path, {basePath, version: releaseVersion}),
    [basePath, path, releaseVersion],
  )

  const [members, setMembers] = useState<TSDocAPIMember[] | undefined | null>(null)

  // Listen to history changes
  useEffect(() => history.listen((update) => setPath(update.location.pathname)), [history])

  // Push history state
  useEffect(() => history.push({pathname: path || ''}), [path, history])

  useEffect(() => {
    if (params) store.member.get(params).then(setMembers)
  }, [params, store])

  useEffect(() => {
    if (members?.length) {
      document.title = `${members?.[0]?.name} | ${members?.[0]?.export.name}@${members?.[0]?.release.version}`
    }
  }, [members])

  return (
    <ThemeProvider scheme={scheme} theme={studioTheme}>
      <TSDocApp
        basePath={basePath}
        onPathChange={setPath}
        path={path}
        store={store}
        releaseVersion={releaseVersion}
      />
    </ThemeProvider>
  )
}

/** @beta */
export function mount(options: {
  docs: APIDocument[]
  releaseVersion?: string
  element: HTMLElement | null
}): void {
  const {docs, releaseVersion, element} = options

  if (!element) throw new Error('missing element')

  const root = createRoot(element)

  root.render(
    <StrictMode>
      <Root docs={docs} releaseVersion={releaseVersion} />
    </StrictMode>,
  )
}
