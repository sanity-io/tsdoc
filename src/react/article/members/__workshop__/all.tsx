import {APIMember, APIPackage, APIRelease} from '@sanity/tsdoc'
import {Box, Container} from '@sanity/ui'
import {ReactElement} from 'react'
import {APIMemberWithInheritance} from '../_types'
import {Members} from '../Members'

const release: APIRelease = {
  _type: 'api.release',
  version: '1.0.0',
  exports: [],
  package: undefined as any,
  memberNames: [],
}

const pkg: APIPackage = {
  _type: 'api.package',
  name: 'test',
  latestRelease: release,
  releases: [],
}

release.package = pkg

const member: APIMember = {
  _type: 'api.interface',
  export: {
    _type: 'api.export',
    members: [],
    name: 'test',
    package: pkg,
    path: '.',
    release,
  },
  extends: [],
  members: [],
  name: 'Test',
  package: pkg,
  release,
  slug: {_type: 'slug', current: 'test'},
  typeParameters: [],
}

const members: APIMemberWithInheritance[] = [
  {
    _key: 'api.callSignature',
    _type: 'api.callSignature',
    // comment?: TSDocComment
    // members: [],
    parameters: [
      {
        _key: 'foo',
        _type: 'api.parameter',
        name: 'foo',
        type: [
          {
            _key: 'string',
            _type: 'api.token',
            text: 'string',
          },
        ],
      },
    ],
    returnType: [
      {
        _key: 'string',
        _type: 'api.token',
        text: 'string',
      },
    ],
    typeParameters: [],
    // releaseTag?: APIReleaseTag
  },
  {
    _key: 'api.constructor',
    _type: 'api.constructor',
    // comment?: TSDocComment
    parameters: [
      {
        _key: 'foo',
        _type: 'api.parameter',
        name: 'foo',
        type: [
          {
            _key: 'string',
            _type: 'api.token',
            text: 'string',
          },
        ],
      },
    ],
    // releaseTag?: APIReleaseTag
  },
  {
    _key: 'api.method',
    _type: 'api.method',
    // comment?: TSDocComment
    isOptional: false,
    isStatic: false,
    name: 'test',
    parameters: [
      {
        _key: 'foo',
        _type: 'api.parameter',
        name: 'foo',
        type: [
          {
            _key: 'string',
            _type: 'api.token',
            text: 'string',
          },
        ],
      },
    ],
    returnType: [],
    typeParameters: [],
  },
  {
    _key: 'api.property',
    _type: 'api.property',
    name: 'test',
    isEventProperty: false,
    isOptional: false,
    isStatic: false,
    type: [],
  },
]

export default function AllStory(): ReactElement {
  return (
    <Container width={1}>
      <Box padding={4}>
        <Members data={members} member={member} />
      </Box>
    </Container>
  )
}
