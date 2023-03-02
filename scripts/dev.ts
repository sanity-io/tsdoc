import {devCommand} from '../src/cli/dev'

global.__DEV__ = true

devCommand({cwd: process.cwd()})
