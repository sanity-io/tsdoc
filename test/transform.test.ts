import {createRequire} from 'node:module'
import {platform} from 'node:process'

import type {
  APIExportDocument,
  APIMemberDocument,
  APIPackageDocument,
  SanityDocumentValue,
  SerializedAPIFunction,
  SerializedAPINamespace,
  SerializedAPIVariable,
} from '@sanity/tsdoc'
import {beforeAll, describe, expect, test, vi} from 'vitest'

import {type _SpawnedProject, _spawnProject} from './_spawnProject'

const require = createRequire(import.meta.url)
// @sanity/tsdoc is currently designed to be used in a CJS process
const {_printExtractMessages, extract, transform} = require('@sanity/tsdoc')

describe.skipIf(process.env['GITHUB_ACTIONS'] && platform !== 'linux')('transform', () => {
  vi.setConfig({testTimeout: 60000, hookTimeout: 60000})

  const strict = true
  let tsProject: _SpawnedProject
  let myLibProject: _SpawnedProject
  let multiExportProject: _SpawnedProject

  beforeAll(async () => {
    tsProject = await _spawnProject('ts')
    myLibProject = await _spawnProject('mylib')
    multiExportProject = await _spawnProject('multi-export')

    // Install Dependencies in Parallel
    await Promise.all([tsProject, myLibProject, multiExportProject].map((p) => p.install()))

    // Build in Parallel
    await Promise.all([tsProject, myLibProject, multiExportProject].map((p) => p.run('build')))
  })

  test('should result in a "api.release" document', async () => {
    const {pkg, results} = await extract({
      customTags: [{name: 'sampleCustomBlockTag', syntaxKind: 'block', allowMultiple: true}],
      packagePath: myLibProject.cwd,
      strict,
    })

    const docs = transform(results, {package: {version: pkg.version}})

    expect(docs).toMatchSnapshot()
  })

  test('should result in "api.symbol" documents', async () => {
    const {pkg, results} = await extract({
      customTags: [{name: 'sampleCustomBlockTag', syntaxKind: 'block', allowMultiple: true}],
      packagePath: myLibProject.cwd,
      strict,
    })

    const docs = transform(results, {package: {version: pkg.version}})
    const symbolDocs = docs.filter((d: any) => d._type === 'api.symbol')

    expect(symbolDocs.length).toBe(11)
  })

  test('should transform class', async () => {
    const {pkg, results} = await extract({
      customTags: [{name: 'sampleCustomBlockTag', syntaxKind: 'block', allowMultiple: true}],
      packagePath: myLibProject.cwd,
      strict,
    })

    const docs = transform(results, {package: {version: pkg.version}})
    const classDoc = docs.find((d: any) => d._type === 'api.class')

    expect(classDoc).toMatchSnapshot()
  })

  test('should mark react hooks correctly', async () => {
    const {pkg, results} = await extract({
      customTags: [{name: 'sampleCustomBlockTag', syntaxKind: 'block', allowMultiple: true}],
      packagePath: myLibProject.cwd,
      strict,
    })

    const docs = transform(results, {package: {version: pkg.version}})
    const fnDocs = docs.filter((d: any): d is APIMemberDocument => d._type === 'api.function')

    const hookDoc = fnDocs.find((d: any) => d.name === 'useAnswerToLifeTheUniverseAndEverything')
    const nonHookDoc = fnDocs.find((d: any) => d.name === 'userHasTheRightAnswer')

    if (!hookDoc) {
      throw new Error('Document for `useAnswerToLifeTheUniverseAndEverything` not found')
    }

    if (!nonHookDoc) {
      throw new Error('Document for `userHasTheRightAnswer` not found')
    }

    expect(hookDoc).toMatchObject({
      _type: 'api.function',
      isReactHook: true,
    })

    expect(nonHookDoc).toMatchObject({
      _type: 'api.function',
      isReactHook: false,
    })
  })

  test('should transform interface with call signature', async () => {
    const {pkg, results} = await extract({
      customTags: [{name: 'sampleCustomBlockTag', syntaxKind: 'block', allowMultiple: true}],
      packagePath: myLibProject.cwd,
      strict,
    })

    const docs = transform(results, {package: {version: pkg.version}})
    const interfaceDoc = docs.find((d: any) => d._type === 'api.interface' && d.name === 'Resolver')

    expect(interfaceDoc).toMatchSnapshot()
  })

  test('should transform multiple exports', async () => {
    const {pkg: _pkg, results} = await extract({
      customTags: [{name: 'sampleCustomBlockTag', syntaxKind: 'block', allowMultiple: true}],
      packagePath: multiExportProject.cwd,
      tsconfig: 'tsconfig.dist.json',
      strict,
    })

    for (const result of results) {
      _printExtractMessages(multiExportProject.cwd, result.messages)
    }

    const docs = transform(results, {package: {version: _pkg.version}})

    // Assert package document
    const pkg = docs.find((d: any) => d._type === 'api.package') as unknown as APIPackageDocument

    expect(pkg.name).toBe('multi-export')

    const exports = docs.filter((d: any) => d._type === 'api.export') as APIExportDocument[]
    const variables = docs.filter(
      (d: any) => d._type === 'api.variable',
    ) as SanityDocumentValue<SerializedAPIVariable>[]

    // Assert export documents
    const exportPaths = exports.map((exp) => exp.path)

    expect(exportPaths).toEqual(['.', './extra'])

    const memberExports = variables.map((sym) => sym.export)

    expect(memberExports).toEqual([
      {_type: 'reference', _ref: 'tsdoc-multi-export_1-0-0__main'},
      {_type: 'reference', _ref: 'tsdoc-multi-export_1-0-0_extra'},
    ])
  })

  test('should transform package with namespace exports', async () => {
    const {pkg, results} = await extract({packagePath: tsProject.cwd, strict})

    const docs = transform(results, {package: {version: pkg.version}})

    const doc = docs.find(
      (d: any) => d._type === 'api.namespace' && d.name === 'Schema',
    ) as SerializedAPINamespace

    expect(doc.members.length).toBe(5)
  })

  test('should transform function parameters', async () => {
    const {pkg, results} = await extract({
      packagePath: tsProject.cwd,
      strict,
    })

    const docs = transform(results, {package: {version: pkg.version}})

    const docLinkWithoutName = docs.find(
      (d: any) => d._type === 'api.function' && d.name === 'testFunctionLink',
    )
    const docLinkWithName = docs.find(
      (d: any) => d._type === 'api.function' && d.name === 'testFunctionLinkWithName',
    )

    expect((docLinkWithName as SerializedAPIFunction).parameters[0]).toMatchObject({
      _key: 'param0',
      _type: 'api.parameter',
      comment: {
        _type: 'tsdoc.docComment',
        summary: [
          {
            _key: 'node0',
            _type: 'block',
            children: [
              {
                _key: 'node0',
                _type: 'span',
                marks: [],
                text: 'Base Interface Link out ',
              },
              {
                _key: 'node1',
                _type: 'span',
                marks: ['link0'],
                text: 'Custom Text',
              },
            ],
            markDefs: [
              {
                _key: 'link0',
                _type: 'link',
                href: 'BaseInterface',
              },
            ],
            style: 'normal',
          },
        ],
      },
    })

    expect((docLinkWithoutName as SerializedAPIFunction).parameters[0]).toMatchObject({
      _key: 'param0',
      _type: 'api.parameter',
      comment: {
        _type: 'tsdoc.docComment',
        summary: [
          {
            _key: 'node0',
            _type: 'block',
            children: [
              {
                _key: 'node0',
                _type: 'span',
                marks: [],
                text: 'Base Interface Link out ',
              },
              {
                _key: 'node1',
                _type: 'span',
                marks: ['link0'],
                text: 'BaseInterface',
              },
            ],
            markDefs: [
              {
                _key: 'link0',
                _type: 'link',
                href: 'BaseInterface',
              },
            ],
            style: 'normal',
          },
        ],
      },
    })
  })

  test('should transform function overloads', async () => {
    const {pkg, results} = await extract({
      packagePath: tsProject.cwd,
      strict,
    })

    const docs = transform(results, {package: {version: pkg.version}})

    const overloadFunctions = docs.filter(
      (d: any) => d._type === 'api.function' && d.name === 'testOverload',
    )

    expect(overloadFunctions.length).toBe(3)

    expect(overloadFunctions[0]).toMatchObject({
      _type: 'api.function',
      name: 'testOverload',
      isOverloading: false,
    })

    expect(overloadFunctions[1]).toMatchObject({
      _type: 'api.function',
      name: 'testOverload',
      isOverloading: true,
    })

    expect(overloadFunctions[2]).toMatchObject({
      _type: 'api.function',
      name: 'testOverload',
      isOverloading: true,
    })
  })
})
