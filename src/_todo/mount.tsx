import {TSDocApp} from '@sanity/tsdoc/react'
import {ThemeColorSchemeKey, ThemeProvider, usePrefersDark} from '@sanity/ui'
import {createBrowserHistory} from 'history'
import {StrictMode, useEffect, useMemo, useState} from 'react'
import {createRoot} from 'react-dom/client'
import Refractor from 'react-refractor'
import bash from 'refractor/lang/bash'
import javascript from 'refractor/lang/javascript'
import json from 'refractor/lang/json'
import jsx from 'refractor/lang/jsx'
import typescript from 'refractor/lang/typescript'
import {createTSDocMemoryStore} from '../react/store/TSDocMemoryStore'
import {sanityTheme} from '../react/theme'

// @ts-expect-error TODO
import docs from '$docs'

Refractor.registerLanguage(bash)
Refractor.registerLanguage(javascript)
Refractor.registerLanguage(json)
Refractor.registerLanguage(jsx)
Refractor.registerLanguage(typescript)

function Root() {
  const store = useMemo(() => createTSDocMemoryStore({docs}), [docs])
  const history = useMemo(() => createBrowserHistory(), [])
  const scheme: ThemeColorSchemeKey = usePrefersDark() ? 'dark' : 'light'

  const [path, setPath] = useState<string>(() => history.location.pathname)

  // Listen to history changes
  useEffect(() => history.listen((update) => setPath(update.location.pathname)), [history])

  // Push history state
  useEffect(() => history.push({pathname: path || ''}), [path, history])

  return (
    <ThemeProvider scheme={scheme} theme={sanityTheme}>
      <TSDocApp onPathChange={setPath} path={path} store={store} />
    </ThemeProvider>
  )
}

export function mount(): void {
  const rootElement = document.getElementById('root')

  if (!rootElement) throw new Error('missing #root element')

  const root = createRoot(rootElement)

  root.render(
    <StrictMode>
      <Root />
    </StrictMode>
  )
}
