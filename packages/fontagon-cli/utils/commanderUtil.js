const program = require('commander')
const leven = require('leven')

const { logger, logColor } = require('../utils/logger')

/**
 * enhance Error Message
 *
 * @param methodName
 */
module.exports.enhanceErrMsg = (methodName, log) => {
  program.Command.prototype[methodName] = (...args) => {
    if (methodName === 'unknownOption' && this._allowUnknownOption) {
      return
    }
    program.outputHelp()

    logger().log('  ' + logColor.red(log(...args)))
    logger().log()

    process.exit(1)
  }
}

/**
 * Suggest Commands
 * @param unknownCommand
 */
module.exports.suggestCommands = (unknownCommand) => {
  const availableCommands = program.commands.map(cmd => cmd._name)

  let suggestion

  availableCommands.forEach((cmd) => {
    const isBestMatch = leven(cmd, unknownCommand) < leven(suggestion || '', unknownCommand)

    if (leven(cmd, unknownCommand) < 3 && isBestMatch) {
      suggestion = cmd
    }
  })

  if (suggestion) {
    logger().log('  ' + logColor.red(`Did you mean ${logColor.yellow(suggestion)}?`))
  }
}
