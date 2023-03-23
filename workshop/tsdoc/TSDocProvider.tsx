import {
  TSDocProvider as BaseTSDocProvider,
  parsePath,
  usePackages,
  useTSDoc,
  useExports,
} from '@sanity/tsdoc/react'
import {createTSDocMemoryStore} from '@sanity/tsdoc/store'
import {useWorkshop} from '@sanity/ui-workshop'
import {useMemo} from 'react'
import {ReactElement, ReactNode, useEffect, useState} from 'react'
import {TSDocMsg} from './types'

export function TSDocProvider(props: {children?: ReactNode}): ReactElement {
  const {children} = props
  const [path, setPath] = useState('/')
  const [docs, setDocs] = useState([])
  const store = useMemo(() => createTSDocMemoryStore({docs}), [docs])
  const params = useMemo(() => parsePath(path), [path])

  useEffect(() => {
    const es = new EventSource('http://localhost:1337/events')

    function handleMessage(event: MessageEvent) {
      try {
        const msg = JSON.parse(event.data)

        if (msg.type === 'docs') {
          setDocs(msg.docs)
        }
      } catch (_err) {
        // ignore
      }
    }

    es.addEventListener('message', handleMessage)

    return () => {
      es.removeEventListener('message', handleMessage)
    }
  }, [])

  return (
    <BaseTSDocProvider onPathChange={setPath} params={params} path={path} store={store}>
      <Inner />
      {children}
    </BaseTSDocProvider>
  )
}

export function Inner(): null {
  const {channel, broadcast} = useWorkshop<TSDocMsg>()
  const {params, updateParams} = useTSDoc()
  const {exportPath, memberName, packageName, releaseVersion} = params
  const packages = usePackages()
  const exports = useExports()

  const currentPackage = packages.data?.find((pkg) => pkg.name === packageName)
  const defaultPackage = packages.data?.[0]
  const defaultPackageScope = defaultPackage?.scope
  const defaultPackageName = defaultPackage?.name

  const defaultRelease = (currentPackage || defaultPackage)?.latestRelease
  const defaultReleaseVersion = defaultRelease?.version

  const currentExport = exports.data?.find((e) => e.path === exportPath)
  const defaultExport = exports.data?.[0]
  const defaultExportPath = (currentExport || defaultExport)?.path
  const defaultMember = (currentExport || defaultExport)?.members?.[0]
  const defaultMemberName = defaultMember?.name

  // Set the default package scope/name if none is set
  useEffect(() => {
    if (!packageName && defaultPackageName) {
      broadcast({
        type: 'workshop/tsdoc/updateParams',
        params: {
          packageName: defaultPackageName,
          packageScope: defaultPackageScope || null,
          releaseVersion: defaultReleaseVersion,
          exportPath: defaultExportPath,
          memberName: defaultMemberName,
        },
      })
    }
  }, [
    broadcast,
    defaultExportPath,
    defaultMemberName,
    defaultPackageName,
    defaultPackageScope,
    defaultReleaseVersion,
    packageName,
  ])

  // Set the default release version if none is set
  useEffect(() => {
    if (!releaseVersion && defaultReleaseVersion) {
      broadcast({
        type: 'workshop/tsdoc/updateParams',
        params: {
          releaseVersion: defaultReleaseVersion,
          exportPath: defaultExportPath,
          memberName: defaultMemberName,
        },
      })
    }
  }, [broadcast, defaultExportPath, defaultMemberName, defaultReleaseVersion, releaseVersion])

  // Set the default export path if none is set
  useEffect(() => {
    if (!exportPath && defaultExportPath) {
      broadcast({
        type: 'workshop/tsdoc/updateParams',
        params: {
          exportPath: defaultExportPath,
          memberName: defaultMemberName,
        },
      })
    }
  }, [broadcast, defaultExportPath, defaultMemberName, exportPath])

  // Set the default member name if none is set
  useEffect(() => {
    if (!memberName && defaultMemberName) {
      broadcast({
        type: 'workshop/tsdoc/updateParams',
        params: {
          memberName: defaultMemberName,
        },
      })
    }
  }, [broadcast, defaultMemberName, memberName])

  useEffect(() => {
    return channel.subscribe((msg) => {
      if (msg.type === 'workshop/tsdoc/updateParams') {
        updateParams((p) => ({...p, ...msg.params}))
      }
    })
  }, [channel, updateParams])

  return null
}
