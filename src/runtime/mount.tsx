import {TSDocApp} from '@sanity/tsdoc/react'
import {studioTheme, ThemeProvider} from '@sanity/ui'
import {createBrowserHistory} from 'history'
import {StrictMode} from 'react'
import ReactDOM from 'react-dom'
import Refractor from 'react-refractor'
// import bash from 'refractor/lang/bash'
// import javascript from 'refractor/lang/javascript'
import json from 'refractor/lang/json'
// import jsx from 'refractor/lang/jsx'
import typescript from 'refractor/lang/typescript'

// Refractor.registerLanguage(bash)
// Refractor.registerLanguage(javascript)
Refractor.registerLanguage(json)
// Refractor.registerLanguage(jsx)
Refractor.registerLanguage(typescript)

declare const __DB__: string

export function mount(): void {
  const docs = JSON.parse(__DB__)

  const history = createBrowserHistory()

  ReactDOM.render(
    <StrictMode>
      <ThemeProvider theme={studioTheme}>
        <TSDocApp docs={docs} history={history} />
      </ThemeProvider>
    </StrictMode>,
    document.getElementById('root') as HTMLElement
  )
}
