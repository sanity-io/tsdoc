import {apiExportType} from './export'
import {apiCallSignatureType} from './members/callSignature'
import {apiClassType} from './members/class'
import {apiConstructorType} from './members/constructor'
import {apiConstructSignatureType} from './members/constructSignature'
import {apiEnumType} from './members/enum'
import {apiFunctionType} from './members/function'
import {apiIndexSignatureType} from './members/indexSignature'
import {apiInterfaceType} from './members/interface'
import {apiMethodType} from './members/method'
import {apiMethodSignatureType} from './members/methodSignature'
import {apiNamespaceType} from './members/namespace'
import {apiPropertyType} from './members/property'
import {apiPropertySignatureType} from './members/propertySignature'
import {apiTypeAliasType} from './members/typeAlias'
import {apiVariableType} from './members/variable'
import {apiPackageType} from './package'
import {apiReleaseType} from './release'
import {apiParameterType} from './shared/parameter'
import {apiReleaseTagType} from './shared/releaseTag'
import {apiTokenType} from './shared/token'
import {apiTokensType} from './shared/tokens'
import {apiTypeParameterType} from './shared/typeParameter'
import {apiSymbolType} from './symbol'

export const apiTypes = [
  apiPackageType,
  apiReleaseType,
  apiExportType,
  apiSymbolType,

  // members
  apiCallSignatureType,
  apiClassType,
  apiConstructSignatureType,
  apiConstructorType,
  apiEnumType,
  apiFunctionType,
  apiIndexSignatureType,
  apiInterfaceType,
  apiMethodSignatureType,
  apiMethodType,
  apiNamespaceType,
  apiPropertySignatureType,
  apiPropertyType,
  apiTypeAliasType,
  apiVariableType,

  // shared
  apiParameterType,
  apiReleaseTagType,
  apiTokenType,
  apiTokensType,
  apiTypeParameterType,
]
