/* eslint-disable no-console */

import path from 'path'
import {ExtractorMessage} from '@microsoft/api-extractor'
import chalk from 'chalk'

/** @internal */
export function _printExtractMessages(cwd: string, messages: ExtractorMessage[]): void {
  const warnings = messages.filter((msg) => msg.logLevel === 'warning')

  for (const msg of warnings) {
    const sourceFilePath = msg.sourceFilePath && path.relative(cwd, msg.sourceFilePath)

    if (msg.messageId === 'TS6307') {
      continue
    }

    console.log('')

    console.log(
      [
        `${chalk.cyan(sourceFilePath || '?')}`,
        `:${chalk.yellow(msg.sourceFileLine)}:${chalk.yellow(msg.sourceFileColumn)}`,
        ` - ${chalk.yellow('warning')} ${chalk.gray(msg.messageId)}\n`,
        msg.text,
      ].join(''),
    )
  }

  const errors: ExtractorMessage[] = messages.filter((msg) => msg.logLevel === 'error')

  for (const msg of errors) {
    const sourceFilePath = msg.sourceFilePath && path.relative(cwd, msg.sourceFilePath)

    console.log('')

    console.log(
      [
        `${chalk.cyan(sourceFilePath || '?')}`,
        `:${chalk.yellow(msg.sourceFileLine)}:${chalk.yellow(msg.sourceFileColumn)}`,
        ` - ${chalk.red('error')} ${chalk.gray(msg.messageId)}\n`,
        msg.text,
      ].join(''),
    )
  }
}
