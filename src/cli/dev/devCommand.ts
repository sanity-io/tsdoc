/* eslint-disable no-console */

import {readFile} from 'fs/promises'
import path from 'path'
import {APIDocument, APIPackageDocument, APISymbolDocument, _loadConfig} from '@sanity/tsdoc'
import react from '@vitejs/plugin-react'
import chokidar from 'chokidar'
import cors from 'cors'
import express from 'express'
import globby from 'globby'
import mkdirp from 'mkdirp'
import {createServer as createViteServer, defineConfig} from 'vite'
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
        releases: [...(_pkgDoc.releases || [])],
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
export async function devCommand(options: {cwd: string}): Promise<void> {
  const {cwd} = options
  const config = await _loadConfig({packagePath: cwd})
  const {alias, port = 1337} = config?.app || {}
  const outDir = path.resolve(cwd, '.tsdoc')

  await mkdirp(outDir)
  await _writeHTML({outDir: path.resolve(cwd, '.tsdoc')})
  await _writeScript({outDir: path.resolve(cwd, '.tsdoc')})

  const files = await globby(config?.input?.pattern || 'etc/**/*.json', {
    cwd,
  })

  const initialDocs = await _loadDocs(files)

  const dataWatcher = chokidar.watch(config?.input?.pattern || 'etc/**/*.json', {
    cwd,
    ignoreInitial: true,
  })

  // TODO: should be typed `ExpressResponse` or similar
  const sockets: express.Response[] = []

  function send(socket: express.Response, msg: any) {
    socket.write(`data: ${JSON.stringify(msg)}\n\n`)
  }

  function broadcast(msg: any) {
    for (const socket of sockets) {
      send(socket, msg)
    }
  }

  dataWatcher.on('all', (eventType) => {
    if (eventType === 'change') {
      _loadDocs(files).then((docs) => {
        broadcast({type: 'docs', docs})
      })
    }
  })

  const viteConfig = defineConfig({
    plugins: [react()],
    resolve: {alias},
  })

  const vite = await createViteServer({
    ...viteConfig,
    appType: 'custom',
    configFile: false,
    logLevel: 'info',
    root: cwd,
    server: {
      hmr: {
        port: 15319,
      },
      middlewareMode: true,
      port,
    },
    cacheDir: 'node_modules/.tsdoc/vite',
  })

  const app = express()

  app.get('/events', cors({origin: true}), (_req, res) => {
    res.set({
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
    })

    res.flushHeaders()

    // Tell the client to retry every 10 seconds if connectivity is lost
    res.write('retry: 10000\n\n')

    sockets.push(res)

    _loadDocs(files).then((docs) => {
      send(res, {type: 'docs', docs})
    })

    _req.on('close', () => {
      const idx = sockets.indexOf(res)

      if (idx > -1) {
        sockets.splice(idx, 1)
      }
    })
  })

  app.use(vite.middlewares)

  app.get('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      const releaseVersion = initialDocs.find((d) => d._type === 'api.release')?.version

      // 1. Read index.html
      let template = await readFile(path.resolve(outDir, 'index.html'), 'utf-8')

      // 2. Apply Vite HTML transforms. This injects the Vite HMR client, and
      //    also applies HTML transforms from Vite plugins, e.g. global preambles
      //    from @vitejs/plugin-react
      template = await vite.transformIndexHtml(url, template)

      // 3. Load the server entry. vite.ssrLoadModule automatically transforms
      //    your ESM source code to be usable in Node.js! There is no bundling
      //    required, and provides efficient invalidation similar to HMR.
      // const {render} = await vite.ssrLoadModule('/src/entry-server.js')

      // 4. render the app HTML. This assumes entry-server.js's exported `render`
      //    function calls appropriate framework SSR APIs,
      //    e.g. ReactDOMServer.renderToString()
      // const appHtml = await render(url)

      // 5. Inject the app-rendered HTML into the template.
      // const html = template.replace(`<!--ssr-outlet-->`, appHtml)
      const html = template.replace(
        '<div id="root"></div>',
        [
          `<div id="root"></div><script type="module">`,
          `window.__INITIAL_STATE__=`,
          JSON.stringify({docs: initialDocs, releaseVersion}),
          `</script>`,
        ].join(''),
      )

      // 6. Send the rendered HTML back.
      res.status(200).set({'Content-Type': 'text/html'}).end(html)
    } catch (e) {
      if (e instanceof Error) {
        // If an error is caught, let Vite fix the stack trace so it maps back to
        // your actual source code.
        vite.ssrFixStacktrace(e)
      }

      next(e)
    }
  })

  const server = app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`)
  })

  server.on('close', () => {
    console.log(`server closed`)
    process.exit(1)
  })
}
