import {readFile, writeFile} from 'fs/promises'
import path from 'path'
import {APIDocument, APIPackageDocument, APISymbolDocument} from '@sanity/tsdoc'
import react from '@vitejs/plugin-react'
import globby from 'globby'
import mkdirp from 'mkdirp'
import {createServer, defineConfig} from 'vite'
import {_writeHTML} from './_writeHTML'
import {_writeScript} from './_writeScript'

async function _loadDocs(files: string[]) {
  const docs: APIDocument[] = []

  for (const f of files) {
    const buf = await readFile(f)

    docs.push(...JSON.parse(buf.toString()))
  }

  const _packageDocs = docs.filter((d) => d._type === 'api.package') as APIPackageDocument[]
  const _symbolDocs = docs.filter((d) => d._type === 'api.symbol') as APISymbolDocument[]

  const packageDocs: APIPackageDocument[] = []
  const symbolDocs: APISymbolDocument[] = []

  for (const _pkgDoc of _packageDocs) {
    const pkg = packageDocs.find((p) => p.scope === _pkgDoc.scope && p.name === _pkgDoc.name)

    if (pkg) {
      if (_pkgDoc.latestRelease) {
        pkg.latestRelease = _pkgDoc.latestRelease
        pkg.releases.push({
          ..._pkgDoc.latestRelease,
          _key: _pkgDoc.latestRelease._ref,
        })
      }
    } else {
      packageDocs.push({
        ..._pkgDoc,
        releases: [..._pkgDoc.releases],
      })
    }
  }

  for (const _symbolDoc of _symbolDocs) {
    const symbol = symbolDocs.find((s) => s._id === _symbolDoc._id)

    if (!symbol) {
      symbolDocs.push(_symbolDoc)
    }
  }

  const uniqueDocs = docs.filter((d) => d._type !== 'api.package' && d._type !== 'api.symbol')

  return [...packageDocs, ...symbolDocs, ...uniqueDocs]
}

/** @beta */
export async function devRuntime(options: {
  cwd: string
  dataPath: string | string[]
  port?: number
}): Promise<void> {
  const {cwd, dataPath, port = 1337} = options
  const outDir = path.resolve(cwd, '.tsdoc')

  await mkdirp(outDir)

  await _writeHTML({outDir: path.resolve(cwd, '.tsdoc')})
  await _writeScript({outDir: path.resolve(cwd, '.tsdoc')})

  const files = await globby(dataPath)

  const docs = await _loadDocs(files)
  const docsPath = path.resolve(outDir, 'data.json')

  await writeFile(docsPath, JSON.stringify(docs))

  const viteConfig = defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        $docs: docsPath,
        '@sanity/tsdoc/react': path.resolve(__dirname, '../../exports/react.ts'),
        '@sanity/tsdoc': path.resolve(__dirname, '../../exports/index.ts'),
      },
    },
  })

  const server = await createServer({
    ...viteConfig,
    configFile: false,
    root: path.resolve(cwd, '.tsdoc'),
    server: {
      port,
    },
  })

  await server.listen()

  server.printUrls()
}
