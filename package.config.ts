import {defineConfig} from '@sanity/pkg-utils'

export default defineConfig({
  bundles: [
    {
      source: './src/cli/index.ts',
      require: './dist/cli.js',
      runtime: 'node',
    },
  ],

  dist: './dist',

  extract: {
    customTags: [
      {
        name: 'template',
        syntaxKind: 'block',
        allowMultiple: true,
      },
    ],
    rules: {
      'ae-incompatible-release-tags': 'error',
      'ae-internal-missing-underscore': 'off',
      'ae-missing-release-tag': 'error',
    },
  },

  tsconfig: 'tsconfig.dist.json',
  babel: {reactCompiler: true},
  reactCompilerOptions: {target: '19'},
})
