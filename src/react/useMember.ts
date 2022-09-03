import {APIMember} from '@sanity/tsdoc'
import groq from 'groq'
import {useEffect, useState} from 'react'
import {API_MEMBER_TYPES} from './_constants'
import {TSDocAppParams} from './types'

const API_TOKEN_MEMBER_PROJECTION = groq`
...,
export->{name, path},
package->{name, scope},
release->{version}
`

const API_CLASS_PROJECTION = groq`
_id,
_type,
_updatedAt,
comment,
export->{name,path},
members[]{
  _type == 'api.constructor' => {
    _key,
    _type,
    comment,
    parameters[]{
      _key,
      _type,
      name,
      releaseTag,
      type[]{
        ...,
        member->{${API_TOKEN_MEMBER_PROJECTION}}
      }
    },
    releaseTag
  },
  _type == 'api.method' => {
    _key,
    _type,
    comment,
    name,
    isOptional,
    isStatic,
    parameters[]{
      _key,
      _type,
      name,
      releaseTag,
      type[]{
        ...,
        member->{${API_TOKEN_MEMBER_PROJECTION}}
      }
    },
    releaseTag,
    returnType[]{
      ...,
      member->{${API_TOKEN_MEMBER_PROJECTION}}
    },
    typeParameters
  },
  _type == 'api.property' => {
    _key,
    _type,
    comment,
    name,
    isEventProperty,
    isOptional,
    isStatic,
    releaseTag,
    type[]{
      ...,
      member->{${API_TOKEN_MEMBER_PROJECTION}}
    }
  }
},
name,
package->{scope,name},
release->{version},
releaseTag
`

// TODO
const API_ENUM_PROJECTION = groq`
...,
export->{name,path},
package->{scope,name},
release->{version}
`

const API_INTERFACE_PROJECTION = groq`
_id,
_type,
_updatedAt,
comment,
export->{name,path},
extends,
members[]{
  _type == 'api.callSignature' => {
    _key,
    _type,
    comment,
    parameters[]{
      _key,
      _type,
      name,
      releaseTag,
      type[]{
        ...,
        member->{${API_TOKEN_MEMBER_PROJECTION}}
      }
    },
    releaseTag,
    returnType[]{
      ...,
      member->{${API_TOKEN_MEMBER_PROJECTION}}
    },
    typeParameters
  },

  _type == 'api.methodSignature' => {
    _key,
    _type,
    comment,
    isOptional,
    name,
    parameters[]{
      _key,
      _type,
      name,
      releaseTag,
      type[]{
        ...,
        member->{${API_TOKEN_MEMBER_PROJECTION}}
      }
    },
    releaseTag,
    returnType[]{
      ...,
      member->{${API_TOKEN_MEMBER_PROJECTION}}
    },
    typeParameters
  },

  _type == 'api.indexSignature' => {
    _key,
    _type,
    comment,
    releaseTag,
    parameters[]{
      _key,
      _type,
      name,
      releaseTag,
      type[]{
        ...,
        member->{${API_TOKEN_MEMBER_PROJECTION}}
      }
    },
    returnType[]{
      ...,
      member->{${API_TOKEN_MEMBER_PROJECTION}}
    }
  },

  _type == 'api.propertySignature' => {
    _key,
    _type,
    comment,
    isOptional,
    name,
    releaseTag,
    comment,
    type[]{
      ...,
      member->{${API_TOKEN_MEMBER_PROJECTION}}
    }
  }
},
name,
package->{scope,name},
'referrers': *[references(^._id)] {
  _type,
  name,
  export->{path},
  package->{scope,name},
  release->{version}
},
release->{version},
releaseTag,
slug,
typeParameters
`

const API_FUNCTION_PROJECTION = groq`
_id,
_type,
_updatedAt,
comment,
export->{name,path},
isReactComponentType,
name,
package->{scope,name},
parameters[]{
  _key,
  _type,
  name,
  releaseTag,
  type[]{
    ...,
    member->{${API_TOKEN_MEMBER_PROJECTION}}
  }
},
propsType->{
  _type == 'api.interface' => {
    ${API_INTERFACE_PROJECTION}
  }
},
'referrers': *[references(^._id)] {
  _type,
  name,
  export->{path},
  package->{scope,name},
  release->{version}
},
release->{version},
releaseTag,
returnType[]{
  ...,
  member->{${API_TOKEN_MEMBER_PROJECTION}}
},
typeParameters
`

const API_NAMESPACE_PROJECTION = groq`
_id,
_type,
_updatedAt,
comment,
export->{name,path},
members[]{
  ...
},
name,
package->{scope,name},
release->{version},
releaseTag
`

const API_TYPE_ALIAS_PROJECTION = groq`
_id,
_type,
_updatedAt,
comment,
export->{name,path},
name,
package->{scope,name},
release->{version},
releaseTag,
type[]{
  ...,
  member->{${API_TOKEN_MEMBER_PROJECTION}}
}
`

const API_VARIABLE_PROJECTION = groq`
_id,
_type,
comment,
export->{name,path},
isReactComponentType,
name,
package->{scope,name},
propsType->,
release->{version},
releaseTag,
'referrers': *[references(^._id)] {
  _type,
  name,
  export->{path},
  package->{scope,name},
  release->{version}
},
type[]{
  ...,
  member->{${API_TOKEN_MEMBER_PROJECTION}}
}
`

export const API_SYMBOL_PROJECTION = groq`
_type == 'api.class' => {
  ${API_CLASS_PROJECTION}
},

_type == 'api.enum' => {
  ${API_ENUM_PROJECTION}
},

_type == 'api.function' => {
  ${API_FUNCTION_PROJECTION}
},

_type == 'api.interface' => {
  ${API_INTERFACE_PROJECTION}
},

_type == 'api.namespace' => {
  ${API_NAMESPACE_PROJECTION}
},

_type == 'api.typeAlias' => {
  ${API_TYPE_ALIAS_PROJECTION}
},

_type == 'api.variable' => {
  ${API_VARIABLE_PROJECTION}
}
`

const MEMBER_QUERY = groq`
  *[
    _type in $memberTypes
    && export->path == $exportPath
    && package->scope == $packageScope
    && package->name == $packageName
    && release->version == $releaseVersion
    && name == $memberName
  ]{
    ${API_SYMBOL_PROJECTION}
  }[0]
`

export function useMember(props: {
  query: (q: string, params: Record<string, unknown>) => Promise<unknown>
  params: TSDocAppParams | null
}): {data: APIMember | null; error: Error | null} {
  const {params, query} = props

  const [data, setData] = useState<APIMember | null>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!params) {
      return
    }

    async function run() {
      setData(
        (await query(MEMBER_QUERY, {
          ...params,
          memberTypes: API_MEMBER_TYPES,
        })) as APIMember | null
      )
    }

    run().catch(setError)
  }, [query, params])

  return {data, error}
}
