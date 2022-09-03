import fs from 'fs'
import util from 'util'

export const readFile = util.promisify(fs.readFile)

export async function readJSONFile(filePath: string): Promise<Record<string, any>> {
  const buf = await readFile(filePath)

  return JSON.parse(buf.toString())
}
