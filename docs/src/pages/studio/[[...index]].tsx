import Head from 'next/head'
import {NextStudio} from 'next-sanity/studio'
import {NextStudioHead} from 'next-sanity/studio/head'
import {StudioLayout, StudioProvider} from 'sanity'
import config from 'sanity.config'
import {useApp} from '../../app'

export default function StudioPage() {
  const {scheme, setScheme} = useApp()

  return (
    <>
      <Head>
        <NextStudioHead favicons={false} />
      </Head>
      <NextStudio config={config}>
        <StudioProvider config={config} onSchemeChange={setScheme} scheme={scheme}>
          <StudioLayout />
        </StudioProvider>
      </NextStudio>
    </>
  )
}
