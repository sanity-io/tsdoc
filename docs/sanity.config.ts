import {codeInput} from '@sanity/code-input'
import {tsdoc} from '@sanity/tsdoc/studio'
// import {visionTool} from '@sanity/vision'
import {SingleWorkspace, defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schema'
import {structure} from './src/sanity/structure'

export default defineConfig<SingleWorkspace>({
  basePath: '/studio',
  dataset,
  projectId,
  schema,
  title: '@sanity/tsdoc',
  plugins: [
    deskTool({structure}),
    // visionTool(),
    tsdoc(),
    codeInput(),
  ],
})
