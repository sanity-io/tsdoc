/** @type {import('next').NextConfig} */
const config = {
  experimental: {
    appDir: false,
  },
  reactStrictMode: true,
  typescript: {
    tsconfigPath: 'tsconfig.next.json',
  },
}

export default config
