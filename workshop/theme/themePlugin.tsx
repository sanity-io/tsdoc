import {RootTheme, ThemeProvider} from '@sanity/ui'
import {WorkshopPlugin} from '@sanity/ui-workshop'

export function themePlugin(options: {theme: RootTheme}): WorkshopPlugin {
  const {theme} = options

  function Themed(props: {children?: React.ReactNode}) {
    return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
  }

  return {
    name: 'tsdoc',
    title: 'TSDoc',
    provider: Themed,
  }
}
