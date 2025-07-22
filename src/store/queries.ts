/** @internal */
export const API_EXPORTS_QUERY = /* groq */ `
*[
  _type == 'api.export'
  && package->scope == $packageScope
  && package->name == $packageName
  && release->version == $releaseVersion
]{
  name,
  path,
  package->{name,scope},
  release->{version},
  'isLatest': release->_id == package->latestRelease._ref,
  'members': *[_type in $memberTypes && references(^._id) && !("@hidden" in coalesce(comment.customBlocks[].tag, [])) && !coalesce(isOverloading, false)] | order(name asc) {
    '_key': _id,
    _type,
    comment{deprecated},
    export->{name,path},
    members[]{
      _key,
      _type,
      export->{name,path},
      name,
      package->{name,scope},
      release->{version},
      releaseTag,
      isReactComponentType,
      slug,
    },
    name,
    slug,
    package->{name,scope},
    release->{version},
    releaseTag,
    isReactComponentType,
    isReactHook,
    isOverloading,
  }
} | order(name)
`

/** @internal */
const API_TOKEN_MEMBER_PROJECTION = /* groq */ `
...,
export->{name, path},
package->{name, scope},
release->{version}
`

/** @internal */
const API_CLASS_PROJECTION = /* groq */ `
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
releaseTag,
typeParameters
`

// TODO
const API_ENUM_PROJECTION = /* groq */ `
...,
export->{name,path},
package->{scope,name},
release->{version}
`

/** @internal */
const API_INTERFACE_PROJECTION = /* groq */ `
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

/** @internal */
const API_FUNCTION_PROJECTION = /* groq */ `
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
  comment,
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

/** @internal */
const API_NAMESPACE_PROJECTION = /* groq */ `
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

/** @internal */
const API_TYPE_ALIAS_PROJECTION = /* groq */ `
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
},
typeParameters
`

/** @internal */
const API_VARIABLE_PROJECTION = /* groq */ `
_id,
_type,
comment,
export->{name,path},
isReactComponentType,
name,
parameters[]{
  _key,
  _type,
  name,
  releaseTag,
  comment,
  type[]{
    ...,
    member->{${API_TOKEN_MEMBER_PROJECTION}}
  }
},
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

/** @internal */
export const API_MEMBER_PROJECTION = /* groq */ `
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

/** @internal */
export const API_MEMBER_QUERY = /* groq */ `
*[
  _type in $memberTypes
  && export->path == $exportPath
  && package->scope == $packageScope
  && package->name == $packageName
  && release->version == $releaseVersion
  && slug.current == $memberSlug
  && !("@hidden" in coalesce(comment.customBlocks[].tag, []))
]{
  ${API_MEMBER_PROJECTION},
  "members": members[!("@hidden" in coalesce(comment.customBlocks[].tag, []))],
  'versions': *[
    _type == 'api.release'
    && package->scope == $packageScope
    && package->name == $packageName
  ]{version}.version
}
`

/** @internal */

const NON_HIDDEN_MEMBER_TYPES_ARRAY = /* groq */ `*[
  _type in $memberTypes
  && name == ^.name
  && package->scope == $packageScope
  && package->name == $packageName
  && !("@hidden" in coalesce(comment.customBlocks[].tag, []))
]`

/** @internal */
export const API_SYMBOL_SEARCH_QUERY = /* groq */ `
*[
  _type == 'api.symbol'
  && name match $query
  && package->scope == $packageScope
  && package->name == $packageName
  && count(${NON_HIDDEN_MEMBER_TYPES_ARRAY}) > 0
]{
  _id,
  _type,
  name,
  package->{name,scope}
}[0...10]{
  ...,
  'members': ${NON_HIDDEN_MEMBER_TYPES_ARRAY}{
    slug,
    'exportPath': export->path,
    'releaseVersion': release->version
  }
} | order(lower(name) asc)
`

/** @internal */
export const API_PACKAGES_QUERY = /* groq */ `
*[_type == 'api.package']{
  _id,
  name,
  scope,
  latestRelease->{version},
  releases[]->{version}
}
`

/** @internal */
export const API_PACKAGE_QUERY = /* groq */ `
*[
  _type == 'api.package'
  && scope == $packageScope
  && name == $packageName
][0]
`

/** @internal */
export const API_SYMBOL_QUERY = /* groq */ `
*[
  _type == 'api.symbol'
  && package->scope == $packageScope
  && package->name == $packageName
]{
  _type,
  name,
  package->{name,scope},
  'members': *[
    _type in $memberTypes
  ]{${API_MEMBER_PROJECTION}}
}[0]
`
