/**
 * Modules related to Logs
 */

const consola = require('consola')
const chalk = require('chalk')

module.exports = {
  logger: consola.withScope('fontagon'),
  logColor: chalk
}
