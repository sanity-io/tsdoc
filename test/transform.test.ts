import {
  APIExportDocument,
  APIPackageDocument,
  APIVariable,
  Sanity,
  Serialized,
  _printExtractMessages,
  extract,
  transform,
} from '../src/tsdoc'
import {_spawnProject} from './env'

describe('transform', () => {
  jest.setTimeout(10000)

  test('should result in a "api.release" document', async () => {
    const project = await _spawnProject('mylib/1.0.0')

    const result = await extract(project.cwd, {
      customTags: [{name: 'sampleCustomBlockTag', syntaxKind: 'block', allowMultiple: true}],
    })

    project.remove()

    const docs = transform(result, {package: {version: '1.0.0'}})

    expect(docs).toMatchSnapshot()
  })

  test('should result in "api.symbol" documents', async () => {
    const project = await _spawnProject('mylib/1.0.0')

    const result = await extract(project.cwd, {
      customTags: [{name: 'sampleCustomBlockTag', syntaxKind: 'block', allowMultiple: true}],
    })

    project.remove()

    const docs = transform(result, {package: {version: '1.0.0'}})
    const symbolDocs = docs.filter((d) => d._type === 'api.symbol')

    expect(symbolDocs.length).toBe(7)
  })

  test('should transform class', async () => {
    const project = await _spawnProject('mylib/1.0.0')

    const result = await extract(project.cwd, {
      customTags: [{name: 'sampleCustomBlockTag', syntaxKind: 'block', allowMultiple: true}],
    })

    project.remove()

    const docs = transform(result, {package: {version: '1.0.0'}})
    const classDoc = docs.find((d) => d._type === 'api.class')

    expect(classDoc).toMatchSnapshot()
  })

  test('should transform interface with call signature', async () => {
    const project = await _spawnProject('mylib/1.0.0')

    const result = await extract(project.cwd, {
      customTags: [{name: 'sampleCustomBlockTag', syntaxKind: 'block', allowMultiple: true}],
    })

    project.remove()

    const docs = transform(result, {package: {version: '1.0.0'}})
    const interfaceDoc = docs.find((d) => d._type === 'api.interface' && d.name === 'Resolver')

    expect(interfaceDoc).toMatchSnapshot()
  })

  test.only('should transform multiple exports', async () => {
    const project = await _spawnProject('multi-export/1.0.0')

    await project.install()
    await project.run('build')

    const results = await extract(project.cwd, {
      customTags: [{name: 'sampleCustomBlockTag', syntaxKind: 'block', allowMultiple: true}],
      tsconfigPath: 'tsconfig.lib.json',
    })

    for (const result of results) {
      _printExtractMessages(project.cwd, result.messages)
    }

    project.remove()

    const docs = transform(results, {package: {version: '1.0.0'}})

    // Assert package document
    const pkg = docs.find((d) => d._type === 'api.package') as unknown as APIPackageDocument

    expect(pkg.name).toBe('multi-export')

    const exports = docs.filter((d) => d._type === 'api.export') as unknown as APIExportDocument[]
    const variables = docs.filter((d) => d._type === 'api.variable') as unknown as (APIVariable & {
      export: Sanity.ReferenceValue
    })[]

    // Assert export documents
    const exportPaths = exports.map((exp) => exp.path)

    expect(exportPaths).toEqual(['.', 'extra'])

    // Assert member documents
    // const members = docs.filter((d) =>
    //   ['api.variable'].includes(d._type)
    // ) as unknown as SerializedAPIMember[]

    const memberExports = variables.map((sym) => sym.export)

    expect(memberExports).toEqual([
      {_type: 'reference', _ref: 'multi-export_1-0-0__main'},
      {_type: 'reference', _ref: 'multi-export_1-0-0_extra'},
    ])

    console.log(variables.find((d) => d.name === 'extra'))

    // expect(variables.find((d) => d.name === 'extra')?.type)
  })

  test('should transform package with namespace exports', async () => {
    const project = await _spawnProject('namespaces/1.0.0')

    const results = await extract(project.cwd)

    project.remove()

    const docs = transform(results, {package: {version: '1.0.0'}})

    const doc = docs.find(
      (d) => d._type === 'api.namespace' && d.name === 'Schema'
    ) as Serialized.APINamespace

    expect(doc.members.length).toBe(5)
  })
})
