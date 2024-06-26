import type {IConfigFile, IExtractorMessagesConfig} from '@microsoft/api-extractor'
import path from 'path'

import {DEFAULT_MESSAGES_CONFIG} from './defaults'

export function createApiExtractorConfig(opts: {
  mainEntryPointFilePath: string
  messagesConfig: IExtractorMessagesConfig
  packagePath: string
  tempDirPath: string
  tsconfigPath: string
  bundledPackages: string[]
}): IConfigFile {
  /**
   * Config file for API Extractor.  For more info, please visit: https://api-extractor.com
   */
  return {
    /**
     * Optionally specifies another JSON config file that this file extends from.  This provides a way for
     * standard settings to be shared across multiple projects.
     *
     * If the path starts with "./" or "../", the path is resolved relative to the folder of the file that contains
     * the "extends" field.  Otherwise, the first path segment is interpreted as an NPM package name, and will be
     * resolved using NodeJS require().
     *
     * SUPPORTED TOKENS: none
     * DEFAULT VALUE: ""
     */
    // "extends": "./shared/api-extractor-base.json"
    // "extends": "my-package/include/api-extractor-base.json"

    /**
     * Determines the "<projectFolder>" token that can be used with other config file settings.  The project folder
     * typically contains the tsconfig.json and package.json config files, but the path is user-defined.
     *
     * The path is resolved relative to the folder of the config file that contains the setting.
     *
     * The default value for "projectFolder" is the token "<lookup>", which means the folder is determined by traversing
     * parent folders, starting from the folder containing api-extractor.json, and stopping at the first folder
     * that contains a tsconfig.json file.  If a tsconfig.json file cannot be found in this way, then an error
     * will be reported.
     *
     * SUPPORTED TOKENS: <lookup>
     * DEFAULT VALUE: "<lookup>"
     */
    projectFolder: opts.packagePath,

    /**
     * (REQUIRED) Specifies the .d.ts file to be used as the starting point for analysis.  API Extractor
     * analyzes the symbols exported by this module.
     *
     * The file extension must be ".d.ts" and not ".ts".
     *
     * The path is resolved relative to the folder of the config file that contains the setting; to change this,
     * prepend a folder token such as "<projectFolder>".
     *
     * SUPPORTED TOKENS: <projectFolder>, <packageName>, <unscopedPackageName>
     */
    mainEntryPointFilePath: path.resolve(opts.packagePath, opts.mainEntryPointFilePath),

    /**
     * A list of NPM package names whose exports should be treated as part of this package.
     *
     * For example, suppose that Webpack is used to generate a distributed bundle for the project "library1",
     * and another NPM package "library2" is embedded in this bundle.  Some types from library2 may become part
     * of the exported API for library1, but by default API Extractor would generate a .d.ts rollup that explicitly
     * imports library2.  To avoid this, we can specify:
     *
     *   "bundledPackages": [ "library2" ],
     *
     * This would direct API Extractor to embed those types directly in the .d.ts rollup, as if they had been
     * local files for library1.
     */
    bundledPackages: opts.bundledPackages,

    /**
     * Determines how the TypeScript compiler engine will be invoked by API Extractor.
     */
    compiler: {
      /**
       * Specifies the path to the tsconfig.json file to be used by API Extractor when analyzing the project.
       *
       * The path is resolved relative to the folder of the config file that contains the setting; to change this,
       * prepend a folder token such as "<projectFolder>".
       *
       * Note: This setting will be ignored if "overrideTsconfig" is used.
       *
       * SUPPORTED TOKENS: <projectFolder>, <packageName>, <unscopedPackageName>
       * DEFAULT VALUE: "<projectFolder>/tsconfig.json"
       */
      // tsconfigFilePath: path.resolve(opts.packagePath, opts.tsconfigPath || 'tsconfig.json'),
      tsconfigFilePath: `<projectFolder>/${opts.tsconfigPath}`,

      /**
       * Provides a compiler configuration that will be used instead of reading the tsconfig.json file from disk.
       * The object must conform to the TypeScript tsconfig schema:
       *
       * http://json.schemastore.org/tsconfig
       *
       * If omitted, then the tsconfig.json file will be read from the "projectFolder".
       *
       * DEFAULT VALUE: no overrideTsconfig section
       */
      // overrideTsconfig: {
      //   // . . .
      // },

      /**
       * This option causes the compiler to be invoked with the --skipLibCheck option. This option is not recommended
       * and may cause API Extractor to produce incomplete or incorrect declarations, but it may be required when
       * dependencies contain declarations that are incompatible with the TypeScript engine that API Extractor uses
       * for its analysis.  Where possible, the underlying issue should be fixed rather than relying on skipLibCheck.
       *
       * DEFAULT VALUE: false
       */
      // "skipLibCheck": true,
    },

    /**
     * Configures how the API report file (*.api.md) will be generated.
     */
    apiReport: {
      /**
       * (REQUIRED) Whether to generate an API report.
       */
      enabled: false,

      /**
       * The filename for the API report files.  It will be combined with "reportFolder" or "reportTempFolder" to produce
       * a full file path.
       *
       * The file extension should be ".api.md", and the string should not contain a path separator such as "\" or "/".
       *
       * SUPPORTED TOKENS: <packageName>, <unscopedPackageName>
       * DEFAULT VALUE: "<unscopedPackageName>.api.md"
       */
      reportFileName: '<unscopedPackageName>.api.md',

      /**
       * Specifies the folder where the API report file is written.  The file name portion is determined by
       * the "reportFileName" setting.
       *
       * The API report file is normally tracked by Git.  Changes to it can be used to trigger a branch policy,
       * e.g. for an API review.
       *
       * The path is resolved relative to the folder of the config file that contains the setting; to change this,
       * prepend a folder token such as "<projectFolder>".
       *
       * SUPPORTED TOKENS: <projectFolder>, <packageName>, <unscopedPackageName>
       * DEFAULT VALUE: "<projectFolder>/etc/"
       */
      // "reportFolder": "<projectFolder>/etc/",

      /**
       * Specifies the folder where the temporary report file is written.  The file name portion is determined by
       * the "reportFileName" setting.
       *
       * After the temporary file is written to disk, it is compared with the file in the "reportFolder".
       * If they are different, a production build will fail.
       *
       * The path is resolved relative to the folder of the config file that contains the setting; to change this,
       * prepend a folder token such as "<projectFolder>".
       *
       * SUPPORTED TOKENS: <projectFolder>, <packageName>, <unscopedPackageName>
       * DEFAULT VALUE: "<projectFolder>/temp/"
       */
      // "reportTempFolder": "<projectFolder>/temp/"
    },

    /**
     * Configures how the doc model file (*.api.json) will be generated.
     */
    docModel: {
      /**
       * (REQUIRED) Whether to generate a doc model file.
       */
      enabled: true,

      /**
       * The output path for the doc model file.  The file extension should be ".api.json".
       *
       * The path is resolved relative to the folder of the config file that contains the setting; to change this,
       * prepend a folder token such as "<projectFolder>".
       *
       * SUPPORTED TOKENS: <projectFolder>, <packageName>, <unscopedPackageName>
       * DEFAULT VALUE: "<projectFolder>/temp/<unscopedPackageName>.api.json"
       */
      apiJsonFilePath: path.resolve(opts.tempDirPath, 'api.json'),
    },

    /**
     * Configures how the .d.ts rollup file will be generated.
     */
    dtsRollup: {
      /**
       * (REQUIRED) Whether to generate the .d.ts rollup file.
       */
      enabled: false,

      /**
       * Specifies the output path for a .d.ts rollup file to be generated without any trimming.
       * This file will include all declarations that are exported by the main entry point.
       *
       * If the path is an empty string, then this file will not be written.
       *
       * The path is resolved relative to the folder of the config file that contains the setting; to change this,
       * prepend a folder token such as "<projectFolder>".
       *
       * SUPPORTED TOKENS: <projectFolder>, <packageName>, <unscopedPackageName>
       * DEFAULT VALUE: "<projectFolder>/dist/<unscopedPackageName>.d.ts"
       */
      // untrimmedFilePath: '<projectFolder>/dist/es/<unscopedPackageName>.d.ts',

      /**
       * Specifies the output path for a .d.ts rollup file to be generated with trimming for a "beta" release.
       * This file will include only declarations that are marked as "@public" or "@beta".
       *
       * The path is resolved relative to the folder of the config file that contains the setting; to change this,
       * prepend a folder token such as "<projectFolder>".
       *
       * SUPPORTED TOKENS: <projectFolder>, <packageName>, <unscopedPackageName>
       * DEFAULT VALUE: ""
       */
      // betaTrimmedFilePath: '<projectFolder>/dist/es/<unscopedPackageName>-beta.d.ts',

      /**
       * Specifies the output path for a .d.ts rollup file to be generated with trimming for a "public" release.
       * This file will include only declarations that are marked as "@public".
       *
       * If the path is an empty string, then this file will not be written.
       *
       * The path is resolved relative to the folder of the config file that contains the setting; to change this,
       * prepend a folder token such as "<projectFolder>".
       *
       * SUPPORTED TOKENS: <projectFolder>, <packageName>, <unscopedPackageName>
       * DEFAULT VALUE: ""
       */
      // publicTrimmedFilePath: '<projectFolder>/dist/es/<unscopedPackageName>-public.d.ts',

      /**
       * When a declaration is trimmed, by default it will be replaced by a code comment such as
       * "Excluded from this release type: exampleMember".  Set "omitTrimmingComments" to true to remove the
       * declaration completely.
       *
       * DEFAULT VALUE: false
       */
      // "omitTrimmingComments": true
    },

    /**
     * Configures how the tsdoc-metadata.json file will be generated.
     */
    tsdocMetadata: {
      /**
       * Whether to generate the tsdoc-metadata.json file.
       *
       * DEFAULT VALUE: true
       */
      enabled: false,
      /**
       * Specifies where the TSDoc metadata file should be written.
       *
       * The path is resolved relative to the folder of the config file that contains the setting; to change this,
       * prepend a folder token such as "<projectFolder>".
       *
       * The default value is "<lookup>", which causes the path to be automatically inferred from the "tsdocMetadata",
       * "typings" or "main" fields of the project's package.json.  If none of these fields are set, the lookup
       * falls back to "tsdoc-metadata.json" in the package folder.
       *
       * SUPPORTED TOKENS: <projectFolder>, <packageName>, <unscopedPackageName>
       * DEFAULT VALUE: "<lookup>"
       */
      // tsdocMetadataFilePath: '<projectFolder>/dist/es/tsdoc-metadata.json',
    },

    /**
     * Specifies what type of newlines API Extractor should use when writing output files.  By default, the output files
     * will be written with Windows-style newlines.  To use POSIX-style newlines, specify "lf" instead.
     * To use the OS's default newline kind, specify "os".
     *
     * DEFAULT VALUE: "crlf"
     */
    // "newlineKind": "crlf",

    /**
     * Configures how API Extractor reports error and warning messages produced during analysis.
     *
     * There are three sources of messages:  compiler messages, API Extractor messages, and TSDoc messages.
     */
    messages: opts.messagesConfig || DEFAULT_MESSAGES_CONFIG,
  }
}
