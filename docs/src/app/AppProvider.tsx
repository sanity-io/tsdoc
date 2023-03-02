import {createTSDocStore} from '@sanity/tsdoc/store'
import {Card, ThemeColorSchemeKey, ThemeProvider, studioTheme, usePrefersDark} from '@sanity/ui'
import {ReactNode, useEffect, useMemo, useState} from 'react'
import {createGlobalStyle} from 'styled-components'
import {client} from '../sanity/client'
import {AppContext, AppContextValue} from './AppContext'

const GlobalStyle = createGlobalStyle(({theme}) => ({
  'html, body, #__next': {
    height: '100%',
  },

  html: {
    backgroundColor: theme.sanity.color.base.bg,
  },

  body: {
    margin: 0,
    WebkitFontSmoothing: 'antialiased',
  },
}))

export function AppProvider(props: {children: ReactNode}) {
  const {children} = props
  const prefersDark = usePrefersDark()
  const [scheme, setScheme] = useState<ThemeColorSchemeKey>(() => (prefersDark ? 'dark' : 'light'))

  const tsdocStore = useMemo(
    () => createTSDocStore({query: (q, params) => client.fetch(q, params)}),
    []
  )

  const store: AppContextValue['store'] = useMemo(() => ({tsdoc: tsdocStore}), [tsdocStore])

  const ctx: AppContextValue = useMemo(
    () => ({scheme, setScheme, store}),
    [scheme, setScheme, store]
  )

  useEffect(() => setScheme(prefersDark ? 'dark' : 'light'), [prefersDark])

  return (
    <AppContext.Provider value={ctx}>
      <ThemeProvider scheme={scheme} theme={studioTheme}>
        <GlobalStyle />
        <Card height="fill">{children}</Card>
      </ThemeProvider>
    </AppContext.Provider>
  )
}
