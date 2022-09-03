import {writeFile} from 'fs/promises'
import path from 'path'

const SCRIPT = `import {mount} from '../src/_todo/mount'

mount()
`

export async function _writeScript(options: {outDir: string}): Promise<void> {
  await writeFile(path.resolve(options.outDir, 'main.tsx'), SCRIPT)
}
