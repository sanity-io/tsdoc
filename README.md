# @sanity/tsdoc

- 📚 Extract TSDoc and API reference from a TypeScript package
- 📦 Store as neatly structured content in your Sanity backend

## Installation

```sh
npm i @sanity/tsdoc
```

## Using the CLI

```sh
# Extract API reference to etc/<version>.json using the `etl` command
tsdoc etl --outDir etc --tsconfig tsconfig.dist.json
```

## Using the Node.js API

```ts
import {extract, transform, load} from '@sanity/tsdoc'

// Path to a package with a package.json file
const packagePath = __dirname

const result = await extract('dist/dts/src/index.d.ts', {
  packagePath,
  tsconfigPath: 'tsconfig.dist.json',
})

const docs = transform(result, {package: {scope: null, name: 'mylib', version: '1.0.0'}})

await load(docs, {fs: {path: path.resolve(packagePath, 'etc/1.0.0.json')}})
```
