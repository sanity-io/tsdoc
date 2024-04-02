// import {APITokensInput} from './APITokensInput'

import {defineType} from 'sanity'

import {APITokensInput} from '../components/APITokensInput'

export const apiTokensType = defineType({
  type: 'array',
  name: 'api.tokens',
  title: 'Tokens',
  of: [{type: 'api.token'}],
  components: {
    input: APITokensInput as any,
  },
})
