import {TSDocStore} from '@sanity/tsdoc/store'
import {ThemeColorSchemeKey} from '@sanity/ui'
import {createContext} from 'react'

export interface AppContextValue {
  scheme: ThemeColorSchemeKey
  setScheme: (scheme: ThemeColorSchemeKey) => void
  store: {
    tsdoc: TSDocStore
  }
}

export const AppContext = createContext<AppContextValue | null>(null)
