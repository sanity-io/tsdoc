import {devRuntime} from '@sanity/tsdoc/runtime'

export async function devCommand({
  cwd,
  dataPath,
  port,
}: {
  cwd: string
  dataPath: string | string[]
  port?: number
}): Promise<void> {
  await devRuntime({cwd, dataPath, port})
}
