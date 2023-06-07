import {APIDocument, APIMember} from '@sanity/tsdoc'
import {TSDocAppParams, createTSDocMemoryStore} from '@sanity/tsdoc/store'
import {ThemeColorSchemeKey, ThemeProvider, studioTheme, usePrefersDark} from '@sanity/ui'
import {createBrowserHistory} from 'history'
import {StrictMode, useEffect, useMemo, useState} from 'react'
import {createRoot} from 'react-dom/client'
import {parsePath, TSDocApp} from './app'

const EMPTY_ARRAY: never[] = []

function Root(props: {docs?: APIDocument[]}) {
  const {docs = EMPTY_ARRAY} = props
  const store = useMemo(() => createTSDocMemoryStore({docs}), [docs])
  const history = useMemo(() => createBrowserHistory(), [])
  const scheme: ThemeColorSchemeKey = usePrefersDark() ? 'dark' : 'light'
  const [path, setPath] = useState<string>(() => history.location.pathname)
  const basePath = undefined
  const params: TSDocAppParams | undefined = useMemo(
    () => parsePath(path, {basePath}),
    [basePath, path]
  )
  const [member, setMember] = useState<(APIMember & {versions: string[]}) | null>(null)

  // Listen to history changes
  useEffect(() => history.listen((update) => setPath(update.location.pathname)), [history])

  // Push history state
  useEffect(() => history.push({pathname: path || ''}), [path, history])

  useEffect(() => {
    if (params) store.member.get(params).then(setMember)
  }, [params, store])

  useEffect(() => {
    if (member) {
      document.title = `${member.name} | ${member.export.name}@${member.release.version}`
    }
  }, [member])

  return (
    <ThemeProvider scheme={scheme} theme={studioTheme}>
      <TSDocApp basePath={basePath} onPathChange={setPath} path={path} store={store} />
    </ThemeProvider>
  )
}

/** @beta */
export function mount(options: {docs: APIDocument[]; element: HTMLElement | null}): void {
  const {docs, element} = options

  if (!element) throw new Error('missing element')

  const root = createRoot(element)

  root.render(
    <StrictMode>
      <Root docs={docs} />
    </StrictMode>
  )
}
