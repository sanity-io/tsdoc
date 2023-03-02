import path from 'path'
import {fileURLToPath} from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const config = {
  experimental: {
    appDir: false,
  },
  reactStrictMode: true,
  typescript: {
    tsconfigPath: 'tsconfig.next.json',
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      react: path.resolve(__dirname, '../node_modules', 'react'),
      'react-dom': path.resolve(__dirname, '../node_modules', 'react-dom'),
    }

    return config
  },
}

export default config
