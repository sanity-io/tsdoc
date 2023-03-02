import {AppProps} from 'next/app'
import {AppProvider} from '../app'

export default function App({Component, pageProps}: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )
}
