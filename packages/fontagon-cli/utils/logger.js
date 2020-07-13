/**
 * Modules related to Logs
 */

const consola = require('consola')
const chalk = require('chalk')

function logger (isLogs = true) {
  if (isLogs) {
    return consola.withScope('fontagon')
  } else {
    return {
      log: () => void 0
    }
  }
}

module.exports = {
  logger,
  logColor: chalk
}
