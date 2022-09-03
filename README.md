# @sanity/tsdoc

- 📚 Extract TSDoc and API reference from a TypeScript package
- 📦 Store as neatly structured content in your Sanity backend
- 💅 Render API reference using React components

## Installation

```sh
npm i @sanity/tsdoc
```

## Using the CLI

```sh
# Extract API reference to etc/<name>/<version>.json using the `etl` command
sanity-tsdoc etl
```

## Using the Node.js API

```ts
import {extract, transform, load} from '@sanity/tsdoc'

// Extract API information
// `packagePath` is a path to a directory containing a `package.json` file
const result = await extract({
  packagePath: __dirname,
  tsconfig: 'tsconfig.dist.json',
})

// Transform the result of `extract` (`@microsoft/api-extractor`) to sanity-formatted documents
const docs = transform(result, {
  package: {
    scope: null,
    name: 'mylib',
    version: '1.0.0',
  },
})

// Write file containing sanity-formatted documents
await load(docs, {
  fs: {
    path: path.resolve(__dirname, 'etc/1.0.0.json'),
  },
})
```
