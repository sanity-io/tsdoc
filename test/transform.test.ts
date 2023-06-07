import {
  APIExportDocument,
  APIPackageDocument,
  _printExtractMessages,
  extract,
  transform,
  SerializedAPINamespace,
  SerializedAPIVariable,
  SanityDocumentValue,
  APIMemberDocument,
} from '@sanity/tsdoc'
import {_spawnProject} from './_spawnProject'

describe('transform', () => {
  jest.setTimeout(60000)

  test('should result in a "api.release" document', async () => {
    const project = await _spawnProject('mylib')

    await project.install()
    await project.run('build')

    const {pkg, results} = await extract({
      customTags: [{name: 'sampleCustomBlockTag', syntaxKind: 'block', allowMultiple: true}],
      packagePath: project.cwd,
    })

    const docs = transform(results, {package: {version: pkg.version}})

    expect(docs).toMatchSnapshot()
  })

  test('should result in "api.symbol" documents', async () => {
    const project = await _spawnProject('mylib')

    await project.install()
    await project.run('build')

    const {pkg, results} = await extract({
      customTags: [{name: 'sampleCustomBlockTag', syntaxKind: 'block', allowMultiple: true}],
      packagePath: project.cwd,
    })

    const docs = transform(results, {package: {version: pkg.version}})
    const symbolDocs = docs.filter((d) => d._type === 'api.symbol')

    expect(symbolDocs.length).toBe(9)
  })

  test('should transform class', async () => {
    const project = await _spawnProject('mylib')

    await project.install()
    await project.run('build')

    const {pkg, results} = await extract({
      customTags: [{name: 'sampleCustomBlockTag', syntaxKind: 'block', allowMultiple: true}],
      packagePath: project.cwd,
    })

    const docs = transform(results, {package: {version: pkg.version}})
    const classDoc = docs.find((d) => d._type === 'api.class')

    expect(classDoc).toMatchSnapshot()
  })

  test('should mark react hooks correctly', async () => {
    const project = await _spawnProject('mylib')

    await project.install()
    await project.run('build')

    const {pkg, results} = await extract({
      customTags: [{name: 'sampleCustomBlockTag', syntaxKind: 'block', allowMultiple: true}],
      packagePath: project.cwd,
    })

    const docs = transform(results, {package: {version: pkg.version}})
    const fnDocs = docs.filter((d): d is APIMemberDocument => d._type === 'api.function')

    const hookDoc = fnDocs.find((d) => d.name === 'useAnswerToLifeTheUniverseAndEverything')
    const nonHookDoc = fnDocs.find((d) => d.name === 'userHasTheRightAnswer')

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
    const project = await _spawnProject('mylib')

    await project.install()
    await project.run('build')

    const {pkg, results} = await extract({
      customTags: [{name: 'sampleCustomBlockTag', syntaxKind: 'block', allowMultiple: true}],
      packagePath: project.cwd,
    })

    const docs = transform(results, {package: {version: pkg.version}})
    const interfaceDoc = docs.find((d) => d._type === 'api.interface' && d.name === 'Resolver')

    expect(interfaceDoc).toMatchSnapshot()
  })

  test('should transform multiple exports', async () => {
    const project = await _spawnProject('multi-export')

    await project.install()
    await project.run('build')

    const {pkg: _pkg, results} = await extract({
      customTags: [{name: 'sampleCustomBlockTag', syntaxKind: 'block', allowMultiple: true}],
      packagePath: project.cwd,
      tsconfig: 'tsconfig.dist.json',
    })

    for (const result of results) {
      _printExtractMessages(project.cwd, result.messages)
    }

    const docs = transform(results, {package: {version: _pkg.version}})

    // Assert package document
    const pkg = docs.find((d) => d._type === 'api.package') as unknown as APIPackageDocument

    expect(pkg.name).toBe('multi-export')

    const exports = docs.filter((d) => d._type === 'api.export') as APIExportDocument[]
    const variables = docs.filter(
      (d) => d._type === 'api.variable'
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
    const project = await _spawnProject('ts')

    await project.install()
    await project.run('build')

    const {pkg, results} = await extract({packagePath: project.cwd})

    const docs = transform(results, {package: {version: pkg.version}})

    const doc = docs.find(
      (d) => d._type === 'api.namespace' && d.name === 'Schema'
    ) as SerializedAPINamespace

    expect(doc.members.length).toBe(5)
  })
})
