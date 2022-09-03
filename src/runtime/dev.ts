import {readFile} from 'fs/promises'
import path from 'path'
import react from '@vitejs/plugin-react'
import {createServer} from 'vite'

export async function devRuntime(options: {
  cwd: string
  dataPath: string
  port?: number
}): Promise<void> {
  const {cwd, dataPath, port = 1337} = options

  // TODO: write files to `.tsdoc`

  const dataBuf = await readFile(path.resolve(cwd, dataPath))

  const server = await createServer({
    configFile: false,
    define: {
      __DB__: JSON.stringify(dataBuf.toString()),
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@sanity/tsdoc/react': path.resolve(__dirname, '../react.ts'),
        '@sanity/tsdoc': path.resolve(__dirname, '../tsdoc.ts'),
      },
    },
    root: path.resolve(cwd, '.tsdoc'),
    server: {
      port,
    },
  })

  await server.listen()

  server.printUrls()
}
