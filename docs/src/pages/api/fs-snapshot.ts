import {readFile} from 'fs/promises'
import path from 'path'
import {NextApiHandler} from 'next'

const handler: NextApiHandler = async function preview(_req, res) {
  const etcPath = process.env['TSDOC_ETC_PATH']

  if (!etcPath) {
    res.status(500)
    res.json({message: 'missing TSDOC_ETC_PATH env var'})

    return
  }

  const buf = await readFile(
    path.resolve(process.cwd(), etcPath, '@sanity/tsdoc/1.0.0-alpha.8.json')
  )

  res.send(buf)
}

export default handler
