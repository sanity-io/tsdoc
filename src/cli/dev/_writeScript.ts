import {writeFile} from 'fs/promises'
import path from 'path'

const SCRIPT = `import {mount} from '@sanity/tsdoc/react'

mount({
  docs: window.__INITIAL_STATE__ ? window.__INITIAL_STATE__.docs : undefined,
  element: document.getElementById('root'),
})
`

export async function _writeScript(options: {outDir: string}): Promise<void> {
  await writeFile(path.resolve(options.outDir, 'main.tsx'), SCRIPT)
}
