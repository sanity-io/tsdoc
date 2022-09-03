import {SanityDocumentValue} from '../_lib/sanity'
import {
  SerializedAPIExport,
  SerializedAPIMember,
  SerializedAPIPackage,
  SerializedAPIRelease,
  SerializedAPISymbol,
} from './serialized'

/** @public */
export type APIMemberDocument = SanityDocumentValue<SerializedAPIMember>

/** @public */
export type APIPackageDocument = SanityDocumentValue<SerializedAPIPackage>

/** @public */
export type APIReleaseDocument = SanityDocumentValue<SerializedAPIRelease>

/** @public */
export type APIExportDocument = SanityDocumentValue<SerializedAPIExport>

/** @public */
export type APISymbolDocument = SanityDocumentValue<SerializedAPISymbol>

/** @public */
export type APIDocument =
  | APIMemberDocument
  | APIPackageDocument
  | APIReleaseDocument
  | APIExportDocument
  | APISymbolDocument
